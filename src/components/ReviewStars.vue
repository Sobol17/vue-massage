<script setup>
import IconStar from "@/components/icons/IconStar.vue";

defineProps({
  count: Number
})
</script>

<template>
  <div class="flex items-center">
    <IconStar
      v-for="i in 5"
      :key="i"
      :class="i <= count ? 'text-yellow' : 'text-neutral-300'"
    />
  </div>
</template>

<style scoped>

</style>