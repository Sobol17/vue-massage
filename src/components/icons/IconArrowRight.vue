<script setup>
defineProps({
  bg: Boolean,
  md: Boolean,
  sm: Boolean,
})
</script>

<template>

  <div>
    <svg v-if="bg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.71568 20.7144L16.2871 12.1429L7.71568 3.5715" stroke="#333333" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    <svg v-if="md" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 14L11 8L5 2" stroke="#333333" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    <svg v-if="sm" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.5 11L8.5 6L3.5 1" stroke="#333333" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>

</template>

<style scoped>

</style>