import axios from 'axios'
import { sleep } from '../utils'

const instance = axios.create({
  baseURL: 'http://localhost:3004',
  timeout: 10000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.response.use(
  async res => {
    // await sleep(3)
    return res.data
  },
  error => {
    try {
      const { status: code, statusText: message } = error.response
      return Promise.reject(new Error({ code, message }))
    } catch (e) {
      if (error.toString().indexOf('Error: timeout') !== -1) {
        return Promise.reject(new Error('网络请求超时'))
      }
    }
  }
)

export function createCrud (uri) {
  return {
    create: data => instance.post(`${uri}`, data),
    remove: id => instance.delete(`${uri}/${id}`),
    update: data => instance.put(`${uri}/${data.id || data._id}`, data),
    list: params => instance.get(`${uri}`, { params }),
    find: id => instance.get(`${uri}/${id}`)
  }
}

export default instance
