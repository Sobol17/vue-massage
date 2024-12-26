<script setup>
import {computed, useSlots} from 'vue';
const emits = defineEmits(['click']);
const props = defineProps({
  text: {
    type: String,
    required: true,
    default: 'Кнопка',
  },
  type: {
    type: String,
    default: 'button',
  },
  disabled: Boolean,
  sm: Boolean,
  big: Boolean,
  gold: Boolean,
  transparent: Boolean,
  no_border: Boolean,
});
const classObject = computed(() => {
  return {
    sm: props.sm,
    big: props.big,
    transparent: props.transparent,
    gold: props.gold,
    no_border: props.no_border,
  };
});
const slots = useSlots()
const hasSlots = computed(()=>!!slots.default)
</script>

<template>
  <button :type="type" :disabled="disabled" class="button" :class="classObject" @click="emits('click')">
    <div class="h-6 max-w-6 flex items-center" v-if="hasSlots">
      <slot></slot>
    </div>
    {{ text }}
  </button>
</template>

<style scoped>
.button {
  @apply text-button text-white bg-green px-5 h-[52px] rounded-[15px] flex flex-row items-center justify-center gap-x-1 hover:bg-green-dark transition-colors active:bg-green-dark disabled:bg-neutral-300 disabled:text-neutral-500;
}

.button:disabled {
  @apply cursor-not-allowed;
}

.transparent {
  background-color: transparent;
  color: #494949;
  border: 1px solid #adadad;
}

.transparent:hover {
  background-color: #ededed;
}

.transparent:active {
  background-color: #e3e3e3;
}

.transparent:disabled {
  color: #adadad;
}

.gold {
  background-color: #BBAB70 !important;
}

.no_border {
  border: none !important;
}
</style>