const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_ANEC':
      return [...state, action.data]
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

export const voteUp = (id) => {
  return {
    type: 'VOTE_UP',
    data: { id }
  }
}

export const createAnec = (content) => {
  return {
    type: 'NEW_ANEC',
    data: {
      content,
      votes: 0,
      id: getId()
    }
  }
}

export default anecReducer
