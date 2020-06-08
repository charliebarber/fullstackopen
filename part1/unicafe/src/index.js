import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const FeedbackBtn = ({text, handleClick}) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistic = ({text,value}) => (
  <tr>
    <td>{text}</td> 
    <td>{value}</td>
  </tr>
)

const Statistics = ({good,neutral,bad}) => {
  const total = good + neutral + bad;
  const average = (good*1) + (bad*-1) / total;
  const positivepercent = (good / total) * 100;

  if (good + neutral + bad > 0) {
    return (
      <table>
        <tbody>
          <Statistic text="Good" value={good} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="Bad" value={bad} />
          <Statistic text="All" value={total} />
          <Statistic text="Average" value={average} />
          <Statistic text="Positive" value={positivepercent} />
        </tbody>
      </table>
    )
  } else {
    return (
      <div>
        No feedback given
      </div>
    )
  }

}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>Give feedback to Unicafe</h1>

      <FeedbackBtn text="Good" handleClick={() => setGood(good + 1)}/>
      <FeedbackBtn text="Neutral" handleClick={() => setNeutral(neutral + 1)}/>
      <FeedbackBtn text="Bad" handleClick={() => setBad(bad + 1)}/>

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)