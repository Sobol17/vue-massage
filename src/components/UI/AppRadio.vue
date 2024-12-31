<script setup>
import { onMounted, ref } from "vue";
import IconRadio from "@/components/icons/IconRadio.vue";
import random_alpha_numeric from "@/utils/random_alpha_numeric.js";

const id = ref();

const emits = defineEmits(['update:modelValue']);

const props = defineProps({
  name: String,
  value: [String, Boolean, Number, Object],
  modelValue: {
    type: [String, Number, Boolean, Object, Array],
    default: null,
  },
  disabled: Boolean,
  sm: Boolean,
  label: Boolean
});

function handleCheckboxChange(event) {
  emits('update:modelValue', props.value);
}

onMounted(() => {
  id.value = random_alpha_numeric(15);
});
</script>

<template>
  <label :for="id" class="response__form-label">
    <input
      type="radio"
      :id="id"
      :value="props.value"
      :disabled="props.disabled"
      class="response__form-checkbox"
      :name="props.name"
      :checked="props.modelValue === props.value"
      @change="handleCheckboxChange"
    >
    <span class="response__form-checkbox-view response__form-checkbox-personalData">
      <icon-radio class="response__form-checkbox-icon"/>
    </span>
    <p v-if="label" class="response__form-text">{{ props.name }}</p>
  </label>
</template>
<style scoped>
.response__form-checkbox {
  position: absolute;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.response__form-label {
  @apply cursor-pointer flex items-center;
}

.response__form-checkbox-view {
  @apply flex items-center mr-2.5 border border-solid border-neutral-300 rounded-[20px] justify-center bg-white transition-all duration-300 w-[24px] h-[24px];
}

.response__form-text {
  @apply text-body-m-regular
}

.response__form-checkbox-icon {
  @apply opacity-0 transition-all duration-300
}

.response__form-checkbox:checked + .response__form-checkbox-view .response__form-checkbox-icon {
  @apply opacity-100 border-none
}

.response__form-checkbox:checked + .response__form-checkbox-view {
  @apply bg-green rounded-full
}
</style>