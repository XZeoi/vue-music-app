<template>
  <div class="recommend-per-day" v-if="songList.length > 0">
    <!-- 封面 -->
    <div class="cover">
      <span class="iconfont icon-left" @click="$router.back(-1)"></span>
      <img :src="songList[0].picUrl" alt="" class="w-100">
      <div class="filter"></div>
      <div class="info">
          <img src="~assets/img/30w.png" alt="">
          <div class="text">
            <div class="title">每日30首</div>
            <div class="intro">为你每天推荐好音乐</div>
          </div>
      </div>
    </div>
    <!-- 工具栏 -->
    <div class="tool-bar d-flex ai-center">
      <div class="btn d-flex ai-center" @click.stop="listClick">
        <span class="iconfont icon-play2"></span>
        <span class="title">全部播放</span>
      </div>
      <span class="text-grey">30首</span>
    </div>

    <!-- 歌曲列表 -->
    <div class="rec-list">
      <div v-for="item in songList" :key="item.id" class="d-flex rec-list-item" @click.stop="itemClick(item)">
        <img :src="item.picUrl" alt="" class="w-100" />
          <div class="info flex-1 ml-3">
            <div class="title fs-xl mt-2">{{ item.name }}</div>
            <div class="singer fs-md">{{ item.song.artists[0].name }}</div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecommendPerDayList } from "network/recommend"

export default {
  data() {
    return {
      songList: []
    }
  },
  created() {
    this.perDayListFetch();
  },
  methods: {
    async perDayListFetch() {
      const { result } = await getRecommendPerDayList();
      this.songList = result
      console.log(result)
    },
    listClick() {
      let IdList = this.songList.map(item => item.id)
      this.$store.commit('playView', {status:true,id:IdList[0]})
      this.$store.dispatch('addSongListA', IdList)
    },
    itemClick(item) {
      // 展示音乐播放页面，将歌曲id传递过去
      this.$store.commit('playView', {status:true,id:item.id})
      // 添加歌曲
      this.$store.dispatch("addSongA", item.id);
    }
  }
}
</script>

<style scoped lang="scss">
.recommend-per-day {
  .cover {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;

    img {
      // transform: translateY(-50%);
    }
    .icon-left {
        position: absolute;
        top: 10px;
        left: 0px;
        color: #fff;
        font-size: 30px;
        z-index: 555;
      }

    .info {
      display: flex;
      align-items: center;
      position: absolute;
      bottom: 10px;
      left: 16px;
      z-index: 555;
      color: #fff;

      img {
        width: 46px;
      }
      
      .text {
        height: 40px;
        line-height: 1;
        padding: 0 10px;
        margin-left: 10px;
        border-left: 1px solid #eee;
        .title {
          margin-bottom: 8px;
          font-weight: 500;
          font-size: 20px;
        }
        .intro {
          color: #eee;
        }
      }
    }

    .filter {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 222;

      background-color: rgba(0,0,0,0.5);
    }
  }

  .tool-bar {
    border-bottom: 1px solid #eee;
    margin-left: 20px;
    padding: 10px 0;
    .btn {
      color: #ff3f00;
      font-size: 16px;
      font-weight: 500;
      padding: 0;
    
      .icon-play2 {
        font-size: 30px;
      }

      .title {
        line-height: 1;
        margin: 0 4px;
      }
    }
  }

  .rec-list {
    .rec-list-item {
      padding: 13px 20px;
    }

    img {
      width: 50px;
      height: 50px;
      border-radius: 3px;
    }

    .title {
      color: #333;
    }

    .singer {
      color: #999;
      margin-top: 2px;

    }
  }
}

</style>