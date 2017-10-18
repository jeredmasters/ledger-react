import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Swipeable from 'react-swipeable'

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
  prevAllowed () {
    return this.state.month.month() > moment().month() || this.state.month.year() > moment().year()
  }
  onPrev () {
    if (this.prevAllowed()) {
      this.setState({month: this.state.month.add(-1, 'month')})
    }
  }
  onNext () {
    this.setState({month: this.state.month.add(1, 'month')})
  }
  render () {
    return (
      <Swipeable onSwipedLeft={this.onNext} onSwipedRight={this.onPrev}>
        <div className="calendar-title">
          <h3>{this.state.month.format('MMMM YYYY')}</h3>
          <div className="calendar-controls">
            <span className="btn btn-info" onClick={this.onPrev} disabled={!this.prevAllowed()}><i className="fa fa-chevron-left" aria-hidden="true" /> Prev</span>
            <span className="btn btn-info pull-right" onClick={this.onNext}>Next <i className="fa fa-chevron-right" aria-hidden="true" /></span>
          </div>
        </div>
        <CalendarMonth
          month={this.state.month.month()}
          year={this.state.month.year()}
          events={this.props.events}
          onDayClick={this.props.onDayClick}
          onEventClick={this.props.onEventClick}
        />
      </Swipeable>
    )
  }
}

export default EventCalendar
