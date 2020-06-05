---
title: Fundamentals of Web apps
created: '2020-06-05T16:56:32.802Z'
modified: '2020-06-05T18:54:23.384Z'
---

# Fundamentals of Web apps

**First rule of web development** - always keep dev tools opens. On network tab, check *Disable cache* option and *Preserve log*

## HTTP Get
* Browsers and servers communicate using HTTP protocol.
  * Network tab demonstrates how this happens

### Network tab example
* Request URL: where the HTTP request was made to
* Request Method: for example, GET
* Status code: for example, 200 meaning OK and successful.
* Response headers
  * Content-Type
    * In utf-8 format, so browser knows response was a HTML page and to render it as so

* In HTML response there was an <img> tag, so browser has to do a HTTP request again to get the image
  * Makes request for image
  * Content-type is image/png
    * so browser knows how to render it

## Traditional web applications

* Example website works as traditional web application
  * Browser fetches HTML doc from server
    * This can be a static text file saved on servers
    * The server could instead form the HTML page dynamically based on the code of the app
      * e.g. from a database

#### Dynamic HTML code example
```js
const getFrontPageHtml = (noteCount) => {
  return(`
    <!DOCTYPE html>
    <html>
      <head>
      </head>
      <body>
        <div class='container'>
          <h1>Full stack example app</h1>
          <p>number of notes created ${noteCount}</p>
          <a href='/notes'>notes</a>
          <img src='kuva.png' width='200' />
        </div>
      </body>
    </html>
`)
} 

app.get('/', (req, res) => {
  const page = getFrontPageHtml(notes.length)
  res.send(page)
})
```
* HTML page has been saved as template string
* Dynamic part is noteCount, whuich is replaced by app.get function using notes.length
* Writing HTML within code in this way is bad practice
  * Normal for traditional PHP programmers

* In traditional web apps the browser is 'dumb'.
  * Browser only fetches HTML from server and nothing else
  * All application/programming logic is performed on a server

## Running application logic in browser
* Example website makes request for .json file with all notes and then forms a <ul> from the contents

## Event handlers and Callback functions
* Only on the last line is the server request sent, but the code to perform it is found earlier on
```xhttp.onreadystatechange = function () {```
* This line is an **event handler** for the event known as *onreadystatechange* for the *xhttp* object.
```
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    // code that takes care of the server response
  }
}
```
* The function checks if the HTTP request status code is 200 and that the ready state is equal to 4 before continuing with the program

* Invoking event handlers
  * Used very often in JS
  * Called **callback functions**
  * The code does not invoke the function
    * Instead, the browser invokes the function only when the event has occured

## DOM - Document Object Model
* HTML pages can be thought of as tree like structures
  * Browsers function based on this idea 
* The DOM is an API (Application programming interface)
  * it enables these element trees to be modified by code

## Manipulating the document-object from console
* Topmost node of DOM is the *document* object
* The note will disappear when page is reloaded
  * This is because the changes were not pushed to the server
  * On refresh, the JS code fetches the list again from the server JSON file

## Loading a page containing JavaScript
1. Using a HTTP GET request, the browser fetches HTML code from the server and defines the content and structure of the page
2. Link tags cause the browser to fetch the CSS stylesheet
3. Script tags cause the browser to fetch the JS files
4. The browser executes the Javascript code.
  * If there are any requests in the code, the browser makes another HTTP GET request
5. When this data gets fetched, an event handler is executed by the browser to render the page using DOM-API

## Forms and HTTP POST
* Submitting the form creates a HTTP POST request called new_note
  * Server responds with HTTP status code 302
    * URL redirect - server causes browser to do another HTTP GET to address specified in header Location
* Form has two attributes:
  * method - "POST" - causes a HTTP POST request
  * action - "/new_note" - where to make this POST request
* This POST request is handled on server
  * In the request, data gets sent as the body
  * Server accesses this with *req.body* to act on it

## AJAX
* AJAX (Asynchronous Javascript and XML)
  * introduced in 2005
  * described a new approach of fetching content with JS in HTML by removing the need to rerender the page
  * Before this, web pages functioned like *traditional web application* mentioned earlier
* Nowadays we would not submit requests and access .json files from URL
  * Not considered acceptable/best practice
    * Do not follow RESTful API conventions

## Single page app
* SPA-style websites do not fetch web pages from the server seperately
  * Instead, one HTML page gets fetched
    * Then, the contents of this page get manipulated by JS 
* Data gets sent to server as a JSON request
  * This time with status code *201 created*
  * It does not refresh page
    * instead, it adds note to list and then sends update to server

## Javascript libraries
* Sample app is only *vanilla JS*
  * It uses only DOM-API and JS to manipluate
* Instead, there are libraries which make manipulating the DOM easier
  * eg. jQuery
    * was developed when web apps still followed traditional style of server generating HTML
    * successful because of cross-browser compatibility
    * not used much anymore as vanilla JS has advanced a lot
  * Single page apps brought newer libraries for this method
    * BackboneJS
    * AngularJS by Google
      * lost popularity after they dropped supported for 1st version
    * React
      * most popular tool currently
      * combined with Redux frequently
    * VueJS
      * newcomer

## Full stack web development
* All web apps have >two layers
  * browser - end-user
  * server
  * database
* Frontend (browser)
* Backend (server)

* Full stack web development means focusing on all parts: frontend, backend and database

* Course will be use Node.js runtime environment as *backend*
  * using same programmign language throughout "gives web dev a whole new dimension"
  * not a requirement to do this

* Often, devs will specialize in one layer on the stack
 * Full stack trend has made it common for devs to be proficient in all

## Javascript fatigue
* Full stack web dev is challenging
  * Things are happening simultaneously
  * Debugging is more difficult than regular desktop apps
  * JS does not always do what you want
  * Asynchronous way that runtime environments work causes challenges
  * Requires knowledge of HTTP protocol
  * Have to handle databases, server admin and config
  * Good to know CSS to make it pretty
* JS world develops fast
  * Tools, libraries and language constantly evolve
* As people grow tired of this, they coined term: **Javascript fatigue**


