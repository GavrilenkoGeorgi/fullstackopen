import React from 'react'
import { connect } from 'react-redux'
import { voteUp } from '../reducers/anecdoteReducer'
import { infoMessage, resetMessage } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const handleClick = (id, content) => {
    props.voteUp(id)
    props.infoMessage(content)
    setTimeout(() => {
      props.resetMessage(null)
    }, 3000)
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
  infoMessage,
  resetMessage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
