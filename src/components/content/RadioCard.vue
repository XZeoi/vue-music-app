<template>
  <div class="radio-card">
    <div class="up">
      <div class="image">
        <img :src="radio.picUrl" alt="">
      </div>
      <div class="text">
        <div class="title">{{radio.name}}</div>
        <div class="author-info">
          <img :src="radio.program.dj.avatarUrl" alt="">
          <span>{{radio.program.dj.nickname}}</span>
        </div>
      </div>
    </div>
    <div class="info">{{radio.copywriter}}</div>
  </div>
</template>

<script>
export default {
  props: {
    radio: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped lang="scss">
.radio-card {
  margin: 0 20px 30px 20px;
  padding: 5px 10px;
  box-shadow: 0px 0px 6px #ccc;

  .up {
    display: flex;


    img {
      vertical-align: middle;
      width: 54px;
    }
    .text {
      width: 100%;
      padding-left: 10px;
      .title {
        width: 200px;
        overflow: hidden; 
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .author-info {
        display: flex;
        align-items: center;
        padding: 8px 0px;

        img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          margin-right: 5px;
        }
      }
    }
  }

  .info {
    color: #999;
    border-top: 1px solid #eee;
    padding: 2px 0;
    margin-top: 6px 
  }
  
}

</style>