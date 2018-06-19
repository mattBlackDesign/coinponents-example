import request from 'request'

export function fetchJsonRpc (method, params = []) {
  if (!Array.isArray(params)) {
    var newarr = []
    newarr.push(params)
    params = newarr
  }
  return new Promise((resolve, reject) => {
    request({
      uri: 'http://localhost:1337/localhost:18332/',
      method: 'POST',
      json: true,
      headers: {
        'Authorization': 'Basic ' +
          Buffer.from('bitcoin:local321').toString('base64')
      },
      body: {
        'jsonrpc': '2.0',
        'method': method,
        'params': params
      }
    }, (e, res, data) => {
      if (e) {
        reject(e)
      } else {
        resolve(data.result)
      }
    })
  })
}
