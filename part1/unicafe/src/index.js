import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const FeedbackBtn = ({text, handleClick}) => (
  <button onClick={handleClick}>{text}</button>
)

const Counter = ({text,value}) => (
  <p>{text} {value}</p>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad;
  const average = (good*1) + (bad*-1) / total;
  const positive = (good / total) * 100 + '%';

  return (
    <div>
      <h1>Give feedback to Unicafe</h1>

      <FeedbackBtn text="Good" handleClick={() => setGood(good + 1)}/>
      <FeedbackBtn text="Neutral" handleClick={() => setNeutral(neutral + 1)}/>
      <FeedbackBtn text="Bad" handleClick={() => setBad(bad + 1)}/>

      <h1>Statistics</h1>

      <Counter text="Good" value={good} />
      <Counter text="Neutral" value={neutral} />
      <Counter text="Bad" value={bad} />
      <Counter text="All" value={total} />
      <Counter text="Average" value={average} />
      <Counter text="Positive" value={positive} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)