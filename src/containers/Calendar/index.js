import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import './style.scss'

// Redux
import { fetchBookings, startBooking, openBooking } from 'store/actions/bookings'

// Components
import EventCalendar from 'components/EventCalendar'

class Calendar extends React.Component {
  static propTypes = {
    // Redux
    Bookings: PropTypes.array,
    fetchBookings: PropTypes.func,
    startBooking: PropTypes.func,
    openBooking: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.handleDayClick = this.handleDayClick.bind(this)
    this.handleEventClick = this.handleEventClick.bind(this)
  }
  componentWillMount () {
    if (this.props.Bookings === null) {
      this.props.fetchBookings()
    }
  }
  handleDayClick (day) {
    this.props.startBooking(day)
  }
  handleEventClick (booking) {
    this.props.openBooking(booking.id)
  }
  render () {
    return (
      <div>
        <EventCalendar
          events={this.props.Bookings}
          onDayClick={this.handleDayClick}
          onEventClick={this.handleEventClick}
        />
      </div>
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  let bookings = []
  for (const b of state.Bookings) {
    if (b.main) {
      bookings.push({ id: b.id, start: b.from, end: b.to, title: b.name + ' - Main', eventClasses: {'bg-main': true} })
    }
    if (b.flat) {
      bookings.push({ id: b.id, start: b.from, end: b.to, title: b.name + ' - Flat', eventClasses: {'bg-flat': true} })
    }
    if (b.studio) {
      bookings.push({ id: b.id, start: b.from, end: b.to, title: b.name + ' - Studio', eventClasses: {'bg-studio': true} })
    }
  }
  return {
    Bookings: bookings
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchBookings,
    startBooking,
    openBooking
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
