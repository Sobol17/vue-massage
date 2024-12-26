<script setup>
import {computed} from "vue";

const props = defineProps({
  time: String,
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const isActive = computed(() => props.time === props.modelValue);

const selectTime = () => {
  emit('update:modelValue', props.time);
};
</script>

<template>
  <div
    :class="[
      'rounded-full flex-grow p-3 text-center cursor-pointer transition-all',
      isActive ? 'bg-green-dark text-white' : 'bg-neutral-200 hover:bg-neutral-300'
    ]"
    @click="selectTime"
  >{{time}}</div>
</template>

<style scoped>

</style>