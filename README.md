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

     

3. 事件监听失效BUG：

   - **在轮播图上绑定click事件，点击第一张和最后一张无效。**
   - 原因：
     - 当设置 `loop: true` 时，swiper会自动复制第一个和最后一个页面进行轮播。但由于只复制页面没有复制点击事件，因此点击事件就会失效。
   - 解决办法：
     - 在 `<swiper :options="swiperOptions">` 中的`swiperOptions` 绑定数据中添加 `on`  属性，在 `on`  属性中定义函数，即为点击事件。
       - 可传入两个参数（均可选）
         - swiper：swiper组件实例
         - event：touchend事件

   ```vue
   <script>
   data() {
     swiperOptions: {
       on: {
         //传入一个参数时，为swiper
         click(swiper, event){
           console.log(swiper) //swiper：组件实例
           console.log(event)  //event：touchend事件
         }
       }
     }
   }
   </script>
   ```

   - **若要传入参数，例如recommend组件中banner轮播图中，需点击时传递所点击的音乐id**
     - 解决办法：给各项绑定自定义属性`data-*`
       - 首先在`<swiper-slide :data-ibanner="banner">` 动态绑定banner数据
       - **BUG**：**读取自定义属性`ibanner`时，读取为`[object, Object]`，无法正常读取banner**
         - 原因：由于banner是对象，在自定义属性`data-*`中都会把值`.toString()` 成字符串格式，若之后用`JSON.parse()` 转化为对象，会以下报错 **`Unexpected token o in JSON at position 1`**
         - 解决办法：
           - 在动态绑定banner时，先理由`JSON.stringify()`把banner对象转化为**JSON字符串**格式即可
           - 后续取出的时候再用`JSON.parse()` 转化为对象不会报错，可正常取出。
           - 具体代码如下：

```vue
<template>
	<swiper-slide v-for="(banner, index) in banners" :key="index" :data-banner="JSON.stringify(banner)">
    <img :src="banner.pic"/>
	</swiper-slide>
</template>
<script>
data() {
  return {
    swiperOptions: {
    	on: {
      	//传入一个参数时，为swiper
     	 click(swiper){
        let banner = JSON.parse(swiper.clickedSlide.dataset.banner)
       }
    	}
  	}
  }
}
</script>
```

- 注意点：
  - on 属性中函数中的 this 并非执行 vm 实例，而是指向 swiper 组件实例
  - 因此需要在 `data(){}` 中定义 thi s指向

```vue
<script>
  data() {
    let that = this;
    return {
      swiperOptions: {
    	on: {
      	//传入一个参数时，为swiper
     	 click(swiper){
        let banner = JSON.parse(swiper.clickedSlide.dataset.banner)
        that.$router.push({name: 'MusicPlayer', params: {id: banner.song.id}})
       }
    	}
  	}
    }
  }
</script>
```

### MusicPlayer 页面

- 退出时，播放不会停止，且退到上一次的页面

```
一开始将MusicPlayer播放页面作为一个路由进行展示，发现只要退出该路由，组件即被销毁，播放停止。显然这不是我们想要的结果。
```

- 因此，MusicPlayer页面只能当成组件放在项目中，通过根据播放歌曲列表的长度来控制该页面的显示。
- 所有的数据都应该放入 vuex 中进行共享；

BUG1：

- 我们设置了一个公共状态 fullScreen，默认值为false，用于控制播放页面的显示。
- 我们需要通过 Mutation 来改变 fullScreen的状态。
- 在 Mutation 中操作时，遇到一个问题：
  - 我们开始的时候通过解构将fullScreen 从 state中解构出来；
  - 但是发现，在Mutation中修改解构出来的fullScreen是无法本质上修改state中的fullScreen，这是因为解构出来的是一个新的变量，只是把state中的fullScreen的状态重新赋值给解构后的fullScreen，而且fullScreen是非引用型数据，因此这里需要注意解构带来的不确定性。
  - 结论：这里fullScreen不能解构，只可按照正常的state.fullScreen方法修改

