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

// 这里获取每日推荐歌曲，实质上需要登录权限，因暂时不考虑做登录
//  功能，所以接口采用 新歌推荐 一样的接口资源，且固定请求数目为30首
export function getRecommendPerDayList() {
  return request({
    url: '/personalized/newsong',
    method: 'get',
    params: {
      limit: 30
    }
  })
}

export function getRadioRecommendList() {
  return request({
    url: '/personalized/djprogram',
    method: 'get'
  })
}

// 获取音乐排行榜
export function getMusicRankList() {
  return request({
    url: '/toplist/detail',
    // url: '/toplist',
    method: 'get'
  })
}
// 歌单详情
export function getMusicSheetDetails(id) {
  return request({
    url: '/playlist/detail',
    method: 'get',
    params: {
      id
    }
  }) 
}