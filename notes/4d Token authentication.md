---
title: 4d Token authentication
created: '2020-06-22T10:06:24.022Z'
modified: '2020-06-28T12:50:54.576Z'
---

# 4d Token authentication

* We want suers to be able to login to the app, and once logged in all their user information must be automatically attached to any new notes created by them
* This requires implementing token based authentication

Principles
* User logins in using login form with React
* React code sneds username and password to /api/login with a HTTP POST request
* If username and password are correct, the server generates a token which identifies the logged in user
  * Token is sign digitally, cant be falsified
* Backend responds with a status code indicating a successful operation, returns token with response
* Browser saves the token
  * eg to the state of a React app
* When the user creates a new note, the React code sends the token to the server with the request
* Server uses the token to identify the user

* Use jsonwebtoken library 
  * allows us to generate JSON web tokens

Code for login functionality
```js
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
```
* Firstly, it searches the database for the username from the request
* Then, it checks the password from the request using bcrypt.compare
* If the user isn't found or password is incorrect, respond with 401 unauthorized code
* If correct, token is created with jwt.sign
  * Token contains username and the user id in a digitally signed form
    * gets digitally signed using a string from environment var SECRET
      * ensures only parties who know the secret can generate a token which is set in the .env file
* Respond to successful request with 200 OK

## Limiting creating new notes to logged in users
* Only allow creating new notes if the POST request has a valid token attached
* Several ways to send token from browser to server
  * We will use Authorization header
    * Also tells which authentication schema is used
      * necessary if server offers several authentication methods
    * Bearer schema is suitable to our needs
* make a helper function getTokenFrom to isolate token from Authorization header
* Check validity of token with jwt.verify
  * this decodes it and returns the user and id
  * return 401 if there is no token

## Error handling
* JsonWebTokenError because of
  * faulty
  * falsified
  * expired
* Add token error into error handling middleware
* If app has multiple interfaces which require identification, JWT validation should be in its own seperate middleware
  * can use libraries like express-jwt
