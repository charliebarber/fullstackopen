---
title: 3c Saving data to MongoDB
created: '2020-06-16T19:39:16.045Z'
modified: '2020-06-17T14:40:00.486Z'
---

# 3c Saving data to MongoDB

## Debugging Node apps
### VS Code
* Built in debugger
### Dev tools
* Start app with `node --inspect index.js`
  * allows you to press node logo to see debugging view
### Question everything
* Figure out where the problem occurs
  * be systematic
  * problem could exist anywhere - so question everything

## MongoDB
* MongoDB is a document database
  * Also known under NoSQL ubmrella term
  * Differ from relational in organisation and query language
* Can be installed locally
* There are MongoDB providers online
  * MongoDB Atlas
* Create user for database access
* Connect to Node JS app 
  * Use MongoDB URI
* use Mongoose library instead of official MongoDB library
  * Offers higher level API
* Include password in args 

## Schema and models
* Schema
  * Tells Mongoose how objects should be in stored in a database
* Model
  * Class which constructs documents
* Mongoose convention
  * Singular Model names get automatically made into lower case plural for a collection
    * Note: model, notes: collection
* Document databases are schemaless
  * The database doesn't care about the structure of the data stored in database
  * Possible to store documents with different fields in same collection
* Instead, Mongoose gives a schema at the level of the application 

## Creating and saving objects
* Models are constructor functions
  * they create new JS objects based on provided parameters
  * this means they include the models properties
    * so they have methods for saving the object to database
* Saving is done with the `.save()` method
  * then an event handler can be provided with `then`
  * close database connection with `mongoose.connection.close()`

## Fetching objects from the database
* `find` method of a model
  * parameter is object expressing search conditions
    * using {} empty object means searching all

## Backend connected to a database
* Add mongoose definitions to backend
* Search mongoose DB with the event handler
* Modify toJSON method of schema so that it doesn't return __v and make _id a string called id
  ```js
  noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    }
  })
  ```

## Database configuration into its own module
* Create new directory for the module called models
* Export with `module.exports`
  * Set value to the model
* Don't hardcore MongoDB URI into the code
  * Instead add it as an environment variable
    * Good way to do this is dotenv library
      * Make sure to import it before anything else so the environment variable is available globally before other modules get imported

## Using database in route handlers
* Create objects for backend using mongoose models constructor functions
  * Only send response to POST request if saving to MongoDB succeeded using `then`

## Verifying frontend and backend integration
* First, test backend with Postman or REST client
* Once everything works, test that frontend works with backend
  * Implement one functionality at a time

## Error handling
* If ID is not in database, the promise will throw an error
  * Two types of error
    * ID is wrong kind - doesn't match mongo indentifier format
      * This returns 404
    * ID is correct format
      * Null object returned
      * should be 400 error (bad request)
  * Need to distinguish between the 2

## Moving error handling into middleware
* External error tracking system
  * Sentry
* Pass error forward with next function
* Express error handler middleware
  * Defined with function that accepts four parameters
  `const errorHandler = (error, request, response, next) => {`
  * app.use

## The order of middleware loading
* Correct order is following:
```js
app.use(express.static('build'))
app.use(express.json())
app.use(logger)

app.post('/api/notes', (request, response) => {
  const body = request.body
  // ...
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  // ...
}

// handler of requests with result to errors
app.use(errorHandler)
```
* Unknown endpoint handler must be after all HTTP request handlers
* Error handler always last

## Other operations
* Easiest way to remove documents is `findByIdAndRemove` method
* Update documents with `findByIdAndUpdate` method
  * takes js object as parameter
