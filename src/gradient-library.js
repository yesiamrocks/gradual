// animated-gradient-library.js

(function () {
  // A private helper to generate a unique animation name
  function generateUniqueAnimationName(prefix = "ag-anim-") {
    return prefix + Math.random().toString(36).substring(2, 9);
  }

  // A private helper to inject CSS into the document head
  function injectCss(css) {
    const style = document.createElement("style");
    style.type = "text/css";
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  /**
   * Initializes an animated gradient background on a specified HTML element.
   *
   * @param {object} options - Configuration options for the gradient.
   * @param {string|HTMLElement} options.target - The ID of the HTML element (string) or the HTMLElement itself to apply the gradient to.
   * @param {string[]} options.colors - An array of hexadecimal color strings (e.g., ['#ff9a9e', '#fad0c4']).
   * @param {string} [options.speed='15s'] - The duration of one animation cycle (e.g., '10s', '20s').
   * @param {string} [options.direction='to right'] - The direction of the linear gradient (e.g., 'to right', '45deg').
   * @param {string} [options.size='400%'] - The size of the background, often larger than 100% for animation effect (e.g., '200%', '300%').
   * @param {string} [options.timingFunction='ease'] - The CSS animation-timing-function (e.g., 'linear', 'ease-in-out').
   */
  function AnimatedGradient(options) {
    const defaultOptions = {
      target: null,
      colors: ["#EE6F57", "#F6C90E", "#4CAF50"], // Default vibrant colors
      speed: "15s",
      direction: "to right",
      size: "400%",
      timingFunction: "ease",
    };

    const config = { ...defaultOptions, ...options };

    let targetElement;
    if (typeof config.target === "string") {
      targetElement = document.getElementById(config.target);
    } else if (config.target instanceof HTMLElement) {
      targetElement = config.target;
    }

    if (!targetElement) {
      console.error(
        "AnimatedGradient: Valid target (element ID or HTMLElement) is required."
      );
      return;
    }

    // Generate the CSS for the gradient background
    const gradientCssValue = `linear-gradient(${
      config.direction
    }, ${config.colors.join(", ")})`;

    // Generate a unique animation name for this instance
    const animationName = generateUniqueAnimationName();

    // Create the keyframes for the animation
    const keyframesCss = `
            @keyframes ${animationName} {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;

    // Inject the keyframes into the document's head
    injectCss(keyframesCss);

    // Apply inline styles to the target element
    targetElement.style.background = gradientCssValue;
    targetElement.style.backgroundSize = `${config.size} ${config.size}`; // e.g., '400% 400%'
    targetElement.style.animation = `${animationName} ${config.speed} ${config.timingFunction} infinite`;
  }

  // Expose the AnimatedGradient function globally
  // We'll use a namespace to avoid potential conflicts
  window.AnimatedGradientJS = {
    init: AnimatedGradient,
  };
})();
