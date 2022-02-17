# Project Aim

- To create a chainable animation library for programmatic animation in javascript
- Work inside of other javascript frameworks like React
- Allow triggering of animations without using css classes
  <br/>
  <br/>

## Demo
See demo on [https://replit.com/@damain1/jsanimate-demo](https://replit.com/@damain1/jsanimate-demo)

<br />

# Installation
Download minified version below and add as a script tag

[https://github.com/damain/jsanimate/blob/main/jsanimate.min.js](https://github.com/damain/jsanimate/blob/main/jsanimate.min.js)

or install via npm
```bash
npm install @damain/jsanimate
```

# Basic Usage

Given the following html

```html
<div id="animateMe">I will be animated</div>
```

In your Javascript

```js
    import Jsanimate from "@damain/jsanimate"

    let elToAnimate = new Jsanimate("#animateMe")

    elToAnimate.rotate(45).run()

```

**Please Note** ⚠️

The constructor accepts any valid css selector or object with an HTMLElement (e.g. refs in React).

You need to call the `run()` method at the end in order for the animation to execute
<br/>
<br/>

# Functionality

Here are the available methods

- **fade**: fades element in and out using opacity, defaults to true
  ```js
  elToAnimate.fade();
  elToAnimate.fade(false); // removes the fade animation
  ```
- **perspective**: sets 3d perspective directly on element
  ```js
  elToAnimate.perspective("200px");
  elToAnimate.perspective("nome"); // removes the perspective
  ```
- **reset**: returns element to starting state
  ```js
  elToAnimate.reset();
  ```
- **reverse**: plays last animation in reverse
  ```js
  elToAnimate.reverse();
  ```

- **rotate**: turns in the 2d axis
  ```js
  elToAnimate.rotate(45);
  elToAnimate.rotate({ angle: "45", add: true });
  // 3d versions
  elToAnimate.rotateX("45deg");
  elToAnimate.rotateY(".5turn");
  elToAnimate.rotateZ("45deg");
  ```
- **run**: executes the animation
  ```js
  elToAnimate.run();
  elToAnimate.run({ delay: 1000, iterations: 2 });
  ```
- **scale**: changes the size of the element
  ```js
  elToAnimate.scale(3);
  elToAnimate.scale({ x: 3, y: 3, add: true });
  ```
- **set3DPerspective**: activates 3d perspective on the parent of the element to animate
  rotate and sets the perspective distance
  ```js
  elToAnimate.set3DPerspective(true, "6cm")
  ```
- **translate**: moves element alon the x and y axis

  ```js
  elToAnimate.translate({x:3});
  elToAnimate.translate({ x: 3, y: 3, add: true });

  // 3d versions
  elToAnimate.translateX("45deg");
  elToAnimate.translateY(".5turn");
  elToAnimate.translateZ("45deg");
  ```
- **transformOrigin**: sets the origin (pivot point) of the animation 

  ```js
  elToAnimate.transformOrigin("center");
  elToAnimate.transformOrigin("top right");
  ```
 

  <br/>
  <br/>


# Chaining methods together
Methods can be chained together to compose more complex animations. 

```js
elToAnimate.rotate(45).translate({ x: 45, y: 45 }).run();
```

You can continue chaining after the run in order to specify another animation.

```js
elToAnimate.rotate(45).translate({ x: 45, y: 60 }).run().scale(3).run({ delay: 1000 });
```

## Lets break this down

This code does **two animations**. The first animation will rotate 45 degrees while moving 45px on the➡️ x axis and 60px on the ⬇️y axis. The second animation scales the element 3 times bigger after 1 second. Therefore the run element signals the end of the animation.

In the run method, you can specify [animation keyframes options](https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect/KeyframeEffect) as an object. In the code above we specified the delay in milliseconds `...run({delay:1000})`

<br/>

**You can specify the following keyframe options**

| Option             | Default                          |
| ------------------ | -------------------------------- |
| delay              | 0                                |
| direction          | "forwards"                       |
| duration           | 1000ms                           |
| easing             | "cubic-bezier(0.34, 1, 0.64, 1)" |
| endDelay           | 0                                |
| fill               | "forwards"                       |
| iterationStart     | 0                                |
| iterations         | 1                                |
| composite          | "replace"                        |
| iterationComposite | "replace"                        |

<br/>
<br/>

# Beneath the hood

This library makes use of [the Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) to do CSS transformations on elements.

It works by using methods to set the end state of an animation, when run is called all the state changes are executed as one animation. Each method returns an instance of the class which allows all the methods to be chained similar to what you can do with JQuery or the way basic javascript array methods work.

# Roadmap

- Add skew functions
- Create helper methods for simple animations e.g. fadeLeft, fadeUp, etc.