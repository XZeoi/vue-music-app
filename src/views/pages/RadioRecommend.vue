<template>
  <div class="radio-recommend">
    radio
  </div>
</template>

<script>
import { getRadioRecommendList } from "network/recommend"

export default {
  created() {
    this.radioRecommendFetch();
  },
  methods: {
    async radioRecommendFetch() {
      const data = await getRadioRecommendList();
      console.log(data)
    }
  }
}
</script>

<style>

</style>