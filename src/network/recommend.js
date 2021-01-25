import { request } from './request'

export function getBanner(type) {
  return request({
    url: '/banner',
    method: 'get',
    params: {
      type
    }
  })
}