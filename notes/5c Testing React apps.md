---
title: 5c Testing React apps
created: '2020-07-14T09:26:34.439Z'
modified: '2020-07-14T09:47:18.119Z'
---

# 5c Testing React apps

* To render components for testing purposes use: react-test-library

## Rendering the component for tests
* Write tests in same directory as component
* Render using render method provided by react-testing-library
  * this renders components in format suitable for tests without rendering to DOM
  * returns an object with several properties:
    * container
      * contains all of the HTML rendered by the component

## Running tests
* create-react-app configures tests to be run in watch mode by default
  * so npm test will not exit once tests have finished
  * to change run command
  `CI=true npm test`

## Test file location
* Two different conventions for test files location in React
  * In same directory as component being tested
  * In their own sepreate directory
* default is in same directory by create-react-app

## Searching for content in a component
* *toHaveTextContent*
  * search for matching text from entire HTML code
* *getByText*
  * returns element that contains given text
* *querySelector*
  * search for specific element by CSS selector as parameter

## Debugging tests
* debug method prints HTML rendered by component to console
* prettyDOM search for smaller part of component and print that HTML code

## Clicking buttons in tests
* Test buttons by calling event handlers
* Event handler is mock function defined with jest
  `const mockHandler = jest.fn()`
* Find button based on text with `getByText`
* Click with `fireEvent` method
* Expectation of test vverifies that mock functiong ets called exactly once

## Test coverage
* find out coverage of tests with command:
`CI=true npm test -- --coverage`


