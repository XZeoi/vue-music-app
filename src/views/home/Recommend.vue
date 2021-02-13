<template>
  <div class="home-recommend pb-6 mb-1">
    <swiper :options="swiperOptions1" class="banner-swiper">
      <swiper-slide v-for="(banner, index) in banners" :key="index" :data-banner="JSON.stringify(banner)">
        
          <img  class="w-100" :src="banner.pic" alt="" />
       
      </swiper-slide>
      <div class="swiper-pagination pagination-home" slot="pagination"></div>
    </swiper>


    <div class="card-container">
      <!-- nav -->
      <div class="recommend-nav d-flex jc-around text-center fs-sm mt-4 mb-2">
        <div class="recommend-nav-item" @click="$router.push('/recommendperday')">
          <img src="~assets/img/30.png" alt="" />
          <div>每日推荐</div>
        </div>
        <div class="recommend-nav-item" @click="$router.push('/radiorecommend')">
          <img src="~assets/img/radio.png" alt="" />
          <div>电台</div>
        </div>
        <div class="recommend-nav-item">
          <img src="~assets/img/time.png" alt="" />
          <div>时光·晚安</div>
        </div>
        <div class="recommend-nav-item" @click="$router.push('/musicrank')">
          <img src="~assets/img/top.png" alt="" />
          <div>排行榜</div>
        </div>
      </div>

      <!-- 推荐歌单 -->
      <music-card title="推荐歌单" class="recommend-song-sheet-card">
        <music-card-item
          v-for="(item, index) in recommendSheet"
          :key="index"
          :data="item"
          @click.native="$router.push(`/songsheet/${item.id}`)"
        >
        </music-card-item>
      </music-card>

      <!-- 推荐新歌 -->
      <music-card title="推荐新歌" class="recommend-new-song-card">
        
      </music-card>
      <swiper :options="swiperOptions2" class="recommend-new-song-swiper">
          <swiper-slide v-for="(group, index) in newSongList" :key="index" class="slide-box">
            <div
              v-for="(item, index) in group"
              :key="index"
              class="new-song-item d-flex mb-5"
            >
              <img class="w-100" :src="item.picUrl" alt="" />
              <div class="info flex-1 ml-3">
                <div class="fs-xl mt-1 mb-1">{{ `${item.name}-${item.song.artists[0].name}` }}</div>
                <div>
                  <span class="text-primary mr-1">[{{ item.song.album.type }}]</span>
                  <span class="text-grey">{{ item.song.album.name }}</span>
                </div>
              </div>
            </div>
          </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import {
  getBanner,
  getRecommendSongSheet,
  getNewSongList,
} from "network/recommend.js";

import MusicCard from "content/MusicCard";
import MusicCardItem from "content/MusicCardItem";

export default {
  components: { MusicCard, MusicCardItem },
  data() {
    // swiper中的事件监听处理函数的 this 指向 swiper实例，这里提前准备好 vm 实例指向
    let that = this;
    return {
      newSongList: [],
      recommendSheet: [],
      banners: [],
      swiperOptions1: {
        // pagination
        pagination: {
          el: ".pagination-home",
          pagination: ".swiper-pagination",
        },
        // 自动播放
        autoplay: {
          disableOnInteraction: false,
          delay: 3000,
        },
        // 滑动速度
        speed: 500,
        // 循环
        loop: true,
        // on监听事件
        on: {
          // 监听轮播图点击事件
          tap(swiper) {
            console.log('1')
            let banner = JSON.parse(swiper.clickedSlide.dataset.banner) 
            // 判断 song 是否存在 
            //    这里考虑有些banner是活动 banner 或者广告 banner
            //    至于活动 banner 或者广告 banner 的跳转，此处我们暂时不做处理  
            console.log(banner)

            if(!banner.song) return;
            // that.$router.push({name: 'MusicPlayer', params: {id: banner.song.id}})
            // 展示音乐播放页面，将歌曲id传递过去
            that.$store.commit('playView', {status:true,id:banner.song.id})
            // 添加歌曲
            that.$store.dispatch("addSongA", banner.song.id);
          }
        }
      },
      swiperOptions2: {
        freeMode : true
      },
    };
  },

  created() {
    this.bannerFetch();
    this.recommendFetch();
    this.newSongListFetch();
  },
  methods: {


    async bannerFetch() {
      const data = await getBanner(2);
      this.banners = data.banners;
      console.log(this.banners);
    },
    async recommendFetch() {
      const data = await getRecommendSongSheet(6);
      this.recommendSheet = data.result;
      console.log('sheet',data.result)
    },
    async newSongListFetch() {
      const { result: newSongList } = await getNewSongList(9);

      const list1 = newSongList.slice(0, 3);
      const list2 = newSongList.slice(3, 6);
      const list3 = newSongList.slice(6);
      this.newSongList.push(list1, list2, list3);

      // console.log(this.newSongList);
    },
  },
};
</script>

<style lang="scss">
@import "assets/css/style.scss";

.home-recommend {
  margin-top: 55.5px;

  // .banner-swiper {
  //   position: fixed;
  //   top: 55.5px;
  //   z-index: 999
  // }

  // .card-container {
  //   margin-top: 236px;
  // }
}

.pagination-home {
  .swiper-pagination-bullet {
    background-color: map-get($map: $colors, $key: "grey");
    &.swiper-pagination-bullet-active {
      background: map-get($map: $colors, $key: "white");
    }
  }
}

.recommend-nav-item {
  img {
    width: 40px;
    height: 40px;
  }
}

// .recommend-new-song-swiper {
//   margin-right: 32%
// }

// .swiper-wrapper {
//   padding: 0 270px 0 0;
// }

.slide-box {

  &:nth-child(1) {
    margin-left: 18px;
    margin-right: -16%;
  }  

  &:nth-child(2) {
    margin-right: -16%;
    // position: relative;
    // left: -16%;
  }

  // &:nth-child(3) {
  //   position: relative;
  //   left: -32%;
  // }

  .new-song-item {
    width: 100%;
    img {
      width: 50px;
      height: 50px;
    }
  }
}

// .slide-box:nth-child(3) {
//   padding-right: 100px;
// }
</style>