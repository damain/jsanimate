import MyButton from "./my-button.js";
import {selector, spin, shift, scale} from './animations.js'
customElements.define("my-button", MyButton)

const logPow = (e) =>{
    console.log("ffromo pow")
}

// spin('.mysquare', 600, 1)

let mySquare = document.querySelector('.mysquare')
mySquare.onclick= ()=>{
   // let test = spin('.mysquare',{fill:"none", iterations: 1, composite:"add"})
    shift('.mysquare', {x:"100", y:"-0", iterations:1, fill: "forwards"})
    setTimeout(()=>shift('.mysquare', {x:"100", y:"200", iterations:1, fill: "forwards"}), 1000)
    spin('.mysquare',{fill:"forwards", iterations: 1})
    // scale('.mysquare',{fill:"forwards", iterations: 1, scale:5, composite:"replace"})
}

// mySquare.addEventListener("mouseover", ()=>scale('.mysquare',{fill:"forwards", iterations: 1, scale:1.5, composite:"replace"}) )
// mySquare.addEventListener("mouseout", ()=>scale('.mysquare',{fill:"forwards", iterations: 1, scale:1, composite:"replace"}) )