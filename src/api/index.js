import fetch from 'isomorphic-fetch'
import cookie from 'react-cookies'

export default class api {
  static token () {
    return ''
    // return cookie.load('token')
  }

  static baseUrl () {
    return 'http://api.jered.cc/'
  }

  static login (profile) {
    const promise = this.post('login', {profile}).then((responseBody) => {
      cookie.save('token', responseBody.token)
    })
    return promise
  }

  static checkLogin () {
    return this.post('b/whoami')
  }

  static put (url, data) {
    return this.post(url, data, 'PUT')
  }

  static destroy (url, data) {
    return this.post(url, data, 'DELETE')
  }

  static post (url, data, method = 'POST') {
    if (data === undefined) {
      data = {}
    }
    data['_method'] = method
    // data.token = this.token()
    const fullUrl = this.baseUrl() + url
    return new Promise((resolve, reject) => {
      fetch(fullUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Token': cookie.load('token')
        },
        credentials: 'same-origin'
      })
        .then((response) => {
          response.json().then(resolve, reject)
        }, reject)
    })
  }

  static get (url) {
    // data.token = this.token()
    const fullUrl = this.baseUrl() + url
    return new Promise((resolve, reject) => {
      fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Token': cookie.load('token')
        },
        credentials: 'same-origin'
      })
        .then((response) => {
          response.json().then(resolve, reject)
        }, reject)
    })
  }
}
