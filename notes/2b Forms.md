---
title: 2b Forms
created: '2020-06-08T20:28:32.136Z'
modified: '2020-06-08T20:44:57.001Z'
---

# 2b Forms

Example form
```js
const App = (props) => {
  const [notes, setNotes] = useState(props.notes)

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
  }
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
          <input />
          <button type="submit">save</button>
      </form>
    </div>
  )
}
```
* Must add `event.preventDefault()` to prevent page from reloading
* (event) parameter is the event that triggers the call to the addNote event handler function
* `event.target` contains the <form>
  * How do you extract the data from the forms input
    * Controlled components
### Controlled components
* Track the input box using `onChange`, constantly adding the value in it to the state
  * Then add it to permanent state once the button is clicked
    * by concatting it to list

## Filtering Displayed Elements
* Use conditional operator
* Use filter method to only display events which match criteria

