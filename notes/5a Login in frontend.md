---
title: 5a Login in frontend
created: '2020-06-29T17:47:52.247Z'
modified: '2020-06-29T19:18:46.437Z'
---

# 5a Login in frontend

## Creating new notes
* set token to a private variable which is set using a function on successful login

## Saving the token to the browser's local storage
* When page is rerendered, all information disappears
* Save login details to local storage
  * key-value database stored in the browser
  * easy to use
    * save to DB with setItem
    * fetch with getItem
  * Values saved are DOMstrings
    * have to parsed with `JSON.stringify`
    * parsed back with `JSON.parse`
* Check local storage using an effect hook
  * if they are save to app state
* log out using `removeItem` or `clear`
