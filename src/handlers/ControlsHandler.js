class ControlsHandler {
    /**
     * Initializes the ControlsHandler with dependencies.
     *
     * @params {StyleHandler} styleHandler - The instance of StyleHandler for styling operations.
     * @params {function} updateTransform - The method for updating the transform.
    */
    constructor(styleHandler, updateTransform, updateActivePagination) {
        this.styleHandler = styleHandler;
        this.updateTransform = updateTransform;
        this.updateActivePagination = updateActivePagination;
    }

    startSlider(instance) {
        if (!instance.controls) return;
        instance.controls.addEventListener("click", e => {
            const clickedButtons = e.target.closest(".next, .prev");
            if (!clickedButtons) return;
            if (clickedButtons.classList.contains("next")) {
                this.nextSlide(instance);
            } else if (clickedButtons.classList.contains("prev")) {
                this.prevSlide(instance);
            }
        });
    }
        
    /**
     * Navigates to the next slide.
     *
     * @params {Object} instance - The carousel instance.
     * @returns {void}
     */
    nextSlide(instance) {
        instance.currentIndex++;
        const hasReachedTheEnd = (instance.currentIndex > instance.slides.length - instance.options.perPage);
        
        (hasReachedTheEnd) && (instance.currentIndex = 0);
        this.styleHandler.applyStyles(instance);
        this.updateTransform(instance);
        this.updateActivePagination(instance);
    }

    /**
    * Navigates to the previous slide.
    *
    * @params {Object} instance - The carousel instance.
    * @returns {void}
    */
    prevSlide(instance) {
        instance.currentIndex--;
        (instance.currentIndex < 0) && (instance.currentIndex = instance.slides.length - instance.options.perPage);

        this.styleHandler.applyStyles(instance);
        this.updateTransform(instance);
        this.updateActivePagination(instance);
    }
}

export default ControlsHandler;