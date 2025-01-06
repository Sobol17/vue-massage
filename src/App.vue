<script setup>
import {RouterLink, RouterView, useRoute} from 'vue-router'
import Header from "@/components/Header.vue";
import {useOfficeStore} from "@/stores/office.js";
import {onMounted} from "vue";

const officeStore = useOfficeStore()

onMounted(() => {
  officeStore.getOffices();
})
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
