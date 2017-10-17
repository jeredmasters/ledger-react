// Vendor
import React from 'react'
import { Link } from 'react-router-dom'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import moment from 'moment'

// Components
import DateRangeField from '../../components/Fields/DateRangeField'
import Checkbox from 'components/Fields/Checkbox'

// Redux
import { saveBooking, deleteBooking } from 'store/actions/bookings'

class Booking extends React.Component {
  static propTypes = {
    conflicts: PropTypes.array,

    // Redux
    bookedDays: PropTypes.array,
    id: PropTypes.any,
    saveBooking: PropTypes.func,
    handleSubmit: PropTypes.func,
    deleteBooking: PropTypes.func
  }
  constructor (props) {
    super(props)

    this.handleSave = this.handleSave.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  handleSave (e) {
    e.preventDefault()
    this.props.handleSubmit(this.props.saveBooking)()
  }
  handleDelete () {
    this.props.deleteBooking(this.props.id)
  }
  handleBack () {
    window.history.back()
  }
  render () {
    return (
      <form onSubmit={this.handleSave}>
        <div className="row">
          <div className="col-sm-12">
            <a href="#" onClick={this.handleBack}><i className="fa fa-chevron-left" aria-hidden="true" /> Back</a>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <label>Name</label>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <div className="form-group">
              <Field
                name="name"
                className="form-control"
                component="input" />
            </div>
          </div>
          <div className="col-sm-3">
            <div className="form-group">
              <Field name="type" component="select" className="form-control">
                <option value="1">Tentative</option>
                <option value="2">Locked In</option>
              </Field>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Dates</label>
          <span>The calendar below only shows conflicts for the areas you've selected; main/flat/studio</span>
          <Field
            name="dates"
            component={DateRangeField}
            specialDays={this.props.bookedDays} />
          {this.props.conflicts.length > 0
            ? <label className="conflict-label">booking conflict</label>
            : null}
        </div>
        <div className="row">
          <div className="col-xs-12">
            <label>Areas</label>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <Field
              name="main"
              label="Main"
              className="bg-main"
              component={Checkbox} />
          </div>
          <div className="col-sm-3">
            <Field
              name="flat"
              label="Flat"
              className="bg-flat"
              component={Checkbox} />
          </div>
          <div className="col-sm-3">
            <Field
              name="studio"
              label="Studio"
              className="bg-studio"
              component={Checkbox} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 text-right">
            <Link to="/calendar" className="btn btn-default">Cancel</Link>
            {this.props.id !== 'new' ? <span className="btn btn-danger" onClick={this.handleDelete}>Delete</span> : null}
            <input className="btn btn-primary" type="submit" value="Save" disabled={this.props.conflicts.length > 0} />
          </div>
        </div>
      </form>
    )
  }
}

const BookingForm = reduxForm({
  form: 'BookingForm'
})(Booking)

export const mapStateToProps = (state, ownProps) => {
  const selector = formValueSelector('BookingForm')
  const booking = {
    id: selector(state, 'id'),
    main: selector(state, 'main'),
    flat: selector(state, 'flat'),
    studio: selector(state, 'studio'),
    start: selector(state, 'dates.startDate'),
    end: selector(state, 'dates.endDate')
  }

  const conflictableBookings = state.Bookings.filter(b => b.id !== booking.id && ((b.main && booking.main) || (b.studio && booking.studio) || (b.flat && booking.flat)))
  let bookedDays = []
  let conflicts = []
  for (const b of conflictableBookings) {
    bookedDays = bookedDays.concat(b.days)
    if (booking.start !== null && (booking.start.isBetween(b.start, b.end) || booking.end.isBetween(b.start, b.end))) {
      conflicts.push(b)
    }
  }

  let initialValues = null
  if (ownProps.id === 'new') {
    initialValues = {
      id: 'new',
      name: state.User.name,
      type: 2,
      dates: null,
      main: true,
      flat: true,
      studio: true
    }
  } else {
    const booking = state.Bookings.find(b => b.id === parseInt(ownProps.id))
    initialValues = booking
    initialValues.dates =  {
      startDate: moment(booking.from),
      endDate: moment(booking.to)
    }
  }

  return {
    initialValues,
    bookedDays,
    conflicts
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    saveBooking,
    deleteBooking
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingForm)
