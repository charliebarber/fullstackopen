---
title: 5b props.children and prototypes
created: '2020-07-01T09:17:04.658Z'
modified: '2020-07-02T08:45:39.101Z'
---

# 5b props.children and prototypes

## The components children aka props.children

* props.children
  * references the child components of th eocmponent
    * defined between opening and closing tags of a component
  * automatically added by React

## State of the forms
* react docs says
  * *Often, several components need to reflect the same changing data. We recommend lifting the shared state up to their closest common ancestor.*

## References to components with ref
* ref mechanism which offers a reference to the component
* useRef hook
  * ensures the same reference is kept throughout re-renders of the component
* create the component inside of a forwardRef function call
  * allows the component to access the ref that is assigned to it
* useImperativeHandle hook makes a function available outside of the component
* It works but looks unpleasant

## PropTypes
* Expected and required props of a component can be defined with prop-types package

