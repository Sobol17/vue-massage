<script setup>
defineProps({
  title: String,
  active: Boolean
})
</script>

<template>
  <div
    :class="[
      'flex items-center justify-center rounded-full w-[72px] h-[40px] cursor-pointer transition-colors'
      , active ? 'bg-green-dark text-white' : 'bg-neutral-200'
     ]"
  >
    <p class="text-body-s-medium">{{title}}</p>
  </div>
</template>

<style scoped>

</style>