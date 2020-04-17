import axios from 'axios'
import btoa from 'btoa'
const errors = require('./errors')

const camelize = (object) => {
  for (let key in object) {
    let value = object[key]
    let newKey = key

    if (/_/.test(key)) {
      newKey = key.replace(/([_][a-z])/g, v => v[1].toUpperCase())
      delete object[key]
    }

    if (typeof value == 'object') {
      value = camelize(value)
    }

    object[newKey] = value
  }

  return object
}

class Connection {
  constructor({url, chain}) {
    const _chain = chain.toLowerCase()
    let _baseUrl = url.replace(/\/+$/, "")
    if(_chain == 'vapor'){
      _baseUrl = `${_baseUrl}/api/v2/vapor`;
    }
    else if(_chain == 'bytom'){
      _baseUrl = `${_baseUrl}/api/v2/btm`;
    }

    this.baseUrl = _baseUrl
  }

  request(path, body = {}, method) {
    let config = {
      url: `${this.baseUrl}${path}`,
      method: method || 'post',
      headers: {
        Accept: 'application/json',
      },
      data: body,
      timeout: 1000
    }

    return axios.request(config).then(resp => {
      if (resp.data.code !== 200) {
        throw errors.formatErrMsg(resp.data)
      } else if (resp.data.code === 200) {
        return camelize(resp.data.result.data)
      }

      return resp.data
    })
      .catch(error=>{
        throw error
      })
  }
}

export default Connection
