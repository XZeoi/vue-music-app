import { request } from './request.js'

export function getSongById(id) {
  return request({
    url: '/song/url',
    params: {
      id
    }
  })
}

export function getSongInfoById(id) {
  return request({
    url: '/song/detail',
    params: {
      ids:id
    }
  })
}