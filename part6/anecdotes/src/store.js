import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import anecReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  anecdotes: anecReducer,
  filter: filterReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
