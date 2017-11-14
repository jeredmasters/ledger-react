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
import Cleanup from './containers/Info/Cleanup'
import WishList from './containers/Info/WishList'

// Components
import Loading from 'components/Loading'

// Styles
import './stylesheets/main.scss'

// Redux
import { checkLoginHost } from 'store/actions/auth'

class App extends Component {
  static propTypes = {
    User: PropTypes.any,

    // Redux
    checkLoginHost: PropTypes.func,
    Ready: PropTypes.bool
  }
  constructor (props) {
    super(props)

    this.authenticated = this.authenticated.bind(this)
  }
  componentWillMount () {
    this.props.checkLoginHost()
  }
  authenticated () {
    return this.props.User !== false
  }

  renderRoute (path, render) {
    return (
      <Route exact path={path} render={({match}) => render(match.params)} />
    )
  }

  render () {
    if (!this.props.Ready) {
      return (<Loading />)
    }
    const redirect = (<Redirect to={{pathname: '/'}} />)
    return (
      <div className="App">
        <Alert />
        <ConnectedRouter history={history}>
          <div>
            <Navigation />
            <div className="container">
              <Route exact path="/" render={props => (!this.authenticated() ? <Login /> : (<Redirect to={{pathname: '/hello'}} />))} />
              {this.renderRoute('/hello', params => (this.authenticated() ? <Welcome /> : redirect))}
              {this.renderRoute('/calendar', params => (this.authenticated() ? <Calendar /> : redirect))}
              {this.renderRoute('/bookings', params => (this.authenticated() ? <Bookings /> : redirect))}
              {this.renderRoute('/booking/:id', params => (this.authenticated() ? <BookingForm /> : redirect))}
              {this.renderRoute('/info', params => (this.authenticated() ? <Info /> : redirect))}
              {this.renderRoute('/info/cleanup', params => (this.authenticated() ? <Cleanup /> : redirect))}
              {this.renderRoute('/info/wishlist', params => (this.authenticated() ? <WishList /> : redirect))}

            </div>
          </div>
        </ConnectedRouter>
      </div>
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  return {
    User: state.User,
    Ready: state.User !== null
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    checkLoginHost
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
