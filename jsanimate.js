/**
 * @desc  Animation library that allows chaining animation descriptions
 */
export default class Animate {
  constructor(elementToAnimate) {
    try {
      this.element = selector(elementToAnimate);
    } catch (error) {
      console.log(error.message)
    }
    this.rem = getComputedStyle(document.documentElement).fontSize;
    this.setDefaultProperties();
  }

  computeChange(original, change) {
    // determine if px, rem, %
    // console.log({original, change})
    let originalUnit = this.determineUnit(original);
    if (originalUnit === null) return change;
    let changeUnit = this.determineUnit(change);
    if (originalUnit === changeUnit) {
      console.log("same unit");
      return this.sameUnitAddition(original, change, originalUnit);
    }
    switch (key) {
      case value:
        break;

      default:
        break;
    }
  }

  /**
   * @description Internal method to determin what unit a measurement is in
   * @param {*} str
   * @returns string name of measurement e.g. px
   */
  determineUnit(str) {
    if (typeof str !== "string") return null;
    if (str.includes("px")) return "px";
    if (str.includes("rem")) return "rem";
    if (str.includes("%")) return "%";
    if (str.includes("turn")) return "turn";
    return null;
  }

  differentUnitAddition(original, change, firstUnit, secondUnit) {
    // TODO: complete this functionality
    let result = parseFloat(original.split(unit)[0]) + parseFloat(change.split(unit)[0]);
    return result + unit;
  }
  /**
   * @description Accepts a boolean to decide if a element should fade. Defaults to true
   * @param {bool} val
   * @returns instance of the class
   */
  fade(val = true) {
    this.shouldFade = val;
    return this;
  }

  /**
   * @description Creates perspective on animating element
   * @param {string} perspective -  ;
   * @returns instance of the class
   */
  perspective(perspective = "none") {
    this.localPerspective = perspective;
    return this;
  }

  /**
   * @description Converts pixels to a percentage of the element size
   * @param {*} val 
   * @param {*} axis 
   * @returns percentage as number
   */
  pxToPercent(val, axis) {
    let computedStyle = getComputedStyle(this.element);
    let denominatior;
    let numerator = parseFloat(val.replace("px", ""));

    if ((axis = "x")) {
      denominator = parseFloat(computedStyle.height.replace("px", ""));
    } else {
      denominator = parseFloat(computedStyle.width.replace("px", ""));
    }

    return (numerator / denominator) * 100;
  }

  /**
   * @description Plays last animation in reverse
   * @returns instance of the class
   */
  reverse() {
    if (this.lastAnimation === null) return this;
    this.lastAnimation.reverse();
    return this;
  }

  /**
   * @description Sets the class properties to the defaults for the class and runs the animation which will return the element to its original state
   */
  reset() {
    this.setDefaultProperties();
    this.run();
  }

  /**
   * @description
   * @param {*} param0
   * @returns instance of the class
   */
  rotate({ angle = 0, add = false }) {
    // to handle cases where the user provides one number as angle
    if (typeof arguments[0] === "number") {
      angle = arguments[0];
    }
    add ? (this.angle += angle) : (this.angle = angle);
    return this;
  }

  /**
   * @description 3d rotation along the x axis
   * @param {string} angle
   * @returns instance of the class
   */
  rotateX(angle = "0deg") {
    this.rotation.x = angle;
    return this;
  }

  /**
   * @description 3d rotation along the Y axis
   * @param {string} angle
   * @returns instance of the class
   */
  rotateY(angle = "0deg") {
    this.rotation.y = angle;
    return this;
  }

  /**
   * @description 3d rotation along the Z axis
   * @param {string} angle
   * @returns instance of the class
   */
  rotateZ(angle = "0deg") {
    this.rotation.z = angle;
    return this;
  }

  /**
   * @description Executes the animation
   * @param {object} options object with keyframeEffect options 
   * @returns instance of the class
   */
  run(options = {}) {
    let combinedOptions = getDefaultOptions(options);
    // console.log(this.animationArray);
    // console.log(this.element);
    // TODO: animate removal of perspective
    this.element.parentElement.style.perspective = this.hasPerspective ? this.distance : "none";
    let animation = this.element.animate(
      [
        {
          transformOrigin: this.origin,
          transform: ` 
          perspective(${this.localPerspective})
          scale(${this.size.x}, ${this.size.y})
          translate(${this.cords.x}, ${this.cords.y})
          rotate(${this.angle}deg) 
          rotateX(${this.rotation.x})
          rotateY(${this.rotation.y})
          rotateZ(${this.rotation.z})
          translateX(${this.cords3D.x})
          translateY(${this.cords3D.y})
          translateZ(${this.cords3D.z})
          `,
          opacity: this.shouldFade ? 0 : 1,
        },
      ],
      {
        ...combinedOptions,
      }
    );
    this.lastAnimation = animation;
    animation.play();

    animation.onfinish = () => {
      // console.log(getComputedStyle(this.element).transform);
      if (this.onFinish !== null) this.onFinish();
    };
    this.animationArray = [];
    return this;
  }

  /**
   * 
   * @param {string} original 
   * @param {string} change 
   * @param {string} unit 
   * @returns sum of the two values as a string inclusive of the unit e.g. "20px"
   */
  sameUnitAddition(original, change, unit) {
    let result = parseFloat(original.replace(unit, "")) + parseFloat(change.replace(unit, ""));
    return result + unit;
  }

  scale({ x = 1, y = 1, add = false }) {
    // to handle cases where the user provides one number as size
    if (typeof arguments[0] === "number") {
      x = y = arguments[0];
    }

    // this.animationArray.push( { transform: `scale(0)` } )
    if (typeof arguments[0] === "object") {
      if (arguments[0].hasOwnProperty("x") && !arguments[0].hasOwnProperty("y")) y = x;
      if (arguments[0].hasOwnProperty("y") && !arguments[0].hasOwnProperty("x")) x = y;
    }

    add ? (this.size = { x: this.size.x + x, y: this.size.y + y }) : (this.size = { x, y });
    return this;
  }
  /**
   * @description Sets 3d perspective on parent
   * @param {bool} hasPerspective - turns perspective on and off
   * @param {string} distance - Distance away from the screen
   * @returns
   */
  set3DPerspective(hasPerspective = false, distance = "none") {
    this.hasPerspective = hasPerspective;
    this.distance = distance;
    return this;
  }

  /**
   * @description Sets the class properties to the defaults for the class without running the animation
   */
  setDefaultProperties() {
    this.pageWidth;
    this.animationArray = [];
    this.size = { x: 1, y: 1 };
    this.cords = { x: 0, y: 0 };
    this.cords3D = { x: 0, y: 0, z: 0 };
    this.angle = 0;
    this.lastAnimation = null;
    this.onFinish = null;
    this.shouldFade = false;
    this.distance = "1px";
    this.hasPerspective = false;
    this.localPerspective = "none";
    this.rotation = { x: "0deg", y: "0deg", z: "0deg" };
    this.origin = "center";
  }

  // TODO: implement skew methods 

  /**
   * @description Moves the element in 2d space along the x and y axis
   * @param {object} param0 As number or object. A number will cause the element to be moved
   * in the x and y direction in the same amount of px. An object allows you to pass the x and
   *  y cords along with add as a boolean which determines if the new figure should add to the
   *  current translate.
   * @   E.g. translate(45)
   * E.g. translate({x:"34px", y:"100px", add:true})
   * @returns instance of the class
   */
  translate({ x, y, add = false }) {
    if (typeof x === "number") x = `${x}px`;
    if (typeof y === "number") y = `${y}px`;

    add ? (this.cords = { x: this.computeChange(this.cords.x, x), y: this.computeChange(this.cords.y, y) }) : (this.cords = { x, y });
    return this;
  }

  /**
   * @description 3d rotation along the x axis
   * @param {string} angle can be in px "45px", deg "90deg", turn ".5turn"
   * @returns
   */
  translateX(angle = "0deg") {
    this.cords3D.x = angle;
    return this;
  }

  /**
   * @description 3d rotation along the Y axis
   * @param {string} angle can be in px "45px", deg "90deg", turn ".5turn"
   * @returns
   */
  translateY(angle = "0deg") {
    this.cords3D.y = angle;
    return this;
  }

  /**
   * @description 3d rotation along the Z axis
   * @param {string} angle can be in px "45px", deg "90deg", turn ".5turn"
   * @returns
   */
  translateZ(angle = "0deg") {
    this.cords3D.z = angle;
    return this;
  }

  /**
   * @description - Sets the origin of the transform
   * @param {string} origin - the origin of the transform , center, top, left, bottom, length e.g. 10px
   * @returns
   */
  transformOrigin(origin = "center") {
    this.origin = origin;
    return this;
  }
}

// -----------------------END OF CLASS----------------------

//   --- Utility functions ---

/**
 * @description Sets Animation defaults and overrides them with any user options
 * @param {*} options
 * @returns defaults for the Animation options
 */
const getDefaultOptions = (options) => {
  const {
    composite = "replace",
    delay = 0,
    direction = "normal",
    duration = 1000,
    easing = "cubic-bezier(0.34, 1, 0.64, 1)",
    endDelay = 0,
    fill = "forwards",
    iterationStart = 0,
    iterations = "1",
    iterationComposite = "replace",
  } = options || {};
  return { ...options, delay, direction, duration, easing, endDelay, fill, iterationStart, iterations, composite, iterationComposite };
};

/**
 * @description Expects to get Matrix as string and extracts the x and y values
 * @param {string} str
 * @returns An object with x and y values
 */
const getPositionFromMatrix = (str) => {
  if (str === "none") return { x: 0, y: 0 };
  let parts = str.split(",");
  let x = parseInt(parts[4]);
  let y = parseInt(parts[5]);
  return { x, y };
};

/**
 *
 * @param {*} a
 * @param {*} b
 * @returns The sum of the two numbers
 */
const sum = (a, b) => {
  return parseInt(a) + parseInt(b);
};

/**
 *
 * @param {} name
 * @returns The selected HTMlElement or an Error
 */
export const selector = (name) => {
  let type = typeof name;
  switch (type) {
    case "string":
      // console.log("its a string");
      let el = document.querySelector(name);
      if (el instanceof HTMLElement) {
        return el;
      }
      throw new Error("The string provided was not found");
    case "object":
      console.log("its an object");
      if (name instanceof HTMLElement) {
        return name;
      }
      throw new Error("Object must be a valid HTMLElement");
    default:
      throw new Error("Must be an HTMLElement or string");
  }
};
