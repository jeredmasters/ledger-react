import React, { Component } from 'react'
import './App.css'
import '../node_modules/react-big-calendar/lib/css/react-big-calendar.css'
import Main from './containers/Main'

class App extends Component {
  render () {
    return (
      <div className="App">
        <Main />
      </div>
    )
  }
}

export default App
