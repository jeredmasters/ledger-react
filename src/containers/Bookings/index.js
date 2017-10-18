import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import { push } from 'react-router-redux'

// Redux
import { fetchBookings } from 'store/actions/bookings'

// Components
import Loading from 'components/Loading'

class Bookings extends React.Component {
  static propTypes = {
    // Redux
    Bookings: PropTypes.array,
    fetchBookings: PropTypes.func,
    gotoBooking: PropTypes.func,
    Ready: PropTypes.bool
  }
  componentWillMount () {
    if (this.props.Bookings === null) {
      this.props.fetchBookings()
    }
  }
  render () {
    if (!this.props.Ready) {
      return (<Loading />)
    }
    return (
      <div>
        <h2>Bookings</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Start</th>
              <th>Days</th>
              <th>M</th>
              <th>F</th>
              <th>S</th>
            </tr>
          </thead>
          <tbody>
            {this.props.Bookings.map((booking) => {
              return (
                <tr key={booking.id} onClick={() => this.props.gotoBooking(booking.id)}>
                  <td>{booking.name}</td>
                  <td>{booking.start.format('DD MMM')}</td>
                  <td>{booking.end.diff(booking.start, 'days') + 1}</td>
                  <td>
                    {booking.main ? <i className="fa fa-circle c-main" aria-hidden="true" /> : <i>&nbsp;</i>}
                  </td>
                  <td>
                    {booking.flat ? <i className="fa fa-circle c-flat" aria-hidden="true" /> : <i>&nbsp;</i>}
                  </td>
                  <td>
                    {booking.studio ? <i className="fa fa-circle c-studio" aria-hidden="true" /> : <i>&nbsp;</i>}
                  </td>
                </tr>)
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  const today = moment()
  return {
    Bookings: state.Bookings.filter(b => b.end.isAfter(today)).sort((a, b) => (a.start.isAfter(b.start))),
    Ready: state.Bookings !== null
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchBookings,
    gotoBooking: id => push('/booking/' + id)
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookings)
