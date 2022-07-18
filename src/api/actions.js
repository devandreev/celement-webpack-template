import API from './index.js'

// Заглушка
const MOCK_REQUEST = function(data, timeout = 300) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ status: 200, data })
    }, timeout)
  })
}
