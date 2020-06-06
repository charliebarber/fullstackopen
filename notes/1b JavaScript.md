---
title: 1b JavaScript
created: '2020-06-06T15:48:50.375Z'
modified: '2020-06-06T16:19:04.019Z'
---

# 1b JavaScript

* Official name is ECMASCript
* Latest version is known as ECMAScript 2019
  * Released in June 2019
  * Otherwise known as ES10
* Browsers don't always support the latest features
  * Therefore, code must be transpiled from new JS into older compatible version
* Most popular method of transpiling is using **Babel**
* Node.js is a JS Runtime environment
  * Based on Chrome V8 Javascript engione
  * Works practically anywhere - servers/phones
  * Latest node already understands latest JS so no need for transpiling
  * Run using node by entering `node` in console
* JavaScript is somewhat similar in syntax to Java
  * However, the core mechanics are entirely different

## Variables
* Variables can defined in following ways:
  * Constant
    * `const x = 1`
    * Not a variable
    * A constant where the value cannot be changed
  * Variable
    * `let y = 5`
    * Like a normal variable
* Data assigned to a variable can change during the execution of code
* Traditional way to define variables was using keyword `var`
  * ES6 replaced this with const and let
  * var works different to how variables are defined in many other languages
  * Course advises sticking with const and let

## Arrays
Example
```js
const t = [1, -1, 3]

t.push(5)

console.log(t.length) // 4 is printed
console.log(t[1])     // -1 is printed

t.forEach(value => {
  console.log(value)  // numbers 1, -1, 3, 5 are printed, each to own line
})   
```
* To note - array is defined using const
  * Even thought it gets added to
  * This is because an array is an object
    * The variable still points to the same object
* Can iterate through array using `forEach` function
  * It receives an arrow function as a parameter
    * This function is called on each item of the array
* Example pushes to array using `push`
  * React takes notes from functional programming so push is not used
    * Paradigm of function programming is **immutable data structures**
      * Immutable object - an object whose state cannot be modified after it is created
    * So in React, preferred method is using `concat`
      * This does not add the item to an array, instead it creates a new array which includes the former array contents and the new item
* Example using concat
```js
const t = [1, -1, 3]

const t2 = t.concat(5)

console.log(t)  // [1, -1, 3] is printed
console.log(t2) // [1, -1, 3, 5] is printed
```
* JS has many useful methods to use on array
  * map method
    * `const m1 = t.map(value => value * 2)`
    * Map creates a new array which includes items returned from the function passed in as a parameter
    * Map is used frequently with react
* Destructuring assignment
  * `[ ...]`
  * Makes it easy to assign individual array items to variables
  ```js
  const t = [1, 2, 3, 4, 5]

  const [first, second, ...rest] = t

  console.log(first, second)  // 1, 2 is printed
  console.log(rest)          // [3, 4 ,5] is printed
  ```
    * `first` and `second` variables receive first two array values as their values
    * Remaining values are collected to be put into their own array, `rest`

## Objects
* Objects can be defined in a few different ways
* Object literals
  * Listing properties within braces {}
  * e.g
  ```js
  const object1 = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PhD',
  }
  ```
* Values of properties can be of any type (int, str, arrays, objects)
* Object properties get referenced using:
  * *dot notation*
    `console.log(object1.name)`
  * Using brackets
    `console.log(object1[fieldName])`
  * Can also add properties to objects using these methods
  ```js
  object1.address = 'Helsinki'
  object1['secret number'] = 12341
  ```
  * If a space is involved in the property name
    * **You must use bracket notation** to reference it
* Objects can also have methods
  * This course will only use briefly as not needed
* Another way to define objects is using *constructor functions*

## Functions
* Arrow functions
```js
const sum = (p1, p2) => {
  console.log(p1)
  console.log(p2)
  return p1 + p2
}
```
  * If there is only one parameter, the parantheses are not needed
    * `const square = p => .....`
  * If there is only a single expression, the braces are not needed
    * `const square = p => p*p`
    * Useful when manipulating array with map method
  * Arrow functions are a new addition from ES6
    * Before this functions could only be defined with `function` keyword
* `function` keyword can be referenced in two ways
  * Function declaration
  ```js
  function product(a, b) {
    return a * b
  }
  ```
  * Function expression
  ```js
  const average = function(a, b) {
    return (a + b) / 2
  }
  ```
    * No need to give function a name
    * Definition resides among rest of code
* This course will define all functions with arrow syntax

  
