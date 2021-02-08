import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

import { getLyricById, getSongById, getSongInfoById } from 'network/song.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 播放页面是否全屏
    fullScreen: false,
    // 当前播放id
    cur: 0,
    // 播放列表
    songList: [],
  },
  mutations: {
    // 改变全屏状态
    toggleFullScreen(state, status) {
      state.fullScreen = status
    },

    // 进入播放界面
    playView(state, payload) {
      let {status, id} = payload
      state.fullScreen = status
      state.cur = id
    },

    // 往音乐播放列表中添加音乐
    addSongM(state, payload) {
      let { id, list } = payload;
      state.cur = parseInt(id);
      if(list) {
        state.songList.push(list)
      }
      console.log(state)
    },

    // 往音乐播放列表添加音乐列表
    addSongListM(state, {  list }) {
      state.songList = list
    },

    // 切换歌曲
    toggleSong(state, {id, direc}) {
      if(state.songList.length === 1) return;

      let index = state.songList.findIndex(item => {
        return id === item.id
      });

      switch(direc) {
        case 'cur':
          state.cur = id
          break
        case 'next':

          index++;
           
          if(state.songList.length <= index) {
            console.log(state.songList)
            state.cur = state.songList[0].id;
          } else {
            console.log(state.songList)
            console.log('A',index,state.songList[index])
            state.cur = state.songList[index].id;
          } 
          break
        case 'pre':

          index--;
          if(index <= 0) {
            state.cur = state.songList[state.songList.length-1].id;
          } else {
            state.cur = state.songList[index].id;
          }
          break
      }
       
    }
  },
  actions: {
    // addSongA(context){} 将 state 和 commit 解构出来
    async addSongA({ state, commit }, id) {
      let result = state.songList.find(item => {
        return parseInt(item.id) === parseInt(id)
      })
      if(result) {
        commit('addSongM', { id })
        return 
      }
      const { data: [{ url }] } = await getSongById(id);
      const { songs: [{al: { picUrl, name}, ar: [{id: singerId, name: singer}]}] } = await getSongInfoById(id)
      const { lrc: lyric } = await getLyricById(id)
      let list = {
        id,
        url,
        picUrl,
        name,
        singerId,
        singer,
        lyric
      }
      commit('addSongM', {
        id,
        list
      })
    },
    async addSongListA({ state, commit }, ids) {
      let list=[];
      for(let id of ids) {
        const { data: [{ url }] } = await getSongById(id);
        const { songs: [{al: { picUrl, name}, ar: [{id: singerId, name: singer}]}] } = await getSongInfoById(id)
        const { lrc: lyric } = await getLyricById(id)
        let item = {
          id,
          url,
          picUrl,
          name,
          singerId,
          singer,
          lyric
        }
        list.push(item)
      }
      
      commit('addSongListM', {
        list
      })
    }
  },
  getters
})
