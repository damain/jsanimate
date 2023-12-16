/**
 * @desc  Animation library that allows chaining animation descriptions
 */
export default class Animate {
    shouldFade: boolean;
    pageWidth: any;
    size: {
        x: number;
        y: number;
    };
    cords: {
        x: number | string;
        y: number | string;
    };
    cords3D: {
        x: number | string;
        y: number | string;
        z: number | string;
    };
    angle: number;
    lastAnimation: null | any;
    onFinish: null | Function;
    distance: string;
    hasPerspective: boolean;
    localPerspective: string;
    rotation: {
        x: string;
        y: string;
        z: string;
    };
    origin: string;
    element: HTMLElement;
    rem: string;
    constructor(elementToAnimate: string | HTMLElement);
    computeChange(original: any, change: any): any;
    /**
     * @description Internal method to determin what unit a measurement is in
     * @param {*} str
     * @returns string name of measurement e.g. px
     */
    determineUnit(str: any): "px" | "rem" | "%" | "turn";
    differentUnitAddition(original: any, change: any, firstUnit: any, secondUnit: any): void;
    /**
     * @description Accepts a boolean to decide if a element should fade. Defaults to true
     * @param {bool} val
     * @returns instance of the class
     */
    fade(val?: boolean): this;
    /**
     * @description Creates perspective on animating element
     * @param {string} perspective -  ;
     * @returns instance of the class
     */
    perspective(perspective?: string): this;
    /**
     * @description Converts pixels to a percentage of the element size
     * @param {*} val
     * @param {*} axis
     * @returns percentage as number
     */
    pxToPercent(val: any, axis: any): number;
    /**
     * @description Plays last animation in reverse
     * @returns instance of the class
     */
    reverse(): this;
    /**
     * @description Sets the class properties to the defaults for the class and runs the animation which will return the element to its original state
     * @returns instance of the class
     */
    reset(): this;
    /**
     * @description
     * @param {*} param0
     * @returns instance of the class
     */
    rotate({ angle, add }: {
        angle?: number;
        add?: boolean;
    }): this;
    /**
     * 3D rotation along the x axis
     * @param {string} angle
     * @returns instance of the class
     */
    rotateX(angle?: string): this;
    /**
     * 3D rotation along the Y axis
     * @param {string} angle
     * @returns instance of the class
     */
    rotateY(angle?: string): this;
    /**
     * 3D rotation along the Z axis
     * @param {string} angle
     * @returns instance of the class
     */
    rotateZ(angle?: string): this;
    /**
     * Executes the animation, can also be chained to add a subsequent animation
     * @param {object} options object with keyframeEffect options
     * @returns instance of the class
     */
    run(options?: Partial<KeyframeAnimationOptions>): this;
    /**
     *
     * @param {string} original
     * @param {string} change
     * @param {string} unit
     * @returns sum of the two values as a string inclusive of the unit e.g. "20px"
     */
    sameUnitAddition(original: any, change: any, unit: any): any;
    scale({ x, y, add }: {
        x?: number;
        y?: number;
        add?: boolean;
    }): this;
    /**
     * @description Sets 3d perspective on parent
     * @param {bool} hasPerspective - turns perspective on and off
     * @param {string} distance - Distance away from the screen
     * @returns
     */
    set3DPerspective(hasPerspective?: boolean, distance?: string): this;
    /**
     * @description Sets the class properties to the defaults for the class without running the animation
     */
    setDefaultProperties(): void;
    /**
     * Moves the element in 2D space along the x and y axis
     * @param {object} param0 As number or object. A number will cause the element to be moved
     * in the x and y direction in the same amount of px. An object allows you to pass the x and
     *  y cords along with add as a boolean which determines if the new figure should add to the
     *  current translate.
     * @   E.g. translate({x:45, y:45})
     * E.g. translate({x:"34px", y:"100px", add:true})
     * @returns instance of the class
     */
    translate({ x, y, add, }: {
        x: number | string;
        y: number | string;
        add: boolean;
    }): this;
    /**
     * 3D rotation along the x axis
     * @param {string} angle can be in px "45px", deg "90deg", turn ".5turn"
     * @returns
     */
    translateX(angle?: string): this;
    /**
     * 3D rotation along the Y axis
     * @param {string} angle can be in px "45px", deg "90deg", turn ".5turn"
     * @returns
     */
    translateY(angle?: string): this;
    /**
     * 3D rotation along the Z axis
     * @param {string} angle can be in px "45px", deg "90deg", turn ".5turn"
     * @returns
     */
    translateZ(angle?: string): this;
    /**
     * Sets the origin of the transform
     * @param {string} origin - the origin of the transform , center, top, left, bottom, length e.g. 10px
     * @returns
     */
    transformOrigin(origin?: string): this;
}
/**
 * Selects the element to be animated
 * @param {} name a string that can be used as a css selector or a reference to an HTMLElement
 * @returns The selected HTMlElement or an Error
 */
export declare const selector: (name: string | HTMLElement) => HTMLElement;
