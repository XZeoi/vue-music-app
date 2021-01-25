<template>
  <div class="tab-bar-item" @click="itemClick" :style="{ color: activedColor }">
    <div :class="icon" class="icon-part" >
      
    </div>
    <div class="text-class">
      {{title}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String
    },
    title: {
      type: String
    },
    name: {
      type: [String, Number],
      default: 0
    },
    to: {
      type: String
    }
  },
  data() {
    return {
      currentName: 0
    }
  },
  computed: {
    activedColor() {
      return this.$parent.value === this.name ? '#ff3f00' : '#000'
    }
  },
  methods: {
    itemClick() {
      this.$parent.$emit('input', this.name)
      // this.currentName = this.name
      this.$router.push(this.to)
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  text-align: center;
}
.icon-part {
  font-size: 24px;
  margin-bottom: 3px;
}
.text-class {
  font-size: 10px;
}
</style>