import request from 'request'

export function fetchConversionRate () {
  return new Promise((resolve, reject) => {
    request({
      uri: 'https://api.coinmarketcap.com/v1/ticker/?limit=100',
      method: 'GET',
      json: true,
      headers: {
        'Content-Type': 'application/json'
      },
    }, (e, res, data) => {
      if (e) {
        reject(e)
      } else {
        resolve(data.result)
      }
    })
  })
}
