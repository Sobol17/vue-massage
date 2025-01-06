<script setup>
const props = defineProps({
  image: String
})
</script>

<template>
<div class="rounded-full flex-shrink-0 overflow-hidden">
  <img :src="image" alt="">
</div>
</template>

<style scoped>

</style>