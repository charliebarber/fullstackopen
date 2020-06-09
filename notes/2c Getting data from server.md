---
title: 2c Getting data from server
created: '2020-06-09T13:06:47.118Z'
modified: '2020-06-09T14:11:14.533Z'
---

# 2c Getting data from server

## JSON server
* Useful tool which allows you to host a .json file on a web server
* In real world, data would be in database
  * Json-server is useful in dev phase

## The browser as a runtime environment
* Javascript engines follow the asynchronous model
  * Requires all IO-operations to be executed as non-blocking
    * Meaning code execution continues immediately after calling an IO function without waiting for it to return
* After an asynchronous operation is completed, the JS engine calls the event handlers registered to this operation
* JS engines are *single-threaded*
  * They cannot execute code in parallel
  * This means that you must use a non-blocking model for executing IO operations
    * If not, the browser would "freeze" while waiting for data to be fetched
  * Another consequence is that if code execution takes up a lot of time, the browser gets stuck for the duration of executing this code
    * For browser to remain responsive (continuously react to user) the code logic must not be that a single computation takes too long

## Axios and promises
* Promises
  * 'A Promise is an object representing the eventual completion or failure of an asynchronous operation'
  * Can have 3 distinct states:
    1. The promise is pending
      * Meaning that the final value (one of the following two) is not yet available
    2. The promise is fulfilled
      * Meaning that the operation has compeleted and the final value is available, which generally is a successful operation. 
      * Also called resolved
    3. The promise is rejected
      * Meaning that an error prevented the final value from being determing, which generally represents a failed operation
* To access the result of the operation represented by a promise, an event handler must be registered to the promise
  * This is done using the `then` method
  ```js
    const promise = axios.get('http://localhost:3001/notes')

    promise.then(response => {
      console.log(response)
    })
  ```
  * We provide then with callback function with `response` object as a parameter
    * `response` objects contains all essential data of a HTTP GET request
      * such as data, status code and headers
    
## Effect-hooks
* Effect Hooks let you perform side effects in function components
  * Such as:
    * Data fetching
    * Setting a subscription
    * Manually changing the DOM in React components
* This makes effect hooks the best tool for fetching data from a server
* `useEffect` is the method for effect hooks
  * it takes two parameters
    * The function, aka the *effect* which runs after a render
    * Then, optionally, how often the effect is run
    

