<template>
  <div v-show="songList.length > 0">
    <div class="music-player" v-show="fullScreen">
      <div class="tool-bar">
        <span class="iconfont icon-down" @click="downClick"></span>
      </div>
      <div class="cover-part">
        <img :src="songData.picUrl" alt="" />
        <div class="time-progress-area">
          <span class="progress" :style="{ width: `${progress}%` }"></span>
          <span class="time-show-area">
            {{ currentTime | timeFormat }} / {{ duration | timeFormat }}
          </span>
        </div>
      </div>
      <div class="song-info">
        <div class="fs-xl mt-5">{{ songData.name }}</div>
        <div class="fs-md mt-2">{{ songData.singer }}</div>
      </div>
      <div class="song-show-area">
        <span>标准</span>
        <span>音效off</span>
        <span>AI模式off</span>
      </div>
      <div class="song-panel">
        <span class="pre iconfont icon-pre" @click="preClick"></span>
        <span
          class="play iconfont icon-play1"
          @click="playClick"
          v-show="!playStatus"
        ></span>
        <span
          class="play iconfont icon-pause"
          @click="playClick"
          v-show="playStatus"
        ></span>
        <span class="next iconfont icon-next" @click="nextClick"></span>
      </div>

      <div class="footer d-flex jc-evenly pt-5">
        <span class="iconfont icon-download"></span>
        <span class="iconfont icon-message"></span>
        <span class="iconfont icon-list" @click="playListStatus = true"></span>
        <span class="iconfont icon-more"></span>
      </div>

      <div
        class="grey-filter"
        v-show="playListStatus"
        @click="playListStatus = false"
      ></div>
      <div class="playList" v-show="playListStatus">
        <span class="top"></span>
        <div class="play-list-info ml-5 mr-5">共{{ songList.length }}首</div>

        <div v-for="item in songList" 
        :key="item.id" 
        class="d-flex pt-3 pb-3 pl-5 pr-5" 
        :class="{isActive: item.id === cur}"
        @click.stop="$store.commit('toggleSong',{id: item.id, direc: 'cur'})"
        >
          <img :src="item.picUrl" alt="" class="w-100" />
          <div class="info flex-1 ml-3">
            <div class="title fs-xl mt-2">{{ item.name }}</div>
            <div class="singer fs-md">{{ item.singer }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="mini-music-player" v-show="!fullScreen" @click.stop="$store.commit('toggleFullScreen', true);">
      <img :src="songData.picUrl" alt="">
    </div>
    <audio
        :src="songData.url"
        ref="$audio"
        @canplay="getDuration"
        @timeupdate="updateTime"
        autoplay
      ></audio>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      // 当前播放歌曲信息
      songInfo: {},
      // 播放列表状态
      playListStatus: false,
      // 进度条 0～100
      progress: 0,
      timer: 0,
      // 播放状态
      playStatus: true,
      $audio: {},
      currentTime: 0,
      duration: 0,
    };
  },
  computed: {
    ...mapGetters([
      'fullScreen',
      'cur',
      'songList',
      'songData'
    ]),
  },
  watch: {
    playStatus() {
      this.audioComplete();
    },
    cur() {
      this.playStatus = true
    },
  },
  methods: {
    // 初始化audio
    audioInit() {
      let { $audio } = this.$refs;
      this.$audio = $audio;
    },
    // 获得音乐总时长
    getDuration() {
      this.audioInit();
      this.progressControl()
      this.duration = this.$audio.duration;
    },
    // 获得音乐当前位置
    updateTime() {
      this.audioInit();
      this.currentTime = this.$audio.currentTime;
    },

    // 控制音乐的播放
    audioPlay() {
      if (!this.$audio) return;
      this.$audio.play();
      this.playStatus = true;
    },
    // 控制音乐的暂停
    audioPause() {
      if (!this.$audio) return;
      this.$audio.pause();
      this.playStatus = false;
    },
    // 音乐播放完成
    audioComplete() {
      if (this.currentTime === this.duration) {
        this.progress = 0;
        if(this.songList <= 1) {
          this.playStatus = this.$audio.paused;
          this.audioPause();  
          return
        }
        // 当前歌曲播放完，跳转至下一首
        this.$store.commit("toggleSong", {id:this.cur, direc:'next'});
      }
    },

    // 进度条的控制
    progressControl() {
      this.timer = setInterval(() => {
        const radio = this.currentTime / this.duration;
        let foo = (radio * 75).toFixed(2);
        if (foo >= 75) {
          this.playStatus = false;
          this.progress = 0;
          clearInterval(this.timer);
        }
        this.progress = foo;
      }, 30);
    },

    // 播放按钮
    playClick() {
      this.audioInit();
      if (this.$audio.paused) {
        this.audioPlay();
        this.progressControl();
        return;
      }
      this.audioPause();
      clearInterval(this.timer);
    },
    // 切换至下一首
    nextClick() {
      this.$store.commit("toggleSong", {id:this.cur, direc:'next'});
    },
    // 切换至上一首
    preClick() {
      this.$store.commit("toggleSong", {id:this.cur, direc:'pre'});
    },
    // 隐藏整个播放页面，只呈现mini-music-player
    downClick() {
      this.$store.commit('toggleFullScreen', false);
    }
  },
};
</script>

<style scoped lang="scss">
.music-player {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  text-align: center;
  // width: 100%;
  background-color: #fff;

  .tool-bar {
    position: relative;
    display: flex;
    align-items: center;
    height: 44px;
    width: 100%;

    span {
      position: absolute;
      left: 26px;
      font-size: 22px;
      color: #444;
    }
  }
  .cover-part {
    position: relative;
    margin: 0 auto;
    // border: 1px solid #ccc;
    width: 85%;
    border-radius: 3px;

    img {
      vertical-align: middle;
      width: 100%;
      border-radius: 3px;
    }

    .time-progress-area {
      display: flex;
      align-items: center;
      position: absolute;
      left: 0;
      bottom: -10px;
      width: 100%;

      .time-show-area {
        flex-shrink: 0;
        display: block;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
        border-radius: 10px;
        color: #fff;
        font-size: 12px;
        width: 80px;
        height: 20px;
        line-height: 20px;
        background-color: rgba(0, 0, 0, 0.7);
      }

      .progress {
        display: inline-block;
        height: 2px;
        // background-color: #ff3f00;
        background-image: linear-gradient(
          to right,
          rgb(255, 255, 255),
          #ff3f00
        );
      }
    }
  }

  .song-show-area {
    font-size: 20px;
    color: #aaa;
    transform: scale(0.5);

    span {
      display: inline-block;
      border: 1px solid #aaa;
      border-radius: 2px;
      padding: 3px 5px;
      margin: 16px 10px;
      line-height: 1;
    }
  }

  .song-panel {
    width: 100%;
    padding: 18px;

    .pre,
    .next,
    .play {
      vertical-align: middle;
      color: #444;
    }

    .play {
      font-size: 36px;
      margin: 0 30px;
    }

    .pre,
    .next {
      font-size: 30px;
    }
  }

  .footer {
    span {
      font-size: 22px;
      color: #aaa;
    }
  }

  .grey-filter {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .playList {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding-bottom: 30px;
    max-height: 500px;
    background-color: #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    overflow: auto;

    .top {
      display: inline-block;
      width: 70px;
      height: 4px;
      background-color: #ccc;
      border-radius: 2px;
    }

    .play-list-info {
      height: 40px;
      line-height: 40px;
      text-align: left;
      border-bottom: 1px solid #eee;
    }

    img {
      width: 50px;
      height: 50px;
      border-radius: 3px;
    }
    .title,
    .singer {
      text-align: left;
    }
  }

  
}

.mini-music-player {
    z-index: 999;
    position: fixed;
    bottom: 20px;
    right: 10px;
    width: 50px;
    height: 50px;
    border: 1px solid #ff3f00;
    border-radius: 50%;
    background-color: #fff;
    overflow: hidden;

    img {
      width: 100%;
    }
  }

  .isActive {
    color: #ff3f00;
    background-color: #eee;
  }
</style>