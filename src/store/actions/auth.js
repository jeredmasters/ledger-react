import * as Types from 'store/types'
import { push } from 'react-router-redux'
import api from 'src/api'
import { fetchBookings } from './bookings'

export const receiveLogin = (profile) => ({type: Types.RECEIVE_FACEBOOK_LOGIN, payload: profile})

export const pushLogin = (profile) => {
  return (dispatch) => {
    api.login(profile).then((responseBody) => {
      dispatch(receiveLogin(responseBody.user))
      dispatch(fetchBookings())
      setTimeout(() => dispatch(push('/hello')), 500)
    })
  }
}

export const checkLogin = () => {
  return (dispatch) => {
    api.checkLogin().then((responseBody) => {
      if (responseBody.user !== null) {
        dispatch(receiveLogin(responseBody.user))
        dispatch(fetchBookings())
        setTimeout(() => dispatch(push('/hello')), 500)
      }
    })
  }
}
