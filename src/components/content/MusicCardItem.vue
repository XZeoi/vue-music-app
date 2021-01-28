<template>
  <div class="music-card-item">
    <div class="img-part">
      <img :src="data.picUrl" alt="">
    </div>
    <div class="title-part">
      {{data.name}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.music-card-item {
  width: 30%;
  margin-bottom: 20px;
}
.img-part img {
  width: 100%;
}
.title-part {
  margin-top: 5px;

  /* white-space: nowrap; */
  text-overflow:ellipsis;
  overflow:hidden;

  /* 将对象作为弹性伸缩盒子模型显示 */
  display: -webkit-box;
  /* 设置或检索伸缩盒对象的子元素的排列方式 */
  -webkit-box-orient: vertical; 
  /* 用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的WebKit属性。*/
  -webkit-line-clamp: 2;
}

</style>