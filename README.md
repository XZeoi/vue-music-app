# musicweb

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



## LOG 

### tabbar 的事件封装

**目的：**将item的点击事件的监听放在`item`组件的封装内，以后项目拿来就可以点击`item`高亮点击的`item`，而无需再次封装监听方法。

**问题：**利用传统的`currentIndex`中间状态，但因为这是在单个`item`组件内监听事件，所以`currentIndex`不易实现各个组件之间的共享。

**解决：**利用`v-model`绑定数据，再利用`$parent.$emit`发送`input`事件和参数，达到各组件间共享一个中间状态

**代码：**具体见`TabBar`和`TabBarItem`组件



### tablayout的动效实现

**目的：**实现虾米音乐`tab选项卡`的文字放大缩小自适应的动画效果。

**问题：**

1. 以往最常用的方法就是通过`transform/scale`方法缩放元素大小，但因为这次的效果是需要各`tab选项卡`之间互相联动起来，缩放的基点也不是固定的，因此`transform-origin`无法满足缩放的基点的动态变更（目前我还没有找到方法）。
2. 因为要实现`tab选项卡`的点击缩放，所以会因为被点击的`item`，和上一个`item`缩放，而导致的各个`item`之间间距变动。若使用`transform`，`transform`的动画不会干涉布局的变化，因此这里不应该使用`transform`。

**解决：**通过改变图片的`width`、`height`，或者字体的`font-size`来实现缩放效果，而且这种方式会破坏布局，这也是我们想要的效果，通过各个`item`的缩放、改变布局而形成的各自自适应的布局变化。

**BUG1：**在编程的过程，遇到一个BUG

- 无论怎样改变字体大小，文本的div都无法被字体的大小撑起；查找了外层的div，均为设置具体的高度；
- 后面发现在初始样式的时候，设置了一个`行高1.2rem`；才找到bug所在，把行高删除即可。

![navbarbug](/Users/TaoJ/WebstormProjects/Vue/vue-music/xiami/musicweb/readmeImg/navbarbug.png)

**BUG2：**div包裹的文本始终与div上下边框有移动距离，并且随着字体的变大，间隙也会变大，因此需要消除该间隙，才能保证大号文本与小号文本始终底线对齐。

- 添加一个行间距（因为行间距有继承性，所以可直接给所有选项卡的大容器添加）：`line-height:1 ;`（但始终会有非常小的间隙）

**BUG3：**针对字体的`font-size`来动态改变字体的大小，在字体变动时，即切换选项卡`item`时，整个选项卡会抖动。

- 给选项卡整体添加一个固定高度，抖动消失



**代码：**具体见NavBar组件，或者参见下面：

```vue
<template>
  <div class="nav-bar d-flex ai-center pt-2 pb-2 bg-white">
    <div class="nav-title d-flex flex-1  ai-end jc-around  ml-7 mr-5">
      <div   
      @click="titleClick(index, $event)"
      v-for="(item, index) in navTitle"
      :key="index"
      :ref="item.name"
      >{{item.title}}</div>
    </div>
    <div class="nav-search iconfont icon-search ml-5 mr-4"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navTitle: [
        {name: 'library', title: '乐库'},
        {name: 'recommend', title: '推荐'},
        {name: 'video', title: '视频'},
        {name: 'point', title: '看点'},
      ],
      // 选项卡被选中状态
      selectedId: 0,
    }
  },
  methods: {
    titleClick(index, event) {
      // 先判断当前点击的 item 是否已经被选中，若选中，则 return
      if(this.selectedId === index) {
        return
      }
      event.target.style.fontSize = "24px"
      // 通过 selectedId 中间状态来判断切换前，被选中的 DOM 元素
      // 切换后，之前被选中的 item 需要缩小
      switch(this.selectedId) {
        case 0: 
          this.$refs.library[0].style.fontSize = "13px";
          break;
        case 1:
          this.$refs.recommend[0].style.fontSize = "13px";
          break;
        case 2:
          this.$refs.video[0].style.fontSize = "13px";
          break;
        case 3:
          this.$refs.point[0].style.fontSize = "13px";
          break;
      }
      // 切换结束，将 selectedId 设置为当前 item
      this.selectedId = index
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
.nav-title div:nth-child(1) { 
  /* 给选项卡第一个 item 设置一个初始大小 */
  font-size: 24px;
}
</style>
```

### [vue-awesome-swiper第三方插件的使用](https://github.com/surmon-china/vue-awesome-swiper)

1. 若使用 `pagination` 不显示， 且设置自动播放时不能自动播放，则需要额外导入下面程序
   - swiper 6.X的版本的问题

```javascript
import Swiper2, {Navigation, Pagination, Autoplay} from 'swiper'
Swiper2.use([Navigation, Pagination, Autoplay])
```



2. 修改 `pagination` 的背景颜色时，不能生效。
   - 原因：组件中 `style` 使用了 `scoped` ，`swiper`分页样式就失效了。分页是在 `mounted` 里创建的，此时创建的DOM，vue不会帮 `swiper` 的`pagination` 加上 `scoped` 自定义属性。

