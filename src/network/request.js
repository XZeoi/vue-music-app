import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL || '/'
  })

  instance.interceptors.request.use(config => {

    return config
  })

  instance.interceptors.response.use(res => {

    return res.data
  })

  return instance(config)
}