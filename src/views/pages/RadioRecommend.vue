<template>
  <div class="radio-recommend">  
    <tool-bar title="电台推荐"></tool-bar>
    <radio-card :radio="item" v-for="item in data" :key="item.id"></radio-card>
  </div>
</template>

<script>
import { getRadioRecommendList } from "network/recommend"

import ToolBar from "common/ToolBar"
import RadioCard from "content/RadioCard"


export default {
  components: {
    ToolBar,
    RadioCard
  },
  data() {
    return {
      data: []
    }
  },
  created() {
    this.radioRecommendFetch();
  },
  methods: {
    async radioRecommendFetch() {
      const {result: data} = await getRadioRecommendList();
      this.data = data
      console.log(data)
    }
  }
}
</script>

<style scoped lang="scss">
.radio-recommend {
  

}


</style>