import anecService from '../services/anecService'

const anecReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANEC':
      return [...state, action.data]
    case 'INIT_ANECS':
      return action.data
    case 'VOTE_UP':
      const id = action.data.id
      const anecToChange = state.find(a => a.id === id)
      const currentVotes = anecToChange.votes
      const changedAnec = {
        ...anecToChange,
        votes: currentVotes + 1
      }
      return state.map(anec => anec.id !== id ? anec : changedAnec)
    default:
       return state
  }
}

export const initializeAnecs = () => {
  return async dispatch => {
    const anecs = await anecService.getAll()
    dispatch ({
      type: 'INIT_ANECS',
      data: anecs
    })
  }
}

export const voteUp = content => {
  return async dispatch => {
    const updatedAnec = await anecService.voteUp(content)
    dispatch({
      type: 'VOTE_UP',
      data: updatedAnec
    })
  }
}

export const createAnec = content => {
  return async dispatch => {
    const newAnec = await anecService.createNew(content)
    dispatch({
      type: 'NEW_ANEC',
      data: newAnec
    })
  }
}

export default anecReducer
