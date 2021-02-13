<template>
  <div class="music-rank">
    <tool-bar title="排行榜" topic="音乐榜单"  />
    <rank-card :data="data1[0]" class="card1"></rank-card>
    <rank-card :data="data1[1]"></rank-card>
    <rank-card :data="data1[2]"></rank-card>
    <rank-card :data="data1[3]"></rank-card>
  </div>
</template>

<script>
import ToolBar from "common/ToolBar.vue"
import RankCard from "content/RankCard.vue"

import { getMusicRankList } from "network/recommend"
import { getMusicSheetDetails } from "network/recommend"

export default {
  components: {
    ToolBar, RankCard
  },
  data() {
    return {
      data1: []
    }
  },
  created() {
    this.musicRankFetch();
    this.musicSheetDetalsFetch();
  },
  methods: {
    async musicRankFetch() {
      const { list } = await getMusicRankList();
      this.data1.push(list[0], list[1], list[2], list[3]) 
      console.log('paihangbang',list)
    },
    async musicSheetDetalsFetch() {
      const data = await getMusicSheetDetails(19723756);
      console.log('歌单详情',data)
    }
  }
}
</script>

<style scoped>
.card1 {

  margin-top: -30px;
}

</style>