<template>
  <div v-if="isVisible" class="loader-overlay">
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: {
    isVisible: { type: Boolean, required: true }
  }
};
</script>

<style lang="scss">
.loader-overlay {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
}
</style>
