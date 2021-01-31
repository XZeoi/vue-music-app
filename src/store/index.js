import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songList: []
  },
  mutations: {
    // 往音乐播放列表中添加音乐
    addSong(state, song) {
      state.songList.push(song)
    }
  },
  actions: {
  },
  modules: {
  }
})
