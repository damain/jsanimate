const template = document.createElement("template")
template.innerHTML=`
    <style></style>
    <div> this is a button too
        <a href="https://google.com">test</a>
    </div>
`
export default class myButton extends HTMLElement{
    constructor(){
        super()
        this._shadowRoot = this.attachShadow({"mode": "open"})
        this._shadowRoot.appendChild(template.content.cloneNode(true))
        this.onclick=  this.doSomthing
        let tag = this._shadowRoot.querySelector('a')
        tag.style.color = "red"
    }

    doSomthing(){
        let plot = this.getAttribute('plot')
        console.log(`doing something ${plot}` )
        this.dispatchEvent(new CustomEvent('onPow',{detail: {message: "just like in batman"}}))
    }
         
}