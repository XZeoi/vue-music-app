<template>
  <div class="music-player">
    <div class="tool-bar">音乐播放界面 {{$route.params}}</div>
    <div class="cover-part">
      <img :src="song.picUrl" alt="">
      <span>
        <!-- {{}}/{{}}  -->
      </span>
    </div>
    <div class="song-info">
      <div class="fs-xl mt-5">{{song.name}}</div>
      <div class="fs-md mt-2">{{song.singer.name}}</div>
    </div>
    <div class="song-panel">

    </div>
    <audio :src="song.url" controls></audio>
  </div>
</template>

<script>
import { getSongById, getSongInfoById } from 'network/song.js'

export default {
  data(){
    return {
      song: {
        name: '',
        url: '',
        picUrl: '',
        album: {
          id: '',
          name: ''
        },
        singer: {
          id: '',
          name: ''
        }
      }
    }
  },
  created() {
    // 网络请求
    this.songFetch();
    this.songInfoFetch();

    // 将歌曲添加进歌曲播放列表
    // this.addSong();
  },
  methods: {
    // 1.获取歌曲地址
    async songFetch() {
      const { data: song } = await getSongById(this.$route.params.id);
      this.song.url = song[0].url
      console.log(song[0])
    },
    // 2. 获取歌曲详情
    async songInfoFetch() {
      const { songs: info } = await getSongInfoById(this.$route.params.id)
      this.song.name = info[0].al.name
      this.song.picUrl = info[0].al.picUrl
      this.song.album.id = info[0].ar[0].id
      this.song.album.name = info[0].ar[0].name
      this.song.singer.id = info[0].ar[1].id
      this.song.singer.name = info[0].ar[1].name
      console.log(info)
      // this.song.info = info
    },

    addSong() {
      this.$store.commit('addSong', this.song)
    }
  }
}
</script>

<style scoped lang="scss">
.music-player {
  text-align: center;
  width: 100%;

  .tool-bar {
    height: 32px;
    width: 100%;
  }
  .cover-part {
    margin: 0 auto;
    border: 1px solid #ccc;
    width: 85%;

    img {
      vertical-align: middle;
      width: 100%;
    }
  }


}
  


</style>