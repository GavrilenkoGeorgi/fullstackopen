import React from 'react'
import { createAnec } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const store = props.store
  const addAnec = (event) => {
    event.preventDefault()
    const content = event.target.anec.value
    event.target.anec.value = ''
    store.dispatch(createAnec(content))
  }

  return (
    <>
    <h2>create new</h2>
      <form onSubmit={addAnec}>
        <div>
          <input name="anec" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
