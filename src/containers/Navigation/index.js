import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

class Navigation extends React.Component {
  static propTypes = {
    LoggedIn: PropTypes.bool,
    User: PropTypes.object
  }
  renderLinks () {
    return (<div className="container">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <Link className="navbar-brand" to="/hello">{this.props.User.name}</Link>
      </div>
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav">
          <li><Link to="/calendar">Calendar</Link></li>
          <li><Link to="/bookings">Bookings</Link></li>
          <li><Link to="/info">Info</Link></li>
          <li className="dropdown">
            <Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Admin <span className="caret" /></Link>
            <ul className="dropdown-menu">
              <li><Link to="/users">Users</Link></li>
              <li><Link to="/settings">Settings</Link></li>
              <li><Link to="/log">System Log</Link></li>
            </ul>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/login/facebook/logout">Logout</Link></li>
        </ul>
      </div>
      <div className="collapse navbar-collapse" id="navbarsExampleDefault" />
    </div>)
  }
  renderEmpty () {
    return (
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <Link className="navbar-brand" to="/hello">The Ledger</Link>
        </div>
      </div>
    )
  }
  render () {
    return (
      <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
        {this.props.LoggedIn
          ? this.renderLinks()
          : this.renderEmpty()}
      </nav>
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  return {
    LoggedIn: state.User !== null,
    User: state.User
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
