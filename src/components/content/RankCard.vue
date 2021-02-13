<template>
  <div class="rank-card bg-white">
    <div class="category bg-primary text-white d-flex ai-center">
      <span class="title">{{ data.name }}</span>
      <span class="iconfont icon-right"></span>
    </div>
    <div class="main d-flex" v-if="data.tracks">
      <div class="image">
        <img class="img-show" :src="data.coverImgUrl" alt="" />
        <img class="play-icon" src="~assets/img/play.png" alt="" />
      </div>
      <div class="pt-3 pb-3 pl-3 d-flex flex-column jc-around">
        <div class="rank" v-for="(item, index) in data.tracks" :key="index">
          <span class="text-primary mr-2">{{ index + 1 }}</span>
          <span class="text-dark">{{ item.first }}</span>
          <span class="text-grey ml-2">{{ item.second }}</span>
        </div>
      </div>
    </div>
    <div class="tip bg-dark text-white fs-xs">
      {{ data.updateFrequency }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped lang="scss">
.rank-card {
  position: relative;
  height: 110px;
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  z-index: 10;
  font-weight: 600;

  .category {
    position: absolute;
    top: -6px;
    left: -6px;
    padding: 3px 5px 4px 7px;
    line-height: 1;
    z-index: 10;
  }

  .tip {
    position: absolute;
    top: 4px;
    right: 0px;
    padding: 0 5px;
    transform: scale(0.8);
  }

  .main {
    .image {
      position: relative;
      .img-show {
        height: 110px;
        border-radius: 5px;
      }

      .play-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 26px;
      }
    }
  }
}
</style>