const xhr = new XMLHttpRequest()

export default {
  post(url, data, callback) {
    xhr.open('POST', url)

    xhr.send(data)

    if (callback && typeof callback === 'function') {
      xhr.onload = () => callback(xhr.status)
    }
  },

  getParams(method, data) {

    return {
      method,
      body: data,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      redirect: 'follow',
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
      referrerPolicy: 'no-referrer',
    }
  }
}
