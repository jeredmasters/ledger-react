import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import CalendarDay from './components/CalendarDay'
import CalendarEvent from './components/CalendarEvent'
import CalendarTitle from './components/CalendarTitle'

class EventCalendar extends React.Component {
  constructor (props) {
    super(props)

    this._eventTargets = {}

    this.state = {
      today: moment()
    }

    this.componentWillReceiveProps(props)
    // Bind methods
    this.getCalendarDays = this.getCalendarDays.bind(this)
    this.getDaysWithEvents = this.getDaysWithEvents.bind(this)
    this.getEventMeta = this.getEventMeta.bind(this)
    this.getToday = this.getToday.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    var firstDay = new Date(nextProps.year, nextProps.month, 1)
    var lastDay = new Date(nextProps.year, nextProps.month + 1, 0)
    this.monthStart = moment(firstDay)
    this.monthEnd = moment(lastDay)
  }

  getToday () {
    var today = new Date()
    return {
      day: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear()
    }
  }

  startPad () {
    return this.monthStart.isoWeekday() - 1
  }

  endPad () {
    return 7 - this.monthEnd.isoWeekday()
  }

  getCalendarDays () {
    const count =  this.monthEnd.diff(this.monthStart, 'days') + 1
    const startPad = this.startPad()
    const endPad = this.endPad()
    let days = []

    for (let i = -startPad; i < count + endPad; i++) {
      days.push({
        moment: this.monthStart.clone().add(i, 'days'),
        siblingMonth: i < 0 || i > count,
        eventSlots: Array(this.props.maxEventSlots).fill(false)
      })
    }
    return days
  }

  getEventMeta (days, eventStart, eventEnd) {
    const eventStartInView = eventStart.isBetween(this.monthStart, this.monthEnd)
    const eventEndInView = eventEnd.isBetween(this.monthStart, this.monthEnd)

    const eventMeta = {
      // Asserts Event is visible in this month view
      isVisibleInView: false,
      visibleEventLength: days.length,
      // Returns the index (interval from first visible day) of [...days] of event's first "visible" day
      firstVisibleDayIndex: eventStartInView ? eventStart.diff(this.monthStart, 'days') + this.startPad() : 0
    }

    // Asserts Event is visible in this month view
    if (eventStartInView || eventEndInView) {
      // Asserts event's first or last day is visible in this month view
      eventMeta.isVisibleInView = true
    } else if (eventStart.month() < this.props.month && eventEnd.month() > this.props.month) {
      // Asserts at least part of month is
      eventMeta.isVisibleInView = true
    }

    // Determine the visible length of the event during the month
    if (eventStartInView && eventEndInView) {
      eventMeta.visibleEventLength = eventEnd.diff(eventStart, 'days') + 1
    } else if (!eventStartInView && eventEndInView) {
      eventMeta.visibleEventLength = eventEnd.diff(this.monthStart, 'days')
    } else if (eventStartInView && !eventEndInView) {
      eventMeta.visibleEventLength = this.monthEnd.diff(eventStart, 'days')
    }

    return eventMeta
  }

  getDaysWithEvents () {
    // Get all the days in this months calendar view
    // Sibling Months included
    const days = this.getCalendarDays()

    // Iterate over each of the supplied events
    this.props.events.forEach((eventItem) => {
      const eventStart = moment(eventItem.start)
      const eventEnd = moment(eventItem.end)
      const eventMeta = this.getEventMeta(days, eventStart, eventEnd)

      if (eventMeta.isVisibleInView) {
        const eventLength = eventMeta.visibleEventLength
        const eventSlotIndex = days[eventMeta.firstVisibleDayIndex].eventSlots.indexOf(false)
        let dayIndex = 0

        // For each day in the event
        while (dayIndex < eventLength) {
          // Clone the event object so we acn add day specfic data
          const eventData = Object.assign({}, eventItem)

          if (dayIndex === 0) {
            // Flag first day of event
            eventData.isFirstDay = true
          }

          if (dayIndex === eventLength - 1) {
            // Flag last day of event
            eventData.isLastDay = true
          }

          if (!eventData.isFirstDay || !eventData.isLastDay) {
            // Flag between day of event
            eventData.isBetweenDay = true
          }

          // Apply Event Data to the correct slot for that day
          days[eventMeta.firstVisibleDayIndex + dayIndex].eventSlots[eventSlotIndex] = eventData

          // Move to next day of event
          dayIndex++
        }
      }
    })

    return days
  }

  getCalendarDayObject (date) {
    const dateObj = moment(date)
    return {
      year: dateObj.year(),
      // Subtract 1 from month to allow for human declared months
      month: dateObj.month(),
      day: dateObj.day()
    }
  }

  getLastIndexOfEvent (slots) {
    const lastIndexOfEvent = slots.map((slot, index) => {
      return slot !== false ? index : false
    }).filter((element) => {
      return element
    }).pop()

    return lastIndexOfEvent < 3 || lastIndexOfEvent === undefined ? 2 : lastIndexOfEvent
  }

  getSerializedDay (day) {
    return day.moment.format('YYYYMMDD')
  }

  renderDaysOfTheWeek () {
    return this.props.daysOfTheWeek.map((title, index) => {
      return (
        <CalendarTitle
          key={'title_' + index}
          title={title}
        />
      )
    })
  }

  renderEvents (day) {
    // Trim excess slots
    const eventSlots = day.eventSlots.slice(0, this.getLastIndexOfEvent(day.eventSlots) + 1)

    return eventSlots.map((eventData, index) => {
      return (
        <CalendarEvent
          key={'event_' + index + this.getSerializedDay(day)}
          day={day.moment}
          eventData={eventData}
          onClick={this.props.onEventClick}
          onMouseOut={this.props.onEventMouseOut}
          onMouseOver={this.props.onEventMouseOver}
          wrapTitle={this.props.wrapTitle}
        />
      )
    })
  }

  renderCalendarDays () {
    return this.getDaysWithEvents().map((day, index) => {
      const isToday = day.moment.isSame(moment())
      const events = this.renderEvents(day)

      return (
        <CalendarDay
          key={'day_' + this.getSerializedDay(day)}
          day={day}
          events={events}
          isToday={isToday}
          onClick={this.props.onDayClick}
        />
      )
    })
  }

  render () {
    return (
      <div className="flexContainer">
        {this.renderDaysOfTheWeek()}
        {this.renderCalendarDays()}
      </div>
    )
  }
}

EventCalendar.propTypes = {
  daysOfTheWeek: PropTypes.array,
  events: PropTypes.array,
  maxEventSlots: PropTypes.number,
  month: PropTypes.number.isRequired,
  onEventClick: PropTypes.func,
  onEventMouseOut: PropTypes.func,
  onEventMouseOver: PropTypes.func,
  onDayClick: PropTypes.func,
  wrapTitle: PropTypes.bool,
  year: PropTypes.number.isRequired

}

EventCalendar.defaultProps = {
  daysOfTheWeek: [
    'Mon',
    'Tue',
    'Wed',
    'Thur',
    'Fri',
    'Sat',
    'Sun'
  ],
  events: [],
  wrapTitle: true,
  maxEventSlots: 10
}

export default EventCalendar
