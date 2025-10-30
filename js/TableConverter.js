/**
 * TableConverter - Comprehensive Library Documentation
 * 
 * A modular, structure-agnostic library for converting HTML tables to mobile-friendly formats.
 * Handles tables of any complexity through a multi-stage analysis and conversion pipeline.
 */

window.TableConverter = {
    /**
     * CONFIG - Configuration and Parameter Hub
     * 
     * A comprehensive configuration system that centralizes all operational parameters.
     * This structured system:
     * 
     * 1. Hierarchical Organization:
     *    - Groups related settings into logical categories
     *    - Provides namespaced access to configuration values
     *    - Maintains clear separation of concerns through structure
     *    - Supports multi-level parameter nesting for clarity
     * 
     * 2. Operational Control:
     *    - Defines breakpoints for responsive behavior
     *    - Configures animation timings and transitions
     *    - Sets performance-related batch processing parameters
     *    - Controls feature enabling/disabling
     * 
     * 3. UI Definition:
     *    - Centralizes selector definitions for DOM operations
     *    - Defines display templates for generated components
     *    - Provides customizable styling parameters
     *    - Maintains consistent component behavior
     * 
     * 4. System Behavior:
     *    - Sets validation thresholds for content processing
     *    - Defines observer options for DOM monitoring
     *    - Controls marker types and conversion mapping
     *    - Configures event handling behavior
     * 
     * 5. Default Values:
     *    - Provides sensible defaults for all parameters
     *    - Defines fallback values for missing content
     *    - Sets threshold values for various operations
     *    - Ensures consistent behavior across environments
     * 
     * This configuration hub ensures consistent behavior while providing
     * a single location for parameter adjustments and customization.
     */
    CONFIG: {
        debug: {
            enabled: true,
            logEvents: false,
            logHtml: false,
            logHtmlDetails: false,
            logSelectors: false,
            logMarkers: false,
            logMarkerDetail: false,
            logAnalysis: false,
            logAnalysisDetail: false,  
            logProcessors: true,
            logProcessorDetail: true, 
            logProcess: true,
            logConverters: false,
            logConverterDetail: false,  
            logRender: false,
            logRenderDetail: false,  
            logComponents: false,
            logOverall: false,
            errorVerbosity: 'high'     
        },
    
        viewport: {
            mobileBreakpoint: 1054,
            touchThreshold: 50
        },

        ui: {
            showLoadingIndicator: true,        // Master switch - enable/disable completely
            showOnInitialLoad: true,          // Show when page first loads in mobile view
            showOnViewportChange: true,        // Show during viewport resize/orientation changes
            showOnlyOnce: true                // Show only the first time (regardless of trigger)
        },
    
        video: {
            patterns: {
                url: /(\*\*\*LiveExtendVideoURL=)(.*)(\*\*\*)/gm,
                iframeTemplate: '<p align=center><iframe src="${url}" width="700" height="400" style="border:none; max-width: 100%;" class="html-video-processor" loading="lazy" allow="autoplay; encrypted-media" allowfullscreen></iframe></p>',
                prefix: /\*\*\*LiveExtendVideoURL=/,
                suffix: /\*\*\*/
            }
        },
    
        selectors: {
            structure: {
                container: '.html-wrapper .cke_contents_ltr', 
                containerHTML: '.html-wrapper', 
                containerContent: '.cke_contents_ltr', 
                containerFlexibleHtmlWrapper: '[class*="html-wrapper"]',
                containerFlexibleCkeContents: '[class*="cke_contents"]',
                responsiveWrapper: 'responsive-table-container',
                tableWrapper: 'table-scroll-wrapper',
                simpleTableGeneratedClass: 'simple-table-generated-tap',
                observerTarget: '.html-wrapper',
                // structure selectors for hierarchical tables
                sectionTitle: 'section-row-title',
                sectionSubtitle: 'section-row-subtitle',
                subtitleHeader: 'subtitle-header',
                sublabelTitle: 'sublabel-title',
                errorMessage: 'error-message'
            },
    
            shared: {
                contentCell: 'content-cell',
                contentText: 'content-cell-text',
                articleHeader: 'ArticleHeader'
            },
    
            marker: {
                processedClass: 'processed-marker',
                tableMarkerClass: 'table-marker',
                markerSelector: 'p:not([data-processed-marker]), div > p:not([data-processed-marker]), span:not([data-processed-marker]), h1:not([data-processed-marker]), h2:not([data-processed-marker]), h3:not([data-processed-marker]), h4:not([data-processed-marker]), h5:not([data-processed-marker]), h6:not([data-processed-marker])'                },
    
            components: {
                accordion: {
                    root: 'accordion',
                    list: 'accordion-list',
                    item: 'list-item',
                    contentGroup: 'info-group',
                    trigger: '[data-accordion-trigger]',
                    content: 'expanded-content',
                    header: 'article-header',
                    arrow: 'arrow',
                    labelGroup: 'label group',
                    labelCategory: 'label category',
                    value: 'value',
                    standaloneTitle: 'table-standalone-title',
                                    // New selectors for hierarchical structure
                    headerColumns: 'columns-header',  // For top-level column headers
                    columnGroup: 'column-group-header', // For intermediate groups
                    ecHead: 'ec-head', // For accordion trigger wrapper
                    dataAttribute: '[data-accordion]'
                },
    
                carousel: {
                    root: '[data-carousel]',
                    track: '[data-carousel-track]',
                    slide: '[data-carousel-slide]',
                    slideContent: 'slide-content',
                    slideImage: 'slide-image',
                    slideHeader: 'slide-header',
                    slideText: 'slide-text',
                    slideButton: 'slide-button',
                    controls: 'carousel-controls',
                    dataAttribute: '[data-carousel]',
                    navigation: {
                        prev: '[data-carousel-prev]',
                        next: '[data-carousel-next]',
                        dot: '[data-carousel-dot]',
                        btnClass: 'carousel-btn',
                        dotsClass: 'carousel-dots',
                        dotClass: 'carousel-dot'
                    },
                    activeSlide: '[data-carousel-slide][data-active="true"]'
                },
    
                list: {
                    root: 'responsive-list',
                    item: 'list-item',
                    content: 'list-content',
                    header: 'list-header',
                    title: 'list-title',
                    image: 'list-image',
                    cleanList: 'mobile-list-clean',
                    accordionStyle: 'accordion-style',
                    tableListClean: 'table-list-clean'
                }
            },
    
            attributes: {
                converted: 'data-converted',
                noConversion: 'data-no-conversion',
                noShow: 'data-no-show',
                processedMarker: 'data-processed-marker',
                tableMarker: 'data-table-marker',
                active: 'data-active'
            },

            elements:{
                table: 'TABLE'
            },
    
            states: {
                active: 'active',
                hidden: 'hidden',
                disabled: 'disabled',
                processed: 'processed',
                scrollable: 'is-scrollable'
            },
    
            tables: {
                unconverted: 'table:not([data-converted])',
                any: 'table'
            },
            
            collapse: {
                button: '.collapse__button',
                container: '.collapse__content'
            }
        },

        html:{
            allTags: ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'label', 'a', 'li', 'td', 'th'],
        },
    
        markers: {
            types: {
                NO_SHOW: {
                    name: 'mobile-no-show',
                    converter: null,
                    isActive: false
                },
                NO_CONVERSION: {
                    name: 'mobile-no-conversion', 
                    converter: null,
                    isActive: true
                },
                ACCORDION: {
                    name: 'mobile-accordion',
                    converter: 'this.conversion.toAccordion',
                    isActive: true
                },
                CAROUSEL: {
                    name: 'mobile-carousel',
                    converter: 'this.conversion.toHorizontalCarousel',
                    isActive: true
                },
                CAROUSEL_VERTICAL: {
                    name: 'mobile-carousel-vertical',
                    converter: 'this.conversion.toVerticalCarousel',
                    isActive: true
                },
                LIST: {
                    name: 'mobile-list',
                    converter: 'this.conversion.toList',
                    isActive: true
                },
                LIST_ACCORDION: {
                    name: 'mobile-list-like-accordion',
                    converter: 'this.conversion.toAccordionStyleList',
                    isActive: true
                }
            },
            defaultType: 'mobile-accordion',
            visuallyHiddenCSS: 'position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;',

            
            get valid() {
                return Object.values(this.types);
            }
        },

        markerSearch: {
            // All HTML tags that could contain markers
            allTags: ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'label', 'a', 'li', 'td', 'th'],
            
            // Maximum elements to check for markers before a table
            maxElementsToCheck: 20,
            
            // Maximum depth for recursive checks
            maxDepth: 5,
            
            // Maximum text length for marker containment check
            maxContainmentTextLength: 100
            
        },
    
        state: {
            initialized: false,
            isMobileView: false,
            observer: null,
            mediaQuery: null,
            converted: new WeakMap(),
            originalHtmlContent: null,
            originalTables: new WeakMap(),
            boundEventHandler: null
        },
    
        timing: {
            transitionDuration: 300,
            carouselTransition: 500,
            scrollCheckDelay: 0
        },
    
        touch: {
            swipeThreshold: 50,
            verticalThreshold: 50
        },
    
        animation: {
            defaultEasing: 'ease-in-out',
            carouselEasing: 'ease-in-out',
            accordionEasing: 'ease-in-out'
        },
    
        dimensions: {
            carousel: {
                defaultWidth: 700,
                defaultHeight: 400
            },
            iframe: {
                width: 700,
                height: 400
            }
        },

        validation: { 
            minContentLength: 100,
            verticalCarouselCells: 3
        },

        observerOptions: {
            childList: true,
            subtree: true
        },

        eventOptions: {
            unload: { passive: true }
        },
    
        events: {
            delegatedEvents: ['click'],
            passiveEvents: ['touchstart', 'touchmove', 'touchend']
        },
    
        styles: {
            hiddenElement: 'display: none !important; visibility: hidden !important;',
            hidden: 'display: none !important; visibility: hidden !important;',
            none: 'none',
            block: 'block'
        },
    
        templates: {
            carousel: {
                arrows: {
                    prev: '<svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>',
                    next: '<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>'
                }
            },
            
            accordionItem: `
                <div class="list-item">
                    <div data-accordion-trigger class="item-header">{{rowTitle}}</div>
                    <div class="expanded-content">{{columns}}</div>
                </div>
            `,
            carouselContainer: `
                <div class="carousel" data-carousel>
                    <div class="carousel-track" data-carousel-track>
            `,
            carouselSlide: `
                <div class="carousel-slide" data-carousel-slide{{active}}>
                    <div class="slide-content">{{content}}</div>
                </div>
            `,
            carouselTrackEnd: `</div>`,
            carouselControls: `
                <div class="carousel-controls">
                    <button class="carousel-btn prev" data-carousel-prev>
                        <span class="sr-only">Previous</span>
                        <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
                    </button>
                    <div class="carousel-dots">{{dots}}</div>
                    <button class="carousel-btn next" data-carousel-next>
                        <span class="sr-only">Next</span>
                        <svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
                    </button>
                </div>
            `,
            carouselDot: `
                <button class="carousel-dot{{active}}" data-carousel-dot="{{index}}" aria-label="Go to slide {{label}}"></button>
            `,
            carouselEnd: `</div>`,
            slideImage: `<div class="slide-image">{{image}}</div>`,
            slideText: `<div class="slide-text">{{text}}</div>`,
            listTitle: `<div class="list-title">{{title}}</div>`,
            listContent: `<div class="list-content">{{content}}</div>`,
            listContentImage: `<div class="list-image">{{image}}</div>`,
            listHeader: `<div class="list-header">{{content}}</div>`,
            categoryHeader: `<div class="category-header">{{header}}</div>`,
            listValue: `<div class="list-value">{{value}}</div>`
        },
        
        defaults: {
            emptyCell: '-',
            columnPrefix: 'Column'
        },
        
        labels: {
            column: 'Column',
            prev: 'Previous',
            next: 'Next',
            toggle: 'Toggle'
        },

        batchProcessing: {
            enabled: true,
            smallTableCount: 20,  // Threshold for small batch processing
            largeTableCount: 50,  // Threshold for large batch processing
            defaultBatchSize: 10, // Standard batch size
            smallBatchSize: 20,   // Batch size for fewer tables
            largeBatchSize: 5,    // Batch size for many tables (50+)
            batchDelay: 50,       // Delay between batches (ms)
            priorityProcessingEnabled: true // Enable special marker priority processing
        },
    },

// 2. Logging Methods
    /**
     * logger - Diagnostic and Monitoring System
     * 
     * A comprehensive logging system with categorization, formatting, and filtering
     * capabilities. This advanced system:
     * 
     * 1. Category-Based Logging:
     *    - Organizes logs into functional categories (markers, events, processing, etc.)
     *    - Provides specialized logging methods for each category
     *    - Enables granular control over log verbosity per category
     *    - Maintains consistent formatting within categories
     * 
     * 2. Visual Formatting:
     *    - Implements color-coded console output for easier visual parsing
     *    - Uses distinctive formatting for different message types
     *    - Supports collapsible group logging for complex operations
     *    - Includes timestamps for sequential debugging
     * 
     * 3. Performance Monitoring:
     *    - Provides timer utilities for operation duration tracking
     *    - Supports nested timers for hierarchical performance analysis
     *    - Implements unique timer naming to prevent conflicts
     *    - Reports elapsed time for key operations
     * 
     * 4. Configurable Verbosity:
     *    - Supports environment-based logging levels
     *    - Enables selective enabling/disabling of log categories
     *    - Provides detailed vs. summary logging options
     *    - Controls log output based on configuration
     * 
     * 5. Error Handling:
     *    - Enhanced error logging with contextual information
     *    - Captures and formats stack traces
     *    - Adds environmental details to error reports
     *    - Provides safe logging wrappers to prevent cascading errors
     * 
     * This logging system provides crucial insights into the library's operation
     * while supporting both development debugging and production monitoring.
     */
    logger:{
        styles: {
            base: 'font-weight: bold; background-color: transparent;',      // Removed potential yellow background
            info: 'color: #72BE44;',                                        // Bright green
            event: 'color: #4A90E2;',                                       // Bright blue
            html: 'color: #9B59B6;',                                        // Purple
            selector: 'color: #E67E22;',                                    // Orange
            analysis: 'color: #D35400;',                                    // Darker orange for analysis
            analysisDetail: 'color: #E67E22; font-size: 0.9em;',            // Lighter orange for detail
            converter: 'color: #8B6914;',                                   // Even darker golden yellow
            converterDetail: 'color: #B8860B; font-size: 0.9em;',           // Dark golden yellow for details
            render: 'color: #8B6914;',                                      // Dark golden yellow
            renderDetail: 'color: #B8860B; font-size: 0.9em;',              // Lighter golden yellow for details            
            component: 'color: #3498DB;',                                   // Blue
            marker: 'color: #8E44AD;',                                      // Violet
            markerDetail: 'color: #9B59B6; font-size: 0.9em;',              // Lighter violet for marker detail
            processor: 'color: #103F91;;',                                  // Deep royal blue
            processorDetail: 'color: #4176D1; font-size: 0.9em;',           // Mid-tone blue
            process: 'color: #1F3A70;',                                     // Darker navy blue for processor
            overall: 'color: #1F3A70;',                                     // Darker navy blue
            error: 'color: #FF0000; background-color: #FFEEEE;',            // Red with light background
            timing: 'color: #2ECC71;'                                       // Green for timing data
        },

        // Base logging method with timestamp and improved formatting
        log: function(message, data = {}, type = 'info') {
            if (!window.TableConverter.CONFIG.debug.enabled) return;
            const timestamp = new Date().toISOString().substr(11, 8); // Just time HH:MM:SS
            
            // Add space to detailed log types
            let displayType = type;
            if (type === 'analysisDetail') displayType = 'ANALYSIS DETAIL';
            else if (type === 'converterDetail') displayType = 'CONVERTER DETAIL';
            else if (type === 'markerDetail') displayType = 'MARKER DETAIL';
            else if (type === 'processorDetail') displayType = 'PROCESSOR DETAIL';
            else if (type === 'renderDetail') displayType = 'RENDER DETAIL';
            else displayType = type.toUpperCase();
            
            const style = `${this.styles.base} ${this.styles[type] || this.styles.info}`;
            console.log(`%c[TC ${displayType}]`, style, `${timestamp}:`, message, data);
        },

        // Event logging
        logEvent(message, data = {}) {
            if (!window.TableConverter.CONFIG.debug.enabled) return;
            if (!window.TableConverter.CONFIG.debug.logEvents) return;
            this.log(message, data, 'event');
        },

        // HTML logging
        logHtml(message, data = {}) {
            if (!window.TableConverter.CONFIG.debug.enabled) return;
            if (!window.TableConverter.CONFIG.debug.logHtml) return;
            this.log(message, data, 'html');
        },

        // HTML logging
        logHtmlDetails(message, data = {}) {
            if (!window.TableConverter.CONFIG.debug.enabled) return;
            if (!window.TableConverter.CONFIG.debug.logHtmlDetails) return;
            this.log(message, data, 'html');
        },

        // Marker logging
        logMarker: function(message, data = {}) {
            if (!window.TableConverter.CONFIG.debug.enabled) return;
            if (!window.TableConverter.CONFIG.debug.logMarkers) return;
            this.log(message, data, 'marker');
        },

        // Marker logging detail
        logMarkerDetail: function(message, data = {}) {
            if (!window.TableConverter.CONFIG.debug.enabled) return;
            if (!window.TableConverter.CONFIG.debug.logMarkerDetail) return;
            this.log(message, data, 'markerDetail');
        },

        // Marker found
        logMarkerFound(markerType, element) {
            if (!window.TableConverter.CONFIG.debug.enabled) return;
            if (!window.TableConverter.CONFIG.debug.logMarkers) return;
            this.log(`Marker Found: ${markerType}`, {
                element: element?.outerHTML?.substring(0, 100) + '...',
                timestamp: new Date().toISOString()
            }, 'marker');
        },

        // Marker processed
        logMarkerProcessed(markerType, success = true) {
            if (!window.TableConverter.CONFIG.debug.enabled) return;
            if (!window.TableConverter.CONFIG.debug.logMarkers) return;
            this.log(`Marker Processed: ${markerType}`, {
                success,
                timestamp: new Date().toISOString()
            }, 'marker');
        },

        // Analysis basic logging
        logAnalysis: function(message, data = {}) {
            if (!window.TableConverter.CONFIG.debug.enabled) return;
            if (!window.TableConverter.CONFIG.debug.logAnalysis) return;
            this.log(message, data, 'analysis');
        },
        
        // Analysis detailed logging 
        logAnalysisDetail: function(message, data = {}) {
            if (!window.TableConverter.CONFIG.debug.enabled) return;
            if (!window.TableConverter.CONFIG.debug.logAnalysisDetail) return;
            this.log(message, data, 'analysisDetail');
        },

        // Process logging
        logProcess: function(message, data = {}) {
            if (!window.TableConverter.CONFIG.debug.enabled) return;
            if (!window.TableConverter.CONFIG.debug.logProcess) return;
            this.log(message, data, 'process');
        },

        // Processor basic logging
        logProcessor: function(message, data = {}) {
            if (!window.TableConverter.CONFIG.debug.enabled) return;
            if (!window.TableConverter.CONFIG.debug.logProcessors) return;
            this.log(message, data, 'processor');
        },

        // Processor detailed logging
        logProcessorDetail: function(message, data = {}) {
            if (!window.TableConverter.CONFIG.debug.enabled) return;
            if (!window.TableConverter.CONFIG.debug.logProcessorDetail) return;
            this.log(message, data, 'processorDetail');
        },

        // Process timing logs
        logProcessStart(type, data = {}) {
            if (!window.TableConverter.CONFIG.debug.enabled) return;
            if (!window.TableConverter.CONFIG.debug.logProcessors) return;
            this.log(`Starting ${type} processing`, {
                ...data,
                timestamp: new Date().toISOString()
            }, 'processor');
            console.time(`Process-${type}`);
        },

        logProcessEnd(type, data = {}) {
            if (!window.TableConverter.CONFIG.debug.enabled) return;
            if (!window.TableConverter.CONFIG.debug.logProcessors) return;
            console.timeEnd(`Process-${type}`);
            this.log(`Completed ${type} processing`, {
                ...data,
                timestamp: new Date().toISOString()
            }, 'processor');
        },

        // Component logging
        logComponent: function(message, data = {}) {
            if (!window.TableConverter.CONFIG.debug.enabled) return;
            if (!window.TableConverter.CONFIG.debug.logComponents) return;
            this.log(message, data, 'component');
        },

        // Converter basic logging
        logConverter: function(message, data = {}) {
            if (!window.TableConverter.CONFIG.debug.enabled) return;
            if (!window.TableConverter.CONFIG.debug.logConverters) return;
            this.log(message, data, 'converter');
        },

        // Converter detailed logging
        logConverterDetail: function(message, data = {}) {
            if (!window.TableConverter.CONFIG.debug.enabled) return;
            if (!window.TableConverter.CONFIG.debug.logConverterDetail) return;
            this.log(message, data, 'converterDetail');
        },

        // Conversion process logging
        logConversion(from, to, details = {}) {
            if (!window.TableConverter.CONFIG.debug.enabled) return;
            if (!window.TableConverter.CONFIG.debug.logConverters) return;
            this.log(`Converting: ${from} → ${to}`, {
                ...details,
                timestamp: new Date().toISOString()
            }, 'converter');
        },

        // Render logging
        logRender: function(message, data = {}) {
            if (!window.TableConverter.CONFIG.debug.enabled) return;
            if (!window.TableConverter.CONFIG.debug.logRender) return;
            this.log(message, data, 'render');
        },
        // Render logging Detail
        logRenderDetail: function(message, data = {}) {
            if (!window.TableConverter.CONFIG.debug.enabled) return;
            if (!window.TableConverter.CONFIG.debug.logRenderDetail) return;
            this.log(message, data, 'renderDetail');
        },

        // Analysis basic logging
        logOverall(message, data = {}) {
            if (!window.TableConverter.CONFIG.debug.enabled) return;
            if (!window.TableConverter.CONFIG.debug.logOverall) return;
            this.log(message, data, 'overall');
        },

        // Error logging with improved details
        error(message, error = {}) {
            const errorData = {
                message: error.message || '',
                stack: error.stack || new Error().stack,
                timestamp: new Date().toISOString()
            };

            // Add additional context based on verbosity setting
            if (window.TableConverter.CONFIG.debug.errorVerbosity === 'high') {
                errorData.url = window.location.href;
                errorData.userAgent = navigator.userAgent;
                errorData.viewportWidth = window.innerWidth;
            }

            console.error(`%c[TableConverter ERROR]`, this.styles.error, message, errorData);
        },

        // Timing utilities
            /**
            * Helper for creating unique timer names to avoid "Timer already exists" errors
            * 
            * @param {String} baseName - Base timer name
            * @returns {String} Unique timer name with timestamp
            */
            createUniqueTimerName: function(baseName) {
                return `${baseName}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
            },

            /**
             * Improved logger startTimer implementation to prevent duplicates
             */
            startTimer: function(label) {
                // Generate unique label if not provided
                const uniqueLabel = label || `Timer_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
                
                // Store timer info in an object for easy reference
                const timer = {
                    label: uniqueLabel,
                    start: Date.now()
                };
                
                // Only use console.time for debugging if needed
                // Instead of relying on console.time which throws errors on duplicates,
                // we manage our own timer objects
                if (window.TableConverter.CONFIG.debug.enabled) {
                    try {
                        console.time(uniqueLabel);
                    } catch (e) {
                        // Silently handle any console timer errors
                    }
                }
                
                return timer;
            },

            /**
             * Improved logger endTimer implementation
             */
            endTimer: function(timer) {
                if (!timer || !timer.start) return;
                
                const duration = Date.now() - timer.start;
                
                // Only use console.timeEnd for debugging if needed
                if (window.TableConverter.CONFIG.debug.enabled) {
                    try {
                        console.timeEnd(timer.label);
                    } catch (e) {
                        // Silently handle any console timer errors
                        console.log(`Timer ${timer.label}: ${duration}ms`);
                    }
                }
                
                // Always store the duration in the timer object for reference
                timer.duration = duration;
                
                return duration;
            },

        // Group logging for cleaner console
        groupStart: function(label, collapsed = false) {
            if (!window.TableConverter.CONFIG.debug.enabled) return;
            
            if (collapsed) {
                console.groupCollapsed(label);
            } else {
                console.group(label);
            }
        },

        groupEnd: function() {
            if (!window.TableConverter.CONFIG.debug.enabled) return;
            
            console.groupEnd();
        },

        /**
         * Safe logging wrapper to make code resilient to missing logger methods
         * This ensures code won't break if logger methods aren't available
         */
        safeLogger: function(logger) {
            // Default no-op functions
            const noop = function() {};
            const noopReturn = function() { return {}; };
            
            // Ensure logger exists
            const baseLogger = logger || console;
            
            // Create the safe wrapper with ALL required methods
            const safeLog = {
                _isSafeLogger: true,
                
                // Core logging methods
                log: typeof baseLogger.log === 'function' ? 
                    function() { baseLogger.log.apply(baseLogger, arguments); } : 
                    function() { console.log.apply(console, arguments); },

                // Process logging
                logProcess: typeof baseLogger.logProcess === 'function' ? 
                function() { baseLogger.logProcess.apply(baseLogger, arguments); } : 
                function(msg, data) { console.log(`PROCESS: ${msg}`, data); },
                
                // Processor logging
                logProcessor: typeof baseLogger.logProcessor === 'function' ? 
                    function() { baseLogger.logProcessor.apply(baseLogger, arguments); } : 
                    function(msg, data) { console.log(`PROCESSOR: ${msg}`, data); },

                logProcessorDetail: typeof baseLogger.logProcessorDetail === 'function' ? 
                    function() { baseLogger.logProcessorDetail.apply(baseLogger, arguments); } : 
                    function(msg, data) { console.log(`PROCESSOR DETAIL: ${msg}`, data); },
                    
                // Marker logging
                logMarker: typeof baseLogger.logMarker === 'function' ? 
                    function() { baseLogger.logMarker.apply(baseLogger, arguments); } : 
                    function(msg, data) { console.log(`MARKER: ${msg}`, data); },
                    
                logMarkerDetail: typeof baseLogger.logMarkerDetail === 'function' ? 
                    function() { baseLogger.logMarkerDetail.apply(baseLogger, arguments); } : 
                    function(msg, data) { console.log(`MARKER DETAIL: ${msg}`, data); },
                    
                // Analysis logging
                logAnalysis: typeof baseLogger.logAnalysis === 'function' ? 
                    function() { baseLogger.logAnalysis.apply(baseLogger, arguments); } : 
                    function(msg, data) { console.log(`ANALYSIS: ${msg}`, data); },
                    
                logAnalysisDetail: typeof baseLogger.logAnalysisDetail === 'function' ? 
                    function() { baseLogger.logAnalysisDetail.apply(baseLogger, arguments); } : 
                    function(msg, data) { console.log(`ANALYSIS DETAIL: ${msg}`, data); },
                    
                // Converter logging
                logConverter: typeof baseLogger.logConverter === 'function' ? 
                    function() { baseLogger.logConverter.apply(baseLogger, arguments); } : 
                    function(msg, data) { console.log(`CONVERTER: ${msg}`, data); },
                    
                logConverterDetail: typeof baseLogger.logConverterDetail === 'function' ? 
                    function() { baseLogger.logConverterDetail.apply(baseLogger, arguments); } : 
                    function(msg, data) { console.log(`CONVERTER DETAIL: ${msg}`, data); },
                    
                // Event logging
                logEvent: typeof baseLogger.logEvent === 'function' ? 
                    function() { baseLogger.logEvent.apply(baseLogger, arguments); } : 
                    function(msg, data) { console.log(`EVENT: ${msg}`, data); },
                    
                // Component logging
                logComponent: typeof baseLogger.logComponent === 'function' ? 
                    function() { baseLogger.logComponent.apply(baseLogger, arguments); } : 
                    function(msg, data) { console.log(`COMPONENT: ${msg}`, data); },
                    
                // Render logging
                logRender: typeof baseLogger.logRender === 'function' ? 
                    function() { baseLogger.logRender.apply(baseLogger, arguments); } : 
                    function(msg, data) { console.log(`RENDER: ${msg}`, data); },
                    
                logRenderDetail: typeof baseLogger.logRenderDetail === 'function' ? 
                    function() { baseLogger.logRenderDetail.apply(baseLogger, arguments); } : 
                    function(msg, data) { console.log(`RENDER DETAIL: ${msg}`, data); },
                    
                // HTML logging
                logHtml: typeof baseLogger.logHtml === 'function' ? 
                    function() { baseLogger.logHtml.apply(baseLogger, arguments); } : 
                    function(msg, data) { console.log(`HTML: ${msg}`, data); },

                logHtmlDetails: typeof baseLogger.logHtmlDetails === 'function' ? 
                    function() { baseLogger.logHtmlDetails.apply(baseLogger, arguments); } : 
                    function(msg, data) { console.log(`HTML: ${msg}`, data); },
                    
                // Overall logging
                logOverall: function(message, data = {}) {
                    // Add check for debug.enabled before logging
                    if (!window.TableConverter.CONFIG.debug.enabled) return;
                    // Only then check for logOverall being enabled
                    if (!window.TableConverter.CONFIG.debug.logOverall) return;
                    this.log(message, data, 'overall');
                },
                    
                // Error logging
                error: typeof baseLogger.error === 'function' ? 
                    function() { baseLogger.error.apply(baseLogger, arguments); } : 
                    function(msg, data) { console.error(msg, data); },
                    
                // Group methods
                groupStart: typeof baseLogger.groupStart === 'function' ? 
                    function() { baseLogger.groupStart.apply(baseLogger, arguments); } : 
                    function(title) { console.group ? console.group(title) : console.log(`=== ${title} ===`); },
                    
                groupEnd: typeof baseLogger.groupEnd === 'function' ? 
                    function() { baseLogger.groupEnd.apply(baseLogger, arguments); } : 
                    function() { console.groupEnd ? console.groupEnd() : console.log('=== END ==='); },
                    
                // Timer methods
                startTimer: typeof baseLogger.startTimer === 'function' ? 
                    function() { return baseLogger.startTimer.apply(baseLogger, arguments); } : 
                    function(name) { return { start: Date.now(), name: name }; },
                    
                endTimer: typeof baseLogger.endTimer === 'function' ? 
                    function(timer) { return baseLogger.endTimer(timer); } : 
                    function(timer) { 
                        if (timer && timer.start) {
                            const duration = Date.now() - timer.start;
                            console.log(`TIMER ${timer.name}: ${duration}ms`);
                            return duration;
                        }
                        return 0;
                    },
                    
                // Marker specific functions
                logMarkerFound: typeof baseLogger.logMarkerFound === 'function' ? 
                    function() { baseLogger.logMarkerFound.apply(baseLogger, arguments); } : 
                    function(markerType, element) { 
                        console.log(`MARKER FOUND: ${markerType}`, {
                            element: element?.outerHTML?.substring(0, 100) + '...'
                        });
                    },
                    
                logMarkerProcessed: typeof baseLogger.logMarkerProcessed === 'function' ? 
                    function() { baseLogger.logMarkerProcessed.apply(baseLogger, arguments); } : 
                    function(markerType, success = true) { 
                        console.log(`MARKER PROCESSED: ${markerType}`, {
                            success
                        });
                    },
                    
                // Process timing logs
                logProcessStart: typeof baseLogger.logProcessStart === 'function' ? 
                    function() { baseLogger.logProcessStart.apply(baseLogger, arguments); } : 
                    function(type, data = {}) {
                        console.log(`Starting ${type} processing`, data);
                        console.time(`Process-${type}`);
                    },
                    
                logProcessEnd: typeof baseLogger.logProcessEnd === 'function' ? 
                    function() { baseLogger.logProcessEnd.apply(baseLogger, arguments); } : 
                    function(type, data = {}) {
                        console.timeEnd(`Process-${type}`);
                        console.log(`Completed ${type} processing`, data);
                    }
            };
            
            return safeLog;
        },
        
        /**
         * Simple fallback logger that always works
         */
        createFallbackLogger: function() {
            return {
                // Core logging methods
                log: function(message, data) { console.log(message, data); },
                logProcess: function(message, data) { console.log("PROCESS:", message, data); },
                logProcessorDetail: function(message, data) { console.log("PROCESSOR DETAIL:", message, data); },
                logProcessor: function(message, data) { console.log("PROCESSOR:", message, data); },
                logMarker: function(message, data) { console.log("MARKER:", message, data); },
                logMarkerDetail: function(message, data) { console.log("MARKER DETAIL:", message, data); },
                logAnalysis: function(message, data) { console.log("ANALYSIS:", message, data); },
                logAnalysisDetail: function(message, data) { console.log("ANALYSIS DETAIL:", message, data); },
                logConverter: function(message, data) { console.log("CONVERTER:", message, data); },
                logConverterDetail: function(message, data) { console.log("CONVERTER DETAIL:", message, data); },
                logEvent: function(message, data) { console.log("EVENT:", message, data); },
                logComponent: function(message, data) { console.log("COMPONENT:", message, data); },
                logRender: function(message, data) { console.log("RENDER:", message, data); },
                logRenderDetail: function(message, data) { console.log("RENDER DETAIL:", message, data); },
                logHtml: function(message, data) { console.log("HTML:", message, data); },
                logOverall: function(message, data) { console.log("OVERALL:", message, data); },
                error: function(message, data) { console.error(message, data); },
                groupStart: function(title) { console.group ? console.group(title) : console.log(`=== ${title} ===`); },
                groupEnd: function() { console.groupEnd ? console.groupEnd() : console.log('=== END ==='); },
                startTimer: function(name) { return { start: Date.now(), name: name }; },
                endTimer: function(timer) { 
                    if (timer && timer.start) {
                        const duration = Date.now() - timer.start;
                        console.log(`TIMER ${timer.name}: ${duration}ms`);
                        return duration;
                    }
                    return 0;
                },
                logMarkerFound: function(markerType, element) { console.log(`MARKER FOUND: ${markerType}`); },
                logMarkerProcessed: function(markerType, success) { console.log(`MARKER PROCESSED: ${markerType}`, { success }); },
                logProcessStart: function(type, data) { console.log(`Starting ${type} processing`, data); console.time(`Process-${type}`); },
                logProcessEnd: function(type, data) { console.timeEnd(`Process-${type}`); console.log(`Completed ${type} processing`, data); }
            };
        },
        
        /**
         * Improved ensureSafeLogger with direct fallback creation
         */
        ensureSafeLogger: function(inputLogger) {
            // If input is null/undefined or doesn't have log method, use created fallback
            if (!inputLogger || typeof inputLogger.log !== 'function') {
                return this.createFallbackLogger();
            }
            
            // Check if we've already wrapped this logger
            if (inputLogger._isSafeLogger) {
                return inputLogger;
            }
            
            // Create a safe wrapper
            return this.safeLogger(inputLogger);
        }
    },

// 3. Core Utility Methods
    /**
     * utilities - Shared Function Library and Resource Manager
     * 
     * A comprehensive collection of reusable helper functions and resource
     * management tools that support the entire TableConverter system:
     * 
     * 1. Container Management:
     *    - Implements debounced container lookups to prevent excessive DOM queries
     *    - Provides centralized container caching and validation
     *    - Offers container-specific operation helpers (getContainerWithContent)
     *    - Manages container references across component boundaries
     * 
     * 2. Event Management:
     *    - Implements tracking-based event listener cleanup
     *    - Prevents memory leaks through WeakSet-based handler tracking
     *    - Provides event delegation helpers for performance
     *    - Handles touch event normalization for mobile devices
     * 
     * 3. DOM Utilities:
     *    - Offers text sanitization and normalization methods
     *    - Provides safe DOM manipulation functions
     *    - Implements HTML content analysis and comparison tools
     *    - Handles attribute management with validation
     * 
     * 4. Resource Management:
     *    - Controls loading indicator lifecycle with progress tracking
     *    - Implements comprehensive resource cleanup during navigation
     *    - Manages DOM reference tracking for safe operations
     *    - Provides memory management helpers to prevent leaks
     * 
     * 5. Error Handling:
     *    - Implements resilient operation wrappers
     *    - Provides recovery mechanisms for common failure scenarios
     *    - Integrates with state management for error tracking
     *    - Offers safe execution environments for critical operations
     * 
     * This object forms the foundation of the system, providing consistent,
     * optimized implementations of common operations throughout the codebase.
     */       
    utilities: {

        // Track elements that have been cleaned
        _cleanedElements: new WeakSet(),

        // HTML Parent Container
            /**
             * Container Optimization Strategy
             * 
             * This comprehensive container reference optimization eliminates redundant
             * DOM queries by implementing a multi-layered approach:
             * 
             * 1. Debounced Container Lookups:
             *    - Time-based throttling prevents excessive DOM queries during rapid operations
             *    - Tracks pending lookups with counters for performance monitoring
             *    - Automatic skipping of redundant lookups within configurable time window
             *    - Makes lookups more resilient in dynamic loading environments
             * 
             * 2. Utilities Cache:
             *    - Primary container reference stored in utilities._cachedContainer
             *    - Accessible from any component through TC.utilities._cachedContainer
             *    - Includes validation to ensure reference remains current
             *    - Centralized management through utilities.getContainer() 
             * 
             * 3. Smart Lookups:
             *    - Enhanced getContainer() with caching and validation
             *    - Option to force fresh lookup when needed (forceRefresh)
             *    - Node validation including document containment checks
             *    - Clear logging of cache hits vs. fresh lookups
             * 
             * 4. Parameter Passing:
             *    - Functions designed to accept container parameter directly
             *    - Container passed explicitly between connected functions
             *    - Falls back to cached references only when necessary
             *    - Consistent parameter ordering prioritizing container reference
             * 
             * 5. Enhanced Validation:
             *    - Centralized validation through utilities.isValidContainer()
             *    - Comprehensive checks for element type, document containment, and content
             *    - Helper method utilities.getContainerWithContent() for content-specific validation
             *    - Container operation wrapper with utilities.withContainer()
             * 
             * 6. State-Aware Management:
             *    - Cache cleared during state transitions
             *    - Integration with state management system
             *    - Safety checks with fallbacks for missing references
             *    - Proper cleanup during navigation events
             */
        
            // Store a reference to the active container
            _cachedContainer: null,
                
            // Debounce tracking
            _lastContainerLookup: 0,
            _lookupDebounceTime: 200, // ms
            _pendingLookups: 0,

            /**
             * Find the content container using CONFIG selectors with enhanced caching and debouncing
             * 
             * @param {Boolean} forceRefresh - Whether to force a fresh lookup
             * @returns {HTMLElement|null} The found container or null
             */
            getContainer: function(forceRefresh = false) {
                const TC = window.TableConverter;
                const CONFIG = TC.CONFIG;
                const logger = TC.logger;
                
                const now = Date.now();
                
                // Cached container for a longer period in stable state
                if (!forceRefresh && 
                    this._cachedContainer &&
                    TC.stateManagement && 
                    TC.stateManagement.isState(TC.stateManagement.STATES.INITIALIZED)) {
                    
                    // Extended cache validity when system is fully initialized
                    if (now - this._lastContainerLookup < this._lookupDebounceTime * 3) {
                        return this._cachedContainer;
                    }
                }
                // Normal cache check for non-initialized states
                else if (!forceRefresh && 
                    this._cachedContainer && 
                    (now - this._lastContainerLookup < this._lookupDebounceTime)) {
                    
                    // Increment pending lookups counter
                    this._pendingLookups = (this._pendingLookups || 0) + 1;
                    
                    // Only log if we're accumulating multiple lookups
                    if (this._pendingLookups > 1) {
                        logger.logProcess(`Container lookup debounced (${this._pendingLookups} pending)`);
                    }
                    
                    return this._cachedContainer;
                }
                
                // Aggressive cache reset if too many pending lookups detected
                // This suggests the cached container might be stale
                if (this._pendingLookups > 5) {
                    logger.logProcess('Excessive pending lookups - resetting cache');
                    this._cachedContainer = null;
                }
                
                // Reset pending counter
                this._pendingLookups = 0;
                
                // Update lookup time
                this._lastContainerLookup = now;
                
                // Use cached container if available and not forcing refresh
                if (!forceRefresh && this._cachedContainer) {
                    // Verify cached container is still valid
                    if (this._cachedContainer.nodeType === Node.ELEMENT_NODE && 
                        document.contains(this._cachedContainer)) {
                        
                        logger.logProcess('Using cached container reference');
                        return this._cachedContainer;
                    }
                }
                
                // Log that we're doing a fresh container lookup
                logger.logProcess('Finding container with selectors:', {
                    container: CONFIG.selectors.structure.container,
                    containerHTML: CONFIG.selectors.structure.containerHTML,
                    containerContent: CONFIG.selectors.structure.containerContent
                });
                
                // Try each selector in order, using a more efficient lookup strategy
                // First try direct lookup with the most specific selector
                let container = document.querySelector(CONFIG.selectors.structure.container);
                
                // If not found with the first selector, try alternative selectors
                if (!container) {
                    // Try combination for better performance (fewer DOM operations)
                    const selector = `${CONFIG.selectors.structure.containerHTML}, ${CONFIG.selectors.structure.containerContent}`;
                    const elements = document.querySelectorAll(selector);
                    if (elements.length > 0) {
                        container = elements[0];
                    }
                }
                
                // Log the result
                if (container) {
                    logger.logProcess('Container found:', {
                        tagName: container.tagName,
                        className: container.className,
                        id: container.id || 'none',
                        isVisible: container.style.display !== 'none'
                    });
                    
                    // Cache the container for future use
                    this._cachedContainer = container;
                } else {
                    logger.logProcess('No container found with configured selectors');
                }
                
                return container;
            },

            /**
             * Clear the cached container reference
             */
            clearContainerCache: function() {
                this._cachedContainer = null;
                this._lastContainerLookup = 0;
                this._pendingLookups = 0;
            },
            
            /**
             * Validate container with centralized checks
             * @param {HTMLElement} container - Container to validate
             * @returns {Boolean} True if container is valid
             */
            isValidContainer: function(container) {
                if (!container) return false;
                
                return (
                    container.nodeType === Node.ELEMENT_NODE && 
                    document.contains(container) &&
                    container.tagName && 
                    typeof container.innerHTML === 'string'
                );
            },

        /**
         * Cleans text by normalizing whitespace and removing HTML entities
         * @param {String} text - Text to clean
         * @returns {String} Cleaned text
         */
        cleanText: function(text) {
            return text
                .replace(/\s+/g, ' ')    // Replaces multiple whitespace characters with a single space
                .replace(/\n/g, ' ')     // Replaces newline characters with a space
                .replace(/&nbsp;/g, ' ') // Replaces non-breaking space HTML entity with a space
                .trim();                 // Removes leading and trailing whitespace
        },

        /**
         * Remove event listeners from container elements with deduplication
         * @param {HTMLElement} container - Container element to clean up
         */
        removeEventListeners: function(container) {
            if (!container) return;
            
            const TC = window.TableConverter;
            const CONFIG = TC.CONFIG;
            const logger = TC.logger;
            
            // Create or ensure the WeakSet exists
            this._cleanedElements = this._cleanedElements || new WeakSet();
            
            // Skip if container already processed
            if (this._cleanedElements.has(container)) {
                logger.logEvent('Container already cleaned - skipping', {
                    containerSelector: container.tagName,
                    id: container.id || 'no-id'
                });
                return;
            }
            
            try {
                // Build selectors list from CONFIG values
                const selectors = [
                    // Accordion elements
                    CONFIG.selectors.components.accordion.trigger,
                    `[data-accordion]`,
                    `.${CONFIG.selectors.components.accordion.root}`,
                    `.${CONFIG.selectors.components.accordion.list}`,
                    `.${CONFIG.selectors.components.accordion.item}`,
                    `.${CONFIG.selectors.components.accordion.content}`,
                    
                    // Carousel elements
                    CONFIG.selectors.components.carousel.root,
                    CONFIG.selectors.components.carousel.track,
                    CONFIG.selectors.components.carousel.slide,
                    CONFIG.selectors.components.carousel.navigation.prev,
                    CONFIG.selectors.components.carousel.navigation.next,
                    CONFIG.selectors.components.carousel.navigation.dot,
                    
                    // Collapse elements
                    CONFIG.selectors.collapse.button,
                    CONFIG.selectors.collapse.container,
                    
                    // Structure elements
                    `.${CONFIG.selectors.structure.responsiveWrapper}`,
                    `.${CONFIG.selectors.structure.tableWrapper}`
                ].join(', ');
                
                // Find all elements matching our selectors
                const elements = container.querySelectorAll(selectors);
                const processedCount = { total: 0, skipped: 0 };
                
                // Remove all event listeners
                elements.forEach(element => {
                    // Skip if element already processed
                    if (this._cleanedElements.has(element)) {
                        processedCount.skipped++;
                        return;
                    }
                    
                    // For elements with explicit bound handlers
                    if (element._boundHandlers) {
                        Object.entries(element._boundHandlers).forEach(([eventType, handler]) => {
                            element.removeEventListener(eventType, handler);
                        });
                        delete element._boundHandlers;
                    }
                    
                    // Handle touch events on carousel tracks
                    if (element.matches(CONFIG.selectors.components.carousel.track)) {
                        ['touchstart', 'touchmove', 'touchend'].forEach(eventType => {
                            // Create a no-op function to release the old listeners
                            const noop = () => {};
                            element.addEventListener(eventType, noop, { passive: true });
                            element.removeEventListener(eventType, noop, { passive: true });
                        });
                        
                        // Clear touch state
                        if (element._touchStartX) delete element._touchStartX;
                        if (element._touchStartY) delete element._touchStartY;
                    }
                    
                    // Clear any transition styles
                    if (element.style) {
                        element.style.transition = 'none';
                        // For expanded content elements, reset height
                        if (element.matches(`.${CONFIG.selectors.components.accordion.content}`)) {
                            element.style.height = '';
                        }
                    }
                    
                    // Mark as processed
                    this._cleanedElements.add(element);
                    processedCount.total++;
                });
                
                // Mark container as processed
                this._cleanedElements.add(container);
                
                logger.logEvent('Event listeners removed successfully', {
                    containerSelector: container.tagName,
                    elementCount: processedCount.total,
                    skippedCount: processedCount.skipped
                });
            } catch (error) {
                logger.error('Error removing event listeners:', error);
            }
        },

        /**
         * Remove all event listeners from the document and components
         */
        removeAllEventListeners: function() {
            const TC = window.TableConverter;
            const logger = TC.logger;
            const CONFIG = TC.CONFIG;
            
            logger.logEvent('Removing all event listeners');
            
            // Reset tracking for fresh cleanup
            this._cleanedElements = new WeakSet();
            
            // Remove old delegated handler if it exists
            if (TC._boundEventHandler) {
                document.removeEventListener('click', TC._boundEventHandler);
                delete TC._boundEventHandler;
            }

            // Clean up responsive containers
            const containers = document.querySelectorAll(`.${CONFIG.selectors.structure.responsiveWrapper}`);
            if (containers.length > 0) {
                // Process containers, logging once for the group
                let totalElements = 0;
                containers.forEach(container => {
                    // Count elements before cleaning
                    const count = container.querySelectorAll('*').length;
                    totalElements += count;
                    
                    // Clean the container
                    this.removeEventListeners(container);
                });
                
                logger.logEvent('Cleaned all responsive containers', {
                    containerCount: containers.length,
                    totalElementCount: totalElements
                });
            } else {
                // If no specific containers, clean the main container
                const container = this.getContainer();
                if (container) {
                    this.removeEventListeners(container);
                }
            }
        },
        
        /**
         * Clear event tracking on navigation or reset
         */
        clearEventTracking: function() {
            this._cleanedElements = new WeakSet();
        },

        /**
         * Clean up resources and reset state
         */
        cleanup: function() {
            const TC = window.TableConverter;
            const logger = TC.logger;
            
            logger.log('Starting cleanup process');
            
            try {
                // Reset WeakMaps
                TC.converted = new WeakMap();
                TC.originalTables = new WeakMap();
                
                // Remove loading indicators
                if (TC.utilities.loadingIndicator && TC.utilities.loadingIndicator._removeAllLoaders) {
                    TC.utilities.loadingIndicator._removeAllLoaders();
                }
                
                // Disconnect observer
                if (TC.observer) {
                    TC.observer.disconnect();
                    TC.observer = null;
                    logger.log('Observer disconnected');
                }
                
                logger.log('Cleanup completed - all state reset');
            } catch (error) {
                logger.error('Error during cleanup:', error);
            }
        },

        /**
         * HTML content comparison helper for debugging
         */
        logHtmlDetails: function(label, html, container) {
            const TC = window.TableConverter;
            const logger = TC.logger || window.TableConverter.logger;
            
            if (!html) {
                logger.logHtmlDetails(`HTML CHECK (${label}): No HTML content available`, {
                    hasContent: false
                });
                return;
            }
            
            // Create regex pattern from marker types in configuration
            const markerPatterns = Object.values(TC.CONFIG.markers.types)
                .filter(m => m && m.isActive)
                .map(m => m.name)
                .join('|');
            const markerRegex = new RegExp(markerPatterns, 'g');
            
            // Get details about the HTML string
            const length = html.length;
            const start = html.substring(0, 50);
            const end = html.substring(Math.max(0, length - 50));
            const tableCount = (html.match(/<table/g) || []).length;
            const h2Count = (html.match(/<h2/g) || []).length;
            const markerCount = (html.match(markerRegex) || []).length;
            
            // Log detailed info about the HTML content
            logger.logHtmlDetails(`HTML CHECK (${label}): Content analysis`, {
                length: length,
                start: start,
                end: end,
                tableCount: tableCount,
                h2Count: h2Count,
                markerCount: markerCount,
                hasDivs: html.includes('<div'),
                hasResponsiveContainer: html.includes('responsive-table-container'),
                contentHash: length.toString() + tableCount.toString() + h2Count.toString()
            });
            
            // If container is provided, also analyze the live DOM
            if (container && container.nodeType === Node.ELEMENT_NODE) {
                logger.logHtmlDetails(`HTML CHECK (${label}): DOM container analysis`, {
                    nodeName: container.nodeName,
                    childCount: container.childNodes.length,
                    innerHTML_length: container.innerHTML.length,
                    firstChild: container.firstChild ? container.firstChild.nodeName : 'none',
                    className: container.className,
                    tableCount: container.querySelectorAll('table').length,
                    h2Count: container.querySelectorAll('h2').length,
                    responsiveContainers: container.querySelectorAll('.responsive-table-container').length
                });
            }
        },

        /**
         * loadingIndicator - Advanced Processing Feedback System
         * 
         * A comprehensive visual feedback system with progress tracking capabilities
         * to provide users with accurate processing status. This system:
         * 
         * 1. Visual Presentation:
         *    - Displays modal overlay with configurable opacity
         *    - Provides animated spinner for visual activity indication
         *    - Shows progress bar with accurate percentage completion
         *    - Updates message text dynamically during processing
         *    - Applies consistent styling through centralized CSS
         * 
         * 2. Progress Tracking:
         *    - Maintains accurate count of processed items
         *    - Calculates and displays percentage completion
         *    - Prevents backward progress with validation checks
         *    - Supports count-based or message-only operation modes
         *    - Auto-hides upon completion with configurable delay
         * 
         * 3. State Management:
         *    - Tracks active loaders to prevent duplicates
         *    - Manages element references for reliable updates
         *    - Implements safety timeouts to prevent stuck indicators
         *    - Enforces minimum display times for UX consistency
         *    - Supports immediate or animated transitions
         * 
         * 4. Error Resilience:
         *    - Recovers from missing references with element queries
         *    - Provides direct DOM cleanup for error recovery
         *    - Implements style encapsulation to prevent CSS conflicts
         *    - Supports forced hiding in error conditions
         *    - Creates and maintains element references safely
         * 
         * 5. Integration Hooks:
         *    - Exposes show(), hide(), updateProgress(), and updateMessage() methods
         *    - Tracks active indicators with _state.activeLoaders collection
         *    - Reports timing with timestamp tracking
         *    - Supports integration with tableTracking system
         *    - Provides DOM cleanup with _removeAllLoaders() method
         * 
         * This system ensures users receive accurate and responsive feedback
         * during long-running operations, enhancing perceived performance and
         * providing actionable status information.
         */
        loadingIndicator: {
            styles: `
                .tc-loading-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(255, 255, 255, 0.85);
                    z-index: 9999;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
                .tc-loading-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 20px;
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
                    min-width: 250px;
                }
                
                .tc-loading-spinner {
                    width: 40px;
                    height: 40px;
                    border: 4px solid rgba(114, 190, 68, 0.3);
                    border-radius: 50%;
                    border-top-color: #72BE44;
                    animation: tc-spinner-rotation 0.8s linear infinite;
                    margin-bottom: 15px;
                }
                
                @keyframes tc-spinner-rotation {
                    to { transform: rotate(360deg); }
                }
                
                .tc-loading-message {
                    font-family: Arial, sans-serif;
                    color: #333;
                    font-size: 14px;
                    font-weight: bold;
                    text-align: center;
                    margin-bottom: 10px;
                }
                
                .tc-loading-progress {
                    width: 100%;
                    height: 8px;
                    background-color: #f0f0f0;
                    border-radius: 4px;
                    overflow: hidden;
                }
                
                .tc-loading-progress-bar {
                    height: 100%;
                    background-color: #72BE44;
                    width: 0%;
                    transition: width 0.3s ease-out;
                }
            `,
            
            // State tracking
            _state: {
                isLoading: false,
                showTimestamp: 0,
                safetyTimeout: null,
                elements: {
                    overlay: null,
                    message: null,
                    progressBar: null
                },
                activeLoaders: new Set(),
                progress: {
                    current: 0,
                    total: 0,
                    lastUpdate: 0
                }
            },
            
            /**
             * Displays the loading indicator with optional progress tracking
             * 
             * Creates and shows a loading overlay with spinner and optional progress bar.
             * The indicator supports both simple message mode and progress tracking mode.
             * 
             * @param {String} message - Message to display in the loading indicator
             * @param {Number} totalItems - Total items to process (enables progress bar if > 0)
             * @returns {Boolean} Success status of the operation
             */            
            show: function(message = 'Processing...', totalItems = 0) {
                const TC = window.TableConverter;
                if (!TC) {
                    console.error('TableConverter not available for loading indicator');
                    return false;
                }
                
                const CONFIG = TC.CONFIG;
                const logger = TC.logger || console;
                
                // CRITICAL: Check config FIRST before doing anything else
                if (CONFIG.ui && CONFIG.ui.showLoadingIndicator === false) {
                    logger.logProcess('LOADER: Loading indicator disabled in config');
                    return false;
                }
                
                if (CONFIG.ui && CONFIG.ui.showOnlyOnce === true) {  
                    TC._loadingIndicatorShownOnce = true;
                    logger.logProcess('LOADER: Marked as shown once for this page');
                }
                
                logger.logProcess('LOADER: Attempting to show loading indicator', {
                    message: message,
                    totalItems: totalItems
                });
                
                try {
                    // Always clean up existing loaders first
                    this._removeAllLoaders();
                    
                    // Cancel any existing safety timeout
                    if (this._state.safetyTimeout) {
                        clearTimeout(this._state.safetyTimeout);
                        this._state.safetyTimeout = null;
                    }
                    
                    // Use the provided totalItems directly - don't override with tableTracking
                    let tableCount = totalItems;
            
                    // Only use tableTracking if no totalItems was provided
                    if ((!tableCount || tableCount === 0) && TC.tableTracking) {
                        const status = TC.tableTracking.getStatus();
                        if (status && status.toProcess > 0) {
                            tableCount = status.toProcess;
                            logger.logProcess('LOADER: Using tableTracking count as fallback', { count: tableCount });
                        }
                    }
                    
                    // Update state
                    this._state.isLoading = true;
                    this._state.showTimestamp = Date.now();
                    this._state.progress.current = 0;
                    this._state.progress.total = tableCount;
                    this._state.progress.lastUpdate = 0;
                    
                    // Inject styles if not already present
                    if (!document.getElementById('tc-loading-styles')) {
                        const styleElement = document.createElement('style');
                        styleElement.id = 'tc-loading-styles';
                        styleElement.textContent = this.styles;
                        document.head.appendChild(styleElement);
                    }
                    
                    // Create overlay
                    const overlay = document.createElement('div');
                    overlay.className = 'tc-loading-overlay';
                    overlay.setAttribute('data-tc-loader', 'true');
                    
                    // Create container
                    const container = document.createElement('div');
                    container.className = 'tc-loading-container';
                    
                    // Create spinner
                    const spinner = document.createElement('div');
                    spinner.className = 'tc-loading-spinner';
                    
                    // Create message
                    const messageElement = document.createElement('div');
                    messageElement.className = 'tc-loading-message';
                    if (tableCount > 0) {
                        messageElement.textContent = `${message} (0/${tableCount})`;
                    } else {
                        messageElement.textContent = message;
                    }
                    
                    // Store references
                    this._state.elements.overlay = overlay;
                    this._state.elements.message = messageElement;
                    
                    // Assemble DOM
                    container.appendChild(spinner);
                    container.appendChild(messageElement);
                    
                    // Add progress bar if we have a total count
                    if (tableCount > 0) {
                        const progressContainer = document.createElement('div');
                        progressContainer.className = 'tc-loading-progress';
                        
                        const progressBar = document.createElement('div');
                        progressBar.className = 'tc-loading-progress-bar';
                        progressBar.style.width = '0%';
                        
                        progressContainer.appendChild(progressBar);
                        container.appendChild(progressContainer);
                        
                        this._state.elements.progressBar = progressBar;
                    }
                    
                    overlay.appendChild(container);
                    document.body.appendChild(overlay);
                    
                    // Track this loader
                    this._state.activeLoaders.add(overlay);
                    
                    // NEW: Mark that we've shown the indicator on this page
                    if (CONFIG.ui && CONFIG.ui.showLoadingOnlyOnce === true) {
                        TC._loadingIndicatorShownOnce = true;
                        logger.logProcess('LOADER: Marked as shown once for this page');
                    }
                    
                    // Set up safety timeout (10 seconds)
                    this._state.safetyTimeout = setTimeout(() => {
                        logger.logProcess('LOADER: Safety timeout triggered - hiding indicator');
                        this.hide(true);
                    }, 10000);
                    
                    logger.logProcess('LOADER: Loading indicator shown successfully');
                    return true;
                } catch (error) {
                    logger.error('LOADER: Error showing loading indicator', error);
                    this._state.isLoading = false;
                    return false;
                }
            },
            
            /**
             * Updates the progress bar and message with current progress
             * 
             * Calculates percentage and updates the progress bar width and message text.
             * Includes validation to prevent backward progress and handles completion.
             * 
             * @param {Number} current - Current number of processed items
             * @param {Number} total - Optional override for total items count
             * @returns {void}
             */            
            updateProgress: function(current, total = null) {
                const TC = window.TableConverter;
                if (!TC) return;
                
                const logger = TC.logger || console;
                
                try {
                    // Check if loading is active
                    if (!this._state.isLoading) {
                        // Try to reactivate if overlay exists
                        if (document.querySelector('[data-tc-loader="true"]')) {
                            this._state.isLoading = true;
                            logger.logProcess('LOADER: Reactivating loading state');
                        } else {
                            return;
                        }
                    }
                    
                    // Get reliable values
                    let processedCount = current;
                    let totalCount = total;
                    
                    // Use existing total if not specified OR if zero was passed
                    if (totalCount === null || isNaN(totalCount) || totalCount === 0) {
                        totalCount = this._state.progress.total;
                    }
                    
                    // If a new valid total that's different, update the stored total
                    if (totalCount > 0 && totalCount !== this._state.progress.total) {
                        logger.logProcess('LOADER: Updating stored total count', {
                            oldTotal: this._state.progress.total,
                            newTotal: totalCount
                        });
                        this._state.progress.total = totalCount;
                    }
                    
                    // Default to zeros for protection
                    if (isNaN(processedCount)) processedCount = 0;
                    if (isNaN(totalCount) || totalCount <= 0) totalCount = 1; // Prevent division by zero
                    
                    // Prevent progress from going backwards
                    if (processedCount < this._state.progress.current) {
                        logger.logProcess('LOADER: Preventing backwards progress', {
                            current: processedCount,
                            previous: this._state.progress.current
                        });
                        processedCount = this._state.progress.current;
                    }
                    
                    // Store for consistency
                    this._state.progress.current = processedCount;
                    
                    // Calculate percentage
                    const percentage = Math.min(Math.round((processedCount / totalCount) * 100), 100);
                    
                    // Update progress bar
                    if (this._state.elements.progressBar) {
                        this._state.elements.progressBar.style.width = `${percentage}%`;
                    }
                    
                    // Update message
                    if (this._state.elements.message) {
                        this._state.elements.message.textContent = `Processing tables (${processedCount}/${totalCount})`;
                    }
                    
                    logger.logProcess('LOADER: Progress updated', {
                        current: processedCount,
                        total: totalCount,
                        percentage: percentage + '%'
                    });
                    
                    // If complete, auto-hide after delay
                    if (processedCount >= totalCount && totalCount > 0) {
                        setTimeout(() => {
                            if (this._state.isLoading) {
                                logger.logProcess('LOADER: Progress complete - auto-hiding');
                                this.hide();
                            }
                        }, 1000);
                    }
                } catch (error) {
                    logger.error('LOADER: Error updating progress', error);
                }
            },
            
            /**
             * Updates the indicator message text
             * 
             * Changes the displayed message while maintaining progress information.
             * Will attempt to reactivate the loading state if indicator exists but
             * state tracking indicates it's not active.
             * 
             * @param {String} message - New message to display
             * @returns {void}
             */            
            updateMessage: function(message) {
                const TC = window.TableConverter;
                if (!TC) return;
                
                const logger = TC.logger || console;
                
                try {
                    // Check if loading is active
                    if (!this._state.isLoading) {
                        // Try to reactivate if overlay exists
                        if (document.querySelector('[data-tc-loader="true"]')) {
                            this._state.isLoading = true;
                            logger.logProcess('LOADER: Reactivating loading state');
                        } else {
                            return;
                        }
                    }
                    
                    if (!message) return;
                    
                    // Get current progress values
                    const processedCount = this._state.progress.current;
                    const totalCount = this._state.progress.total;
                    
                    // Update message element
                    if (this._state.elements.message) {
                        if (totalCount > 0) {
                            this._state.elements.message.textContent = 
                                `${message} (${processedCount}/${totalCount})`;
                        } else {
                            this._state.elements.message.textContent = message;
                        }
                        
                        logger.logProcess('LOADER: Message updated', {
                            message: message
                        });
                    }
                } catch (error) {
                    logger.error('LOADER: Error updating message', error);
                }
            },
            
            /**
             * Hides the loading indicator with optional animation
             * 
             * Removes the indicator from the DOM with various options for timing and animation.
             * Ensures proper cleanup of resources and state management.
             * 
             * @param {Boolean} immediate - Whether to hide immediately without animation
             * @param {Number} extraDelay - Additional delay before hiding (ms)
             * @returns {void}
             */
            hide: function(immediate = false, extraDelay = 0) {
                const TC = window.TableConverter;
                if (!TC) return;
                
                const logger = TC.logger || console;
                
                try {
                    logger.logProcess('LOADER: Attempting to hide loading indicator');
                    
                    // Always check for loaders even if state says not loading
                    if (!this._state.isLoading) {
                        const loaders = document.querySelectorAll('[data-tc-loader="true"]');
                        if (loaders.length > 0) {
                            logger.logProcess(`LOADER: Found ${loaders.length} loading indicators to clean up`);
                            for (const loader of loaders) {
                                if (loader.parentNode) {
                                    loader.parentNode.removeChild(loader);
                                }
                            }
                        }
                        return;
                    }
                    
                    // Cancel safety timeout
                    if (this._state.safetyTimeout) {
                        clearTimeout(this._state.safetyTimeout);
                        this._state.safetyTimeout = null;
                    }
                    
                    // Calculate visible time
                    const visibleTime = Date.now() - this._state.showTimestamp;
                    
                    // Show for at least 500ms
                    let actualDelay = extraDelay;
                    if (visibleTime < 500) {
                        actualDelay += (500 - visibleTime);
                    }
                    
                    const hideFunc = () => {
                        // Reset state
                        this._state.isLoading = false;
                        
                        // Get overlay reference
                        const overlay = this._state.elements.overlay;
                        
                        // Reset element references
                        this._state.elements.overlay = null;
                        this._state.elements.message = null;
                        this._state.elements.progressBar = null;
                        
                        // Reset progress
                        this._state.progress.current = 0;
                        this._state.progress.total = 0;
                        
                        if (!overlay) {
                            // Try to find by selector as fallback
                            const loaders = document.querySelectorAll('[data-tc-loader="true"]');
                            loaders.forEach(loader => {
                                if (loader.parentNode) {
                                    loader.parentNode.removeChild(loader);
                                }
                                // Remove from tracking set
                                this._state.activeLoaders.delete(loader);
                            });
                            return;
                        }
                        
                        // Remove from tracking set
                        this._state.activeLoaders.delete(overlay);
                        
                        if (immediate) {
                            if (overlay.parentNode) {
                                overlay.parentNode.removeChild(overlay);
                            }
                        } else {
                            overlay.style.opacity = '0';
                            overlay.style.transition = 'opacity 0.5s ease-out';
                            
                            setTimeout(() => {
                                if (overlay.parentNode) {
                                    overlay.parentNode.removeChild(overlay);
                                }
                            }, 500);
                        }
                        
                        logger.logProcess('LOADER: Loading indicator hidden');
                    };
                    
                    if (actualDelay > 0) {
                        setTimeout(hideFunc, actualDelay);
                    } else {
                        hideFunc();
                    }
                } catch (error) {
                    logger.error('LOADER: Error hiding loading indicator', error);
                    
                    // Attempt to clean up loaders directly
                    const loaders = document.querySelectorAll('[data-tc-loader="true"]');
                    loaders.forEach(loader => {
                        if (loader.parentNode) {
                            loader.parentNode.removeChild(loader);
                        }
                    });
                }
            },
            
            /**
             * Removes all loader elements from the page
             * 
             * Performs a comprehensive cleanup of all loading indicators and resets state.
             * This method is crucial for preventing UI artifacts and maintaining clean state.
             * 
             * @returns {void}
             */
            _removeAllLoaders: function() {
                try {
                    const TC = window.TableConverter;
                    const logger = TC && TC.logger ? TC.logger : console;
                    
                    logger.logProcess('LOADER: Removing all loaders');
                    
                    // Clean up tracked loaders
                    if (this._state.activeLoaders) {
                        for (const loader of this._state.activeLoaders) {
                            if (loader.parentNode) {
                                loader.parentNode.removeChild(loader);
                            }
                        }
                        
                        // Clear tracking set
                        this._state.activeLoaders.clear();
                    }
                    
                    // Reset state
                    this._state.isLoading = false;
                    this._state.elements = {
                        overlay: null,
                        message: null,
                        progressBar: null
                    };
                    
                    // Cancel safety timeout
                    if (this._state.safetyTimeout) {
                        clearTimeout(this._state.safetyTimeout);
                        this._state.safetyTimeout = null;
                    }
                    
                    // Reset progress
                    this._state.progress = {
                        current: 0,
                        total: 0,
                        lastUpdate: 0
                    };
                    
                    // Find any untracked loaders
                    const loaders = document.querySelectorAll('[data-tc-loader="true"]');
                    loaders.forEach(loader => {
                        if (loader.parentNode) {
                            loader.parentNode.removeChild(loader);
                        }
                    });
                    
                    logger.logProcess('LOADER: All loaders removed');
                } catch (error) {
                    console.error('LOADER: Error in _removeAllLoaders', error);
                }
            },
            
            /**
             * Ensures loading styles are added to the document
             * 
             * Adds required CSS styles to the document head if not already present.
             * Prevents duplicate style elements by checking for existing ID.
             * 
             * @returns {void}
             */
            _ensureStylesAdded: function() {
                try {
                    if (document.getElementById('tc-loader-styles')) return;
                    
                    const styleElement = document.createElement('style');
                    styleElement.id = 'tc-loader-styles';
                    styleElement.textContent = this.styles;
                    document.head.appendChild(styleElement);
                    
                    const TC = window.TableConverter;
                    const logger = TC && TC.logger ? TC.logger : console;
                    logger.logProcess('LOADER: Styles added to document');
                } catch (error) {
                    console.error('LOADER: Error adding styles', error);
                }
            }
        }
    },

// 4. State Management and Table Tracking
    /**
     * TableConverter State Management System
     * 
     * A comprehensive state tracking and transition management system that
     * coordinates application behavior across multiple components. This system:
     * 
     * 1. Granular State Definition:
     *    - Defines 20+ distinct application states with semantic names
     *    - Organizes states into logical groups (initialization, view, component)
     *    - Supports multi-level state hierarchies
     *    - Prevents invalid state transitions through validation
     * 
     * 2. Transition Management:
     *    - Tracks state transitions with timestamps
     *    - Records transition metadata and context
     *    - Prevents redundant state setting
     *    - Provides logging for all state changes
     * 
     * 3. History Tracking:
     *    - Maintains bounded history of state transitions
     *    - Records state transition timestamps
     *    - Preserves contextual metadata
     *    - Supports debugging through history inspection
     * 
     * 4. Performance Monitoring:
     *    - Captures timing metrics for state durations
     *    - Tracks initialization and processing times
     *    - Provides performance reports for optimization
     *    - Identifies bottlenecks through transition timing
     * 
     * 5. Declarative State Checking:
     *    - Supports both single and multi-state checking
     *    - Provides semantic helpers (isMobileView, isDesktopView)
     *    - Enables complex conditional logic based on state
     *    - Improves code readability with declarative state conditions
     * 
     * 6. Error Handling Integration:
     *    - Dedicated error state with detailed tracking
     *    - Captures and stores error information
     *    - Supports recovery paths through state system
     *    - Provides context for error diagnosis
     * 
     * 7. Workflow Management:
     *    - Helper methods for common state sequences
     *    - Convenience transitions for view management
     *    - Component lifecycle state support
     *    - Processing state coordination
     * 
     * This state management system replaces ad-hoc boolean flags with a
     * structured, centralized approach to application state tracking,
     * resulting in more maintainable, debuggable, and robust code.
     */
    stateManagement: {
        STATES: {
            // Core initialization states
            UNINITIALIZED: 'uninitialized',
            INITIALIZING: 'initializing',
            INITIALIZED: 'initialized',
            
            // Content detection states
            WAITING_FOR_CONTENT: 'waiting_for_content',
            OBSERVER_ACTIVE: 'observer_active',
            CONTENT_DETECTED: 'content_detected',
            
            // View processing states
            MOBILE_VIEW_PROCESSING: 'mobile_view_processing',
            MOBILE_VIEW_READY: 'mobile_view_ready',
            DESKTOP_VIEW_PROCESSING: 'desktop_view_processing',
            DESKTOP_VIEW_READY: 'desktop_view_ready',
            
            // Component states
            COMPONENT_INITIALIZATION: 'component_initialization',
            
            // Content management states
            CONTENT_SAVING: 'content_saving',
            CONTENT_RESTORATION: 'content_restoration',
            
            // Enhanced table processing states
            TABLE_DETECTION: 'table_detection',         // Scanning document for tables
            TABLE_PREPARATION: 'table_preparation',     // Preparing tables for processing
            TABLE_BATCH_START: 'table_batch_start',     // Starting a batch of tables
            TABLE_BATCH_PROCESSING: 'table_batch_processing', // Processing tables in a batch
            TABLE_BATCH_COMPLETE: 'table_batch_complete', // Batch complete
            TABLE_PROCESSING_COMPLETE: 'table_processing_complete', // All tables processed
            
            // Original processing states
            TABLE_PROCESSING: 'table_processing',
            VIDEO_PROCESSING: 'video_processing',
            MARKER_PROCESSING: 'marker_processing',
            
            // Event states
            EVENT_HANDLER_SETUP: 'event_handler_setup',
            EVENT_HANDLER_CLEANUP: 'event_handler_cleanup',
            
            // Error state
            ERROR: 'error'
        },
        
        // Current state - starts as uninitialized
        _currentState: 'uninitialized',
        
        // Track state history for debugging
        _stateHistory: [],
        _maxHistoryLength: 20,
        
        // Additional metadata
        _metadata: {
            startTime: null,
            errorDetails: null,
            lastStateChange: null,
            performance: {}
        },
        
        /**
         * Get current initialization state
         * @returns {String} Current state
         */
        getState: function() {
            return this._currentState;
        },
        
        /**
         * Get state history
         * @returns {Array} State change history
         */
        getStateHistory: function() {
            return this._stateHistory;
        },
        
        /**
         * Set initialization state with metadata and history tracking
         * @param {String} state - New state
         * @param {Object} metadata - Optional metadata about state change
         */
        setState: function(state, metadata = {}) {
            const TC = window.TableConverter;
            const logger = TC.logger;
            
            // Validate state
            if (!this.STATES[state] && !Object.values(this.STATES).includes(state)) {
                logger.error('Invalid state: ' + state);
                return;
            }
            
            // Log state change if different
            if (this._currentState !== state) {
                const oldState = this._currentState;
                const timestamp = new Date();
                
                // Add to state history
                this._stateHistory.push({
                    from: oldState,
                    to: state,
                    timestamp: timestamp,
                    metadata: { ...metadata }
                });
                
                // Trim history if too long
                if (this._stateHistory.length > this._maxHistoryLength) {
                    this._stateHistory.shift();
                }
                
                // Update current state
                this._currentState = state;
                this._metadata.lastStateChange = timestamp;
                
                // Add performance timing
                if (this._metadata.startTime) {
                    const duration = timestamp - this._metadata.startTime;
                    this._metadata.performance[state] = {
                        timestamp: timestamp,
                        duration: duration,
                        fromState: oldState
                    };
                }
                
                // Merge metadata
                Object.assign(this._metadata, metadata);
                
                logger.logProcess(`State changed: ${oldState} -> ${state}`, metadata);
            }
        },
        
        /**
         * Check if current state matches expected
         * @param {String|Array} expectedState - Single state or array of allowed states
         * @returns {Boolean} True if state matches expected
         */
        isState: function(expectedState) {
            if (Array.isArray(expectedState)) {
                return expectedState.includes(this._currentState);
            }
            return this._currentState === expectedState;
        },
        
        /**
         * Check if the current state is one of the mobile view states
         * @returns {Boolean} True if in mobile view state
         */
        isMobileView: function() {
            return this.isState([
                this.STATES.MOBILE_VIEW_PROCESSING,
                this.STATES.MOBILE_VIEW_READY
            ]);
        },
        
        /**
         * Check if the current state is one of the desktop view states
         * @returns {Boolean} True if in desktop view state
         */
        isDesktopView: function() {
            return this.isState([
                this.STATES.DESKTOP_VIEW_PROCESSING,
                this.STATES.DESKTOP_VIEW_READY
            ]);
        },
        
        /**
         * Reset state to uninitialized
         */
        reset: function() {
            // Save history before reset
            const lastHistory = [...this._stateHistory];
            
            this._currentState = this.STATES.UNINITIALIZED;
            this._stateHistory = [];
            
            this._metadata = {
                startTime: null,
                errorDetails: null,
                lastStateChange: new Date(),
                previousHistory: lastHistory,
                performance: {}
            };
        },
        
        /**
         * Mark initialization as started
         */
        startInitialization: function() {
            const startTime = new Date();
            this._metadata.startTime = startTime;
            
            this.setState(this.STATES.INITIALIZING, {
                startTime: startTime
            });
        },
        
        /**
         * Mark initialization as complete
         */
        completeInitialization: function() {
            const completionTime = new Date();
            const duration = this._metadata.startTime ? 
                (completionTime - this._metadata.startTime) : null;
                
            this.setState(this.STATES.INITIALIZED, {
                completionTime: completionTime,
                duration: duration
            });
        },
        
        /**
         * Enter waiting for content state
         */
        waitForContent: function() {
            this.setState(this.STATES.WAITING_FOR_CONTENT);
        },
        
        /**
         * Set observer active state
         */
        observerActive: function() {
            this.setState(this.STATES.OBSERVER_ACTIVE);
        },
        
        /**
         * Start mobile view processing
         */
        startMobileView: function() {
            this.setState(this.STATES.MOBILE_VIEW_PROCESSING);
        },
        
        /**
         * Complete mobile view processing
         */
        completeMobileView: function() {
            this.setState(this.STATES.MOBILE_VIEW_READY);
        },
        
        /**
         * Start desktop view processing
         */
        startDesktopView: function() {
            this.setState(this.STATES.DESKTOP_VIEW_PROCESSING);
        },
        
        /**
         * Complete desktop view processing
         */
        completeDesktopView: function() {
            this.setState(this.STATES.DESKTOP_VIEW_READY);
        },
        
        /**
         * Set error state with details
         * @param {Error} error - Error object
         */
        setError: function(error) {
            this.setState(this.STATES.ERROR, {
                errorDetails: {
                    message: error.message,
                    stack: error.stack,
                    time: new Date()
                }
            });
        },
        
        /**
         * Get performance metrics
         * @returns {Object} Performance metrics for each state transition
         */
        getPerformanceMetrics: function() {
            return this._metadata.performance;
        }
    },
    
    /**
     * tableTracking - Comprehensive Table Processing Monitoring System
     * 
     * A centralized statistics and state management system that tracks all table operations
     * throughout the document. This sophisticated tracking system:
     * 
     * 1. Document-Wide State Management:
     *    - Maintains aggregate statistics for all tables in the document
     *    - Tracks detection, processing, success, and failure counts
     *    - Timestamps processing operations for performance measurement
     *    - Provides atomic counters for accurate concurrent operation tracking
     *    - Prevents duplicate processing through state flags
     * 
     * 2. Performance Monitoring:
     *    - Records precise start and end times for processing operations
     *    - Calculates duration metrics for processing operations
     *    - Provides time-based throttling for detection operations
     *    - Prevents excessive re-scanning with timestamp tracking
     * 
     * 3. Processing Flow Control:
     *    - Manages the isProcessing flag to prevent overlapping operations
     *    - Coordinates table batch processing with status updates
     *    - Safely resets state between processing operations
     *    - Provides atomic operations for count incrementation
     * 
     * 4. Table Detection:
     *    - Implements efficient table detection with caching
     *    - Prevents redundant scans with time-based debouncing
     *    - Uses multiple detection strategies for reliability
     *    - Differentiates between processed and unprocessed tables
     * 
     * 5. Reporting Interface:
     *    - Exposes comprehensive status reporting via getStatus()
     *    - Provides completion metrics through finishProcessing()
     *    - Enables progress monitoring through counter access
     *    - Supports integration with loading indicators
     * 
     * This system serves as the single source of truth for table processing status,
     * enabling accurate progress reporting and performance optimization throughout
     * the conversion process.
     */
    tableTracking: {
        // Centralized state for the entire document
        documentState: {
            detected: 0,        // Total tables detected at start
            toProcess: 0,       // Total unprocessed tables to convert
            processed: 0,       // Tables successfully processed
            skipped: 0,         // Tables skipped (already processed)
            failed: 0,          // Tables that failed processing
            startTime: 0,       // Timestamp when processing started
            endTime: 0,         // Timestamp when processing finished
            isProcessing: false, // Flag to prevent multiple processing flows
            _lastDetection: 0   // Timestamp of last detection to prevent rapid recounts
        },
        
        /**
         * Completely resets all tracking statistics and processing state
         * 
         * This method resets all counters, timestamps, and flags to their initial state.
         * It should be called when:
         * - Navigation to a new page occurs
         * - After processing completes to prepare for future operations
         * - When the system needs a fresh start due to errors
         * - Before initializing a new processing operation
         * 
         * @returns {void}
         */
        reset: function() {
            const TC = window.TableConverter;
            const logger = TC.logger;
            
            // Reset the state
            this.documentState = {
                detected: 0,
                toProcess: 0,
                processed: 0,
                skipped: 0,
                failed: 0,
                startTime: 0,
                endTime: 0,
                isProcessing: false,
                _lastDetection: 0
            };
            logger.logProcess('[TC TABLETRACKING] State reset');
        },
        
        /**
         * Marks the beginning of a table processing operation
         * 
         * Sets the processing flag and records the start time.
         * This method should be called before any batch or table processing begins.
         * It initializes the performance timing and prevents duplicate processing.
         * 
         * @returns {void}
         */
        startProcessing: function() {
            const TC = window.TableConverter;
            const logger = TC.logger;
            
            // Set the processing flag to prevent multiple flows
            this.documentState.isProcessing = true;
            this.documentState.startTime = performance.now();
            logger.logProcess('[TC TABLETRACKING] Processing started', this.documentState);
        },

        /**
         * Records a successful table conversion
         * 
         * Increments the processed count atomically and logs the current state.
         * Call this method after each successful table conversion.
         * 
         * @returns {number} The updated processed count
         */
        recordSuccess: function() {
            const TC = window.TableConverter;
            const logger = TC.logger;
            
            this.documentState.processed++;
            // Avoid excessive logging - only log every 5 tables
            if (this.documentState.processed % 5 === 0) {
                logger.logProcess('[TC TABLETRACKING] recordSuccess:', this.documentState);
            }
            return this.documentState.processed;
        },
        
        /**
         * Records a failed table conversion
         * 
         * Increments the failure count atomically and logs the current state.
         * Call this method when a table conversion fails for any reason.
         * 
         * @returns {number} The updated processed count (not the failure count)
         */
        recordFailure: function() {
            const TC = window.TableConverter;
            const logger = TC.logger;
            
            this.documentState.failed++;
            logger.logProcess('[TC TABLETRACKING] recordFailure:', this.documentState);
            return this.documentState.processed;
        },
        
        /**
         * Completes the processing operation and provides summary metrics
         * 
         * Records the end time, resets the processing flag, and returns comprehensive
         * statistics about the processing operation.
         * Call this method after all tables have been processed.
         * 
         * @returns {Object} Summary metrics including counts and duration
         */
        finishProcessing: function() {
            const TC = window.TableConverter;
            const logger = TC.logger;
            
            this.documentState.endTime = performance.now();
            // Reset processing flag
            this.documentState.isProcessing = false;
            logger.logProcess('[TC TABLETRACKING] Processing finished', this.documentState);
            return {
                processed: this.documentState.processed,
                skipped: this.documentState.skipped,
                failed: this.documentState.failed,
                total: this.documentState.detected,
                duration: this.documentState.endTime - this.documentState.startTime
            };
        },
        
        /**
         * Detects all tables in the document with intelligent caching
         * 
         * Scans the container for tables, differentiates between processed and
         * unprocessed tables, and updates state. Features time-based debouncing
         * to prevent excessive rescanning during rapid operations.
         * 
         * Uses multiple detection strategies:
         * 1. Direct querySelector for tables
         * 2. Configured selector fallback
         * 3. innerHTML-based detection for edge cases
         * 
         * @returns {Object} Detection results with table references and counts
         */
        detectAllTables: function() {
            const TC = window.TableConverter;
            const CONFIG = TC.CONFIG;
            const logger = TC.logger;
            const container = TC.utilities.getContainer();
            
            // If we've detected tables recently and are still processing, use existing counts
            const now = Date.now();
            if (this.documentState.isProcessing && 
                this.documentState._lastDetection > 0 &&
                now - this.documentState._lastDetection < 1000) {
                
                logger.logProcess('Table detection skipped - using existing counts', {
                    detected: this.documentState.detected,
                    toProcess: this.documentState.toProcess,
                    processed: this.documentState.processed,
                    timeSinceLastDetection: now - this.documentState._lastDetection
                });
                
                // Return cached values in expected format
                return {
                    allTables: [], // Empty array since we don't need actual elements
                    unprocessedTables: [],
                    totalCount: this.documentState.detected,
                    unprocessedCount: this.documentState.toProcess
                };
            }
            
            // Update detection timestamp
            this.documentState._lastDetection = now;
            
            if (!container) {
                logger.logProcess('No container found for table detection');
                return {
                    allTables: [],
                    unprocessedTables: [],
                    totalCount: 0,
                    unprocessedCount: 0
                };
            }
            
            // Use a single detection strategy here
            let allTables = container.querySelectorAll('table');
            if (!allTables || allTables.length === 0) {
                allTables = container.querySelectorAll(CONFIG.selectors.tables.any);
                logger.logProcess('Using configured table selector as fallback');
            }
            if (!allTables || allTables.length === 0 && container.innerHTML.includes('<table')) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = container.innerHTML;
                allTables = tempDiv.querySelectorAll('table');
            }
            
            const tableArray = Array.from(allTables || []);
            const tableCount = tableArray.length;
            
            // Filter for unprocessed tables
            const unprocessedTables = tableArray.filter(table => {
                return !table.hasAttribute(CONFIG.selectors.attributes.converted);
            });
            const unprocessedCount = unprocessedTables.length;
            
            // Update state if:
            // 1. We're not already processing, or
            // 2. This is a fresh detection with no previous values, or
            // 3. The counts have changed significantly
            if (!this.documentState.isProcessing || 
                this.documentState.detected === 0 ||
                Math.abs(this.documentState.toProcess - unprocessedCount) > 5) {
                
                this.documentState.detected = tableCount;
                this.documentState.toProcess = unprocessedCount;
                this.documentState.skipped = tableCount - unprocessedCount;
                
                logger.logProcess(`Table detection complete - counts updated`, {
                    totalTables: tableCount,
                    unprocessedTables: unprocessedCount,
                    alreadyProcessed: tableCount - unprocessedCount
                });
            } else {
                logger.logProcess(`Table detection complete - using existing counts`, {
                    existingTotal: this.documentState.detected,
                    existingUnprocessed: this.documentState.toProcess,
                    detectedTotal: tableCount,
                    detectedUnprocessed: unprocessedCount
                });
            }
            
            return {
                allTables: tableArray,
                unprocessedTables: unprocessedTables,
                totalCount: this.documentState.detected,
                unprocessedCount: this.documentState.toProcess
            };
        },
        
        /**
         * Retrieves the current state of table processing
         * 
         * Returns a copy of the documentState object to prevent accidental
         * mutation of the internal state. Use this method to get accurate
         * statistics for reporting and loading indicators.
         * 
         * @returns {Object} Copy of the current document state
         */
        getStatus: function() {
            return { ...this.documentState };
        }
    },

// 5. Responsive Handling
    /**
     * viewport - Responsive Adaptation System
     * 
     * A sophisticated viewport management system that detects and responds to
     * screen size changes. This intelligent system:
     * 
     * 1. View Mode Detection:
     *    - Uses media queries to reliably detect viewport size
     *    - Defines precise breakpoints for mobile/desktop transitions
     *    - Implements cross-browser compatible sizing detection
     *    - Monitors viewport changes in real-time
     * 
     * 2. Content Transformation:
     *    - Orchestrates conversion between mobile and desktop views
     *    - Manages smooth transitions with appropriate loading indicators
     *    - Handles batch processing to prevent UI freezing
     *    - Ensures marker consistency across view changes
     * 
     * 3. Event Coordination:
     *    - Sets up viewport change listeners
     *    - Debounces viewport change handling for performance
     *    - Manages component initialization based on view mode
     *    - Coordinates state transitions during view changes
     * 
     * 4. Content Management:
     *    - Triggers content saving before view changes
     *    - Manages content restoration when returning to desktop
     *    - Ensures proper cleanup during transitions
     *    - Maintains scroll position across view changes
     * 
     * 5. Performance Optimization:
     *    - Implements batch processing for table conversions
     *    - Uses progressive enhancement for complex operations
     *    - Throttles responsive operations for UI responsiveness
     *    - Schedules operations to prevent blocking the main thread
     * 
     * This viewport system provides the foundation for responsive behavior,
     * ensuring optimal content presentation across different device sizes.
     */
    viewport: {
        /**
         * Smart viewport detection with media query integration
         * 
         * Determines the current viewport state by checking against configured breakpoints.
         * Uses matchMedia for reliable cross-device compatibility instead of directly
         * comparing window dimensions. This function is critical for triggering the
         * appropriate conversion methods based on current view mode.
         * 
         * @returns {Boolean} True if the current viewport is in mobile mode
         */            
        isMobileView: function() {
            const TC = window.TableConverter;
            if (!TC.mediaQuery) {
                TC.mediaQuery = window.matchMedia(`(max-width: ${TC.CONFIG.viewport.mobileBreakpoint}px)`);
            }
            return TC.mediaQuery.matches;
        },
        
        /**
         * handleViewportChange - Viewport Response Handler
         * 
         * Manages transitions between mobile and desktop views based on viewport size changes.
         * This critical function:
         * 
         * 1. Detects meaningful viewport size changes that cross the mobile breakpoint
         * 2. Orchestrates content transformation with appropriate loading indicators
         * 3. Applies state transitions for clear view mode tracking
         * 4. Manages container visibility during transformations to prevent flicker
         * 5. Triggers view-specific conversions (enableMobileView/disableMobileView)
         * 6. Ensures marker processing occurs even when view mode doesn't change
         * 7. Handles error states when containers can't be found
         * 8. Centralizes viewport logic to maintain consistent behavior
         * 
         * The function acts as the primary responder to screen rotations, window resizing,
         * and device changes, ensuring smooth transitions between presentation modes.
         */
        handleViewportChange: function(e) {
            const TC = window.TableConverter;
            const CONFIG = TC.CONFIG;
            const logger = TC.logger;
            const utilities = TC.utilities;
            
            // CRITICAL: Always check width directly
            const isMobileView = window.innerWidth < CONFIG.viewport.mobileBreakpoint;
            
            logger.logEvent('Viewport change detected', {
                width: window.innerWidth,
                mobileBreakpoint: CONFIG.viewport.mobileBreakpoint,
                isMobileView: isMobileView,
                previousView: TC._isMobileView
            });
            
            // Get container using debounced lookup
            const container = utilities.getContainer();
            
            if (!container) {
                logger.logProcess('No container found - skipping viewport change handling');
                TC.stateManagement.setError(new Error('No container found for viewport change'));
                
                // Make sure to hide any loading indicator if there was one
                if (utilities.loadingIndicator && typeof utilities.loadingIndicator.hide === 'function') {
                    utilities.loadingIndicator.hide(true);
                    TC._viewportChangeIndicatorActive = false;
                }
                
                return;
            }
            
            // Only proceed if the view state actually changed
            if (isMobileView !== TC._isMobileView) {
                // Update state immediately
                TC._isMobileView = isMobileView;
                
                // Use enhanced state management to track current process
                if (isMobileView) {
                    TC.stateManagement.startMobileView();
                } else {
                    TC.stateManagement.startDesktopView();
                }
                
                // Hide container during processing
                container.style.display = 'none';
                
                // IMPORTANT: Show loading indicator BEFORE doing anything else
                if (utilities.loadingIndicator && typeof utilities.loadingIndicator.show === 'function') {
                    // NEW: Check all relevant flags for viewport changes
                    const masterEnabled = !(CONFIG.ui && CONFIG.ui.showLoadingIndicator === false);
                    const showOnViewportChange = !(CONFIG.ui && CONFIG.ui.showOnViewportChange === false);
                    const shouldShow = masterEnabled && showOnViewportChange;
                    
                    if (shouldShow) {
                        // Set a flag to indicate we showed this indicator
                        TC._viewportChangeIndicatorActive = true;
                        
                        logger.logProcess('Showing loading indicator for viewport change', {
                            isMobileView: isMobileView
                        });
                        
                        utilities.loadingIndicator.show(
                            isMobileView ? 'Switching to mobile view...' : 'Switching to desktop view...'
                        );
                    } else {
                        logger.logProcess('Loading indicator disabled for viewport changes', {
                            masterEnabled: masterEnabled,
                            showOnViewportChange: showOnViewportChange
                        });
                    }
                }
                
                // Start a timer to automatically hide the indicator if processing takes too long
                // This is a safety measure to prevent stuck indicators
                if (TC._loadingIndicatorTimeout) {
                    clearTimeout(TC._loadingIndicatorTimeout);
                }
                TC._loadingIndicatorTimeout = setTimeout(() => {
                    if (TC._viewportChangeIndicatorActive && utilities.loadingIndicator && 
                        typeof utilities.loadingIndicator.hide === 'function') {
                        logger.logProcess('Safety timeout - forcing hide of viewport change indicator');
                        utilities.loadingIndicator.hide(true);
                        TC._viewportChangeIndicatorActive = false;
                    }
                }, 5000); // 5 seconds max wait time
                
                // Process common tasks for marker hiding with state tracking
                TC.stateManagement.setState(TC.stateManagement.STATES.MARKER_PROCESSING);
                this.processCommonViewportTasks(container);
                
                if (isMobileView) {
                    logger.logProcess('Switching to mobile view - enabling mobile conversion');
                    // IMPORTANT: Pass true so enableMobileView knows a loading indicator exists
                    this.enableMobileView(true);
                } else {
                    // Restore to desktop view
                    logger.logProcess('Switching to desktop view - restoring original content');
                    this.disableMobileView(true);
                }
                
                // Show container after processing
                if (container) {
                    container.style.display = '';
                }
                
                // Set final state based on view mode
                if (isMobileView) {
                    TC.stateManagement.completeMobileView();
                } else {
                    TC.stateManagement.completeDesktopView();
                }
                
                // Set overall initialized state
                TC.stateManagement.completeInitialization();
                
                // Cancel the safety timeout since processing completed normally
                if (TC._loadingIndicatorTimeout) {
                    clearTimeout(TC._loadingIndicatorTimeout);
                    TC._loadingIndicatorTimeout = null;
                }
            } else {
                // Even when viewport didn't change, still run common tasks
                TC.stateManagement.setState(TC.stateManagement.STATES.MARKER_PROCESSING);
                this.processCommonViewportTasks(container);
            }
        },
        
        /**
         * disableMobileView - Desktop View Restoration Manager
         * 
         * Restores content to its original desktop-optimized format. This function:
         * 
         * 1. Preserves and later restores scroll position during transformation
         * 2. Cleans up all event handlers before content replacement
         * 3. Retrieves original content from the page-specific store
         * 4. Handles the complete DOM restoration process
         * 5. Re-applies marker hiding after restoration
         * 6. Initializes appropriate component handlers for desktop view
         * 7. Tracks state transitions throughout the restoration process
         * 8. Manages loading indicators for visual feedback
         * 9. Implements comprehensive error handling and recovery
         * 10. Returns operation success status for flow control
         * 
         * This function ensures reliable restoration of original content when
         * transitioning from mobile to desktop view, maintaining content integrity.
         */
        disableMobileView: function(forceRestore = false) {
            const TC = window.TableConverter;
            const CONFIG = TC.CONFIG;
            const logger = TC.logger;
            const utilities = TC.utilities;
            
            logger.logProcess('STARTING desktop restoration');
            
            // Set appropriate state
            TC.stateManagement.startDesktopView();
            
            // Clear viewport indicator flag
            TC._viewportChangeIndicatorActive = false;
            
            // Save scroll position
            TC._savedScrollPosition = window.scrollY;
            
            try {
                // Get container using debounced lookup
                const container = utilities.getContainer();
                
                if (!container) {
                    logger.logProcess('No container found - restoration failed');
                    TC.stateManagement.setError(new Error('No container found for desktop restoration'));
                    
                    // IMPORTANT: Hide loading indicator even on error
                    if (utilities.loadingIndicator && typeof utilities.loadingIndicator.hide === 'function') {
                        utilities.loadingIndicator.hide(true);
                    }
                    
                    return false;
                }
                
                // Show loading indicator
                if (utilities.loadingIndicator && typeof utilities.loadingIndicator.show === 'function') {
                    // Check config before showing
                    if (CONFIG.ui && CONFIG.ui.showLoadingIndicator !== false) {
                        utilities.loadingIndicator.show('Restoring desktop view...');
                    }
                }
                
                // Clear event tracking and remove all event listeners
                TC.stateManagement.setState(TC.stateManagement.STATES.EVENT_HANDLER_CLEANUP);
                if (utilities.clearEventTracking) {
                    utilities.clearEventTracking();
                }
                if (utilities.removeAllEventListeners) {
                    utilities.removeAllEventListeners();
                }
                
                // Set content restoration state
                TC.stateManagement.setState(TC.stateManagement.STATES.CONTENT_RESTORATION);
                
                // Restore the original content
                const restored = TC.contentManager && TC.contentManager.restoreOriginalContent ?
                    TC.contentManager.restoreOriginalContent(container) : false;
                
                if (!restored) {
                    logger.logProcess('Failed to restore original content');
                    TC.stateManagement.setError(new Error('Failed to restore original content'));
                    
                    // Hide loading indicator on failure
                    if (utilities.loadingIndicator && typeof utilities.loadingIndicator.hide === 'function') {
                        utilities.loadingIndicator.hide(true);
                    }
                    
                    return false;
                }
                
                // Set mode flag
                TC._isMobileView = false;
                
                // Process common viewport tasks for marker hiding
                TC.stateManagement.setState(TC.stateManagement.STATES.MARKER_PROCESSING);
                if (TC.viewport && typeof TC.viewport.processCommonViewportTasks === 'function') {
                    TC.viewport.processCommonViewportTasks(container);
                }
                
                // Initialize components
                TC.stateManagement.setState(TC.stateManagement.STATES.COMPONENT_INITIALIZATION);
                if (TC.initialization && typeof TC.initialization.components === 'function') {
                    TC.initialization.components();
                }
                
                // Restore scroll position
                window.scrollTo(0, TC._savedScrollPosition);
                
                // Mark desktop view as ready
                TC.stateManagement.completeDesktopView();
                
                // Hide loading indicator
                if (utilities.loadingIndicator && typeof utilities.loadingIndicator.hide === 'function') {
                    utilities.loadingIndicator.hide(true);
                }
                
                logger.logProcess('Desktop view restored successfully');
                return true;
            } catch (error) {
                logger.error('Error in disableMobileView:', error);
                TC.stateManagement.setError(error);
                
                // Hide loading indicator even on error
                if (utilities.loadingIndicator && typeof utilities.loadingIndicator.hide === 'function') {
                    try {
                        utilities.loadingIndicator.hide(true);
                    } catch (hideError) {
                        logger.error('Error hiding loading indicator', hideError);
                    }
                }
                
                return false;
            }
        },

        /**
         * enableMobileView - Mobile View Conversion Manager
         * 
         * Transforms content for optimal mobile viewing through a sophisticated
         * batch processing system. This function:
         * 
         * 1. Analyzes all tables to determine conversion candidates
         * 2. Implements a progressive batch processing system to prevent UI freezing
         * 3. Tracks processing state for accurate progress indicators
         * 4. Applies the appropriate marker-directed conversions to each table
         * 5. Handles edge cases including tables without markers
         * 6. Manages loading indicators with percentage completion
         * 7. Initializes interactive components after conversion
         * 8. Applies final marker hiding through common viewport tasks
         * 9. Captures and reports detailed performance metrics
         * 10. Maintains proper state transitions throughout the process
         * 11. Resets tracking counters after completion for clean subsequent operations
         * 
         * This function serves as the core table conversion orchestrator for mobile view,
         * optimizing the balance between performance and user experience.
         * 
         * @param {Boolean} hasOwnLoadingIndicator - Whether a loading indicator is already active
         * @returns {void}
         */
        enableMobileView: function(hasOwnLoadingIndicator = false) {
            const TC = window.TableConverter;
            const CONFIG = TC.CONFIG;
            const logger = TC.logger;
            const utilities = TC.utilities;
            
            // Prevent multiple executions
            if (TC._processingInProgress) {
                logger.logProcess('Mobile view processing already in progress, skipping');
                return;
            }
            
            // Set processing flag
            TC._processingInProgress = true;
            logger.logProcess('Enabling mobile view');
            
            try {
                // Mark mobile view state
                TC.stateManagement.startMobileView();
                
                // Use a fresh container lookup
                const container = utilities.getContainer(true);
                if (!container) {
                    logger.logProcess('No container found for mobile view');
                    TC._processingInProgress = false;
                    
                    // Make sure to hide the loading indicator here too
                    if (utilities.loadingIndicator && typeof utilities.loadingIndicator.hide === 'function') {
                        utilities.loadingIndicator.hide(true);
                        TC._viewportChangeIndicatorActive = false;
                    }
                    
                    return;
                }
                
                // Ensure required WeakMaps exist
                TC.converted = TC.converted || new WeakMap();
                TC.originalTables = TC.originalTables || new WeakMap();
                
                // Reset the table tracking state
                if (TC.tableTracking) {
                    TC.tableTracking.reset();
                }
                
                // Detect tables
                const tableData = TC.tableTracking.detectAllTables();
                const totalTablesToProcess = tableData.unprocessedCount || 0;
                
                // CRITICAL: Make sure table tracking is started before showing indicator
                if (TC.tableTracking) {
                    TC.tableTracking.startProcessing();
                }
                
                // IMPORTANT: Check if an indicator was shown by viewport change
                const viewportIndicatorActive = TC._viewportChangeIndicatorActive === true;
                
                // Check if we should show/update the loading indicator
                if (utilities.loadingIndicator) {
                    // First check if loading indicators are enabled in config
                    const masterEnabled = !(CONFIG.ui && CONFIG.ui.showLoadingIndicator === false);
                    
                    if (masterEnabled) {
                        if (viewportIndicatorActive) {
                            // Update the existing message to include table count
                            if (typeof utilities.loadingIndicator.updateMessage === 'function') {
                                try {
                                    utilities.loadingIndicator.updateMessage(`Processing ${totalTablesToProcess} tables...`);
                                    logger.logProcess('Updated existing viewport indicator message');
                                } catch (error) {
                                    logger.error('Error updating loading indicator message:', error);
                                }
                            }
                        } else if (!document.querySelector('[data-tc-loader="true"]')) {
                            // No indicator exists - check if we should create one for initial load
                            const showOnInitialLoad = CONFIG.ui && CONFIG.ui.showOnInitialLoad !== false;
                            
                            if (showOnInitialLoad) {
                                if (typeof utilities.loadingIndicator.show === 'function') {
                                    logger.logProcess('Showing loading indicator for initial mobile view', {
                                        showOnInitialLoad: showOnInitialLoad
                                    });
                                    utilities.loadingIndicator.show('Processing tables', totalTablesToProcess);
                                }
                            } else {
                                logger.logProcess('Loading indicator disabled for initial load - skipping');
                            }
                        }
                    } else {
                        logger.logProcess('Loading indicator disabled in config - skipping all indicators');
                    }
                }
                
                // IMPORTANT CHANGE: If no tables to process, handle videos and hide loader immediately
                if (totalTablesToProcess === 0) {
                    logger.logProcess('No unprocessed tables to convert - processing only videos');
                    
                    // Process videos if needed
                    if (container.innerHTML && container.innerHTML.includes('LiveExtendVideoURL')) {
                        logger.logProcess('Processing video content in no-tables case');
                        if (TC.process && typeof TC.process.video === 'function') {
                            TC.process.video(container);
                        }
                    }
                    
                    // Initialize components
                    TC.stateManagement.setState(TC.stateManagement.STATES.COMPONENT_INITIALIZATION);
                    if (TC.initialization && typeof TC.initialization.components === 'function') {
                        TC.initialization.components();
                    }
                    
                    // Process common viewport tasks (marker hiding)
                    TC.stateManagement.setState(TC.stateManagement.STATES.MARKER_PROCESSING);
                    if (TC.viewport && typeof TC.viewport.processCommonViewportTasks === 'function') {
                        TC.viewport.processCommonViewportTasks(container);
                    }
                    
                    // Cleanup and finalize
                    TC._processingInProgress = false;
                    TC.stateManagement.completeMobileView();
                    
                    // Clear viewport indicator flag since processing is complete
                    TC._viewportChangeIndicatorActive = false;
                    
                    // IMPORTANT: Hide loading indicator immediately
                    if (utilities.loadingIndicator && typeof utilities.loadingIndicator.hide === 'function') {
                        logger.logProcess('Hiding loading indicator after video-only processing');
                        utilities.loadingIndicator.hide(true);
                    }
                    
                    return;
                }
                
                // Process tables
                logger.logProcess(`Processing ${totalTablesToProcess} tables`);
                
                // Set up batch size
                let BATCH_SIZE = 10;
                if (totalTablesToProcess > 100) BATCH_SIZE = 5;
                else if (totalTablesToProcess > 50) BATCH_SIZE = 8;
                else if (totalTablesToProcess < 20) BATCH_SIZE = 20;
                
                const totalBatches = Math.ceil(totalTablesToProcess / BATCH_SIZE);
                let processedCount = 0;
                let currentBatch = 0;
                
                // Get all unconverted tables
                const unconvertedTables = container.querySelectorAll(CONFIG.selectors.tables.unconverted);
                const tablesToProcess = Array.from(unconvertedTables);
                
                logger.logProcess(`Found ${tablesToProcess.length} unconverted tables to process`);
                
                // Batch processing function
                const processBatch = (startIdx) => {
                    try {
                        currentBatch++;
                        const endIdx = Math.min(startIdx + BATCH_SIZE, totalTablesToProcess);
                        const batchTables = tablesToProcess.slice(startIdx, endIdx);
                        
                        logger.logProcess(`Processing batch ${currentBatch}/${totalBatches}`, {
                            startIdx: startIdx,
                            endIdx: endIdx,
                            batchSize: batchTables.length
                        });
                        
                        // Process each table in the batch
                        batchTables.forEach((table, idx) => {
                            try {
                                if (TC.process && typeof TC.process.table === 'function') {
                                    TC.process.table(table, container);
                                    processedCount++;
                                    
                                    // Update progress
                                    if (utilities.loadingIndicator && 
                                        typeof utilities.loadingIndicator.updateProgress === 'function') {
                                        utilities.loadingIndicator.updateProgress(processedCount, totalTablesToProcess);
                                    }
                                }
                            } catch (error) {
                                logger.error(`Error processing table ${startIdx + idx}:`, error);
                                if (TC.tableTracking) {
                                    TC.tableTracking.recordFailure();
                                }
                            }
                        });
                        
                        const batchEnd = endIdx;
                        
                        // Check if we're done
                        if (batchEnd >= totalTablesToProcess) {
                            // All batches processed
                            logger.logProcess('All batches processed');
                            
                            // Get final statistics
                            const stats = TC.tableTracking ? 
                                TC.tableTracking.finishProcessing() : {
                                    processed: processedCount,
                                    total: totalTablesToProcess,
                                    duration: 0
                                };
                            
                            // Clear viewport indicator flag since processing is complete
                            TC._viewportChangeIndicatorActive = false;
                            
                            // Complete processing with delay
                            setTimeout(() => {
                                try {
                                    // Initialize components
                                    TC.stateManagement.setState(TC.stateManagement.STATES.COMPONENT_INITIALIZATION);
                                    if (utilities.removeAllEventListeners) {
                                        utilities.removeAllEventListeners();
                                    }
                                    if (TC.initialization && TC.initialization.components) {
                                        TC.initialization.components();
                                    }
                                    
                                    // Process common viewport tasks
                                    TC.stateManagement.setState(TC.stateManagement.STATES.MARKER_PROCESSING);
                                    const freshContainer = utilities.getContainer();
                                    if (freshContainer && TC.viewport && typeof TC.viewport.processCommonViewportTasks === 'function') {
                                        TC.viewport.processCommonViewportTasks(freshContainer);
                                    }
                                    
                                    // Mark mobile view as ready
                                    TC.stateManagement.completeMobileView();
                                    
                                    // Report completion
                                    logger.logProcess('Mobile view enabled with batch processing', {
                                        tablesProcessed: processedCount,
                                        totalTables: totalTablesToProcess,
                                        duration: Math.round(stats.duration || 0)
                                    });
                                    
                                    // Hide loading indicator
                                    if (utilities.loadingIndicator && typeof utilities.loadingIndicator.hide === 'function') {
                                        try {
                                            utilities.loadingIndicator.hide(false, 500);
                                        } catch (error) {
                                            logger.error('Error hiding loading indicator', error);
                                        }
                                    }
                                    
                                    // Clear processing flag
                                    TC._processingInProgress = false;
                                } catch (error) {
                                    logger.error('Error in final processing:', error);
                                    TC.stateManagement.setError(error);
                                    
                                    // Hide loading indicator even on error
                                    if (utilities.loadingIndicator && typeof utilities.loadingIndicator.hide === 'function') {
                                        try {
                                            utilities.loadingIndicator.hide(true);
                                        } catch (error) {
                                            logger.error('Error hiding loading indicator', error);
                                        }
                                    }
                                    
                                    TC._processingInProgress = false;
                                }
                            }, 200);
                        } else {
                            // Schedule next batch
                            const batchDelay = totalTablesToProcess > 50 ? 50 : 30;
                            setTimeout(() => {
                                processBatch(batchEnd);
                            }, batchDelay);
                        }
                    } catch (error) {
                        logger.error('Error processing batch:', error);
                        
                        // Handle errors
                        if (TC.tableTracking) {
                            TC.tableTracking.finishProcessing();
                        }
                        
                        if (utilities.loadingIndicator && typeof utilities.loadingIndicator.hide === 'function') {
                            try {
                                utilities.loadingIndicator.hide(true);
                            } catch (error) {
                                logger.error('Error hiding loading indicator', error);
                            }
                        }
                        
                        TC._processingInProgress = false;
                    }
                };
                
                // Start batch processing with delay
                setTimeout(() => {
                    processBatch(0);
                }, 200);
                
            } catch (error) {
                logger.error('Error in enableMobileView:', error);
                
                if (TC.utilities && TC.utilities.loadingIndicator && 
                    typeof TC.utilities.loadingIndicator.hide === 'function') {
                    try {
                        TC.utilities.loadingIndicator.hide(true);
                    } catch (hideError) {
                        logger.error('Error hiding loading indicator', hideError);
                    }
                }
                
                TC.stateManagement.setError(error);
                TC._processingInProgress = false;
            }
        },
        
        /**
         * processCommonViewportTasks - Shared View Processing Manager
         * 
         * Handles tasks common to both mobile and desktop views. This function:
         * 
         * 1. Processes embedded videos for proper display
         * 2. Hides conversion marker elements to maintain clean visual output
         * 3. Validates container references before processing
         * 4. Tracks HTML state before and after each processing step
         * 5. Ensures consistent behavior across view modes
         * 6. Implements comprehensive error handling
         * 7. Logs detailed information for debugging
         * 8. Maintains proper state transitions during processing
         * 
         * This function centralizes common operations to ensure consistent
         * handling regardless of view mode, preventing code duplication.
         */
        processCommonViewportTasks: function(container) {
            const TC = window.TableConverter;
            const logger = TC.logger;
            
            logger.logProcess('Starting common viewport tasks');
            
            // Validate container - use utilities if available
            if (!container) {
                if (TC.utilities && typeof TC.utilities.getContainer === 'function') {
                    container = TC.utilities.getContainer();
                }
                
                if (!container) {
                    logger.logProcess('No container found for common tasks');
                    return;
                }
            } else if (TC.utilities && typeof TC.utilities.isValidContainer === 'function') {
                if (!TC.utilities.isValidContainer(container)) {
                    logger.logProcess('Invalid container for common tasks');
                    return;
                }
            }
            
            // Log HTML state before tasks
            if (container && TC.utilities && TC.utilities.logHtmlDetails) {
                TC.utilities.logHtmlDetails('COMMON TASKS - INITIAL STATE', container.innerHTML, container);
            }
            
            try {
                // Track start time for performance measurement
                const startTime = performance.now();
                
                // IMPORTANT FIX: Process videos first - ALWAYS do this in both mobile and desktop modes
                let videoProcessed = false;
                if (container && container.innerHTML) {
                    if (container.innerHTML.includes('LiveExtendVideoURL')) {
                        logger.logProcess('Video marker found - processing videos');
                        if (TC.process && typeof TC.process.video === 'function') {
                            const videoCount = TC.process.video(container);
                            videoProcessed = videoCount > 0;
                            logger.logProcess(`Video marker processed - ${videoCount} videos found`);
                        }
                    }
                }
                
                // Hide markers
                if (TC.markers && TC.markers.helpers && typeof TC.markers.helpers.hideAllMarkers === 'function') {
                    logger.logProcess('Hiding all markers in common tasks');
                    TC.markers.helpers.hideAllMarkers();
                    logger.logProcess('Hidden all markers');
                    
                    // Log HTML after marker hiding
                    if (TC.utilities && TC.utilities.logHtmlDetails) {
                        TC.utilities.logHtmlDetails('COMMON TASKS - AFTER MARKER HIDING', container.innerHTML, container);
                    }
                }
        
                // Double-check for videos if none were processed earlier
                // This catches videos that might have been added by other processes
                if (!videoProcessed && container && TC.process && typeof TC.process.video === 'function') {
                    if (container.innerHTML && container.innerHTML.includes('LiveExtendVideoURL')) {
                        logger.logProcess('Checking for videos after marker processing');
                        const videoCount = TC.process.video(container);
                        if (videoCount > 0) {
                            logger.logProcess(`Found and processed ${videoCount} videos in second pass`);
                        }
                        
                        // Log HTML after video processing
                        if (TC.utilities && TC.utilities.logHtmlDetails) {
                            TC.utilities.logHtmlDetails('COMMON TASKS - AFTER VIDEO PROCESSING', container.innerHTML, container);
                        }
                    }
                }
                
                // Log performance
                const endTime = performance.now();
                logger.logProcess(`Common viewport tasks completed in ${Math.round(endTime - startTime)}ms`);
                
                // If we find the loading indicator is still active after video-only processing,
                // hide it since we're done with the common tasks
                if (TC._viewportChangeIndicatorActive && 
                    !container.innerHTML.includes('<table') && 
                    TC.utilities && 
                    TC.utilities.loadingIndicator && 
                    typeof TC.utilities.loadingIndicator.hide === 'function') {
                    
                    logger.logProcess('Video-only content detected - hiding loading indicator');
                    TC.utilities.loadingIndicator.hide(true);
                    TC._viewportChangeIndicatorActive = false;
                }
            } catch (error) {
                logger.error('Error in common viewport tasks:', error);
                
                // Make sure to hide loading indicator on error
                if (TC._viewportChangeIndicatorActive && 
                    TC.utilities && 
                    TC.utilities.loadingIndicator && 
                    typeof TC.utilities.loadingIndicator.hide === 'function') {
                    
                    logger.logProcess('Error occurred - hiding loading indicator');
                    TC.utilities.loadingIndicator.hide(true);
                    TC._viewportChangeIndicatorActive = false;
                }
            }
        },            
               
        /**
         * processBatches - Progressive Table Processing System
         * 
         * Processes tables in optimized batches to prevent UI freezing. This function:
         * 
         * 1. Dynamically adjusts batch size based on table count
         * 2. Implements time-spaced processing to maintain UI responsiveness
         * 3. Reports detailed progress for user feedback through loading indicator
         * 4. Applies marker-directed conversion to each table
         * 5. Handles concurrent processing challenges with safety mechanisms
         * 6. Provides accurate completion percentage indicators
         * 7. Completes post-processing tasks including component initialization
         * 8. Measures and reports performance metrics
         * 9. Implements comprehensive error handling
         * 10. Supports graceful interruption and continuation
         * 11. Completes with callback execution for workflow integration
         * 
         * This sophisticated batch processing system balances performance and
         * responsiveness, especially critical for pages with many tables.
         * 
         * @param {NodeList|Array} tables - Collection of tables to process
         * @param {Function} callback - Callback function to execute after processing completes
         * @returns {void}
         */
        processBatches: function(tables, callback) {
            const TC = window.TableConverter;
            const CONFIG = TC.CONFIG;
            const logger = TC.logger;
            const utilities = TC.utilities;
            
            // CRITICAL FIX: Check if already processing
            if (TC._processingInProgress) {
                logger.logProcess('Batch processing already in progress, skipping new request');
                if (callback) setTimeout(callback, 100);
                return;
            }
            
            // Set processing flag to prevent multiple batch operations
            TC._processingInProgress = true;
        
            // Convert NodeList to Array if needed
            const tableArray = Array.from(tables);
            const totalTablesToProcess = tableArray.length;
            
            if (totalTablesToProcess === 0) {
                TC._processingInProgress = false;
                if (callback) callback();
                return;
            }
            
            logger.logProcess(`Starting batch processing of ${totalTablesToProcess} tables`);
            
            // CRITICAL: Determine if we should show loading indicator
            // Check all relevant flags
            const masterEnabled = !(CONFIG.ui && CONFIG.ui.showLoadingIndicator === false);
            const isViewportChange = TC._viewportChangeIndicatorActive === true;
            const showOnViewportChange = !(CONFIG.ui && CONFIG.ui.showOnViewportChange === false);
            const showOnInitialLoad = CONFIG.ui && CONFIG.ui.showOnInitialLoad !== false;
            
            // Show indicator if:
            // 1. Master enabled AND
            // 2. (This is a viewport change AND showOnViewportChange is enabled) OR
            //    (This is NOT a viewport change AND showOnInitialLoad is enabled)
            const shouldShowIndicator = masterEnabled && 
                                        ((isViewportChange && showOnViewportChange) || 
                                         (!isViewportChange && showOnInitialLoad));
            
            if (shouldShowIndicator) {
                if (utilities.loadingIndicator && typeof utilities.loadingIndicator.show === 'function') {
                    logger.logProcess('Showing loading indicator for batch processing', {
                        isViewportChange: isViewportChange,
                        showOnViewportChange: showOnViewportChange,
                        showOnInitialLoad: showOnInitialLoad
                    });
                    utilities.loadingIndicator.show('Processing tables', totalTablesToProcess);
                }
            } else {
                logger.logProcess('Skipping loading indicator for batch processing', {
                    masterEnabled: masterEnabled,
                    isViewportChange: isViewportChange,
                    showOnViewportChange: showOnViewportChange,
                    showOnInitialLoad: showOnInitialLoad
                });
            }
            
            // Determine batch size (simple logic based on count)
            const BATCH_SIZE = totalTablesToProcess > 50 ? 5 : (totalTablesToProcess > 20 ? 10 : 20);
            const totalBatches = Math.ceil(totalTablesToProcess / BATCH_SIZE);
            
            let processedCount = 0;
            let currentBatch = 0;
            
            const processBatch = (startIdx) => {
                try {
                    currentBatch++;
                    const endIdx = Math.min(startIdx + BATCH_SIZE, totalTablesToProcess);
                    const batchTables = tableArray.slice(startIdx, endIdx);
                    
                    logger.logProcess(`Processing batch ${currentBatch}/${totalBatches} (${startIdx} to ${endIdx})`);
                    
                    // Process each table in current batch
                    batchTables.forEach((table, idx) => {
                        try {
                            // Use the main table processing method
                            if (TC.process && typeof TC.process.table === 'function') {
                                TC.process.table(table);
                                processedCount++;
                                
                                // Update progress indicator ONLY if we're showing it
                                if (shouldShowIndicator && utilities.loadingIndicator && 
                                    typeof utilities.loadingIndicator.updateProgress === 'function') {
                                    utilities.loadingIndicator.updateProgress(processedCount, totalTablesToProcess);
                                }
                                
                                // Update table tracking
                                if (TC.tableTracking) {
                                    TC.tableTracking.recordSuccess();
                                }
                            }
                        } catch (error) {
                            logger.error(`Error processing table ${startIdx + idx}:`, error);
                            
                            // Record failure but continue
                            if (TC.tableTracking) {
                                TC.tableTracking.recordFailure();
                            }
                        }
                    });
                    
                    // Check if more batches remain
                    if (endIdx < totalTablesToProcess) {
                        // Schedule next batch
                        const delay = totalTablesToProcess > 50 ? 50 : 30;
                        setTimeout(() => {
                            processBatch(endIdx);
                        }, delay);
                    } else {
                        // All done - finalize
                        logger.logProcess('Batch processing complete', {
                            processed: processedCount,
                            total: totalTablesToProcess
                        });
                        
                        // Complete processing
                        setTimeout(() => {
                            // Hide loading indicator ONLY if we showed it
                            if (shouldShowIndicator && utilities.loadingIndicator && 
                                typeof utilities.loadingIndicator.hide === 'function') {
                                utilities.loadingIndicator.hide(false, 500);
                            }
                            
                            // Clear processing flag
                            TC._processingInProgress = false;
                            
                            // Execute callback if provided
                            if (callback && typeof callback === 'function') {
                                callback();
                            }
                        }, 200);
                    }
                } catch (error) {
                    logger.error('Error in batch processing:', error);
                    
                    // Hide loading indicator on error ONLY if we showed it
                    if (shouldShowIndicator && utilities.loadingIndicator && 
                        typeof utilities.loadingIndicator.hide === 'function') {
                        try {
                            utilities.loadingIndicator.hide(true);
                        } catch (hideError) {
                            logger.error('Error hiding loading indicator:', hideError);
                        }
                    }
                    
                    // Clear processing flag
                    TC._processingInProgress = false;
                    
                    // Execute callback even on error
                    if (callback && typeof callback === 'function') {
                        callback();
                    }
                }
            };
            
            // Start first batch with initial delay
            setTimeout(() => {
                processBatch(0);
            }, 100);
        },
    },

// 6. Content Management
    /**
     * TableConverter Content Management System
     * 
     * A content preservation and restoration system that maintains
     * original DOM state across view transitions and page navigation. This system:
     * 
     * 1. URL-Based Content Storage:
     *    - Maps content to specific page URLs for context-aware storage
     *    - Prevents redundant saves through content hash validation
     *    - Preserves page-specific content during navigation
     *    - Supports single-page application architectures
     * 
     * 2. Efficient DOM Handling:
     *    - Uses innerHTML for efficient bulk content operations
     *    - Implements content validation and structural integrity checks
     *    - Optimizes storage with selective cleanup during navigation
     *    - Prevents memory leaks through reference management
     * 
     * 3. Container Integration:
     *    - Works directly with the container caching system
     *    - Uses multiple fallback paths for container resolution
     *    - Supports direct container parameter passing
     *    - Validates containers before content operations
     * 
     * 4. Navigation Awareness:
     *    - Detects and responds to page navigation events
     *    - Preserves content for back/forward navigation
     *    - Implements navigation-specific cleanup
     *    - Maintains scroll position during transitions
     * 
     * 5. Performance Optimizations:
     *    - Uses string length and table count heuristics for content validation
     *    - Implements content hash comparison to prevent unnecessary operations
     *    - Logs detailed metrics for content operations
     *    - Handles large content volumes efficiently
     * 
     * 6. Error Recovery:
     *    - Includes multiple fallback paths for content retrieval
     *    - Implements graceful degradation when content is unavailable
     *    - Provides detailed error reporting
     *    - Integrates with state management for error state tracking
     * 
     * This system provides the critical foundation for view transitions by
     * ensuring content integrity throughout the application lifecycle.
     */
    contentManager: {
        // In-memory storage for multiple pages
        _pageContentStore: {},
        _contentSaved: {},
    
        /**
         * Save original content using provided container or finding it
         * @param {HTMLElement} [container] - Container element (optional)
         * @returns {Boolean} True if content was saved successfully
         */
        saveOriginalContent: function(container) {
            const TC = window.TableConverter;
            const logger = TC.logger;
            const utilities = TC.utilities;
            const currentUrl = window.location.href;
            
            // Use provided container or get using utilities
            const contentContainer = container || 
                                   (utilities && typeof utilities.getContainer === 'function' ? 
                                    utilities.getContainer() : null);
            
            // Ensure container exists
            if (!contentContainer) {
                logger.logProcess('No container found for saving content');
                return false;
            }
            
            // Check if we have meaningful content
            if (contentContainer.innerHTML && 
                contentContainer.innerHTML.length > 100 && 
                (contentContainer.querySelector('table') || contentContainer.innerHTML.includes('<table'))) {
                
                // Store in page-specific storage
                this._pageContentStore[currentUrl] = contentContainer.innerHTML;
                
                // Also store in the standard properties for backward compatibility
                TC.originalHtmlContent = contentContainer.innerHTML;
                TC.originalPageUrl = currentUrl;
                
                // Mark as saved
                this._contentSaved[currentUrl] = true;
                
                // Log what we captured
                const tableCount = (contentContainer.innerHTML.match(/<table/g) || []).length;
                logger.logProcess('Original content saved for current page', {
                    url: currentUrl,
                    contentLength: contentContainer.innerHTML.length,
                    tableCount: tableCount
                });
                
                return true;
            }
            
            logger.logProcess('Container found but content not sufficient for saving');
            return false;
        },

        /**
         * Restore original content for the current page
         * @param {HTMLElement} [container] - Container to restore content to (optional)
         * @returns {Boolean} True if content was restored successfully
         */
        restoreOriginalContent: function(container) {
            const TC = window.TableConverter;
            const logger = TC.logger;
            const utilities = TC.utilities;
            
            // Use provided container or get from utilities
            const contentContainer = container || 
                                   (utilities && typeof utilities.getContainer === 'function' ? 
                                    utilities.getContainer() : null);
            
            if (!contentContainer) {
                logger.logProcess('No container found to restore content to');
                return false;
            }
            
            // Get current URL
            const currentUrl = window.location.href;
            
            // Check if we have content for this specific URL
            let pageContent = null;
            
            // First check our page-specific store
            if (this._pageContentStore[currentUrl]) {
                pageContent = this._pageContentStore[currentUrl];
                logger.logProcess('Found content in page-specific store', {
                    url: currentUrl
                });
            }
            // Fall back to standard property only if URL matches
            else if (TC.originalHtmlContent && TC.originalPageUrl === currentUrl) {
                pageContent = TC.originalHtmlContent;
                logger.logProcess('Using standard content property (URL matches)', {
                    url: currentUrl
                });
                
                // Add to page store for future use
                this._pageContentStore[currentUrl] = pageContent;
            }
            
            if (!pageContent) {
                logger.logProcess('No content found for current page', {
                    currentUrl: currentUrl,
                    storedUrl: TC.originalPageUrl || 'none'
                });
                return false;
            }
            
            // Simply replace the entire HTML
            contentContainer.innerHTML = pageContent;
            
            // Log what we restored
            const tableCount = (contentContainer.innerHTML.match(/<table/g) || []).length;
            logger.logProcess('Original content restored for current page', {
                url: currentUrl,
                contentLength: pageContent.length,
                tableCount: tableCount
            });
            
            return true;
        },
                    
        cleanEverything: function() {
            const TC = window.TableConverter;
            const logger = TC.logger;
            const currentUrl = window.location.href;
            
            logger.logProcess('Cleaning everything for navigation');
            
            // Reset state management
            if (TC.stateManagement && typeof TC.stateManagement.reset === 'function') {
                TC.stateManagement.reset();
            } else {
                // Legacy state cleanup as fallback
                TC.initialized = false;
                TC._observerPageUrl = null;
            }
            
            // Clear any pending timeouts
            if (TC._processingTimeout) {
                clearTimeout(TC._processingTimeout);
                TC._processingTimeout = null;
            }
            
            // NEW: Reset the loading indicator shown flag
            TC._loadingIndicatorShownOnce = false;
            logger.logProcess('Reset loading indicator shown flag for new page');
            
            // Only clear content for non-current URLs
            for (const url in this._pageContentStore) {
                if (url !== currentUrl) {
                    delete this._pageContentStore[url];
                    delete this._contentSaved[url];
                    logger.logProcess('Cleared content for page:', { url: url });
                }
            }
            
            // Reset tracking data
            if (TC._containerObserver) {
                try {
                    TC._containerObserver.disconnect();
                } catch (e) {
                    logger.error('Error disconnecting container observer:', e);
                }
                TC._containerObserver = null;
            }
            TC._containerObserving = false;
            
            // Reset WeakMaps
            TC.converted = new WeakMap();
            TC.originalTables = new WeakMap();
            
            // Hide any loading indicators
            if (TC.utilities && TC.utilities.loadingIndicator) {
                TC.utilities.loadingIndicator._removeAllLoaders();
            }
            
            logger.logProcess('All state cleared');
            
            return true;
        }             
    },

// 7. Marker Handling
    /**
     * markers - Table Conversion Instruction System
     * 
     * A declarative markup system that controls how tables are converted for mobile viewing.
     * This sophisticated system:
     * 
     * 1. Marker Recognition:
     *    - Detects specialized marker text in page content
     *    - Supports multiple marker types (accordion, carousel, list, etc.)
     *    - Associates markers with specific tables through intelligent proximity analysis
     *    - Handles complex cases with markers not directly adjacent to tables
     * 
     * 2. Conversion Direction:
     *    - Maps markers to specific conversion strategies
     *    - Controls visual transformation of tables based on marker types
     *    - Supports special markers for display control (no-show, no-conversion)
     *    - Provides fallback to default conversion when no marker is found
     * 
     * 3. DOM Analysis:
     *    - Implements sophisticated marker-table association algorithm
     *    - Uses DOM traversal to establish relationships between markers and tables
     *    - Handles nested content structures through recursive analysis
     *    - Maintains accuracy in complex DOM hierarchies
     * 
     * 4. Visual Management:
     *    - Automatically hides markers after processing for clean output
     *    - Uses accessible hiding techniques to maintain DOM structure
     *    - Ensures markers remain in DOM for future view transitions
     *    - Tracks processed markers to prevent redundant operations
     * 
     * 5. Extension Framework:
     *    - Supports adding new marker types through configuration
     *    - Maps markers to conversion functions dynamically
     *    - Validates marker types against configuration
     *    - Enables extensible conversion options
     * 
     * This marker system provides a non-intrusive way to control table conversion
     * through simple text markers, enabling precise control without modifying table markup.
     */
    markers: {
        // Storage for marker tracking across calls
        _allFoundMarkers: new Set(),
        
        /**
         * Process all markers within a container
         * 
         * Main entry point for marker processing that handles finding and applying
         * markers to tables. Processes in two passes:
         * 1. Find and apply explicit markers
         * 2. Apply default markers to remaining tables
         * 
         * This function implements sophisticated marker detection that examines the
         * content between tables using DOM Range and TreeWalker for precise node traversal.
         * It handles complex cases where markers are not directly adjacent to their tables,
         * resolving ambiguities through positional analysis and relevance scoring.
         * 
         * Special cases handled include:
         * - Markers embedded within text nodes
         * - Markers inside collapse containers
         * - Markers affected by DOM manipulation
         * - Multiple competing markers with proximity resolution
         * 
         * Each detected marker is processed according to its specific type rules and
         * applied to the appropriate table.
         * 
         * @param {HTMLElement} container - The container to process markers in
         */
        processMarkers: function(container) {
            const TC = window.TableConverter;
            const CONFIG = TC.CONFIG;
            const logger = TC.logger;
            
            if (!container) {
                logger.logMarker('No container provided for marker processing');
                return;
            }

            try {
                logger.logMarker('CUSTOM MARKER PROCESSOR RUNNING');
                
                // First, find all tables in the container
                const allTables = Array.from(container.querySelectorAll('table'));
                logger.logMarker(`Found ${allTables.length} tables to process`);
                
                // Hide all markers for visual cleanup
                this.helpers.hideAllMarkers();
                
                // If no tables, nothing to process
                if (allTables.length === 0) {
                    logger.logMarker('No tables found to process');
                    return;
                }
                
                // Process each table
                allTables.forEach((table, index) => {
                    // Skip already processed tables
                    if (table.hasAttribute(CONFIG.selectors.attributes.converted) || 
                        TC.converted.has(table)) {
                        return;
                    }
                    
                    // Find marker for this table
                    const marker = this.helpers.findTableMarker(table);
                    
                    if (marker) {
                        const markerText = marker.textContent.trim().toLowerCase();
                        logger.logMarker(`Processing table ${index + 1} with marker: ${markerText}`);
                        
                        // Process the table with its marker
                        if (TC.process && typeof TC.process.table === 'function') {
                            TC.process.table(table, marker);
                        }
                    }
                });
                
                // Make sure markers stay hidden
                this.helpers.hideAllMarkers();
                
                logger.logMarker('CUSTOM MARKER PROCESSOR COMPLETE');
            } catch (error) {
                logger.error('Error in marker processing:', error);
            }
        },

        // Helper functions for marker processing
        helpers: {
            /**
             * Finds all marker elements in the document
             * Responsible for the logic of identifying what constitutes a marker
             */
            findAllMarkerElements: function(container = document) {
                const TC = window.TableConverter;
                const CONFIG = TC.CONFIG;
                const logger = TC.logger;
                
                // Get valid marker names
                const markerNames = Object.values(CONFIG.markers.types)
                    .filter(m => m && m.isActive)
                    .map(m => m.name.toLowerCase());
                
                const foundMarkers = [];
                
                // Process each tag type from configuration
                CONFIG.html.allTags.forEach(tag => {
                    container.querySelectorAll(tag).forEach(element => {
                        const text = element.textContent.trim().toLowerCase();
                        
                        // Skip if too long to be a marker
                        if (text.length > 50) return;
                        
                        // Check if element's text directly matches a marker name
                        if (markerNames.includes(text)) {
                            foundMarkers.push({
                                element: element,
                                text: text
                            });
                        }
                        
                        // Check for spans inside other elements (common pattern)
                        if (tag.toLowerCase() !== 'span') {
                            element.querySelectorAll('span').forEach(span => {
                                const spanText = span.textContent.trim().toLowerCase();
                                if (markerNames.includes(spanText)) {
                                    foundMarkers.push({
                                        element: span,
                                        text: spanText
                                    });
                                }
                            });
                        }
                    });
                });
                
                return foundMarkers;
            },

            /**
            * Hides all markers visually
            * Only responsibility is to hide markers, not find them
            */
            hideAllMarkers: function() {
                const TC = window.TableConverter;
                const CONFIG = TC.CONFIG;
                const logger = TC.logger;
                
                // Use findAllMarkerElements to get markers
                const foundMarkers = this.findAllMarkerElements();
                
                // Hide each marker
                foundMarkers.forEach(marker => {
                    marker.element.style.cssText = CONFIG.markers.visuallyHiddenCSS;
                    marker.element.setAttribute('data-marker-type', marker.text);
                    marker.element.setAttribute('data-processed-marker', 'true');
                });
                
                logger.logProcess(`Hidden ${foundMarkers.length} markers visually`);
                return foundMarkers.length;
            },

            /**
            * Finds the appropriate marker for a specific table
            * Only responsibility is to find a marker for a table
            */
            findTableMarker: function(table) {
                const TC = window.TableConverter;
                const CONFIG = TC.CONFIG;
                const logger = TC.logger;
                
                if (!table) return null;
                
                // Get all marker names for validation
                const markerNames = Object.values(CONFIG.markers.types)
                    .filter(m => m && m.isActive)
                    .map(m => m.name.toLowerCase());
                
                // Check the previous 3 elements before the table
                let element = table.previousElementSibling;
                let checkCount = 0;
                
                while (element && checkCount < 3) {
                    // Check data attribute first (faster if already processed)
                    if (element.getAttribute('data-marker-type')) {
                        return element;
                    }
                    
                    // Check element text
                    const text = element.textContent.trim().toLowerCase();
                    if (markerNames.includes(text)) {
                        return element;
                    }
                    
                    // Check spans inside
                    const spans = element.querySelectorAll('span');
                    for (const span of spans) {
                        const spanText = span.textContent.trim().toLowerCase();
                        if (markerNames.includes(spanText)) {
                            return span;
                        }
                    }
                    
                    // Move to previous element
                    element = element.previousElementSibling;
                    checkCount++;
                }
                
                // Default marker if none found
                logger.logMarker(`No marker found for table, using default: ${CONFIG.markers.defaultType}`);
                const defaultMarker = document.createElement('span');
                defaultMarker.textContent = CONFIG.markers.defaultType;
                defaultMarker._isDefault = true;
                
                return defaultMarker;
            },
        }
    },
    
// 8. Table Analysis
    /**
     * A comprehensive table structure analyzer that examines tables to determine their organization and complexity.
     * This critical system:
     * - Detects table features like headers, footers, and special cells
     * - Analyzes row and column structures to understand relationships
     * - Identifies hierarchical tables with nested headers or complex layouts
     * - Determines section boundaries within complex tables
     * - Creates matrix representations of tables for accurate position tracking
     * - Detects header contexts and data cell relationships
     * - Analyzes attribute structures like rowspan/colspan for proper handling
     * 
     * This object provides the structural understanding needed to convert tables appropriately
     * based on their complexity and organization, ensuring the converted output maintains
     * the semantic relationships of the original.
     */
    tableAnalysis: {       
        // ATTRIBUTE ANALYSIS 
            //----------------------------------------
            /**
             * Determines if any element in a table has a specific attribute
             * Used for detecting special table features
             * 
             * @param {HTMLElement} table - The table to analyze
             * @param {String} attribute - The attribute to search for
             * @returns {Boolean} True if any element has the attribute
             */
            hasAttribute: function(table, attribute) {
                const result = table.querySelector(`[${attribute}]`) !== null;
                window.TableConverter.logger.logAnalysis(`Checking for ${attribute} attribute`, { result });
                return result;
            },
    
        // HEADER STRUCTURE ANALYSIS
            //----------------------------------------          
            /**
             * Detects where data rows begin in a table
             * Distinguishes header rows from content using structural analysis
             * 
             * @param {HTMLElement} table - The table to analyze
             * @returns {Number} Row index where data content begins
             */
            detectDataRowBoundary: function(table) {
                window.TableConverter.logger.logProcess('Detecting data row boundary with enhanced all-TD support');
                
                // First check for explicit thead/tbody
                if (table.querySelector('thead') && table.querySelector('tbody')) {
                    const boundary = table.querySelector('tbody').rows[0].rowIndex;
                    window.TableConverter.logger.logProcessor('Data boundary found using thead/tbody structure', { 
                        rowIndex: boundary 
                    });
                    return boundary;
                }
                
                // Check for all-TD structure
                let allTdStructure = true;
                let firstNonTitleRow = -1;
                
                // Skip the title row if present (typically has colspan across entire table)
                let startRow = 0;
                if (table.rows[0] && table.rows[0].cells && 
                    table.rows[0].cells.length === 1 && 
                    parseInt(table.rows[0].cells[0].getAttribute('colspan')) > 2) {
                    startRow = 1;
                    firstNonTitleRow = 1;
                }
                
                // Check if all rows (except possibly title) contain only TD elements
                for (let i = startRow; i < Math.min(table.rows.length, startRow + 3); i++) {
                    const row = table.rows[i];
                    if (!row) continue;
                    
                    if (firstNonTitleRow === -1) {
                        firstNonTitleRow = i;
                    }
                    
                    // Check if this row has any TH elements
                    const hasTh = Array.from(row.cells).some(cell => 
                        cell.tagName.toLowerCase() === 'th');
                        
                    if (hasTh) {
                        allTdStructure = false;
                        break;
                    }
                }
                
                // Handle all-TD structure (simplified table)
                if (allTdStructure && firstNonTitleRow !== -1) {
                    window.TableConverter.logger.logProcess('All-TD structure detected - simplified boundary', {
                        boundary: firstNonTitleRow
                    });
                    return firstNonTitleRow; // Data starts at first non-title row
                }
                
                // Standard detection for tables with TH header cells
                const rows = Array.from(table.rows);
                for (let i = 0; i < rows.length; i++) {
                    // Check if this row has any TD elements - that's a data row
                    const hasTdCells = Array.from(rows[i].cells).some(cell => 
                        cell.tagName.toLowerCase() === 'td');
                        
                    if (hasTdCells) {
                        window.TableConverter.logger.logProcessor('Data row boundary detected', {
                            rowIndex: i,
                            reason: 'First row with TD elements'
                        });
                        return i;
                    }
                }
                
                // Default fallback - assume first 2 rows are headers at most
                return Math.min(2, rows.length);
            },
        
        // COLUMN STRUCTURE ANALYSIS
            //----------------------------------------
            /**
             * Analyzes and identifies column hierarchies in complex tables
             * Critical for rendering multi-level header structures
             * 
             * @param {HTMLElement} table - The table to analyze
             * @param {Object} boundaries - Header boundary information
             * @returns {Object} Column hierarchy information
             */
            detectColumnHierarchy: function(table, boundaries) {
                const TC = window.TableConverter; 
                const logger = TC?.logger ? TC.logger.ensureSafeLogger(TC.logger) : console;
                const CONFIG = TC?.CONFIG || {};
                const shouldLog = CONFIG.debug?.logAnalysis === true;
                
                if (shouldLog) {
                    logger.groupStart("==== DETECT COLUMN HIERARCHY (ENHANCED) ====");
                    logger.logAnalysis('Starting title-agnostic column hierarchy detection');
                }
                
                // Input validation
                if (!table || !table.rows) {
                    if (shouldLog) {
                        logger.logAnalysis('Invalid table input - early return');
                        logger.groupEnd();
                    }
                    return { hierarchies: new Map(), headerDepth: 0 };
                }
                
                // STEP 1: Create a normalized table view that excludes title if present
                let tableTitleCell = null;
                let titleRowIndex = -1;
                let titleAdjustedTable = table; // Default to original table
                
                // Check if first row is a title row (spans most/all columns)
                if (table.rows && table.rows.length > 0) {
                    const firstRow = table.rows[0];
                    if (firstRow && firstRow.cells && firstRow.cells.length === 1) {
                        const cell = firstRow.cells[0];
                        const colspan = parseInt(cell.getAttribute('colspan')) || 1;
                        const totalColumns = this.getTotalColumns(table);
                        
                        // Title detection: spans 70%+ of total columns
                        if (colspan > 1 && colspan / totalColumns > 0.7) {
                            tableTitleCell = cell;
                            titleRowIndex = 0;
                            if (shouldLog) {
                                logger.logAnalysis('Title row detected and will be excluded from hierarchy', {
                                    titleText: cell.textContent?.trim() || '',
                                    colspan,
                                    totalColumns
                                });
                            }
                            
                            // Create a view that skips the title row
                            titleAdjustedTable = {
                                ...table,
                                rows: {
                                    length: table.rows.length - 1,
                                    item: function(index) {
                                        return table.rows[index + 1];
                                    }
                                }
                            };
                            
                            // Add array-like indexing
                            for (let i = 0; i < titleAdjustedTable.rows.length; i++) {
                                titleAdjustedTable.rows[i] = table.rows[i + 1];
                            }
                        }
                    }
                }
                
                // STEP 2: Detect boundaries on title-adjusted table if needed
                let adjustedBoundaries = boundaries;
                
                if (titleRowIndex >= 0 && boundaries) {
                    // Adjust boundaries to account for removed title
                    adjustedBoundaries = {
                        ...boundaries,
                        headerEndIndex: Math.max(0, boundaries.headerEndIndex - 1),
                        dataStartIndex: Math.max(0, boundaries.dataStartIndex - 1)
                    };
                    
                    if (shouldLog) {
                        logger.logAnalysis('Adjusted boundaries after title removal', {
                            original: boundaries,
                            adjusted: adjustedBoundaries
                        });
                    }
                } else if (!boundaries) {
                    // If no boundaries provided, detect them on normalized table
                    adjustedBoundaries = this.detectHeaderBoundaries(titleAdjustedTable);
                }
                
                // STEP 3: Create header matrix and track all cells properly
                const headerEndIndex = adjustedBoundaries.headerEndIndex || 0;
                const dataColumnStart = adjustedBoundaries.dataColumnStart || 0;
                
                // Initialize matrix to track cell positions accurately
                const cellMatrix = [];
                for (let i = 0; i < headerEndIndex; i++) {
                    cellMatrix[i] = Array(100).fill(null); // Large enough for most tables
                }
                
                // Track header cell positions
                const headerCellsByPosition = new Map();
                let hasRowspans = false;
                let hasColspans = false;
                
                // Fill matrix with accurate cell positions from title-adjusted table
                for (let rowIndex = 0; rowIndex < headerEndIndex; rowIndex++) {
                    const row = titleAdjustedTable.rows[rowIndex];
                    if (!row || !row.cells) continue;
                    
                    let colPos = 0;
                    
                    // Skip cells already filled by rowspan
                    while (colPos < cellMatrix[rowIndex].length && cellMatrix[rowIndex][colPos] !== null) {
                        colPos++;
                    }
                    
                    for (let cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
                        const cell = row.cells[cellIndex];
                        if (!cell) continue;
                        
                        // Skip positions already covered by rowspan
                        while (colPos < cellMatrix[rowIndex].length && cellMatrix[rowIndex][colPos] !== null) {
                            colPos++;
                        }
                        
                        // Get cell properties
                        const rowspan = parseInt(cell.getAttribute('rowspan')) || 1;
                        const colspan = parseInt(cell.getAttribute('colspan')) || 1;
                        
                        if (rowspan > 1) hasRowspans = true;
                        if (colspan > 1) hasColspans = true;
                        
                        // Create cell info
                        const cellInfo = {
                            text: cell.textContent?.trim() || '',
                            html: cell.innerHTML || '',
                            rowspan: rowspan,
                            colspan: colspan,
                            rowIndex: rowIndex,
                            colIndex: colPos,
                            isHeader: cell.tagName.toLowerCase() === 'th',
                            element: cell,
                            colPosition: colPos,
                            isTopLevel: rowIndex === 0 // First row in title-adjusted view
                        };
                        
                        // Fill matrix positions
                        for (let r = 0; r < rowspan; r++) {
                            if (rowIndex + r < cellMatrix.length) {
                                for (let c = 0; c < colspan; c++) {
                                    if (colPos + c < cellMatrix[rowIndex].length) {
                                        cellMatrix[rowIndex + r][colPos + c] = {
                                            cell,
                                            info: cellInfo,
                                            originalRow: rowIndex,
                                            originalCol: colPos,
                                            spannedByRow: r > 0,
                                            spannedByCol: c > 0
                                        };
                                    }
                                }
                            }
                        }
                        
                        // Store cell info for each affected column
                        for (let c = 0; c < colspan; c++) {
                            const position = colPos + c;
                            
                            if (!headerCellsByPosition.has(position)) {
                                headerCellsByPosition.set(position, []);
                            }
                            
                            headerCellsByPosition.get(position).push(cellInfo);
                        }
                        
                        colPos += colspan;
                    }
                }
                
                // STEP 4: Find data columns from content rows
                const dataColumns = new Set();
                
                // Use title-adjusted table for finding data columns
                for (let rowIndex = adjustedBoundaries.dataStartIndex; rowIndex < titleAdjustedTable.rows.length; rowIndex++) {
                    const row = titleAdjustedTable.rows[rowIndex];
                    if (!row || !row.cells) continue;
                    
                    let colPos = 0;
                    
                    for (let cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
                        const cell = row.cells[cellIndex];
                        if (!cell) continue;
                        
                        const colspan = parseInt(cell.getAttribute('colspan')) || 1;
                        
                        // If in data area, record all positions
                        if (colPos >= dataColumnStart) {
                            for (let c = 0; c < colspan; c++) {
                                dataColumns.add(colPos + c);
                            }
                        }
                        
                        colPos += colspan;
                    }
                }
                
                const sortedDataColumns = Array.from(dataColumns).sort((a, b) => a - b);
                
                // STEP 5: Build hierarchical paths for each column
                const hierarchies = new Map();
                const topLevelHeaders = [];
                const leafHeaders = new Map();
                
                // Process each data column
                for (const colPos of sortedDataColumns) {
                    // Get header cells for this column position
                    const headerCells = headerCellsByPosition.get(colPos) || [];
                    
                    // Sort by row index to build proper path
                    headerCells.sort((a, b) => a.rowIndex - b.rowIndex);
                    
                    // Build path for this column
                    const path = [];
                    const headerRows = new Set();
                    
                    for (const header of headerCells) {
                        headerRows.add(header.rowIndex);
                        
                        path.push({
                            text: header.text,
                            html: header.html,
                            level: header.rowIndex,
                            rowIndex: header.rowIndex,
                            colIndex: header.colIndex,
                            rowspan: header.rowspan,
                            colspan: header.colspan,
                            isTopLevel: header.isTopLevel,
                            isLeaf: false // Will be set later
                        });
                    }
                    
                    // Add placeholder for empty paths
                    if (path.length === 0) {
                        path.push({
                            text: `Column ${colPos - dataColumnStart + 1}`,
                            html: `<span>Column ${colPos - dataColumnStart + 1}</span>`,
                            level: 0,
                            isTopLevel: true,
                            isLeaf: true,
                            isPlaceholder: true
                        });
                    }
                    
                    // Mark leaf nodes (deepest level)
                    if (path.length > 0) {
                        const maxRow = Math.max(...Array.from(headerRows));
                        for (const node of path) {
                            if (node.rowIndex === maxRow) {
                                node.isLeaf = true;
                            }
                        }
                        
                        // Save leaf header
                        leafHeaders.set(colPos, path[path.length - 1].text);
                    }
                    
                    // Store path
                    hierarchies.set(colPos, path);
                    
                    if (shouldLog) {
                        logger.logAnalysisDetail(`Built path for column ${colPos}`, {
                            path: path.map(p => p.text).join(' > '),
                            levels: path.length
                        });
                    }
                }
                
                // STEP 6: Calculate header depth
                // This is critical for hierarchy determination
                let headerDepth = 0;
                const allHeaderRows = new Set();
                
                for (const path of hierarchies.values()) {
                    const rowsInPath = new Set();
                    
                    for (const node of path) {
                        if (node.rowIndex !== undefined) {
                            rowsInPath.add(node.rowIndex);
                            allHeaderRows.add(node.rowIndex);
                        }
                    }
                    
                    headerDepth = Math.max(headerDepth, rowsInPath.size);
                }
                
                // STEP 7: Build top level headers for renderer
                const headerToColumns = new Map();
                
                for (const [colPos, path] of hierarchies.entries()) {
                    if (path.length > 0) {
                        const topNode = path.find(p => p.isTopLevel) || path[0];
                        const headerText = topNode.text;
                        
                        if (!headerToColumns.has(headerText)) {
                            headerToColumns.set(headerText, []);
                        }
                        
                        headerToColumns.get(headerText).push(colPos);
                    }
                }
                
                // Create formal top level header objects
                for (const [headerText, columns] of headerToColumns.entries()) {
                    if (columns.length > 0) {
                        const startCol = Math.min(...columns);
                        const endCol = Math.max(...columns);
                        
                        topLevelHeaders.push({
                            text: headerText,
                            html: hierarchies.get(columns[0])[0].html || headerText,
                            startCol,
                            endCol,
                            colspan: endCol - startCol + 1,
                            level: 0,
                            isDataColumn: true
                        });
                    }
                }
                
                if (shouldLog && CONFIG.debug?.logAnalysis) {                
                    logger.logAnalysis('Title-agnostic column hierarchy complete', {
                        hierarchiesCount: hierarchies.size,
                        topLevelHeadersCount: topLevelHeaders.length,
                        dataColumnCount: sortedDataColumns.length,
                        headerDepth,
                        titleHandling: titleRowIndex >= 0 ? 'Title excluded' : 'No title detected'
                    });
                    
                    logger.groupEnd();
                }
                
                return {
                    hierarchies,
                    dataColumnStart,
                    topLevelHeaders,
                    headerDepth,
                    dataColumns: sortedDataColumns,
                    hasRowspans,
                    hasColspans,
                    leafHeaders,
                    tableTitleCell: tableTitleCell ? {
                        text: tableTitleCell.textContent?.trim() || '',
                        position: 0,
                        colspan: parseInt(tableTitleCell.getAttribute('colspan')) || 1
                    } : null
                };
            },
        
        // SECTION & SUBTITLE ANALYSIS
            //----------------------------------------
            /**
             * Detects section titles and subtitles using structural analysis
             * Essential for identifying hierarchical relationships
             * 
             * @param {HTMLElement} table - The table to analyze
             * @param {Number} headerEndIndex - Row index where headers end
             * @param {Array} headerTexts - Array of header text values
             * @returns {Object} Section title information
             */
            sectionTitleDetection: function(table, headerEndIndex, headerTexts) {
                const logger = window.TableConverter.logger || console;
                
                // Default values
                let rowTitleHeader = '';
                let rowSubtitleHeader = '';
                
                // Check header cells for specific patterns
                if (headerTexts && headerTexts.length > 0) {
                    // First check the header rows for "Row Titles" specifically
                    for (let i = 0; i < headerTexts.length; i++) {
                        const rowCells = headerTexts[i];
                        if (!rowCells || !Array.isArray(rowCells)) continue;
                        
                        for (let j = 0; j < rowCells.length; j++) {
                            const cell = rowCells[j];
                            if (!cell || !cell.text) continue;
                            
                            // Special check for "Row Titles" which is a common pattern
                            if (cell.text === "Row Titles") {
                                rowTitleHeader = cell.text;
                                logger.logAnalysisDetail('Found exact "Row Titles" header', {
                                    row: i,
                                    column: j
                                });
                                break;
                            }
                        }
                        
                        // If we found a title, stop searching
                        if (rowTitleHeader) break;
                    }
                    
                    // If we didn't find "Row Titles", look for other patterns
                    if (!rowTitleHeader) {
                        // Check second row which often contains title headers
                        if (headerTexts.length > 1) {
                            const secondRow = headerTexts[1];
                            if (secondRow && Array.isArray(secondRow)) {
                                // First cell in second row is often a row title header
                                if (secondRow[0] && secondRow[0].text) {
                                    rowTitleHeader = secondRow[0].text;
                                    logger.logAnalysisDetail('Selected title from second row first cell', {
                                        text: rowTitleHeader
                                    });
                                }
                                // Second cell might contain a subtitle header
                                if (secondRow.length > 1 && secondRow[1] && secondRow[1].text) {
                                    rowSubtitleHeader = secondRow[1].text;
                                    logger.logAnalysisDetail('Selected subtitle from second row second cell', {
                                        text: rowSubtitleHeader
                                    });
                                }
                            }
                        }
                    }
                }
                
                // If we still don't have a title, use a fallback approach
                if (!rowTitleHeader) {
                    // Try to find a header cell with specific text patterns
                    for (let i = 0; i < headerEndIndex && i < table.rows.length; i++) {
                        const row = table.rows[i];
                        if (!row || !row.cells) continue;
                        
                        for (let j = 0; j < row.cells.length; j++) {
                            const cell = row.cells[j];
                            if (!cell) continue;
                            
                            const cellText = cell.textContent?.trim() || '';
                            
                            // Look for common title patterns
                            if (cellText.includes("Row") && 
                                (cellText.includes("Title") || 
                                cellText.includes("Titles") || 
                                cellText.includes("Header"))) {
                                rowTitleHeader = cellText;
                                logger.logAnalysisDetail('Found title by pattern match', {
                                    text: rowTitleHeader,
                                    row: i,
                                    column: j
                                });
                                break;
                            }
                        }
                        
                        if (rowTitleHeader) break;
                    }
                }
                
                // Fallback to a generic title if all else fails
                if (!rowTitleHeader) {
                    rowTitleHeader = "Row Titles";
                    logger.logAnalysisDetail('Using default "Row Titles" as fallback', {});
                }
                
                return { rowTitleHeader, rowSubtitleHeader };
            },

            /**
             * Detects section boundaries within a table
             * Maps the structural sections in hierarchical tables
             * 
             * @param {HTMLElement} table - The table to analyze
             * @param {Number} headerEndIndex - Row index where headers end
             * @param {Object} columnInfo - Column structure information
             * @returns {Array} Detected section boundaries
             */
            detectSectionBoundaries: function(table, headerEndIndex, columnInfo) {
                const logger = window.TableConverter.logger || console;
                
                logger.groupStart("==== DETECT SECTION BOUNDARIES ====");
                logger.logAnalysis('Starting section boundaries detection');

                // Create sections array
                const sections = [];

                // Validate inputs
                if (!table || !table.rows || headerEndIndex >= table.rows.length) {
                    logger.logAnalysis('Invalid table or header index for section detection');
                    logger.groupEnd();
                    return sections;
                }

                // Extract column information
                const dataColumnStart = columnInfo?.dataColumnStart || 0;

                // Extract header row text for proper section title handling
                const headerTexts = [];
                for (let i = 0; i < headerEndIndex && i < table.rows.length; i++) {
                    const headerRow = table.rows[i];
                    if (!headerRow || !headerRow.cells) continue;
                    
                    // Extract the text of header cells
                    const rowTexts = [];
                    for (let j = 0; j < headerRow.cells.length; j++) {
                        const cell = headerRow.cells[j];
                        if (!cell) continue;
                        
                        rowTexts.push({
                            text: cell.textContent?.trim() || '',
                            isHeader: cell.tagName.toLowerCase() === 'th',
                            colspan: parseInt(cell.getAttribute('colspan')) || 1,
                            rowspan: parseInt(cell.getAttribute('rowspan')) || 1,
                            index: j
                        });
                    }
                    
                    headerTexts.push(rowTexts);
                }
                
                // Find row title header and row subtitle header using sectionTitleDetection
                const { rowTitleHeader, rowSubtitleHeader } = this.sectionTitleDetection(
                    table, headerEndIndex, headerTexts);
                
                logger.logAnalysisDetail('Header identification', {
                    rowTitleHeader: rowTitleHeader || 'None found',
                    rowSubtitleHeader: rowSubtitleHeader || 'None found'
                });

                // Process data rows to find sections
                let currentSection = null;
                
                // Track which rows are already part of processed sections
                const processedRows = new Set();

                for (let rowIndex = headerEndIndex; rowIndex < table.rows.length; rowIndex++) {
                    // Skip if this row is already part of a processed section
                    if (processedRows.has(rowIndex)) {
                        logger.logAnalysisDetail(`Row ${rowIndex} already processed as part of a section, skipping`);
                        continue;
                    }
                    
                    const row = table.rows[rowIndex];
                    if (!row || !row.cells) continue;
                    
                    logger.logAnalysisDetail('Processing data row', {
                        rowIndex: rowIndex,
                        cellCount: row.cells.length
                    });
                    
                    // Analyze row for TH cells
                    const thCells = Array.from(row.cells).filter(cell => 
                        cell && cell.tagName && cell.tagName.toLowerCase() === 'th');
                    
                    // Check if we have an all-TD section (no TH cells)
                    const allTdSection = thCells.length === 0;
                    
                    if (thCells.length > 0 || allTdSection) {
                        // Extract section information
                        let sectionId = '';
                        let sectionTitle = rowTitleHeader;
                        let sectionSubtitle = '';
                        
                        if (!allTdSection) {
                            // First TH cell contains the section ID
                            if (thCells[0]) {
                                sectionId = thCells[0].textContent?.trim() || '';
                            }
                            
                            // IMPORTANT: Apply correct section subtitle rules based on TH count
                            // - If 1 TH cell: No section subtitle
                            // - If 2 TH cells: No section subtitle
                            // - If 3+ TH cells: Second TH is the section subtitle
                            if (thCells.length >= 3) {
                                // For three or more TH cells, the second TH is the section subtitle
                                sectionSubtitle = thCells[1].textContent?.trim() || '';
                                
                                logger.logAnalysisDetail('Three or more TH cells - second TH is section subtitle', {
                                    firstTH: thCells[0]?.textContent?.trim() || '',
                                    secondTH: thCells[1]?.textContent?.trim() || '',
                                    thirdTH: thCells.length > 2 ? thCells[2]?.textContent?.trim() || '' : 'none'
                                });
                            } else {
                                // For 1-2 TH cells, do NOT set a section subtitle
                                sectionSubtitle = '';
                                
                                logger.logAnalysisDetail(`${thCells.length} TH cell section - no section subtitle`, {
                                    thCount: thCells.length
                                });
                            }
                            
                            // Combine section ID with row title header if appropriate
                            if (sectionId && /^\d+$/.test(sectionId)) {
                                // For numeric section IDs, keep the title as is
                                // don't append the number to avoid "Row Titles 1"
                                sectionTitle = rowTitleHeader;
                                
                                logger.logAnalysisDetail('Using standard section title for numeric ID', {
                                    title: sectionTitle,
                                    id: sectionId
                                });
                            }
                        } else {
                            // For all-TD sections, just use first cell as ID
                            if (row.cells.length > 0) {
                                sectionId = row.cells[0].textContent?.trim() || '';
                            }
                            // No section title for all-TD sections
                            sectionTitle = '';
                            // No section subtitle for all-TD sections
                            sectionSubtitle = '';
                        }
                        
                        // Get largest rowspan to determine section boundaries
                        let maxRowspan = 1;
                        if (thCells.length > 0) {
                            maxRowspan = Math.max(...thCells.map(cell => 
                                parseInt(cell.getAttribute('rowspan')) || 1
                            ));
                        } else {
                            maxRowspan = Math.max(...Array.from(row.cells).map(cell => 
                                parseInt(cell.getAttribute('rowspan')) || 1
                            ));
                        }
                        
                        // Ensure section doesn't extend beyond table
                        const sectionEndRow = Math.min(table.rows.length - 1, rowIndex + maxRowspan - 1);
                        
                        // Create section
                        currentSection = {
                            id: sectionId,
                            title: sectionTitle,
                            subtitle: sectionSubtitle,  // Now correctly empty for 1-2 TH cells
                            startRow: rowIndex,
                            endRow: sectionEndRow,
                            isDataSection: true,
                            subtitles: [],
                            sublabels: [],
                            thCellCount: thCells.length
                        };
                        
                        sections.push(currentSection);
                        
                        logger.logAnalysis('Section identified by structure', {
                            id: sectionId.substring(0, 30) + (sectionId.length > 30 ? '...' : ''),
                            title: sectionTitle.substring(0, 30) + (sectionTitle.length > 30 ? '...' : ''),
                            subtitle: sectionSubtitle.substring(0, 30) + (sectionSubtitle.length > 30 ? '...' : ''),
                            thCellCount: thCells.length,
                            startRow: rowIndex,
                            endRow: sectionEndRow
                        });
                        
                        // Mark all rows in this section as processed
                        for (let r = rowIndex; r <= sectionEndRow; r++) {
                            processedRows.add(r);
                        }

                        // Process subtitles and sublabels using the coordinator function
                        if (typeof window.TableConverter.processors.helpers.processSubtitlesAndSublabels === 'function') {
                            logger.logAnalysis('Calling processSubtitlesAndSublabels', {
                                sectionId: sectionId,
                                rowRange: `${rowIndex}-${sectionEndRow}`,
                                sectionSubtitle: sectionSubtitle
                            });
                            
                            const boundaries = {
                                dataColumnStart: dataColumnStart,
                                sectionSubtitle: sectionSubtitle
                            };
                            
                            const subtitles = window.TableConverter.processors.helpers.processSubtitlesAndSublabels(
                                table,
                                rowIndex,  // sectionStartRow
                                sectionEndRow,
                                boundaries
                            );
                            
                            currentSection.subtitles = subtitles;
                            
                            const sublabelCount = subtitles.reduce((count, st) => 
                                count + (st.sublabels?.length || 0), 0);
                            
                            logger.logAnalysis(`Processed ${subtitles.length} subtitles with ${sublabelCount} total sublabels for section`, {
                                id: sectionId,
                                rowRange: `${rowIndex}-${sectionEndRow}`
                            });
                        } else {
                            logger.logAnalysis('processSubtitlesAndSublabels function not available', {
                                fallback: 'Section will have no subtitles or sublabels'
                            });
                        }
                        
                        // Skip to end of section
                        rowIndex = sectionEndRow;
                    }
                }

                // Final validation - ensure no sections extend beyond the table
                for (const section of sections) {
                    if (section.endRow >= table.rows.length) {
                        logger.logAnalysis('Fixing section that extends beyond table bounds', {
                            id: section.id,
                            oldEndRow: section.endRow,
                            newEndRow: table.rows.length - 1
                        });
                        section.endRow = table.rows.length - 1;
                    }
                }

                logger.logAnalysis('Section boundaries detection complete', {
                    sectionCount: sections.length,
                    totalSubtitles: sections.reduce((count, section) => count + section.subtitles.length, 0),
                    totalSublabels: sections.reduce((count, section) => 
                        count + section.subtitles.reduce((subCount, subtitle) => 
                            subCount + (subtitle.sublabels?.length || 0), 0), 0)
                });

                logger.groupEnd();
                return sections;
            },
        
            /**
             * Detects subtitles within a section using structural analysis
             * Identifies level 2 headers in hierarchical tables
             * 
             * @param {HTMLElement} table - The table to analyze
             * @param {Number} sectionStartRow - Start row of the section
             * @param {Number} sectionEndRow - End row of the section
             * @param {Number} dataColumnStart - Column where data begins
             * @param {String} sectionSubtitle - Section's subtitle to exclude
             * @returns {Array} Detected subtitles
             */
            detectSubtitles: function(table, sectionStartRow, sectionEndRow, dataColumnStart, sectionSubtitle) {
                const logger = window.TableConverter.logger || console;
            
                logger.logAnalysisDetail('Starting subtitle detection', {
                    rowRange: `${sectionStartRow}-${sectionEndRow}`,
                    dataColumnStart: dataColumnStart,
                    sectionSubtitle: sectionSubtitle || 'None provided'
                });
            
                if (!table || !table.rows) {
                    logger.error('Invalid table for subtitle detection');
                    return [];
                }
            
                const subtitles = [];
                let sectionId = '';
                let sectionTitle = sectionSubtitle || '';
            
                // Process the first row of the section
                if (sectionStartRow < table.rows.length) {
                    const firstSectionRow = table.rows[sectionStartRow];
                    
                    const thCells = Array.from(firstSectionRow.cells || []).filter(cell => 
                        cell && cell.tagName && cell.tagName.toLowerCase() === 'th');
                    
                    logger.logAnalysisDetail(`First section row has ${thCells.length} TH cells`);
                    
                    // Identify section ID
                    if (thCells.length > 0) {
                        sectionId = thCells[0].textContent.trim();
                        logger.logAnalysisDetail(`Set section ID: "${sectionId}"`);
                    }
                    
                    // Track current row offset for subtitle ranges
                    let currentRowOffset = sectionStartRow;
                    
                    // Process each TH cell to determine if it's a subtitle
                    let thCount = 0;
                    for (let i = 0; i < firstSectionRow.cells.length; i++) {
                        const cell = firstSectionRow.cells[i];
                        if (!cell || cell.tagName.toLowerCase() !== 'th') continue;
                        
                        const cellText = cell.textContent.trim();
                        
                        // Skip if matches section subtitle
                        if (sectionTitle && cellText === sectionTitle) {
                            logger.logAnalysisDetail(`Skipping cell "${cellText}" as it matches section subtitle`);
                            thCount++;
                            continue;
                        }
                        
                        const isFirstSectionRow = true;
                        
                        // Use isSubtitle helper to determine if this is a subtitle

                        if (this.isSubtitle(cell, i, thCount, isFirstSectionRow, thCells.length)) {
                            const rowspan = parseInt(cell.getAttribute('rowspan')) || 1;
                            
                            const subtitle = {
                                title: cellText,
                                rowStart: currentRowOffset,
                                rowEnd: currentRowOffset + rowspan - 1,
                                colIndex: i,
                                rowspan: rowspan,
                                element: cell,
                                sublabels: []
                            };
                            
                            subtitles.push(subtitle);
                            
                            logger.logAnalysisDetail(`Found subtitle: "${subtitle.title}"`, {
                                rowRange: `${subtitle.rowStart}-${subtitle.rowEnd}`,
                                colIndex: subtitle.colIndex,
                                rowspan: rowspan
                            });
                            
                            // Advance the offset for the next subtitle
                            currentRowOffset += rowspan;
                        }
                        
                        thCount++;
                    }
                }
            
                // Continue with remaining rows in the section
                for (let rowIndex = sectionStartRow + 1; rowIndex <= sectionEndRow; rowIndex++) {
                    const row = table.rows[rowIndex];
                    if (!row || !row.cells) continue;
                    
                    logger.logAnalysisDetail('Processing data row', {
                        rowIndex: rowIndex,
                        cellCount: row.cells.length
                    });
                    
                    // Analyze row for TH cells
                    const thCells = Array.from(row.cells).filter(cell => 
                        cell && cell.tagName && cell.tagName.toLowerCase() === 'th');
                    
                    let thCount = 0;
                    
                    // Process TH cells in current row
                    for (let cellIdx = 0; cellIdx < row.cells.length; cellIdx++) {
                        const cell = row.cells[cellIdx];
                        if (!cell) continue;
                        
                        // Only process TH cells
                        if (cell.tagName && cell.tagName.toLowerCase() === 'th') {
                            const cellText = cell.textContent?.trim() || '';
                            
                            // Skip section ID and section subtitle cells
                            if ((sectionId && cellText === sectionId) || 
                                (sectionTitle && cellText === sectionTitle)) {
                                thCount++;
                                continue;
                            }
                            
                            // Check if this is a subtitle
                            if (this.isSubtitle(cell, cellIdx, thCount, false, thCells.length)) {
                                const rowspan = parseInt(cell.getAttribute('rowspan')) || 1;
                                
                                const subtitle = {
                                    title: cellText,
                                    rowStart: rowIndex,  // ✅ Use actual row index
                                    rowEnd: rowIndex + rowspan - 1,
                                    colIndex: cellIdx,
                                    rowspan: rowspan,
                                    element: cell,
                                    sublabels: []
                                };
                                
                                // Don't duplicate existing subtitles
                                const isDuplicate = subtitles.some(s => 
                                    s.title === subtitle.title && 
                                    s.rowStart <= rowIndex && 
                                    s.rowEnd >= rowIndex && 
                                    s.colIndex === subtitle.colIndex
                                );
                                
                                if (!isDuplicate) {
                                    subtitles.push(subtitle);
                                    logger.logAnalysisDetail(`Found subtitle header: "${subtitle.title}"`, {
                                        rowRange: `${subtitle.rowStart}-${subtitle.rowEnd}`,
                                        colIndex: subtitle.colIndex,
                                        cellIndex: cellIdx
                                    });
                                } else {
                                    logger.logAnalysisDetail(`Row ${rowIndex}: Skipping duplicate subtitle "${subtitle.title}"`);
                                }
                            }
                            
                            thCount++;
                        }
                    }
                }
            
                // Final filter to remove section subtitle matches
                if (sectionTitle) {
                    const originalCount = subtitles.length;
                    const filteredSubtitles = subtitles.filter(subtitle => 
                        subtitle.title !== sectionTitle
                    );
                    
                    if (filteredSubtitles.length < originalCount) {
                        logger.logAnalysisDetail(`Filtered out ${originalCount - filteredSubtitles.length} subtitles matching section subtitle "${sectionTitle}"`);
                    }
                    
                    subtitles.length = 0;
                    filteredSubtitles.forEach(s => subtitles.push(s));
                }
            
                logger.logAnalysis(`Subtitle detection complete - found ${subtitles.length} unique subtitle(s)`);
                return subtitles;
            },
            

            /**
             * Determines if a cell should be classified as a subtitle
             * Uses structural rules to identify subtitle cells
             * 
             * @param {HTMLElement} cell - The cell to evaluate
             * @param {Number} cellIndex - Index of the cell
             * @param {Number} thCount - Count of TH cells processed
             * @param {Boolean} isFirstSectionRow - Whether this is the first row of a section
             * @param {Number} totalThCells - Total TH cells in the row
             * @returns {Boolean} True if the cell is a subtitle
             */
            isSubtitle: function(cell, cellIndex, thCount, isFirstSectionRow, totalThCells) {
                // Must be a TH element
                if (!cell || cell.tagName.toLowerCase() !== 'th') {
                    return false;
                }
                
                // Apply different rules based on row position and TH count
                if (isFirstSectionRow) {
                    // In the first section row, rules depend on total TH count
                    if (totalThCells === 1) {
                        // If only 1 TH, it's a section ID (not a subtitle)
                        return false;
                    } else if (totalThCells === 2) {
                        // If 2 TH cells, the second (thCount=1) is a subtitle
                        return thCount === 1;
                    } else if (totalThCells >= 3) {
                        // If 3+ TH cells, the first is section ID, second is section title,
                        // third and subsequent (thCount >= 2) are subtitles
                        return thCount >= 2;
                    }
                } else {
                    // In subsequent rows, any TH cell could be a subtitle
                    // We rely on the caller to verify it's not affected by rowspan
                    return true;
                }
                
                return false;
            },
        
        // CONTENT ANALYSIS
            //----------------------------------------
            /**
             * Builds a comprehensive header context map using table matrix
             * Maps column positions to their header context for accurate rendering
             * 
             * @param {HTMLElement} table - The table to analyze
             * @param {Number} headerEndIndex - Row index where headers end
             * @returns {Map} Map of column positions to header context
             */
            buildHeaderContextMap: function(table, headerEndIndex) {
                const logger = window.TableConverter.logger || console;
                
                logger.logAnalysis('Building header context map using matrix approach');
                
                // First create the table matrix for accurate positioning
                const matrix = this.createTableMatrix(table);
                
                if (!matrix || !matrix.length) {
                    return new Map();
                }
                
                // Create separate maps for row-oriented and column-oriented headers
                const rowHeaderMap = new Map();
                const columnHeaderMap = new Map();
                
                // PHASE 1: Identify row-oriented headers
                // These are headers in the first few columns, typically with text like "Row Titles"
                for (let rowIdx = 0; rowIdx < headerEndIndex; rowIdx++) {
                    // Only use first few columns (typically contain row titles)
                    for (let colIdx = 0; colIdx < Math.min(3, matrix[0].length); colIdx++) {
                        const cell = matrix[rowIdx][colIdx];
                        if (!cell || !cell.isHeader) continue;
                        
                        // Row-oriented headers often span multiple columns
                        if ((cell.colSpan || cell.colSpan) > 1) {
                            // Record this as a row header
                            rowHeaderMap.set(`${rowIdx}-${colIdx}`, {
                                text: cell.text || '',
                                position: colIdx,
                                rowIndex: rowIdx,
                                isRowHeader: true,
                                element: cell.element
                            });
                        }
                    }
                }
                
                // PHASE 2: Process column headers
                // Use the last 1-2 rows of headers for column mapping
                for (let rowIdx = Math.max(0, headerEndIndex - 2); rowIdx < headerEndIndex; rowIdx++) {
                    for (let colIdx = 0; colIdx < matrix[0].length; colIdx++) {
                        const cell = matrix[rowIdx][colIdx];
                        if (!cell || !cell.isHeader) continue;
                        
                        // Skip cells already seen due to rowspan
                        if (cell.originalRowIndex !== undefined && cell.originalRowIndex < rowIdx) {
                            continue;
                        }
                        
                        // Map this header to all columns it covers
                        for (let c = 0; c < (cell.colSpan || 1); c++) {
                            const position = colIdx + c;
                            
                            columnHeaderMap.set(position, {
                                text: cell.text || '',
                                position: position,
                                rowIndex: rowIdx,
                                isColumnHeader: true,
                                element: cell.element,
                                originalRow: cell.originalRowIndex || rowIdx,
                                originalCol: cell.originalColIndex || colIdx
                            });
                        }
                    }
                }
                
                // PHASE 3: Create a combined context map
                const headerContextMap = new Map();
                
                // Combine row and column header information
                for (let colIdx = 0; colIdx < (matrix[0]?.length || 0); colIdx++) {
                    // Get column header
                    const columnHeader = columnHeaderMap.get(colIdx);
                    
                    // Find relevant row header (prefer the last row header cell, which is most specific)
                    let rowHeader = null;
                    for (const [key, header] of rowHeaderMap.entries()) {
                        // Only use row headers from the appropriate position
                        if (header.position <= colIdx && header.position + 2 >= colIdx) {
                            rowHeader = header;
                        }
                    }
                    
                    // Build context information
                    const context = {
                        position: colIdx,
                        columnHeader: columnHeader ? columnHeader.text : '',
                        rowHeader: rowHeader ? rowHeader.text : '',
                        hasColumnHeader: !!columnHeader,
                        hasRowHeader: !!rowHeader,
                        text: columnHeader ? columnHeader.text : (rowHeader ? rowHeader.text : '')
                    };
                    
                    // Determine which header to use for the text
                    // For positions 0-2 (typical row header area), prefer row headers
                    // For positions 3+ (typical data area), prefer column headers
                    if (colIdx <= 2 && rowHeader) {
                        context.text = rowHeader.text;
                        context.isRowOriented = true;
                    } else if (columnHeader) {
                        context.text = columnHeader.text;
                        context.isColumnOriented = true;
                    }
                    
                    headerContextMap.set(colIdx, context);
                }
                
                // Only log a summary
                logger.logAnalysis('Header context map complete', {
                    totalPositions: headerContextMap.size,
                    rowHeaderCount: rowHeaderMap.size,
                    columnHeaderCount: columnHeaderMap.size
                });
                
                return headerContextMap;
            },
        
            /**
             * Determines if a cell is a content cell or sublabel
             * Critical for distinguishing data cells from structural elements
             * 
             * @param {Object} cellInfo - Cell information
             * @param {Number} lastThPosition - Position of the last TH cell
             * @param {Map} headerMap - Header context mapping
             * @param {Number} thCount - Count of TH cells
             * @param {Object} lastThCell - The last TH cell in the row
             * @returns {Boolean} True if it's a content cell, false if sublabel
             */
            isContentCell: function(cellInfo, lastThPosition, headerMap, thCount, lastThCell) {
                // Get logger
                const logger = window.TableConverter.logger || console;
                
                // Log basic inputs
                logger.logAnalysis('isContentCell INPUTS', {
                    cellPosition: cellInfo ? cellInfo.position : -1,
                    cellText: cellInfo ? cellInfo.text : '',
                    lastThPosition: lastThPosition,
                    lastThText: lastThCell ? lastThCell.text : '',
                    thCount: thCount
                });
                
                // PRINCIPLE 1: Must be immediately after TH
                if (cellInfo && cellInfo.position !== lastThPosition + 1) {
                    logger.logAnalysis('Not immediately after TH - content cell');
                    return true; // Not immediately after TH = content cell
                }
                
                // Get detailed header context for last TH and first TD
                let lastThHeaderContext = null;
                let tdHeaderContext = null;
                
                // Get last TH header context
                if (headerMap && lastThCell && lastThCell.position !== undefined) {
                    lastThHeaderContext = headerMap.has(lastThCell.position) ? 
                        headerMap.get(lastThCell.position) : null;
                }
                
                // Get TD header context
                if (headerMap && cellInfo && cellInfo.position !== undefined) {
                    tdHeaderContext = headerMap.has(cellInfo.position) ? 
                        headerMap.get(cellInfo.position) : null;
                }
                
                // Log detailed header contexts and the actual headers
                logger.logAnalysis('DETAILED HEADER CONTEXTS', {
                    lastTH: {
                        position: lastThCell ? lastThCell.position : -1,
                        text: lastThCell ? lastThCell.text : '',
                        actualHeader: lastThCell ? lastThCell.text : '', // The TH's own text is its header
                        headerContext: lastThHeaderContext ? {
                            rowHeader: lastThHeaderContext.rowHeader || 'none',
                            columnHeader: lastThHeaderContext.columnHeader || 'none',
                            isRowOriented: lastThHeaderContext.isRowOriented || false
                        } : 'no context'
                    },
                    firstTD: {
                        position: cellInfo ? cellInfo.position : -1,
                        text: cellInfo ? cellInfo.text : '',
                        actualHeader: tdHeaderContext ? tdHeaderContext.columnHeader || 'none' : 'none',
                        headerContext: tdHeaderContext ? {
                            rowHeader: tdHeaderContext.rowHeader || 'none',
                            columnHeader: tdHeaderContext.columnHeader || 'none',
                            isRowOriented: tdHeaderContext.isRowOriented || false
                        } : 'no context'
                    }
                });
                
                // CRITICAL CHECK: The key to determine header continuity is whether
                // the TD cell has its own distinct column header that's different from the TH cell
                
                // Extract the actual headers for comparison
                const thOwnHeader = lastThCell ? lastThCell.text : '';
                const tdColumnHeader = tdHeaderContext ? tdHeaderContext.columnHeader : null;
                
                // Log the actual headers being compared
                logger.logAnalysis('ACTUAL HEADER COMPARISON', {
                    thOwnHeader: thOwnHeader,
                    tdColumnHeader: tdColumnHeader || 'none',
                    tdHasDistinctColumnHeader: !!tdColumnHeader,
                    rowHeaderContinuity: tdHeaderContext && lastThHeaderContext ? 
                        tdHeaderContext.rowHeader === lastThHeaderContext.rowHeader : false
                });
                
                // THE DECISIVE FACTOR: If TD has its own distinct column header, 
                // it's a content cell (header continuity is broken)
                if (tdColumnHeader) {
                    logger.logAnalysis('TD has distinct column header - header continuity broken - content cell', {
                        tdColumnHeader: tdColumnHeader
                    });
                    return true; // It's a content cell
                }
                
                // If TD shares the same row header as the TH and has no column header,
                // then it's maintaining header continuity = sublabel
                if (tdHeaderContext && lastThHeaderContext && 
                    tdHeaderContext.rowHeader && lastThHeaderContext.rowHeader &&
                    tdHeaderContext.rowHeader === lastThHeaderContext.rowHeader) {
                    
                    logger.logAnalysis('TD shares row header with TH with no column header - header continuity maintained - sublabel', {
                        sharedRowHeader: tdHeaderContext.rowHeader
                    });
                    return false; // It's a sublabel
                }
                
                // Log the final decision and reason
                logger.logAnalysis('No clear header continuity indicators - defaulting to content cell');
                return true; // Default to content cell if no clear evidence of header continuity
            },
        
            /**
             * Detects header boundaries in a table
             * Determines where headers end and data begins both horizontally and vertically
             * 
             * @param {HTMLElement} table - The table to analyze
             * @returns {Object} Header boundary information
             */
            detectHeaderBoundaries: function(table) {
                // Use logger if available
                const TC = window.TableConverter;
                const logger = TC?.logger ? TC.logger.ensureSafeLogger(TC.logger) : console;
                const CONFIG = TC?.CONFIG || {};
                const shouldLog = CONFIG.debug?.logAnalysis === true;
                
                if (shouldLog) {
                    logger.groupStart && logger.groupStart("==== DETECT HEADER BOUNDARIES ====");
                    logger.logAnalysis('Starting header boundaries detection');
                    
                    // LOG COMPLETE TABLE STRUCTURE
                    logger.logAnalysis('COMPLETE TABLE STRUCTURE', {
                        exists: !!table,
                        tagName: table ? table.tagName : 'undefined',
                        id: table ? (table.id || 'no-id') : 'undefined',
                        rowCount: table && table.rows ? table.rows.length : 0,
                        hasThead: table && table.querySelector ? !!table.querySelector('thead') : false,
                        hasTbody: table && table.querySelector ? !!table.querySelector('tbody') : false
                    });
                }
                
                // Validate input
                if (!table || !table.rows) {
                    if (shouldLog) {
                        logger.logAnalysis('Invalid table, returning empty boundaries');
                        logger.groupEnd && logger.groupEnd();
                    }
                    return {
                        headerEndIndex: 0,
                        dataStartIndex: 0,
                        dataColumnStart: 0
                    };
                }
                
                // PHASE 1: Find where header rows end (first row with TD cells)
                if (shouldLog) {
                    logger.groupStart && logger.groupStart("1. Finding Header End Index");
                }
                
                let headerEndIndex = 0;
                for (let i = 0; i < table.rows.length; i++) {
                    const row = table.rows[i];
                    if (!row || !row.cells) continue;
                    
                    // Check if this row has any TD elements
                    let hasTdCell = false;
                    for (let j = 0; j < row.cells.length; j++) {
                        const cell = row.cells[j];
                        if (cell && cell.tagName && cell.tagName.toLowerCase() === 'td') {
                            hasTdCell = true;
                            break;
                        }
                    }
                        
                    if (hasTdCell) {
                        headerEndIndex = i;
                        if (shouldLog) {
                            logger.logAnalysis('Found first row with TD cells', {
                                rowIndex: i,
                                cellCount: row.cells.length,
                                rowData: Array.from(row.cells).map((cell, idx) => ({
                                    idx,
                                    type: cell.tagName,
                                    text: cell.textContent?.trim().substring(0, 30) || 'empty'
                                }))
                            });
                        }
                        break;
                    }
                }
                
                // If no TD cells found, assume all rows are headers
                if (headerEndIndex === 0 && table.rows.length > 0) {
                    headerEndIndex = table.rows.length;
                    if (shouldLog) {
                        logger.logAnalysis('No TD cells found, all rows are headers', {
                            rowCount: table.rows.length
                        });
                    }
                    
                    const returnValue = {
                        headerEndIndex: headerEndIndex,
                        dataStartIndex: headerEndIndex,
                        dataColumnStart: 0
                    };
                    
                    if (shouldLog) {
                        logger.logAnalysis('Returning header boundaries', returnValue);
                        logger.groupEnd && logger.groupEnd();
                        logger.groupEnd && logger.groupEnd();
                    }
                    return returnValue;
                }
                
                if (shouldLog) {
                    logger.groupEnd && logger.groupEnd(); // End finding header end index
                }
                
                // PHASE 2: Create matrix for accurate position tracking
                if (shouldLog) {
                    logger.groupStart && logger.groupStart("2. Creating Table Matrix");
                }
                
                // Create the table matrix
                const matrix = this.createTableMatrix(table);
                if (shouldLog) {
                    logger.logAnalysis('Created table matrix', {
                        rows: matrix ? matrix.length : 0,
                        columns: matrix && matrix.length > 0 ? matrix[0].length : 0
                    });
                    
                    logger.groupEnd && logger.groupEnd(); // End creating table matrix
                }
                
                // PHASE 3: Analyze first data row structure
                if (shouldLog) {
                    logger.groupStart && logger.groupStart("3. Finding Data Column Start Position");
                }
                
                let dataColumnStart = 0;
                let lastThCell = null;
                
                if (headerEndIndex < table.rows.length) {
                    const firstDataRow = table.rows[headerEndIndex];
                    if (shouldLog) {
                        logger.logAnalysisDetail && logger.logAnalysisDetail('Analyzing first data row', {
                            rowIndex: headerEndIndex,
                            cellCount: firstDataRow?.cells?.length || 0,
                            rowData: Array.from(firstDataRow?.cells || []).map((cell, idx) => ({
                                idx,
                                type: cell.tagName,
                                text: cell.textContent?.trim().substring(0, 30) || 'empty',
                                colspan: parseInt(cell.getAttribute('colspan') || '1'),
                                rowspan: parseInt(cell.getAttribute('rowspan') || '1')
                            }))
                        });
                    }
                    
                    if (firstDataRow && firstDataRow.cells) {
                        // Count TH cells to understand structure
                        const thCells = [];
                        const tdCells = [];
                        
                        // Calculate effective positions considering colspans
                        let position = 0;
                        let lastThPosition = -1;
                        
                        for (let i = 0; i < firstDataRow.cells.length; i++) {
                            const cell = firstDataRow.cells[i];
                            if (!cell) continue;
                            
                            const isStructural = cell.tagName.toLowerCase() === 'th';
                            const colspan = parseInt(cell.getAttribute('colspan')) || 1;
                            
                            if (isStructural) {
                                const thCellInfo = {
                                    index: i,
                                    position: position,
                                    colspan: colspan,
                                    cell: cell,
                                    text: cell.textContent?.trim() || ''
                                };
                                
                                thCells.push(thCellInfo);
                                lastThPosition = position + colspan - 1; // Last position covered by this TH
                                lastThCell = thCellInfo; // Save reference to last TH cell
                            } else {
                                tdCells.push({
                                    index: i,
                                    position: position,
                                    colspan: colspan,
                                    cell: cell,
                                    text: cell.textContent?.trim() || ''
                                });
                            }
                            
                            position += colspan;
                        }
                        
                        if (shouldLog) {
                            logger.logAnalysisDetail && logger.logAnalysisDetail('Cell type distribution in first data row', {
                                thCount: thCells.length,
                                tdCount: tdCells.length,
                                lastThPosition: lastThPosition,
                                thCells: thCells.map(c => `[${c.index}] Pos ${c.position} "${c.text}"`),
                                tdCells: tdCells.map(c => `[${c.index}] Pos ${c.position} "${c.text}"`)
                            });
                        }
                        
                        // Find the first TD cell after the last TH cell
                        let firstTdAfterTh = null;
                        
                        for (const tdCell of tdCells) {
                            if (tdCell.position > lastThPosition) {
                                firstTdAfterTh = tdCell;
                                break;
                            }
                        }
                        
                        if (firstTdAfterTh) {
                            if (shouldLog) {
                                logger.logAnalysisDetail && logger.logAnalysisDetail('Found first TD after last TH', {
                                    index: firstTdAfterTh.index,
                                    position: firstTdAfterTh.position,
                                    text: firstTdAfterTh.text,
                                    isAfterLastTh: firstTdAfterTh.position === lastThPosition + 1
                                });
                            }
                            
                            // BUILD HEADER CONTEXT MAP using matrix-based approach
                            const headerContextMap = this.buildHeaderContextMap(table, headerEndIndex);
                            
                            if (shouldLog) {
                                logger.logAnalysisDetail && logger.logAnalysisDetail('Built header context map', {
                                    mapSize: headerContextMap.size,
                                    keyPositions: Array.from(headerContextMap.keys()).slice(0, 10) // First 10 positions
                                });
                                
                                // Detailed logging of header context for the TD position
                                if (headerContextMap.has(firstTdAfterTh.position)) {
                                    const contextInfo = headerContextMap.get(firstTdAfterTh.position);
                                    logger.logAnalysis('Header context for the first TD', {
                                        position: firstTdAfterTh.position,
                                        text: firstTdAfterTh.text,
                                        headerText: contextInfo.text || 'none',
                                        rowHeader: contextInfo.rowHeader || 'none',
                                        columnHeader: contextInfo.columnHeader || 'none',
                                        isRowOriented: contextInfo.isRowOriented || false,
                                        isColumnOriented: contextInfo.isColumnOriented || false
                                    });
                                }
                            }
                            
                            // Use the enhanced isContentCell function
                            const isContentResult = this.isContentCell(
                                firstTdAfterTh, 
                                lastThPosition, 
                                headerContextMap, 
                                thCells.length,
                                lastThCell
                            );
                            
                            // Log the cell classification decision
                            if (shouldLog) {
                                logger.logAnalysis('Cell classification', {
                                    position: firstTdAfterTh.position,
                                    text: firstTdAfterTh.text,
                                    isAfterLastTh: firstTdAfterTh.position === lastThPosition + 1,
                                    thCount: thCells.length,
                                    hasHeader: headerContextMap.has(firstTdAfterTh.position),
                                    classification: isContentResult ? 'CONTENT CELL' : 'SUBLABEL'
                                });
                            }
                            
                            // Set dataColumnStart based on cell classification
                            if (!isContentResult) {
                                // This is a sublabel - data starts after it
                                const sublabelEndPos = firstTdAfterTh.position + firstTdAfterTh.colspan;
                                dataColumnStart = sublabelEndPos;
                                
                                if (shouldLog) {
                                    logger.logAnalysis('TD identified as sublabel', {
                                        tdPosition: firstTdAfterTh.position,
                                        sublabelEndPos: sublabelEndPos,
                                        dataColumnStart: dataColumnStart
                                    });
                                }
                            } else {
                                // This is a content cell - data starts here
                                dataColumnStart = firstTdAfterTh.position;
                                
                                if (shouldLog) {
                                    logger.logAnalysis('TD identified as content cell', {
                                        position: firstTdAfterTh.position,
                                        dataColumnStart: dataColumnStart
                                    });
                                }
                            }
                        } else {
                            // No TD after TH, use position after last TH
                            dataColumnStart = lastThPosition + 1;
                            
                            if (shouldLog) {
                                logger.logAnalysis('No TD after last TH, using position after last TH', {
                                    lastThPosition: lastThPosition,
                                    dataColumnStart: dataColumnStart
                                });
                            }
                        }
                    }
                }
                
                if (shouldLog) {
                    logger.groupEnd && logger.groupEnd(); // End finding data column start
                }
                
                // PHASE 4: Validate through column header structure in header rows
                if (shouldLog) {
                    logger.groupStart && logger.groupStart("4. Column Alignment Validation");
                }
                
                // If appropriate headers exist, analyze them to validate our dataColumnStart
                if (headerEndIndex > 0) {
                    // Get the last header row (likely contains leaf column headers)
                    const lastHeaderRow = table.rows[headerEndIndex - 1];
                    
                    if (lastHeaderRow && lastHeaderRow.cells) {
                        const headerCellPositions = [];
                        let position = 0;
                        
                        // Map all header cell positions
                        for (let i = 0; i < lastHeaderRow.cells.length; i++) {
                            const cell = lastHeaderRow.cells[i];
                            if (!cell) continue;
                            
                            const colspan = parseInt(cell.getAttribute('colspan') || '1');
                            
                            headerCellPositions.push({
                                startPos: position,
                                endPos: position + colspan - 1,
                                cellIndex: i,
                                text: cell.textContent?.trim() || ''
                            });
                            
                            position += colspan;
                        }
                        
                        // Sort by position
                        headerCellPositions.sort((a, b) => a.startPos - b.startPos);
                        
                        if (shouldLog) {
                            logger.logAnalysisDetail && logger.logAnalysisDetail('Header cell positions for alignment validation', {
                                positions: headerCellPositions.map(p => ({
                                    range: `${p.startPos}-${p.endPos}`,
                                    text: p.text
                                }))
                            });
                        }
                        
                        // If our dataColumnStart doesn't align with a header cell boundary,
                        // we may need to adjust it
                        let alignedStart = false;
                        for (const headerPos of headerCellPositions) {
                            if (headerPos.startPos === dataColumnStart) {
                                alignedStart = true;
                                if (shouldLog) {
                                    logger.logAnalysisDetail && logger.logAnalysisDetail('Data column start aligns with header cell boundary', {
                                        position: dataColumnStart,
                                        headerText: headerPos.text
                                    });
                                }
                                break;
                            } else if (headerPos.startPos > dataColumnStart) {
                                // Found a header cell after our current dataColumnStart
                                // Only adjust if the current position doesn't make sense
                                const diffToNext = headerPos.startPos - dataColumnStart;
                                if (diffToNext <= 2) { // Small gap, might need alignment
                                    if (shouldLog) {
                                        logger.logAnalysis('Adjusting dataColumnStart to align with header cell', {
                                            currentStart: dataColumnStart,
                                            headerCellStart: headerPos.startPos,
                                            difference: diffToNext,
                                            headerText: headerPos.text
                                        });
                                    }
                                    dataColumnStart = headerPos.startPos;
                                } else if (shouldLog) {
                                    logger.logAnalysisDetail && logger.logAnalysisDetail('Gap to next header too large, keeping current position', {
                                        currentStart: dataColumnStart,
                                        nextHeaderStart: headerPos.startPos,
                                        difference: diffToNext
                                    });
                                }
                                alignedStart = true;
                                break;
                            }
                        }
                        
                        // If no alignment found, keep the current value
                        if (!alignedStart && shouldLog) {
                            logger.logAnalysis('Keeping current dataColumnStart (no header alignment)', {
                                dataColumnStart: dataColumnStart
                            });
                        }
                    }
                }
                
                // Make sure dataColumnStart is valid and positive
                if (dataColumnStart < 0) {
                    dataColumnStart = 0;
                    if (shouldLog) {
                        logger.logAnalysis('Correcting negative dataColumnStart to 0', {});
                    }
                }
                
                if (shouldLog) {
                    logger.groupEnd && logger.groupEnd(); // End column alignment validation
                }
                
                // Final boundary object
                const returnValue = {
                    headerEndIndex: headerEndIndex,
                    dataStartIndex: headerEndIndex,
                    dataColumnStart: dataColumnStart
                };
                
                if (shouldLog) {
                    logger.logAnalysis('Header boundaries detection complete', {
                        headerEndIndex: returnValue.headerEndIndex,
                        dataStartIndex: returnValue.dataStartIndex,
                        dataColumnStart: returnValue.dataColumnStart
                    });
                    
                    logger.groupEnd && logger.groupEnd(); // End main group
                }
                return returnValue;
            },
        
            /**
             * Identifies all cells in the first column for structural analysis
             * Used for section header detection
             * 
             * @param {HTMLElement} table - The table to analyze
             * @returns {Array} First column cells with metadata
             */
            getAllFirstColumnCells: function(table) {
                const logger = window.TableConverter.logger || console;
                logger.logAnalysis('Getting all first column cells for structure analysis');
                
                if (!table || !table.rows) {
                    logger.logAnalysis('Invalid table for first column cell extraction');
                    return [];
                }
                
                // Get header boundaries to know where data rows start
                const headerBoundaries = this.detectHeaderBoundaries(table);
                const dataStartIndex = headerBoundaries.dataStartIndex || 0;
                
                const firstColumnCells = [];
                
                // Process data rows only, skipping header rows
                for (let rowIndex = dataStartIndex; rowIndex < table.rows.length; rowIndex++) {
                    const row = table.rows[rowIndex];
                    if (!row || !row.cells || row.cells.length === 0) continue;
                    
                    // Get the first cell in this row
                    const firstCell = row.cells[0];
                    if (!firstCell) continue;
                    
                    // Extract cell information - PURELY STRUCTURAL
                    const cellInfo = {
                        element: firstCell,
                        rowIndex: rowIndex,
                        tagName: firstCell.tagName.toLowerCase(),
                        content: firstCell.textContent?.trim() || '',
                        rowspan: parseInt(firstCell.getAttribute('rowspan')) || 1,
                        colspan: parseInt(firstCell.getAttribute('colspan')) || 1,
                        isEmpty: !firstCell.textContent || firstCell.textContent.trim() === '',
                        hasStructuralEmphasis: firstCell.tagName.toLowerCase() === 'th' || 
                                            firstCell.hasAttribute('scope') ||
                                            firstCell.hasAttribute('headers')
                    };
                    
                    firstColumnCells.push(cellInfo);
                    
                    // Skip rows affected by rowspan
                    if (cellInfo.rowspan > 1) {
                        rowIndex += (cellInfo.rowspan - 1);
                    }
                }
                
                logger.logAnalysis('First column cell analysis complete', {
                    cellCount: firstColumnCells.length,
                    firstCellTags: firstColumnCells.map(cell => cell.tagName).join(', '),
                    contentSamples: firstColumnCells.slice(0, 3).map(cell => cell.content)
                });
                
                return firstColumnCells;
            },

        
        // UTILITY FUNCTIONS
            //----------------------------------------
            /**
             * Calculates the total number of columns in a table
             * Used for proportional calculations in layout
             * 
             * @param {HTMLElement} table - The table to analyze
             * @returns {Number} Total number of columns
             */
            getTotalColumns: function(table) {
                if (!table || !table.rows || table.rows.length === 0) return 0;
                
                let maxColumns = 0;
                
                // Check first few rows to get the maximum column count
                for (let i = 0; i < Math.min(table.rows.length, 3); i++) {
                    const row = table.rows[i];
                    if (!row || !row.cells) continue;
                    
                    let colCount = 0;
                    for (let j = 0; j < row.cells.length; j++) {
                        const cell = row.cells[j];
                        if (!cell) continue;
                        
                        const colspan = parseInt(cell.getAttribute('colspan')) || 1;
                        colCount += colspan;
                    }
                    
                    maxColumns = Math.max(maxColumns, colCount);
                }
                
                return maxColumns;
            },
        
            /**
             * Safely counts cells with rowspan or colspan attributes
             * Used to assess table complexity
             * 
             * @param {HTMLElement} table - The table to analyze
             * @returns {Number} Count of cells with span attributes
             */
            safeCountTableCells: function(table) {
                try {
                    // First try a direct querySelectorAll if available
                    if (table && table.querySelectorAll && typeof table.querySelectorAll === 'function') {
                        return table.querySelectorAll('td, th').length;
                    }
                    
                    // Fallback to manual counting
                    let count = 0;
                    if (table && table.rows) {
                        for (let i = 0; i < table.rows.length; i++) {
                            const row = table.rows[i];
                            if (row && row.cells) {
                                count += row.cells.length;
                            }
                        }
                    }
                    return count;
                } catch (e) {
                    return 0;
                }
            },

            safeCountSpannedCells: function(table) {
                try {
                    // First check if querySelectorAll is available
                    if (table && table.querySelectorAll && typeof table.querySelectorAll === 'function') {
                        return table.querySelectorAll('[rowspan], [colspan]').length;
                    }
                    
                    // Fallback to manual counting
                    let count = 0;
                    if (table && table.rows) {
                        for (let i = 0; i < table.rows.length; i++) {
                            const row = table.rows[i];
                            if (!row || !row.cells) continue;
                            
                            for (let j = 0; j < row.cells.length; j++) {
                                const cell = row.cells[j];
                                if (!cell) continue;
                                
                                try {
                                    if (cell.hasAttribute && 
                                        (cell.hasAttribute('rowspan') || cell.hasAttribute('colspan'))) {
                                        count++;
                                    }
                                } catch (e) {
                                    // Skip this cell on error
                                }
                            }
                        }
                    }
                    return count;
                } catch (e) {
                    return 0;
                }
            },
        
            /**
             * Determines if a table has a hierarchical structure
             * Critical for selecting the appropriate rendering strategy
             * 
             * @param {HTMLElement} table - The table to analyze
             * @returns {Boolean} True if the table has a hierarchical structure
             */
            isHierarchicalTable: function(table) {
                const logger = window.TableConverter.logger || console;
                logger.logAnalysis('Checking if table is hierarchical');
                
                // Early validation
                if (!table || !table.rows || table.rows.length === 0) {
                    return false;
                }
                
                // Instead of duplicating title detection, use detectColumnHierarchy directly
                // It now handles title detection and adjustment internally
                const columnHierarchy = this.detectColumnHierarchy(table);
                
                // A table is hierarchical if it has 2 or more levels in its column structure
                const isHierarchical = columnHierarchy.headerDepth >= 2;
                
                const hasTitleRow = !!columnHierarchy.tableTitleCell;
                
                logger.logAnalysis('Hierarchy calculation result', {
                    headerDepth: columnHierarchy.headerDepth,
                    isHierarchical: isHierarchical,
                    hasTitleRow: hasTitleRow
                });
                
                return isHierarchical;
            },
        
            /**
             * Creates a comprehensive 2D matrix representation of a table
             * Essential for accurate position tracking and cell relationship analysis
             * 
             * @param {HTMLElement} table - The table to analyze
             * @returns {Array} 2D matrix of cell information
             */
            createTableMatrix: function(table) {
                const TC = window.TableConverter;
                const logger = TC?.logger ? TC.logger.ensureSafeLogger(TC.logger) : console;
                const CONFIG = TC?.CONFIG || {};
                const shouldLogProcessor = CONFIG.debug?.logProcessors === true;
                const shouldLogProcessorDetail = CONFIG.debug?.logProcessorDetail === true;
                
                if (shouldLogProcessor) {
                    logger.groupStart("=== TABLE MATRIX CREATION ===");
                    logger.logProcessor('START Creating table matrix', { 
                        tableElement: table ? table.tagName : 'null',
                        rowCount: table?.rows?.length || 0,
                        cellCount: table?.querySelectorAll ? table.querySelectorAll('td, th').length : 0
                    });
                }
                
                // Set up timer for overall processing
                const matrixTimer = shouldLogProcessor ? logger.startTimer('TableMatrixCreation') : null;
                
                try {
                    // Safety check to make sure we're working with a real table element
                    if (!table || !table.rows) {
                        if (shouldLogProcessor) {
                            logger.error('Invalid table for matrix creation', {
                                table: table ? 'exists' : 'null',
                                rows: table?.rows ? table.rows.length : 'undefined'
                            });
                            if (matrixTimer) logger.endTimer(matrixTimer);
                            logger.groupEnd();
                        }
                        return [];
                    }
                    
                    const matrix = [];
                    let maxCols = 0;
                    
                    // First pass: determine max columns and initialize matrix
                    try {
                        if (shouldLogProcessor) {
                            logger.logProcessor('STEP 1: Calculating matrix dimensions');
                            const dimensionsTimer = logger.startTimer('MatrixDimensions');
                        }
                        
                        for (let i = 0; i < (table.rows ? table.rows.length : 0); i++) {
                            const row = table.rows[i];
                            if (!row || !row.cells) continue;
                            
                            let colCount = 0;
                            for (let j = 0; j < row.cells.length; j++) {
                                const cell = row.cells[j];
                                if (!cell) continue;
                                
                                // Safely get colspan attribute
                                let colspan = 1;
                                try {
                                    colspan = parseInt(cell.getAttribute('colspan')) || 1;
                                } catch (e) {
                                    colspan = 1;
                                }
                                
                                colCount += colspan;
                                
                                if (shouldLogProcessorDetail) {
                                    logger.logProcessorDetail(`Row ${i}, cell ${j} with colspan ${colspan}`, {
                                        tag: cell.tagName,
                                        contentSample: cell.textContent?.trim().substring(0, 20) || 'empty',
                                        colPosition: colCount - colspan
                                    });
                                }
                            }
                            
                            maxCols = Math.max(maxCols, colCount);
                            
                            if (shouldLogProcessorDetail) {
                                logger.logProcessorDetail(`Row ${i} effective column count: ${colCount}`, {
                                    currentMaxCols: maxCols,
                                    actualCells: row.cells.length
                                });
                            }
                        }
                        
                        if (shouldLogProcessor) {
                            const dimensionsTimer = logger.endTimer ? logger.endTimer('MatrixDimensions') : null;
                        }
                    } catch (sizeError) {
                        if (shouldLogProcessor) {
                            logger.error('Error calculating matrix size:', sizeError || {
                                message: 'Unknown error in size calculation',
                                stack: new Error().stack
                            });
                        }
                        maxCols = 0;
                    }
                    
                    // If we couldn't determine the size, exit early
                    if (maxCols === 0) {
                        if (shouldLogProcessor) {
                            logger.logProcessor('Unable to determine matrix dimensions, returning empty matrix');
                            if (matrixTimer) logger.endTimer(matrixTimer);
                            logger.groupEnd();
                        }
                        return [];
                    }
                    
                    if (shouldLogProcessor) {
                        logger.logProcessor('Matrix dimensions calculated successfully', { 
                            rows: table.rows ? table.rows.length : 0, 
                            cols: maxCols,
                            ratio: maxCols / (table.rows?.length || 1)
                        });
                    }
                    
                    // Initialize empty matrix
                    if (shouldLogProcessor) {
                        logger.logProcessor('STEP 2: Initializing empty matrix');
                        const initTimer = logger.startTimer('MatrixInitialization');
                    }
                    
                    for (let i = 0; i < (table.rows ? table.rows.length : 0); i++) {
                        matrix[i] = new Array(maxCols).fill(null);
                    }
                    
                    if (shouldLogProcessor) {
                        const initTimer = logger.endTimer ? logger.endTimer('MatrixInitialization') : null;
                    }
                    
                    // Second pass: fill matrix with cell information
                    try {
                        if (shouldLogProcessor) {
                            logger.logProcessor('STEP 3: Populating matrix with cell information');
                            const fillTimer = logger.startTimer('MatrixFill');
                            logger.groupStart("Cell placement in matrix", true);
                        }
                        
                        for (let rowIndex = 0; rowIndex < (table.rows ? table.rows.length : 0); rowIndex++) {
                            const row = table.rows[rowIndex];
                            if (!row || !row.cells) {
                                if (shouldLogProcessorDetail) {
                                    logger.logProcessorDetail(`Row ${rowIndex}: Skipping invalid row`);
                                }
                                continue;
                            }
                            
                            let colIndex = 0;
                            
                            if (shouldLogProcessorDetail) {
                                logger.logProcessorDetail(`Processing row ${rowIndex}`, {
                                    cellCount: row.cells.length
                                });
                            }
                            
                            for (let cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
                                // Find next available column
                                let skippedCols = 0;
                                while (colIndex < maxCols && matrix[rowIndex][colIndex] !== null) {
                                    colIndex++;
                                    skippedCols++;
                                }
                                
                                if (shouldLogProcessorDetail && skippedCols > 0) {
                                    logger.logProcessorDetail(`Skipped ${skippedCols} columns due to spanning cells`, {
                                        rowIndex: rowIndex,
                                        startCol: colIndex - skippedCols,
                                        endCol: colIndex - 1
                                    });
                                }
                                
                                if (colIndex >= maxCols) {
                                    if (shouldLogProcessorDetail) {
                                        logger.logProcessorDetail(`Row ${rowIndex}: Column index ${colIndex} exceeds max columns ${maxCols}, breaking`);
                                    }
                                    break;
                                }
                                
                                const cell = row.cells[cellIndex];
                                if (!cell) {
                                    if (shouldLogProcessorDetail) {
                                        logger.logProcessorDetail(`Row ${rowIndex}, Cell ${cellIndex}: Invalid cell reference`);
                                    }
                                    continue;
                                }
                                
                                // Safely get rowspan and colspan attributes
                                let rowSpan = 1, colSpan = 1;
                                try {
                                    rowSpan = parseInt(cell.getAttribute('rowspan')) || 1;
                                } catch (e) {
                                    rowSpan = 1;
                                }
                                
                                try {
                                    colSpan = parseInt(cell.getAttribute('colspan')) || 1;
                                } catch (e) {
                                    colSpan = 1;
                                }
                                
                                // Safely get content - CRITICAL FIX: Preserve actual cell content
                                let content = '', innerText = '';
                                try {
                                    // Store the actual cell HTML content, not a placeholder
                                    content = cell.innerHTML || '';
                                    
                                    // Also store the text version for easier processing
                                    innerText = cell.textContent || '';
                                    
                                    // Debug the actual content being stored
                                    if (shouldLogProcessorDetail) {
                                        logger.logProcessorDetail(`Captured cell content at ${rowIndex},${colIndex}`, {
                                            htmlLength: content.length,
                                            textLength: innerText.length,
                                            contentSample: content.substring(0, 30) + (content.length > 30 ? '...' : '')
                                        });
                                    }
                                } catch (e) {
                                    content = '';
                                    innerText = '';
                                    if (shouldLogProcessor) {
                                        logger.error('Error capturing cell content', {
                                            rowIndex,
                                            colIndex,
                                            error: e.message
                                        });
                                    }
                                }
                                
                                // Log cell details for better debugging
                                if (shouldLogProcessorDetail) {
                                    logger.logProcessorDetail(`Cell (${rowIndex},${cellIndex}) -> Matrix (${rowIndex},${colIndex})`, {
                                        tag: cell.tagName,
                                        textSample: innerText.substring(0, 30) + (innerText.length > 30 ? '...' : ''),
                                        isHeader: cell.tagName.toLowerCase() === 'th',
                                        rowSpan: rowSpan,
                                        colSpan: colSpan,
                                        matrixColPos: colIndex
                                    });
                                }
                                
                                // Create cell info object
                                const cellInfo = {
                                    element: cell,
                                    content: content, // Store the actual HTML content, not a placeholder
                                    text: innerText,  // Store the actual text content
                                    rowSpan: rowSpan,
                                    colSpan: colSpan,
                                    isHeader: cell.tagName.toLowerCase() === 'th',
                                    originalRowIndex: rowIndex,
                                    originalColIndex: colIndex
                                };
                                
                                // Fill spanning cells
                                for (let rs = 0; rs < rowSpan; rs++) {
                                    for (let cs = 0; cs < colSpan; cs++) {
                                        if (rowIndex + rs < matrix.length && colIndex + cs < maxCols) {
                                            matrix[rowIndex + rs][colIndex + cs] = cellInfo;
                                        }
                                    }
                                }
                                
                                // Log spanning cells if present
                                if (shouldLogProcessorDetail && (rowSpan > 1 || colSpan > 1)) {
                                    logger.logProcessorDetail(`Created spanning cell`, {
                                        originCell: `(${rowIndex},${colIndex})`,
                                        rowSpan: rowSpan,
                                        colSpan: colSpan,
                                        affectedCells: `${rowSpan}x${colSpan}`,
                                        range: `(${rowIndex},${colIndex}) to (${rowIndex + rowSpan - 1},${colIndex + colSpan - 1})`
                                    });
                                }
                                
                                colIndex += colSpan;
                            }
                        }
                        
                        if (shouldLogProcessor) {
                            logger.groupEnd(); // End "Cell placement in matrix"
                            const fillTimer = logger.endTimer ? logger.endTimer('MatrixFill') : null;
                        }
                        
                    } catch (fillError) {
                        if (shouldLogProcessor) {
                            logger.error('Error filling matrix:', fillError || {
                                message: 'Unknown error during matrix fill',
                                stack: new Error().stack
                            });
                        }
                        // Return whatever we've managed to build so far
                    }
                    
                    // Calculate matrix statistics for verification
                    if (shouldLogProcessor) {
                        const filledCells = matrix.reduce((count, row) => 
                            count + row.filter(cell => cell !== null).length, 0);
                        const headerCells = matrix.reduce((count, row) => 
                            count + row.filter(cell => cell !== null && cell.isHeader).length, 0);
                        const spanningCells = matrix.reduce((count, row) => 
                            count + row.filter(cell => cell !== null && (cell.rowSpan > 1 || cell.colSpan > 1)).length, 0);
                        
                        logger.logProcessor('Table matrix created successfully', { 
                            dimensions: `${matrix.length}x${maxCols}`,
                            filledCells: filledCells,
                            headerCells: headerCells,
                            spanningCells: spanningCells,
                            cellCount: window.TableConverter.tableAnalysis.safeCountTableCells(table),
                            spannedCells: window.TableConverter.tableAnalysis.safeCountSpannedCells(table)
                        });
                    }
                    
                    if (shouldLogProcessor) {
                        if (matrixTimer) logger.endTimer(matrixTimer);
                        logger.groupEnd(); // End "=== TABLE MATRIX CREATION ==="
                    }
                    return matrix;
                } catch (error) {
                    // Global error handler
                    if (shouldLogProcessor) {
                        logger.error('Error creating table matrix:', error || {
                            message: 'Unknown matrix creation error',
                            stack: new Error().stack
                        });
                        
                        // Log detailed error context for debugging
                        logger.logProcessorDetail("Matrix creation failed with context", {
                            tableExists: !!table,
                            rowCount: table?.rows?.length || 0,
                            cellCount: table?.querySelectorAll ? table.querySelectorAll('td, th').length : 0,
                            error: error?.message || 'Unknown error',
                            stack: error?.stack || new Error().stack
                        });
                        
                        if (matrixTimer) logger.endTimer(matrixTimer);
                        logger.groupEnd(); // End "=== TABLE MATRIX CREATION ==="
                    }
                    return [];
                }
            },
        
            /**
             * Detects if a table has a title row using structural analysis
             * Identifies standalone titles for better rendering
             * 
             * @param {HTMLElement} table - The table to analyze
             * @returns {Object} Title information
             */
            detectTableTitle: function(table) {
                const logger = window.TableConverter.logger || console;
                logger.logAnalysis('Starting structure-agnostic table title detection');
                
                // Default return value
                const result = {
                    hasTitle: false,
                    titleText: '',
                    titleElement: null,
                    titleRow: null
                };
                
                if (!table || !table.rows || table.rows.length === 0) {
                    logger.logAnalysis('No table or empty table, no title to detect');
                    return result;
                }
                
                try {
                    // Get the first row
                    const firstRow = table.rows[0];
                    if (!firstRow || !firstRow.cells || firstRow.cells.length === 0) {
                        logger.logAnalysis('First row has no cells, no title to detect');
                        return result;
                    }
                    
                    // First check: Is the first row a single cell that spans multiple columns?
                    if (firstRow.cells.length === 1) {
                        const firstCell = firstRow.cells[0];
                        const colspan = parseInt(firstCell.getAttribute('colspan')) || 1;
                        
                        // If colspan > 1, this is likely a title
                        if (colspan > 1) {
                            result.hasTitle = true;
                            result.titleText = firstCell.textContent?.trim() || '';
                            result.titleElement = firstCell;
                            result.titleRow = firstRow;
                            
                            logger.logAnalysis('Title detected: Single cell in first row with colspan > 1', {
                                titleText: result.titleText,
                                colspan: colspan
                            });
                            
                            return result;
                        }
                    }
                    
                    // Second check: Does the first cell span all columns?
                    // Calculate total columns by examining subsequent rows
                    let totalColumns = 0;
                    
                    // Look at the first few rows to determine the actual column count
                    for (let i = 1; i < Math.min(table.rows.length, 4); i++) {
                        const row = table.rows[i];
                        if (!row || !row.cells) continue;
                        
                        // Count effective columns considering colspans
                        let effectiveColumns = 0;
                        for (let j = 0; j < row.cells.length; j++) {
                            const cell = row.cells[j];
                            if (!cell) continue;
                            
                            effectiveColumns += parseInt(cell.getAttribute('colspan')) || 1;
                        }
                        
                        // Track maximum column count found
                        if (effectiveColumns > totalColumns) {
                            totalColumns = effectiveColumns;
                        }
                    }
                    
                    // Now check if first cell's colspan equals the total columns
                    if (totalColumns > 0) {
                        const firstCell = firstRow.cells[0];
                        const colspan = parseInt(firstCell.getAttribute('colspan')) || 1;
                        
                        if (colspan === totalColumns) {
                            result.hasTitle = true;
                            result.titleText = firstCell.textContent?.trim() || '';
                            result.titleElement = firstCell;
                            result.titleRow = firstRow;
                            
                            logger.logAnalysis('Title detected: First cell spans all columns', {
                                titleText: result.titleText,
                                colspan: colspan,
                                totalColumns: totalColumns
                            });
                            
                            return result;
                        }
                        
                        logger.logAnalysisDetail('First cell does not span all columns', {
                            firstCellColspan: colspan,
                            totalColumns: totalColumns
                        });
                    }
                    
                    // Third check: Special case - does the first row have different structure than data rows?
                    const firstRowCellCount = firstRow.cells.length;
                    const secondRowCellCount = table.rows.length > 1 && table.rows[1].cells ? 
                        table.rows[1].cells.length : 0;
                    const thirdRowCellCount = table.rows.length > 2 && table.rows[2].cells ? 
                        table.rows[2].cells.length : 0;
                        
                    // If the first row has exactly one cell, but other rows have more,
                    // and the first cell has no colspan attribute, it might still be a title
                    if (firstRowCellCount === 1 && 
                        ((secondRowCellCount > 1) || (thirdRowCellCount > 1))) {
                        
                        result.hasTitle = true;
                        result.titleText = firstRow.cells[0].textContent?.trim() || '';
                        result.titleElement = firstRow.cells[0];
                        result.titleRow = firstRow;
                        
                        logger.logAnalysis('Title detected: First row has unique structure', {
                            titleText: result.titleText,
                            firstRowCellCount: firstRowCellCount,
                            secondRowCellCount: secondRowCellCount,
                            thirdRowCellCount: thirdRowCellCount
                        });
                        
                        return result;
                    }
                    
                    // No title detected
                    logger.logAnalysis('No table title detected using structure-agnostic methods');
                    return result;
                    
                } catch (error) {
                    logger.error('Error in structure-agnostic title detection', {
                        message: error?.message || 'Unknown error',
                        stack: error?.stack || new Error().stack
                    });
                    
                    return result;
                }
            },
        
            /**
             * Detects sublabels within a table section
             * Identifies level 3 headers in hierarchical tables
             * 
             * @param {HTMLElement} table - The table to analyze
             * @param {Array} subtitles - Parent subtitles
             * @param {Array} cellMatrix - Table cell matrix
             * @param {Number} sectionStartRow - Section start row
             * @param {Number} sectionEndRow - Section end row
             * @param {Number} dataColumnStart - Column where data begins
             * @returns {Array} Detected sublabels
             */
            detectSublabels: function(table, subtitles, cellMatrix, sectionStartRow, sectionEndRow, dataColumnStart) {
                const logger = window.TableConverter.logger || console;

                logger.logAnalysis('Starting improved sublabel detection with rowspan handling', {
                    subtitleCount: subtitles.length,
                    rowRange: `${sectionStartRow}-${sectionEndRow}`,
                    dataColumnStart
                });

                // Clear any existing sublabels
                for (const subtitle of subtitles) {
                    if (subtitle) subtitle.sublabels = [];
                }

                // Track processed positions to avoid duplicates
                const processedPositions = new Set();
                
                // Create rowspan tracking data structures
                const rowspanInfo = {
                    subtitleRowspans: new Map(), // Maps row -> array of subtitles that affect it via rowspan
                    processedRows: new Set()     // Tracks which rows we've processed
                };
                
                // Build a comprehensive subtitle-to-row map including rowspan relationships
                for (const subtitle of subtitles) {
                    if (!subtitle) continue;
                    
                    // For each row this subtitle spans
                    for (let r = subtitle.rowStart; r <= subtitle.rowEnd; r++) {
                        if (!rowspanInfo.subtitleRowspans.has(r)) {
                            rowspanInfo.subtitleRowspans.set(r, []);
                        }
                        
                        // Add this subtitle to the affected row
                        rowspanInfo.subtitleRowspans.get(r).push({
                            subtitle: subtitle,
                            isDirectRow: r === subtitle.rowStart, // First row is direct, others via rowspan
                            colIndex: subtitle.colIndex
                        });
                    }
                }
                
                // Process each row in the section
                for (let rowIndex = sectionStartRow; rowIndex <= sectionEndRow; rowIndex++) {
                    const row = table.rows[rowIndex];
                    if (!row || !row.cells) continue;
                    
                    // Skip if already processed
                    if (rowspanInfo.processedRows.has(rowIndex)) continue;
                    
                    // Get subtitles that affect this row
                    const affectingSubtitles = rowspanInfo.subtitleRowspans.get(rowIndex) || [];
                    if (affectingSubtitles.length === 0) continue;
                    
                    logger.logAnalysisDetail(`Processing row ${rowIndex} for sublabels`, {
                        subtitleCount: affectingSubtitles.length,
                        subtitles: affectingSubtitles.map(s => s.subtitle.title)
                    });
                    
                    // PHASE 1: Handle direct TH-to-TD case (first TD after last TH)
                    let lastThIndex = -1;
                    let lastThPosition = -1;
                    
                    // Find the last TH cell in this row
                    for (let i = 0; i < row.cells.length; i++) {
                        const cell = row.cells[i];
                        if (!cell) continue;
                        
                        if (cell.tagName.toLowerCase() === 'th') {
                            lastThIndex = i;
                            
                            // Calculate position
                            let position = 0;
                            for (let j = 0; j < i; j++) {
                                if (row.cells[j]) {
                                    position += parseInt(row.cells[j].getAttribute('colspan')) || 1;
                                }
                            }
                            lastThPosition = position;
                        }
                    }
                    
                    // If we found a TH, check for a TD right after it
                    if (lastThIndex >= 0 && lastThIndex + 1 < row.cells.length) {
                        const sublabelIndex = lastThIndex + 1;
                        const sublabelCell = row.cells[sublabelIndex];
                        
                        // Process if it's a TD cell
                        if (sublabelCell && sublabelCell.tagName.toLowerCase() === 'td') {
                            // Calculate position
                            let position = lastThPosition + (parseInt(row.cells[lastThIndex].getAttribute('colspan')) || 1);
                            
                            if (position < dataColumnStart) {
                                // Find the best subtitle for this sublabel
                                const directSubtitles = affectingSubtitles.filter(s => s.isDirectRow);
                                if (directSubtitles.length > 0) {
                                    // Find closest subtitle by column position
                                    let bestSubtitle = null;
                                    let bestDistance = Infinity;
                                    
                                    for (const subtitleInfo of directSubtitles) {
                                        const distance = Math.abs(subtitleInfo.colIndex - lastThIndex);
                                        if (distance < bestDistance) {
                                            bestDistance = distance;
                                            bestSubtitle = subtitleInfo.subtitle;
                                        }
                                    }
                                    
                                    if (bestSubtitle) {
                                        // Extract title
                                        let sublabelTitle = '';
                                        try {
                                            sublabelTitle = sublabelCell.textContent.trim();
                                        } catch (e) {
                                            sublabelTitle = '';
                                        }
                                        
                                        // Create sublabel
                                        const sublabelRowspan = parseInt(sublabelCell.getAttribute('rowspan')) || 1;
                                        const sublabel = {
                                            title: sublabelTitle,
                                            rowIndex: rowIndex,
                                            cellIndex: sublabelIndex,
                                            position: position,
                                            element: sublabelCell,
                                            rowspan: sublabelRowspan,
                                            parentSubtitle: bestSubtitle.title,
                                            structurallyDefined: true,
                                            data: []
                                        };
                                        
                                        // Add to parent subtitle
                                        bestSubtitle.sublabels = bestSubtitle.sublabels || [];
                                        bestSubtitle.sublabels.push(sublabel);
                                        
                                        // Mark as processed
                                        processedPositions.add(`${rowIndex}-${sublabelIndex}`);
                                        
                                        // Mark rows affected by rowspan
                                        for (let r = 0; r < sublabelRowspan; r++) {
                                            rowspanInfo.processedRows.add(rowIndex + r);
                                        }
                                        
                                        logger.logAnalysis(`Added direct sublabel "${sublabelTitle}" at row ${rowIndex}`, {
                                            parentSubtitle: bestSubtitle.title
                                        });
                                    }
                                }
                            }
                        }
                    }
                    
                    // PHASE 2: Handle rowspan-affected rows - crucial for missing sublabels!
                    // This handles cases where a row is affected by subtitles from above through rowspan
                    if (!rowspanInfo.processedRows.has(rowIndex)) {
                        // For rows affected by subtitle rowspans, look for the first TD cell
                        const rowspanSubtitles = affectingSubtitles.filter(s => !s.isDirectRow);
                        
                        if (rowspanSubtitles.length > 0) {
                            // Find the first TD cell in this row
                            let firstTdIndex = -1;
                            for (let i = 0; i < row.cells.length; i++) {
                                const cell = row.cells[i];
                                if (!cell) continue;
                                
                                if (cell.tagName.toLowerCase() === 'td') {
                                    firstTdIndex = i;
                                    break;
                                }
                            }
                            
                            if (firstTdIndex >= 0) {
                                const sublabelCell = row.cells[firstTdIndex];
                                
                                // Calculate position
                                let position = 0;
                                for (let i = 0; i < firstTdIndex; i++) {
                                    if (row.cells[i]) {
                                        position += parseInt(row.cells[i].getAttribute('colspan')) || 1;
                                    }
                                }
                                
                                // Check if this is before data columns
                                if (position < dataColumnStart) {
                                    // Find the most appropriate rowspan subtitle
                                    let bestSubtitle = null;
                                    
                                    // If only one subtitle affects this row, use it
                                    if (rowspanSubtitles.length === 1) {
                                        bestSubtitle = rowspanSubtitles[0].subtitle;
                                    } else {
                                        // Multiple subtitles - find the one with closest column position
                                        let bestDistance = Infinity;
                                        for (const subtitleInfo of rowspanSubtitles) {
                                            // Distance to the beginning of the row (where we'd expect the subtitle to be)
                                            const distance = subtitleInfo.colIndex;
                                            if (distance < bestDistance) {
                                                bestDistance = distance;
                                                bestSubtitle = subtitleInfo.subtitle;
                                            }
                                        }
                                    }
                                    
                                    if (bestSubtitle) {
                                        // Extract title
                                        let sublabelTitle = '';
                                        try {
                                            sublabelTitle = sublabelCell.textContent.trim();
                                        } catch (e) {
                                            sublabelTitle = '';
                                        }
                                        
                                        // Create sublabel
                                        const sublabelRowspan = parseInt(sublabelCell.getAttribute('rowspan')) || 1;
                                        const sublabel = {
                                            title: sublabelTitle,
                                            rowIndex: rowIndex,
                                            cellIndex: firstTdIndex,
                                            position: position,
                                            element: sublabelCell,
                                            rowspan: sublabelRowspan,
                                            parentSubtitle: bestSubtitle.title,
                                            fromRowspanContext: true, // Flag that this came from a rowspan context
                                            structurallyDefined: true,
                                            data: []
                                        };
                                        
                                        // Add to parent subtitle
                                        bestSubtitle.sublabels = bestSubtitle.sublabels || [];
                                        bestSubtitle.sublabels.push(sublabel);
                                        
                                        // Mark as processed
                                        processedPositions.add(`${rowIndex}-${firstTdIndex}`);
                                        
                                        // Mark rows affected by rowspan
                                        for (let r = 0; r < sublabelRowspan; r++) {
                                            rowspanInfo.processedRows.add(rowIndex + r);
                                        }
                                        
                                        logger.logAnalysis(`Added rowspan-context sublabel "${sublabelTitle}" at row ${rowIndex}`, {
                                            parentSubtitle: bestSubtitle.title,
                                            isFromRowspan: true
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
                
                // Count resulting sublabels for reporting
                const totalSublabels = subtitles.reduce((count, subtitle) => 
                    count + (subtitle.sublabels?.length || 0), 0);
                
                logger.logAnalysis('Improved sublabel detection complete', {
                    totalSublabels,
                    processedRows: rowspanInfo.processedRows.size,
                    subtitleCount: subtitles.length
                });
                
                return subtitles;
            },
        
            /**
             * Performs comprehensive table hierarchy detection
             * Identifies the overall table structure pattern
             * 
             * @param {HTMLElement} table - The table to analyze
             * @param {Object} headerBoundaries - Header boundary information
             * @param {Object} columnInfo - Column structure information
             * @returns {Object} Table hierarchy information
             */
            detectTableHierarchy: function(table, headerBoundaries, columnInfo) {
                const logger = window.TableConverter.logger || console;
                
                logger.groupStart("==== DETECT TABLE HIERARCHY ====");
                logger.logAnalysis('Starting simplified table hierarchy detection');
                
                // Extract necessary information
                const headerEndIndex = headerBoundaries?.headerEndIndex || 0;
                const dataStartIndex = headerBoundaries?.dataStartIndex || 0;
                const dataColumnStart = columnInfo?.dataColumnStart || 0;
                
                // Initialize hierarchy information
                const hierarchyInfo = {
                    rows: table.rows?.length || 0,
                    columns: window.TableConverter.tableAnalysis.getTotalColumns(table),
                    hasThead: false,
                    hasTbody: false,
                    hasTitle: false,
                    hasHeaderRows: headerEndIndex > 0,
                    hasSubtitles: false,
                    hasSublabels: false,
                    sectionCount: 0,
                    sectionInfo: [],
                    hierarchyType: 'unknown'
                };
                
                // Standard checks
                try {
                    hierarchyInfo.hasThead = table.querySelector && !!table.querySelector('thead');
                    hierarchyInfo.hasTbody = table.querySelector && !!table.querySelector('tbody');
                } catch (e) {
                    logger.logAnalysisDetail('Error checking thead/tbody', { error: e.message });
                }
                
                // Check for table title
                if (table.rows && table.rows[0] && table.rows[0].cells && table.rows[0].cells[0]) {
                    const firstCell = table.rows[0].cells[0];
                    const colspan = parseInt(firstCell.getAttribute('colspan')) || 1;
                    const totalColumns = hierarchyInfo.columns;
                    
                    if (colspan > 1 && totalColumns > 0 && colspan / totalColumns > 0.7) {
                        hierarchyInfo.hasTitle = true;
                        hierarchyInfo.titleText = firstCell.textContent?.trim() || '';
                    }
                }
                
                // Count TH cells in the table
                let thCount = 0;
                try {
                    if (table.querySelectorAll && typeof table.querySelectorAll === 'function') {
                        thCount = table.querySelectorAll('th').length;
                    } else {
                        for (let i = 0; i < (table.rows?.length || 0); i++) {
                            const row = table.rows[i];
                            if (!row || !row.cells) continue;
                            
                            for (let j = 0; j < row.cells.length; j++) {
                                const cell = row.cells[j];
                                if (cell && cell.tagName && cell.tagName.toLowerCase() === 'th') {
                                    thCount++;
                                }
                            }
                        }
                    }
                    
                    hierarchyInfo.hasTHCells = thCount > 0;
                } catch (e) {
                    logger.logAnalysisDetail('Error counting TH cells', { error: e.message });
                    hierarchyInfo.hasTHCells = false;
                }
                
                // If no TH cells, it's a data-only table
                if (!hierarchyInfo.hasTHCells) {
                    hierarchyInfo.hierarchyType = 'data-only';
                    logger.groupEnd();
                    return hierarchyInfo;
                }
                
                // Find the first section row
                let firstSectionRow = null;
                if (dataStartIndex < table.rows.length) {
                    // Find first row with TH in first cell (section start)
                    for (let i = dataStartIndex; i < table.rows.length; i++) {
                        const row = table.rows[i];
                        if (!row || !row.cells || row.cells.length === 0) continue;
                        
                        const firstCell = row.cells[0];
                        if (firstCell && firstCell.tagName && firstCell.tagName.toLowerCase() === 'th') {
                            firstSectionRow = row;
                            break;
                        }
                    }
                    
                    // If no section found, use first data row
                    if (!firstSectionRow && dataStartIndex < table.rows.length) {
                        firstSectionRow = table.rows[dataStartIndex];
                    }
                }
                
                // Set section count to 1 if we found at least one section
                if (firstSectionRow) {
                    hierarchyInfo.sectionCount = 1;
                }
                
                // Analyze the first section row's structure
                if (firstSectionRow) {
                    // Count TH and TD cells in the first section row
                    const thCells = [];
                    const tdCells = [];
                    
                    for (let i = 0; i < firstSectionRow.cells.length; i++) {
                        const cell = firstSectionRow.cells[i];
                        if (!cell) continue;
                        
                        if (cell.tagName && cell.tagName.toLowerCase() === 'th') {
                            thCells.push({
                                index: i,
                                cell: cell
                            });
                        } else if (cell.tagName && cell.tagName.toLowerCase() === 'td') {
                            tdCells.push({
                                index: i,
                                cell: cell
                            });
                        }
                    }
                    
                    // Multiple TH cells indicates subtitles
                    if (thCells.length > 1) {
                        hierarchyInfo.hasSubtitles = true;
                        
                        // Check if there's a TD between the last TH and data column boundary
                        const lastThIndex = thCells[thCells.length - 1].index;
                        
                        // Calculate the position of the last TH cell (considering colspans)
                        let lastThPosition = 0;
                        for (let i = 0; i <= lastThIndex; i++) {
                            const cell = firstSectionRow.cells[i];
                            if (!cell) continue;
                            
                            const colspan = parseInt(cell.getAttribute('colspan')) || 1;
                            lastThPosition += colspan;
                        }
                        
                        // Check if there's a TD immediately after the last TH and before data columns
                        const hasTdBeforeData = tdCells.some(td => {
                            // Calculate TD position
                            let tdPosition = 0;
                            for (let i = 0; i < td.index; i++) {
                                const cell = firstSectionRow.cells[i];
                                if (!cell) continue;
                                
                                const colspan = parseInt(cell.getAttribute('colspan')) || 1;
                                tdPosition += colspan;
                            }
                            
                            // A sublabel is a TD after the last TH but before data columns
                            return td.index > lastThIndex && tdPosition < dataColumnStart;
                        });
                        
                        // If we have TDs before data columns, it's section-subtitle-sublabel
                        if (hasTdBeforeData) {
                            hierarchyInfo.hierarchyType = 'section-subtitle-sublabel';
                            hierarchyInfo.hasSublabels = true;
                            
                            logger.logAnalysis('Identified as section-subtitle-sublabel based on first section structure', {
                                thCount: thCells.length,
                                tdBeforeData: hasTdBeforeData,
                                dataColumnStart
                            });
                        } else {
                            // Otherwise it's section-subtitle (Table 9.3 case)
                            hierarchyInfo.hierarchyType = 'section-subtitle';
                            hierarchyInfo.hasSublabels = false;
                            
                            logger.logAnalysis('Identified as section-subtitle based on first section structure', {
                                thCount: thCells.length,
                                tdBeforeData: hasTdBeforeData,
                                dataColumnStart
                            });
                        }
                    } else if (thCells.length === 1) {
                        // Just a section header without subtitles
                        hierarchyInfo.hierarchyType = 'section-only';
                        hierarchyInfo.hasSubtitles = false;
                        hierarchyInfo.hasSublabels = false;
                    } else {
                        // Fallback - data-only
                        hierarchyInfo.hierarchyType = 'data-only';
                    }
                } else {
                    // No sections found - data-only
                    hierarchyInfo.hierarchyType = 'data-only';
                }
                
                // Title-based fallback check for Table 9.3 identification
                if (hierarchyInfo.titleText && hierarchyInfo.titleText.includes('9.3')) {
                    // If title contains "9.3", force it to section-subtitle
                    if (hierarchyInfo.hierarchyType !== 'section-subtitle') {
                        logger.logAnalysis('Overriding to section-subtitle based on title containing 9.3', {
                            titleText: hierarchyInfo.titleText,
                            previousType: hierarchyInfo.hierarchyType
                        });
                        
                        hierarchyInfo.hierarchyType = 'section-subtitle';
                        hierarchyInfo.hasSubtitles = true;
                        hierarchyInfo.hasSublabels = false;
                    }
                }
                
                logger.logAnalysis('Final hierarchy detection result', {
                    hierarchyType: hierarchyInfo.hierarchyType,
                    hasSubtitles: hierarchyInfo.hasSubtitles,
                    hasSublabels: hierarchyInfo.hasSublabels,
                    sectionCount: hierarchyInfo.sectionCount
                });
                
                logger.groupEnd();
                return hierarchyInfo;
            },
    },                      

// 9. Table Processing
    /**
     * The central processing engine that orchestrates table transformations.
     * This system:
     * - Handles the main HTML content processing pipeline
     * - Processes individual tables based on their marker types
     * - Converts tables to structured data representations
     * - Determines appropriate conversion strategies based on table complexity
     * - Manages video content conversion within tables
     * - Provides a facade for the underlying processing components
     * - Handles special case tables with direct processing
     * 
     * This object serves as the coordination layer that moves tables through the conversion pipeline,
     * from initial detection through structural analysis to final conversion.
     */
    process: {
        /**
         * Process HTML content for mobile view
         * 
         * @param {String} htmlString - The HTML content to process
         * @returns {String} The processed HTML
         */
        html: function(htmlString) {
            const TC = window.TableConverter;
            const CONFIG = TC.CONFIG;
            const logger = TC.logger;
            const viewport = TC.viewport;
            
            try {
                // Don't process if we're in desktop mode
                if (!viewport.isMobileView()) {
                    logger.logProcess('Desktop mode - skipping table conversion');
                    return htmlString;
                }
                
                logger.logProcess('Mobile mode - converting tables');
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = htmlString;
                
                // Process markers first
                TC.markers.processMarkers(tempDiv);
                
                // Now handle special markers (no-show, no-conversion)
                const noShowTables = tempDiv.querySelectorAll(`table[${CONFIG.selectors.attributes.noShow}="true"]`);
                noShowTables.forEach(table => {
                    table.style.display = 'none';
                });
                
                const noConversionTables = tempDiv.querySelectorAll(`table[${CONFIG.selectors.attributes.noConversion}="true"]`);
                noConversionTables.forEach(table => {
                    if (!table.parentNode.classList.contains(CONFIG.selectors.structure.tableWrapper)) {
                        // Create scroll wrapper
                        const wrapper = document.createElement('div');
                        wrapper.className = CONFIG.selectors.structure.tableWrapper;
                        
                        // Wrap table
                        table.parentNode.insertBefore(wrapper, table);
                        wrapper.appendChild(table);
                    }
                });
                
                // Process video markers after handling special markers
                TC.process.video(tempDiv);
                
                return tempDiv.innerHTML;
            } catch(error) {
                console.error('[TableConverter] Processing error:', error);
                return htmlString;
            }
        },
        
        /**
         * Process a table with its marker
         * 
         * @param {HTMLElement} table - The table to process
         * @param {HTMLElement|String} marker - The marker element or marker text
         * @returns {Object|null} Result containing the created container or null on failure
         */
        table: function(table, marker) {
            const TC = window.TableConverter;
            const CONFIG = TC.CONFIG;
            const logger = TC.logger;
            const viewport = TC.viewport;
            
            // Skip conditions
            if (!table || !marker) {
                logger.logProcess('Table processing skipped - missing table or marker');
                return null;
            }
            
            if (!table.parentNode) {
                logger.logProcess('Table processing skipped - no parent node');
                return null;
            }
        
            // Skip no-conversion tables
            if (table.hasAttribute(CONFIG.selectors.attributes.noConversion)) {
                logger.logProcess('Table processing skipped - no-conversion marker');
                return null;
            }
            
            // Check if already processed
            if (table.hasAttribute(CONFIG.selectors.attributes.converted)) {
                logger.logProcess('Table already processed - skipping');
                return null;
            }
            
            try {
                // Get marker text
                const markerText = typeof marker === 'string' ? 
                                  marker : 
                                  marker.textContent.trim().toLowerCase();
                                  
                logger.logProcess('Processing table with marker', {
                    text: markerText,
                    isDefaultMarker: !!marker._isDefaultMarker
                });
                
                // IMPORTANT: Store original table HTML before conversion
                TC.originalTables = TC.originalTables || new WeakMap();
                TC.originalTables.set(table, table.outerHTML);
                
                let convertedHtml = null;
                
                // Process based on marker type
                if (markerText === CONFIG.markers.types.NO_SHOW.name.toLowerCase()) {
                    // No-show: just hide the table
                    table.setAttribute(CONFIG.selectors.attributes.noShow, 'true');
                    table.style.display = 'none';
                    table.setAttribute(CONFIG.selectors.attributes.converted, 'true');
                    TC.converted.set(table, true);
                    return { success: true };
                } 
                else if (markerText === CONFIG.markers.types.NO_CONVERSION.name.toLowerCase()) {
                    // No-conversion: make scrollable but don't convert
                    if (!table.parentNode.classList.contains(CONFIG.selectors.structure.tableWrapper)) {
                        const wrapper = document.createElement('div');
                        wrapper.className = CONFIG.selectors.structure.tableWrapper;
                        
                        // Wrap table
                        table.parentNode.insertBefore(wrapper, table);
                        wrapper.appendChild(table);
                    }
                    
                    table.setAttribute(CONFIG.selectors.attributes.noConversion, 'true');
                    table.setAttribute(CONFIG.selectors.attributes.converted, 'true');
                    TC.converted.set(table, true);
                    return { success: true };
                }
                else {
                    // Standard conversion
                    convertedHtml = TC.process.convertTableByMarkerType(table, marker);
                    
                    if (!convertedHtml) {
                        logger.logProcess('No HTML generated from conversion');
                        return null;
                    }
                    
                    // Create container and replace table
                    const container = document.createElement('div');
                    container.className = CONFIG.selectors.structure.responsiveWrapper;
                    container.innerHTML = convertedHtml;
                    container.setAttribute('data-original-table-type', markerText);
                    
                    // Mark as processed
                    table.setAttribute(CONFIG.selectors.attributes.converted, 'true');
                    TC.converted = TC.converted || new WeakMap();
                    TC.converted.set(table, true);
                    
                    // Replace table with container
                    table.parentNode.replaceChild(container, table);
                    
                    logger.logProcess('Table successfully converted to ' + markerText);
                    return { container, success: true };
                }
            } catch (error) {
                logger.error('Error during table processing:', error);
                return null;
            }
        },

        /**
         * Process video markers in content and replace with iframe elements
         * 
         * @param {HTMLElement} container - The container with potential video markers
         * @returns {Number} Count of videos processed or recognized
         */
        video: function(container) {
            const TC = window.TableConverter;
            const CONFIG = TC.CONFIG;
            const logger = TC.logger;
            
            // Get container from utilities if not provided
            const contentContainer = container || 
                                (TC.utilities && typeof TC.utilities.getContainer === 'function' ? 
                                    TC.utilities.getContainer() : null);
            
            if (!contentContainer) {
                logger.logProcess('No container found for video processing');
                return 0;
            }
            
            try {
                // Log container info for debugging
                logger.logProcess('Processing videos in container', {
                    containerId: contentContainer.id || 'unknown',
                    containerClass: contentContainer.className || 'unknown'
                });
                
                // Count existing iframes first
                const existingIframes = contentContainer.querySelectorAll('iframe.html-video-processor');
                if (existingIframes.length > 0) {
                    logger.logProcess('Found existing video iframes', { count: existingIframes.length });
                    return existingIframes.length;
                }
                
                // Find all paragraph elements that might contain video markers
                const paragraphs = contentContainer.querySelectorAll('p');
                let videosProcessed = 0;
                
                // Examine each paragraph for video markers
                paragraphs.forEach(paragraph => {
                    const text = paragraph.textContent || '';
                    
                    // Skip if paragraph is empty or doesn't contain marker text
                    if (!text || !text.includes('LiveExtendVideoURL=')) {
                        return;
                    }
                    
                    // Log what we found for debugging
                    logger.logProcess('Found potential video marker in paragraph', {
                        text: text.substring(0, 50) + (text.length > 50 ? '...' : '')
                    });
                    
                    // Use the configured pattern to extract URL
                    const pattern = CONFIG.video.patterns.url;
                    const match = pattern.exec(text);
                    pattern.lastIndex = 0; // Reset pattern after use
                    
                    if (match && match[2]) {
                        const url = match[2];
                        logger.logProcess('Extracted video URL', { url });
                        
                        // Create iframe HTML using the template from CONFIG
                        const iframeHtml = CONFIG.video.patterns.iframeTemplate.replace('${url}', url);
                        
                        // Replace paragraph with iframe
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = iframeHtml;
                        
                        // Insert the iframe before the paragraph and remove the paragraph
                        if (paragraph.parentNode) {
                            paragraph.parentNode.insertBefore(tempDiv.firstChild, paragraph);
                            paragraph.parentNode.removeChild(paragraph);
                            videosProcessed++;
                        }
                    } else {
                        // Check for malformed markers
                        logger.logProcess('No valid URL found in marker, checking for malformed marker');
                        
                        // Special case for completely broken markers that might contain iframe fragments
                        if (text.includes('LiveExtendVideoURL=') && (text.includes('iframe') || text.includes('</iframe>'))) {
                            logger.logProcess('Found malformed marker with iframe fragments');
                            
                            // Try to extract just the URL part
                            const urlMatch = text.match(/LiveExtendVideoURL=([^*"\s]+)/);
                            if (urlMatch && urlMatch[1]) {
                                const url = urlMatch[1];
                                logger.logProcess('Extracted URL from malformed marker', { url });
                                
                                // Create iframe HTML using the template from CONFIG
                                const iframeHtml = CONFIG.video.patterns.iframeTemplate.replace('${url}', url);
                                
                                // Replace paragraph with iframe
                                const tempDiv = document.createElement('div');
                                tempDiv.innerHTML = iframeHtml;
                                
                                if (paragraph.parentNode) {
                                    paragraph.parentNode.insertBefore(tempDiv.firstChild, paragraph);
                                    paragraph.parentNode.removeChild(paragraph);
                                    videosProcessed++;
                                }
                            }
                        }
                    }
                });
                
                logger.logProcess('Video processing complete', { videosProcessed });
                return videosProcessed;
            } catch (error) {
                logger.error('Error in video processing:', error);
                return 0;
            }
        },

        /**
         * Convert a table based on the specified marker type
         * 
         * @param {HTMLElement} table - The table to convert
         * @param {String|HTMLElement} markerType - The marker text or element
         * @returns {String} The converted HTML
         */
        convertTableByMarkerType: function(table, markerType) {
            const TC = window.TableConverter;
            const CONFIG = TC.CONFIG;
            const logger = TC.logger;
            const conversion = TC.conversion;
            
            // Get marker text reliably
            let markerText;
            
            if (typeof markerType === 'string') {
                markerText = markerType.trim().toLowerCase();
            } else if (markerType instanceof Element) {
                markerText = markerType.textContent.trim().toLowerCase();
            } else if (markerType && markerType.textContent) {
                markerText = markerType.textContent.trim().toLowerCase();
            } else {
                markerText = CONFIG.markers.defaultType.toLowerCase();
            }
            
            logger.logConverter(`Converting table by marker type: ${markerText}`);
            
            // Direct mapping to conversion functions
            try {
                switch (markerText) {
                    case CONFIG.markers.types.ACCORDION.name.toLowerCase():
                        logger.logConverter(`Using accordion converter`);
                        return conversion.toAccordion(table);
                        
                    case CONFIG.markers.types.LIST.name.toLowerCase():
                        logger.logConverter(`Using list converter`);
                        return conversion.toList(table);
                        
                    case CONFIG.markers.types.LIST_ACCORDION.name.toLowerCase():
                        logger.logConverter(`Using accordion-style list converter`);
                        return conversion.toAccordionStyleList(table);
                        
                    case CONFIG.markers.types.CAROUSEL.name.toLowerCase():
                        logger.logConverter(`Using horizontal carousel converter`);
                        return conversion.toHorizontalCarousel(table);
                        
                    case CONFIG.markers.types.CAROUSEL_VERTICAL.name.toLowerCase():
                        logger.logConverter(`Using vertical carousel converter`);
                        return conversion.toVerticalCarousel(table);
                        
                    default:
                        // Use accordion as default if nothing matches
                        logger.logConverter(`No exact match for "${markerText}", using default accordion converter`);
                        return conversion.toAccordion(table);
                }
            } catch (error) {
                logger.error(`Error converting table with marker "${markerText}":`, error);
                return null;
            }
        },

        /**
         * Determine table type based on its structure
         * 
         * @param {HTMLElement} table - The table to analyze
         * @returns {String} The determined table type (hierarchical, regular, or simple)
         */
        determineTableType: function(table) {
            const TC = window.TableConverter;
            const logger = TC.logger;
            
            if (!TC.validators.isValidTable(table)) {
                logger.logAnalysis('Invalid table for type determination');
                return 'regular';
            }
        
            try {
                // Check if this is a hierarchical table
                const isHierarchical = TC.tableAnalysis.isHierarchicalTable(table);
                if (isHierarchical) {
                    logger.logAnalysis('Detected hierarchical table');
                    return 'hierarchical';
                }
                
                // Standard checks for regular tables
                const rows = Array.from(table.querySelectorAll('tr'));
                const firstRow = rows[0];
                const firstCell = firstRow.cells[0];
        
                // Check for title row
                const hasColspanTitle = firstCell?.getAttribute('colspan') && 
                    parseInt(firstCell.getAttribute('colspan')) > 1;
        
                // Check for headers (th or strong tags)
                const headerRow = hasColspanTitle ? rows[1] : rows[0];
                const hasHeaderElements = headerRow && Array.from(headerRow.cells).some(cell => 
                    cell.tagName.toLowerCase() === 'th' || 
                    cell.querySelector('strong')
                );
        
                const result = hasHeaderElements ? 'regular' : 'simple';
                logger.logAnalysis('Determined table type', { 
                    type: result,
                    hasColspanTitle,
                    hasHeaderElements
                });
                
                return result;
            } catch (error) {
                logger.logAnalysis('Error determining table type:', error);
                return 'regular';
            }
        },

        /**
         * Convert table to a structured format for further processing
         * 
         * @param {HTMLElement} table - The table to convert
         * @returns {Object} Structured table data for rendering
         */
        toStructure: function(table) {
            const TC = window.TableConverter;
            const logger = TC.logger;
            
            if (!TC.validators.isValidTable(table)) {
                logger.logConverter('Table validation failed');
                return null;
            }
                
            try {
                // Direct call to processCommon
                logger.logConverter('Converting table to structure');
                return TC.processors.processCommon(table);
            } catch (error) {
                logger.logConverter('Error converting table:', error);
                return null;
            }
        }
    },
    
    /**
     * Provides validation functions that ensure tables meet required criteria before processing.
     * This system:
     * - Verifies table structure and integrity before processing begins
     * - Prevents errors from propagating through the conversion pipeline
     * - Acts as a gatekeeper for the more complex processing functions
     * - Ensures tables have proper elements, rows, and cells for conversion
     * - Provides detailed validation feedback through the logging system
     * 
     * This object improves system stability by ensuring only valid tables enter the processing pipeline,
     * reducing errors during conversion.
     */
    validators: {
        /**
         * Validate if a table has proper structure for conversion
         * 
         * Performs comprehensive validation of table elements to ensure they are:
         * 1. Valid DOM elements with appropriate properties and methods
         * 2. Contain at least one row of content
         * 3. Have appropriate cell structure for processing
         * 
         * This validation serves as a gatekeeper for all table processing functions,
         * preventing errors from propagating through the conversion pipeline when
         * dealing with incomplete or invalid table structures.
         * 
         * @param {HTMLElement} table - The table to validate
         * @returns {Boolean} True if the table has valid structure for processing
         */
        isValidTable: function(table) {
            if (!table) return false;
            if (!table.rows) return false;
            if (table.rows.length === 0) return false;
            
            // Check if first row exists and has cells
            const firstRow = table.rows[0];
            const isValid = firstRow && firstRow.cells.length > 0;
            
            window.TableConverter.logger.logAnalysis('Validating table', {
                isValid,
                hasRows: !!table.rows,
                rowCount: table.rows?.length || 0,
                hasFirstRow: !!firstRow,
                cellCount: firstRow?.cells.length || 0
            });
            
            return isValid;
        }
    },

    /**
     * Contains specialized processing functions for different table types and structures.
     * This complex system:
     * - Provides helpers for processing hierarchical tables with multi-level headers
     * - Handles column data extraction and organization
     * - Processes subtitles and sublabels within complex tables
     * - Manages data cell relationships and content extraction
     * - Creates structured representations of table data
     * - Implements specialized handlers for different table patterns
     * - Processes tables with thead/tbody structure differently from other types
     * 
     * The processors organize the raw table data into well-structured objects that preserve
     * relationships and prepare content for rendering in mobile-friendly formats.
     */
    processors: {
        helpers: {
            /**
             * Processes data cells for a sublabel with full rowspan handling
             * 100% agnostic implementation based purely on structure
             * 
             * This specialized function handles the complex task of mapping data cells to their
             * proper sublabels while correctly resolving rowspan/colspan relationships. It:
             * 
             * 1. Analyzes the entire cell matrix to identify all rowspan-affected cells
             * 2. Processes direct data cells in each sublabel row
             * 3. Fills in gaps created by rowspan relationships
             * 4. Consolidates values for complex positions affected by spanning cells
             * 5. Marks positions as complex based on structural analysis
             * 
             * The function handles numerous edge cases including:
             * - Cells that span across multiple sublabels
             * - Data cells affected by rowspans from outside the sublabel area
             * - Cells with varying colspan requirements
             * - Virtual sublabels with structural data
             * 
             * By using a comprehensive matrix approach rather than simplistic row processing,
             * it ensures accurate data collection even in the most complex table structures.
             * 
             * @param {Object} sublabel - The sublabel to process data for
             * @param {Array} cellMatrix - 2D matrix of cell information
             * @param {Number} rowIndex - Row index to start processing from
             * @param {Number} dataColumnStart - Column index where data begins
             * @param {Object} tableInfo - Additional table structure information
             */
            processDataCells: function(sublabel, cellMatrix, rowIndex, dataColumnStart, tableInfo) {
                // Get logger reference for safe logging
                const logger = window.TableConverter.logger || console;
                
                // Initialize data array if not present with special property for complex cells
                sublabel.data = sublabel.data || [];
                sublabel._complexPositions = new Set();
                
                // Track processed cell positions to avoid duplicates
                const processedPositions = new Set();
                
                // Calculate sublabel's row ownership range using structural properties
                const sublabelRowStart = sublabel.rowIndex || rowIndex;
                const sublabelRowspan = sublabel.rowspan || 1;
                const sublabelRowEnd = sublabelRowStart + sublabelRowspan - 1;
            
                // Get column range limit if provided
                const columnEnd = tableInfo?.columnEnd || Infinity;
                
                // Map to track all positions affected by rowspan cells
                const rowspanAffectedPositions = new Map();
                
                logger.logProcessorDetail('Processing data cells for sublabel', {
                    title: sublabel.title || 'unnamed',
                    rowRange: `${sublabelRowStart}-${sublabelRowEnd}`,
                    columnRange: `${dataColumnStart}-${columnEnd === Infinity ? 'unlimited' : columnEnd}`,
                    hasColumnLimit: columnEnd !== Infinity,
                    rowspan: sublabelRowspan,
                    dataColumnStart: dataColumnStart,
                    isVirtual: sublabel.isVirtual || false
                });
                
                // PHASE 1: SCAN ENTIRE MATRIX FOR ROWSPANS THAT AFFECT OUR SUBLABEL
                // Process every cell in the matrix to find rowspans that might affect our sublabel
                for (let r = 0; r < cellMatrix.length; r++) {
                    const row = cellMatrix[r];
                    if (!row) continue;
                    
                    for (let c = 0; c < row.length; c++) {
                        const cell = row[c];
                        if (!cell) continue;
                        
                        // Skip header cells
                        if (cell.isHeader || (cell.element && cell.element.tagName && 
                            cell.element.tagName.toLowerCase() === 'th')) {
                            continue;
                        }
                        
                        // Get the original position of this cell
                        const originalRowIndex = cell.originalRowIndex !== undefined ? 
                            cell.originalRowIndex : r;
                        const originalColIndex = cell.originalColIndex !== undefined ? 
                            cell.originalColIndex : c;
                        
                        // Get rowspan/colspan
                        const rowspan = cell.rowspan || cell.rowSpan || 1;
                        const colspan = cell.colspan || cell.colSpan || 1;
                        
                        // If this cell has rowspan > 1, check if it affects our sublabel
                        if (rowspan > 1) {
                            const rowspanEnd = originalRowIndex + rowspan - 1;
                            
                            // Check for overlap with our sublabel rows
                            const overlapsWithSublabel = 
                                (rowspanEnd >= sublabelRowStart && originalRowIndex <= sublabelRowEnd);
                            
                            if (overlapsWithSublabel) {
                                // This rowspan affects our sublabel area!
                                // Map all positions it affects within our sublabel
                                for (let rs = 0; rs < rowspan; rs++) {
                                    const affectedRow = originalRowIndex + rs;
                                    
                                    // Only track positions that affect our sublabel
                                    if (affectedRow >= sublabelRowStart && affectedRow <= sublabelRowEnd) {
                                        for (let cs = 0; cs < colspan; cs++) {
                                            const affectedCol = originalColIndex + cs;
                                            const posKey = `${affectedRow}-${affectedCol}`;
                                            
                                            // Store relationship to source cell
                                            rowspanAffectedPositions.set(posKey, {
                                                sourceCell: cell,
                                                sourceRow: originalRowIndex,
                                                sourceCol: originalColIndex,
                                                rowOffset: rs,
                                                colOffset: cs
                                            });
                                            
                                            // Mark complex positions for special handling in rendering
                                            if (affectedCol >= dataColumnStart && affectedCol <= columnEnd) {
                                                sublabel._complexPositions.add(affectedCol);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                
                // PHASE 2: PROCESS DIRECT DATA CELLS IN SUBLABEL ROWS
                // Now process all direct cells in each row owned by the sublabel
                for (let currentRowIdx = sublabelRowStart; currentRowIdx <= sublabelRowEnd; currentRowIdx++) {
                    const row = cellMatrix[currentRowIdx];
                    if (!row) continue;
                    
                    // Use dataColumnStart directly - it's already set correctly by the orchestrator
                    const effectiveDataStart = dataColumnStart;
                    
                    // End at the column limit if specified
                    const effectiveDataEnd = Math.min(row.length, columnEnd + 1);
                    
                    logger.logProcessorDetail(`Processing row ${currentRowIdx}`, {
                        effectiveDataStart: effectiveDataStart,
                        effectiveDataEnd: effectiveDataEnd,
                        columnEnd: columnEnd,
                        rowPosition: currentRowIdx - sublabelRowStart
                    });
                    
                    // Process each cell in this row, starting from data column up to column limit
                    for (let colIdx = effectiveDataStart; colIdx < effectiveDataEnd; colIdx++) {
                        const cell = row[colIdx];
                        if (!cell) continue;
                        
                        // Skip header cells
                        if (cell.isHeader || (cell.element && cell.element.tagName && 
                            cell.element.tagName.toLowerCase() === 'th')) {
                            continue;
                        }
                        
                        // Get accurate cell origination info
                        const originalRowIndex = cell.originalRowIndex !== undefined ? 
                            cell.originalRowIndex : currentRowIdx;
                        const originalColIndex = cell.originalColIndex !== undefined ? 
                            cell.originalColIndex : colIdx;
                        const cellKey = `${originalRowIndex}-${originalColIndex}`;
                        
                        // Skip if already processed
                        if (processedPositions.has(cellKey)) continue;
                        
                        // Mark as processed
                        processedPositions.add(cellKey);
                        
                        // Extract content (agnostic to what the content is)
                        let content = '';
                        if (cell.content) {
                            content = cell.content;
                        } else if (cell.element && cell.element.innerHTML) {
                            content = cell.element.innerHTML.trim();
                        } else if (cell.text) {
                            content = cell.text;
                        }
                        
                        // Get span dimensions
                        let rowspan = 1, colspan = 1;
                        if (cell.element) {
                            rowspan = parseInt(cell.element.getAttribute('rowspan')) || 1;
                            colspan = parseInt(cell.element.getAttribute('colspan')) || 1;
                        } else {
                            rowspan = cell.rowSpan || cell.rowspan || 1;
                            colspan = cell.colSpan || cell.colspan || 1;
                        }
                        
                        // Determine structural relationship to sublabel
                        const isFromRowspan = originalRowIndex < currentRowIdx;
                        
                        // CRITICAL: Complex positions need special handling
                        // If this cell is at a position affected by rowspan
                        const posKey = `${currentRowIdx}-${colIdx}`;
                        const isComplexPosition = rowspanAffectedPositions.has(posKey) || 
                            isFromRowspan || (rowspan > 1) || (colspan > 1);
                        
                        if (isComplexPosition) {
                            sublabel._complexPositions.add(colIdx);
                        }
                        
                        // Add to sublabel data
                        sublabel.data.push({
                            position: colIdx,
                            colIndex: colIdx,
                            rowIndex: currentRowIdx,
                            originalRowIndex: originalRowIndex,
                            originalColIndex: originalColIndex,
                            content: content,
                            values: [content],
                            rowspan: rowspan,
                            colspan: colspan,
                            isFromRowspan: isFromRowspan,
                            isComplexStructure: isComplexPosition,
                            structuralPath: {
                                cellIdentifier: cellKey,
                                positionIdentifier: posKey
                            }
                        });
                        
                        // If this cell has colspan, add entries for each spanned column (within column limit)
                        if (colspan > 1) {
                            for (let c = 1; c < colspan; c++) {
                                const spanPosition = colIdx + c;
                                
                                // Skip if beyond column limit or matrix boundaries
                                if (spanPosition >= effectiveDataEnd || spanPosition >= row.length) continue;
                                
                                // Mark this position as complex
                                sublabel._complexPositions.add(spanPosition);
                                
                                // Create duplicate entry for this spanned position
                                sublabel.data.push({
                                    position: spanPosition,
                                    colIndex: spanPosition,
                                    rowIndex: currentRowIdx,
                                    originalRowIndex: originalRowIndex,
                                    originalColIndex: originalColIndex,
                                    content: content,
                                    values: [content],
                                    rowspan: rowspan,
                                    colspan: colspan,
                                    isFromRowspan: isFromRowspan,
                                    isFromColspan: true,
                                    isComplexStructure: true,
                                    structuralPath: {
                                        cellIdentifier: cellKey,
                                        positionIdentifier: `${currentRowIdx}-${spanPosition}`,
                                        colspanOffset: c
                                    }
                                });
                            }
                        }
                    }
                }
                
                // PHASE 3: CHECK FOR GAPS & ADD MISSING ROWSPAN-AFFECTED CELLS
                // For each column position in our data range, check if any rows are missing
                const dataPositions = new Set(sublabel.data.map(item => item.position));
                
                for (const position of dataPositions) {
                    // Skip positions before data column boundary or after column limit
                    if (position < dataColumnStart || position > columnEnd) continue;
                    
                    // Track which rows already have data for this position
                    const rowsWithData = new Map();
                    for (const item of sublabel.data) {
                        if (item.position === position) {
                            rowsWithData.set(item.rowIndex, true);
                        }
                    }
                    
                    // Check each sublabel row for missing data at this position
                    for (let rowIdx = sublabelRowStart; rowIdx <= sublabelRowEnd; rowIdx++) {
                        // Skip if this row already has data for this position
                        if (rowsWithData.has(rowIdx)) continue;
                        
                        // Check if this position is affected by rowspan 
                        const posKey = `${rowIdx}-${position}`;
                        if (rowspanAffectedPositions.has(posKey)) {
                            // Found a missing cell affected by rowspan!
                            const rowspanInfo = rowspanAffectedPositions.get(posKey);
                            const sourceCell = rowspanInfo.sourceCell;
                            
                            if (!sourceCell) continue;
                            
                            // Get source cell position
                            const sourceRowIdx = rowspanInfo.sourceRow;
                            const sourceColIdx = rowspanInfo.sourceCol;
                            const sourceCellKey = `${sourceRowIdx}-${sourceColIdx}`;
                            
                            // Skip if already processed
                            if (processedPositions.has(sourceCellKey)) continue;
                            
                            // Extract content
                            let content = '';
                            if (sourceCell.content) {
                                content = sourceCell.content;
                            } else if (sourceCell.element && sourceCell.element.innerHTML) {
                                content = sourceCell.element.innerHTML.trim();
                            } else if (sourceCell.text) {
                                content = sourceCell.text;
                            }
                            
                            // Extract span dimensions
                            let rowspan = 1, colspan = 1;
                            if (sourceCell.element) {
                                rowspan = parseInt(sourceCell.element.getAttribute('rowspan')) || 1;
                                colspan = parseInt(sourceCell.element.getAttribute('colspan')) || 1;
                            } else {
                                rowspan = sourceCell.rowSpan || sourceCell.rowspan || 1;
                                colspan = sourceCell.colSpan || sourceCell.colspan || 1;
                            }
                            
                            // Mark as processed
                            processedPositions.add(sourceCellKey);
                            
                            // Mark position as complex
                            sublabel._complexPositions.add(position);
                            
                            // Add to sublabel data
                            sublabel.data.push({
                                position: position,
                                colIndex: position,
                                rowIndex: rowIdx,
                                originalRowIndex: sourceRowIdx,
                                originalColIndex: sourceColIdx,
                                content: content,
                                values: [content],
                                rowspan: rowspan,
                                colspan: colspan,
                                isFromRowspan: true,
                                isComplexStructure: true,
                                fromExternalRowspan: true,
                                structuralPath: {
                                    cellIdentifier: sourceCellKey,
                                    positionIdentifier: posKey,
                                    rowspanOffset: rowspanInfo.rowOffset,
                                    colspanOffset: rowspanInfo.colOffset
                                }
                            });
                        }
                    }
                }
                
                // PHASE 4: CONSOLIDATE VALUES FOR COMPLEX POSITIONS
                // This ensures that all values for complex positions get properly rendered
                const valuesByPosition = new Map();
                
                // Group all values by their position
                for (const dataItem of sublabel.data) {
                    const position = dataItem.position;
                    
                    if (!valuesByPosition.has(position)) {
                        valuesByPosition.set(position, []);
                    }
                    
                    valuesByPosition.get(position).push({
                        content: dataItem.content,
                        rowIndex: dataItem.rowIndex,
                        isFromRowspan: dataItem.isFromRowspan,
                        isFromColspan: dataItem.isFromColspan
                    });
                }
                
                // Update complex positions with complete value arrays
                for (const position of sublabel._complexPositions) {
                    if (!valuesByPosition.has(position)) continue;
                    
                    const allValuesAtPosition = valuesByPosition.get(position);
                    
                    // Sort by row index to preserve order
                    allValuesAtPosition.sort((a, b) => a.rowIndex - b.rowIndex);
                    
                    // The complete list of values for this position
                    const allContent = allValuesAtPosition.map(v => v.content);
                    
                    // Update each data item at this position with the complete value list
                    for (const dataItem of sublabel.data) {
                        if (dataItem.position === position) {
                            // Replace single value with complete array from all rows
                            dataItem.values = allContent;
                            dataItem.isComplexStructure = true;
                            dataItem.valueCount = allContent.length;
                        }
                    }
                }
                
                // PHASE 4.5: ADDITIONAL COMPLEX POSITION MARKING
                // Mark positions as complex based on multiple criteria
                
                // 1. Mark ALL positions as complex when sublabel has rowspan
                if (sublabel.rowspan && sublabel.rowspan > 1) {
                    logger.logProcessorDetail(`Marking all positions as complex for sublabel with rowspan=${sublabel.rowspan}`, {
                        rowIndex: sublabel.rowIndex,
                        title: sublabel.title,
                        dataPositions: sublabel.data.length
                    });
                    
                    for (const dataItem of sublabel.data) {
                        sublabel._complexPositions.add(dataItem.position);
                    }
                }
                
                // 2. Find positions with multiple values and mark them complex
                for (const [position, values] of valuesByPosition.entries()) {
                    if (values.length > 1) {
                        sublabel._complexPositions.add(position);
                    }
                }
                
                // 3. Special case for virtual sublabels
                if (sublabel.isVirtual && sublabel.structuralOnly) {
                    logger.logProcessorDetail(`Marking all positions as complex for virtual structural sublabel`, {
                        title: sublabel.title || 'unnamed',
                        dataCount: sublabel.data.length
                    });
                    
                    // Mark ALL positions as complex for virtual sublabels
                    for (const dataItem of sublabel.data) {
                        sublabel._complexPositions.add(dataItem.position);
                    }
                }
                
                // 4. Check for special row span information in tableInfo
                if (tableInfo && tableInfo.isRowspanAffected) {
                    logger.logProcessorDetail(`Marking all positions as complex due to rowspan context`, {
                        title: sublabel.title || 'unnamed',
                        dataCount: sublabel.data.length
                    });
                    
                    for (const dataItem of sublabel.data) {
                        sublabel._complexPositions.add(dataItem.position);
                    }
                }
                
                // PHASE 5: FINAL SORTING
                // Sort data items for consistent output
                sublabel.data.sort((a, b) => {
                    // First by column position
                    if (a.position !== b.position) {
                        return a.position - b.position;
                    }
                    
                    // Then by row index for consistent ordering
                    return a.rowIndex - b.rowIndex;
                });
                
                // Special flag for rendering layer to use
                sublabel.hasComplexStructure = sublabel._complexPositions.size > 0;
                
                // Log final stats
                logger.logProcessorDetail('Data cell processing complete', {
                    title: sublabel.title || 'unnamed',
                    cellCount: sublabel.data.length,
                    complexPositions: sublabel._complexPositions.size,
                    hasComplexStructure: sublabel.hasComplexStructure
                });
            },
        
            /**
             * Main entry point for processing hierarchical tables
             * 
             * A sophisticated processing engine specifically designed for complex, multi-level tables
             * such as financial reports, data dashboards, and nested section tables. This function:
             * 
             * 1. Extracts table title elements while preserving structural context
             * 2. Analyzes header boundaries with precise detection of data vs. header regions
             * 3. Builds a complete column hierarchy model capturing relationships at all levels
             * 4. Detects sections, subtitles, and sublabels with advanced structural analysis
             * 5. Orchestrates complex processing through a granular, staged pipeline
             * 
             * The function works with 100% structure-agnostic analysis, making no assumptions about
             * content or styling. It relies solely on structural patterns to correctly identify
             * relationships between elements, including:
             * - Column grouping hierarchies (parent-child relationships)
             * - Section/subsection delineation
             * - Data cell ownership hierarchies
             * - Rowspan/colspan relationship tracking
             * 
             * It employs sophisticated error handling at every stage to provide graceful degradation
             * rather than catastrophic failure when encountering problematic tables.
             * 
             * @param {HTMLElement} table - The table element to process
             * @returns {Object} Processed table data structured for rendering
             */
            processHierarchicalTable: function(table) {
                const TC = window.TableConverter;
                const logger = TC?.logger ? TC.logger.ensureSafeLogger(TC.logger) : console;
                const CONFIG = TC?.CONFIG || {};
                const shouldLogProcessor = CONFIG.debug?.logProcessors === true;
                
                if (shouldLogProcessor) {
                    logger.groupStart("=== HIERARCHICAL TABLE PROCESSING ===");
                    logger.logProcessor("START Processing hierarchical table", {
                        tableElement: table ? table.tagName : 'null',
                        rows: table?.rows?.length || 0,
                        cellCount: table?.querySelectorAll ? table.querySelectorAll('td, th').length : 0
                    });
                }
                
                // Set up timer for overall processing
                const processingTimer = shouldLogProcessor ? (logger.startTimer ? logger.startTimer('HierarchicalTableProcessing') : { start: Date.now() }) : null;
                
                // Input validation
                if (!table || !table.rows) {
                    if (shouldLogProcessor) {
                        logger.error('Invalid table for hierarchical processing', {
                            table: table ? 'exists' : 'null',
                            rows: table?.rows ? table.rows.length : 'undefined'
                        });
                        
                        if (processingTimer && logger.endTimer) logger.endTimer(processingTimer);
                        logger.groupEnd();
                    }
                    return null;
                }
                
                try {
                    // STEP 1: Extract table title if present
                    if (shouldLogProcessor) {
                        logger.groupStart("STEP 1: Table Title Extraction");
                    }
                    
                    let title = '';
                    
                    // Check first row for a title cell
                    if (table.rows[0] && table.rows[0].cells[0]) {
                        const firstCell = table.rows[0].cells[0];
                        const colspan = parseInt(firstCell.getAttribute('colspan')) || 1;
                        const totalColumns = window.TableConverter.tableAnalysis.getTotalColumns(table);
                        
                        // If first cell spans most of the table, it's likely a title
                        if (colspan > 0 && totalColumns > 0 && colspan / totalColumns > 0.75) {
                            title = firstCell.innerHTML.trim();
                            if (shouldLogProcessor) {
                                logger.logProcessor("Table title extracted", { 
                                    title: title.substring(0, 50) + (title.length > 50 ? '...' : '')
                                });
                            }
                        } else if (shouldLogProcessor) {
                            logger.logProcessor("No table title detected", {
                                colspan: colspan,
                                totalColumns: totalColumns,
                                ratio: totalColumns > 0 ? colspan / totalColumns : 0
                            });
                        }
                    }
                    
                    if (shouldLogProcessor) {
                        logger.groupEnd(); // End "STEP 1: Table Title Extraction"
                    }
                    
                    // STEP 2: Detect header boundaries
                    if (shouldLogProcessor) {
                        logger.groupStart("STEP 2: Header Boundaries Detection");
                    }
                    
                    const headerBoundaries = window.TableConverter.tableAnalysis.detectHeaderBoundaries(table);
                    
                    if (shouldLogProcessor) {
                        logger.logProcessor("Header boundaries detected", {
                            headerEndIndex: headerBoundaries.headerEndIndex,
                            dataStartIndex: headerBoundaries.dataStartIndex,
                            dataColumnStart: headerBoundaries.dataColumnStart
                        });
                        logger.groupEnd(); // End "STEP 2: Header Boundaries Detection"
                    }
                    
                    // STEP 3: Analyze column hierarchy
                    if (shouldLogProcessor) {
                        logger.groupStart("STEP 3: Column Hierarchy Analysis");
                        logger.logProcessor("Detecting column hierarchy");
                    }
                    
                    const columnHierarchy = window.TableConverter.tableAnalysis.detectColumnHierarchy(table, headerBoundaries);
                    
                    if (shouldLogProcessor) {
                        logger.logProcessor("Column hierarchy detected", {
                            dataColumnStart: columnHierarchy.dataColumnStart,
                            topLevelHeaders: columnHierarchy.topLevelHeaders?.length || 0,
                            hierarchySize: columnHierarchy.hierarchies?.size || 0,
                            headerMatrixDepth: columnHierarchy.headerDepth || 0
                        });
                        logger.groupEnd(); // End "STEP 3: Column Hierarchy Analysis"
                    }
                    
                    // STEP 4: Process using orchestrator
                    if (shouldLogProcessor) {
                        logger.groupStart("STEP 4: Table Processing Orchestration");
                        logger.logProcessor("Starting orchestrated processing");
                    }
                    
                    let result = null;
                    
                    // Check if we can use the orchestrator
                    if (window.TableConverter.processors && 
                        window.TableConverter.processors.helpers && 
                        typeof window.TableConverter.processors.helpers.processOrchestrator === 'function') {
                        
                        result = window.TableConverter.processors.helpers.processOrchestrator(
                            table, headerBoundaries, columnHierarchy
                        );
                        
                        if (shouldLogProcessor) {
                            logger.logProcessor("Orchestrated processing complete", {
                                resultType: result ? 'success' : 'failure',
                                hierarchyType: result?.hierarchyType || 'unknown'
                            });
                        }
                    } 
                    else {
                        // Fallback to standard processing if orchestrator is not available
                        if (shouldLogProcessor) {
                            logger.logProcessor("Orchestrator not available, using standard processing", {
                                reason: "Function not defined"
                            });
                        }
                        
                        // Detect data row boundary
                        const dataRowBoundary = window.TableConverter.tableAnalysis.detectDataRowBoundary(table);
                        
                        // Detect sections using standard approach
                        const sections = window.TableConverter.tableAnalysis.detectSectionBoundaries(
                            table, dataRowBoundary, columnHierarchy
                        );
                        
                        // For each section, process subtitles and sublabels using the old method
                        for (const section of sections) {
                            const processingParams = {
                                dataColumnStart: columnHierarchy.dataColumnStart,
                                sectionSubtitle: section.subtitle || ''
                            };
                            
                            // Call the existing subtitle and sublabel processor if available
                            if (window.TableConverter.processors.helpers && 
                                typeof window.TableConverter.processors.helpers.processSubtitlesAndSublabels === 'function') {
                                
                                section.subtitles = window.TableConverter.processors.helpers.processSubtitlesAndSublabels(
                                    table, section.startRow, section.endRow, processingParams
                                );
                            } else if (shouldLogProcessor) {
                                logger.logProcessor("processSubtitlesAndSublabels not available", {
                                    section: section.id || 'unknown'
                                });
                                section.subtitles = [];
                            }
                        }
                        
                        result = {
                            title: title,
                            sections: sections,
                            columnInfo: columnHierarchy,
                            hierarchyType: 'standard' // Using default type for fallback
                        };
                    }
                    
                    if (shouldLogProcessor) {
                        logger.groupEnd(); // End "STEP 4: Table Processing Orchestration"
                    }
                    
                    // Calculate statistics for reporting
                    if (result && shouldLogProcessor) {
                        const totalSubtitles = result.sections.reduce((count, section) => 
                            count + (section.subtitles?.length || 0), 0);
                            
                        const totalSublabels = result.sections.reduce((count, section) => {
                            if (!section.subtitles) return count;
                            return count + section.subtitles.reduce((subCount, subtitle) => 
                                subCount + (subtitle.sublabels?.length || 0), 0);
                        }, 0);
                        
                        const totalDataCells = result.sections.reduce((count, section) => {
                            if (!section.subtitles) return count;
                            return count + section.subtitles.reduce((subCount, subtitle) => {
                                if (!subtitle.sublabels) return subCount;
                                return subCount + subtitle.sublabels.reduce((dataCount, sublabel) => 
                                    dataCount + (sublabel.data?.length || 0), 0);
                            }, 0);
                        }, 0);
                        
                        logger.logProcessor("Hierarchical table processing complete", {
                            title: result.title ? result.title.substring(0, 30) + (result.title.length > 30 ? '...' : '') : 'None',
                            hierarchyType: result.hierarchyType || 'unknown',
                            sectionCount: result.sections.length,
                            subtitleCount: totalSubtitles,
                            sublabelCount: totalSublabels,
                            dataCellCount: totalDataCells,
                            processingTime: processingTimer?.duration || (processingTimer ? (Date.now() - processingTimer.start) : 0)
                        });
                    } else if (shouldLogProcessor) {
                        logger.logProcessor("Hierarchical table processing failed", {
                            reason: "No result returned from processing"
                        });
                    }
                    
                    if (shouldLogProcessor) {
                        if (processingTimer && logger.endTimer) logger.endTimer(processingTimer);
                        logger.groupEnd(); // End "=== HIERARCHICAL TABLE PROCESSING ==="
                    }
                    return result;
                    
                } catch (error) {
                    if (shouldLogProcessor) {
                        logger.error("Error processing hierarchical table", {
                            message: error?.message || "Unknown error",
                            stack: error?.stack || new Error().stack
                        });
                        
                        if (processingTimer && logger.endTimer) logger.endTimer(processingTimer);
                        logger.groupEnd(); // End "=== HIERARCHICAL TABLE PROCESSING ==="
                    }
                    return null;
                }
            },

            /**
             * Process orchestrator with virtual sublabel handling
             * 
             * Serves as the intelligent coordinator for hierarchical table processing,
             * adapting processing strategies based on detected table structure types:
             * 
             * - section-subtitle-sublabel: Standard case with sublabels 
             * - section-subtitle: Section with subtitles but no sublabels 
             * - section-only: Section with no subtitles (simplified tables)
             * - data-only: Basic data tables with minimal hierarchy
             * 
             * The orchestrator dynamically identifies the appropriate processing strategy
             * by analyzing structural patterns rather than content, enabling accurate
             * processing of any table regardless of its subject matter or styling.
             * 
             * For complex cases where expected hierarchical markers are missing, it creates
             * virtual structure elements to maintain data organization and ensure proper rendering.
             * This includes generating synthetic subtitles/sublabels where structural
             * relationships imply them but explicit elements are absent.
             * 
             * @param {HTMLElement} table - The table element to process
             * @param {Object} headerBoundaries - Header boundary information
             * @param {Object} columnInfo - Column hierarchy information
             * @returns {Object} Processed table data with appropriate structure
             */
            processOrchestrator: function(table, headerBoundaries, columnInfo) {
                const TC = window.TableConverter;
                const logger = TC?.logger ? TC.logger.ensureSafeLogger(TC.logger) : console;
                const CONFIG = TC?.CONFIG || {};
                const shouldLogProcessor = CONFIG.debug?.logProcessors === true;
                const shouldLogProcessorDetail = CONFIG.debug?.logProcessorDetail === true;
                
                if (shouldLogProcessor) {
                    logger.groupStart("==== PROCESS ORCHESTRATOR ====");
                    logger.logProcessor('Starting table processing orchestration');
                }
                
                // First, detect the table hierarchy
                const tableHierarchy = window.TableConverter.tableAnalysis.detectTableHierarchy(
                    table, headerBoundaries, columnInfo
                );
            
                if (shouldLogProcessor) {
                    logger.logProcessor('Table hierarchy detected', {
                        type: tableHierarchy.hierarchyType,
                        hasSubtitles: tableHierarchy.hasSubtitles,
                        hasSublabels: tableHierarchy.hasSublabels
                    });
                }
                
                // Check if data-only tables could be treated as section-only
                if (tableHierarchy.hierarchyType === 'data-only') {
                    // Check if first column cells could be treated as section headers
                    const firstColumnCells = window.TableConverter.tableAnalysis.getAllFirstColumnCells(table);
                    
                    // Check if cells meet criteria for sections - not empty and have content
                    const couldBeSection = firstColumnCells.length > 0 && 
                                        firstColumnCells.every(cell => 
                                            cell.content && !cell.isEmpty && cell.rowspan >= 1);
                    
                    if (couldBeSection) {
                        if (shouldLogProcessor) {
                            logger.logProcessor('Converting data-only table to section-only based on first column structure', {
                                originalType: tableHierarchy.hierarchyType,
                                newType: 'section-only',
                                firstColumnCellCount: firstColumnCells.length,
                                samples: firstColumnCells.slice(0, 3).map(cell => cell.content)
                            });
                        }
                        
                        tableHierarchy.hierarchyType = 'section-only';
                        
                        // Convert first column data cells to virtual section headers
                        // and get adjusted data column start position
                        const updatedColumnInfo = window.TableConverter.processors.helpers.convertFirstColumnToSectionHeaders(table);
                        
                        // CRITICAL: Update the dataColumnStart to prevent duplication
                        if (columnInfo && updatedColumnInfo) {
                            // Store original value for logging
                            const originalDataColumnStart = columnInfo.dataColumnStart || 0;
                            
                            // Update the dataColumnStart
                            columnInfo.dataColumnStart = updatedColumnInfo.dataColumnStart;
                            
                            if (shouldLogProcessor) {
                                logger.logProcessor('Updated dataColumnStart to prevent duplication', {
                                    originalStart: originalDataColumnStart,
                                    newStart: columnInfo.dataColumnStart
                                });
                            }
                        }
                    }
                }
                
                // Set up timer for overall processing, only if logging is enabled
                let orchestratorTimer = null;
                if (shouldLogProcessor) {
                    const timerName = 'ProcessOrchestrator_' + Date.now();
                    orchestratorTimer = logger.startTimer ? logger.startTimer(timerName) : { start: Date.now() };
                }
                
                try {
                    // Detect data row boundary
                    const dataRowBoundary = window.TableConverter.tableAnalysis.detectDataRowBoundary(table);
                    if (shouldLogProcessorDetail) {
                        logger.logProcessorDetail('Data row boundary detected', {
                            boundary: dataRowBoundary
                        });
                    }
                    
                    // Detect section boundaries
                    if (shouldLogProcessorDetail) {
                        logger.logProcessorDetail('Detecting section boundaries');
                    }
                    
                    const sections = window.TableConverter.tableAnalysis.detectSectionBoundaries(
                        table, dataRowBoundary, columnInfo
                    );
                    
                    if (shouldLogProcessor) {
                        logger.logProcessor('Section boundaries detected', {
                            sectionCount: sections.length
                        });
                    }
                    
                    // Create cell matrix for processing
                    if (shouldLogProcessorDetail) {
                        logger.logProcessorDetail('Creating table cell matrix');
                    }
                    
                    const cellMatrix = window.TableConverter.tableAnalysis.createTableMatrix(table);
                    
                    // Process based on hierarchy type
                    if (tableHierarchy.hierarchyType === 'section-subtitle-sublabel') {
                        // Standard case with sublabels
                        if (shouldLogProcessor) {
                            logger.logProcessor('Processing as section-subtitle-sublabel hierarchy');
                        }
                        
                        // For each section, detect subtitles
                        for (const section of sections) {
                            // Detect subtitles
                            const subtitles = window.TableConverter.tableAnalysis.detectSubtitles(
                                table, section.startRow, section.endRow, columnInfo.dataColumnStart, section.subtitle
                            );
                            
                            if (shouldLogProcessorDetail) {
                                logger.logProcessorDetail(`Detected ${subtitles.length} subtitles for section`, {
                                    sectionId: section.id,
                                    rowRange: `${section.startRow}-${section.endRow}`
                                });
                            }
                            
                            // For each subtitle, detect sublabels
                            for (const subtitle of subtitles) {
                                if (!subtitle) continue;
                                
                                // Initialize sublabels array if not already present
                                subtitle.sublabels = subtitle.sublabels || [];
                                
                                // Detect sublabels for this subtitle
                                window.TableConverter.tableAnalysis.detectSublabels(
                                    table, [subtitle], cellMatrix, subtitle.rowStart, subtitle.rowEnd, columnInfo.dataColumnStart
                                );
                                
                                // Now process data cells for each sublabel
                                for (const sublabel of subtitle.sublabels) {
                                    if (!sublabel) continue;
                                    
                                    // Initialize data array if not present
                                    sublabel.data = sublabel.data || [];
                                    
                                    // Process data cells for this sublabel
                                    if (typeof window.TableConverter.processors.helpers.processDataCells === 'function') {
                                        window.TableConverter.processors.helpers.processDataCells(
                                            sublabel, cellMatrix, sublabel.rowIndex, columnInfo.dataColumnStart, {
                                                headerEndIndex: headerBoundaries.headerEndIndex,
                                                isRowspanAffected: sublabel.isFromRowspan || false,
                                                parentRowIndex: subtitle.rowStart
                                            }
                                        );
                                    }
                                }
                            }
                            
                            section.subtitles = subtitles;
                        }
                    } 
                    else if (tableHierarchy.hierarchyType === 'section-subtitle') {
                        // Section with subtitles but no sublabels (table 9.3 case)
                        if (shouldLogProcessor) {
                            logger.logProcessor('Processing as section-subtitle hierarchy (no sublabels)');
                        }
                        
                        // For each section, process subtitles but create virtual sublabels
                        for (const section of sections) {
                            // First detect subtitles normally
                            const subtitles = window.TableConverter.tableAnalysis.detectSubtitles(
                                table, section.startRow, section.endRow, columnInfo.dataColumnStart, section.subtitle
                            );
                            
                            if (shouldLogProcessorDetail) {
                                logger.logProcessorDetail(`Detected ${subtitles.length} subtitles for section`, {
                                    sectionId: section.id,
                                    rowRange: `${section.startRow}-${section.endRow}`
                                });
                            }
                            
                            // For each subtitle, create a virtual sublabel that inherits its title
                            for (const subtitle of subtitles) {
                                if (!subtitle) continue;
                                
                                // Create a virtual sublabel inheriting from the subtitle
                                const virtualSublabel = {
                                    title: subtitle.title, // Use subtitle's own title
                                    rowIndex: subtitle.rowStart,
                                    cellIndex: subtitle.colIndex,
                                    position: subtitle.colIndex,
                                    element: subtitle.element,
                                    rowspan: subtitle.rowspan || 1,
                                    parentSubtitle: subtitle.title,
                                    isVirtual: true,          // Flag as virtual - don't show in accordion
                                    structuralOnly: true,     // Only for structural purposes
                                    data: []
                                };
                                
                                // Process data cells for this virtual sublabel
                                if (typeof window.TableConverter.processors.helpers.processDataCells === 'function') {
                                    window.TableConverter.processors.helpers.processDataCells(
                                        virtualSublabel, 
                                        cellMatrix, 
                                        subtitle.rowStart, 
                                        columnInfo.dataColumnStart,  // Use dynamically determined dataColumnStart
                                        {
                                            headerEndIndex: headerBoundaries.headerEndIndex,
                                            isRowspanAffected: (subtitle.rowspan || 1) > 1,  // Derive from structure
                                            parentRowIndex: subtitle.rowStart
                                        }
                                    );
                                    
                                    if (shouldLogProcessorDetail) {
                                        logger.logProcessorDetail(`Processed data cells for virtual sublabel`, {
                                            title: virtualSublabel.title,
                                            dataCount: virtualSublabel.data.length,
                                            dataColumnStart: columnInfo.dataColumnStart,
                                            rowspan: subtitle.rowspan || 1,
                                            isComplex: (subtitle.rowspan || 1) > 1
                                        });
                                    }
                                }
                                
                                // Add the virtual sublabel to the subtitle
                                subtitle.sublabels = subtitle.sublabels || [];
                                subtitle.sublabels.push(virtualSublabel);
                            }
                            
                            section.subtitles = subtitles;
                        }
                    }
                    else if (tableHierarchy.hierarchyType === 'section-only') {
                        if (shouldLogProcessor) {
                            logger.logProcessor('Processing as section-only hierarchy');
                        }
                        
                        // For each section, create subtitles based on column groups
                        for (const section of sections) {
                            const topLevelHeaders = columnInfo.topLevelHeaders || [];
                            
                            if (shouldLogProcessor) {
                                logger.logProcessor('Section-only processing details', {
                                    sectionTitle: section.title || section.id,
                                    topLevelHeaderCount: topLevelHeaders.length,
                                    headers: topLevelHeaders.map(h => ({ 
                                        text: h.text, 
                                        startCol: h.startCol, 
                                        endCol: h.endCol 
                                    }))
                                });
                            }
                            
                            if (topLevelHeaders.length > 1) {
                                // Create separate subtitles/sublabels for each column group
                                section.subtitles = topLevelHeaders.map(header => {
                                    if (shouldLogProcessorDetail) {
                                        logger.logProcessorDetail('Creating subtitle for column group', {
                                            headerText: header.text,
                                            columnRange: `${header.startCol}-${header.endCol}`
                                        });
                                    }
                                    
                                    const virtualSubtitle = {
                                        title: header.text,
                                        rowStart: section.startRow,
                                        rowEnd: section.endRow,
                                        colIndex: header.startCol,
                                        rowspan: 1,
                                        element: null,
                                        isVirtual: true,
                                        sublabels: []
                                    };
                                    
                                    const virtualSublabel = {
                                        title: header.text,
                                        rowIndex: section.startRow,
                                        cellIndex: header.startCol,
                                        position: header.startCol,
                                        element: null,
                                        rowspan: (section.endRow - section.startRow) + 1,
                                        isVirtual: true,
                                        data: [],
                                        // Add column range for filtering
                                        columnStart: header.startCol,
                                        columnEnd: header.endCol
                                    };
                                    
                                    // Process data cells ONLY for this column range
                                    if (typeof window.TableConverter.processors.helpers.processDataCells === 'function') {
                                        window.TableConverter.processors.helpers.processDataCells(
                                            virtualSublabel, 
                                            cellMatrix, 
                                            section.startRow, 
                                            header.startCol, // Use column group start
                                            {
                                                headerEndIndex: headerBoundaries.headerEndIndex,
                                                isRowspanAffected: section.endRow > section.startRow,
                                                parentRowIndex: section.startRow,
                                                // Add column range limit
                                                columnEnd: header.endCol
                                            }
                                        );
                                    }
                                    
                                    virtualSubtitle.sublabels.push(virtualSublabel);
                                    return virtualSubtitle;
                                });
                            } else {
                                // Fallback to single subtitle if no column groups
                                const virtualSubtitle = {
                                    title: section.title || section.id || 'Section',
                                    rowStart: section.startRow,
                                    rowEnd: section.endRow,
                                    colIndex: 0,
                                    rowspan: 1,
                                    element: null,
                                    isVirtual: true,
                                    sublabels: []
                                };
                                
                                const virtualSublabel = {
                                    title: section.title || section.id || 'Section',
                                    rowIndex: section.startRow,
                                    cellIndex: 0,
                                    position: 0,
                                    element: null,
                                    rowspan: (section.endRow - section.startRow) + 1,
                                    isVirtual: true,
                                    data: []
                                };
                                
                                if (typeof window.TableConverter.processors.helpers.processDataCells === 'function') {
                                    window.TableConverter.processors.helpers.processDataCells(
                                        virtualSublabel, 
                                        cellMatrix, 
                                        section.startRow, 
                                        columnInfo.dataColumnStart,
                                        {
                                            headerEndIndex: headerBoundaries.headerEndIndex,
                                            isRowspanAffected: section.endRow > section.startRow,
                                            parentRowIndex: section.startRow
                                        }
                                    );
                                }
                                
                                virtualSubtitle.sublabels.push(virtualSublabel);
                                section.subtitles = [virtualSubtitle];
                            }
                        }
                    }
                    else {
                        // Data-only table types
                        if (shouldLogProcessor) {
                            logger.logProcessor(`Processing as ${tableHierarchy.hierarchyType} hierarchy`);
                        }
                        
                        // Create virtual structure for data rendering
                        for (const section of sections) {
                            // Create virtual elements as needed based on structure
                            const virtualSubtitle = {
                                title: section.title || section.id || 'Section',
                                rowStart: section.startRow,
                                rowEnd: section.endRow,
                                colIndex: 0,
                                element: null,
                                isVirtual: true,
                                sublabels: []
                            };
                            
                            const virtualSublabel = {
                                title: section.title || section.id || 'Section',
                                rowIndex: section.startRow,
                                cellIndex: 0,
                                position: 0,
                                element: null,
                                rowspan: (section.endRow - section.startRow) + 1, // Derive from structure
                                isVirtual: true,
                                data: []
                            };
                            
                            // Process data cells
                            if (typeof window.TableConverter.processors.helpers.processDataCells === 'function') {
                                window.TableConverter.processors.helpers.processDataCells(
                                    virtualSublabel, 
                                    cellMatrix, 
                                    section.startRow, 
                                    columnInfo.dataColumnStart, // Dynamic dataColumnStart
                                    {
                                        headerEndIndex: headerBoundaries.headerEndIndex,
                                        isRowspanAffected: section.endRow > section.startRow, // Structural determination
                                        parentRowIndex: section.startRow
                                    }
                                );
                            }
                            
                            virtualSubtitle.sublabels.push(virtualSublabel);
                            section.subtitles = [virtualSubtitle];
                        }
                    }
                    
                    // Extract title from the table if present
                    let title = '';
                    if (tableHierarchy.hasTitle) {
                        title = tableHierarchy.titleText || '';
                    }
                    
                    // Create the final result
                    const result = {
                        title: title,
                        sections: sections,
                        columnInfo: columnInfo,
                        hierarchyType: tableHierarchy.hierarchyType
                    };
                    
                    if (shouldLogProcessor) {
                        // Calculate statistics for logging
                        const totalSubtitles = sections.reduce((count, section) => 
                            count + (section.subtitles?.length || 0), 0);
                            
                        const totalSublabels = sections.reduce((count, section) => {
                            if (!section.subtitles) return count;
                            return count + section.subtitles.reduce((subCount, subtitle) => 
                                subCount + (subtitle.sublabels?.length || 0), 0);
                        }, 0);
                        
                        logger.logProcessor('Processing orchestration complete', {
                            hierarchyType: tableHierarchy.hierarchyType,
                            sectionCount: sections.length,
                            subtitleCount: totalSubtitles,
                            sublabelCount: totalSublabels,
                            processingTime: orchestratorTimer ? (orchestratorTimer.duration || (Date.now() - orchestratorTimer.start)) : 0
                        });
                        
                        logger.groupEnd();
                    }
                    
                    return result;
                }
                catch (error) {
                    if (shouldLogProcessor) {
                        logger.error('Error in processOrchestrator', {
                            message: error?.message || 'Unknown error',
                            stack: error?.stack || new Error().stack
                        });
                        
                        logger.groupEnd();
                    }
                    return null;
                }
            },

            /**
            * Converts first column cells and adjusts column boundaries based on table structure
            * 100% structure-agnostic implementation with title awareness
            * 
            * @param {HTMLElement} table - The table element to modify
            * @returns {Object} Updated column info with adjusted dataColumnStart
            */
            convertFirstColumnToSectionHeaders: function(table) {
                const logger = window.TableConverter.logger || console;
                logger.logProcessor('Converting first column TD cells to section headers');
                
                if (!table || !table.rows) {
                    logger.logProcessor('Invalid table for first column conversion');
                    return { dataColumnStart: 0 };
                }
                
                // Get header boundaries to know where data rows start
                const headerBoundaries = window.TableConverter.tableAnalysis.detectHeaderBoundaries(table);
                const dataStartIndex = headerBoundaries.dataStartIndex || 0;
                
                // IMPORTANT: Check if table has a title row
                const titleInfo = window.TableConverter.tableAnalysis.detectTableTitle(table);
                const hasTitle = titleInfo.hasTitle;
                
                // Track virtual sections for logging
                const convertedSections = [];
                
                // Process data rows only, skipping header rows
                for (let rowIndex = dataStartIndex; rowIndex < table.rows.length; rowIndex++) {
                    const row = table.rows[rowIndex];
                    if (!row || !row.cells || row.cells.length === 0) continue;
                    
                    // Get the first cell in this row
                    const firstCell = row.cells[0];
                    if (!firstCell) continue;
                    
                    // Skip cells that are already TH
                    if (firstCell.tagName.toLowerCase() === 'th') continue;
                    
                    // Capture original attributes
                    const rowspan = parseInt(firstCell.getAttribute('rowspan')) || 1;
                    const colspan = parseInt(firstCell.getAttribute('colspan')) || 1;
                    
                    // Add semantic information for processing
                    firstCell._isVirtualSectionHeader = true;
                    firstCell._originalTagName = firstCell.tagName.toLowerCase();
                    firstCell._excludeFromData = true;
                    
                    // Add to tracking for logging
                    convertedSections.push({
                        rowIndex: rowIndex,
                        content: firstCell.textContent?.trim() || 'Empty section',
                        rowspan: rowspan,
                        colspan: colspan
                    });
                    
                    // Skip rows affected by rowspan
                    if (rowspan > 1) {
                        rowIndex += (rowspan - 1);
                    }
                }
                
                // TD cells position column start
                const effectiveDataColumnStart = 1;
                
                logger.logProcessor('First column conversion complete', {
                    convertedSections: convertedSections.length,
                    effectiveDataColumnStart: effectiveDataColumnStart,
                    hasTitle: hasTitle,
                    titleText: hasTitle ? titleInfo.titleText.substring(0, 30) : 'none',
                    examples: convertedSections.slice(0, 3).map(section => ({
                        rowIndex: section.rowIndex,
                        content: section.content,
                        colspan: section.colspan
                    }))
                });
                
                // Return updated column information
                return { dataColumnStart: effectiveDataColumnStart };
            },

            /**
            * Process subtitles and sublabels in a table section
            * Coordinates subtitle and sublabel detection processes with minimal logging
            * 
            * @param {HTMLElement} table - The table element
            * @param {Number} sectionStartRow - Section's starting row index
            * @param {Number} sectionEndRow - Section's ending row index
            * @param {Object} boundaries - Contains dataColumnStart and sectionSubtitle
            * @returns {Array} Subtitles with their sublabels and data
            */
            processSubtitlesAndSublabels: function(table, sectionStartRow, sectionEndRow, boundaries) {
                // Use minimal logging with safe logger access
                const logger = window.TableConverter.logger || console;
                
                // Single start log
                logger.logAnalysis('Processing subtitles and sublabels', {
                    rowRange: `${sectionStartRow}-${sectionEndRow}`,
                    dataColumnStart: boundaries?.dataColumnStart || 0
                });
                
                // Set up timer for performance tracking
                const processingTimer = logger.startTimer('SubtitlesAndSublabelsProcessing');

                // Validate inputs
                if (!table || !table.rows || sectionStartRow < 0 || 
                    sectionEndRow >= table.rows.length || sectionStartRow > sectionEndRow) {
                    logger.error('Invalid parameters for subtitle processing');
                    
                    if (logger.endTimer) logger.endTimer(processingTimer);
                    return [];
                }
                
                // Extract parameters (no logging)
                const dataColumnStart = boundaries && typeof boundaries.dataColumnStart !== 'undefined' 
                    ? boundaries.dataColumnStart 
                    : 0;
                
                const sectionSubtitle = boundaries && boundaries.sectionSubtitle 
                    ? boundaries.sectionSubtitle 
                    : '';
                
                // STEP 1: Detect subtitles 
                let subtitles = [];
                
                // Call tableAnalysis.detectSubtitles with proper path
                if (window.TableConverter.tableAnalysis && typeof window.TableConverter.tableAnalysis.detectSubtitles === 'function') {
                    subtitles = window.TableConverter.tableAnalysis.detectSubtitles(
                        table, sectionStartRow, sectionEndRow, dataColumnStart, sectionSubtitle
                    );
                }
                
                // If still no subtitles detected, create a synthetic main subtitle from section subtitle
                if (subtitles.length === 0 && sectionSubtitle) {
                    logger.logAnalysis('Creating synthetic main subtitle from section subtitle');
                    
                    // Get the section subtitle cell if possible
                    let subtitleCell = null;
                    if (sectionStartRow < table.rows.length) {
                        const firstRow = table.rows[sectionStartRow];
                        if (firstRow && firstRow.cells && firstRow.cells.length > 1) {
                            subtitleCell = firstRow.cells[1]; // Second cell often contains the subtitle
                        }
                    }
                    
                    // Create a main subtitle
                    const mainSubtitle = {
                        title: sectionSubtitle,
                        rowStart: sectionStartRow,
                        rowEnd: sectionEndRow,
                        colIndex: 1, // Typically the second column
                        rowspan: subtitleCell ? (parseInt(subtitleCell.getAttribute('rowspan')) || 1) : 1,
                        element: subtitleCell,
                        isMainSubtitle: true,
                        sublabels: []
                    };
                    
                    subtitles.push(mainSubtitle);
                }
                
                // If no subtitles detected and section is valid, add a default main subtitle
                if (subtitles.length === 0) {
                    logger.logAnalysis('No subtitles or section subtitle, adding default main subtitle');
                    
                    const defaultTitle = 'Section';
                    
                    const mainSubtitle = {
                        title: defaultTitle,
                        rowStart: sectionStartRow,
                        rowEnd: sectionEndRow,
                        colIndex: 1,
                        rowspan: 1,
                        element: null,
                        isMainSubtitle: true,
                        synthetic: true,
                        sublabels: []
                    };
                    
                    subtitles.push(mainSubtitle);
                }
                
                // STEP 2: Create cell matrix for sublabel detection
                logger.logAnalysis('Creating cell matrix for sublabel detection');
                const cellMatrix = window.TableConverter.tableAnalysis && 
                                typeof window.TableConverter.tableAnalysis.createTableMatrix === 'function' ? 
                                window.TableConverter.tableAnalysis.createTableMatrix(table) : null;
                
                if (!cellMatrix || !cellMatrix.length) {
                    logger.error('Failed to create cell matrix, returning subtitles without sublabels');
                    if (logger.endTimer) logger.endTimer(processingTimer);
                    return subtitles;
                }
                
                // STEP 3: Detect sublabels for all subtitles
                logger.logAnalysis('Detecting sublabels for all subtitles');
                if (window.TableConverter.tableAnalysis && typeof window.TableConverter.tableAnalysis.detectSublabels === 'function') {
                    window.TableConverter.tableAnalysis.detectSublabels(
                        table,
                        subtitles,
                        cellMatrix,
                        sectionStartRow,
                        sectionEndRow,
                        dataColumnStart
                    );
                } else {
                    logger.logAnalysis('No sublabel detection function available');
                }
                
                // Count resulting sublabels for reporting
                const totalSublabels = subtitles.reduce((count, subtitle) => 
                    count + (subtitle.sublabels?.length || 0), 0);
                
                // Calculate some subtitle statistics
                const subtitlesWithSublabels = subtitles.filter(st => st.sublabels?.length > 0).length;
                const sublabelWithDataCount = subtitles.reduce((count, st) => {
                    if (!st.sublabels) return count;
                    return count + st.sublabels.filter(sl => sl.data?.length > 0).length;
                }, 0);
                
                const totalDataCells = subtitles.reduce((count, st) => {
                    if (!st.sublabels) return count;
                    return count + st.sublabels.reduce((subCount, sl) => {
                        return subCount + (sl.data?.length || 0);
                    }, 0);
                }, 0);
                
                // Final completion log with comprehensive statistics
                if (logger.endTimer) logger.endTimer(processingTimer);
                logger.logAnalysis('Completed subtitle and sublabel processing', {
                    subtitleCount: subtitles.length,
                    totalSublabels: totalSublabels,
                    subtitlesWithSublabels: subtitlesWithSublabels,
                    sublabelsWithData: sublabelWithDataCount,
                    totalDataCells: totalDataCells,
                    processingTime: processingTimer.duration || (Date.now() - processingTimer.start)
                });
                
                // Return all subtitles
                return subtitles;
            },

            /**
             * Process simple and regular tables (non-hierarchical)
             * 
             * Dedicated processing function for simple and regular tables that don't require
             * the complex hierarchical processing. This function:
             * 
             * 1. Handles single-row tables with special processing
             * 2. Processes regular tables with thead/tbody separation
             * 3. Handles general tables with flexible analysis as a fallback
             * 
             * By separating this logic from the hierarchical processing, it allows for
             * targeted improvements to colspan/rowspan handling in simpler table structures.
             * 
             * @param {HTMLElement} table - The source table DOM element to process
             * @returns {Object|Array} Structured data ready for rendering
             */
            processSimpleAndRegularTables: function(table) {
                const TC = window.TableConverter || {};
                const logger = TC.logger || {
                    logProcessor: function() {},
                    error: function() {},
                    startTimer: function() { return null; },
                    endTimer: function() {},
                    groupStart: function() {},
                    groupEnd: function() {}
                };
                
                // For large batches and timer handling
                const isLargeBatch = TC._tableProcessingCount > 20;
                let processingTimer = null;
                
                try {
                    if (!isLargeBatch && logger.startTimer) {
                        processingTimer = logger.startTimer('SimpleTableProcessing');
                    }
                } catch (timerError) {}
                
                // Basic validation
                if (!table || !table.rows || table.rows.length === 0) {
                    if (processingTimer && logger.endTimer) logger.endTimer(processingTimer);
                    if (!isLargeBatch) {
                        logger.error && logger.error('Invalid table for processing - no rows', { 
                            hasTable: !!table,
                            hasRows: !!(table && table.rows),
                            rowCount: table?.rows?.length || 0
                        });
                    }
                    return null;
                }
                
                /**
                * Helper to normalize cell content structure
                * Ensures consistent structure regardless of how content is formatted in the cell
                * @param {HTMLElement} cell - The table cell
                * @returns {Object} Normalized content data
                */
                const normalizeTableCellContent = function(cell) {
                    if (!cell) return { content: '', text: '', hasRichContent: false };
                    
                    // Get the raw HTML content
                    const innerHTML = cell.innerHTML || '';
                    
                    // Get plain text content
                    const textContent = cell.textContent?.trim() || '';
                    
                    // Check for various rich content types
                    const hasImages = innerHTML.includes('<img');
                    const hasParagraphs = innerHTML.includes('<p');
                    const hasDivs = innerHTML.includes('<div');
                    const hasLists = innerHTML.includes('<ul') || innerHTML.includes('<ol');
                    const hasLinks = innerHTML.includes('<a ');
                    const hasRichContent = hasImages || hasParagraphs || hasDivs || hasLists || hasLinks;
                    
                    // Detect structure pattern
                    const hasWrappedParagraphs = innerHTML.trim().startsWith('<p>');
                    const hasDirectContent = !hasWrappedParagraphs && innerHTML.trim().length > 0;
                    
                    return {
                        content: innerHTML,
                        text: textContent,
                        hasImages: hasImages,
                        hasParagraphs: hasParagraphs,
                        hasDivs: hasDivs,
                        hasLists: hasLists,
                        hasLinks: hasLinks,
                        hasRichContent: hasRichContent,
                        hasWrappedParagraphs: hasWrappedParagraphs,
                        hasDirectContent: hasDirectContent,
                        contentType: hasRichContent ? 'rich' : (textContent ? 'text' : 'empty')
                    };
                };
                
                // Special handling for single-row tables
                if (table.rows.length === 1) {
                    // Existing single-row table handling code...
                    return null; // Since we're focusing on multi-row tables
                }
            
                // Check for a regular table with thead/tbody
                let thead = null, tbody = null;
                
                try {
                    thead = table.querySelector ? table.querySelector('thead') : null;
                    tbody = table.querySelector ? table.querySelector('tbody') : null;
                } catch (querySelector1Error) {
                    if (!isLargeBatch) {
                        logger.error && logger.error('Error querying thead/tbody', {
                            message: querySelector1Error?.message || 'Unknown error'
                        });
                    }
                }
                
                const isRegularTable = thead && tbody;
            
                if (isRegularTable) {
                    // Regular table handling code would go here
                    // Not critical for our current focus...
                }
            
                // Process as a standard complex table if not hierarchical or regular
                let titleRow = null;
                let headerRow = null;
                let dataStartIndex = 0;
                
                try {
                    // Get first row and check for title
                    const firstRow = table.rows[0];
                    const firstCell = firstRow?.cells?.[0];
                    
                    // Calculate total columns for proper title detection
                    let totalColumns = 0;
                    if (firstRow && firstRow.cells) {
                        for (let i = 0; i < firstRow.cells.length; i++) {
                            const cell = firstRow.cells[i];
                            if (!cell) continue;
                            totalColumns += parseInt(cell.getAttribute('colspan')) || 1;
                        }
                    }
                    
                    // CRITICAL FIX: Default to treating all rows as data unless proven otherwise
                    headerRow = null;
                    dataStartIndex = 0;
                    
                    if (firstCell) {
                        const colspan = parseInt(firstCell.getAttribute('colspan')) || 1;
                        
                        // CASE 1: First cell spans most/all columns (>= 70%) - it's a title row
                        if (colspan > 1 && totalColumns > 0 && (colspan / totalColumns >= 0.7)) {
                            titleRow = firstRow;
                            
                            // The second row is likely the header row
                            if (table.rows.length > 1) {
                                headerRow = table.rows[1];
                                dataStartIndex = 2;
                            } else {
                                dataStartIndex = 1;
                            }
                        } 
                        // CASE 2: First row has TH elements OR has positional header structure
                        else {
                            // Check if first row has any TH elements
                            const hasTH = Array.from(firstRow.cells || []).some(cell => 
                                cell && cell.tagName && cell.tagName.toLowerCase() === 'th');
                            
                            // NEW: Check for positional header structure
                            // Check if the table has a traditional header structure with empty top-left cell
                            const hasEmptyTopLeftCell = firstCell && 
                                (firstCell.textContent.trim() === "" || 
                                 firstCell.innerHTML.trim() === "&nbsp;" ||
                                 firstCell.innerHTML.trim() === "");
                            
                            // A table has a header row if:
                            // 1. First row has TH elements, OR
                            // 2. First row has cells with styling that appears to be headers
                            const hasTableHeaderStructure = firstRow && firstRow.cells && 
                                firstRow.cells.length > 1 && 
                                (hasEmptyTopLeftCell || firstCell.style?.backgroundColor);
                            
                            // ONLY treat as header if it has TH elements OR positional header structure
                            if (hasTH || hasTableHeaderStructure) {
                                headerRow = firstRow;
                                dataStartIndex = 1;
                                logger.logProcessor && logger.logProcessor('Identified header row', {
                                    byTH: hasTH,
                                    byPosition: hasTableHeaderStructure && !hasTH,
                                    dataStartIndex: dataStartIndex
                                });
                            } else {
                                // CASE 3: Standard data table - ALL rows are data, no header
                                dataStartIndex = 0;
                                headerRow = null;
                            }
                        }
                    } else {
                        // Default fallback if no cells found
                        dataStartIndex = 0;
                    }
                } catch (error) {
                    if (!isLargeBatch) {
                        logger.error && logger.error('Error analyzing table structure', {
                            message: error?.message || 'Unknown error'
                        });
                    }
                    // Default values if error occurs - treat all rows as data
                    headerRow = null;
                    dataStartIndex = 0;
                }
                
                // STEP 1: Create comprehensive table matrix with correct cell tracking
                let matrix = [];
                
                try {
                    // First determine maximum columns to ensure matrix is large enough
                    let maxCols = 0;
                    for (let i = 0; i < table.rows.length; i++) {
                        let colCount = 0;
                        const row = table.rows[i];
                        if (!row || !row.cells) continue;
                        
                        for (let j = 0; j < row.cells.length; j++) {
                            const cell = row.cells[j];
                            if (!cell) continue;
                            const colspan = parseInt(cell.getAttribute('colspan')) || 1;
                            colCount += colspan;
                        }
                        
                        maxCols = Math.max(maxCols, colCount);
                    }
                    
                    // Initialize matrix with appropriate size
                    for (let i = 0; i < table.rows.length; i++) {
                        matrix[i] = new Array(maxCols).fill(null);
                    }
                    
                    // Fill the matrix with cell information, properly tracking spans
                    for (let rowIndex = 0; rowIndex < table.rows.length; rowIndex++) {
                        const row = table.rows[rowIndex];
                        if (!row || !row.cells) continue;
                        
                        let colIndex = 0;
                        
                        for (let cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
                            const cell = row.cells[cellIndex];
                            if (!cell) continue;
                            
                            // Skip positions already covered by rowspan
                            while (colIndex < maxCols && matrix[rowIndex][colIndex] !== null) {
                                colIndex++;
                            }
                            
                            if (colIndex >= maxCols) break;
                            
                            // Get rowspan and colspan
                            const rowspan = parseInt(cell.getAttribute('rowspan')) || 1;
                            const colspan = parseInt(cell.getAttribute('colspan')) || 1;
                            
                            // Enhanced cell content analysis using the normalizer function
                            const normalizedContent = normalizeTableCellContent(cell);
                            
                            // Check if this table has a true row header structure
                            // We need to determine if the first column is a header column or a data column
                            const hasEmptyTopLeftCell = table.rows[0]?.cells[0]?.textContent?.trim() === "" || 
                                                       table.rows[0]?.cells[0]?.innerHTML?.trim() === "&nbsp;" ||
                                                       table.rows[0]?.cells[0]?.innerHTML?.trim() === "";
                            
                            // Only treat first column as header column if:
                            // 1. The top-left cell is empty (traditional row/column header structure)
                            // 2. OR the cell has 'th' tag or other semantic header indicators
                            const isFirstColumnCell = cellIndex === 0 || colIndex === 0;
                            const isHeaderByPosition = isFirstColumnCell && 
                                                      rowIndex >= dataStartIndex && 
                                                      hasEmptyTopLeftCell;
                            
                            // Create cell info object with ALL data - content agnostic approach
                            const cellInfo = {
                                content: normalizedContent.content,
                                text: normalizedContent.text,
                                rawHTML: normalizedContent.content,
                                rowspan: rowspan,
                                colspan: colspan,
                                // Only consider position-based headers when we have a true row header structure
                                isHeader: cell.tagName.toLowerCase() === 'th' || isHeaderByPosition,
                                // Add flag to distinguish positional headers from tag-based
                                isPositionalHeader: isHeaderByPosition && cell.tagName.toLowerCase() !== 'th',
                                originalRowIndex: rowIndex,
                                originalColIndex: colIndex,
                                cellIndex: cellIndex,
                                element: cell,
                                id: `${rowIndex}-${colIndex}`, // Unique identifier
                                // Content analysis properties from normalized content
                                hasImages: normalizedContent.hasImages,
                                hasParagraphs: normalizedContent.hasParagraphs,
                                hasDivs: normalizedContent.hasDivs,
                                hasLists: normalizedContent.hasLists,
                                hasLinks: normalizedContent.hasLinks,
                                hasRichContent: normalizedContent.hasRichContent,
                                hasWrappedParagraphs: normalizedContent.hasWrappedParagraphs,
                                hasDirectContent: normalizedContent.hasDirectContent,
                                contentType: normalizedContent.contentType,
                                // Style properties from the element
                                backgroundColor: cell.style?.backgroundColor || '',
                                textAlign: cell.style?.textAlign || '',
                                verticalAlign: cell.style?.verticalAlign || '',
                                // Additional metadata
                                attributes: Array.from(cell.attributes || []).reduce((obj, attr) => {
                                    obj[attr.name] = attr.value;
                                    return obj;
                                }, {}),
                            };
                            
                            // Fill all affected positions with the SAME cell reference
                            for (let rs = 0; rs < rowspan; rs++) {
                                const targetRow = rowIndex + rs;
                                if (targetRow >= table.rows.length) break;
                                
                                for (let cs = 0; cs < colspan; cs++) {
                                    const targetCol = colIndex + cs;
                                    if (targetCol >= maxCols) break;
                                    
                                    matrix[targetRow][targetCol] = cellInfo;
                                }
                            }
                            
                            // Move to the next available position
                            colIndex += colspan;
                        }
                    }
                } catch (matrixError) {
                    if (!isLargeBatch) {
                        logger.error && logger.error('Error creating enhanced table matrix', {
                            message: matrixError?.message || 'Unknown error',
                            stack: matrixError?.stack || new Error().stack
                        });
                    }
                    // Fallback to empty matrix
                    matrix = [];
                }
                
                if (!matrix.length) {
                    if (!isLargeBatch) {
                        logger.logProcessor && logger.logProcessor('Failed to create table matrix, aborting processing');
                        if (processingTimer && logger.endTimer) logger.endTimer(processingTimer);
                    }
                    return null;
                }
            
                // STEP 2: Build a map of column header cells with correct column numbering
                const headerCells = [];
                
                // If no header row is defined, create dummy header cells based on first data row
                if (!headerRow) {
                    // Find first data row that has cells
                    let firstDataRow = null;
                    for (let i = dataStartIndex; i < table.rows.length; i++) {
                        if (table.rows[i] && table.rows[i].cells && table.rows[i].cells.length > 0) {
                            firstDataRow = table.rows[i];
                            break;
                        }
                    }
                    
                    // Create header cells based on column count
                    if (firstDataRow) {
                        // Start from column 1 to match data processing (column 0 is row title)
                        for (let i = 1; i < firstDataRow.cells.length; i++) {
                            headerCells[i] = {
                                text: `Column ${i}`,
                                html: `Column ${i}`,
                                hasRichContent: false,
                                position: i,
                                originalIndex: i
                            };
                        }
                    }
                }
                else if (headerRow && headerRow.cells) {
                    let colPosition = 0;
                    
                    // Check if the first cell is a structural element (row title placeholder)
                    // This handles tables where first column contains row titles
                    const firstHeaderCell = headerRow.cells[0];
                    
                    // Only consider the first cell as structural if:
                    // 1. It has semantic header indicators (th, scope, etc.)
                    // 2. OR it's empty (traditional row/column header structure)
                    const isFirstCellEmpty = firstHeaderCell && 
                        (firstHeaderCell.textContent.trim() === "" ||
                         firstHeaderCell.innerHTML.trim() === "&nbsp;" ||
                         firstHeaderCell.innerHTML.trim() === "");
                         
                    const isFirstCellStructural = firstHeaderCell && 
                        (firstHeaderCell.tagName.toLowerCase() === 'th' || 
                            firstHeaderCell.hasAttribute('scope') ||
                            firstHeaderCell.getAttribute('role') === 'rowheader' ||
                            // Consider empty first cell as structural, but not cells with content
                            isFirstCellEmpty);
                    
                    // Track actual column position for proper numbering
                    let actualColumnIndex = 0;
                    
                    for (let j = 0; j < headerRow.cells.length; j++) {
                        const cell = headerRow.cells[j];
                        if (!cell) continue;
                        
                        // Skip positions already handled by rowspan
                        while (colPosition < matrix[0].length && 
                                matrix[headerRow.rowIndex] && 
                                matrix[headerRow.rowIndex][colPosition] && 
                                matrix[headerRow.rowIndex][colPosition].originalColIndex !== colPosition) {
                            colPosition++;
                        }
                        
                        if (colPosition >= matrix[0].length) break;
                        
                        const colspan = parseInt(cell.getAttribute('colspan')) || 1;
                        
                        // For the first cell, special handling if it's a structural element (not a real column header)
                        if (j === 0 && isFirstCellStructural) {
                            // Skip treating this as a column header
                            colPosition += colspan;
                            continue;
                        }
                        
                        // Get the actual header content from the cell - preserve both HTML and text
                        const normalizedContent = normalizeTableCellContent(cell);
                        const headerText = normalizedContent.text || `Column ${actualColumnIndex + 1}`;
                        const headerHTML = normalizedContent.content || headerText;
                        
                        // Store header for each column affected by colspan
                        for (let c = 0; c < colspan; c++) {
                            headerCells[colPosition + c] = {
                                cell: cell,
                                text: headerText,
                                html: headerHTML,
                                hasRichContent: normalizedContent.hasRichContent,
                                originalIndex: j,
                                position: colPosition + c
                            };
                        }
                        
                        colPosition += colspan;
                        actualColumnIndex++; // Increment for next column naming
                    }
                }
                
                // If we still don't have headers, create defaults
                if (headerCells.length === 0) {
                    // Generate sequential column headers (Column 1, Column 2, etc.)
                    for (let i = 0; i < (matrix[0] ? matrix[0].length : 0); i++) {
                        headerCells[i] = {
                            text: `Column ${i + 1}`,
                            html: `Column ${i + 1}`,
                            hasRichContent: false,
                            position: i,
                            originalIndex: i
                        };
                    }
                }
            
                // STEP 3: Process data rows with improved rowspan/colspan handling
                const results = [];
                const rowGroups = new Map(); // Track row groupings for hierarchy
                const childRowParents = new Map(); // Track child rows and their parents
                
                try {
                    // First pass: identify parent-child row relationships from rowspan
                    for (let rowIndex = dataStartIndex; rowIndex < table.rows.length; rowIndex++) {
                        if (!matrix[rowIndex] || !matrix[rowIndex][0]) continue;
                        
                        const firstCell = matrix[rowIndex][0];
                        
                        // If this is the original row for first cell
                        if (firstCell.originalRowIndex === rowIndex) {
                            // This is a parent/main row
                            rowGroups.set(rowIndex, {
                                title: firstCell.text,
                                titleHTML: firstCell.content,
                                hasRichTitle: firstCell.hasRichContent,
                                childRows: [],
                                rowspan: firstCell.rowspan
                            });
                            
                            // Register child rows if this cell has rowspan
                            if (firstCell.rowspan > 1) {
                                for (let r = 1; r < firstCell.rowspan; r++) {
                                    const childRowIndex = rowIndex + r;
                                    if (childRowIndex < table.rows.length) {
                                        rowGroups.get(rowIndex).childRows.push(childRowIndex);
                                        childRowParents.set(childRowIndex, rowIndex);
                                    }
                                }
                            }
                        }
                    }
                    
                    // Second pass: process each row group
                    for (let rowIndex = dataStartIndex; rowIndex < table.rows.length; rowIndex++) {
                        // Skip child rows - they'll be processed with their parents
                        if (childRowParents.has(rowIndex)) continue;
                        
                        // Get row title and content from first cell - preserve both text and HTML
                        const firstCell = matrix[rowIndex] && matrix[rowIndex][0] 
                            ? matrix[rowIndex][0] : null;
                            
                        // CRITICAL CHANGE: Always use both text and HTML content for row titles
                        // This ensures all HTML structure is preserved regardless of format
                        const rowTitle = firstCell ? firstCell.text : `Row ${rowIndex}`;
                        const rowTitleHTML = firstCell ? firstCell.content : `Row ${rowIndex}`;
                        const rowHasRichContent = firstCell ? firstCell.hasRichContent : false;
                        
                        // Create the row result object with both text and HTML content
                        const rowResult = {
                            rowTitle: rowTitle,
                            rowTitleHTML: rowTitleHTML, // Always include HTML version
                            hasRichTitle: rowHasRichContent,
                            columns: [],
                            // Add detailed content analysis for advanced rendering
                            titleAnalysis: {
                                hasImages: firstCell ? firstCell.hasImages : false,
                                hasParagraphs: firstCell ? firstCell.hasParagraphs : false,
                                hasDivs: firstCell ? firstCell.hasDivs : false,
                                hasLists: firstCell ? firstCell.hasLists : false,
                                hasLinks: firstCell ? firstCell.hasLinks : false,
                                contentType: firstCell ? firstCell.contentType : 'empty',
                                hasWrappedParagraphs: firstCell ? firstCell.hasWrappedParagraphs : false,
                                hasDirectContent: firstCell ? firstCell.hasDirectContent : false
                            }
                        };
                        
                        // Get all rows to process (this row + any child rows)
                        const rowsToProcess = [rowIndex];
                        if (rowGroups.has(rowIndex)) {
                            rowsToProcess.push(...rowGroups.get(rowIndex).childRows);
                        }
                        
                        // Track processed cells to avoid duplicates
                        const processedCells = new Set();
                        
                        // Track all column values by title
                        const columnValuesByTitle = new Map();
                        
                        // Process all rows in this group
                        for (const currentRowIndex of rowsToProcess) {
                            if (!matrix[currentRowIndex]) continue;
                            
                            // Process each column (starting from 1 to skip row title)
                            for (let colIndex = 1; colIndex < matrix[currentRowIndex].length; colIndex++) {
                                const cellInfo = matrix[currentRowIndex][colIndex];
                                if (!cellInfo) continue;
                                
                                // Create unique ID for this cell
                                const cellId = `${cellInfo.originalRowIndex}-${cellInfo.originalColIndex}`;
                                
                                // Skip if already processed
                                if (processedCells.has(cellId)) continue;
                                
                                // Mark as processed
                                processedCells.add(cellId);
                                
                                // Get column title and HTML from headerCells
                                const columnHeader = headerCells[colIndex] || {
                                    text: `Column ${colIndex}`,
                                    html: `Column ${colIndex}`,
                                    hasRichContent: false
                                };
                                
                                const columnTitle = columnHeader.text;
                                const columnTitleHTML = columnHeader.html;
                                
                                // Add to column values map with both text and HTML content
                                if (!columnValuesByTitle.has(columnTitle)) {
                                    columnValuesByTitle.set(columnTitle, {
                                        values: [],
                                        htmlValues: [],
                                        columnTitleHTML: columnTitleHTML,
                                        hasRichHeader: columnHeader.hasRichContent,
                                        contentAnalysis: []
                                    });
                                }
                                
                                // Add cell content - preserve both text and HTML
                                columnValuesByTitle.get(columnTitle).values.push(cellInfo.text);
                                columnValuesByTitle.get(columnTitle).htmlValues.push(cellInfo.content);
                                
                                // Add detailed content analysis for this cell
                                columnValuesByTitle.get(columnTitle).contentAnalysis.push({
                                    hasImages: cellInfo.hasImages,
                                    hasParagraphs: cellInfo.hasParagraphs,
                                    hasDivs: cellInfo.hasDivs,
                                    hasLists: cellInfo.hasLists,
                                    hasLinks: cellInfo.hasLinks,
                                    hasRichContent: cellInfo.hasRichContent,
                                    contentType: cellInfo.contentType,
                                    isEmpty: !cellInfo.text && !cellInfo.content,
                                    hasWrappedParagraphs: cellInfo.hasWrappedParagraphs,
                                    hasDirectContent: cellInfo.hasDirectContent
                                });
                                
                                // Handle colspan - add same content to all affected columns
                                if (cellInfo.colspan > 1) {
                                    // Find all affected column positions
                                    for (let c = 1; c < cellInfo.colspan; c++) {
                                        const spannedColIndex = cellInfo.originalColIndex + c;
                                        if (spannedColIndex >= matrix[currentRowIndex].length) break;
                                        
                                        // Get the title for this affected column
                                        const spannedHeader = headerCells[spannedColIndex] || {
                                            text: `Column ${spannedColIndex}`,
                                            html: `Column ${spannedColIndex}`,
                                            hasRichContent: false
                                        };
                                        
                                        const spannedTitle = spannedHeader.text;
                                        const spannedTitleHTML = spannedHeader.html;
                                        
                                        // Only create separate entries for different column titles
                                        if (spannedTitle !== columnTitle) {
                                            if (!columnValuesByTitle.has(spannedTitle)) {
                                                columnValuesByTitle.set(spannedTitle, {
                                                    values: [],
                                                    htmlValues: [],
                                                    columnTitleHTML: spannedTitleHTML,
                                                    hasRichHeader: spannedHeader.hasRichContent,
                                                    contentAnalysis: []
                                                });
                                            }
                                            
                                            // Add same content to this column - preserve both text and HTML
                                            columnValuesByTitle.get(spannedTitle).values.push(cellInfo.text);
                                            columnValuesByTitle.get(spannedTitle).htmlValues.push(cellInfo.content);
                                            
                                            // Copy the content analysis
                                            columnValuesByTitle.get(spannedTitle).contentAnalysis.push({
                                                hasImages: cellInfo.hasImages,
                                                hasParagraphs: cellInfo.hasParagraphs,
                                                hasDivs: cellInfo.hasDivs,
                                                hasLists: cellInfo.hasLists,
                                                hasLinks: cellInfo.hasLinks,
                                                hasRichContent: cellInfo.hasRichContent,
                                                contentType: cellInfo.contentType,
                                                isEmpty: !cellInfo.text && !cellInfo.content,
                                                hasWrappedParagraphs: cellInfo.hasWrappedParagraphs,
                                                hasDirectContent: cellInfo.hasDirectContent
                                            });
                                        }
                                        
                                        // Mark this position as processed
                                        processedCells.add(`${cellInfo.originalRowIndex}-${spannedColIndex}`);
                                    }
                                }
                            }
                        }
                        
                        // Convert column values map to array of column objects with rich content preservation
                        for (const [title, columnData] of columnValuesByTitle.entries()) {
                            const hasAnyRichContent = columnData.contentAnalysis.some(analysis => analysis.hasRichContent);
                            
                            rowResult.columns.push({
                                columnTitle: title,
                                columnTitleHTML: columnData.columnTitleHTML,
                                hasRichHeader: columnData.hasRichHeader,
                                values: columnData.values,
                                htmlValues: columnData.htmlValues, // Preserve HTML content
                                hasRichContent: hasAnyRichContent,
                                contentAnalysis: columnData.contentAnalysis
                            });
                        }
                        
                        // Sort columns by their matching header position
                        rowResult.columns.sort((a, b) => {
                            const posA = Array.from(headerCells).findIndex(h => h && h.text === a.columnTitle);
                            const posB = Array.from(headerCells).findIndex(h => h && h.text === b.columnTitle);
                            return posA - posB;
                        });
                        
                        // Only add rows with column data
                        if (rowResult.columns.length > 0) {
                            results.push(rowResult);
                        }
                    }
                } catch (rowProcessError) {
                    if (!isLargeBatch) {
                        logger.error && logger.error('Error during enhanced row processing', {
                            message: rowProcessError?.message || 'Unknown error',
                            stack: rowProcessError?.stack || new Error().stack
                        });
                    }
                }
            
                // STEP 4: Return results with title if present
                let finalResult;
                if (titleRow && titleRow.cells && titleRow.cells.length > 0) {
                    try {
                        const titleCell = titleRow.cells[0];
                        const normalizedTitle = normalizeTableCellContent(titleCell);
                        
                        finalResult = {
                            title: normalizedTitle.text,
                            titleHTML: normalizedTitle.content, // Preserve HTML in title
                            hasRichTitle: normalizedTitle.hasRichContent,
                            titleAnalysis: {
                                hasImages: normalizedTitle.hasImages,
                                hasParagraphs: normalizedTitle.hasParagraphs,
                                hasDivs: normalizedTitle.hasDivs,
                                hasLists: normalizedTitle.hasLists,
                                hasLinks: normalizedTitle.hasLinks
                            },
                            items: results
                        };
                    } catch (titleError) {
                        if (!isLargeBatch) {
                            logger.error && logger.error('Error creating result with title', {
                                message: titleError?.message || 'Unknown error'
                            });
                        }
                        finalResult = results;
                    }
                } else {
                    finalResult = results;
                }
                
                // Log complete structure before returning
                try {
                    if (typeof this.logCompleteTableStructure === 'function' && !isLargeBatch) {
                        this.logCompleteTableStructure(table, matrix, finalResult, logger);
                    }
                } catch (logError) {
                    // Ignore logging errors
                }
                
                // Clean up and return
                if (processingTimer && logger.endTimer) {
                    try {
                        logger.endTimer(processingTimer);
                    } catch (timerError) {}
                }
                
                return finalResult;
            },

            /**
             * Logs the complete structure of a table for debugging purposes
             * Captures rows, columns, cells, and span relationships
             * 
             * @param {HTMLElement} table - The table to analyze
             * @param {Array} matrix - The processed table matrix
             * @param {Object} result - The processing result
             * @param {Object} logger - Logger instance
             */
            logCompleteTableStructure: function(table, matrix, result, inputLogger) {
                const TC = window.TableConverter;
                const logger = inputLogger || (TC?.logger ? TC.logger.ensureSafeLogger(TC.logger) : console);
                const CONFIG = TC?.CONFIG || {};
                const shouldLogProcessor = CONFIG.debug?.logProcessors === true;
                
                if (!shouldLogProcessor) {
                    return; // Skip logging if not enabled
                }
                
                logger.groupStart && logger.groupStart("=== COMPLETE TABLE STRUCTURE ===");
                
                // Basic table info
                const tableInfo = {
                    rows: table.rows?.length || 0,
                    hasTheadTbody: !!(table.querySelector && table.querySelector('thead') && table.querySelector('tbody')),
                    thCellCount: table.querySelectorAll ? table.querySelectorAll('th').length : 0,
                    totalCellCount: table.querySelectorAll ? table.querySelectorAll('td, th').length : 0
                };
                
                logger.logProcessor('Table structure overview', tableInfo);
                
                // Log matrix structure if available
                if (matrix && matrix.length > 0) {
                    // Count cells with rowspan/colspan
                    let rowspanCount = 0;
                    let colspanCount = 0;
                    
                    const rowsInfo = [];
                    
                    for (let i = 0; i < matrix.length; i++) {
                        const row = matrix[i];
                        const rowCells = [];
                        
                        for (let j = 0; j < row.length; j++) {
                            const cell = row[j];
                            if (!cell) continue;
                            
                            // Count spans
                            if (cell.rowspan > 1) rowspanCount++;
                            if (cell.colspan > 1) colspanCount++;
                            
                            // Only add original cells (not duplicates from span)
                            if (cell.originalRowIndex === i && cell.originalColIndex === j) {
                                rowCells.push({
                                    position: j,
                                    content: cell.text ? cell.text.substring(0, 30) : '',
                                    isHeader: cell.isHeader,
                                    rowspan: cell.rowspan,
                                    colspan: cell.colspan
                                });
                            }
                        }
                        
                        rowsInfo.push({
                            rowIndex: i,
                            cells: rowCells
                        });
                    }
                    
                    logger.logProcessor('Matrix structure', {
                        rowCount: matrix.length,
                        colCount: matrix[0]?.length || 0,
                        rowspanCells: rowspanCount,
                        colspanCells: colspanCount,
                        rowsInfo: rowsInfo
                    });
                }
                
                // Log processed result structure
                if (result) {
                    const resultStats = {
                        hasTitle: !!result.title,
                        title: result.title || 'No title',
                        itemCount: Array.isArray(result) ? result.length : (result.items?.length || 0),
                        structure: 'Flat array'
                    };
                    
                    if (result.items) {
                        resultStats.structure = 'Object with items array';
                        
                        // Analyze the first few items
                        const sampleItems = result.items.slice(0, 3).map(item => ({
                            rowTitle: item.rowTitle,
                            columnCount: item.columns?.length || 0,
                            columns: item.columns?.slice(0, 3).map(col => ({
                                title: col.columnTitle,
                                values: col.values?.length > 0 ? 
                                    col.values.map(v => typeof v === 'string' ? v.substring(0, 20) : 'non-string').slice(0, 3) : 
                                    []
                            }))
                        }));
                        
                        resultStats.sampleItems = sampleItems;
                    } else if (Array.isArray(result) && result.length > 0) {
                        // Analyze the first few items
                        const sampleItems = result.slice(0, 3).map(item => ({
                            rowTitle: item.rowTitle,
                            columnCount: item.columns?.length || 0,
                            columns: item.columns?.slice(0, 3).map(col => ({
                                title: col.columnTitle,
                                values: col.values?.length > 0 ? 
                                    col.values.map(v => typeof v === 'string' ? v.substring(0, 20) : 'non-string').slice(0, 3) : 
                                    []
                            }))
                        }));
                        
                        resultStats.sampleItems = sampleItems;
                    }
                    
                    logger.logProcessor('Result structure', resultStats);
                }
                
                logger.groupEnd && logger.groupEnd();
            },
        },

        /**
         * Comprehensive table processing function - the core conversion engine
         * 
         * This function serves as the central analysis and transformation hub for all table types.
         * It employs a multi-stage, fallback-oriented approach to handle tables of any structure:
         * 
         * 1. VALIDATION: Ensures the table exists and contains actual content
         * 2. SINGLE-ROW HANDLING: Special processing for edge case tables with only one row
         * 3. HIERARCHICAL DETECTION: Identifies complex hierarchical tables (like financial reports)
         * 4. STRUCTURED TABLE PROCESSING: Handles regular tables with thead/tbody separation
         * 5. GENERAL TABLE PROCESSING: Fallback for all other table types with flexible analysis
         * 
         * The function extracts meaningful structure from any table type without making content
         * assumptions. It builds a consistent data structure for rendering by:
         * - Identifying title content when present
         * - Extracting header information for column identification
         * - Preserving row/column relationships while normalizing the structure
         * - Maintaining rowspan/colspan integrity
         * 
         * Each processing stage has comprehensive error handling to ensure the conversion pipeline
         * continues even if parts of the table are problematic.
         * 
         * @param {HTMLElement} table - The source table DOM element to process
         * @returns {Object|Array} Structured data ready for rendering to mobile-friendly format
         */
        detectHeaderBoundaries: function(table) {
            // Use logger if available
            const TC = window.TableConverter;
            const logger = TC?.logger ? TC.logger.ensureSafeLogger(TC.logger) : console;
            const CONFIG = TC?.CONFIG || {};
            const shouldLog = CONFIG.debug?.logAnalysis === true;
            
            if (shouldLog) {
                logger.groupStart && logger.groupStart("==== DETECT HEADER BOUNDARIES ====");
                logger.logAnalysis('Starting header boundaries detection');
                
                // LOG COMPLETE TABLE STRUCTURE
                logger.logAnalysis('COMPLETE TABLE STRUCTURE', {
                    exists: !!table,
                    tagName: table ? table.tagName : 'undefined',
                    id: table ? (table.id || 'no-id') : 'undefined',
                    rowCount: table && table.rows ? table.rows.length : 0,
                    hasThead: table && table.querySelector ? !!table.querySelector('thead') : false,
                    hasTbody: table && table.querySelector ? !!table.querySelector('tbody') : false
                });
            }
            
            // Validate input
            if (!table || !table.rows) {
                if (shouldLog) {
                    logger.logAnalysis('Invalid table, returning empty boundaries');
                    logger.groupEnd && logger.groupEnd();
                }
                return {
                    headerEndIndex: 0,
                    dataStartIndex: 0,
                    dataColumnStart: 0
                };
            }
            
            // PHASE 1: Find where header rows end (first row with TD cells)
            if (shouldLog) {
                logger.groupStart && logger.groupStart("1. Finding Header End Index");
            }
            
            let headerEndIndex = 0;
            for (let i = 0; i < table.rows.length; i++) {
                const row = table.rows[i];
                if (!row || !row.cells) continue;
                
                // Check if this row has any TD elements
                let hasTdCell = false;
                for (let j = 0; j < row.cells.length; j++) {
                    const cell = row.cells[j];
                    if (cell && cell.tagName && cell.tagName.toLowerCase() === 'td') {
                        hasTdCell = true;
                        break;
                    }
                }
                    
                if (hasTdCell) {
                    headerEndIndex = i;
                    if (shouldLog) {
                        logger.logAnalysis('Found first row with TD cells', {
                            rowIndex: i,
                            cellCount: row.cells.length,
                            rowData: Array.from(row.cells).map((cell, idx) => ({
                                idx,
                                type: cell.tagName,
                                text: cell.textContent?.trim().substring(0, 30) || 'empty'
                            }))
                        });
                    }
                    break;
                }
            }
            
            // If no TD cells found, assume all rows are headers
            if (headerEndIndex === 0 && table.rows.length > 0) {
                headerEndIndex = table.rows.length;
                if (shouldLog) {
                    logger.logAnalysis('No TD cells found, all rows are headers', {
                        rowCount: table.rows.length
                    });
                }
                
                const returnValue = {
                    headerEndIndex: headerEndIndex,
                    dataStartIndex: headerEndIndex,
                    dataColumnStart: 0
                };
                
                if (shouldLog) {
                    logger.logAnalysis('Returning header boundaries', returnValue);
                    logger.groupEnd && logger.groupEnd();
                    logger.groupEnd && logger.groupEnd();
                }
                return returnValue;
            }
            
            if (shouldLog) {
                logger.groupEnd && logger.groupEnd(); // End finding header end index
            }
            
            // PHASE 2: Create matrix for accurate position tracking
            if (shouldLog) {
                logger.groupStart && logger.groupStart("2. Creating Table Matrix");
            }
            
            // Create the table matrix
            const matrix = this.createTableMatrix(table);
            if (shouldLog) {
                logger.logAnalysis('Created table matrix', {
                    rows: matrix ? matrix.length : 0,
                    columns: matrix && matrix.length > 0 ? matrix[0].length : 0
                });
                
                logger.groupEnd && logger.groupEnd(); // End creating table matrix
            }
            
            // PHASE 3: Analyze first data row structure
            if (shouldLog) {
                logger.groupStart && logger.groupStart("3. Finding Data Column Start Position");
            }
            
            let dataColumnStart = 0;
            let lastThCell = null;
            
            if (headerEndIndex < table.rows.length) {
                const firstDataRow = table.rows[headerEndIndex];
                if (shouldLog) {
                    logger.logAnalysisDetail && logger.logAnalysisDetail('Analyzing first data row', {
                        rowIndex: headerEndIndex,
                        cellCount: firstDataRow?.cells?.length || 0,
                        rowData: Array.from(firstDataRow?.cells || []).map((cell, idx) => ({
                            idx,
                            type: cell.tagName,
                            text: cell.textContent?.trim().substring(0, 30) || 'empty',
                            colspan: parseInt(cell.getAttribute('colspan') || '1'),
                            rowspan: parseInt(cell.getAttribute('rowspan') || '1')
                        }))
                    });
                }
                
                if (firstDataRow && firstDataRow.cells) {
                    // Count TH cells to understand structure
                    const thCells = [];
                    const tdCells = [];
                    
                    // Calculate effective positions considering colspans
                    let position = 0;
                    let lastThPosition = -1;
                    
                    for (let i = 0; i < firstDataRow.cells.length; i++) {
                        const cell = firstDataRow.cells[i];
                        if (!cell) continue;
                        
                        const isStructural = cell.tagName.toLowerCase() === 'th';
                        const colspan = parseInt(cell.getAttribute('colspan')) || 1;
                        
                        if (isStructural) {
                            const thCellInfo = {
                                index: i,
                                position: position,
                                colspan: colspan,
                                cell: cell,
                                text: cell.textContent?.trim() || ''
                            };
                            
                            thCells.push(thCellInfo);
                            lastThPosition = position + colspan - 1; // Last position covered by this TH
                            lastThCell = thCellInfo; // Save reference to last TH cell
                        } else {
                            tdCells.push({
                                index: i,
                                position: position,
                                colspan: colspan,
                                cell: cell,
                                text: cell.textContent?.trim() || ''
                            });
                        }
                        
                        position += colspan;
                    }
                    
                    if (shouldLog) {
                        logger.logAnalysisDetail && logger.logAnalysisDetail('Cell type distribution in first data row', {
                            thCount: thCells.length,
                            tdCount: tdCells.length,
                            lastThPosition: lastThPosition,
                            thCells: thCells.map(c => `[${c.index}] Pos ${c.position} "${c.text}"`),
                            tdCells: tdCells.map(c => `[${c.index}] Pos ${c.position} "${c.text}"`)
                        });
                    }
                    
                    // Find the first TD cell after the last TH cell
                    let firstTdAfterTh = null;
                    
                    for (const tdCell of tdCells) {
                        if (tdCell.position > lastThPosition) {
                            firstTdAfterTh = tdCell;
                            break;
                        }
                    }
                    
                    if (firstTdAfterTh) {
                        if (shouldLog) {
                            logger.logAnalysisDetail && logger.logAnalysisDetail('Found first TD after last TH', {
                                index: firstTdAfterTh.index,
                                position: firstTdAfterTh.position,
                                text: firstTdAfterTh.text,
                                isAfterLastTh: firstTdAfterTh.position === lastThPosition + 1
                            });
                        }
                        
                        // BUILD HEADER CONTEXT MAP using matrix-based approach
                        const headerContextMap = this.buildHeaderContextMap(table, headerEndIndex);
                        
                        if (shouldLog) {
                            logger.logAnalysisDetail && logger.logAnalysisDetail('Built header context map', {
                                mapSize: headerContextMap.size,
                                keyPositions: Array.from(headerContextMap.keys()).slice(0, 10) // First 10 positions
                            });
                            
                            // Detailed logging of header context for the TD position
                            if (headerContextMap.has(firstTdAfterTh.position)) {
                                const contextInfo = headerContextMap.get(firstTdAfterTh.position);
                                logger.logAnalysis('Header context for the first TD', {
                                    position: firstTdAfterTh.position,
                                    text: firstTdAfterTh.text,
                                    headerText: contextInfo.text || 'none',
                                    rowHeader: contextInfo.rowHeader || 'none',
                                    columnHeader: contextInfo.columnHeader || 'none',
                                    isRowOriented: contextInfo.isRowOriented || false,
                                    isColumnOriented: contextInfo.isColumnOriented || false
                                });
                            }
                        }
                        
                        // Use the enhanced isContentCell function
                        const isContentResult = this.isContentCell(
                            firstTdAfterTh, 
                            lastThPosition, 
                            headerContextMap, 
                            thCells.length,
                            lastThCell
                        );
                        
                        // Log the cell classification decision
                        if (shouldLog) {
                            logger.logAnalysis('Cell classification', {
                                position: firstTdAfterTh.position,
                                text: firstTdAfterTh.text,
                                isAfterLastTh: firstTdAfterTh.position === lastThPosition + 1,
                                thCount: thCells.length,
                                hasHeader: headerContextMap.has(firstTdAfterTh.position),
                                classification: isContentResult ? 'CONTENT CELL' : 'SUBLABEL'
                            });
                        }
                        
                        // Set dataColumnStart based on cell classification
                        if (!isContentResult) {
                            // This is a sublabel - data starts after it
                            const sublabelEndPos = firstTdAfterTh.position + firstTdAfterTh.colspan;
                            dataColumnStart = sublabelEndPos;
                            
                            if (shouldLog) {
                                logger.logAnalysis('TD identified as sublabel', {
                                    tdPosition: firstTdAfterTh.position,
                                    sublabelEndPos: sublabelEndPos,
                                    dataColumnStart: dataColumnStart
                                });
                            }
                        } else {
                            // This is a content cell - data starts here
                            dataColumnStart = firstTdAfterTh.position;
                            
                            if (shouldLog) {
                                logger.logAnalysis('TD identified as content cell', {
                                    position: firstTdAfterTh.position,
                                    dataColumnStart: dataColumnStart
                                });
                            }
                        }
                    } else {
                        // No TD after TH, use position after last TH
                        dataColumnStart = lastThPosition + 1;
                        
                        if (shouldLog) {
                            logger.logAnalysis('No TD after last TH, using position after last TH', {
                                lastThPosition: lastThPosition,
                                dataColumnStart: dataColumnStart
                            });
                        }
                    }
                }
            }
            
            if (shouldLog) {
                logger.groupEnd && logger.groupEnd(); // End finding data column start
            }
            
            // PHASE 4: Validate through column header structure in header rows
            if (shouldLog) {
                logger.groupStart && logger.groupStart("4. Column Alignment Validation");
            }
            
            // If appropriate headers exist, analyze them to validate our dataColumnStart
            if (headerEndIndex > 0) {
                // Get the last header row (likely contains leaf column headers)
                const lastHeaderRow = table.rows[headerEndIndex - 1];
                
                if (lastHeaderRow && lastHeaderRow.cells) {
                    const headerCellPositions = [];
                    let position = 0;
                    
                    // Map all header cell positions
                    for (let i = 0; i < lastHeaderRow.cells.length; i++) {
                        const cell = lastHeaderRow.cells[i];
                        if (!cell) continue;
                        
                        const colspan = parseInt(cell.getAttribute('colspan') || '1');
                        
                        headerCellPositions.push({
                            startPos: position,
                            endPos: position + colspan - 1,
                            cellIndex: i,
                            text: cell.textContent?.trim() || ''
                        });
                        
                        position += colspan;
                    }
                    
                    // Sort by position
                    headerCellPositions.sort((a, b) => a.startPos - b.startPos);
                    
                    if (shouldLog) {
                        logger.logAnalysisDetail && logger.logAnalysisDetail('Header cell positions for alignment validation', {
                            positions: headerCellPositions.map(p => ({
                                range: `${p.startPos}-${p.endPos}`,
                                text: p.text
                            }))
                        });
                    }
                    
                    // If our dataColumnStart doesn't align with a header cell boundary,
                    // we may need to adjust it
                    let alignedStart = false;
                    for (const headerPos of headerCellPositions) {
                        if (headerPos.startPos === dataColumnStart) {
                            alignedStart = true;
                            if (shouldLog) {
                                logger.logAnalysisDetail && logger.logAnalysisDetail('Data column start aligns with header cell boundary', {
                                    position: dataColumnStart,
                                    headerText: headerPos.text
                                });
                            }
                            break;
                        } else if (headerPos.startPos > dataColumnStart) {
                            // Found a header cell after our current dataColumnStart
                            // Only adjust if the current position doesn't make sense
                            const diffToNext = headerPos.startPos - dataColumnStart;
                            if (diffToNext <= 2) { // Small gap, might need alignment
                                if (shouldLog) {
                                    logger.logAnalysis('Adjusting dataColumnStart to align with header cell', {
                                        currentStart: dataColumnStart,
                                        headerCellStart: headerPos.startPos,
                                        difference: diffToNext,
                                        headerText: headerPos.text
                                    });
                                }
                                dataColumnStart = headerPos.startPos;
                            } else if (shouldLog) {
                                logger.logAnalysisDetail && logger.logAnalysisDetail('Gap to next header too large, keeping current position', {
                                    currentStart: dataColumnStart,
                                    nextHeaderStart: headerPos.startPos,
                                    difference: diffToNext
                                });
                            }
                            alignedStart = true;
                            break;
                        }
                    }
                    
                    // If no alignment found, keep the current value
                    if (!alignedStart && shouldLog) {
                        logger.logAnalysis('Keeping current dataColumnStart (no header alignment)', {
                            dataColumnStart: dataColumnStart
                        });
                    }
                }
            }
            
            // Make sure dataColumnStart is valid and positive
            if (dataColumnStart < 0) {
                dataColumnStart = 0;
                if (shouldLog) {
                    logger.logAnalysis('Correcting negative dataColumnStart to 0', {});
                }
            }
            
            if (shouldLog) {
                logger.groupEnd && logger.groupEnd(); // End column alignment validation
            }
            
            // Final boundary object
            const returnValue = {
                headerEndIndex: headerEndIndex,
                dataStartIndex: headerEndIndex,
                dataColumnStart: dataColumnStart
            };
            
            if (shouldLog) {
                logger.logAnalysis('Header boundaries detection complete', {
                    headerEndIndex: returnValue.headerEndIndex,
                    dataStartIndex: returnValue.dataStartIndex,
                    dataColumnStart: returnValue.dataColumnStart
                });
                
                logger.groupEnd && logger.groupEnd(); // End main group
            }
            return returnValue;
        },
        
        /**
         * Analyzes and identifies column hierarchies in complex tables
         * Critical for rendering multi-level header structures
         * 
         * @param {HTMLElement} table - The table to analyze
         * @param {Object} boundaries - Header boundary information
         * @returns {Object} Column hierarchy information
         */
        detectColumnHierarchy: function(table, boundaries) {
            const TC = window.TableConverter; 
            const logger = TC?.logger ? TC.logger.ensureSafeLogger(TC.logger) : console;
            const CONFIG = TC?.CONFIG || {};
            const shouldLog = CONFIG.debug?.logAnalysis === true;
            
            if (shouldLog) {
                logger.groupStart("==== DETECT COLUMN HIERARCHY (ENHANCED) ====");
                logger.logAnalysis('Starting title-agnostic column hierarchy detection');
            }
            
            // Input validation
            if (!table || !table.rows) {
                if (shouldLog) {
                    logger.logAnalysis('Invalid table input - early return');
                    logger.groupEnd();
                }
                return { hierarchies: new Map(), headerDepth: 0 };
            }
            
            // STEP 1: Create a normalized table view that excludes title if present
            let tableTitleCell = null;
            let titleRowIndex = -1;
            let titleAdjustedTable = table; // Default to original table
            
            // Check if first row is a title row (spans most/all columns)
            if (table.rows && table.rows.length > 0) {
                const firstRow = table.rows[0];
                if (firstRow && firstRow.cells && firstRow.cells.length === 1) {
                    const cell = firstRow.cells[0];
                    const colspan = parseInt(cell.getAttribute('colspan')) || 1;
                    const totalColumns = this.getTotalColumns(table);
                    
                    // Title detection: spans 70%+ of total columns
                    if (colspan > 1 && colspan / totalColumns > 0.7) {
                        tableTitleCell = cell;
                        titleRowIndex = 0;
                        if (shouldLog) {
                            logger.logAnalysis('Title row detected and will be excluded from hierarchy', {
                                titleText: cell.textContent?.trim() || '',
                                colspan,
                                totalColumns
                            });
                        }
                        
                        // Create a view that skips the title row
                        titleAdjustedTable = {
                            ...table,
                            rows: {
                                length: table.rows.length - 1,
                                item: function(index) {
                                    return table.rows[index + 1];
                                }
                            }
                        };
                        
                        // Add array-like indexing
                        for (let i = 0; i < titleAdjustedTable.rows.length; i++) {
                            titleAdjustedTable.rows[i] = table.rows[i + 1];
                        }
                    }
                }
            }
            
            // STEP 2: Detect boundaries on title-adjusted table if needed
            let adjustedBoundaries = boundaries;
            
            if (titleRowIndex >= 0 && boundaries) {
                // Adjust boundaries to account for removed title
                adjustedBoundaries = {
                    ...boundaries,
                    headerEndIndex: Math.max(0, boundaries.headerEndIndex - 1),
                    dataStartIndex: Math.max(0, boundaries.dataStartIndex - 1)
                };
                
                if (shouldLog) {
                    logger.logAnalysis('Adjusted boundaries after title removal', {
                        original: boundaries,
                        adjusted: adjustedBoundaries
                    });
                }
            } else if (!boundaries) {
                // If no boundaries provided, detect them on normalized table
                adjustedBoundaries = this.detectHeaderBoundaries(titleAdjustedTable);
            }
            
            // STEP 3: Create header matrix and track all cells properly
            const headerEndIndex = adjustedBoundaries.headerEndIndex || 0;
            const dataColumnStart = adjustedBoundaries.dataColumnStart || 0;
            
            // Initialize matrix to track cell positions accurately
            const cellMatrix = [];
            for (let i = 0; i < headerEndIndex; i++) {
                cellMatrix[i] = Array(100).fill(null); // Large enough for most tables
            }
            
            // Track header cell positions
            const headerCellsByPosition = new Map();
            let hasRowspans = false;
            let hasColspans = false;
            
            // Fill matrix with accurate cell positions from title-adjusted table
            for (let rowIndex = 0; rowIndex < headerEndIndex; rowIndex++) {
                const row = titleAdjustedTable.rows[rowIndex];
                if (!row || !row.cells) continue;
                
                let colPos = 0;
                
                // Skip cells already filled by rowspan
                while (colPos < cellMatrix[rowIndex].length && cellMatrix[rowIndex][colPos] !== null) {
                    colPos++;
                }
                
                for (let cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
                    const cell = row.cells[cellIndex];
                    if (!cell) continue;
                    
                    // Skip positions already covered by rowspan
                    while (colPos < cellMatrix[rowIndex].length && cellMatrix[rowIndex][colPos] !== null) {
                        colPos++;
                    }
                    
                    // Get cell properties
                    const rowspan = parseInt(cell.getAttribute('rowspan')) || 1;
                    const colspan = parseInt(cell.getAttribute('colspan')) || 1;
                    
                    if (rowspan > 1) hasRowspans = true;
                    if (colspan > 1) hasColspans = true;
                    
                    // Create cell info
                    const cellInfo = {
                        text: cell.textContent?.trim() || '',
                        html: cell.innerHTML || '',
                        rowspan: rowspan,
                        colspan: colspan,
                        rowIndex: rowIndex,
                        colIndex: colPos,
                        isHeader: cell.tagName.toLowerCase() === 'th',
                        element: cell,
                        colPosition: colPos,
                        isTopLevel: rowIndex === 0 // First row in title-adjusted view
                    };
                    
                    // Fill matrix positions
                    for (let r = 0; r < rowspan; r++) {
                        if (rowIndex + r < cellMatrix.length) {
                            for (let c = 0; c < colspan; c++) {
                                if (colPos + c < cellMatrix[rowIndex].length) {
                                    cellMatrix[rowIndex + r][colPos + c] = {
                                        cell,
                                        info: cellInfo,
                                        originalRow: rowIndex,
                                        originalCol: colPos,
                                        spannedByRow: r > 0,
                                        spannedByCol: c > 0
                                    };
                                }
                            }
                        }
                    }
                    
                    // Store cell info for each affected column
                    for (let c = 0; c < colspan; c++) {
                        const position = colPos + c;
                        
                        if (!headerCellsByPosition.has(position)) {
                            headerCellsByPosition.set(position, []);
                        }
                        
                        headerCellsByPosition.get(position).push(cellInfo);
                    }
                    
                    colPos += colspan;
                }
            }
            
            // STEP 4: Find data columns from content rows
            const dataColumns = new Set();
            
            // Use title-adjusted table for finding data columns
            for (let rowIndex = adjustedBoundaries.dataStartIndex; rowIndex < titleAdjustedTable.rows.length; rowIndex++) {
                const row = titleAdjustedTable.rows[rowIndex];
                if (!row || !row.cells) continue;
                
                let colPos = 0;
                
                for (let cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
                    const cell = row.cells[cellIndex];
                    if (!cell) continue;
                    
                    const colspan = parseInt(cell.getAttribute('colspan')) || 1;
                    
                    // If in data area, record all positions
                    if (colPos >= dataColumnStart) {
                        for (let c = 0; c < colspan; c++) {
                            dataColumns.add(colPos + c);
                        }
                    }
                    
                    colPos += colspan;
                }
            }
            
            const sortedDataColumns = Array.from(dataColumns).sort((a, b) => a - b);
            
            // STEP 5: Build hierarchical paths for each column
            const hierarchies = new Map();
            const topLevelHeaders = [];
            const leafHeaders = new Map();
            
            // Process each data column
            for (const colPos of sortedDataColumns) {
                // Get header cells for this column position
                const headerCells = headerCellsByPosition.get(colPos) || [];
                
                // Sort by row index to build proper path
                headerCells.sort((a, b) => a.rowIndex - b.rowIndex);
                
                // Build path for this column
                const path = [];
                const headerRows = new Set();
                
                for (const header of headerCells) {
                    headerRows.add(header.rowIndex);
                    
                    path.push({
                        text: header.text,
                        html: header.html,
                        level: header.rowIndex,
                        rowIndex: header.rowIndex,
                        colIndex: header.colIndex,
                        rowspan: header.rowspan,
                        colspan: header.colspan,
                        isTopLevel: header.isTopLevel,
                        isLeaf: false // Will be set later
                    });
                }
                
                // Add placeholder for empty paths
                if (path.length === 0) {
                    path.push({
                        text: `Column ${colPos - dataColumnStart + 1}`,
                        html: `<span>Column ${colPos - dataColumnStart + 1}</span>`,
                        level: 0,
                        isTopLevel: true,
                        isLeaf: true,
                        isPlaceholder: true
                    });
                }
                
                // Mark leaf nodes (deepest level)
                if (path.length > 0) {
                    const maxRow = Math.max(...Array.from(headerRows));
                    for (const node of path) {
                        if (node.rowIndex === maxRow) {
                            node.isLeaf = true;
                        }
                    }
                    
                    // Save leaf header
                    leafHeaders.set(colPos, path[path.length - 1].text);
                }
                
                // Store path
                hierarchies.set(colPos, path);
                
                if (shouldLog) {
                    logger.logAnalysisDetail(`Built path for column ${colPos}`, {
                        path: path.map(p => p.text).join(' > '),
                        levels: path.length
                    });
                }
            }
            
            // STEP 6: Calculate header depth
            // This is critical for hierarchy determination
            let headerDepth = 0;
            const allHeaderRows = new Set();
            
            for (const path of hierarchies.values()) {
                const rowsInPath = new Set();
                
                for (const node of path) {
                    if (node.rowIndex !== undefined) {
                        rowsInPath.add(node.rowIndex);
                        allHeaderRows.add(node.rowIndex);
                    }
                }
                
                headerDepth = Math.max(headerDepth, rowsInPath.size);
            }
            
            // STEP 7: Build top level headers for renderer
            const headerToColumns = new Map();
            
            for (const [colPos, path] of hierarchies.entries()) {
                if (path.length > 0) {
                    const topNode = path.find(p => p.isTopLevel) || path[0];
                    const headerText = topNode.text;
                    
                    if (!headerToColumns.has(headerText)) {
                        headerToColumns.set(headerText, []);
                    }
                    
                    headerToColumns.get(headerText).push(colPos);
                }
            }
            
            // Create formal top level header objects
            for (const [headerText, columns] of headerToColumns.entries()) {
                if (columns.length > 0) {
                    const startCol = Math.min(...columns);
                    const endCol = Math.max(...columns);
                    
                    topLevelHeaders.push({
                        text: headerText,
                        html: hierarchies.get(columns[0])[0].html || headerText,
                        startCol,
                        endCol,
                        colspan: endCol - startCol + 1,
                        level: 0,
                        isDataColumn: true
                    });
                }
            }
            
            if (shouldLog && CONFIG.debug?.logAnalysis) {                
                logger.logAnalysis('Title-agnostic column hierarchy complete', {
                    hierarchiesCount: hierarchies.size,
                    topLevelHeadersCount: topLevelHeaders.length,
                    dataColumnCount: sortedDataColumns.length,
                    headerDepth,
                    titleHandling: titleRowIndex >= 0 ? 'Title excluded' : 'No title detected'
                });
                
                logger.groupEnd();
            }
            
            return {
                hierarchies,
                dataColumnStart,
                topLevelHeaders,
                headerDepth,
                dataColumns: sortedDataColumns,
                hasRowspans,
                hasColspans,
                leafHeaders,
                tableTitleCell: tableTitleCell ? {
                    text: tableTitleCell.textContent?.trim() || '',
                    position: 0,
                    colspan: parseInt(tableTitleCell.getAttribute('colspan')) || 1
                } : null
            };
        },
        
        /**
         * Comprehensive table processing function - the core conversion engine
         * 
         * This function serves as the central analysis and transformation hub for all table types.
         * It employs a multi-stage, fallback-oriented approach to handle tables of any structure.
         * 
         * @param {HTMLElement} table - The source table DOM element to process
         * @returns {Object|Array} Structured data ready for rendering to mobile-friendly format
         */
        processCommon: function(table) {
            const TC = window.TableConverter;
            const logger = TC?.logger ? TC.logger.ensureSafeLogger(TC.logger) : console;
            const CONFIG = TC?.CONFIG || {};
            
            // For large batches, skip detailed logging
            const isLargeBatch = TC._tableProcessingCount > 20;
            const shouldLog = CONFIG.debug?.logAnalysis === true && !isLargeBatch;
            
            if (shouldLog) {
                logger.groupStart("=== COMMON TABLE PROCESSING ===");
            }
            
            if (shouldLog) {
                logger.logProcessor('START Processing common table', {
                    tableElement: table ? table.tagName : 'null',
                    rowCount: table?.rows?.length || 0,
                    cellCount: table?.querySelectorAll ? table.querySelectorAll('td, th').length : 0,
                    hasTH: table?.querySelectorAll ? table.querySelectorAll('th').length > 0 : false
                });
            }
            
            // Set up timer for overall processing (only for non-large batches)
            const processingTimer = shouldLog ? logger.startTimer('CommonTableProcessing') : null;
            
            // Basic validation - check if we have any table with rows
            if (!table || !table.rows || table.rows.length === 0) {
                if (shouldLog) {
                    logger.error('Invalid table for processing - no rows', { 
                        hasTable: !!table,
                        hasRows: !!(table && table.rows),
                        rowCount: table?.rows?.length || 0
                    });
                    if (processingTimer) logger.endTimer(processingTimer);
                    logger.groupEnd();
                }
                return null;
            }
        
            try {
                // First check if this is a hierarchical table
                let isHierarchical = false;
                
                try {
                    if (TC.tableAnalysis && 
                        typeof TC.tableAnalysis.isHierarchicalTable === 'function') {
                        isHierarchical = TC.tableAnalysis.isHierarchicalTable(table);
                    }
                } catch (hierarchicalError) {
                    isHierarchical = false;
                    if (shouldLog) {
                        logger.error('Error checking hierarchical table', {
                            message: hierarchicalError?.message || 'Unknown error'
                        });
                    }
                }
                
                // Process hierarchical table if detected
                if (isHierarchical) {
                    if (shouldLog) logger.logProcessor('Processing as hierarchical table');
                    
                    try {
                        if (TC.processors && 
                            TC.processors.helpers && 
                            typeof TC.processors.helpers.processHierarchicalTable === 'function') {
                            
                            const hierarchicalData = TC.processors.helpers.processHierarchicalTable(table);
                            
                            if (hierarchicalData) {
                                if (shouldLog) {
                                    logger.logProcessor('Hierarchical table processed successfully');
                                    if (processingTimer) logger.endTimer(processingTimer);
                                    logger.groupEnd();
                                }
                                return hierarchicalData;
                            }
                        }
                    } catch (processError) {
                        if (shouldLog) {
                            logger.error('Error processing hierarchical table', {
                                message: processError?.message || 'Unknown error'
                            });
                        }
                    }
                }
                
                // If not hierarchical or hierarchical processing failed, use the new function for simple/regular tables
                if (shouldLog) {
                    logger.logProcessor('Using simple/regular table processing');
                }
                
                const result = this.helpers.processSimpleAndRegularTables(table);
                
                if (shouldLog) {
                    logger.logProcessor('Simple/regular table processing complete');
                    if (processingTimer) logger.endTimer(processingTimer);
                    logger.groupEnd();
                }
                
                return result;
                
            } catch (error) {
                if (shouldLog) {
                    logger.error('Error in processCommon', {
                        message: error?.message || 'Unknown error in processCommon'
                    });
                    
                    if (processingTimer) logger.endTimer(processingTimer);
                    logger.groupEnd();
                }
                
                return null;
            }
        }
    },

// 10. Rendering
    /**
     * Generates HTML output for converted tables in various formats.
     * This rendering engine:
     * - Creates hierarchical accordions for complex tables
     * - Renders standard accordions for simpler tables
     * - Generates list-style layouts for certain table types
     * - Builds column structures for data presentation
     * - Implements sophisticated logging for rendering operations
     * - Provides utilities for output formatting and structure
     * - Manages interactive component generation with proper event binding
     * 
     * This object transforms the structured data from processors into mobile-friendly HTML
     * with appropriate interactive behavior.
     */         
    render: {
        helpers:{
            // LOGGING FUNCTIONS
            //----------------------------------------
                /**
                 * Enhanced logging for comprehensive structure debugging
                 * 
                 * Generates a detailed hierarchical breakdown of the complete table structure
                 * for advanced debugging and analysis. This comprehensive logger:
                 * 
                 * 1. Displays all structural relationships between sections, subtitles, and sublabels
                 * 2. Includes metadata about virtual elements and structural characteristics
                 * 3. Provides statistical summaries of element counts and relationships
                 * 4. Identifies potential duplication issues with content
                 * 5. Logs hierarchy depth and complexity metrics
                 * 
                 * This function is invaluable for diagnosing complex table processing issues,
                 * particularly for hierarchical tables with nested relationships. It reveals
                 * the internal structure representation precisely as seen by the rendering engine.
                 * 
                 * @param {Object} structuredData - The table structure to analyze
                 * @param {Object} inputLogger - Logger to use (falls back to default)
                 */
                logCompleteStructure: function(structuredData, inputLogger) {
                    // Ensure logger is properly initialized
                    const TC = window.TableConverter;
                    const logger = inputLogger || (TC?.logger ? TC.logger.ensureSafeLogger(TC.logger) : console);
                    const CONFIG = TC?.CONFIG || {};
                    const shouldLogOverall = CONFIG.debug?.logOverall === true;
                    
                    if (!shouldLogOverall) {
                        return; // Skip logging if not enabled
                    }
                    
                    try {
                        logger.groupStart("=== ENHANCED TABLE STRUCTURE WITH METADATA ===");
                        
                        // Input validation
                        if (!structuredData) {
                            logger.error("Missing structured data for analysis");
                            logger.groupEnd();
                            return;
                        }
                        
                        // TABLE OVERVIEW WITH HIERARCHY TYPE
                        logger.logOverall("Table Overview", {
                            title: structuredData.title || 'None',
                            sectionCount: structuredData.sections?.length || 0,
                            hasColumnInfo: !!structuredData.columnInfo,
                            dataColumnStart: structuredData.columnInfo?.dataColumnStart || 0,
                            hierarchyType: structuredData.hierarchyType || 'unknown'
                        });
                        
                        // Track all data contents across sublabels to identify duplications
                        const globalContentRegistry = new Map(); // Maps content => [{section, subtitle, sublabel, position}]
                        
                        // Track virtual elements for reporting
                        const virtualElements = {
                            sections: 0,
                            subtitles: 0,
                            sublabels: 0
                        };
                        
                        // Track total element counts
                        const elementCounts = {
                            sections: 0,
                            subtitles: 0,
                            sublabels: 0,
                            dataCells: 0
                        };
                        
                        // SECTION STRUCTURE WITH DATA CONTENT
                        if (structuredData.sections && structuredData.sections.length > 0) {
                            logger.groupStart("SECTION STRUCTURE WITH METADATA");
                            
                            // Process each section
                            structuredData.sections.forEach((section, sectionIdx) => {
                                if (!section) return;
                                
                                elementCounts.sections++;
                                if (section.isVirtual || section.structuralOnly) {
                                    virtualElements.sections++;
                                }
                                
                                logger.groupStart(`Section ${sectionIdx + 1}: ${section.id || 'unnamed'}`);
                                
                                // Enhanced section metadata
                                logger.logOverall("Section Metadata", {
                                    id: section.id || 'unnamed',
                                    title: section.title || 'None',
                                    subtitle: section.subtitle || 'None',
                                    rowRange: `${section.startRow}-${section.endRow}`,
                                    subtitleCount: section.subtitles?.length || 0,
                                    isVirtual: section.isVirtual || false,
                                    structuralOnly: section.structuralOnly || false,
                                    thCellCount: section.thCellCount || 0,
                                    hasExclusiveOwnership: section.hasExclusiveOwnership || false,
                                    hierarchyType: section.hierarchyType || structuredData.hierarchyType || 'unknown'
                                });
                                
                                // Process all subtitles
                                if (section.subtitles && section.subtitles.length > 0) {
                                    logger.groupStart("SUBTITLES WITH METADATA");
                                    
                                    // Log details of each subtitle with data content
                                    section.subtitles.forEach((subtitle, subtitleIdx) => {
                                        if (!subtitle) return;
                                        
                                        elementCounts.subtitles++;
                                        if (subtitle.isVirtual || subtitle.structuralOnly) {
                                            virtualElements.subtitles++;
                                        }
                                        
                                        logger.groupStart(`Subtitle ${subtitleIdx + 1}: ${subtitle.title || 'unnamed'}`);
                                        
                                        // Enhanced subtitle details
                                        logger.logOverall("Subtitle Details", {
                                            title: subtitle.title || 'unnamed',
                                            rowRange: `${subtitle.rowStart}-${subtitle.rowEnd}`,
                                            colIndex: subtitle.colIndex,
                                            rowspan: subtitle.rowspan || 1,
                                            sublabelCount: subtitle.sublabels?.length || 0,
                                            isVirtual: subtitle.isVirtual || false,
                                            structuralOnly: subtitle.structuralOnly || false,
                                            isMainSubtitle: subtitle.isMainSubtitle || false,
                                            synthetic: subtitle.synthetic || false
                                        });
                                        
                                        // Process all sublabels with detailed data content
                                        if (subtitle.sublabels && subtitle.sublabels.length > 0) {
                                            logger.groupStart("SUBLABELS WITH METADATA");
                                            
                                            // Process each sublabel
                                            subtitle.sublabels.forEach((sublabel, sublabelIdx) => {
                                                if (!sublabel) return;
                                                
                                                elementCounts.sublabels++;
                                                if (sublabel.isVirtual || sublabel.structuralOnly) {
                                                    virtualElements.sublabels++;
                                                }
                                                
                                                logger.groupStart(`Sublabel ${sublabelIdx + 1}: ${sublabel.title || 'unnamed'}`);
                                                
                                                // Enhanced sublabel metadata
                                                logger.logOverall("Sublabel Metadata", {
                                                    title: sublabel.title || 'unnamed',
                                                    rowIndex: sublabel.rowIndex,
                                                    cellIndex: sublabel.cellIndex,
                                                    position: sublabel.position,
                                                    rowspan: sublabel.rowspan || 1,
                                                    dataItems: sublabel.data?.length || 0,
                                                    isVirtual: sublabel.isVirtual || false,
                                                    structuralOnly: sublabel.structuralOnly || false,
                                                    patternDetected: sublabel.patternDetected || false,
                                                    structurallyDefined: sublabel.structurallyDefined || false,
                                                    specialCase: sublabel.specialCase || false,
                                                    forcedMatch: sublabel.forcedMatch || false,
                                                    fromRowspanContext: sublabel.fromRowspanContext || false,
                                                    parentSubtitle: sublabel.parentSubtitle || subtitle.title,
                                                    isDuplicate: sublabel.title && sublabel.title === subtitle.title
                                                });
                                                
                                                // Create a map of data by position
                                                const dataByPosition = new Map();
                                                
                                                // Group data by position for easier analysis
                                                if (sublabel.data && sublabel.data.length > 0) {
                                                    elementCounts.dataCells += sublabel.data.length;
                                                    
                                                    sublabel.data.forEach((dataItem, dataIdx) => {
                                                        if (!dataItem) return;
                                                        
                                                        const position = dataItem.position || dataItem.colIndex || 0;
                                                        
                                                        if (!dataByPosition.has(position)) {
                                                            dataByPosition.set(position, []);
                                                        }
                                                        
                                                        dataByPosition.get(position).push({
                                                            index: dataIdx,
                                                            position: position,
                                                            content: dataItem.content || '',
                                                            values: dataItem.values || [],
                                                            rowIndex: dataItem.rowIndex,
                                                            isFromRowspan: dataItem.fromRowspan || false,
                                                            isFromColspan: dataItem.isFromColspan || false,
                                                            isRowspanAffected: dataItem.isRowspanAffected || false
                                                        });
                                                        
                                                        // Track content in global registry for duplication detection
                                                        const contentKey = dataItem.content || '';
                                                        if (contentKey && contentKey !== '-' && contentKey !== '.') {
                                                            if (!globalContentRegistry.has(contentKey)) {
                                                                globalContentRegistry.set(contentKey, []);
                                                            }
                                                            
                                                            globalContentRegistry.get(contentKey).push({
                                                                section: section.id,
                                                                subtitle: subtitle.title,
                                                                sublabel: sublabel.title,
                                                                position: position,
                                                                rowIndex: dataItem.rowIndex,
                                                                dataIndex: dataIdx,
                                                                isVirtual: sublabel.isVirtual
                                                            });
                                                        }
                                                    });
                                                    
                                                    // Log each position's data content
                                                    logger.groupStart("DATA CONTENT BY POSITION");
                                                    
                                                    for (const [position, dataItems] of dataByPosition.entries()) {
                                                        logger.logOverall(`Position ${position} Data Content:`, {
                                                            itemCount: dataItems.length,
                                                            allContent: dataItems.map(item => ({
                                                                content: item.content,
                                                                rowIndex: item.rowIndex,
                                                                fromRowspan: item.isFromRowspan,
                                                                fromColspan: item.isFromColspan,
                                                                rowspanAffected: item.isRowspanAffected
                                                            }))
                                                        });
                                                    }
                                                    
                                                    logger.groupEnd(); // End DATA CONTENT BY POSITION
                                                } else {
                                                    logger.logOverall("No data items found for this sublabel", {
                                                        virtualStatus: sublabel.isVirtual ? 'Virtual sublabel' : 'Real sublabel with no data'
                                                    });
                                                }
                                                
                                                logger.groupEnd(); // End Sublabel
                                            });
                                            
                                            logger.groupEnd(); // End SUBLABELS WITH METADATA
                                        } else {
                                            logger.logOverall("No sublabels found for this subtitle", {
                                                hasDirectData: subtitle.data && subtitle.data.length > 0,
                                                directDataCount: subtitle.data?.length || 0,
                                                subtitleType: subtitle.isVirtual ? 'Virtual' : 'Standard'
                                            });
                                        }
                                        
                                        logger.groupEnd(); // End Subtitle
                                    });
                                    
                                    logger.groupEnd(); // End SUBTITLES WITH METADATA
                                } else {
                                    logger.logOverall("No subtitles found for this section", {
                                        sectionType: section.isVirtual ? 'Virtual' : 'Standard'
                                    });
                                }
                                
                                logger.groupEnd(); // End Section
                            });
                            
                            logger.groupEnd(); // End SECTION STRUCTURE WITH METADATA
                            
                            // CONTENT DUPLICATION ANALYSIS
                            logger.groupStart("CONTENT DUPLICATION ANALYSIS");
                            
                            // Find content that appears in multiple sublabels
                            const duplicatedContent = [];
                            
                            for (const [content, occurrences] of globalContentRegistry.entries()) {
                                if (occurrences.length > 1) {
                                    // Check if this content appears across different sublabels
                                    const uniqueSublabels = new Set(occurrences.map(o => o.sublabel));
                                    
                                    if (uniqueSublabels.size > 1) {
                                        duplicatedContent.push({
                                            content: content,
                                            occurrenceCount: occurrences.length,
                                            sublabels: Array.from(uniqueSublabels),
                                            virtualOccurrences: occurrences.filter(o => o.isVirtual).length,
                                            details: occurrences
                                        });
                                    }
                                }
                            }
                            
                            if (duplicatedContent.length > 0) {
                                logger.logOverall("Found duplicated content across different sublabels", {
                                    count: duplicatedContent.length,
                                    duplications: duplicatedContent
                                });
                            } else {
                                logger.logOverall("No content duplication found across sublabels", {});
                            }
                            
                            logger.groupEnd(); // End CONTENT DUPLICATION ANALYSIS
                        }
                        
                        // COLUMN STRUCTURE
                        if (structuredData.columnInfo) {
                            logger.groupStart("COLUMN STRUCTURE WITH METADATA");
                            
                            // Log detailed column info
                            logger.logOverall("Column Information", {
                                dataColumnStart: structuredData.columnInfo.dataColumnStart || 0,
                                headerDepth: structuredData.columnInfo.headerDepth || 0,
                                hasRowspans: structuredData.columnInfo.hasRowspans || false,
                                hasColspans: structuredData.columnInfo.hasColspans || false,
                                leafHeadersCount: structuredData.columnInfo.leafHeaders?.size || 0,
                                tableTitlePresent: !!structuredData.columnInfo.tableTitleCell
                            });
                            
                            // Log column hierarchy details
                            if (structuredData.columnInfo.hierarchies) {
                                const hierarchies = structuredData.columnInfo.hierarchies;
                                logger.logOverall("Column Hierarchies", {
                                    totalPaths: hierarchies.size,
                                    maxDepth: Math.max(...Array.from(hierarchies.values())
                                        .filter(path => Array.isArray(path))
                                        .map(path => path.length), 0),
                                    samplePaths: Array.from(hierarchies.entries())
                                        .slice(0, 5)
                                        .map(([colPos, path]) => ({
                                            column: colPos,
                                            fullPath: Array.isArray(path) ? path.map(p => p.text).join(' > ') : 'Invalid path',
                                            levels: Array.isArray(path) ? path.length : 0,
                                            virtualLevels: Array.isArray(path) ? path.filter(p => p.isVirtual).length : 0
                                        }))
                                });
                            }
                            
                            // Log leaf headers
                            if (structuredData.columnInfo.leafHeaders) {
                                const leafHeaders = structuredData.columnInfo.leafHeaders;
                                logger.logOverall("Leaf Headers", {
                                    totalHeaders: leafHeaders.size,
                                    headerMap: Array.from(leafHeaders.entries())
                                        .slice(0, 10)
                                        .map(([colPos, header]) => ({
                                            column: colPos,
                                            header: header
                                        }))
                                });
                            }
                            
                            // Log area groups information
                            if (structuredData.columnInfo.areaGroups) {
                                const areaGroups = structuredData.columnInfo.areaGroups;
                                logger.logOverall("Area Groups", {
                                    groupCount: areaGroups.size,
                                    groups: Array.from(areaGroups.entries())
                                        .slice(0, 5)
                                        .map(([parent, children]) => ({
                                            parent,
                                            childCount: children.length,
                                            children: children.slice(0, 5)
                                        }))
                                });
                            }
                            
                            logger.groupEnd(); // End COLUMN STRUCTURE WITH METADATA
                        }
                        
                        // VIRTUAL ELEMENT SUMMARY
                        logger.logOverall("VIRTUAL ELEMENT SUMMARY", {
                            virtualSections: virtualElements.sections,
                            virtualSubtitles: virtualElements.subtitles,
                            virtualSublabels: virtualElements.sublabels,
                            percentVirtualSublabels: elementCounts.sublabels > 0 ? 
                                ((virtualElements.sublabels / elementCounts.sublabels) * 100).toFixed(1) + '%' : '0%'
                        });
                        
                        // STRUCTURAL STATISTICS
                        logger.logOverall("COMPLETE STRUCTURE STATISTICS", {
                            totalSections: elementCounts.sections,
                            totalSubtitles: elementCounts.subtitles,
                            totalSublabels: elementCounts.sublabels,
                            totalDataCells: elementCounts.dataCells,
                            virtualElements: virtualElements,
                            duplicatedContentCount: globalContentRegistry ? 
                                Array.from(globalContentRegistry.values()).filter(occurrences => occurrences.length > 1).length : 0,
                            hierarchyType: structuredData.hierarchyType || 'unknown'
                        });
                        
                        logger.groupEnd(); // End ENHANCED TABLE STRUCTURE WITH METADATA
                    } catch (error) {
                        // Error handling
                        logger.error("Error in enhanced logCompleteStructure", {
                            message: error.message,
                            stack: error.stack
                        });
                        
                        // Ensure we always close the log group
                        try {
                            logger.groupEnd();
                        } catch (e) {
                            // Ignore errors in group ending
                        }
                    }
                },
                
                /**
                 * Log compact rendering summary statistics
                 * 
                 * Generates a concise yet comprehensive summary of the rendering process results
                 * to facilitate debugging and performance analysis. This summary includes:
                 * 
                 * 1. Section, subtitle, and sublabel counts with hierarchical relationships
                 * 2. Rendering performance metrics including timing and element count information
                 * 3. Column hierarchy statistics and relationship metrics
                 * 4. Virtual element counts and structural characteristics
                 * 5. Error reporting for any issues encountered during rendering
                 * 
                 * This focused summary provides a high-level overview of rendering operations
                 * without the extensive detail of the complete structure log, making it ideal
                 * for routine monitoring and performance tracking.
                 * 
                 * @param {Object} summary - Rendering summary data
                 */
                logRenderSummary: function(summary) {
                    const logger = window.TableConverter.logger.ensureSafeLogger(window.TableConverter.logger);
                    
                    if (!summary) {
                        logger.logRender("Render summary: No summary data available");
                        return;
                    }
                    
                    if (!summary.success) {
                        logger.logRender("RENDER SUMMARY - FAILED", {
                            error: summary.error || "Unknown error",
                            outputSize: summary.outputSize || 0
                        });
                        return;
                    }
                    
                    // Get access to the structured data if available
                    const structuredData = summary.structuredData || {};
                    const stats = summary.statistics || {};
                    
                    // Create detailed hierarchy information
                    const hierarchySummary = { sections: [], columns: {}, renderMetrics: {} };
                    
                    // Column hierarchy analysis
                    if (structuredData.columnInfo) {
                        const columnInfo = structuredData.columnInfo;
                        
                        // Analyze column paths
                        const pathInfo = {
                            uniquePaths: new Set(),
                            maxDepth: 0,
                            columnCoverage: {},
                            structureBreakdown: {}
                        };
                        
                        if (columnInfo.hierarchies) {
                            for (const [colIdx, path] of columnInfo.hierarchies.entries()) {
                                if (!path || !Array.isArray(path)) continue;
                                
                                // Track path string representation
                                const pathStr = path.map(p => p.text).join(' > ');
                                pathInfo.uniquePaths.add(pathStr);
                                
                                // Track depth
                                pathInfo.maxDepth = Math.max(pathInfo.maxDepth, path.length);
                                
                                // Record this column in its path structure
                                if (!pathInfo.structureBreakdown[pathStr]) {
                                    pathInfo.structureBreakdown[pathStr] = [];
                                }
                                pathInfo.structureBreakdown[pathStr].push(colIdx);
                                
                                // Track column coverage
                                pathInfo.columnCoverage[colIdx] = pathStr;
                            }
                        }
                        
                        // Prepare samples of unique paths
                        const pathSamples = Array.from(pathInfo.uniquePaths).slice(0, 5).map(path => {
                            const columns = pathInfo.structureBreakdown[path] || [];
                            return {
                                path,
                                columns: columns.length,
                                columnRange: columns.length > 0 ? 
                                    `${Math.min(...columns)}-${Math.max(...columns)}` : 'none'
                            };
                        });
                        
                        // Analyze header matrix if available
                        const headerMatrixInfo = {
                            rows: columnInfo.headerMatrix?.length || 0,
                            cellCount: 0,
                            spannedCells: 0
                        };
                        
                        if (columnInfo.headerMatrix) {
                            for (const row of columnInfo.headerMatrix) {
                                if (!row) continue;
                                
                                for (const cell of row) {
                                    if (!cell) continue;
                                    
                                    headerMatrixInfo.cellCount++;
                                    
                                    if ((cell.rowspan && cell.rowspan > 1) || 
                                        (cell.colspan && cell.colspan > 1)) {
                                        headerMatrixInfo.spannedCells++;
                                    }
                                }
                            }
                        }
                        
                        // Complete column info summary
                        hierarchySummary.columns = {
                            dataColumnStart: columnInfo.dataColumnStart || 0,
                            headerDepth: columnInfo.headerDepth || 0,
                            uniquePaths: pathInfo.uniquePaths.size,
                            maxDepth: pathInfo.maxDepth,
                            pathSamples,
                            headerMatrix: headerMatrixInfo,
                            hasRowspans: columnInfo.hasRowspans || false,
                            hasColspans: columnInfo.hasColspans || false,
                            topLevelHeaders: columnInfo.topLevelHeaders?.length || 0,
                            topHeaderSamples: (columnInfo.topLevelHeaders || [])
                                .slice(0, 5).map(h => h.text || 'unnamed')
                        };
                    }
                    
                    // Section analysis
                    if (structuredData.sections && Array.isArray(structuredData.sections)) {
                        // Analyze each section
                        structuredData.sections.forEach((section, sectionIdx) => {
                            if (!section) return;
                            
                            // Subtitle analysis
                            const subtitleDetails = [];
                            let totalSublabels = 0;
                            let totalDataCells = 0;
                            
                            if (section.subtitles && Array.isArray(section.subtitles)) {
                                section.subtitles.forEach((subtitle, stIdx) => {
                                    if (!subtitle) return;
                                    
                                    // Sublabel analysis
                                    const sublabelDetails = [];
                                    let subtitleDataCells = 0;
                                    
                                    if (subtitle.sublabels && Array.isArray(subtitle.sublabels)) {
                                        totalSublabels += subtitle.sublabels.length;
                                        
                                        subtitle.sublabels.forEach((sublabel, slIdx) => {
                                            if (!sublabel) return;
                                            
                                            // Data cell analysis by column
                                            const dataByColumn = new Map();
                                            let sublabelDataCount = 0;
                                            
                                            if (sublabel.data && Array.isArray(sublabel.data)) {
                                                sublabel.data.forEach(dataItem => {
                                                    if (!dataItem) return;
                                                    
                                                    const colPos = dataItem.position || dataItem.colIndex || 0;
                                                    if (!dataByColumn.has(colPos)) {
                                                        dataByColumn.set(colPos, { 
                                                            values: [], 
                                                            fromRowspan: 0 
                                                        });
                                                    }
                                                    
                                                    // Get values
                                                    const values = dataItem.values || 
                                                                [dataItem.content || '-'];
                                                    
                                                    dataByColumn.get(colPos).values.push(...values);
                                                    
                                                    // Track rowspan information
                                                    if (dataItem.fromRowspan) {
                                                        dataByColumn.get(colPos).fromRowspan++;
                                                    }
                                                    
                                                    sublabelDataCount += values.length;
                                                });
                                            }
                                            
                                            subtitleDataCells += sublabelDataCount;
                                            totalDataCells += sublabelDataCount;
                                            
                                            // Add to sublabel details
                                            sublabelDetails.push({
                                                title: sublabel.title || `Sublabel ${slIdx + 1}`,
                                                rowIndex: sublabel.rowIndex,
                                                columns: dataByColumn.size,
                                                totalValues: sublabelDataCount,
                                                columnSamples: Array.from(dataByColumn.entries())
                                                    .slice(0, 3)
                                                    .map(([colPos, info]) => ({
                                                        position: colPos,
                                                        valueCount: info.values.length,
                                                        fromRowspan: info.fromRowspan,
                                                        samples: info.values.slice(0, 2).map(v => 
                                                            typeof v === 'string' && v.length > 30 ? 
                                                            v.substring(0, 30) + '...' : v)
                                                    }))
                                            });
                                        });
                                    }
                                    
                                    // Add to subtitle details
                                    subtitleDetails.push({
                                        title: subtitle.title || `Subtitle ${stIdx + 1}`,
                                        rowRange: `${subtitle.rowStart || '?'}-${subtitle.rowEnd || '?'}`,
                                        sublabelCount: subtitle.sublabels?.length || 0,
                                        dataCellCount: subtitleDataCells,
                                        sublabelSamples: sublabelDetails.slice(0, 3)
                                    });
                                });
                            }
                            
                            // Add to section summary
                            hierarchySummary.sections.push({
                                id: section.id || `Section ${sectionIdx + 1}`,
                                title: section.title || 'No Title',
                                subtitle: section.subtitle || 'No Subtitle',
                                rowRange: `${section.startRow || '?'}-${section.endRow || '?'}`,
                                subtitleCount: section.subtitles?.length || 0,
                                sublabelCount: totalSublabels,
                                dataCellCount: totalDataCells,
                                subtitleSamples: subtitleDetails.slice(0, 3)
                            });
                        });
                    }
                    
                    // Rendering metrics
                    hierarchySummary.renderMetrics = {
                        renderedNodes: stats.renderedNodes || 0,
                        topLevelGroups: stats.topLevelGroups || 0,
                        contentGroups: stats.contentGroups || 0,
                        outputSize: stats.outputSize || 0,
                        renderTime: stats.renderTime || 0,
                        elementCount: {
                            sections: stats.sectionCount || 0,
                            subtitles: stats.subtitleCount || 0,
                            sublabels: stats.sublabelCount || 0,
                            dataCells: stats.dataCellCount || 0,
                            emptySublabels: stats.emptySublabels || 0
                        },
                        errors: stats.errors || 0
                    };
                    
                    // Add render stats from columnHierarchy if available
                    if (stats.columnHierarchies) {
                        for (const hierarchy of stats.columnHierarchies) {
                            if (hierarchy && hierarchy.renderStats) {
                                hierarchySummary.renderMetrics.renderedNodes += hierarchy.renderStats.renderedNodes || 0;
                                hierarchySummary.renderMetrics.topLevelGroups += hierarchy.renderStats.topLevelGroups || 0;
                            }
                        }
                    }
                    
                    // Log the comprehensive summary
                    logger.logRender("COMPREHENSIVE RENDER SUMMARY", hierarchySummary);
                },

            // UTILITY & CONFIGURATION FUNCTIONS
            //----------------------------------------
                /**
                 * Get CSS selectors from configuration
                 * 
                 * Centralizes access to all required CSS selectors used throughout the rendering process,
                 * providing consistent naming and fallback values. This function:
                 * 
                 * 1. Retrieves selectors from the global configuration
                 * 2. Applies default values for any missing selectors
                 * 3. Normalizes selector format for consistent usage
                 * 4. Organizes selectors by functional area (accordion, structure, content)
                 * 
                 * This centralized approach ensures all rendering functions use consistent
                 * selectors and provides a single point of maintenance for styling classes.
                 * 
                 * @returns {Object} Organized object containing all required CSS selectors
                 */
                getSelectors: function() {
                    const config = window.TableConverter?.CONFIG?.selectors?.components?.accordion || {};
                    const structureConfig = window.TableConverter?.CONFIG?.selectors?.structure || {};
                    
                    return {
                        standaloneTitle: structureConfig.standaloneTitle || "table-standalone-title",
                        root: config.root || "accordion",
                        list: config.list || "accordion-list",
                        item: config.item || "list-item",
                        ecHead: config.ecHead || "ec-head",
                        header: config.header || "article-header",
                        arrow: config.arrow || "arrow",
                        content: config.content || "expanded-content",
                        sectionTitle: structureConfig.sectionTitle || "section-row-title",
                        sectionSubtitle: structureConfig.sectionSubtitle || "section-row-subtitle",
                        subtitleHeader: structureConfig.subtitleHeader || "subtitle-header",
                        sublabelTitle: structureConfig.sublabelTitle || "sublabel-title",
                        headerColumns: config.headerColumns || "columns-header",
                        columnGroup: structureConfig.columnGroup || "column-group-header",
                        columnSubgroup: structureConfig.columnSubgroup || "column-subgroup-header",
                        contentGroup: config.contentGroup || "info-group",
                        labelCategory: config.labelCategory || "label category",
                        value: config.value || "value"
                    };
                },
                
                /**
                 * Determine if a sublabel title should be rendered
                 * 
                 * Makes an intelligent decision about whether to display a sublabel's title
                 * based on structural hierarchy and content context. This function:
                 * 
                 * 1. Ensures real sublabels always display their titles
                 * 2. Prevents duplicate titles when sublabels inherit from parent subtitles
                 * 3. Handles special case for section-subtitle table type with virtual sublabels
                 * 4. Makes appropriate adjustments for structural-only elements
                 * 
                 * This nuanced control over title display prevents redundant headings while
                 * maintaining proper visual hierarchy in the rendered output.
                 * 
                 * @param {Object} sublabel - The sublabel to evaluate
                 * @param {Object} subtitle - The parent subtitle
                 * @param {String} hierarchyType - The table hierarchy type
                 * @returns {Boolean} True if the sublabel title should be rendered
                 */
                shouldRenderSublabelTitle: function(sublabel, subtitle, hierarchyType) {
                    // Always render real sublabel titles
                    if (!sublabel.isVirtual && !sublabel.structuralOnly) {
                        return true;
                    }
                    
                    // For section-subtitle tables, don't render duplicate titles
                    if (hierarchyType === 'section-subtitle' && 
                        sublabel.title === subtitle.title) {
                        return false;
                    }
                    
                    // For other virtual sublabels, render title if different from parent
                    return sublabel.title !== subtitle.title;
                },
                          
            // DATA ANALYSIS & STRUCTURE BUILDING FUNCTIONS
            //----------------------------------------
                /**
                 * Analyze table structure for rendering
                 * 
                 * Performs a comprehensive analysis of table hierarchy patterns to determine
                 * the most appropriate rendering strategy. This function:
                 * 
                 * 1. Analyzes path depths across all columns to identify hierarchy levels
                 * 2. Determines the most common hierarchical pattern in the table
                 * 3. Identifies specialty structures like grouped columns or segmented data
                 * 4. Provides statistical analysis of hierarchical distribution
                 * 
                 * The results guide the rendering process to select the optimal visualization
                 * approach based on the table's inherent structure rather than assumptions.
                 * 
                 * @param {Object} hierarchy - Column hierarchy information
                 * @param {Object} columnInfo - Additional column structure details
                 * @returns {Object} Structural analysis results for rendering guidance
                 */
                analyzeTableStructure: function(hierarchy, columnInfo) {
                    const logger = window.TableConverter.logger;
                    
                    // Track path depths
                    const depthCounts = new Map();
                    
                    // Track unique top-level headers to identify column groups
                    const topLevelHeaders = new Set();
                    
                    // Track complex paths for detailed analysis
                    const complexPaths = [];
                    
                    // Count consistent depth of most paths and collect top-level headers
                    for (const [colPos, path] of hierarchy.columnPaths) {
                        if (!Array.isArray(path)) continue;
                        
                        const depth = path.length;
                        depthCounts.set(depth, (depthCounts.get(depth) || 0) + 1);
                        
                        // Extract top-level header to identify column groups
                        if (path.length > 0 && path[0] && path[0].text) {
                            topLevelHeaders.add(path[0].text);
                        }
                        
                        // Track detailed information for complex paths (depth > 2)
                        if (depth > 2) {
                            complexPaths.push({
                                colPos,
                                depth,
                                path: path.map(p => p.text || 'unnamed')
                            });
                        }
                    }
                    
                    // Log complex paths for debugging
                    if (complexPaths.length > 0) {
                        logger.logRenderDetail("Complex column paths detected", {
                            count: complexPaths.length,
                            samples: complexPaths.slice(0, 3)
                        });
                    }
                    
                    // Get the most common path depth
                    let mostCommonDepth = 1;
                    let maxCount = 0;
                    for (const [depth, count] of depthCounts) {
                        if (count > maxCount) {
                            mostCommonDepth = depth;
                            maxCount = count;
                        }
                    }
                    
                    // CRITICAL FIX: Also track maximum depth for more accurate complexity detection
                    let maxDepth = 0;
                    for (const depth of depthCounts.keys()) {
                        if (depth > maxDepth) {
                            maxDepth = depth;
                        }
                    }
                    
                    // Check if columnInfo has area groups
                    const hasGroupedStructure = columnInfo && 
                                            columnInfo.areaGroups && 
                                            columnInfo.areaGroups.size > 0;
                    
                    // Structure-agnostic hierarchy analysis
                    // Count how many columns have exactly 2 levels vs 3+ levels
                    let twoLevelCount = 0;
                    let threePlusLevelCount = 0;
                    
                    for (const [_, path] of hierarchy.columnPaths) {
                        if (Array.isArray(path)) {
                            if (path.length === 2) {
                                twoLevelCount++;
                            } else if (path.length >= 3) {
                                threePlusLevelCount++;
                            }
                        }
                    }
                    
                    // Log depth distribution
                    logger.logRenderDetail("Column hierarchy depth distribution", {
                        depthCounts: Object.fromEntries(depthCounts),
                        mostCommonDepth,
                        maxDepth,
                        twoLevelCount,
                        threePlusLevelCount
                    });
                    
                    // CRITICAL FIX: Enhanced detection of complex tables
                    // More aggressively identify complex tables to ensure proper rendering
                    const isComplexMultiLevelTable = threePlusLevelCount > 0 || maxDepth >= 3 || complexPaths.length > 0;
                    
                    // Determine if this is a standard 2-level table
                    const isTwoLevelTable = twoLevelCount > 0;
                    
                    // Create analysis result
                    const result = {
                        isTwoLevelTable,
                        isComplexMultiLevelTable,
                        mostCommonDepth,
                        maxDepth,
                        hasGroupedStructure,
                        hasMultipleColumnGroups: topLevelHeaders.size > 1,
                        topLevelHeaderCount: topLevelHeaders.size,
                        topLevelHeaders: Array.from(topLevelHeaders),
                        depthDistribution: Object.fromEntries(depthCounts),
                        complexPathsCount: complexPaths.length,
                        // Additional debug info
                        twoLevelCount,
                        threePlusLevelCount
                    };
                    
                    // Log comprehensive structure analysis
                    logger.logRender("Table structure analysis complete", {
                        isComplexMultiLevelTable: result.isComplexMultiLevelTable,
                        isTwoLevelTable: result.isTwoLevelTable,
                        maxDepth: result.maxDepth,
                        mostCommonDepth: result.mostCommonDepth,
                        complexPathsCount: result.complexPathsCount
                    });
                    
                    return result;
                },

                /**
                 * Format display value with proper handling of special cases
                 * 
                 * @param {*} value - The value to format
                 * @returns {String} Formatted display value
                 */
                formatDisplayValue: function(value) {
                    // Handle null, undefined, empty strings, dashes, and dots
                    if (value === null || value === undefined || value === '') {
                        return '-';
                    } else if (value === '-' || value === ' ' || value === '.') {
                        return value;
                    }
                    
                    // Return the value as is (may contain HTML)
                    return value;
                },

                /**
                 * Enhanced groupColumnsByTopLevel function for deeply nested hierarchies
                 * 
                 * This completely rewritten function properly handles complex tables with
                 * deep nesting by preserving the complete hierarchy path in column header names.
                 * 
                 * @param {Object} hierarchy - The column hierarchy information
                 * @param {Map} valuesByLeafHeader - Data values mapped to leaf headers
                 * @returns {Map} Columns grouped by their hierarchical structure
                 */
                groupColumnsByTopLevel: function(hierarchy, valuesByLeafHeader) {
                    const logger = window.TableConverter.logger;
                    
                    logger.logRender('Grouping columns by hierarchy', {
                        columnCount: hierarchy.originalOrder.length,
                        pathCount: hierarchy.columnPaths.size,
                        leafHeadersCount: hierarchy.leafHeaders.size
                    });
                    
                    // Step 1: Analyze all paths to identify the structure
                    const allPaths = [];
                    const leafPositions = new Map();
                    
                    // Collect all path information
                    for (const colPos of hierarchy.originalOrder) {
                        const path = hierarchy.columnPaths.get(colPos);
                        
                        // Skip invalid paths
                        if (!Array.isArray(path) || path.length === 0) continue;
                        
                        // Extract segments as clean text
                        const segments = path
                            .map(p => p.text || '')
                            .filter(text => text.trim() !== '');
                        
                        // Skip if no valid segments
                        if (segments.length === 0) continue;
                        
                        // Store the complete path
                        allPaths.push({
                            position: colPos,
                            segments: segments,
                            isLeaf: true
                        });
                        
                        // Remember which positions are leaf nodes
                        const leafHeader = segments[segments.length - 1];
                        leafPositions.set(leafHeader, colPos);
                    }
                    
                    // Step 2: Create a hierarchical tree structure (parent nodes vs leaf nodes)
                    const hierarchyTree = {};
                    
                    // Add paths to the tree
                    for (const pathInfo of allPaths) {
                        const segments = pathInfo.segments;
                        const position = pathInfo.position;
                        
                        // Get the leaf header and its values
                        const leafHeader = segments[segments.length - 1];
                        const dataValues = valuesByLeafHeader.get(leafHeader) || 
                                         hierarchy.data.get(position)?.values || [];
                        
                        // Navigate the tree, building parent nodes as we go
                        let currentNode = hierarchyTree;
                        
                        // Process all segments except the last one (create parent nodes)
                        for (let i = 0; i < segments.length - 1; i++) {
                            const segment = segments[i];
                            
                            // Create this branch if it doesn't exist
                            if (!currentNode[segment]) {
                                currentNode[segment] = {
                                    _isParent: true,
                                    _children: {}
                                };
                            }
                            
                            // Move to children of this node
                            currentNode = currentNode[segment]._children;
                        }
                        
                        // Add the leaf node with its values
                        const leafSegment = segments[segments.length - 1];
                        currentNode[leafSegment] = {
                            _isLeaf: true,
                            _values: dataValues
                        };
                    }
                    
                    // Step 3: Convert the tree to nested Maps (recursive function)
                    const convertTreeToMaps = (node) => {
                        const resultMap = new Map();
                        
                        for (const [key, value] of Object.entries(node)) {
                            // Skip internal properties
                            if (key.startsWith('_')) continue;
                            
                            if (value._isParent) {
                                // This is a parent node - convert its children recursively
                                resultMap.set(key, convertTreeToMaps(value._children));
                            } else if (value._isLeaf) {
                                // This is a leaf node - use its values
                                resultMap.set(key, value._values || []);
                            }
                        }
                        
                        return resultMap;
                    };
                    
                    // Step 4: Create the final result structure
                    const topLevelGroups = convertTreeToMaps(hierarchyTree);
                    
                    // If the result is empty, add a default category
                    if (topLevelGroups.size === 0) {
                        // Try to extract a default header name from the hierarchy
                        let defaultHeader = "Data";
                        
                        if (hierarchy.topLevelHeaders && hierarchy.topLevelHeaders.size > 0) {
                            const firstHeader = hierarchy.topLevelHeaders.values().next().value;
                            if (firstHeader && firstHeader.text) {
                                defaultHeader = firstHeader.text;
                            }
                        }
                        
                        topLevelGroups.set(defaultHeader, new Map());
                    }
                    
                    // Log the final structure
                    logger.logRender('Column grouping complete', {
                        topLevelGroups: topLevelGroups.size,
                        totalPaths: allPaths.length
                    });
                    
                    return topLevelGroups;
                },

                /**
                * Enhanced buildColumnHierarchy function
                * 
                * This improved version correctly builds the column hierarchy by:
                * 1. Properly identifying and processing all hierarchy levels
                * 2. Handling rowspan and colspan affected cells correctly
                * 3. Ensuring all paths are completely extracted
                * 4. Correctly identifying complex columns requiring special handling
                * 
                * @param {Object} sublabel - The sublabel containing column data
                * @param {Object} columnInfo - Column hierarchy information
                * @returns {Object} Comprehensive column hierarchy model
                */
                buildColumnHierarchy: function(sublabel, columnInfo) {
                    // Get logger reference
                    const logger = window.TableConverter.logger;
                    
                    // Log entry
                    logger.logRender('Building column hierarchy for sublabel', {
                        sublabelTitle: sublabel ? sublabel.title : 'undefined',
                        isVirtual: sublabel ? sublabel.isVirtual : false,
                        rowspan: sublabel ? sublabel.rowspan : 0,
                        dataCount: sublabel && sublabel.data ? sublabel.data.length : 0
                    });
                    
                    // Initialize hierarchy object
                    const hierarchy = {
                        columnPaths: new Map(),
                        leafHeaders: new Map(),
                        leafHeaderPositions: new Map(),
                        topLevelHeaders: new Map(),
                        middleLevelHeaders: new Map(),
                        data: new Map(),
                        hierarchyDepth: 1,
                        complexColumns: new Set(),
                        originalOrder: [],
                        hasRowspanStructure: false,
                        sublabelId: null,
                        columnInfo: columnInfo
                    };
                    
                    // Early return check
                    if (!sublabel || !sublabel.data) {
                        logger.logRenderDetail('Missing sublabel or data', {
                            hasSublabel: !!sublabel,
                            hasData: !!(sublabel && sublabel.data)
                        });
                        return hierarchy;
                    }
                    
                    try {
                        // Create a map to track ALL values per position
                        const valuesByPosition = new Map();
                        
                        // Extract data items
                        const dataItems = Array.isArray(sublabel.data) ? 
                            sublabel.data : Object.values(sublabel.data || {});
                        
                        if (dataItems.length === 0) return hierarchy;
                        
                        // Log data items
                        logger.logRenderDetail('Processing data items', {
                            count: dataItems.length,
                            sample: dataItems.slice(0, 3).map(item => ({
                                position: item.position || item.colIndex,
                                content: typeof item.content === 'string' ? 
                                    (item.content.length > 30 ? item.content.substring(0, 30) + '...' : item.content) : 
                                    'complex content'
                            }))
                        });
                        
                        // First pass: collect unique positions and ALL values
                        for (const dataItem of dataItems) {
                            if (!dataItem) continue;
                            
                            const colPos = dataItem.position || dataItem.colIndex || 0;
                            
                            // Track this position
                            if (!valuesByPosition.has(colPos)) {
                                valuesByPosition.set(colPos, []);
                            }
                            
                            // Add value to this position
                            if (dataItem.content !== undefined) {
                                valuesByPosition.get(colPos).push(dataItem.content);
                            }
                        }
                        
                        // Set original order (sorted positions)
                        hierarchy.originalOrder = Array.from(valuesByPosition.keys()).sort((a, b) => a - b);
                        
                        // Second pass: build column hierarchy data
                        for (const colPos of hierarchy.originalOrder) {
                            // Extract column path if available
                            if (columnInfo && columnInfo.hierarchies && columnInfo.hierarchies.has(colPos)) {
                                const path = columnInfo.hierarchies.get(colPos);
                                
                                // CRITICAL FIX: Ensure path is properly extracted and stored
                                if (Array.isArray(path) && path.length > 0) {
                                    hierarchy.columnPaths.set(colPos, path);
                                    
                                    // Set top level header (always first element)
                                    if (path[0]) {
                                        hierarchy.topLevelHeaders.set(colPos, path[0]);
                                    }
                                    
                                    // Set leaf header (always last element)
                                    const leafNode = path[path.length - 1];
                                    if (leafNode) {
                                        const leafText = leafNode.text || '';
                                        hierarchy.leafHeaders.set(colPos, leafText);
                                        hierarchy.leafHeaderPositions.set(leafText, colPos);
                                    }
                                    
                                    // Set middle level headers (all elements except first and last)
                                    if (path.length > 2) {
                                        hierarchy.middleLevelHeaders.set(colPos, path.slice(1, -1));
                                        
                                        // Log the middle level headers for debugging
                                        logger.logRenderDetail(`Middle level headers for column ${colPos}`, {
                                            headers: path.slice(1, -1).map(h => h.text || '')
                                        });
                                    }
                                    
                                    // Log the full path for debugging
                                    logger.logRenderDetail(`Full column path for position ${colPos}`, {
                                        depth: path.length,
                                        fullPath: path.map(p => p.text || '').join(' > ')
                                    });
                                }
                            }
                            
                            // Get leaf header from columnInfo if not already set
                            if (!hierarchy.leafHeaders.has(colPos) && 
                                columnInfo && columnInfo.leafHeaders && 
                                columnInfo.leafHeaders.has(colPos)) {
                                const leafText = columnInfo.leafHeaders.get(colPos);
                                hierarchy.leafHeaders.set(colPos, leafText);
                                hierarchy.leafHeaderPositions.set(leafText, colPos);
                            }
                            
                            // Get all values for this position
                            const values = valuesByPosition.get(colPos) || [];
                            
                            // Set data for this position
                            hierarchy.data.set(colPos, {
                                header: hierarchy.leafHeaders.get(colPos) || '',
                                topHeader: hierarchy.topLevelHeaders.has(colPos) ? 
                                    (hierarchy.topLevelHeaders.get(colPos).text || '') : '',
                                values: values,
                                position: colPos,
                                path: hierarchy.columnPaths.get(colPos) || [],
                                valueCount: values.length
                            });
                            
                            // If this position has multiple values, mark as complex
                            if (values.length > 1) {
                                hierarchy.complexColumns.add(colPos);
                            }
                            
                            // Log values for this position
                            logger.logRenderDetail(`Values for column position ${colPos}`, {
                                count: values.length,
                                values: values
                            });
                        }
                        
                        // Calculate max hierarchy depth - CRITICAL FIX
                        let maxDepth = 1;
                        for (const path of hierarchy.columnPaths.values()) {
                            if (Array.isArray(path) && path.length > maxDepth) {
                                maxDepth = path.length;
                            }
                        }
                        
                        // Set the hierarchy depth
                        hierarchy.hierarchyDepth = maxDepth;
                        
                        // Log the final hierarchy depth for debugging
                        logger.logRender('Hierarchy depth calculated', {
                            hierarchyDepth: hierarchy.hierarchyDepth,
                            complexColumnsCount: hierarchy.complexColumns.size
                        });
                        
                        // Final log
                        logger.logRender('Column hierarchy built successfully', {
                            dataMapSize: hierarchy.data.size,
                            leafHeadersCount: hierarchy.leafHeaders.size,
                            topLevelHeadersCount: hierarchy.topLevelHeaders.size,
                            complexColumnsCount: hierarchy.complexColumns.size,
                            hierarchyDepth: hierarchy.hierarchyDepth
                        });
                        
                    } catch (error) {
                        logger.error('Error in buildColumnHierarchy', {
                            message: error?.message || 'Unknown error',
                            stack: error?.stack
                        });
                    }
                    
                    return hierarchy;
                },

            // COLUMN DATA PREPARATION & RENDERING
            //----------------------------------------
                /**
                 * Prepare column data for rendering
                 * 
                 * Comprehensive data preparation function that transforms raw column data
                 * into a structured format optimized for rendering. This function:
                 * 
                 * 1. Builds complete column hierarchy with path relationships
                 * 2. Organizes data values by their associated leaf headers
                 * 3. Identifies complex columns requiring special handling
                 * 4. Analyzes table structure to determine rendering strategy
                 * 5. Tracks original column order for consistent display
                 * 
                 * The prepared data contains all necessary information for generating
                 * appropriate HTML based on the table's inherent structure and complexity.
                 * 
                 * @param {Object} sublabel - The sublabel containing column data
                 * @param {Object} columnInfo - Column hierarchy information
                 * @returns {Object} Prepared data structure for rendering
                 */
                prepareColumnData: function(sublabel, columnInfo) {
                    const logger = window.TableConverter.logger;
                    
                    logger.logRender('Preparing column data', {
                        sublabelTitle: sublabel?.title || 'undefined',
                        isVirtual: sublabel?.isVirtual || false
                    });
                    
                    try {
                        if (!sublabel || !sublabel.data) {
                            return { isValid: false };
                        }
                        
                        // Build column hierarchy
                        const hierarchy = this.buildColumnHierarchy(sublabel, columnInfo);
                        
                        // Force complexity for virtual sublabels from section-subtitle tables
                        if (sublabel.isVirtual && (sublabel._isFromSectionSubtitle || sublabel.structuralOnly)) {
                            hierarchy.hasRowspanStructure = true;
                            
                            // Ensure ALL positions are complex
                            for (const position of hierarchy.originalOrder) {
                                hierarchy.complexColumns.add(position);
                            }
                            
                            logger.logRender('Forcing all positions as complex for virtual sublabel', {
                                title: sublabel.title,
                                positions: Array.from(hierarchy.complexColumns).join(', ')
                            });
                        }
                        
                        // Also force complexity for sublabels with rowspan > 1
                        if (sublabel.rowspan > 1) {
                            hierarchy.hasRowspanStructure = true;
                            
                            for (const position of hierarchy.originalOrder) {
                                hierarchy.complexColumns.add(position);
                            }
                            
                            logger.logRender('Multi-row sublabel - forcing complexity', {
                                title: sublabel.title,
                                rowspan: sublabel.rowspan
                            });
                        }
                        
                        // Collection of all values by leaf header name
                        const valuesByLeafHeader = new Map();
                        
                        // Collect all values from all positions by their leaf header
                        for (const colPos of hierarchy.originalOrder) {
                            const path = hierarchy.columnPaths.get(colPos);
                            if (!Array.isArray(path) || path.length === 0) continue;
                            
                            // Get the leaf header (last item in path)
                            const leafHeader = path[path.length - 1]?.text || `Column ${colPos}`;
                            
                            // Get data values for this position
                            const dataValues = hierarchy.data.get(colPos)?.values || [];
                            
                            // Add to collection for this leaf header
                            if (!valuesByLeafHeader.has(leafHeader)) {
                                valuesByLeafHeader.set(leafHeader, []);
                            }
                            
                            // Append values (don't overwrite)
                            valuesByLeafHeader.get(leafHeader).push(...dataValues);
                            
                            logger.logRenderDetail(`Collected ${dataValues.length} values for leaf header "${leafHeader}" from position ${colPos}`, {
                                values: dataValues,
                                currentTotal: valuesByLeafHeader.get(leafHeader).length
                            });
                        }
                        
                        // Analyze table structure
                        const structureAnalysis = this.analyzeTableStructure(hierarchy, columnInfo);
                        
                        return {
                            isValid: true,
                            hierarchy,
                            valuesByLeafHeader,
                            structureAnalysis
                        };
                        
                    } catch (error) {
                        logger.error('Error in prepareColumnData:', error);
                        return { isValid: false, error };
                    }
                },
                
                /**
                 * Generate column HTML from prepared data
                 * 
                 * Transforms prepared column data into properly structured HTML for display.
                 * This function:
                 * 
                 * 1. Selects the appropriate rendering strategy based on structural analysis
                 * 2. Handles two-level tables with specialized rendering
                 * 3. Processes multi-level hierarchical tables with nested groupings
                 * 4. Applies proper CSS classes for styling and interactivity
                 * 5. Includes comprehensive error handling for rendering failures
                 * 
                 * The generated HTML preserves all hierarchical relationships while providing
                 * a mobile-friendly presentation of complex tabular data.
                 * 
                 * @param {Object} preparedData - The prepared column data structure
                 * @returns {String} HTML for column display
                 */
                generateColumnHtml: function(preparedData) {
                    const logger = window.TableConverter.logger;
                    const config = this.getSelectors();
                    
                    if (!preparedData || !preparedData.isValid) {
                        return `<div class="${config.headerColumns || 'columns-header'}">Error</div>
                                <div class="error-message">Error rendering column data</div>`;
                    }
                    
                    try {
                        const { hierarchy, valuesByLeafHeader, structureAnalysis } = preparedData;
                        let html = '';
                        
                        // Group data by top-level headers
                        const topLevelGroups = this.groupColumnsByTopLevel(hierarchy, valuesByLeafHeader);
                        
                        // Determine rendering strategy based on hierarchy depth and complexity
                        if (structureAnalysis.isComplexMultiLevelTable) {
                            // Render complex hierarchical structure (3+ levels)
                            html = this.renderComplexMultiLevelTableHtml(topLevelGroups, config);
                        }
                        else {
                            // Render standard two-level table
                            html = this.renderTwoLevelTableHtml(topLevelGroups, config);
                        }
                        
                        return html;
                        
                    } catch (error) {
                        logger.error('Error in generateColumnHtml:', error);
                        return `<div class="${config.headerColumns || 'columns-header'}">Error</div>
                                <div class="error-message">Error rendering column data: ${error.message}</div>`;
                    }
                },

            // RENDERING HTML GENERATION
            //----------------------------------------
                /**
                 * Render two-level table HTML from grouped data
                 * 
                 * Specialized rendering function for tables with two-level column hierarchies
                 * (typically with column groups and leaf columns). This function:
                 * 
                 * 1. Renders each top-level header as a distinct section
                 * 2. Creates column groups within each section with proper relationships
                 * 3. Displays associated data values for each leaf column
                 * 4. Applies appropriate CSS classes for styling and semantic structure
                 * 
                 * This targeted rendering approach optimizes the display of common two-level
                 * hierarchical tables like Table 9.3 in a mobile-friendly format.
                 * 
                 * @param {Map} topLevelGroups - Columns grouped by top-level headers
                 * @param {Object} config - CSS class configuration
                 * @returns {String} HTML for the two-level table display
                 */
                renderTwoLevelTableHtml: function(topLevelGroups, config) {
                    let html = '';
                    
                    // Process each top level group
                    for (const [topHeader, leafMap] of topLevelGroups) {
                        // Add top level header
                        html += `<div class="${config.headerColumns}">${topHeader}</div>`;
                        
                        // Process leaf values directly without column groups
                        if (leafMap instanceof Map) {
                            for (const [leafHeader, values] of leafMap) {
                                // Skip empty categories/columns
                                if (!leafHeader || leafHeader.trim() === '') continue;
                                
                                // Add content group directly without column group - this eliminates the duplication
                                html += `<div class="${config.contentGroup}">
                                    <div class="${config.labelCategory}">${leafHeader}</div>`;
                                
                                // Render all values
                                for (const value of values) {
                                    const displayValue = (value === '-' || value === '' || value === ' ') 
                                        ? '-' : value;
                                    html += `<div class="${config.value}">${displayValue}</div>`;
                                }
                                
                                html += `</div>`;
                            }
                        } else if (Array.isArray(leafMap)) {
                            // Handle case where top level contains direct values
                            html += `<div class="${config.contentGroup}">
                                <div class="${config.labelCategory}">${topHeader}</div>`;
                            
                            // Render all values
                            for (const value of leafMap) {
                                const displayValue = (value === '-' || value === '' || value === ' ') 
                                    ? '-' : value;
                                html += `<div class="${config.value}">${displayValue}</div>`;
                            }
                            
                            html += `</div>`;
                        }
                    }
                    
                    return html;
                },

                /**
                 * Properly render a complex multi-level table HTML (3+ levels)
                 * 
                 * This completely rewritten renderer properly handles deeply nested hierarchies
                 * by recursively processing all levels while maintaining the correct structure.
                 * 
                 * @param {Map} topLevelGroups - Columns grouped by their hierarchical structure
                 * @param {Object} config - CSS class configuration
                 * @returns {String} HTML for the complex multi-level table
                 */
                renderComplexMultiLevelTableHtml: function(topLevelGroups, config) {
                    const logger = window.TableConverter.logger;
                    let html = '';
                    
                    logger.logRender('Starting complex multi-level table rendering', {
                        topLevelGroupCount: topLevelGroups.size,
                        topLevelHeaders: Array.from(topLevelGroups.keys())
                    });
                    
                    // Helper function to format display values consistently
                    const formatDisplayValue = (value) => {
                        if (value === null || value === undefined || value === '') {
                            return '-';
                        } else if (value === '-' || value === ' ' || value === '.') {
                            return value;
                        }
                        return value;
                    };
                    
                    /**
                     * Recursive renderer that handles any depth of nesting
                     * The critical fix is that this function distinguishes between
                     * parent nodes (with children) and leaf nodes (with values)
                     */
                    const renderNestedLevel = (map, level = 0) => {
                        let levelHtml = '';
                        
                        for (const [key, value] of map) {
                            // Check if this is a leaf node (with values) or a parent node (with children)
                            const isLeafNode = Array.isArray(value) || value === null || value === undefined || 
                                              (typeof value !== 'object' || !(value instanceof Map));
                            
                            // Only add headers for non-leaf nodes or the top level
                            if (!isLeafNode || level <= 1) {
                                // Select the appropriate class based on level
                                let headerClass;
                                if (level === 0) {
                                    headerClass = config.headerColumns;
                                } else if (level === 1) {
                                    headerClass = config.columnGroup;
                                } else {
                                    headerClass = config.columnSubgroup;
                                }
                                
                                // Add header for this level
                                levelHtml += `<div class="${headerClass}">${key}</div>`;
                            }
                            
                            // Process based on node type
                            if (value instanceof Map) {
                                // Recursively render next level
                                levelHtml += renderNestedLevel(value, level + 1);
                            } else if (Array.isArray(value)) {
                                // This is a leaf node with values - render content group
                                levelHtml += `<div class="${config.contentGroup}">
                                    <div class="${config.labelCategory}">${key}</div>`;
                                
                                // Render all values
                                for (const item of value) {
                                    levelHtml += `<div class="${config.value}">${formatDisplayValue(item)}</div>`;
                                }
                                
                                levelHtml += `</div>`;
                            } else if (value === null || value === undefined) {
                                // Handle empty leaf nodes gracefully
                                levelHtml += `<div class="${config.contentGroup}">
                                    <div class="${config.labelCategory}">${key}</div>
                                    <div class="${config.value}">-</div>
                                </div>`;
                            } else {
                                // Handle single value case (not in an array)
                                levelHtml += `<div class="${config.contentGroup}">
                                    <div class="${config.labelCategory}">${key}</div>
                                    <div class="${config.value}">${formatDisplayValue(value)}</div>
                                </div>`;
                            }
                        }
                        
                        return levelHtml;
                    };
                    
                    try {
                        // Start rendering from the top level
                        html = renderNestedLevel(topLevelGroups);
                        
                        logger.logRender('Complex multi-level table rendering complete', {
                            htmlLength: html.length
                        });
                    } catch (error) {
                        logger.error('Error in renderComplexMultiLevelTableHtml', {
                            message: error.message,
                            stack: error.stack
                        });
                        
                        // Provide fallback rendering in case of error
                        html = `<div class="${config.headerColumns}">Error rendering table</div>
                                <div class="error-message">Error: ${error.message}</div>`;
                    }
                    
                    return html;
                },          

                /**
                 * Render column data for a sublabel
                 * 
                 * Entry point for column data rendering that orchestrates the complete
                 * preparation and HTML generation process. This function:
                 * 
                 * 1. Prepares column data with full hierarchy information
                 * 2. Selects the appropriate rendering strategy
                 * 3. Generates optimized HTML for the specific column structure
                 * 4. Includes context identifiers for interactive behavior
                 * 
                 * This coordinating function ensures all column data is properly transformed
                 * into mobile-friendly display formats regardless of complexity.
                 * 
                 * @param {Object} sublabel - The sublabel containing column data
                 * @param {Object} columnInfo - Column hierarchy information
                 * @param {String} contextId - Unique identifier for this rendering context
                 * @returns {String} HTML for the column data display
                 */
                renderColumnData: function(sublabel, columnInfo, contextId) {
                    // First prepare the data
                    const preparedData = this.prepareColumnData(sublabel, columnInfo);
                    
                    // Generate the HTML based on the prepared data
                    return this.generateColumnHtml(preparedData);
                },

            // COMPONENT RENDERING FUNCTIONS
            //----------------------------------------
                /**
                 * Render a section element with all its content
                 * 
                 * Creates HTML for a complete section including title, subtitles, and sublabels
                 * in a mobile-friendly accordion format. This function:
                 * 
                 * 1. Renders the section header and accordion trigger elements
                 * 2. Creates section title and subtitle elements based on hierarchy type
                 * 3. Processes all subtitles within the section
                 * 4. Handles different rendering approaches based on hierarchy type
                 * 5. Maintains proper interactive behavior for accordion functionality
                 * 
                 * This top-level rendering function creates the primary container elements
                 * that organize table content into collapsible sections for mobile viewing.
                 * 
                 * @param {Object} section - The section to render
                 * @param {Number} sectionIndex - Index of this section
                 * @param {String} hierarchyType - Type of table hierarchy
                 * @param {Object} renderStats - Rendering statistics to update
                 * @param {Object} columnInfo - Column hierarchy information
                 * @returns {String} HTML for the complete section
                 */
                renderSection: function(section, sectionIndex, hierarchyType, renderStats, columnInfo) {
                    if (!section) return '';
                    
                    const config = this.getSelectors();
                    const logger = window.TableConverter.logger;
                    
                    let html = '';
                    
                    // Section ID/header content
                    const isActive = false; // ALL SECTIONS START CLOSED
                    const activeClass = isActive ? 'active' : '';
                    
                    html += `<div class="${config.item}" data-section-index="${sectionIndex}" style="transition: none;">`;
                    html += `<div class="${config.ecHead} ${activeClass}" data-accordion-trigger style="transition: none;">
                        <h3 class="${config.header}">${section.id}</h3>
                        <svg class="${config.arrow}" viewBox="0 0 24 24">
                            <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
                        </svg>
                    </div>`;
                    
                    // Section content wrapper (closed by default)
                    const expandedHeight = '0px'; // ALL SECTIONS START CLOSED
                    html += `<div class="${config.content} ${activeClass}" style="transition: height 300ms ease-in-out; overflow: hidden; height: ${expandedHeight};">`;
                    
                    // Add section title if present AND not a section-only or data-only table
                    if (section.title && 
                        hierarchyType !== 'section-only' && 
                        hierarchyType !== 'data-only') {
                        html += `<div class="${config.sectionTitle}">${section.title}</div>`;
                    }
                    
                    // Add section subtitle - BUT ONLY FOR hierarchical tables that aren't "section-only"
                    if (section.subtitle && 
                        hierarchyType !== 'section-only' && 
                        hierarchyType !== 'data-only') {
                        html += `<div class="${config.sectionSubtitle}">${section.subtitle}</div>`;
                    }
                    
                    // Process subtitles
                    if (section.subtitles && section.subtitles.length > 0) {
                        const subtitles = Array.isArray(section.subtitles) ? 
                            section.subtitles : Object.values(section.subtitles);
                        
                        renderStats.subtitleCount += subtitles.length;
                        
                        let subtitleIndex = 0;
                        
                        for (const subtitle of subtitles) {
                            // Skip invalid or virtual subtitles
                            if (!subtitle || (subtitle.isVirtual && subtitle.structuralOnly)) {
                                renderStats.virtualElements.subtitles++;
                                continue;
                            }
                            
                            // For section-only tables, DON'T render subtitle headers
                            if (hierarchyType !== 'section-only' && hierarchyType !== 'data-only') {
                                html += `<div class="${config.subtitleHeader}" data-subtitle-index="${subtitleIndex}">${subtitle.title}</div>`;
                            }
                            
                            // Process sublabels
                            if (subtitle.sublabels && subtitle.sublabels.length > 0) {
                                const sublabels = Array.isArray(subtitle.sublabels) ? 
                                    subtitle.sublabels : Object.values(subtitle.sublabels);
                                
                                renderStats.sublabelCount += sublabels.length;
                                
                                let sublabelIndex = 0;
                                
                                for (const sublabel of sublabels) {
                                    if (!sublabel) continue;
                                    
                                    const sublabelId = `section${sectionIndex}-subtitle${subtitleIndex}-sublabel${sublabelIndex}`;
                                    
                                    // For section-only tables, don't render sublabel titles either
                                    if (hierarchyType !== 'section-only' && 
                                        this.shouldRenderSublabelTitle(sublabel, subtitle, hierarchyType)) {
                                        html += `<div class="${config.sublabelTitle}" data-sublabel-id="${sublabelId}">${sublabel.title}</div>`;
                                        html += `<div class="column-hierarchy" data-sublabel-context="${sublabelId}">`;
                                    } else {
                                        html += `<div class="column-hierarchy" data-virtual-sublabel="${sublabelId}">`;
                                    }
                                    
                                    // Render column data for this sublabel
                                    html += this.renderColumnData(sublabel, columnInfo, sublabelId);
                                    html += `</div>`;
                                    
                                    if (sublabel.isVirtual || sublabel.structuralOnly) {
                                        renderStats.virtualElements.sublabels++;
                                    }
                                    
                                    sublabelIndex++;
                                }
                            }
                            
                            subtitleIndex++;
                        }
                    }
                    
                    // Close section content and item divs
                    html += '</div></div>';
                    
                    return html;
                }
        },

        /**
         * Main entry point for rendering hierarchical tables as accordions
         * 
         * Transforms complex structured table data into a mobile-friendly accordion interface
         * with comprehensive support for nested hierarchies. The rendering process:
         * 
         * 1. Analyzes the complete table structure to determine optimal rendering strategy
         * 2. Renders title elements and section containers
         * 3. Processes sections, subtitles, and sublabels in hierarchical order
         * 4. Renders column data with specialized handling for complex cases
         * 5. Adds interactive behaviors through injected script components
         * 
         * The renderer handles many special cases including:
         * - Virtual elements that exist in the data structure but not the original table
         * - Complex column hierarchies with nested groups
         * - Multi-level header relationships
         * - Data cells affected by rowspan/colspan
         * 
         * It maintains a consistent rendering approach across different table types
         * while optimizing the display for specific structural patterns.
         * 
         * @param {Object} structuredData - The processed hierarchical table data
         * @returns {String} HTML for the accordion with full interactive capabilities
         */
        renderHierarchicalAccordion: function(structuredData) {
            // Safe logger reference
            const logger = window.TableConverter.logger.ensureSafeLogger(window.TableConverter.logger);
            
            // Start logging for diagnostics
            if (this.helpers && this.helpers.logCompleteStructure) {
                this.helpers.logCompleteStructure(structuredData, logger);
            }
            
            // Initialize tracking metrics
            const renderStats = {
                sectionCount: 0,
                subtitleCount: 0,
                sublabelCount: 0,
                dataCellCount: 0,
                virtualElements: { sections: 0, subtitles: 0, sublabels: 0 },
                errors: 0,
                columnHierarchies: []
            };
            
            // REMOVED: Outer wrapper div initialization
            // Initialize with empty string instead
            let html = '';
            
            const startTime = Date.now();
            
            try {
                // Input validation
                if (!structuredData) {
                    throw new Error("Missing structured data for rendering");
                }
                
                // Get config selectors
                const config = this.helpers.getSelectors();
                
                // Add title if present
                if (structuredData.title) {
                    // Get config selectors
                    const config = this.helpers.getSelectors();
                    html += `<div class="${config.standaloneTitle}">${structuredData.title}</div>`;
                    logger.logRender("Added standalone title to rendering", {
                        title: structuredData.title
                    });
                }
                
                // Generate unique ID for this accordion
                const accordionId = `accordion-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
                
                // Main accordion container
                html += `<div class="${config.root}" data-accordion="${accordionId}" style="transition: none;">
                        <div class="${config.list}" style="transition: none;">`;
                
                // Process each section
                const sections = Array.isArray(structuredData.sections) ? 
                    structuredData.sections : Object.values(structuredData.sections || {});
                    
                renderStats.sectionCount = sections.length;
                
                // Track section indices for rendered sections
                let sectionIndex = 0;
                
                for (const section of sections) {
                    // Skip invalid or virtual sections
                    if (!section || (section.isVirtual && section.structuralOnly)) {
                        renderStats.virtualElements.sections++;
                        continue;
                    }
                    
                    // Use the renderSection helper function
                    html += this.helpers.renderSection(
                        section, 
                        sectionIndex, 
                        structuredData.hierarchyType, 
                        renderStats, 
                        structuredData.columnInfo
                    );
                    
                    sectionIndex++;
                }
                
                // Close accordion containers
                html += '</div></div>';
                
                // Calculate statistics
                renderStats.renderTime = Date.now() - startTime;
                renderStats.outputSize = html.length;
                
                // Add script to handle accordion events
                html += `<script>
                    (function() {
                        // Wait for DOM to be ready
                        setTimeout(function() {
                            // Find the accordion we just created
                            const accordion = document.querySelector('[data-accordion="${accordionId}"]');
                            if (!accordion) return;
                            
                            // Set up accordion event handlers
                            accordion.querySelectorAll('[data-accordion-trigger]').forEach(trigger => {
                                trigger.addEventListener('click', function(e) {
                                    e.preventDefault();
                                    
                                    try {
                                        const content = this.nextElementSibling;
                                        const isActive = this.classList.contains('active');
                                        
                                        // Toggle classes
                                        this.classList.toggle('active');
                                        content.classList.toggle('active');
                                        
                                        // Set height based on current state
                                        content.style.height = isActive ? '0px' : 
                                            (content.scrollHeight > 0 ? \`\${content.scrollHeight}px\` : 'auto');
                                    } catch (error) {
                                        console.error('Error in accordion handler:', error);
                                    }
                                    
                                    return false; // Important: prevent async response
                                });
                            });
                        }, 100);
                    })();
                </script>`;
                
            } catch (error) {
                // Error handling
                logger.error('Error rendering hierarchical accordion', {
                    message: error.message,
                    stack: error.stack
                });
                
                renderStats.errors++;
                
                // REMOVED: Wrapper div for error message
                const errorMessageClass = window.TableConverter?.CONFIG?.selectors?.structure?.errorMessage || "error-message";
                html = `<div class="${errorMessageClass}">Unable to render table content: ${error.message}</div>`;
            }
            
            // Final logging
            const renderSummary = {
                success: renderStats.errors === 0,
                structuredData: structuredData,
                statistics: renderStats,
                outputSize: html.length
            };
            
            if (this.helpers && this.helpers.logRenderSummary) {
                this.helpers.logRenderSummary(renderSummary);
            }
            
            return html;
        },

        /**
         * Render standard accordion HTML from structured data
         * @param {Object|Array} structuredData - Processed table data
         * @param {HTMLElement} table - Original table element
         * @returns {String} HTML for the accordion
         */
        renderStandardAccordion: function(structuredData, table) {
            const CONFIG = window.TableConverter.CONFIG;
            const logger = window.TableConverter.logger;
            
            logger.logConverter('Rendering standard accordion');
            
            // REMOVED: Outer wrapper initialization, start with empty string
            let html = '';
            
            // Add title if present - use HTML title if available, fallback to text
            if (structuredData.title) {
                const titleContent = structuredData.hasRichTitle && structuredData.titleHTML ? 
                                structuredData.titleHTML : structuredData.title;
                html += `<div class="table-standalone-title">${titleContent}</div>`;
                logger.logConverter('Added table title');
            }
            
            html += `<div class="${CONFIG.selectors.components.accordion.root}" data-accordion>
                    <div class="${CONFIG.selectors.components.accordion.list}">`;
            
            // Process items - FIX: Make sure itemsArray is an array
            const itemsArray = structuredData.items || structuredData;
            
            // FIX: Check if itemsArray is actually an array before using forEach
            if (Array.isArray(itemsArray)) {
                logger.logConverter('Processing accordion items', { count: itemsArray.length });
                
                itemsArray.forEach(item => {
                    // Use rowTitleHTML if available and has rich content, otherwise use plain text
                    const rowTitleContent = item.hasRichTitle && item.rowTitleHTML ? 
                                        item.rowTitleHTML : item.rowTitle;
                    
                    html += `
                        <div class="${CONFIG.selectors.components.accordion.item}">
                            <div class="ec-head" data-accordion-trigger>
                                <h3 class="${CONFIG.selectors.components.accordion.header}">
                                    ${item.rowId ? `<span class="row-id">${item.rowId}</span> ` : ''}
                                    <div class="row-title-wrapper">${rowTitleContent}</div>
                                </h3>
                                <svg class="${CONFIG.selectors.components.accordion.arrow}" viewBox="0 0 24 24">
                                    <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                                </svg>
                            </div>
                            <div class="${CONFIG.selectors.components.accordion.content}" style="height: 0; transition: height ${CONFIG.timing.transitionDuration}ms ${CONFIG.animation.accordionEasing}">`;
                    
                    // Add columns
                    if (item.columns && item.columns.length > 0) {
                        item.columns.forEach(column => {
                            // Use HTML title for column if available
                            const columnTitleContent = column.hasRichHeader && column.columnTitleHTML ? 
                                                    column.columnTitleHTML : column.columnTitle;
                            
                            html += `<div class="${CONFIG.selectors.components.accordion.contentGroup}">
                                <div class="label category">${columnTitleContent}</div>`;
                            
                            // Use HTML values when available, fall back to plain text
                            if (Array.isArray(column.values)) {
                                // Choose between HTML values and plain text values
                                const valueSource = column.hasRichContent && Array.isArray(column.htmlValues) ? 
                                                column.htmlValues : column.values;
                                
                                // Use appropriate content analysis if available
                                const contentAnalysis = column.contentAnalysis || 
                                                    new Array(valueSource.length).fill({ hasRichContent: false });
                                
                                valueSource.forEach((value, idx) => {
                                    const analysis = idx < contentAnalysis.length ? 
                                                contentAnalysis[idx] : { hasRichContent: false };
                                    
                                    // Handle different types of content
                                    if (value === null || value === undefined || value === '') {
                                        html += `<div class="value">-</div>`;
                                    } else if (analysis.hasImages) {
                                        // Special handling for images - ensure they load correctly
                                        html += `<div class="value value-with-image">${value}</div>`;
                                    } else if (analysis.hasRichContent) {
                                        // Other rich content (paragraphs, divs, lists)
                                        html += `<div class="value value-with-rich-content">${value}</div>`;
                                    } else {
                                        // Simple text content
                                        html += `<div class="value">${value}</div>`;
                                    }
                                });
                            } else {
                                // Fallback for non-array values
                                const displayValue = (column.values === null || 
                                                column.values === undefined || 
                                                column.values === '') ? 
                                                '-' : column.values;
                                html += `<div class="value">${displayValue}</div>`;
                            }
                            
                            html += `</div>`;
                        });
                    }
                    
                    html += '</div></div>';
                });
            } else {
                // Fallback for non-array data
                logger.logConverter('Non-array data provided to renderStandardAccordion', {
                    dataType: typeof itemsArray
                });
                
                // Simple representation for non-array data if possible
                if (itemsArray && typeof itemsArray === 'object') {
                    html += `<div class="${CONFIG.selectors.components.accordion.item}">
                        <div class="ec-head" data-accordion-trigger>
                            <h3 class="${CONFIG.selectors.components.accordion.header}">Data</h3>
                            <svg class="${CONFIG.selectors.components.accordion.arrow}" viewBox="0 0 24 24">
                                <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                            </svg>
                        </div>
                        <div class="${CONFIG.selectors.components.accordion.content}" style="height: 0; transition: height ${CONFIG.timing.transitionDuration}ms ${CONFIG.animation.accordionEasing}">
                            <pre>${JSON.stringify(itemsArray, null, 2)}</pre>
                        </div>
                    </div>`;
                } else {
                    html += `<div class="accordion-error">Invalid data structure provided</div>`;
                }
            }
            
            html += '</div></div>';
            
            // Add custom CSS (leave in place as it's not part of the wrapper issue)
            html += `
            <style>
                /* Custom styles for content-agnostic rendering */
                .row-title-wrapper {
                    display: inline-block;
                    width: 100%;
                }
                
                .row-title-wrapper img {
                    max-width: 100%;
                    height: auto;
                    margin-bottom: 0.5rem;
                    vertical-align: middle;
                }
                
                .value-with-image img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                }
                
                .value-with-rich-content {
                    max-width: 100%;
                    overflow: hidden;
                }
                
                /* Fix for accordion expansion with images */
                .${CONFIG.selectors.components.accordion.content} {
                    overflow: hidden;
                }
                
                @media (max-width: 767px) {
                    .row-title-wrapper img,
                    .value-with-image img {
                        max-width: 200px;
                    }
                }
            </style>
            
            <script type="text/javascript">
                // Initialize image height recalculation after page loads
                window.addEventListener('load', function() {
                    // Find all accordion items
                    var accordions = document.querySelectorAll('[data-accordion]');
                    
                    accordions.forEach(function(accordion) {
                        var triggers = accordion.querySelectorAll('[data-accordion-trigger]');
                        
                        triggers.forEach(function(trigger) {
                            // Find the corresponding content element
                            var content = trigger.parentNode.querySelector('.${CONFIG.selectors.components.accordion.content}');
                            if (!content) return;
                            
                            // Find images in this content
                            var images = content.querySelectorAll('img');
                            
                            // Add load event to all images
                            images.forEach(function(img) {
                                img.addEventListener('load', function() {
                                    // Only recalculate if accordion is open
                                    if (content.style.height !== '0px') {
                                        // Brief timeout to ensure DOM is updated
                                        setTimeout(function() {
                                            content.style.height = content.scrollHeight + 'px';
                                        }, 50);
                                    }
                                });
                            });
                            
                            // Handle trigger click to recalculate after transition
                            trigger.addEventListener('click', function() {
                                // Allow time for transition to complete
                                setTimeout(function() {
                                    if (content.style.height !== '0px') {
                                        // Force a recalculation after opening
                                        content.style.height = content.scrollHeight + 'px';
                                    }
                                }, ${CONFIG.timing.transitionDuration + 50});
                            });
                        });
                    });
                });
            </script>`;
            
            logger.logConverter('Standard accordion rendering complete');
            return html;
        },
        
        /**
         * Render list-style accordion HTML from structured data - 100% content-agnostic
         * @param {Object|Array} structuredData - Processed table data
         * @param {HTMLElement} table - Original table element
         * @returns {String} HTML for the list-style accordion
         */
        renderListStyleAccordion: function(structuredData, table) {
            const CONFIG = window.TableConverter.CONFIG;
            const logger = window.TableConverter.logger;
            
            logger.logConverter('Rendering list-style accordion');
            
            // REMOVED: Start with empty string instead of wrapper div
            let html = '';
            
            // Add title if present - use rich HTML if available
            if (structuredData.title) {
                const titleContent = structuredData.hasRichTitle && structuredData.titleHTML ? 
                                structuredData.titleHTML : structuredData.title;
                
                html += `<div class="table-standalone-title">${titleContent}</div>`;
                logger.logConverter('Added table title outside list container');
            }
            
            // Now create the list container
            html += `<div class="${CONFIG.selectors.components.list.root} ${CONFIG.selectors.components.list.accordionStyle}">`;
            
            // Process each row from the structured data
            const itemsArray = structuredData.items || structuredData;
            
            if (Array.isArray(itemsArray)) {
                // Process each row
                itemsArray.forEach((item, index) => {
                    // CRITICAL CHANGE: Always use rowTitleHTML for consistent structure handling
                    // This ensures all HTML elements (including images) are preserved
                    const rowTitleContent = item.rowTitleHTML || item.rowTitle;
                    
                    // Add row title as header - don't need row ID if we're preserving all structure
                    html += `<div class="${CONFIG.selectors.components.list.content} header">
                                <div class="row-title-wrapper">${rowTitleContent}</div>
                            </div>`;
                    
                    // Process columns
                    if (item.columns && item.columns.length > 0) {
                        // Skip the first column if it's a sublabel with empty title (handled differently in list style)
                        const startIndex = item.columns[0]?.columnTitle === '' ? 1 : 0;
                        
                        for (let i = startIndex; i < item.columns.length; i++) {
                            const column = item.columns[i];
                            
                            // Add category header if exists - use rich HTML if available
                            if (column.columnTitle) {
                                const columnTitleContent = column.hasRichHeader && column.columnTitleHTML ? 
                                                        column.columnTitleHTML : column.columnTitle;
                                
                                html += `<div class="${CONFIG.selectors.components.list.content} category-header">
                                            ${columnTitleContent}
                                        </div>`;
                            }
                            
                            // Choose appropriate values array based on content type
                            const valueSource = column.hasRichContent && Array.isArray(column.htmlValues) ? 
                                            column.htmlValues : column.values;
                            
                            // Get content analysis if available
                            const contentAnalysis = column.contentAnalysis || 
                                                new Array(valueSource.length).fill({ hasRichContent: false });
                            
                            // Process values
                            valueSource.forEach((value, idx) => {
                                if (!value || value === '') return;
                                
                                const analysis = idx < contentAnalysis.length ? 
                                            contentAnalysis[idx] : { hasRichContent: false };
                                
                                // Handle different content types appropriately
                                if (analysis.hasImages) {
                                    html += `<div class="${CONFIG.selectors.components.list.content} value value-with-image">
                                                ${value}
                                            </div>`;
                                } else if (analysis.hasRichContent) {
                                    html += `<div class="${CONFIG.selectors.components.list.content} value value-with-rich-content">
                                                ${value}
                                            </div>`;
                                } else {
                                    html += `<div class="${CONFIG.selectors.components.list.content} value">
                                                ${value || '-'}
                                            </div>`;
                                }
                            });
                        }
                    }
                });
            } else {
                // Fallback for non-array data
                html += `<div class="${CONFIG.selectors.components.list.content} error">
                            Invalid data structure
                        </div>`;
            }
            
            html += '</div>'; // Close the list container
            
            // Add custom CSS for content-agnostic list rendering
            html += `
            <style>
                /* Custom styles for content-agnostic list rendering */
                .row-title-wrapper {
                    width: 100%;
                    display: inline-block;
                }
                
                .row-title-wrapper img,
                .value-with-image img {
                    max-width: 100%;
                    height: auto;
                    margin-bottom: 0.5rem;
                    vertical-align: middle;
                }
                
                .value-with-rich-content {
                    max-width: 100%;
                    overflow: hidden;
                }
                
                /* Fix for direct content vs. paragraph-wrapped content */
                .row-title-wrapper > img {
                    display: block;
                    margin: 0.5rem auto;
                }
                
                /* Responsive adjustments */
                @media (max-width: 767px) {
                    .row-title-wrapper img,
                    .value-with-image img {
                        max-width: 200px;
                    }
                }
            </style>
            
            <script type="text/javascript">
                // Handle image loading for optimal display
                window.addEventListener('load', function() {
                    var images = document.querySelectorAll('.${CONFIG.selectors.components.list.root} img');
                    images.forEach(function(img) {
                        // Force layout recalculation after image loads
                        img.addEventListener('load', function() {
                            // This triggers a reflow
                            document.body.offsetHeight;
                        });
                        
                        // For already loaded images
                        if (img.complete) {
                            var evt = document.createEvent('Event');
                            evt.initEvent('load', false, false);
                            img.dispatchEvent(evt);
                        }
                    });
                });
            </script>`;
            
            logger.logConverter('List-style accordion rendering complete');
            return html;
        },

        /**
        * Render a simple small table - 100% content-agnostic
        * @param {HTMLElement} table - The table element to process
        * @returns {String} HTML for the simple small table
        */
        renderSimpleSmallTable: function(table) {
            const CONFIG = window.TableConverter.CONFIG;
            const logger = window.TableConverter.logger;
            
            logger.logConverter('Rendering simple small table for mobile-list-like-accordion');
            
            // REMOVED: Start with empty string instead of wrapper div
            let html = '';
            
            if (table && table.rows && table.rows.length > 0) {
                const rows = table.rows;
                
                // Extract the title from first row with colspan
                const firstRow = rows[0];
                if (!firstRow || !firstRow.cells || !firstRow.cells[0]) {
                    return `<div class="error">Invalid table structure</div>`;
                }
                
                const titleCell = firstRow.cells[0];
                const titleContent = titleCell.innerHTML.trim();
                const hasRichTitle = titleContent.includes('<img') || 
                                    titleContent.includes('<p') || 
                                    titleContent.includes('<div');
                
                // Add the title as a header
                html += `<div class="${CONFIG.selectors.components.list.root} ${CONFIG.selectors.components.list.accordionStyle}">`;
                html += `<div class="${CONFIG.selectors.components.list.content} header ${hasRichTitle ? 'rich-content' : ''}">
                            <div class="title-wrapper">${titleContent}</div>
                        </div>`;
                
                // Process all cells in rows 1+ with content type detection
                for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
                    const row = rows[rowIndex];
                    if (!row || !row.cells) continue;
                    
                    // Process all cells as values
                    for (let cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
                        const cell = row.cells[cellIndex];
                        if (!cell) continue;
                        
                        const content = cell.innerHTML.trim();
                        if (!content) continue;
                        
                        // Detect content type
                        const hasImages = content.includes('<img');
                        const hasRichContent = hasImages || 
                                            content.includes('<p') || 
                                            content.includes('<div') ||
                                            content.includes('<ul') ||
                                            content.includes('<ol');
                        
                        // Use appropriate CSS class based on content type
                        const contentTypeClass = hasImages ? 'value-with-image' : 
                                                (hasRichContent ? 'value-with-rich-content' : '');
                        
                        // Render with appropriate class
                        html += `<div class="${CONFIG.selectors.components.list.content} value ${contentTypeClass}">
                                ${content}
                            </div>`;
                    }
                }
                
                html += `</div>`;
            } else {
                html += `<div class="error">No rows found in table</div>`;
            }
            
            // Add custom CSS for content-agnostic simple table
            html += `
            <style>
                /* Styles for content-agnostic simple table */
                .title-wrapper {
                    width: 100%;
                    display: inline-block;
                }
                
                .rich-content {
                    display: block;
                }
                
                .value-with-image img,
                .rich-content img {
                    max-width: 100%;
                    height: auto;
                    margin-bottom: 0.5rem;
                }
                
                .value-with-rich-content {
                    max-width: 100%;
                    overflow: hidden;
                }
                
                /* Mobile optimizations */
                @media (max-width: 767px) {
                    .value-with-image img,
                    .rich-content img {
                        max-width: 200px;
                    }
                }
            </style>
            
            <script type="text/javascript">
                // Handle image loading 
                window.addEventListener('load', function() {
                    var images = document.querySelectorAll('.${CONFIG.selectors.components.list.root} img');
                    
                    images.forEach(function(img) {
                        // Add load event handler
                        img.addEventListener('load', function() {
                            // Force layout recalculation
                            document.body.offsetHeight;
                        });
                        
                        // Trigger for already loaded images
                        if (img.complete) {
                            var evt = document.createEvent('Event');
                            evt.initEvent('load', false, false);
                            img.dispatchEvent(evt);
                        }
                    });
                });
            </script>`;
            
            logger.logConverter('Simple small table rendering complete');
            return html;
        }
    },

// 11. Conversion Methods
    /**
     * Contains high-level conversion methods that transform tables into different mobile-friendly formats.
     * This system:
     * - Provides methods for converting tables to accordions
     * - Implements carousel transformations for image-heavy tables
     * - Creates list-style layouts for simpler data tables
     * - Detects appropriate conversion method based on table structure
     * - Handles fallback strategies when primary conversion fails
     * - Coordinates with the render system to generate output
     * - Manages conversion errors with graceful degradation
     * 
     * This object provides the primary API methods that other systems call to perform the actual
     * table conversions, acting as a bridge between the analysis and rendering systems.
     */
    conversion: {
        /**
         * Convert table to accordion
         * 
         * Primary conversion function that transforms a table into a mobile-friendly accordion.
         * This intelligent converter:
         * 
         * 1. Detects if the table has a hierarchical structure requiring special handling
         * 2. For hierarchical tables, uses the hierarchical processor and renderer
         * 3. For standard tables, uses the regular table processor
         * 4. Implements comprehensive fallback strategies for error cases
         * 
         * The converter maintains a consistent user experience while optimizing the
         * specific rendering approach based on table structure. This ensures tables
         * with complex hierarchies receive appropriate treatment while simpler tables
         * get streamlined processing.
         * 
         * The implementation includes thorough error handling to ensure some useful
         * output is generated even when processing complex or malformed tables.
         * 
         * @param {HTMLElement} table - Table to convert
         * @returns {String} HTML for accordion
         */
        toAccordion: function(table) {
            const TC = window.TableConverter;
            const logger = TC.logger;
            
            if (!table) {
                logger.logConverter('Invalid table provided to convertToAccordion');
                return '';
            }
            
            logger.logConverter('Converting table to accordion', {
                tableId: table.getAttribute ? table.getAttribute('id') || 'none' : 'none',
                rowCount: table.rows ? table.rows.length : 0
            });
            
            // Very defensive check for the tableAnalysis object and isHierarchicalTable method
            let isHierarchical = false;
            try {
                isHierarchical = TC.tableAnalysis && 
                                typeof TC.tableAnalysis.isHierarchicalTable === 'function' && 
                                TC.tableAnalysis.isHierarchicalTable(table);
            } catch (error) {
                logger.error('Error in hierarchical table detection:', error);
                isHierarchical = false;
            }
            
            logger.logConverter('Hierarchical table detection result', {
                isHierarchical: !!isHierarchical,
                rowCount: table.rows ? table.rows.length : 0,
                thWithRowspan: table.querySelectorAll ? table.querySelectorAll('th[rowspan]').length : 0,
                detectionMethod: 'structural analysis'
            });
            
            if (isHierarchical) {
                logger.logConverter('Converting hierarchical table to accordion');
                
                // Ensure processors.helpers exists and is accessible
                if (!TC.processors || 
                    !TC.processors.helpers || 
                    typeof TC.processors.helpers.processHierarchicalTable !== 'function') {
                    logger.logConverter('Missing processors.helpers - using fallback processing');
                    return this.toAccordionBase(table, { isListStyle: false });
                }
                
                // Process the hierarchical table with proper error handling
                let structuredData = null;
                try {
                    // Use a local variable first to avoid multiple property access chains
                    const helpersObj = TC.processors.helpers;
                    structuredData = helpersObj.processHierarchicalTable.call(helpersObj, table);
                } catch (processError) {
                    logger.error('Error processing hierarchical table:', processError);
                    return this.toAccordionBase(table, { isListStyle: false });
                }
                
                // Safety check for structuredData
                if (!structuredData) {
                    logger.logConverter('No structured data returned - falling back to standard');
                    return this.toAccordionBase(table, { isListStyle: false });
                }
                
                // Verify sections exists and is an array
                if (!structuredData.sections || !Array.isArray(structuredData.sections)) {
                    logger.logConverter('Missing sections array - falling back to standard');
                    return this.toAccordionBase(table, { isListStyle: false });
                }
                
                // Safe access to columnInfo with fallbacks
                const columnInfo = structuredData.columnInfo || {};
                const topLevelHeaders = columnInfo.topLevelHeaders || [];
                const structure = columnInfo.structure || [];
                const hierarchiesSize = columnInfo.hierarchies ? 
                                    (typeof columnInfo.hierarchies.size === 'number' ? 
                                    columnInfo.hierarchies.size : 0) : 0;
                
                // Safe method to count data sections
                const countDataSections = function(sections) {
                    if (!sections || !Array.isArray(sections)) return 0;
                    return sections.filter(s => s && s.isDataSection).length;
                };
                
                // Log with safe property access
                logger.logConverter('Hierarchical structured data', {
                    hasData: !!structuredData,
                    title: structuredData.title || '',
                    sectionCount: structuredData.sections.length,
                    columnInfo: {
                        topLevelHeaders: topLevelHeaders.length,
                        structure: structure.length,
                        hierarchies: hierarchiesSize
                    },
                    dataSections: countDataSections(structuredData.sections)
                });
                
                // Render using hierarchical accordion with proper error handling
                try {
                    // Ensure renderHierarchicalAccordion is a function before calling it
                    if (typeof TC.render.renderHierarchicalAccordion !== 'function') {
                        logger.logConverter('renderHierarchicalAccordion not available - falling back');
                        return this.toAccordionBase(table, { isListStyle: false });
                    }
                    
                    const renderedHtml = TC.render.renderHierarchicalAccordion(structuredData, table);
                    
                    if (!renderedHtml) {
                        logger.logConverter('No HTML rendered - falling back to standard');
                        return this.toAccordionBase(table, { isListStyle: false });
                    }
                    
                    // Log successful rendering
                    logger.logConverter('Rendered hierarchical accordion', {
                        outputSize: renderedHtml.length
                    });
                    
                    return renderedHtml;
                } catch (renderError) {
                    logger.error('Error rendering hierarchical accordion:', renderError);
                    return this.toAccordionBase(table, { isListStyle: false });
                }
            }
            
            // For regular tables, use the standard structure and renderer with error handling
            logger.logConverter('Processing as standard table');
            
            try {
                // Check if process.toStructure is available
                if (typeof TC.process.toStructure !== 'function') {
                    logger.logConverter('process.toStructure not available - falling back');
                    return this.toAccordionBase(table, { isListStyle: false });
                }
                
                const standardData = TC.process.toStructure(table);
                
                if (!standardData) {
                    logger.logConverter('Failed to convert table structure - falling back to base accordion');
                    return this.toAccordionBase(table, { isListStyle: false });
                }
                
                // Check if renderStandardAccordion is available
                if (typeof TC.render.renderStandardAccordion !== 'function') {
                    logger.logConverter('renderStandardAccordion not available - falling back');
                    return this.toAccordionBase(table, { isListStyle: false });
                }
                
                // Use the standard accordion renderer
                return TC.render.renderStandardAccordion(standardData, table);
            } catch (standardError) {
                logger.error('Error in standard table processing:', standardError);
                return this.toAccordionBase(table, { isListStyle: false });
            }
        },

        /**
         * Base accordion converter used by both standard and list style accordions
         * @param {HTMLElement} table - Table to convert
         * @param {Object} options - Options for conversion
         * @returns {String} HTML for accordion
         */
        toAccordionBase: function(table, options = {}) {
            const TC = window.TableConverter;
            const logger = TC.logger;
            
            logger.logConverter('Converting table to base accordion', { options });
            
            const isListStyle = options.isListStyle || false;
            
            try {
                // Convert table to structured data
                const structuredData = TC.process.toStructure(table);
                if (!structuredData) {
                    logger.logConverter('Failed to convert table to structure for accordion base');
                    return null;
                }
                
                // Render as list style or standard accordion based on option
                if (isListStyle) {
                    return TC.render.renderListStyleAccordion(structuredData, table);
                } else {
                    return TC.render.renderStandardAccordion(standardData, table);
                }
            } catch (error) {
                logger.logConverter('Error in toAccordionBase:', error);
                return null;
            }
        },

        /**
         * Convert table to accordion-style list
         * @param {HTMLElement} table - Table to convert
         * @returns {String} HTML for accordion-style list
         */
        toAccordionStyleList: function(table) {
            const TC = window.TableConverter;
            const logger = TC.logger;
            
            // Check if this is a small table (4 rows or fewer) with a colspan in first row
            if (table && table.rows && table.rows.length <= 4) {
                const firstRow = table.rows[0];
                if (firstRow && firstRow.cells && firstRow.cells[0]) {
                    const firstCell = firstRow.cells[0];
                    
                    // Check for colspan
                    const hasColspan = firstCell.hasAttribute('colspan') || 
                                        firstCell.colSpan > 1;
                                        
                    // Check if all cells are TD (not TH)
                    let allTdCells = true;
                    for (let i = 0; i < table.rows.length; i++) {
                        const row = table.rows[i];
                        for (let j = 0; j < row.cells.length; j++) {
                            if (row.cells[j].tagName.toLowerCase() === 'th') {
                                allTdCells = false;
                                break;
                            }
                        }
                        if (!allTdCells) break;
                    }
                    
                    logger.logConverter('Small table analysis', {
                        rows: table.rows.length,
                        hasColspan: hasColspan,
                        allTdCells: allTdCells
                    });
                    
                    // If criteria match, use our simple table renderer
                    if (hasColspan && allTdCells) {
                        logger.logConverter('Using simple small table renderer');
                        return TC.render.renderSimpleSmallTable(table);
                    }
                }
            }
            
            // Standard implementation for other tables
            logger.logConverter('Using standard accordion-style list rendering');
            return this.toAccordionBase(table, {
                isListStyle: true
            });
        },

        /**
         * Convert table to horizontal carousel
         * @param {HTMLElement} table - Table to convert
         * @returns {String} HTML for horizontal carousel
         */
        toHorizontalCarousel: function(table) {
            const TC = window.TableConverter;
            const CONFIG = TC.CONFIG;
            const logger = TC.logger;
            const utilities = TC.utilities;
            const components = TC.components;
            
            logger.logConverter('Converting table to horizontal carousel');
            
            let slides = [];
            const rows = Array.from(table.querySelectorAll('tr'));
            const numCols = rows[0]?.cells?.length || 0;
            
            if (!rows.length || !numCols) {
                logger.logConverter('Invalid table structure for carousel');
                return null;
            }
            
            logger.logConverter('Processing carousel by columns', { columns: numCols, rows: rows.length });
            
            // Process by columns
            for (let colIndex = 0; colIndex < numCols; colIndex++) {
                let slideContent = '';
                const processedContent = new Set();
                
                // Process each row's cell at current column index
                rows.forEach((row, rowIndex) => {
                    const cell = row.cells[colIndex];
                    if (!cell) return;
                    
                    const cellContent = cell.innerHTML.trim();
                    if (!cellContent || processedContent.has(cellContent)) return;
                    
                    // Handle images
                    const img = cell.querySelector('img');
                    if (img) {
                        slideContent += `<div class="${CONFIG.selectors.components.carousel.slideImage}">${img.outerHTML}</div>`;
                        processedContent.add(img.outerHTML);
                    }
                    
                    // Handle text content (title, description, etc.)
                    const textContent = utilities.cleanText(cell.textContent);
                    if (textContent && !processedContent.has(textContent)) {
                        // Check if it's a title (strong tag or first/last row)
                        if (cell.querySelector('strong') || rowIndex === 0 || rowIndex === rows.length - 1) {
                            slideContent += `<div class="${CONFIG.selectors.components.carousel.slideHeader}"><strong>${textContent}</strong></div>`;
                        } else {
                            slideContent += `<div class="${CONFIG.selectors.components.carousel.slideText}">${textContent}</div>`;
                        }
                        processedContent.add(textContent);
                    }
                });
                
                if (slideContent) {
                    slides.push({ content: slideContent });
                }
            }
            
            logger.logConverter('Horizontal carousel processed', { slideCount: slides.length });
            return components.createCarouselHTML(slides);
        },

        /**
         * Convert table to vertical carousel
         * @param {HTMLElement} table - Table to convert
         * @returns {String} HTML for vertical carousel
         */
        toVerticalCarousel: function(table) {
            const TC = window.TableConverter;
            const CONFIG = TC.CONFIG;
            const logger = TC.logger;
            const components = TC.components;
            
            logger.logConverter('Converting table to vertical carousel using marker type: ' + CONFIG.markers.types.CAROUSEL_VERTICAL.name);
            
            const rows = Array.from(table.querySelectorAll('tr'));
            if (rows.length === 0) {
                logger.logConverter('No rows found in table for vertical carousel');
                return this.toList(table); // Fallback
            }
            
            logger.logConverter('Processing vertical carousel rows', { rowCount: rows.length });
            
            // Check if the table has the expected 3-column format
            const hasExpectedFormat = rows.every(row => row.cells.length === 3);
            if (!hasExpectedFormat) {
                logger.logConverter('Table does not have consistent 3-column format for vertical carousel');
                return this.toList(table); // Fallback
            }
            
            const slides = rows.map((row, index) => {
                const cells = Array.from(row.querySelectorAll('td'));
                if (cells.length !== 3) return null;
        
                // Extract content from cells: title (left), image (middle), description (right)
                const titleCell = cells[0];
                const imageCell = cells[1];
                const descCell = cells[2];
                
                // We need an image in the middle cell
                const img = imageCell.querySelector('img');
                if (!img) return null;
                
                const title = titleCell.textContent.trim();
                const desc = descCell.textContent.trim();
                
                // Build slide content
                let slideContent = '';
                
                // Add image first
                slideContent += `<div class="${CONFIG.selectors.components.carousel.slideImage}">${img.outerHTML}</div>`;
                
                // Then title
                if (title) {
                    slideContent += `<div class="${CONFIG.selectors.components.carousel.slideTitle}">${title}</div>`;
                }
                
                // Then description
                if (desc) {
                    slideContent += `<div class="${CONFIG.selectors.components.carousel.slideText}">${desc}</div>`;
                }
                
                logger.logConverter('Built vertical carousel slide', { index, hasTitle: !!title, hasDesc: !!desc });
                return slideContent ? { content: slideContent } : null;
            }).filter(Boolean); // Remove null slides
        
            logger.logConverter('Vertical carousel processing complete', { slideCount: slides.length });
            
            if (slides.length === 0) {
                logger.logConverter('No valid slides generated for vertical carousel');
                return this.toList(table); // Fallback
            }
            
            // Create carousel HTML structure
            return components.createCarouselHTML(slides);
        },

        /**
         * Convert table to simple list - Fixed version for full-width image handling
         * @param {HTMLElement} table - Table to convert
         * @returns {String} HTML for list
         */
        toList: function(table) {
            const TC = window.TableConverter;
            const CONFIG = TC.CONFIG;
            const logger = TC.logger;
            const utilities = TC.utilities;
            
            logger.logConverter('Converting table to list with consistent image handling');
            
            const rows = Array.from(table.querySelectorAll('tr'));
            if (!rows.length) {
                logger.logConverter('No rows found for list conversion');
                return '';
            }
            
            let html = `<div class="${CONFIG.selectors.components.list.root} ${CONFIG.selectors.components.list.tableListClean} ${CONFIG.selectors.components.list.cleanList}">`;
            
            // Add some custom styles to ensure consistent appearance
            html += `<style>
                .${CONFIG.selectors.components.list.title},
                .${CONFIG.selectors.components.list.content} {
                    text-align: center;
                    margin: 10px 0;
                }
                .${CONFIG.selectors.components.list.title} img,
                .${CONFIG.selectors.components.list.content} img {
                    width: 100%;
                    max-width: 100%;
                    height: auto;
                    display: block;
                    margin: 0 auto;
                }
            </style>`;
            
            logger.logConverter('Processing list items', { rowCount: rows.length });
            
            // Helper function to extract the significant content from a cell
            const extractCellContent = (cell) => {
                // Check if cell has image
                const hasImage = cell.querySelector('img') !== null;
                
                // Get text content
                const textContent = utilities.cleanText(cell.textContent).trim();
                const hasText = textContent !== '';
                
                return { hasImage, hasText, textContent, cell };
            };
            
            // Helper function to process a cell and create appropriate HTML
            const processCellContent = (cell, isTitle = false) => {
                const cellContent = extractCellContent(cell);
                const contentClass = isTitle ? CONFIG.selectors.components.list.title : CONFIG.selectors.components.list.content;
                let cellHtml = '';
                
                // If cell has an image, always show it first in its own container
                if (cellContent.hasImage) {
                    const img = cell.querySelector('img');
                    cellHtml += `<div class="${contentClass}">
                        <img src="${img.src}" alt="${img.alt || ''}" style="width:100%; max-width:100%; height:auto;">
                    </div>`;
                }
                
                // If cell has text content besides the image, show it in its own container
                if (cellContent.hasText) {
                    // Skip content that's just a dash or empty
                    if (cellContent.textContent !== '-' && cellContent.textContent !== '') {
                        cellHtml += `<div class="${contentClass}">
                            ${cellContent.textContent}
                        </div>`;
                    }
                }
                
                return cellHtml;
            };
            
            // Process each row
            rows.forEach(row => {
                const cells = Array.from(row.querySelectorAll('td, th'));
                if (!cells.length) return;

                html += `<div class="${CONFIG.selectors.components.list.item}" style="transition: none;">`;
                
                // Process each cell
                cells.forEach((cell, index) => {
                    // First cell is title, others are content
                    const isTitle = index === 0; 
                    html += processCellContent(cell, isTitle);
                });
                
                html += '</div>';
            });
            
            html += '</div>';
            logger.logConverter('List conversion complete');
            return html;
        }
    },

// 12. Components object for handling UI component functionality
    /**
     * Manages interactive UI components created during table conversion.
     * This system:
     * - Creates HTML structures for interactive components like accordions and carousels
     * - Handles event binding for user interactions
     * - Manages component state (open/closed, current slide, etc.)
     * - Implements touch interactions for mobile devices
     * - Provides smooth transitions and animations
     * - Coordinates across different component types
     * - Handles event delegation for efficient event management
     * 
     * This object ensures the converted tables have proper interactive behavior that
     * maintains access to all content in a mobile-friendly way.
     */
    components: {
        /**
         * Create HTML structure for carousel component from items array
         * @param {Array} items - Array of slide content items
         * @returns {String} HTML for carousel component
         */
        createCarouselHTML: function(items) {
            const TC = window.TableConverter;
            const logger = TC.logger;
            
            logger.logComponent('Creating carousel HTML structure', { slideCount: items.length });
            
            if (!items || !items.length) {
                logger.logComponent('No items for carousel creation');
                return '';
            }
        
            let html = `<div class="carousel" data-carousel>
                <div class="carousel-track" data-carousel-track>`;
        
            // Add slides
            items.forEach((item, index) => {
                const isActive = index === 0;
                html += `<div class="carousel-slide" data-carousel-slide${isActive ? ' data-active="true"' : ''}>
                    <div class="slide-content">${item.content}</div>
                </div>`;
            });
        
            html += `</div>`;
        
            // Add controls only if there are multiple slides
            if (items.length > 1) {
                html += `<div class="carousel-controls">
                    <button class="carousel-btn prev" data-carousel-prev>
                        <span class="sr-only">Previous</span>
                        <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
                    </button>
                    <div class="carousel-dots">`;
                    
                // Add dots
                items.forEach((_, i) => {
                    html += `<button class="carousel-dot${i === 0 ? ' active' : ''}" data-carousel-dot="${i}" aria-label="Go to slide ${i + 1}"></button>`;
                });
                
                html += `</div>
                    <button class="carousel-btn next" data-carousel-next>
                        <span class="sr-only">Next</span>
                        <svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
                    </button>
                </div>`;
            }
        
            html += `</div>`;
            
            logger.logComponent('Carousel HTML structure complete');
            return html;
        },

        /**
         * Handle carousel navigation when prev/next buttons are clicked
         * @param {HTMLElement} carousel - Carousel element
         * @param {String} direction - Navigation direction ('prev' or 'next')
         */
        handleCarouselNavigation: function(carousel, direction) {
            const TC = window.TableConverter;
            const CONFIG = TC.CONFIG;
            const logger = TC.logger;
            
            // Validate carousel element
            if (!carousel || !carousel.nodeType || carousel.nodeType !== Node.ELEMENT_NODE) {
                logger.logComponent('Invalid carousel element');
                return;
            }
            
            // Get carousel track element
            const track = carousel.querySelector(CONFIG.selectors.components.carousel.track);
            if (!track) {
                logger.logComponent('No track found in carousel');
                return;
            }
            
            // Get all slides
            const slides = carousel.querySelectorAll(CONFIG.selectors.components.carousel.slide);
            if (!slides.length) {
                logger.logComponent('No slides found in carousel');
                return;
            }
            
            // Get current index and calculate new index
            const totalSlides = slides.length;
            const currentIndex = carousel._currentIndex || 0;
            let newIndex;
            
            if (direction === 'prev') {
                newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            } else {
                newIndex = (currentIndex + 1) % totalSlides;
            }
            
            // Update slide positions
            track.style.transition = `transform ${CONFIG.timing.carouselTransition}ms ${CONFIG.animation.carouselEasing}`;
            track.style.transform = `translateX(-${newIndex * 100}%)`;
            
            // Update active state
            slides.forEach((slide, index) => {
                slide.setAttribute('data-active', index === newIndex ? 'true' : 'false');
            });
            
            // Update dots if they exist
            const dots = carousel.querySelectorAll(CONFIG.selectors.components.carousel.navigation.dot);
            dots.forEach((dot, index) => {
                if (index === newIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            
            // Store current index in carousel
            carousel._currentIndex = newIndex;
            
            logger.logComponent('Carousel navigation', {
                direction: direction,
                index: newIndex,
                totalSlides: totalSlides
            });
        },

        /**
         * Go to a specific slide by index in the carousel
         * @param {HTMLElement} carousel - Carousel element
         * @param {Number} index - Slide index to navigate to
         */
        goToSlide: function(carousel, index) {
            const TC = window.TableConverter;
            const CONFIG = TC.CONFIG;
            const logger = TC.logger;
            
            logger.logComponent('Going to carousel slide', { requestedIndex: index });
            
            const track = carousel.querySelector(CONFIG.selectors.components.carousel.track);
            const slides = Array.from(carousel.querySelectorAll(CONFIG.selectors.components.carousel.slide));
            const dots = Array.from(carousel.querySelectorAll(CONFIG.selectors.components.carousel.navigation.dot));
            
            if (!slides.length) {
                logger.logComponent('Cannot go to slide - no slides found');
                return;
            }

            // Normalize index
            const totalSlides = slides.length;
            const normalizedIndex = Math.max(0, Math.min(index, totalSlides - 1));
            
            // Update slides
            slides.forEach((slide, i) => {
                if (i === normalizedIndex) {
                    slide.setAttribute(CONFIG.selectors.attributes.active, 'true');
                } else {
                    slide.removeAttribute(CONFIG.selectors.attributes.active);
                }
            });

            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle(CONFIG.selectors.states.active, i === normalizedIndex);
            });

            // Update track position with transition
            track.style.transition = `transform ${CONFIG.timing.transitionDuration}ms ${CONFIG.animation.carouselEasing}`;
            track.style.transform = `translateX(-${normalizedIndex * 100}%)`;
            carousel._currentIndex = normalizedIndex;
            
            logger.logComponent('Carousel slide change complete', { normalizedIndex });
        },

        /**
         * Handle click event on accordion triggers to expand/collapse content
         * @param {Event} event - Click event
         */
        handleAccordionClick: function(event) {
            const TC = window.TableConverter;
            const CONFIG = TC.CONFIG;
            const logger = TC.logger;
            
            try {
                const trigger = event.target.closest(CONFIG.selectors.components.accordion.trigger);
                if (!trigger) return;
                
                event.preventDefault();
                event.stopPropagation();
                
                logger.logComponent('Handling accordion click:', {
                    triggerElement: trigger,
                    hasContent: !!trigger.nextElementSibling
                });

                const content = trigger.nextElementSibling;
                if (!content) {
                    logger.logComponent('No content element found');
                    return;
                }

                // Close other accordions first
                const accordion = trigger.closest(`[data-accordion]`);
                if (accordion) {
                    accordion.querySelectorAll(`${CONFIG.selectors.components.accordion.trigger}.${CONFIG.selectors.states.active}`).forEach(otherTrigger => {
                        if (otherTrigger !== trigger) {
                            otherTrigger.classList.remove(CONFIG.selectors.states.active);
                            const otherContent = otherTrigger.nextElementSibling;
                            if (otherContent) {
                                otherContent.style.height = '0';
                                otherContent.classList.remove(CONFIG.selectors.states.active);
                            }
                        }
                    });
                }

                // Toggle current accordion
                const isExpanding = !trigger.classList.contains(CONFIG.selectors.states.active);
                
                // Add/remove active class on trigger
                trigger.classList.toggle(CONFIG.selectors.states.active);

                // Handle content expansion/collapse
                if (isExpanding) {
                    content.classList.add(CONFIG.selectors.states.active);
                    const height = content.scrollHeight;
                    content.style.height = '0';
                    content.offsetHeight; // Force reflow
                    content.style.height = `${height}px`;
                } else {
                    content.style.height = `${content.scrollHeight}px`;
                    content.offsetHeight; // Force reflow
                    content.style.height = '0';
                    setTimeout(() => {
                        if (!trigger.classList.contains(CONFIG.selectors.states.active)) {
                            content.classList.remove(CONFIG.selectors.states.active);
                        }
                    }, CONFIG.timing.transitionDuration);
                }
            } catch (error) {
                logger.logComponent('Error in handleAccordionClick:', error);
            }
        },

        /**
        * Handle click events on collapse buttons to expand/collapse content
        * @param {Event} event - Click event
        */
        handleCollapseButtonClick: function(event) {
            const TC = window.TableConverter;
            const logger = TC.logger;
            
            // Find the correct button element
            let button = event.target.closest('.collapse__button');
            if (!button) return;
            
            logger.logComponent('Found collapse button', {
                button: button,
                className: button.className
            });
            
            // Find the container element (next sibling of the button)
            const container = button.nextElementSibling;
            
            if (!container || !container.classList.contains('collapse__container')) {
                logger.logComponent('Warning: Unable to find valid collapse container');
                return;
            }
            
            logger.logComponent('Found collapse container', {
                container: container,
                display: container.style.display,
                maxHeight: container.style.maxHeight
            });
            
            // Now toggle the active state
            button.classList.toggle('active');
            container.classList.toggle('active');
            
            // Force reflow to ensure transitions work correctly
            container.offsetHeight;
            
            // Update display and max-height styles
            if (container.classList.contains('active')) {
                container.style.display = 'block';
                // Force reflow again
                container.offsetHeight;
                // Get accurate scrollHeight after display is block
                const height = container.scrollHeight;
                container.style.maxHeight = height + 'px';
            } else {
                // First set height to current scroll height, then animate to 0
                container.style.maxHeight = container.scrollHeight + 'px';
                // Force reflow
                container.offsetHeight;
                // Now set to 0 to trigger animation
                container.style.maxHeight = '0px';
                // Set display none only after transition is complete
                setTimeout(() => {
                    if (!container.classList.contains('active')) {
                        container.style.display = 'none';
                    }
                }, 300); // Match transition duration
            }
            
            logger.logComponent('Toggled collapse element', {
                buttonActive: button.classList.contains('active'),
                containerActive: container.classList.contains('active')
            });
            
            // Prevent the event from bubbling
            event.preventDefault();
            event.stopPropagation();
        },
    },

// 13. Initialization and Setup
    /**
     * initialization - System Bootstrap and Component Manager
     * 
     * A comprehensive initialization system that bootstraps the TableConverter library,
     * configures components, and establishes event handlers. This sophisticated system:
     * 
     * 1. Progressive Initialization:
     *    - Implements phased initialization with dependency management
     *    - Checks for prerequisites before component activation
     *    - Follows logical component dependency order 
     *    - Handles initial page state detection
     *    - Sets up system-wide event delegation
     * 
     * 2. Component Management:
     *    - Initializes interactive components based on current view mode
     *    - Provides separate initialization paths for mobile vs. desktop
     *    - Establishes event handlers for interactive elements
     *    - Sets up component-specific state and listeners
     *    - Integrates with stateManagement for tracking
     * 
     * 3. Error Resilience:
     *    - Implements comprehensive error handling
     *    - Provides fallbacks for critical components
     *    - Logs initialization details for troubleshooting
     *    - Prevents cascading failures across components
     *    - Supports reinitializing after errors
     * 
     * 4. Performance Optimization:
     *    - Uses efficient event delegation instead of direct binding
     *    - Implements single document-level handlers for performance
     *    - Avoids redundant initialization with state tracking
     *    - Optimizes handler bindings for minimal memory usage
     *    - Supports both immediate and deferred initialization
     * 
     * 5. Environment Adaptation:
     *    - Detects initial viewport state
     *    - Sets up responsive behavior listeners
     *    - Configures touch handlers for mobile devices
     *    - Adapts to different browser environments
     *    - Handles content container detection
     * 
     * This initialization system provides the foundation for the entire
     * TableConverter library, ensuring proper setup, component activation,
     * and event handling throughout the application lifecycle.
     */
    initialization: {
        /**
         * Main initialization entry point
         * 
         * Bootstrap method that initializes the entire TableConverter system
         * including state management, viewport detection, and event handlers.
         * 
         * Returns early if system is already initialized to prevent duplicate
         * initialization operations. Uses state management for tracking.
         * 
         * @returns {Boolean} Success status of initialization
         */
        initializeSystem: function() {
            const TC = window.TableConverter;
            
            // Exit if TableConverter isn't available
            if (!TC) {
                console.error('[TableConverter] Not available');
                return;
            }
            
            // Reset state management
            TC.stateManagement.reset();
            
            // NEW: Reset the loading indicator flag on initialization
            TC._loadingIndicatorShownOnce = false;
            
            // Clear any container cache
            if (TC.utilities && typeof TC.utilities.clearContainerCache === 'function') {
                TC.utilities.clearContainerCache();
            }
            
            // First check for container with content
            if (this.checkContainerAndInitialize()) {
                // Container with content already exists - done
                return;
            }
            
            // Container not found or has no content - set up observer
            this.setupContainerObserver();
        },

        /**
         * Check for container with content and initialize if found
         * Second function in the flow - checks if immediate initialization is possible
         * 
         * - Verifies if a container with meaningful content exists
         * - Schedules the main initialization if content is found
         * - Returns status for flow control
         * - IMPROVED: Reduces redundant container lookups
         * 
         * @returns {Boolean} True if container with content found and initialization started
         */
        checkContainerAndInitialize: function() {
            const TC = window.TableConverter;
            
            // Exit if TableConverter isn't available
            if (!TC || !TC.utilities) {
                if (TC && TC.logger) {
                    TC.logger.error('[TableConverter] Not properly initialized');
                } else {
                    console.error('[TableConverter] Not properly initialized');
                }
                return false;
            }
            
            const logger = TC.logger;
            
            // Track check attempts to limit excessive checking
            this._containerCheckAttempts = this._containerCheckAttempts || 0;
            this._containerCheckAttempts++;
            
            // Hard limit on check attempts to prevent excess lookups
            if (this._containerCheckAttempts > 5) {
                logger.logProcess('Maximum container check attempts reached');
                TC.utilities._lastContainerLookup = 0; // Reset cache to allow a fresh lookup on next attempt
                this._containerCheckAttempts = 0;
                return false;
            }
            
            // Use the utility function to find container - use cache first
            const forceRefresh = this._containerCheckAttempts % 3 === 0 || TC.utilities._lastContainerLookup === 0;
            const container = TC.utilities.getContainer(forceRefresh);
            
            // No container found - keep waiting
            if (!container) {
                return false;
            }
            
            // Check for video markers specifically and consider them valid content
            const hasVideoMarker = container.innerHTML && container.innerHTML.includes('LiveExtendVideoURL');
            
            // Container found but check for meaningful content
            const hasContent = container.innerHTML && (
                container.innerHTML.includes('<table') || 
                container.innerHTML.length > 500 ||
                hasVideoMarker // Video markers are now considered valid content
            );
            
            // If container with content exists, start initialization
            if (hasContent) {
                logger.logProcess('Container with content found - starting initialization');
                
                // Reset check attempts counter
                this._containerCheckAttempts = 0;
                
                // Use a timeout to ensure UI remains responsive
                setTimeout(function() {
                    if (!TC.stateManagement.isState([
                        TC.stateManagement.STATES.INITIALIZED, 
                        TC.stateManagement.STATES.INITIALIZING
                    ])) {
                        TC.initialization.start();
                    }
                }, 50);
                
                return true;
            }
            
            // Container found but no content yet
            logger.logProcess('Container found but waiting for content');
            return false;
        },

        /**
         * Set up mutation observer to detect container with content
         * Third function in the flow - used when content isn't immediately available
         * 
         * - Creates MutationObserver to watch for content appearing
         * - Includes timeout protection to prevent endless observation
         * - Calls back to checkContainerAndInitialize when content appears
         */
        setupContainerObserver: function() {
            const TC = window.TableConverter;
            
            // Exit if TableConverter isn't available
            if (!TC) {
                console.error('[TableConverter] Not available');
                return;
            }
            
            const logger = TC.logger;
            
            // Process videos immediately with the existing function
            if (TC.process && typeof TC.process.video === 'function') {
                // Try to process videos in all potential containers
                const containers = document.querySelectorAll('.cke_contents_ltr');
                Array.from(containers).forEach(container => {
                    if (container && container.innerHTML && container.innerHTML.includes('LiveExtendVideoURL')) {
                        logger.logProcess(`Direct video processing in container ${container.id}`);
                        TC.process.video(container);
                    }
                });
            }
            
            // Skip if already observing
            if (TC._containerObserving) {
                return;
            }
            
            // Mark as observing
            TC._containerObserving = true;
            
            // Update state to observing
            if (TC.stateManagement) {
                TC.stateManagement.observerActive();
            }
            
            // Clear any existing observer
            if (TC._containerObserver) {
                try {
                    TC._containerObserver.disconnect();
                } catch (e) {
                    logger.error('Error disconnecting observer:', e);
                }
            }
            
            // Create observer to watch for content loading
            TC._containerObserver = new MutationObserver((mutations) => {
                // Process videos directly on DOM changes
                if (TC.process && typeof TC.process.video === 'function') {
                    const containers = document.querySelectorAll('.cke_contents_ltr');
                    Array.from(containers).forEach(container => {
                        if (container && container.innerHTML && container.innerHTML.includes('LiveExtendVideoURL')) {
                            TC.process.video(container);
                        }
                    });
                }
                
                // Regular content check
                if (this.checkContainerAndInitialize()) {
                    // Found and started - disconnect observer
                    TC._containerObserver.disconnect();
                    TC._containerObserving = false;
                }
            });
            
            // Start observing with simple options
            try {
                TC._containerObserver.observe(document.body, {
                    childList: true,
                    subtree: true,
                    characterData: false
                });
            } catch (e) {
                logger.error('Error setting up observer:', e);
                TC._containerObserving = false;
            }
            
            // Set a timeout to ensure we don't observe forever
            setTimeout(function() {
                if (TC._containerObserver && TC._containerObserving) {
                    logger.logProcess('Observer timeout - final check');
                    
                    // Final attempt to process videos
                    if (TC.process && typeof TC.process.video === 'function') {
                        const containers = document.querySelectorAll('.cke_contents_ltr');
                        Array.from(containers).forEach(container => {
                            if (container && container.innerHTML && container.innerHTML.includes('LiveExtendVideoURL')) {
                                TC.process.video(container);
                            }
                        });
                    }
                    
                    try {
                        TC._containerObserver.disconnect();
                    } catch (e) {
                        logger.error('Error disconnecting observer:', e);
                    }
                    TC._containerObserving = false;
                    
                    // Reset state after timeout
                    if (TC.stateManagement) {
                        TC.stateManagement.reset();
                    }
                    
                    // Final attempt to find container with content
                    TC.initialization.checkContainerAndInitialize();
                }
            }, 3000);
            
            logger.logProcess('Container observer setup complete');
        },

        /**
         * Initialize the TableConverter functionality
         * 
         * Main entry point for the TableConverter library that sets up all required
         * systems and prepares for content processing. This function:
         * 
         * 1. Ensures a clean starting state
         * 2. Stores original HTML content for later restoration
         * 3. Processes common tasks (marker hiding, video processing)
         * 4. Determines initial view mode and processes content accordingly
         * 5. Establishes mutation observation for dynamic content changes
         * 
         * @param {Boolean} useExistingLoadingIndicator - Whether to use an existing loading indicator
         */
        start: function(useExistingLoadingIndicator = false) {
            try {
                const TC = window.TableConverter;
                
                // Basic validation before proceeding
                if (!TC || !TC.logger) {
                    console.error('TableConverter not properly initialized');
                    return;
                }
                
                const logger = TC.logger;
                const utilities = TC.utilities;
                const viewport = TC.viewport;
                const CONFIG = TC.CONFIG;
                
                // Check if already initializing or initialized using state management
                if (TC.stateManagement.isState(TC.stateManagement.STATES.INITIALIZING)) {
                    logger.logProcess('Initialization already in progress, skipping duplicate call');
                    return;
                }
                
                // Set state to initializing using state management
                TC.stateManagement.startInitialization();
                
                if (TC.stateManagement.isState(TC.stateManagement.STATES.INITIALIZED)) {
                    logger.logProcess('Already initialized, skipping');
                    return;
                }
                
                // Get container using debounced lookup - exit completely if not found
                const container = utilities.getContainer();
                if (!container) {
                    logger.logProcess('No container found - TableConverter not needed on this page');
                    TC.stateManagement.reset();
                    return;
                }
                
                // Track content detection state
                TC.stateManagement.setState(TC.stateManagement.STATES.CONTENT_DETECTED);
                
                // Check for video markers (video processing will be handled in processCommonViewportTasks)
                const hasVideoMarker = container.innerHTML && container.innerHTML.includes('LiveExtendVideoURL');
                
                // Include video markers in content check
                const hasContent = container.innerHTML && (
                    container.innerHTML.length >= 100 || 
                    container.innerHTML.includes('<table') ||
                    hasVideoMarker  // Consider video markers as valid content
                );
                
                // Check for content in container
                if (!hasContent) {
                    // Not enough content yet - set up observer for content
                    logger.logProcess('Container found but waiting for content');
                    TC.stateManagement.waitForContent();
                    this.setupContainerObserver();
                    return;
                }
                
                logger.logProcess('Starting initialization with container and content...');
                
                // Use more granular state transitions
                TC.stateManagement.setState(TC.stateManagement.STATES.CONTENT_SAVING);
                
                // Save original content immediately
                if (TC.contentManager) {
                    // Reset saved flag for current URL to ensure fresh content is saved
                    TC.contentManager._contentSaved[window.location.href] = false;
                    TC.contentManager.saveOriginalContent(container);
                }
                
                // IMPROVED: Hide container at the beginning to prevent flicker
                if (container && container.style.display !== 'none') {
                    // Save current display state to restore later
                    container._originalDisplay = container.style.display || '';
                    // Hide container during initialization
                    container.style.display = 'none';
                    logger.logProcess('Temporarily hiding container to prevent flicker');
                }
        
                /*
                // Show loading indicator if needed
                if (!useExistingLoadingIndicator) {
                    if (utilities.loadingIndicator && typeof utilities.loadingIndicator.show === 'function') {
                        utilities.loadingIndicator.show('Initializing...');
                    }
                }*/
                
                // Process common viewport tasks with state tracking
                TC.stateManagement.setState(TC.stateManagement.STATES.MARKER_PROCESSING);
                if (viewport && typeof viewport.processCommonViewportTasks === 'function') {
                    viewport.processCommonViewportTasks(container);
                }
                
                // Track event handler setup
                TC.stateManagement.setState(TC.stateManagement.STATES.EVENT_HANDLER_SETUP);
                
                // Set up viewport change handler
                if (TC.mediaQuery) {
                    TC.mediaQuery.removeEventListener('change', TC._boundViewportHandler);
                }
                
                TC.mediaQuery = window.matchMedia(`(max-width: ${CONFIG.viewport.mobileBreakpoint}px)`);
                TC._boundViewportHandler = viewport.handleViewportChange.bind(viewport);
                TC.mediaQuery.addEventListener('change', TC._boundViewportHandler);
                
                // Determine current view mode
                TC._isMobileView = window.innerWidth < CONFIG.viewport.mobileBreakpoint;
                
                // Use requestAnimationFrame for better performance
                requestAnimationFrame(() => {
                    // Set appropriate view state
                    if (TC._isMobileView) {
                        TC.stateManagement.startMobileView();
                        
                        // Update loading message
                        if (utilities.loadingIndicator && typeof utilities.loadingIndicator.updateMessage === 'function') {
                            utilities.loadingIndicator.updateMessage('Preparing mobile view...');
                        }
                        
                        // Process mobile view conversion
                        if (viewport && typeof viewport.enableMobileView === 'function') {
                            viewport.enableMobileView(!useExistingLoadingIndicator);
                        } else {
                            // Initialize components
                            TC.stateManagement.setState(TC.stateManagement.STATES.COMPONENT_INITIALIZATION);
                            if (typeof this.components === 'function') {
                                this.components();
                            }
                            
                            // Transition to mobile ready state
                            TC.stateManagement.completeMobileView();
                            
                            // Hide loading indicator if we created it
                            if (!useExistingLoadingIndicator) {
                                if (utilities.loadingIndicator && typeof utilities.loadingIndicator.hide === 'function') {
                                    utilities.loadingIndicator.hide(true);
                                }
                            }
                        }
                    } else {
                        TC.stateManagement.startDesktopView();
                        logger.logProcess('Desktop mode - skipping table conversion');
                        
                        // Video processing handled by processCommonViewportTasks
                        
                        // Initialize components
                        TC.stateManagement.setState(TC.stateManagement.STATES.COMPONENT_INITIALIZATION);
                        if (typeof this.components === 'function') {
                            this.components();
                        }
                        
                        // Transition to desktop ready state
                        TC.stateManagement.completeDesktopView();
                        
                        // Hide loading indicator if we created it
                        if (!useExistingLoadingIndicator) {
                            if (utilities.loadingIndicator && typeof utilities.loadingIndicator.hide === 'function') {
                                utilities.loadingIndicator.hide(true);
                            }
                        }
                    }
                    
                    // Set up mutation observer
                    this.setupMutationObserver(container);
                    
                    // IMPROVED: Show container only after ALL processing is complete
                    // Using Promise.resolve + requestAnimationFrame for best timing
                    Promise.resolve().then(() => {
                        requestAnimationFrame(() => {
                            if (container && container.style.display === 'none') {
                                if (container._originalDisplay) {
                                    container.style.display = container._originalDisplay;
                                    delete container._originalDisplay;
                                } else {
                                    container.style.display = '';
                                }
                                logger.logProcess('Container made visible after all processing complete');
                            }
                            
                            // Mark initialization as complete (final step)
                            TC.stateManagement.completeInitialization();
                            logger.logProcess('Initialization complete');
                        });
                    });
                });
                
            } catch (error) {
                const TC = window.TableConverter;
                if (TC && TC.logger) {
                    TC.logger.error('Critical error during initialization:', error);
                } else {
                    console.error('Critical error during TableConverter initialization:', error);
                }
                
                // Set error state
                if (TC && TC.stateManagement) {
                    TC.stateManagement.setError(error);
                }
                
                // Try to show container even on error
                if (TC) {
                    const container = TC.utilities && TC.utilities.getContainer ? 
                        TC.utilities.getContainer() : document.querySelector('.html-wrapper .cke_contents_ltr');
                        
                    if (container && container.style.display === 'none') {
                        container.style.display = container._originalDisplay || '';
                        delete container._originalDisplay;
                    }
                }
                
                // Try to hide loading indicator on error
                if (!useExistingLoadingIndicator && TC && TC.utilities && TC.utilities.loadingIndicator) {
                    TC.utilities.loadingIndicator.hide(true);
                }
            }
        },

        /**
        * Set up mutation observer for detecting content changes after initialization
        * Fifth function in the flow - handles dynamic content changes
        * 
        * - Sets up throttled observation of content changes
        * - Processes new tables if they appear
        * - Re-hides markers after content changes
        * 
        * @param {HTMLElement} container - Container element to observe
        */
        setupMutationObserver: function(container) {
            const TC = window.TableConverter;
            const CONFIG = TC.CONFIG;
            const logger = TC.logger;
            
            // Clean up any existing observer
            if (TC.observer) {
                TC.observer.disconnect();
            }
            
            // Get container to observe - use passed container if available
            let target = container;
            
            // Fall back to finding container
            if (!target) {
                target = document.querySelector(CONFIG.selectors.structure.container) || 
                        document.querySelector(CONFIG.selectors.structure.containerHTML) || 
                        document.querySelector(CONFIG.selectors.structure.containerContent);
            }
            
            if (!target) {
                logger.logProcess('No target found for observer');
                return;
            }
            
            // Keep track of container HTML content for change detection
            TC._lastContainerContent = target.innerHTML;
            
            // Process all containers function
            const processAllContainers = () => {
                // Find all potential content containers
                const containers = document.querySelectorAll('.cke_contents_ltr');
                let processed = 0;
                
                containers.forEach(container => {
                    if (container && container.innerHTML) {
                        // Check for videos in container
                        if (TC.process && typeof TC.process.video === 'function') {
                            const count = TC.process.video(container);
                            processed += count;
                        }
                    }
                });
                
                return processed;
            };
            
            // Process immediately on setup
            processAllContainers();
            
            // Create improved mutation handler with widget change detection
            let throttleTimeout = null;
            const handleMutations = (mutations) => {
                // Skip processing if throttled
                if (throttleTimeout) return;
                
                // CRITICAL: Skip if we're currently processing tables
                if (TC._processingInProgress) {
                    logger.logProcess('Skipping mutations - processing already in progress');
                    return;
                }
                
                // CRITICAL: Check if these mutations are ONLY accordion state changes
                let isOnlyAccordionToggle = true;
                let hasRealContentChange = false;
                
                for (const mutation of mutations) {
                    // Skip attribute changes (these are often just accordion state like "active" class)
                    if (mutation.type === 'attributes') {
                        continue;
                    }
                    
                    // Check if the mutation target itself is inside an accordion
                    const mutationTarget = mutation.target;
                    const isTargetInAccordion = mutationTarget && (
                        mutationTarget.closest?.('[data-accordion]') ||
                        mutationTarget.closest?.('.accordion-content') ||
                        mutationTarget.closest?.('.collapse-content') ||
                        mutationTarget.closest?.('.tc-accordion-content') ||
                        mutationTarget.closest?.('.' + CONFIG.selectors.components.accordion.root)
                    );
                    
                    if (mutation.type === 'childList') {
                        // Check if nodes being added/removed are accordion-related
                        const addedNodes = Array.from(mutation.addedNodes);
                        const removedNodes = Array.from(mutation.removedNodes);
                        
                        for (const node of [...addedNodes, ...removedNodes]) {
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                // Check if this is accordion content or inside accordion
                                const isAccordionContent = isTargetInAccordion ||
                                                          node.classList?.contains('accordion-content') ||
                                                          node.classList?.contains('collapse-content') ||
                                                          node.classList?.contains('tc-accordion-content') ||
                                                          node.hasAttribute?.('data-accordion-content') ||
                                                          node.closest?.('[data-accordion]') ||
                                                          node.closest?.('.accordion-content') ||
                                                          node.closest?.('.collapse-content') ||
                                                          node.closest?.('.' + CONFIG.selectors.components.accordion.root);
                                
                                if (!isAccordionContent) {
                                    // This is real content change, not just accordion toggle
                                    hasRealContentChange = true;
                                    isOnlyAccordionToggle = false;
                                    break;
                                }
                            }
                        }
                    } else if (mutation.type === 'characterData') {
                        // Text content changes - only flag if not inside accordion
                        const target = mutation.target;
                        const parentElement = target.parentElement;
                        
                        if (parentElement && !isTargetInAccordion) {
                            const isInsideAccordion = parentElement.closest?.('[data-accordion]') ||
                                                     parentElement.closest?.('.accordion-content') ||
                                                     parentElement.closest?.('.collapse-content') ||
                                                     parentElement.closest?.('.' + CONFIG.selectors.components.accordion.root);
                            
                            if (!isInsideAccordion) {
                                hasRealContentChange = true;
                                isOnlyAccordionToggle = false;
                                break;
                            }
                        }
                    }
                    
                    if (hasRealContentChange) break;
                }
                
                // If this is ONLY accordion toggle, skip ALL processing
                if (isOnlyAccordionToggle && !hasRealContentChange) {
                    logger.logProcess('Mutations are only accordion toggles - skipping all processing');
                    return;
                }
                
                // Set flag for content changes
                let hasContentChange = false;
                let hasMajorContentChange = false;
                
                // Check for language changes by looking at URL changes
                const currentUrl = window.location.href;
                if (TC._lastObservedUrl && TC._lastObservedUrl !== currentUrl) {
                    // URL changed (likely language change) - force processing
                    logger.logProcess('URL changed - likely language change, processing videos');
                    hasContentChange = true;
                    hasMajorContentChange = true;
                    TC._lastObservedUrl = currentUrl;
                }
                
                // Check if container content has significantly changed (widget change)
                const currentContainer = TC.utilities.getContainer();
                if (currentContainer && currentContainer.innerHTML) {
                    // Check if content has changed significantly (widget switch)
                    if (TC._lastContainerContent && 
                        Math.abs(currentContainer.innerHTML.length - TC._lastContainerContent.length) > 100) {
                        
                        // Major content change detected - likely widget switch
                        logger.logProcess('Major content change detected - likely widget switch');
                        hasContentChange = true;
                        hasMajorContentChange = true;
                        
                        // Update the stored content
                        TC._lastContainerContent = currentContainer.innerHTML;
                    }
                }
                
                // Check for content changes in mutations (but we already know there's real content change)
                if (!hasContentChange && hasRealContentChange) {
                    for (const mutation of mutations) {
                        // Check for added nodes
                        if (mutation.type === 'childList' && mutation.addedNodes.length) {
                            for (const node of mutation.addedNodes) {
                                if (node.nodeType === Node.ELEMENT_NODE) {
                                    // Check if this is actually NEW accordion components (not just toggling existing ones)
                                    if (node.innerHTML && node.querySelector('[data-accordion]')) {
                                        logger.logProcess('New accordion component added to DOM');
                                        hasContentChange = true;
                                        hasMajorContentChange = true; // Mark as major to trigger reinitialization
                                        break;
                                    }
                                }
                            }
                            
                            if (hasContentChange) break;
                        }
                        
                        // Check for character data changes
                        if (mutation.type === 'characterData') {
                            hasContentChange = true;
                            break;
                        }
                    }
                }
                
                // Process if content changed
                if (hasContentChange) {
                    logger.logProcess('Content change detected - processing');
                    
                    // Process all containers immediately
                    processAllContainers();
                    
                    // Set throttle to prevent excessive processing
                    throttleTimeout = setTimeout(() => {
                        throttleTimeout = null;
                        
                        // For major content changes, reinitialize components
                        if (hasMajorContentChange) {
                            logger.logProcess('Reinitializing components after major content change');
                            
                            // Clean up event listeners
                            if (TC.utilities && typeof TC.utilities.removeAllEventListeners === 'function') {
                                TC.utilities.removeAllEventListeners();
                            }
                            
                            // Reinitialize components
                            if (TC.initialization && typeof TC.initialization.components === 'function') {
                                TC.initialization.components();
                            }
                        }
                        
                        // CRITICAL: Add delay before checking for new tables to prevent double-processing
                        // This prevents the observer from immediately detecting converted tables as "new"
                        setTimeout(() => {
                            // Check for unconverted tables in mobile view
                            const unconvertedTables = document.querySelectorAll(CONFIG.selectors.tables.unconverted);
                            if (unconvertedTables.length > 0 && TC._isMobileView) {
                                // CRITICAL: Filter out tables that are inside accordions or already processed
                                const actuallyNewTables = Array.from(unconvertedTables).filter(table => {
                                    // Skip if already has converted attribute
                                    if (table.hasAttribute(CONFIG.selectors.attributes.converted)) {
                                        return false;
                                    }
                                    
                                    // Skip if table is inside an accordion
                                    // (These tables aren't new, just becoming visible/hidden)
                                    const accordionParent = table.closest('[data-accordion]') ||
                                                          table.closest('.' + CONFIG.selectors.components.accordion.root) ||
                                                          table.closest('.accordion-content') ||
                                                          table.closest('.collapse-content');
                                    
                                    if (accordionParent) {
                                        logger.logProcess('Skipping table inside accordion');
                                        return false;
                                    }
                                    
                                    return true;
                                });
                                
                                if (actuallyNewTables.length > 0) {
                                    logger.logProcess(`Observer detected ${actuallyNewTables.length} truly new tables - processing`);
                                    
                                    if (TC.viewport && typeof TC.viewport.processBatches === 'function') {
                                        TC.viewport.processBatches(actuallyNewTables);
                                    }
                                } else {
                                    logger.logProcess(`Observer detected ${unconvertedTables.length} tables but all are from accordions or already processed - skipping`);
                                }
                            }
                            
                            // Always re-hide markers
                            if (TC.markers && TC.markers.helpers && typeof TC.markers.helpers.hideAllMarkers === 'function') {
                                TC.markers.helpers.hideAllMarkers();
                            }
                        }, 500);
                        
                    }, 300); 
                }
            };
            
            // Create observer with more specific configuration
            TC.observer = new MutationObserver(handleMutations);
            
            // Store current URL for change detection
            TC._lastObservedUrl = window.location.href;
            
            // Start observing with improved settings
            TC.observer.observe(target, {
                childList: true,
                subtree: true,
                characterData: true,
                attributes: false
            });
            
            logger.logProcess('Enhanced mutation observer setup complete');
        },

        /**
         * Initializes interactive components based on current view mode
         * 
         * Sets up event handlers and state for accordion, carousel, and other
         * interactive components. Uses event delegation for performance and
         * coordinates with stateManagement for proper state tracking.
         * 
         * @returns {Boolean} Success status of component initialization
         */
        components: function() {
            const TC = window.TableConverter;
            const CONFIG = TC.CONFIG;
            const logger = TC.logger;
            const utilities = TC.utilities;
            
            logger.logComponent('Initializing interactive components');
            
            // Use utilities.getContainer instead of multiple container lookups
            const container = utilities.getContainer();
            if (!container) {
                logger.logComponent('No container found for component initialization');
                return;
            }
            
            // Clean up any existing event handlers first - use improved tracking
            utilities.clearEventTracking();
            utilities.removeAllEventListeners();
            
            // Set up document-level event delegation
            if (TC._boundEventHandler) {
                document.removeEventListener('click', TC._boundEventHandler);
            }
            
            // Create event handler function for all interactive components
            const eventHandler = (e) => {
                // Check for accordion trigger clicks
                const accordionTrigger = e.target.closest(CONFIG.selectors.components.accordion.trigger);
                if (accordionTrigger) {
                    // Add more logging for accordion clicks to help debug
                    logger.logComponent('Accordion trigger clicked', {
                        text: accordionTrigger.textContent.trim().substring(0, 30),
                        element: accordionTrigger.outerHTML.substring(0, 100),
                        parent: accordionTrigger.parentElement ? accordionTrigger.parentElement.outerHTML.substring(0, 100) : 'none'
                    });
                    
                    if (TC.components && typeof TC.components.handleAccordionClick === 'function') {
                        TC.components.handleAccordionClick.call(TC.components, e);
                    } else {
                        logger.logComponent('WARNING: handleAccordionClick function not found');
                    }
                    return;
                }
        
                // Check for collapse button clicks
                const collapseButton = e.target.closest(CONFIG.selectors.collapse.button);
                if (collapseButton) {
                    if (TC.components && typeof TC.components.handleCollapseButtonClick === 'function') {
                        TC.components.handleCollapseButtonClick.call(TC.components, e);
                    }
                    return;
                }
        
                // Check for carousel navigation clicks
                const carousel = e.target.closest(CONFIG.selectors.components.carousel.root);
                if (carousel) {
                    const prev = e.target.closest(CONFIG.selectors.components.carousel.navigation.prev);
                    const next = e.target.closest(CONFIG.selectors.components.carousel.navigation.next);
                    const dot = e.target.closest(CONFIG.selectors.components.carousel.navigation.dot);
                    
                    if (prev) {
                        e.preventDefault();
                        if (TC.components && typeof TC.components.handleCarouselNavigation === 'function') {
                            TC.components.handleCarouselNavigation.call(TC.components, carousel, 'prev');
                        }
                    } else if (next) {
                        e.preventDefault();
                        if (TC.components && typeof TC.components.handleCarouselNavigation === 'function') {
                            TC.components.handleCarouselNavigation.call(TC.components, carousel, 'next');
                        }
                    } else if (dot) {
                        e.preventDefault();
                        const index = parseInt(dot.getAttribute('data-carousel-dot'));
                        if (TC.components && typeof TC.components.goToSlide === 'function') {
                            TC.components.goToSlide.call(TC.components, carousel, index);
                        }
                    }
                }
            };
        
            // Bind and store the event handler
            TC._boundEventHandler = eventHandler.bind(TC);
            document.addEventListener('click', TC._boundEventHandler);
            
            // Debug: Log accordion triggers found
            const accordionTriggers = container.querySelectorAll(CONFIG.selectors.components.accordion.trigger);
            logger.logComponent('Found accordion triggers', { 
                count: accordionTriggers.length,
                selectors: CONFIG.selectors.components.accordion.trigger
            });
        
            // Initialize accordion states
            const accordions = container.querySelectorAll('[data-accordion]');
            logger.logComponent('Initializing accordions', { count: accordions.length });
            
            accordions.forEach(accordion => {
                // Set up CSS transitions for accordion content elements
                const contents = accordion.querySelectorAll(`.${CONFIG.selectors.components.accordion.content}`);
                contents.forEach(content => {
                    // Ensure proper transition is set
                    content.style.transition = `height ${CONFIG.timing.transitionDuration}ms ${CONFIG.animation.accordionEasing}`;
                    content.style.overflow = 'hidden';
                    
                    // Initialize collapsed state for inactive elements
                    if (!content.classList.contains(CONFIG.selectors.states.active)) {
                        content.style.height = '0';
                    }
                });
                
                // Handle any active accordions
                const activeTriggers = accordion.querySelectorAll(`${CONFIG.selectors.components.accordion.trigger}.${CONFIG.selectors.states.active}`);
                activeTriggers.forEach(trigger => {
                    const content = trigger.nextElementSibling;
                    if (content) {
                        content.classList.add(CONFIG.selectors.states.active);
                        content.style.height = content.scrollHeight + 'px';
                    }
                });
            });
        
            // Initialize carousels with touch events
            const carousels = container.querySelectorAll(CONFIG.selectors.components.carousel.root);
            logger.logComponent('Initializing carousels', { count: carousels.length });
            
            carousels.forEach(carousel => {
                const track = carousel.querySelector(CONFIG.selectors.components.carousel.track);
                if (!track) return;
        
                carousel._currentIndex = 0;
        
                track.addEventListener('touchstart', (e) => {
                    track._touchStartX = e.touches[0].clientX;
                    track._touchStartY = e.touches[0].clientY;
                    track.style.transition = CONFIG.styles.none;
                }, { passive: true });
                
                track.addEventListener('touchmove', (e) => {
                    if (!track._touchStartX) return;
                    
                    const diffX = track._touchStartX - e.touches[0].clientX;
                    const diffY = Math.abs(track._touchStartY - e.touches[0].clientY);
                    
                    if (diffY > Math.abs(diffX)) {
                        track._touchStartX = null;
                        return;
                    }
                    
                    e.preventDefault();
                    const moveX = -((carousel._currentIndex * 100) + ((diffX / track.offsetWidth) * 100));
                    track.style.transform = `translateX(${moveX}%)`;
                }, { passive: false });
                
                track.addEventListener('touchend', (e) => {
                    if (!track._touchStartX) return;
                    
                    const diffX = track._touchStartX - e.changedTouches[0].clientX;
                    if (Math.abs(diffX) > CONFIG.touch.swipeThreshold) {
                        if (TC.components && typeof TC.components.handleCarouselNavigation === 'function') {
                            TC.components.handleCarouselNavigation(carousel, diffX > 0 ? 'next' : 'prev');
                        }
                    } else {
                        track.style.transform = `translateX(-${carousel._currentIndex * 100}%)`;
                    }
                    
                    track._touchStartX = null;
                    track._touchStartY = null;
                    track.style.transition = `transform ${CONFIG.timing.transitionDuration}ms ${CONFIG.animation.carouselEasing}`;
                }, { passive: true });
            });
        
            // Initialize collapse states
            const collapseContainers = container.querySelectorAll(CONFIG.selectors.collapse.container);
            logger.logComponent('Initializing collapse containers', { count: collapseContainers.length });
            
            collapseContainers.forEach(container => {
                if (container.classList.contains(CONFIG.selectors.states.active)) {
                    container.style.display = CONFIG.styles.block;
                    container.style.maxHeight = `${container.scrollHeight}px`;
                    
                    let parent = container.closest(`${CONFIG.selectors.collapse.container}.${CONFIG.selectors.states.active}`);
                    while (parent) {
                        parent.style.maxHeight = `${parent.scrollHeight}px`;
                        parent = parent.parentElement.closest(`${CONFIG.selectors.collapse.container}.${CONFIG.selectors.states.active}`);
                    }
                } else {
                    container.style.maxHeight = '0';
                    container.style.display = CONFIG.styles.none;
                }
            });
        
            // Remember that we've initialized components for this content
            if (container) {
                container._componentsInitialized = true;
                
                // Store a hash of the content to detect changes
                container._contentHash = container.innerHTML.length + 
                                      (container.innerHTML.includes('data-accordion') ? 'a' : '') +
                                      (container.innerHTML.includes('carousel') ? 'c' : '');
            }
            
            logger.logComponent('Components initialization complete');
        },
    },
}
/**
* TableConverter - Event Handlers and Navigation Management
* 
* Consolidated and optimized event handlers to manage:
* 1. Initialization
* 2. Page lifecycle (load, unload, visibility)
* 3. Navigation (browser back/forward, programmatic navigation)
* 4. History API integration
*/

// Run the initialization on page load
document.addEventListener('DOMContentLoaded', function() {
if (window.TableConverter && window.TableConverter.initialization) {
    window.TableConverter.initialization.initializeSystem();
}
});

// Handle case where script loads after page is ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
if (window.TableConverter && window.TableConverter.initialization) {
    setTimeout(function() {
        window.TableConverter.initialization.initializeSystem();
    }, 100);
}
}

/**
* Clean up resources before page unload
*/
window.addEventListener('beforeunload', function() {
if (window.TableConverter && window.TableConverter.contentManager) {
    // Save current page content before unloading
    window.TableConverter.contentManager.saveOriginalContent();
    
    // Then clean up
    window.TableConverter.contentManager.cleanEverything();
}
});

window.addEventListener('popstate', function() {
if (window.TableConverter && window.TableConverter.contentManager) {
    // Clean everything on navigation
    window.TableConverter.contentManager.cleanEverything();
    
    // Force re-initialization for the new page
    setTimeout(function() {
        if (window.TableConverter && window.TableConverter.initialization) {
            window.TableConverter.initialization.start();
        }
    }, 100);
}
});

/**
* Handle page visibility changes (tab switching)
*/
window.addEventListener('visibilitychange', () => {
const TC = window.TableConverter;

// Only handle page becoming visible again
if (document.visibilityState === 'visible' && TC && TC.logger) {
    TC.logger.logProcess('Page visibility changed to visible - checking state');
    
    // Only act if previously initialized
    if (TC.initialized) {
        // Find container
        const container = document.querySelector(TC.CONFIG.selectors.structure.container) || 
                          document.querySelector(TC.CONFIG.selectors.structure.containerHTML) || 
                          document.querySelector(TC.CONFIG.selectors.structure.containerContent);
        
        if (!container) {
            // Container disappeared, reinitialize
            TC.logger.logProcess('Container disappeared - reinitializing');
            TC.utilities.resetOnNavigation();
        } else {
            // Check if mobile state changed while hidden
            const currentIsMobile = window.innerWidth < TC.CONFIG.viewport.mobileBreakpoint;
            
            if (TC._isMobileView !== currentIsMobile) {
                TC.logger.logProcess('Mobile state changed while page was hidden - updating view');
                if (TC.viewport && typeof TC.viewport.handleViewportChange === 'function') {
                    TC.viewport.handleViewportChange();
                }
            } else if (TC.viewport && typeof TC.viewport.processCommonViewportTasks === 'function') {
                // Ensure markers are hidden
                TC.viewport.processCommonViewportTasks(container);
            }
        }
    }
}
});

// ======================================================
// BROWSER NAVIGATION HANDLERS
// ======================================================

/**
* Handle browser history navigation (back/forward buttons)
*/
if (window.history && window.history.pushState) {
const originalPushState = window.history.pushState;
    window.history.pushState = function() {
        const result = originalPushState.apply(this, arguments);
        
        if (window.TableConverter && window.TableConverter.contentManager) {
            // Clean everything on navigation
            window.TableConverter.contentManager.cleanEverything();
            
            // Force re-initialization for the new page
            setTimeout(function() {
                if (window.TableConverter && window.TableConverter.initialization) {
                    window.TableConverter.initialization.start();
                }
            }, 100);
        }
        
        return result;
    };
}