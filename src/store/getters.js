
const 

  fullScreen = state => state.fullScreen,

  cur = state => state.cur,

  curIndex = state => {
    return (
      state.songList.findIndex(item => item.id === state.cur)
    ) || 0
  },

  songList = state => state.songList,

  songData = state => {
    return (
      state.songList.find((item) => {
        return parseInt(item.id) === parseInt(state.cur);
      }) || {}
    );
  }

export default {
  fullScreen,
  cur,
  curIndex,
  songList,
  songData
}