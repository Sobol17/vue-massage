<script setup>
defineProps({
  bg: Boolean,
  md: Boolean,
  sm: Boolean,
})
</script>

<template>

  <svg v-if="bg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.2872 19.7144L7.71582 11.1429L16.2872 2.5715" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

  <svg v-if="md" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 14L5 8L11 2" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

</template>

<style scoped>

</style>