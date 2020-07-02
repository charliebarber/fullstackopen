---
title: 4c User administration
created: '2020-06-21T14:41:02.149Z'
modified: '2020-06-22T10:06:11.119Z'
---

# 4c User administration

* We want to add user authentication and authorisation to the app
  * Users should be store in the DB and every note should be linked to user
* If working with relational database, the user and the ntoes would have seperate DB tables and we would link them using the ID of the user as a foreign key
* With document databases, it works differently
  * have a *notes collection* and a *users* collection
  * Can reference using object id
  * Mongo traditionally doesn't support join queries like in relational databases to aggregate data of multiple tables
    * however, Mongo introduced *lookup aggregation queries*
      * we won't be covering this
    * In order to get a similar functionality by making multiple queries
      * Depending on situation, Mongoose can take care of joining and aggregating data, appearing like a join query
        * even so, Mongoose is making multiple queries in background

## References across collections
* In relational database, a note would contain *reference key* to user who created it
* In document database, we can have a user field that refences a user from user collection
  * they do not demand foreign key to be stored in notes resources
    * it could be stored in users collection or both
* can store entire ntoes array as one of the documents in user collection
  * it would not generate IDs for them
* Schema-less databases like Mongo require devs to make more radical design decisions about data from the start
* Relational databases offer a pretty suitable way of data organisation for most users

## Mongoose schema for users
```js
{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Note'
}
```
* Type of field is ObjectID and it references note-style documents
  * Mongo does not know this field references notes, it is just syntax from Mongoose
* References are now stored in both documents
  * The note references the user who created
  * User has an array of references to all the notes created by them

## Creating users
* Use bcrypt package for generating password hashes
* Make a seperate user router for dealing with new users
  * Create new users using HTTP POST request to users path
* Password does not get sent to database in plain text
  * Instead, we store the hash of the password generated by bcrypt
* Set up automated tests to see if user got added succesfully
* Check that username is unique using uniqueValidator plugin

## Populate
* We want API to work so when a GET request is sent to /api/users route it also returns the contents of the users notes rather than just the ID
  * In relational database, this is done with join query
    * they are transactional - state of database does not change in time that query is made
* With Mongoose join queries, it cannot guarantee that the state between collections being joined is consistent - so if we make a query that joins the two collections, their state may change during the query
* Mongoose joins with the `populate` method
  * Can select which fields are wanted
* Database does not actually know the IDs stored in user field of notes reference documents from the user collection
  * Populate method functionality comes from the fact we defined "types" to references in the Mongoose schema using `ref`
    * ref is referring to a model name on the same connection

