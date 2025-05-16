import Drag from "./parts/Drag.js";
import LightBox from "./parts/LightBox.js";

class Settings {
    constructor(styleHandler, controlsHandler, paginationHandler) {
        this.styleHandler = styleHandler;
        this.controlsHandler = controlsHandler;
        this.paginationHandler = paginationHandler;
    }

    /**
     * Retrieves options for a specific carousel instance from data attributes.
     * 
     * @param {HTMLElement} container - The carousel container element.
     * @returns {Object} - The instance-specific options.
     */
    getInstanceOptions(container) {
        const { perpage, gap, lightbox, menu } = container.dataset;
        
        
        const perPage = window.innerWidth <= 520
            ? 1
            : window.innerWidth <= 760
            ? 2
            : parseInt(perpage) || 3;

        return {
            perPage,
            gap: parseInt(gap) || 16,
            lightBox: lightbox == "1",
            menu: menu == "1",
        };
    }

    /**
     * Sets up a carousel instance with its elements and specified options.
     * 
     * @param {HTMLElement} container - The carousel container element.
     * @param {Object} options - The options for the carousel instance.
     * @returns {Object} - The initialized carousel instance.
     */
    setupCarousel(container, options) {
        const instance = this.createInstance(container, { ...options });

        const hasMultipleSlides = instance.slides.length > instance.options.perPage;
        const isPaginationEnabled = instance.options.pagination && instance.paginationContainer;
        const totalGaps = (instance.options.perPage - 1) * instance.options.gap;
        this.call(instance, hasMultipleSlides, isPaginationEnabled, totalGaps);

        return instance;
    }

    /**
     * Creates an object representing the carousel instance.
     * 
     * @param {HTMLElement} container - The container element for the carousel.
     * @param {Object} options - The options for the carousel.
     * @returns {Object} - The instance object containing carousel properties.
     */
    createInstance(container, options) {
        return {
            container,
            carousel: container.querySelector(".carousel"),
            slider: container.querySelector(".slider"),
            slides: container.querySelectorAll(".slides"),
            controls: container.querySelector(".controls"),
            next: container.querySelector(".next"),
            prev: container.querySelector(".prev"),
            paginationContainer: container.querySelector(".pagination"),
            currentIndex: 0,
            currentTranslate: 0,
            prevTranslate: 0,
            options,
            isDragging: false,
            clickTimer: null,
            menu: options.menu,
        };
    }

    /**
     * Calculates the width of each slide based on the carousel width and gaps.
     * 
     * @param {number} carouselWidth - The total width of the carousel.
     * @param {number} totalGaps - The total width of the gaps between slides.
     * @param {number} perPage - The number of slides displayed per page.
     * @returns {number} - The calculated width of each slide.
     */
    calculateSlidesWidth(carouselWidth, totalGaps, perPage) {
        return (carouselWidth - totalGaps) / perPage;
    }

    /**
     * Calls necessary setup functions for the carousel instance.
     * 
     * @param {Object} instance - The carousel instance.
     * @param {boolean} hasMultipleSlides - Indicates if there are multiple slides.
     * @param {boolean} isPaginationEnabled - Indicates if pagination is enabled.
     * @param {number} totalGaps - The total width of the gaps between slides.
     */
    call(instance, hasMultipleSlides, isPaginationEnabled, totalGaps) {
        instance.slidesWidth = this.calculateSlidesWidth(
            instance.carousel.clientWidth, 
            totalGaps, 
            instance.options.perPage
        );

        this.styleHandler.applyStyles(instance);
        this.initializeControls(instance, hasMultipleSlides);
        this.initializePagination(instance, hasMultipleSlides, isPaginationEnabled);
        this.initializeDragging(instance);
        this.initializeLightBox(instance);
    }

    /**
     * Initializes the controls for the carousel, removing them if not needed.
     * 
     * @param {Object} instance - The carousel instance.
     * @param {boolean} hasMultipleSlides - Indicates if there are multiple slides.
     */
    initializeControls(instance, hasMultipleSlides) {
        if (hasMultipleSlides) {
            (instance.options.menu) ? instance.controls?.remove() : this.controlsHandler.startSlider(instance);
        } else {
            (instance.controls) && instance.controls.remove();
        }
    }
    
    /**
     * Initializes pagination for the carousel based on its configuration.
     * 
     * @param {Object} instance - The carousel instance.
     * @param {boolean} hasMultipleSlides - Indicates if there are multiple slides.
     * @param {boolean} isPaginationEnabled - Indicates if pagination is enabled.
     */
    initializePagination(instance, hasMultipleSlides, isPaginationEnabled) {
        const shouldAddPagination = isPaginationEnabled && hasMultipleSlides && !instance.options.menu;

        if (shouldAddPagination) {
            this.paginationHandler.addPagination(instance);
        } else if (instance.paginationContainer) {
            this.handleExistingPaginationContainer(instance);
        }
    }

    /**
    * Handles the existing pagination container based on its class.
    * @param {Object} instance - The carousel instance.
    */
    handleExistingPaginationContainer(instance) {
        const hasMenuClass = instance.paginationContainer.classList.contains('menu');

        (!hasMenuClass) 
            ? instance.paginationContainer.remove()
            : this.paginationHandler.menuPagination(instance);
    }

    /**
     * Initializes the dragging functionality for the carousel.
     * 
     * @param {Object} instance - The carousel instance.
     */
    initializeDragging(instance) {
        if (instance.options.drag && instance.slides.length > instance.options.perPage) {
            this.enableDragging(instance);
        }
    }

    /**
     * Initializes the lightbox functionality for the carousel if configured.
     * 
     * @param {Object} instance - The carousel instance.
     */
    initializeLightBox(instance) {
        if (!instance.options.lightBox && !instance.container.classList.contains("lightbox")) return;

        const lightboxInstance = instance;

        const lightbox = new LightBox(
            instance,
            this.styleHandler.applyStyles.bind(this.styleHandler),
            this.styleHandler.updateTransform.bind(this.styleHandler),
            this.paginationHandler.updateActivePagination.bind(this.paginationHandler)
        );
        lightbox.initialize();
    }

    /**
     * Enables dragging functionality for the carousel.
     * 
     * @param {Object} instance - The carousel instance.
     */
    enableDragging(instance) {
        const draggable = new Drag(
            instance,
            () => this.styleHandler.applyStyles(instance),
            () => this.styleHandler.updateTransform(instance),
            () => this.paginationHandler.updateActivePagination(instance)
        ).enableDragging();
    }
}

export default Settings;
