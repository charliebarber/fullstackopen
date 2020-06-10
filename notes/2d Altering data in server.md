---
title: 2d Altering data in server
created: '2020-06-10T19:05:11.490Z'
modified: '2020-06-10T19:48:51.062Z'
---

# 2d Altering data in server

## REST
* Refer to individual data objects as *resources*
  * each resource gets a unique URL
* Resources are fetched with HTTP GET requests
* Craeting new resources is done with HTTP POST request

## Sending data to the server
* Use axios `post` method to send data to server
* Use axios `put` to change a resource with PUT request

## Extracting communication with the backend into a seperate module
* App component can get bloated if all of the backend communication is in it
  * because of single responsibility principle, it is best to extract it into its own module
* Use a `src/services` directory
* Make seperate modules in this file with axios methods
  * Could just only return `response.data` rather than whole promise response
* Suggested to read more about Promises/async
  * You don't know JS book

## Cleaner syntax for defining object literals
* Instead of
```js
{ 
  getAll: getAll, 
  create: create, 
  update: update 
}
```
* we can write
`{ getAll, create, update }` 
* as the key is the same as the variable
* ES6 feature allows for `const person = { name, age }` as key and variable are same

## Promises and errors
* When a HTTP request fails (eg 404 status code) we want to handle the *rejected* promise
* Common way to do this is using `catch` method
```js
axios
  .get('http://example.com/probably_will_fail')
  .then(response => {
    console.log('success!')
  })
  .catch(error => {
    console.log('fail')
  })
```
* 
