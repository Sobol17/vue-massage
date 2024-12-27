<script setup>
import {ref} from "vue";

defineProps({
  title: String,
})

const active = ref(false)
</script>

<template>
  <a
    @click="active = !active"
    :class="[
      'chip'
      , active ? 'bg-green-dark text-white' : 'bg-neutral-200'
     ]"
    :href="`#${title}`"
  >
    {{title}}
  </a>
</template>

<style scoped>
.chip {
  @apply block p-[10px] rounded-full cursor-pointer transition-colors max-w-[275px]
  whitespace-nowrap overflow-hidden text-ellipsis text-body-s-regular min-w-[48px];
}
</style>