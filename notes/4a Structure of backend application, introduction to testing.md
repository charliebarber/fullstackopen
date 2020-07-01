---
title: '4a Structure of backend application, introduction to testing'
created: '2020-06-18T13:13:21.406Z'
modified: '2020-06-18T14:49:00.781Z'
---

# 4a Structure of backend application, introduction to testing

## Project structure
* Directory structure according to Node.js best practices
```
├── index.js
├── app.js
├── build
│   ├── ...
├── controllers
│   └── notes.js
├── models
│   └── note.js
├── package-lock.json
├── package.json
├── utils
│   ├── config.js
│   ├── logger.js
│   └── middleware.js  
```
* Put all console printing into logger.js
  ```js
  const info = (...params) => {
    console.log(...params)
  }

  const error = (...params) => {
    console.error(...params)
  }

  module.exports = {
    info, error
  }
  ```
  * Seperate into functions
    * info for printing normal log
    * error for errors
  * Useful to write logs to a file or send to an external logging service
* Put handling of environment variables into seperate config.js file
* Put route handlers (controllers) into a controllers directory
  * Keep all route relate to a module in a file
  * Create a router object
    * Use as middleware for the app
* Put custom middleware into a utils/middleware.js file


## Testing Node applications
* JS has many different testing libraries
  * jest
    * developed and used by Facebook
    * works well with testing backends and testing React apps
  * Mocha
  * ava
* Install jest as dev dependency

### Jest
* In package.json, specify the execution environment
```js
{
 //...
 "jest": {
   "testEnvironment": "node"
 }
}
```
* Create a directory called tests and create test files with name.test.js
* Import function to be tested
* Test cases are defined by test function which accepts two parameters
  * 1st - test description as a string
  * 2nd - function which describes functionality of the test case
* Group test cases into logical collections using describe blocks


