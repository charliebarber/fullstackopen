---
title: 4b Testing the backend
created: '2020-06-18T15:57:48.883Z'
modified: '2020-06-19T20:53:06.010Z'
---

# 4b Testing the backend

* Backend doesn't contain complex logic so it is pointless to write unit tests for it
* Could implement tests by mocking the backend
  * mongo-mock library
* Can test entire app through the REST api so database is included
  * Known as integration testing
    * when you test multiple components as a group

## Test environment
* Convention in node is to define execution mode with NODE_ENV environment variable
* Common practice to define seperate modes for development and testing
  * NODE_ENV=test or development
  * runInBand option to stop Jest running tests in parallek
* Can create seperate test database in MongoDB Atlas
  * Not optimal solution in teams as you don't want single database being used be several tests run concurrently
  * Could instead have each test using its own seperate database
    * Run Mongo in memory or by using Docker containers
    * to keep things simple, we will use MongoDB atlas db
* Change apps config so that is NODE_ENV is set to test, make it use the TEST mongodb uri

## Supertest
* Supertest package - helps write tests for API
* Import Express app and wrap in supertest function into a superagent object
* use async/await
* Once all tests finished, close MongoDB connection with afterAll method
* tests store response of request in `response` variable

## Initialising the database before tests
* Tests should not be dependent on the state of the database
  * To make them robust, reset the database and generate needed test data in controlled manner before running any tests
* Use beforeEach function to intialise database before every test
```js
beforeEach(async () => {
  await Note.deleteMany({})

  let noteObject = new Note(initialNotes[0])
  await noteObject.save()

  noteObject = new Note(initialNotes[1])
  await noteObject.save()
})
```

## Running tests one by one
* Jest offers `only` method to test only one test at a time
* When dealing with multiple files
  * run test only in a file
  `npm test -- tests/note_api.test.js`
  * run tests with specific name
  `npm test -- -t 'a specific note is within the returned notes'`

## async/await
* Makes it possible to use *asynchronous functions that return a promise* in a way that makes the code look synchronous
* Previously, we used `then` method to access the result of a promise
  * however, if you wanted to make several asynchronous function calls in sequence, it becomes messy
  * chaining promises keeps it cleaner but can still be better
* Generator function from ES6 improves but still not great
* Async and await introduced in ES7 have same functionality as generators but are better understood and have better syntax
* await makes code execution wait until a promise is fulfilled before carrying on
* await has to be used within an async function

## More tests and refactoring the backend
* When refactoring code, it is likely that existing functionality will break
* Extract re-used test steps into helper functions
  * Store them in tests/test_helper.js

## Error handling and async/await
* If there is an exception when handling the POST request and we never get a response, deal with it using try/catch mechanism
  * catch block calls next function, passing it to error handling middleware

## Eliminating the try-catch
* While async/await cleans the code, having to use try/catch structure is messy
* Solution is express-async-errors library
  * passes to error handling middleware under the hood

## Optimizing the beforeEach function
* Use forEach to initiliaze database
  * each forEach starts its own async operation which beforeEach doesn't wait for, then starting tests
    * one solution is use Promise.all method
      * turns array of promises into a single promise

