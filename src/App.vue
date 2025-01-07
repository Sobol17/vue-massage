<script setup>
import {RouterLink, RouterView, useRoute} from 'vue-router'
import {useLangStore} from "@/stores/lang.js";
import {onMounted} from "vue";

const langStore = useLangStore()
onMounted(() => {
  langStore.initLocale();
});
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
