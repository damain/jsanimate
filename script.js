import MyButton from "./my-button.js";
import Animate from './animations.js'
customElements.define("my-button", MyButton)

let animateSquare = new Animate('.mysquare')
let count = 0     
let test = ""
animateSquare.onFinish = ()=>{console.log("done")}
function doAnimation(){
    count +=1
    // animateSquare.scale(2).run().rotate(-100).translate({x: "200%", y: "50%", add:true}).fade().run().rotate({angle:100, add:true}).fade(false).run({delay: 1000})
    // animateSquare.element.innerText = count
    // animateSquare.scale(1).rotate(0).run({delay: 1000})
    // animateSquare.perspective("6cm").transformOrigin("botttom right").rotateZ(".5turn").run()
    // .transformOrigin("bottom left").rotateZ("1turn").run({delay: 500})
    animateSquare.transformOrigin("bottom right").run().rotateZ(".5turn").run({easing: "cubic-bezier(.08,.28,.33,1.5)"}).rotateZ(".6turn").run({delay: 1000})
    console.log( getComputedStyle( animateSquare.element).transform)
}

animateSquare.element.onclick = ()=> doAnimation()

// animateSquare.element.onmouseenter = ()=> animateSquare.rotate(0).perspective("6cm").rotateX(".5turn").run()
// animateSquare.element.onmouseleave = ()=> animateSquare.rotate(0).rotateX("1turn").run()

let reverseButton= document.querySelector("#reverse")
reverseButton.onclick = ()=>{
    animateSquare.reverse()
}

let resetButton= document.querySelector("#reset")
resetButton.onclick = ()=>{
    animateSquare.reset()
}


// const logPow = (e) =>{
//     console.log("ffromo pow")
// }

// // spin('.mysquare', 600, 1)

// let mySquare = document.querySelector('.mysquare')
// mySquare.onclick= ()=>{
//     animate('.mysquare', [{name:'scale', scale: 1.5}], {fill:"forwards", iterations:1 })
//    // let test = spin('.mysquare',{fill:"none", iterations: 1, composite:"add"})
//         // shift('.mysquare', {x:"100", y:"-0", iterations:1, fill: "forwards"})
//         // setTimeout(()=>shift('.mysquare', {x:"100", y:"200", iterations:1, fill: "forwards"}), 1000)
//         // spin('.mysquare',{fill:"forwards", iterations: 1})
//     // scale('.mysquare',{fill:"forwards", iterations: 1, scale:5, composite:"replace"})
// }



// mySquare.addEventListener("mouseover", ()=>scale('.mysquare',{fill:"forwards", iterations: 1, scale:1.5, composite:"replace"}) )
// mySquare.addEventListener("mouseout", ()=>scale('.mysquare',{fill:"forwards", iterations: 1, scale:1, composite:"replace"}) )