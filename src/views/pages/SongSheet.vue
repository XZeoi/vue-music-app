<template>
  <div class="song-sheet">
    歌单
  </div>
</template>

<script>
import { getMusicSheetDetails } from "network/recommend"
export default {
  created() {
    this.songSheetFetch();
    console.log(sadsda)
  },
  methods: {
    async songSheetFetch() {
      console.log(11)
      const data = await getMusicSheetDetails(this.$route.params.id);
      console.log('songSheet', data)
    }
  }

}
</script>

<style>

</style>