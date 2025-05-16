class PaginationHandler {
    /**
     * Initializes the PaginationHandler with the style handler.
     *
     * @params {StyleHandler} styleHandler - The instance of StyleHandler for styling operations.
     */
    constructor(styleHandler) {
        this.styleHandler = styleHandler;
    }

    /**
     * Adds pagination buttons to the carousel.
     *
     * @params {Object} instance - The carousel instance to which pagination will be added.
     * @returns {void}
     */
    addPagination = (instance) => {
        instance.paginationContainer.innerHTML = "";
        const fragment = document.createDocumentFragment();
        const totalPages = instance.slides.length - instance.options.perPage + 1;
    
        // Create pagination buttons
        Array.from({ length: totalPages }, (_, i) => {
            const btn = document.createElement('button');
            btn.classList.add('pagination-btn');
            if (i === instance.currentIndex) btn.classList.add('active');
    
            btn.addEventListener('click', () => this.goToIndex(instance, i));
            fragment.appendChild(btn);
        });
    
        instance.paginationContainer.appendChild(fragment);
    };
    

    /**
     * Updates the active state of menu pagination buttons.
     *
     * @params {Object} instance - The carousel instance for which menu pagination will be updated.
     * @returns {void}
     */
    menuPagination(instance) {
        if (!instance.paginationContainer) return;
    
        const buttons = instance.paginationContainer.querySelectorAll('.menu .pagination-btn');
        const totalButtons = buttons.length;

        this.removeActiveClasses(buttons);
        this.menuIndex(instance, buttons, totalButtons);
    }
    
    /**
     * Removes the 'active' class from all pagination buttons.
     *
     * @params {NodeList} buttons - A NodeList of pagination button elements.
     * @returns {void}
     */
    removeActiveClasses(buttons) {
        buttons.forEach(button => button.classList.remove('active'));
    }
    
    /**
     * Sets up click event listeners for pagination buttons and updates their active states.
     *
     * @params {Object} instance - The carousel instance for which menu pagination will be updated.
     * @params {NodeList} buttons - A NodeList of pagination button elements.
     * @params {number} totalButtons - The total number of pagination buttons.
     * @returns {void}
     */
    menuIndex(instance, buttons, totalButtons) {
        buttons.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                this.navigateToTargetIndex(instance, totalButtons, index);

                this.removeActiveClasses(buttons);
                btn.classList.add('active');
            });

            btn.classList.toggle('active', index === instance.currentIndex);
        });
    }

    navigateToTargetIndex(instance, totalButtons, index) {
        const items = instance.slides.length;
        const { perPage } = instance.options;

        if (items > perPage) {
            const targetIndex = (index >= totalButtons - 3) ? items - perPage : index;
            this.goToIndex(instance, targetIndex);
        }
    }

    /**
     * Navigates to a specific slide index for normal pagination.
     *
     * @params {Object} instance - The carousel instance to navigate.
     * @params {number} index - The index to navigate to.
     * @returns {void}
     */
    goToIndex(instance, index) {
        instance.currentIndex = index;
        this.styleHandler.applyStyles(instance);
        instance.currentTranslate = -index * (instance.slidesWidth + instance.options.gap);
        this.updateActivePagination(instance);
    }

    /**
     * Updates the active state of pagination buttons.
     *
     * @params {Object} instance - The carousel instance for which pagination will be updated.
     * @returns {void}
     */
    updateActivePagination(instance) {
        if (instance.paginationContainer) {
            const buttons = instance.paginationContainer.querySelectorAll('.pagination-btn, .menu-pagination-btn');
            buttons.forEach((btn, index) => {
                btn.classList.toggle('active', index === instance.currentIndex);
            });
        }
    }
}

export default PaginationHandler;
