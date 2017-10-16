// Vendor
import React, { Component} from 'react'
import FacebookProvider, { Login } from 'react-facebook'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

// Components
import Button from 'components/Form/Button'

// Store
import { pushLogin } from 'store/actions/auth'

class LoginForm extends Component {
  static propTypes = {
    pushLogin: PropTypes.func
  }
  handleResponse = (data) => {
    this.props.pushLogin(data.profile)
  }

  handleError = (error) => {
    this.setState({ error })
  }

  render () {
    return (
      <FacebookProvider appId="1466337873389098">
        <Login
          scope="email"
          onResponse={this.handleResponse}
          onError={this.handleError}
        >
          <Button>Login via Facebook</Button>
        </Login>
      </FacebookProvider>
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  return {
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    pushLogin
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
