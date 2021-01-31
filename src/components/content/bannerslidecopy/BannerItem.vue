<template>
  <div class="banner-item">
    <div class="banner-item-container">
      <img class="image" :src="banner.coverImgUrl" alt="" />
      <img class="icon" src="~assets/img/play.png" alt="" />
      <div class="text">{{ banner.name }}</div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    banner: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style scoped lang="scss">
.banner-item {
  width: 40vw;
  border-radius: 4px;
  box-shadow: 6px 0px 4px rgba(63, 63, 63, 0.5);
  .banner-item-container {
    position: absolute;
  }
  .image {
    width: 100%;
    border-radius: 4px;
    vertical-align: middle;
  }

  .icon {
    position: absolute;
    left: 10%;
    top: 50%;
    transform: translateY(-50%);
    width: 20%;
  }

  .text {
    background-color: #000;
    color: #fff;
    font-size: 14px;
    width: 60%;
    position: absolute;
    top: 65%;
    left: 4px;

    /* white-space: nowrap; */
    text-overflow: ellipsis;
    overflow: hidden;

    /* 将对象作为弹性伸缩盒子模型显示 */
    display: -webkit-box;
    /* 设置或检索伸缩盒对象的子元素的排列方式 */
    -webkit-box-orient: vertical;
    /* 用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的WebKit属性。*/
    -webkit-line-clamp: 2;
  }
}
</style>