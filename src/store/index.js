// vendor
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'

// get reducers
import { profileReducer, bookingsReducer, bookingStartReducer, infoReducer } from './reducers'
import reduxFormReducer from './reducers/redux-form'

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

const reducers = combineReducers({
  User: profileReducer,
  Bookings: bookingsReducer,
  BookingStart: bookingStartReducer,
  Info: infoReducer,
  router: routerReducer,
  form: reduxFormReducer
})

let store = createStore(
  reducers,
  {User: null},
  applyMiddleware(thunkMiddleware, middleware, createLogger()),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
