class Drag {
    /**
     * Responsible for dragging functionality.
     * 
     * @constructor
     * @param {Object} instance - The carousel instance.
     * @param {Function} applyStyles - Function to apply styles after dragging.
     * @param {Function} updateTransform - Function to update the transform of slides.
     * @param {Function} updateActivePagination - Function to update active pagination state.
     */
    constructor(instance, applyStyles, updateTransform, updateActivePagination) {
        this.instance = instance;
        this.applyStyles = applyStyles;
        this.updateTransform = updateTransform;
        this.updateActivePagination = updateActivePagination;
        this.initialize();
    }

    /**
     * Initializes drag parameters and settings.
     *
     * @returns {void}
     */
    initialize() {
        this.startX = 0;
        this.currentTranslate = this.instance.currentTranslate || 0;
        this.prevTranslate = 0;
        this.slideWidthWithGap = this.instance.slidesWidth + this.instance.options.gap;
        this.threshold = this.slideWidthWithGap / 4;
        this.animationID = null;
    }

    /**
     * Updates the current transformation style of the slider.
     *
     * @returns {void}
     */
    updateCurrentTransform() {
        this.instance.container.style.setProperty("--transformed-slide", `translate3d(${this.currentTranslate}px, 0, 0)`);
    }

    /**
     * Enables dragging functionality by setting up event listeners.
     *
     * @returns {void}
     */
    enableDragging() {
        const events = this.getEvents();

        events.forEach(({ type, handler, options }) => {
            this.instance.carousel.addEventListener(type, handler.bind(this), options);
        });

        // Using document for end drag to ensure it captures outside of the carousel
        ['mouseup', 'touchend'].forEach(type => {
            document.addEventListener(type, this.endDrag.bind(this), { passive: true });
        });
    }

    getEvents() {
        return [
            { type: 'mousedown', handler: this.startDrag, options: { passive: false } },
            { type: 'touchstart', handler: this.startDrag, options: { passive: false } },
            { type: 'mousemove', handler: this.drag, options: { passive: false } },
            { type: 'touchmove', handler: this.drag, options: { passive: false } },
            { type: 'mouseup', handler: this.endDrag, options: { passive: true } },
            { type: 'touchend', handler: this.endDrag, options: { passive: true } },
        ];
    }


    /**
     * Starts the dragging process and sets initial parameters.
     *
     * @param {MouseEvent|TouchEvent} event - The event triggering the drag.
     * @returns {void}
     */
    startDrag(event) {
        event.preventDefault();
        event.stopPropagation();
        this.instance.isDragging = true;
        this.startX = event.type === "touchstart" ? event.touches[0].clientX : event.clientX;
        this.prevTranslate = this.instance.currentTranslate;
        this.instance.carousel.style.userSelect = "none";
        this.instance.slider.style.transition = 'none';
        this.updateTheSlider(event);
    }

    /**
     * Handles the dragging movement and updates translation.
     *
     * @param {MouseEvent|TouchEvent} event - The event during the drag.
     * @returns {void}
     */
    drag(event) {
        if (!this.instance.isDragging) return;

        this.updateTheSlider(event);
    }

    

    /**
     * Ends the dragging process and snaps to the closest slide.
     *
     * @returns {void}
     */
    endDrag() {
        if (!this.instance.isDragging) return;
        this.instance.isDragging = false;
        this.instance.carousel.style.userSelect = "auto";

        const velocity = this.calculateVelocity();
        const newTranslate = this.currentTranslate + velocity;

        this.snapToClosestSlide(newTranslate);
        this.applyStyles();
        this.updateActivePagination();
    }

    updateTheSlider(event) {
        const diffX = this.getDiffX(event);
        this.updateCurrentTranslate(diffX);
        this.updateCurrentTransform(this.instance);
    }

    /**
     * Calculates the difference in X position during dragging.
     *
     * @param {MouseEvent|TouchEvent} event - The event during the drag.
     * @returns {number} The difference in X position.
     */
    getDiffX(event) {
        const currentX = event.type === "touchmove" ? event.touches[0].clientX : event.clientX;
        return currentX - this.startX;
    }

    /**
     * Updates the current translation based on dragging distance.
     *
     * @param {number} diffX - The difference in X position.
     * @returns {void}
     */
    updateCurrentTranslate(diffX) {
        const sensitivity = 0.7;
        this.currentTranslate = this.prevTranslate + diffX * sensitivity;
        setTimeout(() => {
            this.currentTranslate = this.clampTranslation(this.currentTranslate);
        });
    }

    /**
     * Clamps the translation value to prevent overshooting the boundaries.
     *
     * @param {number} translate - The translation value to clamp.
     * @returns {number} The clamped translation value.
     */
    clampTranslation(translate) {
        const maxTranslate = this.getMaxTranslate();
        return Math.max(Math.min(translate, 0), maxTranslate);
    }

    /**
     * Calculates the maximum translation value based on the number of slides.
     *
     * @returns {number} The maximum translation value.
     */
    getMaxTranslate() {
        return -(this.instance.slides.length - this.instance.options.perPage) * this.slideWidthWithGap;
    }

    /**
     * Calculates the velocity of the drag movement.
     *
     * @returns {number} The calculated velocity.
     */
    calculateVelocity() {
        return (this.currentTranslate - this.prevTranslate) * 2;
    }

    /**
     * Snaps to the closest slide based on the new translation.
     *
     * @param {number} newTranslate - The new translation value.
     * @returns {void}
     */
    snapToClosestSlide(newTranslate) {
        const closestIndex = Math.round(-newTranslate / this.slideWidthWithGap);
        this.instance.currentIndex = Math.max(0, Math.min(closestIndex, this.instance.slides.length - this.instance.options.perPage));
        this.currentTranslate = -this.instance.currentIndex * this.slideWidthWithGap;

        this.instance.slider.style.transition = 'transform .8s ease';
        this.instance.container.style.setProperty("--transformed-slide", `${this.currentTranslate}px`);
    }
}

export default Drag;
