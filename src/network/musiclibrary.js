import { request } from './request'

export function getBanners(limit) {
  return request({
    url: '/top/playlist',
    method: 'get',
    params: {
      limit
    }
  })
}