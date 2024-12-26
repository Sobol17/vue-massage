<script setup>
import {RouterLink, RouterView, useRoute} from 'vue-router'
import Header from "@/components/Header.vue";
const route = useRoute()
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
  height: 90vh;
  margin: 0 auto;
}
</style>
