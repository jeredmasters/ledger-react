import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import './style.scss'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

class Calendar extends React.Component {
  static propTypes = {
    events: PropTypes.array
  }
  render () {
    return (
      <div>
        <BigCalendar
          events={this.props.events}
          startAccessor="startDate"
          endAccessor="endDate"
        />
      </div>
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  return {
    events: [

    ]
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
