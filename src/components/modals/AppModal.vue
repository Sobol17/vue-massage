<script setup>
import IconCross from "@/components/icons/IconCross.vue";

defineEmits(['close', 'confirm']);
defineProps({
  title: String,
  cancelText: String,
  confirmText: String,
});
</script>

<template>
  <div class="modal" @click.self="$emit('close')">
    <div class="w-full p-6 bg-white max-w-[415px] rounded-xl relative">
      <h4 class="text-h4 text-center mb-1">{{ title }}</h4>
      <slot></slot>
      <button @click="$emit('close')" class="absolute top-0 right-0 p-4">
        <IconCross />
      </button>
    </div>
  </div>
</template>

<style scoped>
.modal {
  @apply fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50;
}
</style>
