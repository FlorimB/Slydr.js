import ElementManager from "./ElementManager";

class LightBox {
    /**
     * Initializes the lightbox functionality for the carousel if configured.
     * 
     * @param {Object} instance - The carousel instance.
     */
    constructor(instance, applyStyles, updateTransform, updateActivePagination) {
        this.instance = instance;
        this.applyStyles = applyStyles;
        this.updateTransform = updateTransform;
        this.updateActivePagination = updateActivePagination;
        this.lightBoxContainer = instance.container.closest(".module-gallery-carousel").querySelector(".lightbox");
        this.closeButton = this.lightBoxContainer.querySelector(".close-lightbox");
        this.slider = instance.container.closest(".module-gallery-carousel").querySelector(".gallery .slider");
        this.isLightbox = this.instance.container.classList.contains("lightbox");
    }

    /**
     * Initializes the lightbox by checking for required elements and adding event listeners.
     */
    initialize() {
        if (!this.lightBoxContainer || !this.instance.slider || !this.closeButton) return;
        
        if (this.isLightbox) {
            this.addEventListeners();
        }
    }

    /**
     * Adds event listeners for mouse and touch interactions on the slider.
     */
    addEventListeners() {
        this.slider.addEventListener("mousedown", () => this.startClickTimer());
        this.slider.addEventListener("touchstart", () => this.startClickTimer(), { passive: true });
        this.slider.addEventListener("touchend", (e) => this.fireEvent(e));
        this.slider.addEventListener("mouseup", (e) => this.fireEvent(e));
        this.closeButton.addEventListener("click", () => this.closeLightBox());
    }

    /**
     * Starts a timer to distinguish between a click and a drag event.
     */
    startClickTimer() {
        if (this.instance.clickTimer) {
            clearTimeout(this.instance.clickTimer);
        }

        this.instance.clickTimer = setTimeout(() => {
            this.instance.clickTimer = null;
        }, 110);
    }

    /**
     * Fires the event to open the lightbox if the click is valid.
     * 
     * @param {MouseEvent} event - The mouse event triggered.
     */
    fireEvent(event) {
        if (this.instance.clickTimer === null) return;

        clearTimeout(this.instance.clickTimer);
        this.instance.clickTimer = null;

        this.openLightBox(event);
    }

    openLightBox(event) {
        if (event.target.tagName !== "IMG" && !this.instance.container.classList.contains("lightbox")) return;

        const clickedIndex = event.target.getAttribute("data-index");
        this.instance.currentIndex = parseInt(clickedIndex);
        this.applyStyles(this.instance);
        this.updateActivePagination(this.instance);
        this.updateTransform(this.instance);
        this.modify();
    }

    /**
     * Modifies the visibility and styles of the lightbox and body when opened.
     */
    modify() {
        const elementManager = new ElementManager([
            [this.lightBoxContainer, { classes: { remove: "hidden", add: ["show-lightbox"] } }],
            [document.body, { classes: { add: "overflow-hidden" } }]
        ]);
        elementManager.manage();
    }

    /**
     * Closes the lightbox and restores the body overflow.
     */
    closeLightBox() {
        if (!this.instance.container.classList.contains("lightbox")) return;

        const elementManager = new ElementManager([
            [this.lightBoxContainer, { classes: { add: ["hidden"], remove: ["show-lightbox"] } }],
            [document.body, { classes: { remove: "overflow-hidden" } }]
        ]);
        elementManager.manage();
    }
}

export default LightBox;
