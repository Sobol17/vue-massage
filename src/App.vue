<script setup>
import {RouterLink, RouterView, useRoute} from 'vue-router'
import {onMounted} from "vue";

</script>

<template>
  <div class="app-wrapper">
    <RouterView />
  </div>
</template>

<style scoped>
.app-wrapper {
  display: block;
  max-width: 600px;
  min-height: 100vh;
  height: 100%;
  margin: 0 auto;
}
</style>
