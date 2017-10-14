// Vendor
import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Components
import DateTime from '../../components/Fields/DateTime'

class Booking extends React.Component {
  render () {
    return (
      <form>
        <Field
          name="startDate"
          label="Event Start Date/Time"
          component={DateTime} />
      </form>
    )
  }
}

const BookingForm = reduxForm({
  form: 'BookingForm',
  enableReinitialize: true
})(Booking)

export const mapStateToProps = (state, ownProps) => {
  return {
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingForm)
