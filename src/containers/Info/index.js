import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'

// Redux
import { fetchBookings } from 'store/actions/bookings'

class Info extends React.Component {
  render () {
    return (
      <div>
        <h1>House Info</h1>
        <div className="row quick-links">
          <div className="col-sm-4 col-lg-3 text-center">
            <Link to="/info/cleanup" className="btn btn-primary">Cleaning up</Link>
          </div>
        </div>
      </div>
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  return {
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchBookings
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)
