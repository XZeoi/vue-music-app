<template>
  <div class="card">
    <div class="card-nav">
      <div class="card-title">
        {{title}}
      </div>
      <div class="card-more">
        <div>更多</div>
      </div>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.card {
  box-sizing: border-box;
  padding: 18px 18px 0 18px;
  
}
.card-nav {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.card-title {
  font-size: 20px;
  font-weight: 500;
}

.card-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 18px;
}
</style>