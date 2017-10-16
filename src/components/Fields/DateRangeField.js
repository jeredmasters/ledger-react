
import React from 'react'
import PropTypes from 'prop-types'
import DateRange from 'components/DateRange'

class DateRangeField extends React.Component {
  static propTypes = {
    specialDays: PropTypes.any
  }
  handleSelect (date) {
  }
  calendars () {
    const c = window.innerWidth / 300
    if (c < 1) {
      return 1
    }
    if (c > 3) {
      return 3
    }
    return parseInt(c)
  }

  render () {
    const {input} = this.props
    const {value, ...inputField} = input

    return (
      <div className="date-range">
        <DateRange
          {...inputField}
          startDate={value.startDate}
          endDate={value.endDate}
          onChange={(val) => input.onChange(val)}
          linkedCalendars
          calendars={this.calendars()}
          specialDays={this.props.specialDays}
          firstDayOfWeek={1}
        />
        { value !== ''
          ? <label>{value.startDate.format('D/MMM')} - {value.endDate.format('D/MMM')}:  {value.endDate.diff(value.startDate, 'days') + 1} days</label>
          : null}
      </div>
    )
  }
}

DateRangeField.propTypes = {
  input: PropTypes.object.isRequired
}
export default DateRangeField
