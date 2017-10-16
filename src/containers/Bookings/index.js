import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

// Redux
import { fetchBookings } from 'store/actions/bookings'

class Bookings extends React.Component {
  static propTypes = {
    // Redux
    Bookings: PropTypes.array,
    fetchBookings: PropTypes.func
  }
  componentWillMount () {
    if (this.props.Bookings === null) {
      this.props.fetchBookings()
    }
  }
  render () {
    return (
      <div>
        <table>
          <tbody>
            {this.props.Bookings.map((booking) => (
              <tr>
                <td>{booking.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  return {
    Bookings: state.Bookings
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchBookings
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookings)
