---
title: 1a Introduction to React
created: '2020-06-06T14:27:45.346Z'
modified: '2020-06-06T15:00:35.624Z'
---

# 1a Introduction to React

## Component
Example code of defining a component
```js
const App = () => (
  <div>
    <p>Hello world</p>
  </div>
)
```
* Function assigned to constant variable named App
  * Using arrow functions from ES6
  * Function defining component may include any sort of JS code
  * Possible to render dynamic content inside component

## JSX
* Instead, React uses **JSX** to write components
  * Looks like HTML markup
  * JSX gets turned into JavaScript behind the scenes
### Compiled JSX behind the scenes
```js
import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p', null, 'Hello world, it is ', now.toString()
    ),
    React.createElement(
      'p', null, a, ' plus ', b, ' is ', a + b
    )
  )
}

ReactDOM.render(
  React.createElement(App, null),
  document.getElementById('root')
)
```
* Compiling handled by **Babel**
* React can be written in pure JavaScript without JSX
  * waste of time
* JSX is similar to HTML except dynamic content can easily be embedded by writing JS within {} curly braces
  * Similar to templating languages
* JSX is XML-like
  * Meaning every tag needs to be closed
    * Cannot write <br> like in html
    * Instead: <br />

## Multiple components
* Components can be reused several times
* Core philosophy of React is to compose apps from lots of specialised reusable components
* Another strong convention is using an App *root component* at top of component tree

## props: passing data to components
* We can pass data into components using *props*
* Example
```js
const Hello = (props) => {  return (
    <div>
      <p>Hello {props.name}</p>    </div>
  )
}
```
* Function now has a parameter caled props
  * When an argument is passed in, the parameter receives an object
    * This object has fields which correspond to all props that the user defines with the component
* Props are defined liek so
```js
const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="George" />      <Hello name="Daisy" />    </div>
  )
}
```
* Can be arbitrary number of props
* Prop values can be "hard coded strings"
  * eg. <Hello name="Maya" />
* Or results of JS expressions
  * must be wrapped within curly braces
  * eg. <Hello name={name} age={26 + 10} />

## Useful notes
* React is configured to give obvious error messages
* Make small changes
* Keep console open
* If you get an error, do not write more code, try and fix it
* **React component names must be capitalised**#
* React components must contain one root element
  * Cannot be several
  * So wrap in a <div>
  * Or even use an array of components
  * Divs can make code look ugly
    * So can use fragments
      * Wrap in empty elements like <> </>
