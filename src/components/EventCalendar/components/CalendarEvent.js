import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

class CalendarEvent extends React.Component {
  constructor (props) {
    super(props)

    // Bind methods
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    this.props.onClick(this.props.eventData, this.props.day)
    e.stopPropagation()
  }

  render () {
    // Return a placeholder element if there is no event data 
    if (!this.props.eventData) {
      return <div className="event-slot" />
    }

    const showLabel = this.props.eventData.isFirstDay || (this.props.day.weekDay === 0 && this.props.wrapTitle)
    const title = showLabel ? this.props.eventData.title : ''

    const eventClasses = classnames({
      'event-slot': true,
      'event': true,
      'event-first-day': this.props.eventData.isFirstDay,
      'event-last-day': this.props.eventData.isLastDay,
      'event-has-label': showLabel
    }, this.props.eventData.eventClasses)

    return (
      <div className={eventClasses}
        onClick={this.handleClick}
        onMouseOut={(data) => this.props.onMouseOut(this.props.eventData, this.props.day, data)}
        onMouseOver={(data) => this.props.onMouseOver(this.props.eventData, this.props.day, data)}
      >
        <div className="event-title">
          {title}
        </div>
      </div>
    )
  }
}

CalendarEvent.propTypes = {
  day: PropTypes.object.isRequired,
  eventData: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ]),
  onClick: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func,
  wrapTitle: PropTypes.bool
}

CalendarEvent.defaultProps = {
  onClick: () => {},
  onMouseOut: () => {},
  onMouseOver: () => {}
}

export default CalendarEvent
