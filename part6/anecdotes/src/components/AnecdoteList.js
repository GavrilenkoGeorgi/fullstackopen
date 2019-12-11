import React from 'react'
import { connect } from 'react-redux'
import { voteUp } from '../reducers/anecdoteReducer'
import { setNotification, resetMessage } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const handleClick = (anecdote) => {
    props.voteUp(anecdote)
    props.setNotification(`You voted for '${anecdote.content}'`, 5)
  }

  return (
    <>
    {props.anecsToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => handleClick(anecdote)}
            >
              vote
            </button>
          </div>
        </div>
      )}
    </>
  )
}

const anecsToShow = ({ anecdotes, filter}) => {
  if (filter === '') {
    // showing all anecs sorted by votes
    return anecdotes.sort((a, b) => a.votes - b.votes).reverse()
  }
  // this doesn't spark joy
  return anecdotes
    .filter(anec => anec.content.toLowerCase().includes(filter))
    .sort((a, b) => a.votes - b.votes)
    .reverse()
}

const mapStateToProps = (state) => {
  return {
    anecsToShow: anecsToShow(state),
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteUp,
  setNotification,
  resetMessage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
