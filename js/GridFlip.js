/**
 * Flip Card Grid Component
 * =============================================================================
 * OVERVIEW
 * =============================================================================
 * This component manages a grid of flip cards that can be flipped to reveal
 * additional content on the back. It handles responsive layouts, hover/touch
 * interactions, and dynamic height calculations to maintain grid alignment.
 * 
 * =============================================================================
 * INITIALIZATION FLOW
 * =============================================================================
 * 
 * 1. AUTOMATIC INITIALIZATION (Page Load)
 *    - Script loads and checks document.readyState
 *    - If DOM not ready: waits for DOMContentLoaded event
 *    - If DOM ready: starts initialization immediately
 *    - Uses retry logic (up to 50 attempts, 100ms intervals) to wait for
 *      OutSystems framework to render the DOM elements
 *    - Once elements found: sets up event listeners and calculates heights
 * 
 * 2. MANUAL INITIALIZATION (Framework Callback)
 *    - OutSystems can call FlipCardGrid.init() when DOM is ready
 *    - Includes same retry logic to handle timing issues
 *    - Cleans up previous instance if already initialized
 * 
 * 3. NAVIGATION HANDLING (Browser Back/Forward)
 *    - popstate event: Cleans up old listeners, waits for framework
 *    - pageshow event (bfcache): Detects cache restoration and re-initializes
 *    - Framework re-renders DOM with new random IDs
 *    - FlipCardGrid.init() called again with retry logic
 * 
 * =============================================================================
 * KEY FEATURES
 * =============================================================================
 * 
 * HEIGHT SYNCHRONIZATION
 * - Groups cards into rows based on vertical position
 * - Measures both front and back face heights
 * - Applies maximum height to all cards in same row
 * - Ensures grid alignment even when cards flip
 * 
 * INTERACTION MODES
 * - Desktop (≥1024px): Hover to flip
 * - Mobile/Tablet: Tap button to toggle flip
 * - Touch: Detects taps vs swipes using threshold and duration
 * 
 * EVENT DELEGATION
 * - Single click listener on container (not individual buttons)
 * - Works with dynamically generated DOM and changing IDs
 * - Survives page navigation and framework re-renders
 * 
 * PERFORMANCE OPTIMIZATIONS
 * - Debounced resize and visibility handlers
 * - Multiple update passes with RAF for stability
 * - Image load detection before final calculations
 * - Cleanup and re-initialization on navigation
 */

(function() {
    'use strict';

    // Debug flag - set to true to enable console logs
    const DEBUG = false;

    // Logger function
    function log(...args) {
        if (DEBUG) {
            console.log('[FlipCardGrid]', ...args);
        }
    }

    // Selectors and class names
    const selectors = {
        // Element selectors
        container: '.flip-card-grid',
        list: '.flip-card-grid__list',
        item: '.flip-card-grid__item',
        perspective: '.flip-card-grid__perspective',
        card: '.flip-card-grid__card',
        cardInner: '.flip-card-grid__card-inner',
        face: '.flip-card-grid__face',
        faceFront: '.flip-card-grid__face--front',
        faceBack: '.flip-card-grid__face--back',
        button: '.flip-card-grid__button',
        
        // State classes (without dot for classList operations)
        transitioning: 'flip-card-grid--transitioning',
        cardFlipped: 'flip-card-grid__card--flipped',
        perspectiveNoFlip: 'flip-card-grid__perspective--no-flip'
    };

    const CONSTANTS = {
        MIN_HEIGHT: 265,
        TRANSITION_DELAY: 50,
        TRANSITION_DURATION: 600,
        RESIZE_DEBOUNCE: 200,
        VISIBILITY_DEBOUNCE: 100,
        TOUCH_THRESHOLD: 5,
        BREAKPOINT_MEDIUM: 1024,
        BREAKPOINT_LARGE: 1200,
        MAX_RETRY_ATTEMPTS: 50,
        RETRY_DELAY: 100
    };

    // Global state
    let isInitialized = false;
    let eventHandlers = [];
    let resizeTimeout = null;
    let updateTimeout = null;

    /**
     * Fix inline styles that may cause layout issues
     */
    function fixInlineStyles() {
        const items = document.querySelectorAll(selectors.item);
        items.forEach(item => {
            if (item.style.height === '0px' || item.style.height === '0') {
                item.style.height = 'auto';
            }
        });
    }

    /**
     * Get target height for a card (front or back face)
     */
    function getTargetHeight(perspective, isFlipped) {
        const front = perspective.querySelector(selectors.faceFront);
        const back = perspective.querySelector(selectors.faceBack);

        if (!front || !back) return CONSTANTS.MIN_HEIGHT;

        // Store original styles
        const originalStyles = {
            front: { height: front.style.height, minHeight: front.style.minHeight },
            back: { height: back.style.height, minHeight: back.style.minHeight }
        };

        // Reset to auto for measurement
        front.style.height = 'auto';
        front.style.minHeight = 'auto';
        back.style.height = 'auto';
        back.style.minHeight = 'auto';

        // Force reflow
        void front.offsetHeight;
        void back.offsetHeight;

        const frontHeight = Math.max(front.scrollHeight, CONSTANTS.MIN_HEIGHT);
        const backHeight = Math.max(back.scrollHeight, CONSTANTS.MIN_HEIGHT);

        // Restore
        Object.assign(front.style, originalStyles.front);
        Object.assign(back.style, originalStyles.back);

        return isFlipped ? backHeight : frontHeight;
    }

    /**
     * Apply height to element and its children
     */
    function applyHeightsToElements(perspective, maxHeight, clearOnly = false) {
        const item = perspective.closest(selectors.item);
        const cardInner = perspective.querySelector(selectors.cardInner);
        const front = perspective.querySelector(selectors.faceFront);
        const back = perspective.querySelector(selectors.faceBack);

        if (clearOnly) {
            // Clear mode
            if (item) {
                item.style.minHeight = '';
                item.style.height = 'auto';
            }
            if (cardInner) {
                cardInner.style.minHeight = '';
                cardInner.style.height = 'auto';
            }
            if (front) {
                front.style.minHeight = '';
                front.style.height = 'auto';
            }
            if (back) {
                back.style.minHeight = '';
                back.style.height = 'auto';
            }
        } else {
            // Apply mode
            if (item) {
                item.style.minHeight = `${maxHeight}px`;
                item.style.height = 'auto';
            }
            if (cardInner) {
                cardInner.style.minHeight = `${maxHeight}px`;
            }
            if (front) {
                front.style.minHeight = `${maxHeight}px`;
                front.style.height = '100%';
            }
            if (back) {
                back.style.minHeight = `${maxHeight}px`;
                back.style.height = '100%';
            }
        }
    }

    /**
     * Update row heights to maintain grid alignment
     */
    function updateRowHeights() {
        const perspectives = document.querySelectorAll(selectors.perspective);
        if (!perspectives.length) return;

        fixInlineStyles();

        const rows = new Map();

        // Group by row
        perspectives.forEach(perspective => {
            const rect = perspective.getBoundingClientRect();
            const rowTop = Math.round(rect.top);
            if (!rows.has(rowTop)) {
                rows.set(rowTop, []);
            }
            rows.get(rowTop).push(perspective);
        });

        rows.forEach(rowPerspectives => {
            let maxHeight = 0;

            // First pass: clear heights
            rowPerspectives.forEach(perspective => {
                applyHeightsToElements(perspective, 0, true);
            });

            // Force reflow
            if (rowPerspectives.length) {
                void rowPerspectives[0].offsetHeight;
            }

            // Second pass: measure
            rowPerspectives.forEach(perspective => {
                const card = perspective.querySelector(selectors.card);
                const isFlipped = card && card.classList.contains(selectors.cardFlipped);
                const targetHeight = getTargetHeight(perspective, isFlipped);
                maxHeight = Math.max(maxHeight, targetHeight);
            });

            // Third pass: apply
            rowPerspectives.forEach(perspective => {
                applyHeightsToElements(perspective, maxHeight, false);
            });
        });
    }

    /**
     * Handle flip state change
     */
    function handleFlipChange(card) {
        const container = document.querySelector(selectors.container);
        if (!container) return;

        container.classList.add(selectors.transitioning);
        void container.offsetHeight;

        setTimeout(() => {
            updateRowHeights();
            setTimeout(() => {
                container.classList.remove(selectors.transitioning);
            }, CONSTANTS.TRANSITION_DURATION);
        }, CONSTANTS.TRANSITION_DELAY);
    }

    /**
     * Handle button click - using event delegation
     */
    function handleButtonClick(e) {
        log('Click detected on container, target:', e.target);
        
        const button = e.target.closest(selectors.button);
        if (!button) {
            log('Not a button click, ignoring');
            return;
        }

        log('Button found:', button);

        const card = button.closest(selectors.card);
        if (!card) {
            log('Card not found for button');
            return;
        }

        log('Card found:', card);

        e.preventDefault();
        e.stopPropagation();

        log('Button clicked:', button);

        // Close other flipped cards
        document.querySelectorAll(`.${selectors.cardFlipped}`).forEach(otherCard => {
            if (otherCard !== card) {
                log('Closing other card:', otherCard);
                otherCard.classList.remove(selectors.cardFlipped);
            }
        });

        const isInFront = button.closest(selectors.faceFront) !== null;
        log('Button is in front face:', isInFront);

        requestAnimationFrame(() => {
            if (isInFront) {
                log('Flipping card to back');
                card.classList.add(selectors.cardFlipped);
            } else {
                log('Flipping card to front');
                card.classList.remove(selectors.cardFlipped);
            }
            handleFlipChange(card);
        });
    }

    /**
     * Remove all event listeners
     */
    function removeAllEventListeners() {
        eventHandlers.forEach(handler => {
            handler.element.removeEventListener(handler.event, handler.fn, handler.options);
        });
        eventHandlers = [];
        log('All event listeners removed');
    }

    /**
     * Add event listener and track it for cleanup
     */
    function addTrackedEventListener(element, event, handler, options = false) {
        element.addEventListener(event, handler, options);
        eventHandlers.push({ element, event, fn: handler, options });
    }

    /**
     * Setup hover listeners for a perspective
     */
    function setupHoverListeners(perspective, card) {
        const handleMouseEnter = () => {
            if (window.innerWidth >= CONSTANTS.BREAKPOINT_MEDIUM) {
                if (!card.classList.contains(selectors.cardFlipped)) {
                    card.classList.add(selectors.cardFlipped);
                    handleFlipChange(card);
                }
            }
        };

        const handleMouseLeave = () => {
            if (window.innerWidth >= CONSTANTS.BREAKPOINT_MEDIUM) {
                if (card.classList.contains(selectors.cardFlipped)) {
                    card.classList.remove(selectors.cardFlipped);
                    handleFlipChange(card);
                }
            }
        };

        addTrackedEventListener(perspective, 'mouseenter', handleMouseEnter);
        addTrackedEventListener(perspective, 'mouseleave', handleMouseLeave);
    }

    /**
     * Setup touch listeners for a perspective
     */
    function setupTouchListeners(perspective, card) {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchStartTime = 0;

        const touchStartHandler = (e) => {
            if (e.target.closest('a, button')) return;
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            touchStartTime = Date.now();
        };

        const touchEndHandler = (e) => {
            if (e.target.closest('a, button')) return;

            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const touchDuration = Date.now() - touchStartTime;

            if (Math.abs(touchEndX - touchStartX) < CONSTANTS.TOUCH_THRESHOLD &&
                Math.abs(touchEndY - touchStartY) < CONSTANTS.TOUCH_THRESHOLD &&
                touchDuration < 300) {
                card.classList.toggle(selectors.cardFlipped);
                handleFlipChange(card);
            }
        };

        addTrackedEventListener(perspective, 'touchstart', touchStartHandler, { passive: true });
        addTrackedEventListener(perspective, 'touchend', touchEndHandler, { passive: true });
    }

    /**
     * Setup all event listeners using event delegation
     */
    function setupEventListeners() {
        log('Setting up event listeners...');

        removeAllEventListeners();

        const container = document.querySelector(selectors.container);
        if (!container) {
            log('Container not found!');
            return;
        }

        log('Container found:', container);

        // Use event delegation for button clicks
        const buttonHandler = (e) => {
            log('Container clicked at', new Date().toISOString());
            handleButtonClick(e);
        };
        addTrackedEventListener(container, 'click', buttonHandler, true);
        log('Click listener attached to container');

        // Debounced update
        const debouncedUpdate = (delay = CONSTANTS.VISIBILITY_DEBOUNCE) => {
            clearTimeout(updateTimeout);
            updateTimeout = setTimeout(() => {
                fixInlineStyles();
                updateRowHeights();
            }, delay);
        };

        // Visibility change
        const visibilityHandler = () => {
            if (document.visibilityState === 'visible') {
                log('Document became visible');
                fixInlineStyles();
                debouncedUpdate();
            }
        };
        addTrackedEventListener(document, 'visibilitychange', visibilityHandler);

        // Resize
        const resizeHandler = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                fixInlineStyles();
                updateRowHeights();
            }, CONSTANTS.RESIZE_DEBOUNCE);
        };
        addTrackedEventListener(window, 'resize', resizeHandler);

        // Orientation change
        const orientationHandler = () => {
            setTimeout(() => {
                fixInlineStyles();
                updateRowHeights();
            }, 300);
        };
        addTrackedEventListener(window, 'orientationchange', orientationHandler);

        // Mouse and touch events for perspectives
        const perspectives = document.querySelectorAll(selectors.perspective);
        log('Found', perspectives.length, 'perspectives for hover listeners');
        
        perspectives.forEach((perspective, index) => {
            const card = perspective.querySelector(selectors.card);
            if (!card) {
                log('No card found in perspective', index);
                return;
            }

            setupHoverListeners(perspective, card);
            setupTouchListeners(perspective, card);
        });

        log('Event listeners set up:', eventHandlers.length);
    }

    /**
     * Wait for images to load
     */
    function waitForImages() {
        const images = document.querySelectorAll(`${selectors.perspective} img`);
        const promises = Array.from(images).map(img => {
            return new Promise(resolve => {
                if (img.complete) {
                    resolve();
                } else {
                    img.addEventListener('load', resolve, { once: true });
                    img.addEventListener('error', resolve, { once: true });
                }
            });
        });

        Promise.all(promises).then(() => {
            fixInlineStyles();
            updateRowHeights();
        });
    }

    /**
     * Perform multiple update passes for stability
     */
    function performStaggeredUpdates() {
        requestAnimationFrame(() => {
            fixInlineStyles();
            updateRowHeights();

            requestAnimationFrame(() => {
                updateRowHeights();

                setTimeout(() => {
                    fixInlineStyles();
                    updateRowHeights();
                }, 50);

                setTimeout(updateRowHeights, 150);
                setTimeout(updateRowHeights, 300);
            });
        });
    }

    /**
     * Initialize the component
     */
    function init() {
        log('Initializing FlipCardGrid...');
        
        const perspectives = document.querySelectorAll(selectors.perspective);
        if (!perspectives.length) {
            log('No perspectives found, waiting...');
            return false;
        }

        fixInlineStyles();
        setupEventListeners();
        updateRowHeights();
        performStaggeredUpdates();
        waitForImages();

        isInitialized = true;
        log('FlipCardGrid initialized successfully');
        return true;
    }

    /**
     * Cleanup function
     */
    function cleanup() {
        log('Cleaning up FlipCardGrid...');
        removeAllEventListeners();
        clearTimeout(resizeTimeout);
        clearTimeout(updateTimeout);
        isInitialized = false;
    }

    /**
     * Retry initialization with polling
     */
    function initWithRetry(source = 'auto') {
        let attempts = 0;

        function tryInit() {
            attempts++;
            log(`${source} - Attempt ${attempts} to initialize...`);
            
            const success = init();
            
            if (!success && attempts < CONSTANTS.MAX_RETRY_ATTEMPTS) {
                log('Retrying in', CONSTANTS.RETRY_DELAY, 'ms...');
                setTimeout(tryInit, CONSTANTS.RETRY_DELAY);
            } else if (attempts >= CONSTANTS.MAX_RETRY_ATTEMPTS) {
                log('Max attempts reached');
            }
        }

        tryInit();
    }

    /**
     * Initialize when DOM is ready - with retry logic
     */
    function initWhenReady() {
        if (document.readyState === 'loading') {
            log('Waiting for DOMContentLoaded...');
            document.addEventListener('DOMContentLoaded', () => {
                log('DOMContentLoaded fired');
                setTimeout(() => initWithRetry('DOMContentLoaded'), 100);
            });
        } else {
            log('DOM already ready, initializing immediately');
            setTimeout(() => initWithRetry('immediate'), 100);
        }
    }

    // Start initialization
    log('Script loaded, document.readyState:', document.readyState);
    initWhenReady();

    // Handle bfcache (back/forward cache)
    window.addEventListener('pageshow', function(event) {
        log('=== pageshow event ===');
        log('event.persisted:', event.persisted);
        log('isInitialized:', isInitialized);
        log('document.readyState:', document.readyState);
        
        if (event.persisted) {
            log('Page restored from bfcache, re-initializing...');
            cleanup();
            
            setTimeout(() => {
                log('Starting re-initialization after bfcache restore...');
                initWithRetry('pageshow');
            }, 50);
        }
    });

    // Also listen for popstate (browser back/forward)
    window.addEventListener('popstate', function(event) {
        log('=== popstate event ===');
        log('isInitialized:', isInitialized);
        log('Cleaning up for popstate, waiting for framework to call InitGridFlip...');
        cleanup();
        isInitialized = false;
    });

    // Listen for pagehide to track when leaving
    window.addEventListener('pagehide', function(event) {
        log('=== pagehide event ===');
        log('event.persisted:', event.persisted);
        log('Page is being hidden/navigating away');
    });

    // Expose global API
    window.FlipCardGrid = {
        init: function() {
            log('Manual init called via FlipCardGrid.init()');
            
            const container = document.querySelector(selectors.container);
            const perspectives = document.querySelectorAll(selectors.perspective);
            log('Container found:', !!container, container ? container.id : 'none');
            log('Perspectives found:', perspectives.length);
            
            // If DOM not ready yet, retry with polling
            if (perspectives.length === 0) {
                log('No perspectives found yet, setting up retry logic...');
                
                let attempts = 0;
                
                function tryInit() {
                    attempts++;
                    log('Init retry attempt', attempts);
                    
                    const retryPerspectives = document.querySelectorAll(selectors.perspective);
                    const retryContainer = document.querySelector(selectors.container);
                    log('Found', retryPerspectives.length, 'perspectives, container:', retryContainer ? retryContainer.id : 'none');
                    
                    if (retryPerspectives.length > 0) {
                        log('Elements found on attempt', attempts, '- initializing!');
                        
                        if (isInitialized) {
                            log('Cleaning up previous initialization');
                            cleanup();
                        }
                        
                        init();
                    } else if (attempts < CONSTANTS.MAX_RETRY_ATTEMPTS) {
                        log('Not ready yet, retrying in', CONSTANTS.RETRY_DELAY, 'ms...');
                        setTimeout(tryInit, CONSTANTS.RETRY_DELAY);
                    } else {
                        log('Max retry attempts reached for manual init');
                    }
                }
                
                setTimeout(tryInit, CONSTANTS.RETRY_DELAY);
                
            } else {
                log('DOM ready, doing full initialization');
                
                if (isInitialized) {
                    log('Cleaning up previous initialization');
                    cleanup();
                }
                
                setTimeout(() => {
                    init();
                }, 0);
            }
        },
        refresh: function() {
            log('Manual refresh called');
            fixInlineStyles();
            updateRowHeights();
        },
        reinit: function() {
            log('Manual reinit called');
            cleanup();
            init();
        },
        cleanup: cleanup,
        enableDebug: function() {
            console.log('[FlipCardGrid] Debug mode enabled. Reload page to see all logs. Set DEBUG constant to true in source for permanent debug mode.');
        },
        disableDebug: function() {
            console.log('[FlipCardGrid] Debug mode disabled');
        }
    };

})();