import ElementManager from "../parts/ElementManager";

class StyleHandler {
    /**
     * Applies styles and CSS variables to the carousel instance.
     *
     * @params {Object} instance - The carousel instance to apply styles to.
     * @returns {void}
     */
    applyStyles(instance) {        
        if (instance.slidesWidth === 0) {
            const mobileWidth = parseInt(instance.container.dataset.mobileWidth) || 350;
            const tabletWidth = parseInt(instance.container.dataset.tabletWidth) || 560;
            const desktopWidth = parseInt(instance.container.dataset.desktopWidth) || 768;
            const width = window.innerWidth;

            if (width <= 768) {
                instance.slidesWidth = mobileWidth;
            } else if (width <= 630) {
                instance.slidesWidth = tabletWidth;
            } else {
                instance.slidesWidth = desktopWidth;
            }
        }

        if (instance.slides.length <= instance.options.perPage) {
            const totalWidth = instance.container.clientWidth;
            const slideCount = instance.slides.length;
            instance.slidesWidth = totalWidth / slideCount;
        }

        const minSlideWidth = 100;
        instance.slidesWidth = Math.max(instance.slidesWidth, minSlideWidth);

        const element = instance.container;
        const elementsConfig = {
            properties: {
                setProperty: {
                    "--slides-per-page": `${instance.options.perPage}`,
                    "--gap": `${instance.options.gap}px`,
                    "--slides-width": `${instance.slidesWidth}px`,
                    "--transformed-slide": `${this.updateTransform(instance)}`,
                },
            },
        };
    
        const elementManager = new ElementManager([
            [element, elementsConfig]
        ]);
    
        elementManager.manage();
    }

    /**
     * Updates the translation value for the current index.
     *
     * @params {Object} instance - The carousel instance to update.
     * @returns {String} translatedValue - The CSS transform value for the slides.
     */
    updateTransform(instance) {
        const translatedValue = instance.currentIndex * (instance.slidesWidth + instance.options.gap);
        
        instance.currentTranslate = -translatedValue;
        return `translate3d(${instance.currentTranslate}px, 0, 0)`;
    }
}

export default StyleHandler;