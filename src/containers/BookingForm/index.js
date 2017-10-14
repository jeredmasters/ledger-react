// Vendor
import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Alert from 'react-s-alert'

// Components
import DateTime from '../../components/Fields/DateTime'

class BookingForm extends React.Component {
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

const ProfileImagesForm = reduxForm({
  form: Forms.PROFILE_IMAGES,
  enableReinitialize: true
})(ProfileImages)

export const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: state.PracticeProfile,
    Practice: state.Practice,
    Account: state.Account,
    PracticeProfile: state.PracticeProfile
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchPracticeProfile,
    savePracticeProfile,
    approvePracticeProfile
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileImagesForm)
