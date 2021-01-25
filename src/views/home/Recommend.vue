<template>
  <div>
    <swiper/>
  </div>
</template>

<script>
import { getBanner } from 'network/recommend.js'

import Swiper from 'common/Swiper'

export default {
  components: {
    Swiper
  },
  created() {
    this.bannerFetch()
  },
  methods: {
    async bannerFetch() {
      const data = await getBanner(2)
      console.log(data)
    }
  }
}
</script>

<style>

</style>