export default class Animate{
  constructor(elementToAnimate){
    this.element = selector(elementToAnimate)
    this.animationArray = []
    this.size = 1
    this.angle = 0
  }
  addAnimation(){
    let matrix = getComputedStyle(element).transform
    this.animationArray.push( { transform: `rotate(${this.angle}deg)` } )
  }
  scale(size=1, add=false){
    // this.animationArray.push( { transform: `scale(0)` } )
    add ? this.size += size : this.size = size
    this.animationArray.push( `scale(${this.size})` )
    return this
  }
  rotate(angle=0, add=false){
    add ? this.angle += angle : this.angle = angle
    this.animationArray.push(  `rotate(${this.angle}deg)` )
    return this 
  }
  run(options={}){
    let combinedOptions = getDefaults(options)
    console.log(this.animationArray)
    let matrix = getComputedStyle(this.element).transform
    // let animation = this.element.animate([...this.animationArray.map(el=>{
    //   // return {transform: (matrix !== "none" ? matrix : "") +` ${el}`}
    //   return {transform:` ${el}`}
    // })], {
    //   ...combinedOptions
    // });
    let animation = this.element.animate([ {transform:` ${this.animationArray.join(" ")}`}
    ], {
      ...combinedOptions
    });
    //console.log(animation)
    //animation.commitStyles()
    animation.play()
    this.animationArray = []
    return this
  }
}


export const animate = (elementToAnimate, animationArray, userOptions) =>{
    let element = selector(elementToAnimate);
    let options = getDefaults(userOptions)
    let changes = []
    let matrix = getComputedStyle(element).transform
    if (matrix !== "none") changes.push(matrix)
    for (const anim of animationArray){
        let change = ''
        switch (anim.name) {
            case "scale":
                change = scale(anim)
                break;
            case "spin":
                change = spin()
                break;
            default:
                break;
        }
        changes.push(change)
    }
    console.log({changes, options})
    let animation = element.animate([{ transform: changes.join(' ') }], {
      ...options
    });
    animation.commitStyles()
    return animation;

}

export const fade = ()=>{

}

/**
 * 
 * @param {*} userOptions 
 * @returns 
 */
export const scale = (userOptions) => {
    let options = getDefaults(userOptions)
    let scale  = options.hasOwnProperty('scale') ? options.scale: 1 
    return `scale(${scale})`
};

/**
 * @description Rotates 360 degrees
 * @param {*} el 
 * @param {*} userOptions 
 * @returns Animation object
 */
export const spin = (el, userOptions) => {
//   let options = getDefaults(userOptions)
//   let element = selector(el);
  return "rotate(360deg)"
//   let animation = element.animate([{ transform: "rotate(360deg)" }], {
//     ...options,
//     composite:"add"
//   });
//   return animation;
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

//   --- Utility functions ---

/**
 * @description Sets Animation defaults and overrides them with any user options
 * @param {*} options 
 * @returns defaults for the Animation options
 */
const getDefaults = (options) => {
  const {
    composite= 'replace',
    delay = 0,
    direction = "normal",
    duration = 1000,
    easing = "cubic-bezier(0.34, 1, 0.64, 1)",
    endDelay = 0,
    fill = "forwards",
    iterationStart= 0,
    iterations = "1",
    iterationComposite= "replace",
  } = options || {};
  return {...options, delay, direction, duration, easing, endDelay, fill, iterationStart, iterations, composite, iterationComposite };
};

/**
 * @description Expects to get Matrix as string and extracts the x and y values 
 * @param {string} str 
 * @returns An object with x and y values
 */
const getPositionFromMatrix = (str) => {
    if (str==="none") return {x:0, y:0}
    let parts  = str.split(",")
    let x = parseInt(parts[4])
    let y = parseInt(parts[5])
    return {x,y}
}

/**
 * 
 * @param {*} a 
 * @param {*} b 
 * @returns The sum of the two numbers
 */
const sum = (a,b) =>{
    return parseInt(a) + parseInt(b)
}

/**
 *
 * @param {} name
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

