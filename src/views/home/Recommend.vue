<template>
  <div>
    <swiper :options="swiperOptions1">
      <swiper-slide v-for="(banner, index) in banners" :key="index">
        <img class="w-100" :src="banner.pic" alt="" />
      </swiper-slide>
      <div class="swiper-pagination pagination-home" slot="pagination"></div>
    </swiper>

    <div class="card-container">
      <!-- nav -->
      <div class="recommend-nav d-flex jc-around text-center fs-sm mt-4 mb-2">
        <div class="recommend-nav-item">
          <img src="~assets/img/30.png" alt="" />
          <div>每日推荐</div>
        </div>
        <div class="recommend-nav-item">
          <img src="~assets/img/radio.png" alt="" />
          <div>电台</div>
        </div>
        <div class="recommend-nav-item">
          <img src="~assets/img/time.png" alt="" />
          <div>时光·晚安</div>
        </div>
        <div class="recommend-nav-item">
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
              <div class="info flex-1">
                <div>{{ `${item.name}-${item.song.artists[0].name}` }}</div>
                <div>{{ [item.song.album.type] }}</div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      <!-- zhanwei -->
      <ul>
        <li>d</li>
        <li>s</li>
        <li>ds</li>
      </ul>
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
      console.log(data);
    },
    async recommendFetch() {
      const data = await getRecommendSongSheet(6);
      this.recommendSheet = data.result;
    },
    async newSongListFetch() {
      const { result: newSongList } = await getNewSongList(9);

      const list1 = newSongList.slice(0, 3);
      const list2 = newSongList.slice(3, 6);
      const list3 = newSongList.slice(6);
      this.newSongList.push(list1, list2, list3);

      console.log(this.newSongList);
    },
  },
};
</script>

<style lang="scss">
@import "assets/css/style.scss";

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

.recommend-new-song-swiper {
  padding: 0 270px 0 0;
}

.slide-box {
  margin-left: 18px;
  margin-right: -16%;
  .new-song-item {
    width: 100%;
    img {
      width: 67px;
      height: 67px;
    }
  }
}
</style>