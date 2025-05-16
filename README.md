# Slydr.js - Interactive JavaScript Slider Component

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/slydr.svg)](https://www.npmjs.com/package/slydr) **Slydr.js** is a lightweight and versatile JavaScript library designed to effortlessly create engaging and responsive slider or carousel components for your web projects. With a focus on ease of use and flexibility, Slydr.js empowers developers to showcase content dynamically and enhance user interaction.

## ✨ Key Features

* **Intuitive API:** Simple and straightforward JavaScript interface for easy integration.
* **Highly Customizable:** Offers a range of options to tailor the slider's appearance and behavior to your specific needs.
* **Responsive Design:** Adapts seamlessly to various screen sizes and devices, ensuring a consistent user experience.
* **Smooth Transitions:** Provides elegant and performant transitions between slides.
* **Navigation Controls:** Supports customizable navigation elements such as arrows and dot indicators.
* **Autoplay Functionality:** Option to automatically advance through slides with configurable intervals.
* **Looping and Infinite Scroll:** Enables continuous cycling through the slider content.
* **Lightweight and Performant:** Minimal footprint and optimized for smooth performance.
* **Modular Design:** Easily extendable and adaptable to more complex requirements.

## 🚀 Getting Started

### Installation

```bash
npm install slydr.js
```

### Basic Usage

1.  **Include the necessary CSS and JavaScript files** in your HTML.

2.  **Structure your HTML** with a container element and the slides within it. For example:

    ```html
    <div class="slider-container" style="max-width: 960px; margin-block: auto; overflow-x: hidden;">
      <div class="carousel">
        <ul class="slider" style="display: flex;">
          <li class="slides">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo, repudiandae nihil? Vel optio itaque temporibus tempora atque et, harum similique, esse omnis quia nobis aperiam quis rem vitae numquam vero!</li>
          <li class="slides">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo, repudiandae nihil? Vel optio itaque temporibus tempora atque et, harum similique, esse omnis quia nobis aperiam quis rem vitae numquam vero!</li>
          <li class="slides">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo, repudiandae nihil? Vel optio itaque temporibus tempora atque et, harum similique, esse omnis quia nobis aperiam quis rem vitae numquam vero!</li>
          <li class="slides">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo, repudiandae nihil? Vel optio itaque temporibus tempora atque et, harum similique, esse omnis quia nobis aperiam quis rem vitae numquam vero!</li>
          <li class="slides">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo, repudiandae nihil? Vel optio itaque temporibus tempora atque et, harum similique, esse omnis quia nobis aperiam quis rem vitae numquam vero!</li>
          <li class="slides">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo, repudiandae nihil? Vel optio itaque temporibus tempora atque et, harum similique, esse omnis quia nobis aperiam quis rem vitae numquam vero!</li>
          <li class="slides">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo, repudiandae nihil? Vel optio itaque temporibus tempora atque et, harum similique, esse omnis quia nobis aperiam quis rem vitae numquam vero!</li>
          <li class="slides">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo, repudiandae nihil? Vel optio itaque temporibus tempora atque et, harum similique, esse omnis quia nobis aperiam quis rem vitae numquam vero!</li>
          <li class="slides">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo, repudiandae nihil? Vel optio itaque temporibus tempora atque et, harum similique, esse omnis quia nobis aperiam quis rem vitae numquam vero!</li>
          <li class="slides">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo, repudiandae nihil? Vel optio itaque temporibus tempora atque et, harum similique, esse omnis quia nobis aperiam quis rem vitae numquam vero!</li>
          <li class="slides">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo, repudiandae nihil? Vel optio itaque temporibus tempora atque et, harum similique, esse omnis quia nobis aperiam quis rem vitae numquam vero!</li>
          <li class="slides">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo, repudiandae nihil? Vel optio itaque temporibus tempora atque et, harum similique, esse omnis quia nobis aperiam quis rem vitae numquam vero!</li>
        </ul>
      </div>
    </div>
    ```

3.  **Initialize Slydr.js** in your JavaScript:

    ```javascript
    new Slider(".slider-container", {
      gap: 24,
      pagination: true,
      drag: true,
    }).mount();
    ```


## ⚙️ Configuration Options


| Option        | Type    | Default     | Description                                                                 |
| ------------- | ------- | ----------- | --------------------------------------------------------------------------- |
| \`autoplay\`    | \`boolean\` | \`false\`     | Enables or disables automatic sliding.                                      |
| \`interval\`    | \`number\`  | \`3000\`      | The time (in milliseconds) between automatic slide transitions.             |
| \`navigation\`  | \`boolean\` | \`false\`     | Displays navigation arrows.                                                 |
| \`dots\`        | \`boolean\` | \`false\`     | Displays dot indicators for navigation.                                     |
| \`loop\`        | \`boolean\` | \`false\`     | Enables infinite looping of the slides.                                     |
| \`speed\`       | \`number\`  | \`300\`       | The duration of the slide transition in milliseconds.                       |
| \`direction\`   | \`string\`  | \`'horizontal'\` | The direction of the sliding animation (\`'horizontal'\` or \`'vertical'\`). |
| \`breakpoints\` | \`object\`  | \`{}\`        | Responsive settings based on screen breakpoints.                             |
| ...           | ...     | ...         | ...                                                                         |

## 🤝 Contributing

Contributions to Slydr.js are welcome\! If you have any bug fixes, feature requests, or improvements, please feel free to:

1.  Fork the repository.
2.  Create a new branch for your feature or fix.
3.  Commit your changes.
4.  Push your branch to GitHub.
5.  Submit a pull request.
-----

**Thank you for using Slydr.js\! We hope it enhances your web development projects.**`;
