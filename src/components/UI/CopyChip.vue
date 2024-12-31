<script setup>

import IconCheck from "@/components/icons/IconCheck.vue";
</script>

<template>
<div class="inline-flex justify-center gap-x-3 bg-black-300 p-3 w-[60%] rounded-[8px] absolute top-6 left-1/2 -translate-x-1/2 z-[12]">
  <div class="rounded-full bg-green size-6 flex items-center justify-center">
    <IconCheck class="text-white size-4" />
  </div>
  <p class="text-white">Ссылка скопирована в буфер обмена</p>
</div>
</template>

<style scoped>

</style>