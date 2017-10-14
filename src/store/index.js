// vendor
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import reduxFormReducer from './reducers/redux-form'

// Get reducers

const reducers = combineReducers({
  form: reduxFormReducer
})

let store = createStore(
  reducers,
  window._reactState,
  applyMiddleware(thunkMiddleware, createLogger()),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
