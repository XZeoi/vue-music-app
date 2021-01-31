<template>
  <div>
    <div class="tab-bar">
        <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activedColor: {
      type: String,
      default: "#ff3f00",
    },
    value: {}
  }
};
</script>

<style scoped>
.tab-bar {
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  /* background: rgba(0,0,0,.35); */
  background-color: rgba(255, 255, 255,0.95);
  height: 49px;
  border-top: 1px solid #ccc;
}
/* .layer {
  height: 100%;
  background: rgba(0,0,0,.35);
  /* filter: blur(5px); */
/* } */ 
</style>