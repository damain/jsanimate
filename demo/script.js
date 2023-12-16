import Animate from '../build/jsanimate.js'

// Variable to hold menu state
let menuOpen = false

// Get elements to animate
let square = new Animate(".square")
let aside = new Animate("aside")

// Get buttons
let button1 = document.querySelector("#translate")
let button2 = document.querySelector("#rotate")
let button3 = document.querySelector("#fade")
let button4 = document.querySelector("#open")
let button5 = document.querySelector("#reset")
let button6 = document.querySelector("#reverse")
let button7 = document.querySelector("#complex")

square.element.onclick = ()=>{
  square.rotate({angle: 45, add:true}).run()
}

button1.onclick = ()=>square.translate({x:45, y:300}).run()
button2.onclick = ()=>square.rotate(360).run()
button3.onclick = ()=>square.fade().run()

button4.onclick = ()=>{
  if (!menuOpen){
    // slide to the right if closed
    aside.perspective("6cm")
      .transformOrigin("center left").rotateY("45deg")
      .translate({x:"290px", y: "0px"}).run({duration: 100})
      .rotateY("0deg").run({duration: 600})
    button4.innerText  = "close menu"
  }else{
    //slide to the left if open
    aside.rotateY("45deg").run({duration: 300})
    button4.innerText  = "open menu"
  }
  //toggle menu state
  menuOpen = !menuOpen
}

button5.onclick = ()=>square.reset()
button6.onclick = ()=>square.reverse()

// Animation when complex button clicked
button7.onclick = ()=>{
  square.perspective("6cm").translate({x:200, y:0}).run()
    .rotateY("1turn").run({endDelay: 100})
    .transformOrigin("top right").run()
    .rotate(-30).run({delay: 1000, easing: "cubic-bezier(.34,-0.06,.1,1.6)"})
    .translate({x:200, y: 300}).fade().run({delay: 1500})
}


