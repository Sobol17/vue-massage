<script setup>
import {onMounted, watch} from "vue";
import IconSearch from "@/components/icons/IconSearch.vue";

const emits = defineEmits(['update:modelValue', 'button-click']);
const props = defineProps({
  buttonText: String,
  label: String,
  placeholder: String,
  modelValue: {
    type: [String, Number, Boolean],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  name: {
    type: String,
    required: true,
  },
  disabled: Boolean,
  search: Boolean,
});
</script>

<template>
  <div class="input-wrapper">
    <div class="input">
      <IconSearch v-if="search" class="text-neutral-500 absolute top-1/2 right-3 -translate-y-1/2" />
      <!--  НЕ УБИРАТЬ placeholder=" "  -->
      <input
        :type="type"
        placeholder=" "
        :name="name"
        v-model="value"
        :disabled="disabled"
        @input="$emit('update:modelValue', value)"
      />
      <label :for="id" class="input__label">{{ placeholder }}</label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-wrapper {
  display: block;
  position: relative;
}

.input__label {
  font-size: 16px;
  color: #858585;
  position: absolute;
  top: 14px;
  left: 16px;
  transition: 0.3s;
  cursor: text;
}

.input {
  position: relative;

  input {
    background-color: white;
    font-size: 16px;
    border: 1px solid #CFD7DB;
    padding: 16px;
    border-radius: 10px;
    outline: none;
    width: 100%;
    height: 50px;
    color: #0c0c0d;
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      appearance: none;
      margin: 0;
    }

    &:focus + .input__label {
      top: 5px;
      z-index: 10;
      font-size: 0.75rem;
      font-weight: 500;
    }

    &:focus {
      padding-top: 25px;
      background-color: #fff;
      border: 1px solid #689675;
    }

    &:not(&:placeholder-shown) {
      padding-top: 25px;
      background-color: white;
    }

    &:not(&:placeholder-shown) + .input__label {
      top: 5px;
      z-index: 10;
      font-size: 0.75rem;
      font-weight: 500;
    }
  }
}
</style>
