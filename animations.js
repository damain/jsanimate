export default class Animate {
  constructor(elementToAnimate) {
    this.element = selector(elementToAnimate);
    this.rem = getComputedStyle(document.documentElement).fontSize;
    this.pageWidth;
    this.animationArray = [];
    this.size = { x: 1, y: 1 };
    this.cords = { x: 0, y: 0 };
    this.angle = 0;
    this.lastAnimation = null;
    this.onFinish = null;
    this.shouldFade = false;
  }

  addAnimation() {
    let matrix = getComputedStyle(element).transform;
    this.animationArray.push({ transform: `rotate(${this.angle}deg)` });
  }

  determineUnit(str) {
    if (typeof str !== 'string') return null
    if (str.includes("px")) return "px";
    if (str.includes("rem")) return "rem";
    if (str.includes("%")) return "%";
    if (str.includes("turn")) return "turn";
    return null;
  }

  // Adds two units values with the same units.
  sameUnitAddition(original, change, unit){
    let result = parseFloat(original.replace(unit, "")) + parseFloat(change.replace(unit,""))
    return result + unit
  }
  differentUnitAddition(original, change, firstUnit, secondUnit){
    let result = parseFloat(original.split(unit)[0]) + parseFloat(change.split(unit)[0])
    return result + unit
  }
  pxToPercent(val, axis){
    let computedStyle = getComputedStyle(this.element)
    let denominatior
    let numerator= parseFloat(val.replace("px", ""))
    
    if(axis="x"){
      denominator = parseFloat(computedStyle.height.replace("px",""))
    }else {
      denominator = parseFloat(computedStyle.width.replace("px",""))
    }

    return (numerator/denominator)*100
  }

  fade (val = true){
    this.shouldFade = val;
    return this

  }

  computeChange(original, change) {
    // determine if px, rem, %
    // console.log({original, change})
    let originalUnit = this.determineUnit(original);
    if (originalUnit === null) return change;
    let changeUnit = this.determineUnit(change);
    if (originalUnit === changeUnit){
      console.log("same unit")
      return this.sameUnitAddition(original, change, originalUnit)
    }
    switch (key) {
      case value:
        break;

      default:
        break;
    }
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

  rotate({ angle = 0, add = false }) {
    // to handle cases where the user provides one number as angle
    if (typeof arguments[0] === "number") {
      angle = arguments[0];
    }
    add ? (this.angle += angle) : (this.angle = angle);
    return this;
  }

  translate({ x, y, add = false }) {
    if (typeof x === "number") x = `${x}px`;
    if (typeof y === "number") y = `${y}px`;

    add ? (this.cords = { x: this.computeChange(this.cords.x , x), y: this.computeChange( this.cords.y , y) }) : (this.cords = { x, y });
    return this;
  }

  reverse() {
    if (this.lastAnimation === null) return this;
    this.lastAnimation.reverse();
    return this;
  }


  run(options = {}) {
    let combinedOptions = getDefaults(options);
    // console.log(this.animationArray);
    // console.log(this.element);
    let animation = this.element.animate(
      [
        {
          
          transform: ` 
          
          scale(${this.size.x}, ${this.size.y})
          translate(${this.cords.x}, ${this.cords.y})
          rotate(${this.angle}deg) 
          `,
          opacity: this.shouldFade ? 0 : 1
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
  reset() {
    this.size = { x: 1, y: 1 };
    this.cords = { x: 0, y: 0 };
    this.angle = 0;
    this.run();
  }
}

// -----------------------END OF CLASS----------------------


//   --- Utility functions ---

/**
 * @description Sets Animation defaults and overrides them with any user options
 * @param {*} options
 * @returns defaults for the Animation options
 */
const getDefaults = (options) => {
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
