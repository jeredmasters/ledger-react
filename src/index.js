
// Vendor
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'

// Redux
import store from './store'

// Containers
import App from './App'

// Styles
import './index.css'

document.addEventListener('DOMContentLoaded', function () {
  const root = document.getElementById('root')

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    root)
})

registerServiceWorker()
