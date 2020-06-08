import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const VoteDisplay = ({votes}) => <p>has {votes} votes</p>;

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0,0,0,0,0,0])

  const chooseRandomAnecdote = () => {
    const randomInt = Math.floor(Math.random() * 6);
    setSelected(randomInt);
  }

  const vote = (selected) => {
    const voteCopy = [...votes]
    voteCopy[selected] += 1
    setVotes(voteCopy)

  }

  const findMostVotedAnecdote = (array) => {
    console.log('called')
    let largestVal = 0;
    let arrayIndex = 0;

    for (let i=0; i<array.length; i++) {
      if (array[i] > largestVal) {
        largestVal = array[i]
        arrayIndex = i;
      }
    }
    return arrayIndex;
  }

  const mostVotedAnecdote = props.anecdotes[findMostVotedAnecdote(votes)];
  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <VoteDisplay votes={votes[selected]} />
      <Button text="Next anecdote" handleClick={() => chooseRandomAnecdote()} />
      <Button text="Vote" handleClick={() => vote(selected)} />

      <h1>Anecdote with most votes</h1>
      {mostVotedAnecdote}
      <VoteDisplay votes={votes[findMostVotedAnecdote(votes)]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)