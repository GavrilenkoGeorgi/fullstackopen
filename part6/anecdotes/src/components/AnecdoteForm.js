import React from 'react'
import { connect } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'
import anecService from '../services/anecService'

const AnecdoteForm = (props) => {
  const addAnec = async (event) => {
    event.preventDefault()
    const content = event.target.anec.value
    event.target.anec.value = ''
    const newAnec = await anecService.createNew(content)
    props.createAnec(newAnec)
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
  }
}

const mapDispatchToProps = {
  createAnec
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)
