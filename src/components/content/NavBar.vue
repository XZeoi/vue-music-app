<template>
  <div class="nav-bar d-flex ai-center pt-2 pb-2 bg-white">
    <div class="nav-title d-flex flex-1  ai-end jc-around  ml-7 mr-5">
      <div  
      @click="titleClick(index, $event, item)"
      v-for="(item, index) in navTitle"
      :key="index"
      :ref="item.name"
      >{{item.title}}</div>
    </div>
    <div class="nav-search iconfont icon-search ml-5 mr-4"></div>
  </div>
</template>

<script>
/**
 * 通过 $event传参 来获取当前被点击的 DOM 元素
 * 通过 $refs组件/元素的引用 来获取选项卡各 item 的 DOM 元素
**/
export default {
  data() {
    return {
      navTitle: [
        {name: 'musiclibrary', title: '乐库'},
        {name: 'recommend', title: '推荐'},
        {name: 'video', title: '视频'},
        {name: 'radio', title: '电台'},
      ],
      // 选项卡被选中状态
      selectedId: 1,
    }
  },
  methods: {
    titleClick(index, event, item) {
      // 先判断当前点击的 item 是否已经被选中，若选中，则 return
      if(this.selectedId === index) {
        return
      }
      event.target.style.fontSize = "24px"
      // 通过 selectedId 中间状态来判断切换前，被选中的 DOM 元素
      // 切换后，之前被选中的 item 需要缩小
      switch(this.selectedId) {
        case 0: 
          this.$refs.musiclibrary[0].style.fontSize = "13px";
          break;
        case 1:
          this.$refs.recommend[0].style.fontSize = "13px";
          break;
        case 2:
          this.$refs.video[0].style.fontSize = "13px";
          break;
        case 3:
          this.$refs.radio[0].style.fontSize = "13px";
          break;
      }
      // 切换结束，将 selectedId 设置为当前 item
      this.selectedId = index

      // 跳转路由
      this.$router.push(`/home/${item.name}`)
    }
  }
}
</script>

<style scoped>
.nav-title {
  /* tab 选项卡容器高度一定要设置， 否则切换选项卡时会整体抖动 */
  height: 49px;

  /* 行高一定要设置为 1 ，否则不同大小文字无法对齐 */
  line-height: 1;
}

.nav-title div { 
  /* 过渡时间设置太长， 字体缩放时，肉眼会观察到字体会有些抖动 */
  transition: all 300ms;
}

.nav-title div:nth-child(2) { 
  /* 给选项卡第一个 item 设置一个初始大小 */
  font-size: 24px;
}
</style>