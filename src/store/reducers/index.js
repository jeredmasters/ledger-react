import * as Types from 'store/types'

export const profileReducer = (state = null, action) => {
  switch (action.type) {
    case Types.RECEIVE_FACEBOOK_LOGIN:
      return action.payload
    default:
      return state
  }
}

export const bookingsReducer = (state = null, action) => {
  switch (action.type) {
    case Types.REQUEST_BOOKINGS:
      return state
    case Types.RECEIVE_BOOKINGS:
      return action.payload
    default:
      return state
  }
}
export const bookingStartReducer = (state = null, action) => {
  switch (action.type) {
    case Types.START_BOOKING:
      return action.payload
    default:
      return state
  }
}
