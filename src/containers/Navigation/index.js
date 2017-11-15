import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

class Navigation extends React.Component {
  static propTypes = {
    LoggedIn: PropTypes.bool,
    User: PropTypes.any
  }
  constructor (props) {
    super(props)

    this.state = {
      open: false
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleLink = this.handleLink.bind(this)
  }
  handleClick () {
    this.setState({open: !this.state.open})
  }
  handleLink () {
    this.setState({open: false})
  }
  renderAdminLinks () {
    return (
      <li className="dropdown">
        <Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Admin <span className="caret" /></Link>
        <ul className="dropdown-menu">
          <li><Link to="/users"  onClick={this.handleLink}>Users</Link></li>
          <li><Link to="/settings" onClick={this.handleLink}>Settings</Link></li>
          <li><Link to="/log" onClick={this.handleLink}>System Log</Link></li>
        </ul>
      </li>
    )
  }
  renderLinks () {
    return (
      <div id="navbar" className="navbar-collapse collapse in" style={{transition: '0.5s ease height', height: (this.state.open ? '220px' : '1px')}}>
        <ul className="nav navbar-nav">
          <li><Link to="/calendar" onClick={this.handleLink}>Calendar</Link></li>
          <li><Link to="/bookings" onClick={this.handleLink}>Bookings</Link></li>
          <li><Link to="/info" onClick={this.handleLink}>Info</Link></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </div>
    )
  }
  renderTitle () {
    return (
      this.props.LoggedIn
        ? (<span><i className="fa fa-user" aria-hidden="true" /> {this.props.User.name}</span>)
        : <span>The Ledger</span>
    )
  }
  render () {
    return (
      <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" onClick={this.handleClick}>
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link className="navbar-brand" to="/hello">{this.renderTitle()}</Link>
          </div>
          {this.props.LoggedIn
            ? this.renderLinks()
            : null}
        </div>
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
