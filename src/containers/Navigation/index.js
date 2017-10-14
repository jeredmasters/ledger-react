import React from 'react'

class Navigation extends React.Component {
  render () {
    return (
      <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand" href="/m/hello">Jered Masters</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><a href="/m/calendar">Calendar</a></li>
              <li><a href="/m/bookings?onlyMe=1">Bookings</a></li>
              <li><a href="/m/info">Info</a></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Admin <span className="caret" /></a>
                <ul className="dropdown-menu">
                  <li><a href="/a/users">Users</a></li>
                  <li><a href="/a/settings">Settings</a></li>
                  <li><a href="/a/log">System Log</a></li>
                </ul>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="/login/facebook/logout">Logout</a></li>
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="navbarsExampleDefault" />
        </div>
      </nav>
    )
  }
}

export default Navigation
