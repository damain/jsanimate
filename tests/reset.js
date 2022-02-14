/**
 * @jest-environment jsdom
 */

import Animate, {selector} from '../animations.js'
// import {JSDOM} from 'jsdom'

document.body.innerHTML=/*html*/ `
    <div>
        <div class="myClass">this is myClass</div>
        <div id="myElement">this is myElement</div>
    </div>
`

test('can reset',()=>{
    let elToAnimate = new Animate('.myClass')
    elToAnimate.reset()
    elToAnimate.onFinish = ()=>{
        result = getComputedStyle(elToAnimate.element).transform
        expect(result).toBe('matrix(1, 0, 0, 1, 0, 0)')
    }
    
})