import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

class Welcome extends React.Component {
  static propTypes = {
    User: PropTypes.object
  }
  pictureUrl () {
    return `https://graph.facebook.com/v2.9/${this.props.User.oauth_id}/picture?type=large`
  }
  fullName () {
    return this.props.User.name
  }
  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1>Hello {this.fullName()}, <i className="fa fa-smile-o" aria-hidden="true" /> <i className="fa fa-hand-peace-o" aria-hidden="true" /></h1>

            <img src={this.pictureUrl()} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <br />
            <br />
            <h2>Get Started</h2>
          </div>
        </div>
        <div className="row quick-links">
          <div className="col-sm-4 col-lg-3 text-center">
            <Link to="/calendar" className="btn btn-primary">Goto Calendar <i className="fa fa-calendar" aria-hidden="true" /></Link>
          </div>
          <div className="col-sm-4 col-lg-3 text-center">
            <Link to="/bookings" className="btn btn-info">See my Bookings <i className="fa fa-list" aria-hidden="true" /></Link>
          </div>
          <div className="col-sm-4 col-lg-3 text-center">
            <Link to="/info" className="btn btn-success">See info about the house <i className="fa fa-info-circle" aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <br />
            <div className="well">
              <strong />
            </div>
          </div>
        </div>

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
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
