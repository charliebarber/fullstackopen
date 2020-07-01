---
title: 3b Deploying app to internet
created: '2020-06-12T17:37:56.312Z'
modified: '2020-06-16T19:39:14.914Z'
---

# 3b Deploying app to internet

## Same origin policy and CORS
* *Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources (e.g. fonts) on a web page to be requested from another domain outside the domain from which the first resource was served. A web page may freely embed cross-origin images, stylesheets, scripts, iframes, and videos. Certain "cross-domain" requests, notably Ajax requests, are forbidden by default by the same-origin security policy.*
* JS code of an app can only communicate with a server of same origin as it is in a browser
  * Universal principle of web apps
  * Our server is port 3001 and frontend is 3000 so they do not have same origin
* Use `cors` middleware from Node to allow requests from other origins

## Application to internet
* Using heroku
* Add a file called Procfile to project root to tell Heroku how to start app 
  * `web: node index.js`
  * change port to environment variable as heroku configures it
  * add .gitignore with following: `node_modules`

## Frontend production build
* When deploying a React app you need to create a production build instead of development mode
* In create-react-app this is done with `npm-run-build`
  * creates directory called build 
  * js code gets minified and put in one file

## Serving static files from the backend
* One way of deploying frontend is to copy this production build to root of backend directory
  * then configure the backend to show the frontends main apge
  * Express then needs to be made to show static cotnent
    * use middleware called static
      * this checks if build directory has matching address to a HTTP GET request

## Streamling deploying of the frontend
* Add scripts to package.json to make life easier
```js
{
  "scripts": {
    //...
    "build:ui": "rm -rf build && cd ../../osa2/materiaali/notes-new && npm run build --prod && cp -r build ../../../osa3/notes-backend/",
    "deploy": "git push heroku master",
    "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && npm run deploy",    
    "logs:prod": "heroku logs --tail"
  }
}
```

## Proxy
* in create-react-app, you can add proxy declaration to package.json

* Very complicated to deploy the frontend
