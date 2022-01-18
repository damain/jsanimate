/**
 * @jest-environment jsdom
 */

import {selector} from './animations.js'
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
