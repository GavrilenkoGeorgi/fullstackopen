const defaultNotification = 'Nothing to see here'

const notificationReducer = (state = defaultNotification, action) => {
  switch (action.type) {
    case 'INFO':
      return `Voting for ${action.data}`
    case 'RESET':
      return action.data
    default:
       return state
  }
}

export const infoMessage = (message) => {
  return {
    type: 'INFO',
    data: message
  }
}

export const resetMessage = (message) => {
  return {
    type: 'RESET',
    data: message
  }
}

export default notificationReducer
