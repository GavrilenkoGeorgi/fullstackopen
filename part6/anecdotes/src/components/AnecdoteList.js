import React from 'react'
import { voteUp } from '../reducers/anecdoteReducer'
import { infoMessage, resetMessage } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const store = props.store
  // filtered anecdotes or all of them if no filter is set
  let anecdotes = store.getState()
    .anecdotes.filter(anec => anec.content.toLowerCase().includes(store.getState().filter))
  // sorted by likes
  anecdotes.sort((a, b) => a.votes - b.votes).reverse()

  const handleClick = (id, content) => {
    store.dispatch(voteUp(id))
    store.dispatch(infoMessage(content))
    setTimeout(() => {
      store.dispatch(resetMessage(null))
    }, 3000)
  }

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
              onClick={() => handleClick(anecdote.id, anecdote.content)}
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