import React, { Component } from 'react'
import Alert from 'react-s-alert'
import { Route, Redirect } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { history } from './store'
import PropTypes from 'prop-types'

// Containers
import Navigation from './containers/Navigation'
import Welcome from './containers/Welcome'
import Calendar from './containers/Calendar'
import Bookings from './containers/Bookings'
import BookingForm from './containers/BookingForm'
import Login from './containers/Login'
import Info from './containers/Info'

// Styles
import './stylesheets/main.scss'

// Redux
import { checkLogin } from 'store/actions/auth'

class App extends Component {
  static propTypes = {
    User: PropTypes.any,

    // Redux
    checkLogin: PropTypes.func
  }
  constructor (props) {
    super(props)

    this.authenticated = this.authenticated.bind(this)
  }
  componentWillMount () {
    this.props.checkLogin()
  }
  authenticated () {
    return this.props.User !== null
  }

  render () {
    return (
      <div className="App">
        <Alert />
        <ConnectedRouter history={history}>
          <div>
            <Navigation />
            <div className="container">
              <Route exact path="/" render={props => (!this.authenticated() ? (<Login />) : (<Redirect to={{pathname: '/hello'}} />))} />
              <Route path="/hello" render={props => (this.authenticated() ? (<Welcome />) : (<Redirect to={{pathname: '/'}} />))} />
              <Route path="/calendar" render={props => (this.authenticated() ? (<Calendar />) : (<Redirect to={{pathname: '/'}} />))} />
              <Route path="/bookings" render={props => (this.authenticated() ? (<Bookings />) : (<Redirect to={{pathname: '/'}} />))} />
              <Route path="/booking/:id" render={({match}) => (this.authenticated() ? (<BookingForm id={match.params.id} />) : (<Redirect to={{pathname: '/'}} />))} />
              <Route path="/info" render={props => (this.authenticated() ? (<Info />) : (<Redirect to={{pathname: '/'}} />))} />
            </div>
          </div>
        </ConnectedRouter>
      </div>
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  return {
    User: state.User
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    checkLogin
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
