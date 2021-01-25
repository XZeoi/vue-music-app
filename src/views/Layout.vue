<template>
  <div class="layout">
    <router-view></router-view>
    <tab-bar v-model="activedName">
      <tab-bar-item 
      :title="item.title" 
      :icon="item.icon"
      :name="i"
      :to="item.path"
      v-for="(item, i) in items" 
      :key="i"></tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "common/TabBar"
import TabBarItem from "common/TabBarItem"


export default {
  name: 'Layout',
  components: {
    TabBar,
    TabBarItem
  },
  data() {
    return {
      items: [
        {title: '发现', icon: 'iconfont icon-home', path:'/home'},
        {title: '我的音乐', icon: 'iconfont icon-music', path:'/music'},
        {title: '音乐圈', icon: 'iconfont icon-music', path: '/hey'},
        {title: '个人中心', icon: 'iconfont icon-menu', path: '/center'},
      ],
      activedName: 0
    }
  }
}
</script>

<style scoped>
/* .layout {
  width: 100%;
  height: 900px;
  background-image: url('~assets/img/a.jpg');
} */
</style>
