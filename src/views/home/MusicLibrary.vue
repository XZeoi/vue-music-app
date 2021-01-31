<template>
  <div class="music-library">
    <banner-slide
      class="slide-container"
      @touchstart.native="touch"
      @touchmove.native="touch"
      @touchend.native="touch"
    >
      <banner-item ref="item0" :banner="banners[0]" class="item0">
        <banner-item ref="item1" :banner="banners[1]" class="item1">
          <banner-item ref="item2" :banner="banners[2]" class="item2">
            <banner-item ref="item3" :banner="banners[3]" class="item3">
            </banner-item>
          </banner-item>
        </banner-item>
      </banner-item>
    </banner-slide>
    <!-- <banner-slide>
      <banner-item 
      v-for="(banner, index) in banners"
      :key="index"
      :banner="banner"
      ></banner-item>
    </banner-slide> -->
  </div>
</template>

<script>
import BannerSlide from "content/bannerslidecopy/BannerSlide";
import BannerItem from "content/bannerslidecopy/BannerItem";

import { getBanners } from "network/musiclibrary";

export default {
  components: { BannerSlide, BannerItem },
  data() {
    return {
      banners: [],

      x01: 0,
      x02: 0,
      x03: 0,
      x1: 0,
      r: [],
      min: [],
      offsetLeft0: 0,
      offsetLeft1: 0,
      clientWidth: 0,
      d3: 0,
      d2: 0
    };
  },
  created() {
    this.bannersFetch();
  },
  methods: {
    async bannersFetch() {
      const { playlists: data } = await getBanners(10);
      this.banners = data;
      // console.log(data);
    },

    touch(event) {
      // console.log(event)
      switch (event.type) {
        case "touchstart":
          this.r = []

          // 获取 item 元素的宽度   
          this.clientWidth = this.$refs.item2.$el.clientWidth;
          // console.log('width',this.$refs.item3.$el)

          this.x01 = event.touches[0].pageX;
          this.x02 = this.x01 + this.clientWidth * 0.3 
          

          // 设置最小偏移距离
          this.min = [this.clientWidth*0.1, this.clientWidth*0.2, this.clientWidth*0.3]
          // console.log(this.min)

          // 获取 3 个 item 元素的 offsetRight; 最后一个(即 0)不需要考虑；
          for(let i=1; i<4; i++) {
            this.r.push(this.$refs[`item${i}`].$el.offsetLeft)
          }

          // console.log('r',this.r)

          break;
        case "touchmove":
          this.x1 = event.touches[0].pageX;
          let distance = this.x1 - this.x01;

          // 当向左滑动时
          if(distance <= 0) {
            
            let newR = this.r.map(i => Math.abs(i))
            // 当所有 item 偏移量处于临界状态时
            if( newR.every(i => i === this.clientWidth) ) {
              // console.log('+')
              return
            } else  {
              // console.log('-')          
                  if(this.min[2] <= Math.abs(this.$refs.item3.$el.offsetLeft) && Math.abs(this.$refs.item3.$el.offsetLeft) < this.clientWidth ) {
                    this.d3 = this.x1 - this.x01 + this.r[2]
                    this.move(this.$refs.item3.$el, this.d3)
                    // console.log('3',this.$refs.item3.$el.offsetLeft)  
                  } else if(this.min[1] <= Math.abs(this.$refs.item2.$el.offsetLeft) && Math.abs(this.$refs.item2.$el.offsetLeft) < this.clientWidth) {
                    // this.x0 = event.touches[0].pageX
                    this.d2 = this.x1 - (this.d3 + this.x01 -this.r[2]) + this.r[1] 
                    this.move(this.$refs.item2.$el, this.d2)
                    // console.log('2',this.$refs.item2.$el.offsetLeft)  
                  } else if(this.min[0] <= Math.abs(this.$refs.item1.$el.offsetLeft) && Math.abs(this.$refs.item1.$el.offsetLeft) < this.clientWidth) {
                    // this.x0 = event.touches[0].pageX
                    let d = this.x1 - (this.d2+(this.d3 + this.x01 - this.r[2]) -this.r[1]) + this.r[0] 
                    this.move(this.$refs.item1.$el, d)
                    // console.log('1',this.$refs.item1.$el.offsetLeft)  
                  }  
            } 
            // else {
            //   console.log('#')
            //   if (newR.toString() === this.min.toString())
            // }            
          }
          break;
        case "touchend":
          break;
      }
    },
    move(el, moveDistance) {
      el.style.left = moveDistance + 'px';
    }
  },
};
</script>

<style scoped lang="scss">
.music-library {
  margin-top: 55.5px;

  .slide-container {
    position: relative;
    
  }

  .item0 {
    position: absolute;
    left: 60vw;
  }

  .item1 {
    position: absolute;
    left: calc(-40vw*0.1);
  }

  .item2 {
    position: absolute;
    left: calc(-40vw*0.2);
  }

  .item3 {
    position: absolute;
    left: calc(-40vw*0.3);
  }
}
</style>