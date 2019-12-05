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

export const initializeAnecs = (anecs) => {
  return {
    type: 'INIT_ANECS',
    data: anecs
  }
}

export const voteUp = (id) => {
  return {
    type: 'VOTE_UP',
    data: { id }
  }
}

export const createAnec = (data) => {
  return {
    type: 'NEW_ANEC',
    data
  }
}

export default anecReducer
