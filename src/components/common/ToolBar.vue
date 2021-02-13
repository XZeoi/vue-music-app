<template>
  <div class="tool-bar" :style="{ backgroundImage: `url(assets/img/bg.jpeg)` }">
  <!-- <div class="tool-bar" :style="{ backgroundImage: `url(${bgUrl})` }"> -->
    <div class="main">
      <div class="top-tool">
        <i class="iconfont icon-left" @click="$router.back(-1)"></i>
        <span class="flex-1 title">{{ title }}</span>
        <span class="right"><slot name="right"></slot></span>
      </div>
      <div class="topic">{{ topic }}</div>
    </div>
    <div class="filter"></div>
  </div>
</template>

<script>
export default {
  props: {
    bgUrl: {
      type: String,
      default: ''
    },
    topic: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped lang="scss">
.tool-bar {
  color: #fff;
  position: relative;
  width: 100%;
  height: 160px;
  // background-color: skyblue;

  .main {
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .top-tool {
    height: 44px;
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .icon-left {
      font-size: 30px;
    }

    .title {
      text-align: center;
      font-size: 20px;
    }

    .right {
      display: inline-block;
      width: 30px;
    }
  }

  .topic {
    position: absolute;
    bottom: 60px;
    left: 20px;
    font-size: 24px;
  }

  .filter {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
}
</style>