<script setup>
import {ref, computed, watch, onMounted} from 'vue';
import IconArrowDown from "@/components/icons/IconArrowDown.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})

const isOpen = ref(true)
const content = ref(null)
const contentHeight = ref(0)

const setContentHeight = () => {
  if (content.value) {
    contentHeight.value = content.value.scrollHeight;
  }
}

watch(isOpen, () => {
  setContentHeight()
})

const contentStyle = computed(() => ({
  height: isOpen.value ? `${contentHeight.value}px` : '0px',
  overflow: 'hidden',
  transition: 'height 0.3s ease',
}))

const toggleAccordion = () => {
  isOpen.value = !isOpen.value;
}

onMounted(() => {
  setContentHeight();
});
</script>

<template>
<div>
  <div @click="toggleAccordion" class="w-full flex items-center justify-between cursor-pointer">
    <div class="text-body-m-medium text-neutral-500">{{title}}</div>
    <IconArrowDown md class="transition duration-300" :class="{'rotate-180': isOpen}" />
  </div>

  <div class="overflow-hidden" :style="contentStyle" ref="content">
    <div class="pb-4">
      <slot></slot>
    </div>
  </div>
</div>
</template>

<style scoped>
</style>