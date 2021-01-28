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

export function getRecommendSongSheet(limit) {
  return request({
    url: '/personalized',
    method: 'get',
    params: {
      limit
    }
  })
}

export function getNewSongList(limit) {
  return request({
    url: '/personalized/newsong',
    method: 'get',
    params: {
      limit
    }
  })
}