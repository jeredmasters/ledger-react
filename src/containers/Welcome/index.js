import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Welcome extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1>Hello Jered Masters, <i className="fa fa-smile-o" aria-hidden="true" /> <i className="fa fa-hand-peace-o" aria-hidden="true" /></h1>

            <img src="https://graph.facebook.com/v2.9/10155435663387241/picture?type=large" />
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
            <a href="/m/calendar" className="btn btn-primary">Goto Calendar</a>
          </div>
          <div className="col-sm-4 col-lg-3 text-center">
            <a href="/m/bookings?onlyMe=1" className="btn btn-info">See my Bookings</a>
          </div>
          <div className="col-sm-4 col-lg-3 text-center">
            <a href="/m/info" className="btn btn-success">See info about the house</a>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <br />
            <div className="well">
              <strong>Next weekend is available! (21/10/2017)</strong>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  return {
    events: [

    ]
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
