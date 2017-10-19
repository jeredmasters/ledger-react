import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'

// Redux
import { fetchBookings } from 'store/actions/bookings'

// Components
import Loading from 'components/Loading'
import Back from 'components/Form/Back'

class Bookings extends React.Component {
  static propTypes = {
    // Redux
    Bookings: PropTypes.array,
    fetchBookings: PropTypes.func,
    gotoBooking: PropTypes.func,
    Ready: PropTypes.bool,
    User: PropTypes.object
  }
  constructor (props) {
    super(props)

    this.state = {
      onlyMe: true
    }

    this.handleFilter = this.handleFilter.bind(this)
  }
  componentWillMount () {
    if (this.props.Bookings === null) {
      this.props.fetchBookings()
    }
  }
  handleFilter (event) {
    this.setState({onlyMe: event.target.checked})
  }
  render () {
    if (!this.props.Ready) {
      return (<Loading />)
    }
    const bookings = (
      this.state.onlyMe
        ? this.props.Bookings.filter(b => b.user_id === this.props.User.id)
        : this.props.Bookings
    ).sort((a, b) => (a.start.isAfter(b.start)))

    return (
      <div>
        <Back />
        <div className="row">
          <div className="col-xs-6">
            <h2>Bookings</h2>
          </div>
          <form className="col-xs-6 form-inline">
            <div className="form-group">
              <label>Only show my bookings <input type="checkbox" onChange={this.handleFilter} checked={this.state.onlyMe} /></label>

            </div>
          </form>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Start</th>
              <th>Days</th>
              <th>M</th>
              <th>F</th>
              <th>S</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => {
              return (
                <tr key={booking.id} onClick={() => this.props.gotoBooking(booking.id)}>
                  <td>{booking.name}</td>
                  <td>{booking.start.format('DD MMM')}</td>
                  <td>{booking.end.diff(booking.start, 'days') + 1}</td>
                  <td>
                    {booking.main ? <i className="fa fa-circle c-main" aria-hidden="true" /> : <i>&nbsp;</i>}
                  </td>
                  <td>
                    {booking.flat ? <i className="fa fa-circle c-flat" aria-hidden="true" /> : <i>&nbsp;</i>}
                  </td>
                  <td>
                    {booking.studio ? <i className="fa fa-circle c-studio" aria-hidden="true" /> : <i>&nbsp;</i>}
                  </td>
                </tr>)
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  return {
    Bookings: state.Bookings,
    User: state.User,
    Ready: state.Bookings !== null
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchBookings,
    gotoBooking: id => push('/booking/' + id)
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookings)
