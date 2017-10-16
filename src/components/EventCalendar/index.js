import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

// Components
import CalendarMonth from './CalendarMonth'

class EventCalendar extends React.Component {
  static propTypes = {
    events: PropTypes.array,
    onDayClick: PropTypes.func,
    onEventClick: PropTypes.func
  }
  constructor (props) {
    super(props)

    this.onPrev = this.onPrev.bind(this)
    this.onNext = this.onNext.bind(this)

    this.state = {
      month: moment()
    }
  }
  onPrev () {
    this.setState({month: this.state.month.add(-1, 'month')})
  }
  onNext () {
    this.setState({month: this.state.month.add(1, 'month')})
  }
  render () {
    return (
      <div>
        <div className="calendar-title">
          <h3>{this.state.month.format('MMMM YYYY')}</h3>
          <div className="calendar-controls">
            <span className="btn btn-info" onClick={this.onPrev}>Prev</span>
            <span className="btn btn-info pull-right" onClick={this.onNext}>Next</span>
          </div>
        </div>
        <CalendarMonth
          month={this.state.month.month()}
          year={this.state.month.year()}
          events={this.props.events}
          onDayClick={this.props.onDayClick}
          onEventClick={this.props.onEventClick}
        />
      </div>
    )
  }
}

export default EventCalendar
