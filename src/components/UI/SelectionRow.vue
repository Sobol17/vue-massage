<script setup>
import IconAccount from "@/components/icons/IconAccount.vue";
import IconArrowRight from "@/components/icons/IconArrowRight.vue";

defineProps({
  title: String,
  link: [Object, String],
})
</script>

<template>
<RouterLink :to="link" class="flex items-center gap-x-3">

  <div class="flex items-center justify-center rounded-full size-[48px] bg-neutral-200">
    <slot></slot>
  </div>

  <p class="text-body-m-regular flex-grow">{{ title }}</p>

  <IconArrowRight class="ml-auto" md/>
</RouterLink>
</template>

<style scoped>

</style>