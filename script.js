import MyButton from "./my-button.js";
import Animate, {animate} from './animations.js'
customElements.define("my-button", MyButton)

let animateSquare = new Animate('.mysquare')
let count = 0     
function doAnimation(){
    count +=1
    animateSquare.scale(0).rotate(90).run({duration: 300})
    animateSquare.element.innerText = count
    animateSquare.scale(1).rotate(0).run({delay: 1000})

    console.log( getComputedStyle( animateSquare.element).transform)
}

animateSquare.element.onclick = ()=> doAnimation()



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