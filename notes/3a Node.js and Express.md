---
title: 3a Node.js and Express
created: '2020-06-11T21:42:07.038Z'
modified: '2020-06-12T11:08:26.428Z'
---

# 3a Node.js and Express

## Simple web server
* Node doesn't support ES6 module imports, instead it does it this way:
`const http = require('http')`
* This is importing Nodes web server module using CommonJS modules
* Primary purpose of backend server (in the course) is to offer raw data in JSON format to front end
  * Can be done by passing object with `JSON.stringify` method to turn it into a JSON string

## Express
* Node's http web server is not practical in large scale apps
* Instead, libraries offer better interfaces for server side dev
* Most popular library is **express**

### Notes on dependencise
* NPM versioning is *semantic versioning*
  * This means that a dependency version is updated depending how you write it
    * 4.17.1
      * 4 is the Major release
        * If this doesn't change - then newer versions should be backwards compatible
      * 17 is minor release
      * 1 is the patch release

## Web and express
* Create an express application and store in app variable
`const app = express()`
* Define two routes to application
  * First one is an event handler to handle HTTP GET requests made to / path
  ```js
  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  ```
    * event handler accepts two parameters
      * request parameter
        * contains all information of the HTTP request
      * response parameter
        * define how to respond to the request
  * Second is an event handler to handle hTTP GET requests made to notes path of app
  ```js
  app.get('/api/notes', (request, response) => {
    response.json(notes)
  })
  ```
    * This responds to the request using the json method of response object to send an array
* No need to transform data into JSON format, express does this automatically
  * note that JSON is a string and not a JS object, even though it may look like one

## nodemon
* Unlike when developing in React, we have to restart the app to see our changes
  * This can be solved with nodemon
* *nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application.*

## REST
* Representational State Transfer (REST)
  * Introduced in 2000 in Roy Fielding's dissertation
  * Architectural style for building scalable web apps
* Singular things are called *resources*
  * They each get an associated unique URL
  * Convention is to combine the name of resouce type with resource's unique identifier
    * `www.example.com/api/notes/10`

## Fetching a single resource
* Can define parameters for routes in express by using colon syntax
```js
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  response.json(note)
})
```
  * Now, this method will handle all requests to /api/notes/SOMETHING
  * The id parameter that was passed in with a colon on the route can be accessed with the request object

## Deleting resourcse
* Deletion is done with a HTTP DELETE request to url of resource
  * respond to request with status code 204 and return no data on the response
  `response.status(204).end()`

## Postman
* It is easy to make and test using HTTP GET requests in the browser
  * we could write some js code to test the delete function, but writing test code is not always the best solution
* Instead, tools exists for making testing of backend easier
  * One is *curl* a command line program
  * Postman

## Visual Studio Code REST client
* VS Code has a REST client plugin to use instead of postman
* Make a directory in root of app called *requests*
  * All REST client requests are put in this directory with .rest extension

## Receiving data
* To access data easily, use express json-parser `app.use(express.json())

