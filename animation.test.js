/**
 * @jest-environment jsdom
 */

import Animate, {selector} from './animations.js'
// import {JSDOM} from 'jsdom'

document.body.innerHTML=/*html*/ `
    <div>
        <div class="myClass">this is myClass</div>
        <div id="myElement">this is myElement</div>
    </div>
`
test('Can select elements if string provided ',()=>{
    // console.log(document.querySelector())
    expect(selector('.myClass')).toBeDefined()
})

test('returns element if it is a valid HTMLElement ',()=>{
    // console.log(document.querySelector())
    let el = document.querySelector(".myClass")
    expect(selector(el)).toEqual(el)
})

test('throws error if element not found ',()=>{
    function toTest () {selector('.doesntExist')}
    expect( toTest ).toThrowError('The string provided was not found')
})

test('throws error if selector name object is nor HTMLElement',()=>{
    function toTest () {selector({message: "hi"})}
    expect( toTest ).toThrowError('Object must be a valid HTMLElement')
})

test('throws error if selector name not HTMLElement or string ',()=>{
    function toTest () {selector(5)}
    expect( toTest ).toThrowError('Must be an HTMLElement or string')
})

// Testing determineUnit

test('can determine px',()=>{
    let elToAnimate = new Animate('.myClass')
    let result = elToAnimate.determineUnit("20px")
    expect(result).toBe("px")
})
test('can determine rem',()=>{
    let elToAnimate = new Animate('.myClass')
    let result = elToAnimate.determineUnit("20rem")
    expect(result).toBe("rem")
})
test('can determine %',()=>{
    let elToAnimate = new Animate('.myClass')
    let result = elToAnimate.determineUnit("%")
    expect(result).toBe("%")
})
test('can determine turn',()=>{
    let elToAnimate = new Animate('.myClass')
    let result = elToAnimate.determineUnit("2turn")
    expect(result).toBe("turn")
})


// testing animation methods
test('can rotate',()=>{
    let elToAnimate = new Animate('.myClass')
    elToAnimate.rotate(30).run()
    elToAnimate.onFinish = ()=>{
        result = getComputedStyle(elToAnimate.element).transform
        expect(result).toBe('matrix(0.866025, 0.5, -0.5, 0.866025, 0, 0)')
    }
    
})
test('can reset',()=>{
    let elToAnimate = new Animate('.myClass')
    elToAnimate.reset()
    elToAnimate.onFinish = ()=>{
        result = getComputedStyle(elToAnimate.element).transform
        expect(result).toBe('matrix(1, 0, 0, 1, 0, 0)')
    }
    
})
