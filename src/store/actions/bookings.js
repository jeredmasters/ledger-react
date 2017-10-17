import * as Types from 'store/types'
import api from 'src/api'
import { push } from 'react-router-redux'
import moment from 'moment'
export const requestBookings = () => ({type: Types.REQUEST_BOOKINGS})
export const receiveBookings = (bookings) => ({type: Types.RECEIVE_BOOKINGS, payload: bookings})

export const fetchBookings = () => {
  return (dispatch) => {
    dispatch(requestBookings())
    api.get('b/bookings').then((responseBody) => {
      const today = moment()
      const bookings = responseBody.data
      for (let i = 0; i < bookings.length; i++) {
        bookings[i].main = bookings[i].main === 1 || bookings[i].main === '1'
        bookings[i].flat = bookings[i].flat === 1 || bookings[i].flat === '1'
        bookings[i].studio = bookings[i].studio === 1 || bookings[i].studio === '1'
        bookings[i].start = moment(bookings[i].from)
        bookings[i].end = moment(bookings[i].to)

        const loop = bookings[i].start.clone()
        bookings[i].days = []
        while (loop.isBefore(bookings[i].end)) {
          bookings[i].days.push({date: loop.clone()})
          loop.add(1, 'days')
        }
      }
      dispatch(receiveBookings(bookings.filter(b => b.end.isAfter(today))))
    })
  }
}

export const setBookingStart = (startDate) => ({type: Types.START_BOOKING, payload: startDate})
export const startBooking = (startDate) => {
  return (dispatch) => {
    dispatch(setBookingStart(startDate))
    dispatch(push('/booking/new'))
  }
}

export const submitSaveBooking = () => ({ type: Types.SUBMIT_SAVE_BOOKING })
export const finishSaveBooking = (booking) => ({ type: Types.FINISH_SAVE_BOOKING, payload: booking })
export const saveBooking = (booking) => {
  return (dispatch) => {
    dispatch(submitSaveBooking())
    const apiBooking = {
      name: booking.name,
      type: booking.type,
      from: booking.dates.startDate.format('YYYY-MM-DD'),
      to: booking.dates.endDate.format('YYYY-MM-DD'),
      main: (booking.main ? 1 : 0),
      flat: (booking.flat ? 1 : 0),
      studio: (booking.studio ? 1 : 0)
    }
    const promise = (booking.id === 'new' ? api.post('b/bookings', apiBooking) : api.put('b/bookings/' + booking.id, apiBooking))
    promise.then((responseBody) => {
      dispatch(finishSaveBooking(responseBody.data))
      dispatch(fetchBookings())
      dispatch(push('/calendar'))
    })
  }
}

export const openBooking = (id) => {
  return (dispatch) => {
    dispatch(push('/booking/' + id))
  }
}

export const deleteBooking = (id) => {
  return (dispatch) => {
    dispatch(push('/calendar'))
    api.destroy('b/bookings/' + id).then(() => {
      dispatch(push('/calendar'))
      dispatch(fetchBookings())
    })
  }
}
