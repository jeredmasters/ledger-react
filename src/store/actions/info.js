import * as Types from 'store/types'
import api from 'src/api'
import { push } from 'react-router-redux'

export const requestInfo = () => ({type: Types.REQUEST_INFO})
export const receiveInfo = (infos) => ({type: Types.RECEIVE_INFO, payload: infos})

export const fetchInfo = () => {
  return (dispatch) => {
    dispatch(requestInfo())
    api.get('b/info').then((responseBody) => {
      const infos = responseBody.data
      dispatch(receiveInfo(infos))
    })
  }
}

export const submitSaveInfo = () => ({ type: Types.SUBMIT_SAVE_INFO })
export const finishSaveInfo = (info) => ({ type: Types.FINISH_SAVE_INFO, payload: info })
export const saveInfo = (info) => {
  return (dispatch) => {
    const promise = (info.id === 'new' ? api.post('b/info', info) : api.put('b/info/' + info.id, info))
    promise.then((responseBody) => {
      dispatch(fetchInfo())
      dispatch(push('/info'))
    })
    return promise
  }
}

export const deleteInfo = (id) => {
  return (dispatch) => {
    dispatch(push('/calendar'))
    api.destroy('b/infos/' + id).then(() => {
      dispatch(push('/calendar'))
      dispatch(fetchInfo())
    })
  }
}
