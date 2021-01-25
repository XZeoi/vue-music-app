<template>
  <div class="nav-bar d-flex pt-4 pb-2 bg-white">
    <div class="nav-title d-flex flex-1 jc-around ml-5 mr-7">
      <!-- :class="{'selected-left': selectedId === index} -->
      <div   
      @click="titleClick(index, $event)"
      v-for="(item, index) in navTitle"
      :key="index"
      :ref="item.name"
      >{{item.title}}</div>
    </div>
    <div class="nav-search iconfont icon-search ml-5 mr-4">

    </div>
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
      selectedId: 0,
      preIndex: 0
    }
  },
  methods: {
    titleClick(index, event) {
        // console.log(event.target)
      //  if(this.selectedId = index ) {
      //   return 
      // } else 
      // event.target.className = "selected-left"
    console.log(this.selectedId, index)

    if(this.selectedId < index) {
      event.target.className = "selected-right"
      switch (this.selectedId) {
        case 0: 
          this.$refs.library[0].className = 'unSelected-left';
          console.log('0-<',this.$refs.library[0].className)
          break;
        case 1: 
          this.$refs.recommend[0].className = 'unSelected-left';
          console.log('1-<',this.$refs.recommend[0].className)

          break;
        case 2: 
          this.$refs.video[0].className = 'unSelected-left';
          console.log('2-<',this.$refs.video[0].className)

          break;
        case 3: 
          this.$refs.point[0].className = 'unSelected-left';
          console.log('3-<',this.$refs.point[0].className)

          break;
        default:
          console.log('-<end')
      }
      
    } else if (this.selectedId > index) {
      event.target.className = "selected-left"
       switch (this.selectedId) {
        case 0: 
          this.$refs.library[0].className = 'unSelected-right';
          console.log('0->',this.$refs.library[0].className)
          break;
        case 1: 
          this.$refs.recommend[0].className = 'unSelected-right';
          console.log('1->',this.$refs.recommend[0].className)
          break;
        case 2: 
          this.$refs.video[0].className = 'unSelected-right';
          console.log('2->',this.$refs.video[0].className)
          break;
        case 3: 
          this.$refs.point[0].className = 'unSelected-right';
          console.log('3->',this.$refs.point[0].className)
          break;
           default:
          console.log('->end')
      }
    }


    //  if (this.selectedId > index || this.index === 0) {
    //     event.target.className = "selected-left"
    //     console.log(event.target.className)
    //   } else if (this.selectedId < index || this.index === 3) {
    //     event.target.className = "selected-right"
    //     console.log(event.target.className)
    //   }
      this.selectedId = index
    console.log(this.selectedId, index)

      
      // console.log(this.selectedId)
    }
  }
}
</script>

<style scoped>
.nav-title div {
  transition: transform 2s;
}

.selected-left {
  
  transform: scale(2);
  transform-origin: 0 100%;
  /* transform-origin: left bottom; */
}

.selected-right {
  /* transition: transform 2s; */
  transform: scale(2);
  transform-origin: 100% 100%;
  /* transform-origin: right bottom; */
}

.unSelected-left {
  /* transition: transform 2s; */
  transform: scale(1);
  transform-origin: 0 100%;
}

.unSelected-right {
  /* transition: transform 2s; */
  transform: scale(1);
  transform-origin: 100% 100%;
}
</style>