import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import anecReducer, { initializeAnecs } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import anecService from './services/anecService'

const reducer = combineReducers({
  notification: notificationReducer,
  anecdotes: anecReducer,
  filter: filterReducer
})

const store = createStore(reducer)

anecService.getAll().then(anecs =>
  store.dispatch(initializeAnecs(anecs))
)

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
