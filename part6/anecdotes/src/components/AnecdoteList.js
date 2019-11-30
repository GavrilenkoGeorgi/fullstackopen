import React from 'react'
import { voteUp } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
  const store = props.store
  const anecdotes = store.getState()
  anecdotes.sort((a, b) => a.votes - b.votes).reverse()

  return (
    <>
    {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => store.dispatch(voteUp(anecdote.id))}
            >
              vote
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList