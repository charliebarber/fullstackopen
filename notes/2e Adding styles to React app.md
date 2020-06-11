---
title: 2e Adding styles to React app
created: '2020-06-11T14:50:01.228Z'
modified: '2020-06-11T14:59:44.819Z'
---

# 2e Adding styles to React app

* Instead of using `class` we have to use `className` attribute with react

## Inline styles
* Very similar to CSS, CSS below
```
{
  color: green;
  font-style: italic;
  font-size: 16px;
}
```
* React inline style
```
 {
  color: 'green',
  fontStyle: 'italic',
  fontSize: 16
}
```
* Uses '' because it is a JS object
* CSS properties are written in camelCase

* React philosphy is contrary to traditional way of styling
  * Before, we would want to keep seperate CSS, HTML and JS files
    * This doesn't scale well in larger apps
  * React components handle the HTML, JS function and the styling of the componennt all in one
