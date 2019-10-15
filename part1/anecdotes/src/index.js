import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Anecdote = ({index, votes}) => {
  return (
    <p>
      {anecdotes[index]} <br />
      has {votes} votes
    </p>
  )
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, vote] = useState(new Array(anecdotes.length+1).join('0').split('').map(parseFloat))

  const handleVote = (selected) => {
    const currentVotes = [ ...points ]
    currentVotes[selected] += 1
    vote(currentVotes)
  }

  const maxVotes = (points) => {
    return Math.max(...points)
  }

  return (
    <>
      <h3>Anecdote of the day</h3>
      <div>
        {props.anecdotes[selected]}
      </div>
      <div>
        has {points[selected]} votes
      </div>
      <Button handleClick={() => setSelected(getRandomInt(anecdotes.length))}
        text="next anecdote" />
      <Button handleClick={() => handleVote(selected)}
        text="vote" />
      <h3>Anecdote with most votes</h3>
      <Anecdote index={points.indexOf(maxVotes(points))} votes={maxVotes(points)} />
    </>
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
