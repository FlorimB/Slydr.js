import StyleHandler from "./handlers/StyleHandler.js";
import ControlsHandler from "./handlers/ControlsHandler.js";
import PaginationHandler from "./handlers/PaginationHandler.js";
import Settings from "./Settings.js";

class Slider {
    /**
     * Initializes the slider with the given selector and options.
     * @param {string} selector - The CSS selector for the slider containers.
     * @param {object} options - Custom options to override the defaults.
     */
    constructor(selector, options = {}) {
        this.carouselContainers = document.querySelectorAll(selector);
        this.defaultOptions = {
            perPage: 3,
            gap: 16,
            drag: true,
            pagination: false,
            lightBox: false,
            menu: false,
        };

        this.options = Object.assign(this.defaultOptions, options);

        this.instances = [];
        this.styleHandler = new StyleHandler();
        this.paginationHandler = new PaginationHandler(this.styleHandler);
        this.controlsHandler = new ControlsHandler(
            this.styleHandler,
            this.updateTransform.bind(this),
            this.paginationHandler.updateActivePagination.bind(this)
        );
        this.carouselSettings = new Settings(this.styleHandler, this.controlsHandler, this.paginationHandler);
    }
    
    /**
     * Mounts the slider instances for each carousel container.
     *
     * @returns {void}
     */
    mount() {
        this.carouselContainers.forEach((container) => {
            const instanceOptions = this.carouselSettings.getInstanceOptions(container);
            const options = { ...this.options, ...instanceOptions };
            const instance = this.setupCarousel(container, options);
            this.instances.push(instance);
        });

        
    }

    /**
     * Sets up the carousel instance with its elements and options.
     *
     * @params {HTMLElement} container - The carousel container element.
     * @params {Object} options - The options for the carousel instance.
     * @returns {Object} instance - The initialized carousel instance.
     */
    setupCarousel(container, options) {
        return this.carouselSettings.setupCarousel(container, options);
    }

    /**
     * Updates the translation value for the current index.
     *
     * @params {Object} instance - The carousel instance to update.
     * @returns {void}
     */
    updateTransform(instance) {
        return this.styleHandler.updateTransform(instance);
    }
}

export default Slider;
