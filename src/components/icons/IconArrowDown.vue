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
      <path d="M20.5723 7.85728L12.0008 16.4287L3.42941 7.85728" stroke="#333333" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    <svg v-if="md" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 5L8 11L2 5" stroke="#333333" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    <svg v-if="sm" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 3.5L6 8.5L0.999999 3.5" stroke="#333333" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>

</template>

<style scoped>

</style>