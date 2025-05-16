class ElementManager {
    /**
    * Initializes the ElementManager class with a set of elements.
    *
    * @constructor
    * @param {Map} elements - A Map, where each inner array contains an element and its associated config.
    */
    constructor(elements) {
        this.elements = elements; // Array of [element, config]
    }

    /**
    * Manages the elements by applying styles and classes based on the given properties.
    *
    * @returns {void}
    */
    manage() {
        this.elements.forEach(([element, { properties, classes }]) => {
            if (!(element instanceof HTMLElement)) return;

            try {
                this.manager(element, properties, classes);
            } catch (error) {
                console.error("Something went wrong!", error);
            }
        });
    }

    /**
    * Returns a function to manage properties and classes of an element.
    *
    * @returns {Function} A function that manages properties and classes.
    */
    get manager() {
        return (element, properties, classes) => {
            // Manage properties if provided
            if (properties) this.#manageProperties(element, properties);
            // Manage classes if provided
            if (classes) this.#manageClasses(element, classes);
        };
    }

    /**
    * Applies CSS properties to an element.
    *
    * @private
    * @param {HTMLElement} element - Element that properties will apply to.
    * @param {Object} properties - An object containing the properties to set to the element.
    * @returns {void}
    */
    #manageProperties(element, properties) {
        Object.entries(properties).forEach(([action, values]) => {
            Object.entries(values).forEach(([name, value]) => {
                // This checks if the action is a valid style method like setProperty or removeProperty etc.
                const isFunction = typeof element.style[action] === "function";
                if (!isFunction) return;

                element.style[action](name, value || "");
            });
        });
    }

    /**
    * Applies CSS classes to an element.
    *
    * @private
    * @param {HTMLElement} element - The target element to apply classes to.
    * @param {Object} classes - An object containing the classes to add or remove.
    * @returns {void}
    */
    #manageClasses(element, classes) {
        Object.entries(classes).forEach(([action, classNames]) => {
            [].concat(classNames).forEach(className => {
                element.classList[action](className);
            });
        });
    }
}

export default ElementManager;
