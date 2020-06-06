---
title: 1b JavaScript
created: '2020-06-06T15:48:50.375Z'
modified: '2020-06-06T20:19:05.056Z'
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

## Object methods and "this"
As we are using a React version with React hooks we do not need to define objects with methods. This is not relevant to the course as a whole but it is good to know

* Arrow functions and functions defined with `function` are different in how they behave with the keyword `this`, which refers to the object itself

```js
const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
  greet: function() {
    console.log('hello, my name is ' + this.name)
  },
  doAddition: function(a, b) {
    console.log(a + b)
  },
}

arto.doAddition(1, 4)        // 5 is printed

const referenceToAddition = arto.doAddition
referenceToAddition(10, 15)   // 25 is printed
```
* We can add functions into an object by creating them as a property
  * known as an object method
* The object itself can referenced using `this` keyword
* We can create a method reference as a variable to a method object
  * However, this causes problems as we are unable to use this keyword
    * value of `this` is based on how the method was called
      * calling through a method reference makes this be part of the global object
        * different to other languages
      * Not knowing what `this` is referencing causes issues
        * In React or Node often
        * The course avoids this using "this-less" JS
      * One way to preserve this is using method `bind`
      * Arrow functions solve some of these problems
        * However, they don't work in objects
        * To understand better, watch [this screen cast](https://egghead.io/courses/understand-javascript-s-this-keyword-in-depth)

## Classes
* Unlike OOP, there is no class mechanism in JS
  * However, JS includes features which simulate object oriented classes
* *Class syntax* introduced in ES6
```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  greet() {
    console.log('hello, my name is ' + this.name)
  }
}

const adam = new Person('Adam Ondra', 35)
adam.greet()

const janja = new Person('Janja Garnbret', 22)
janja.greet()
```
* Here we define a class called Person and two objects from this class
* Similar in syntax to Java classes and objects
  * Similar behaviour also
* Based on JS prototypal inheritance
  * The type of both created objects above is `Object` as JS only defines types Boolean, Null, Undefined, Number, String, Symbol and Object
* Class syntax is controversial
* It is used a lot on "old" React and Node.js
  * Since we are using React hooks, we do not need JS class syntax.  

## Prototypal inheritance
Not included on course, but I have never really understood it so worth noting
* For example, we could have a `user` object with its own properties and methods and then want to make an `admin` object and `guest` object as slightly modified versions
  * We would want to reuse parts of `users` and build a new object from it
    * Prototypal inheritance lets us do that
* JS Objects have a hidden `[[Prototype]]` property which can be null or reference another object
  * The object it references is known as a 'prototype'
  * If there is a property in a object that we want to read but it is missing
    * JS automatically takes it from its prototype object (if there is one)    
