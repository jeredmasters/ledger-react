import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import PropTypes from 'prop-types'

// Redux
import { fetchBookings } from 'store/actions/bookings'

class Info extends React.Component {
  render () {
    return (
      <div>
        <h1>Under Construction</h1>
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
