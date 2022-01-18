/**
 *
 * @param {*} name
 * @returns The selected HTMlElement or an Error
 */
export const selector = (name) => {
  let type = typeof name;
  switch (type) {
    case "string":
      console.log("its a string");
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

let animations = []

const render  = ()=>{
    animations.
}

export const scale = (el, userOptions) => {
    let options = getDefaults(userOptions)
    let element = selector(el);
    let scale  = options.hasOwnProperty('scale') ? options.scale: 1 
    let animation = element.animate([{ transform: `scale(${scale})` }], {
      ...options,
      composite:"replace"
    });
    return animation;
  };

/**
 * @description Rotates 360 degrees
 * @param {*} el 
 * @param {*} userOptions 
 * @returns Animation object
 */
export const spin = (el, userOptions) => {
  let options = getDefaults(userOptions)
  let element = selector(el);
  let animation = element.animate([{ transform: "rotate(360deg)" }], {
    ...options,
    composite:"add"
  });
  return animation;
};

export const shift = (el, userOptions) => {
    let options = getDefaults(userOptions)
    let element = selector(el);
    let x  = options.hasOwnProperty('x') ? options.x: 0 
    let y  = options.hasOwnProperty('y') ? options.y: 0
    let matrix = getComputedStyle(element).transform
    let origin = getPositionFromMatrix(matrix)
    let animation = element.animate([
        {transform: `translate(${origin.x}px,${origin.y}px)`},
        {transform: `translate(${sum(origin.x,x)}px,${sum(origin.y,y)}px)`}], {
      ...options
    });
    return animation;
  };



//   Utility functions
const getDefaults = (options) => {
  const {
    composite= 'replace',
    delay = 0,
    direction = "normal",
    duration = 1000,
    easing = "cubic-bezier(0.34, 1.56, 0.64, 1)",
    endDelay = 0,
    fill = "none",
    iterationStart= 0,
    iterations = "Infinity",
    iterationComposite= "replace",
  } = options || {};
  return {...options, delay, direction, duration, easing, endDelay, fill, iterationStart, iterations, composite, iterationComposite };
};

const getPositionFromMatrix = (str) => {
    if (str==="none") return {x:0, y:0}
    let parts  = str.split(",")
    let x = parseInt(parts[4])
    let y = parseInt(parts[5])
    return {x,y}
}

const sum = (a,b) =>{
    return parseInt(a) + parseInt(b)
}

