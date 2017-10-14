import React, { Component } from 'react'
import './stylesheets/main.scss'
import '../node_modules/react-big-calendar/lib/css/react-big-calendar.css'

import Alert from 'react-s-alert'

// Containers
import Calendar from './containers/Calendar'
import Navigation from './containers/Navigation'

class App extends Component {
  render () {
    return (
      <div className="App">
        <Alert />
        <Navigation />
        <div className="container">
          <Calendar />
        </div>
      </div>
    )
  }
}

export default App
