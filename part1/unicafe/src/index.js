import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({good, neutral, bad}) => {
  if ((good || bad || neutral) > 0) {
    return (
      <table>
          <Statistic text="good" value = {good} />
          <Statistic text="neutral" value = {neutral} />
          <Statistic text="bad" value = {bad} />
          <Statistic text="all" value = {good + neutral + bad} />
          <Statistic text="average" value = {good - bad / 2} />
          <Statistic text="positive" value = {(good * 100) / (good + neutral + bad) + '%'} />
      </table>
    )
  } else {
    return (
      <>
        <span>No feedback given</span>
      </>
    )
  }
}

const Statistic = ({text, value}) => {
    return (
      <tr>
        <td>{text} {value}</td>
      </tr>
    )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h3>give feedback</h3>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h3>statistics</h3>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
