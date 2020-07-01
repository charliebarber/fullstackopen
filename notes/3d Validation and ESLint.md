---
title: 3d Validation and ESLint
created: '2020-06-17T15:56:18.927Z'
modified: '2020-06-17T18:13:39.422Z'
---

# 3d Validation and ESLint

* Mongoose has a built in validation functionality
  * can define specific validation rules for each field of a schema
    * built-in validators example
      * type: String
      * minlength: 5
      * required: true
  * Promise will throw ValidationError if not met
  
## Promise chaining
* Promises can be chained by adding on more `then`
* This allows for making returned values JSON using `toJSON` appear cleaner

## Deploying the database backend to production
* .env (dotenv) will only be used when backend is not in production mode
* database URL in production should be set using `heroku cofnig:set` command

## Lint
* Lint is any tool that detects and flags errors in programming languages, including stylistic errors
* For JS, the leading static analysis tool is ESlint
  * Answer questions on your environment and code style 
* Companies will define standards that are enforced through a ESlint config file
* Airbnb Javascript style guide is adopted by many projects
