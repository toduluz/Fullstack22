import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  
  const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const getMaxVote = (arr) => {
    const temp = arr.indexOf(Math.max(...arr))
    if (temp < 0) {
      return getRandomInt(0, anecdotes.length-1)
    }
    return temp
  }
  const [selected, setSelected] = useState(getRandomInt(0, anecdotes.length-1))
  const initArr = Array(anecdotes.length).fill(0)
  const [points, setPoints] = useState(initArr)
  const [maxVote, setMaxVote] = useState(getMaxVote(points))

  const handleSelectedClick = () => {
    setSelected(getRandomInt(0, anecdotes.length-1))
  }

  const handleVoteClick = ({selected, points, maxVote}) => {
    const copy =[...points]
    copy[selected] += 1
    setPoints(copy)
    setMaxVote(getMaxVote(copy))
  }

  console.log(getMaxVote(points))

  return (
    <div>
    <h1>Anecdote of the day</h1>
    <p>{anecdotes[selected]}</p>
    <p>has {points[selected]} votes</p>
    <Button handleClick={() => handleVoteClick({selected, points, maxVote})} text="vote"/><Button handleClick={handleSelectedClick} text="next anecdote"/>

    <h1>Anecdote with most votes</h1>
    <p>{anecdotes[maxVote]}</p>
    <p>has {points[maxVote]} votes</p>
    </div>
  )
}

export default App