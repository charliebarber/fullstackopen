---
title: '1d A more complex state, debugging React apps'
created: '2020-06-07T12:19:30.012Z'
modified: '2020-06-07T12:50:52.840Z'
---

# 1d A more complex state, debugging React apps

## Complex state
* Previously, we only looked at state where it contained a single integer
* If we have a more complex state, the easiest way to do this is repeating `useState` to create seperate parts of state
* Use *object spread* to deal with complex state
* *React forbids mutating state directly*
  * Can have unexpected side effects
  * Must always be done by setting state to a *new* object
  * If certain properties are unchanged in new state, they can just be copied to the new object
    * This is where object spread syntax is useful
* Sometimes it is not always useful to store state in a complex object
  * Seperate pieces of state can be mroe suitable in seperate apps
  * [reference](https://reactjs.org/docs/hooks-faq.html#should-i-use-one-or-many-state-variables)

## Handling arrays
* Use `concat` and not `push` as arrays for state shouldn't be mutated directly
  * may work, but can cause serious errors

## Conditional rendering
* Can pass props into a component, and then change what the component returns and renders based on an if statement

## Old React
* Older React does not use *state hooks*
  * Before, it was not possible to add state to functional componenets
    * Instead, you had to use class syntax to define state
* This course only uses hooks so you learn what is relevant in the future
  * Useful to understand class components for maintaining old code

## Debugging React Applications
* Keep dev console open at all time
* Keep both code and web page open at all times
* If you get an error, fix **immediately** instead of writing more code
* Use print based debugging
  * Add `console.log` to see what your variables are doing
  * If involving objects make sure to use `,` to concatenate strings and objects rather than `+` operator
* Can pause code at any point by writing `debugger` anywhere in code
* Add *React developer tools* extension to your browser
  * It adds React tab to dev tools
  * Allows you to inspect React elements
    * Their state and props
    * Hooks - but doesn't work well

## Rules of Hooks
* `useState` function must not be called from inside of a loop, a conditional expression or any place that is not a function defining a component
  * This is because hooks must be called in the same order every time

## Event Handling Revisited
* Event handlers must always be a function or a reference to a function

## Function that returns a function
```js
const App = (props) => {
  const [value, setValue] = useState(10)

  const hello = () => {    
    const handler = () => console.log('hello world')
    return handler
  }
  return (
    <div>
      {value}
      <button onClick={hello()}>button</button>
    </div>
  )
```
* This is possible even though the onClick has a function call
  * The function call actually returns handler, which is a referncing the arrow function
* Can be used for functions that can be customised with parameters

## Passing Event Handlers to Child Components
* Event handlers can be passed into a component as a prop 

## Do not define components within components
* **Never define components inside of other components**
  * It appears to work
  * However it provides no benefits and leads to unpleasant problems

## Suggested readings
* Read through official React docs
* Egghead.io

