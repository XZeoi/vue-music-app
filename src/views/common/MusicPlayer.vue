<template>
  <div class="music-player">
    <div class="tool-bar">音乐播放界面 {{$route.params}}</div>
    <div class="cover-part">
      <img :src="song.picUrl" alt="">
      <span>
        {{ currentTime | timeFormat }}/{{ duration | timeFormat }} 
      </span>
    </div>
    <div class="song-info">
      <div class="fs-xl mt-5">{{song.name}}</div>
      <div class="fs-md mt-2">{{song.singer.name}}</div>
    </div>
    <div class="song-panel">
      <span class="pre iconfont icon-pre"></span>
      <span class="play iconfont icon-play1" @click="playClick" v-show="!playStatus"></span>
      <span class="play iconfont icon-pause" @click="playClick" v-show="playStatus"></span>
      <span class="next iconfont icon-next"></span>
    </div>
    <audio :src="song.url" 
    ref="$audio" 
    preload="true"
    @canplay="getDuration" 
    @timeupdate="updateTime"
    >
    </audio>
  </div>
</template>

<script>
import { getSongById, getSongInfoById } from 'network/song.js'

export default {
  data(){
    return {
      playStatus: false,
      $audio: {},
      currentTime: 0,
      duration: 0,
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
  mounted() {
    this.audioInit();
  },
  unpdated() {
    // 页面组件重新渲染时触发
    this.audioInit();
  },
  methods: {
    // 1.获取歌曲地址
    async songFetch() {
      const { data: song } = await getSongById(this.$route.params.id);
      this.song.url = song[0].url
      // console.log(song[0])
    },
    // 2. 获取歌曲详情
    async songInfoFetch() {
      const { songs: info } = await getSongInfoById(this.$route.params.id)
      // 歌曲名称和封面
      this.song.name = info[0].al.name
      this.song.picUrl = info[0].al.picUrl
      // this.song.album.id = info[0].ar[0].id
      // this.song.album.name = info[0].ar[0].name
      this.song.singer.id = info[0].ar[0].id
      this.song.singer.name = info[0].ar[0].name
      console.log('info',info)
      // this.song.info = info
    },
    // 初始化audio
    audioInit() {
      let { $audio } = this.$refs;
      this.$audio = $audio;
      // console.log(typeof($audio))
    
      console.log( 'audio', $audio.paused )
    },

    // 控制音乐的播放
    audioPlay() {
      if(!this.$audio) return;
      console.log(this.$audio)
      this.$audio.play()
      this.playStatus = true
    },
    // 控制音乐的暂停
    audioPause() {
      if(!this.$audio) return;
      this.$audio.pause()
      this.playStatus = false
    },
    // 音乐播放完成
    audioComplete() {

    },
    // 获得音乐总时长
    getDuration() {
      this.duration = this.$audio.duration
      console.log(this.duration, typeof(this.duration))
    },
    // 获得音乐当前位置
    updateTime() {
      this.currentTime = this.$audio.currentTime
    },
    playClick() {
      if(this.$audio.paused) {
        this.audioPlay()
        return
      }
      this.audioPause()
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
    height: 44px;
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

  .song-panel {
    width: 100%;
    padding: 20px;

    .pre, .next, .play {
      vertical-align: middle;
      color: #444;
    }

    .play {
      font-size: 36px;
      margin: 0 30px;
    }

    .pre, .next {
      font-size: 30px;
    }
  }


}
  


</style>