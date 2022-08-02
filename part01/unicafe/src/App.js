import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Display = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.state}</td>
  </tr>
)

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
        <Display text="good" state={props.good} />
        <Display text="neutral" state={props.neutral} />
        <Display text="bad" state={props.bad} />
        <Display text="all" state={props.all} />
        <Display text="average" state={(props.good-props.bad)/props.all}/>
        <Display text="positive" state={props.good/props.all*100 + "%"}/>
      </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)


  return (
    <div>
      <h1>give feedback</h1>
      <table>
        <tr>
          <td><Button handleClick={handleGoodClick} text="good" /></td>
          <td><Button handleClick={handleNeutralClick} text="neutral" /></td>
          <td><Button handleClick={handleBadClick} text="bad" /></td>
        </tr>
      </table>

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={good+neutral+bad}/>
    </div>
  )
}

export default App