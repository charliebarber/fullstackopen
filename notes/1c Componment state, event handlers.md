---
title: '1c Componment state, event handlers'
created: '2020-06-06T20:21:12.713Z'
modified: '2020-06-06T21:18:22.261Z'
---

# 1c Componment state, event handlers

## Component helper functions
* Can define function inside the Component function
* So, on render, the function is called
* This gives the function access to the props so no parameters have to be passed into it

## Destructuring
* Allows us to destructure values from objects and arrays upon assignment
* Added in ES6
* Makes variable assignment easier
  * As we can take values from an objects properties and then put these into seperate variables.
* Example
```js
props = {
  name: 'Arto Hellas',
  age: 35,
}
const { name, age } = props
```
* The last line assigns the 'Arto Hellas' to `name` and 35 to `age`.
* This can be sped up by destructuring props in the parameter of a function
  * `const Hello = ({ name, age }) => {`
  * Instead of assigning props object to a variable called props, we can just destructure the object into seperate variables

## Page re-rendering
* Can rerender page with `refresh()` function
* Repeated calls to `ReactDOM.render` is not best practice
* There is better way to do this as follows

## Stateful component
* Until now, all components have not had any state that could change in their lifecycle
* We can add state using React's *state hook*
  `import React, { useState } from 'react'`
* Example of adding state
```js
import React, { useState } from 'react'import ReactDOM from 'react-dom'

const App = () => {
  const [ counter, setCounter ] = useState(0)
  setTimeout(
    () => setCounter(counter + 1),
    1000
  )
  return (
    <div>{counter}</div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)
```
* The components function begins by calling the `useState(0)` function
  * This adds state to component
  * Renders component initialising with value of 0
  * Calling the function returns an array of two items
    * Using destructuring, we assign these values to variables `counter` and `setCounter`
  * `counter` is assigned initial value of 0
  * `setCounter` is assigned to a function that will modify 
* the `setTimeout` function updates the state of `counter` using `setCounter()`
  * this causes component to re-render

## Event handling
* Event handlers are called when specific events occur
* Change example to inplement an event with a  <button>
  * <button> elements support mouse-events, such as 'click'
* React example
```js
const App = () => {
  const [ counter, setCounter ] = useState(0)

  const handleClick = () => {
    console.log('clicked')
  
  }
  return (
    <div>
      <div>{counter}</div>
      <button onClick={handleClick}>
        plus
      </button>
    </div>
  )
}
```
* This sets onClick attribute to reference `handleClick` function

### Event handlers must be functions
* Trying to define event handlers in simpler form as follows would break the site
```js
<button onClick={setCounter(counter + 1)}> 
  plus
</button>
```
  * as it is not a function or a function reference
  * Instead, this is a function call
    * This would generally work, but not in this case
      * As when the site gets rendered first of all, the function call would increment the counter which causes a re-render
        * Then, the re-render runs and this functions gets called, causing a re-render
          * and it goes on...
  * Instead, do it as so:
  ```
    <button onClick={() => setCounter(counter + 1)}> 
      plus
    </button>
  ```
  * This only calls the setCounter function when the user clicks the button and onClick is handled
  * Writing event handlers within JSX template is not good practice

## Passing state to child components
* It is best practice to write React components which are small and reusable across whole app or even projects
* Another best practice is to 'lift the state up' in the component hierarchy
  * According to the docs:
    * 'Often, several components need to reflect the same changing data. We recommend lifting the shared state up to their closest common ancestor.'
    * Meaning, when a component low in the tree changes, this may need to be told to the higher up components to reflect this
* React suggests passing event handers using `handle[Event]` such as `handleClick`

## Changes in state cause rerendering
* **When a called function changes the state, the component gets re-rendered**

## Refactoring components
* Simplify components by destructuring props
* If method component only contains return statement, make it one line with arrow functions




    
