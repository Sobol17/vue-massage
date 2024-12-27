<script setup>
import {computed, ref} from "vue";
import AppCheckbox from "@/components/UI/AppCheckbox.vue";
import {useServiceStore} from "@/stores/services.js";

const serviceStore = useServiceStore()

const props = defineProps({
  id: Number,
  img: String,
  title: String,
  description: String,
  time: String,
  price: String,
  selected: Boolean
})

const selected = computed(() => {
  return serviceStore.chosenServices.some(item => item.id === props.id)
})

const selectService = () => {
  if (serviceStore.chosenServices.includes(props)) {
    serviceStore.chosenServices = serviceStore.chosenServices.filter(item => item.id !== props.id)
  } else {
    serviceStore.chosenServices.push(props);
  }
}

const opened = ref(false);
</script>

<template>
<div class="cursor-pointer" @click="selectService">
  <img
    class="w-full object-cover h-[240px] rounded-[16px] mb-3"
    :src="img"
    alt=""
  >
  <div class="flex items-start gap-x-3">
    <div>
      <div class="text-body-m-regular mb-1">{{title}}</div>
      <div class="flex items-start gap-x-2 text-body-s-regular text-neutral-500 mb-2 pr-6">
        <div
          :class="[ 'text-ellipsis overflow-hidden', opened ? 'line-clamp-100' : 'line-clamp-1']"
        >{{time}} · {{description}}</div>
        <span
          v-if="!opened"
          @click="opened = !opened"
          class="cursor-pointer whitespace-nowrap text-body-s-medium"
        >ещё</span>
      </div>
    </div>
    <AppCheckbox
      v-model="selected"
      @update:modelValue="selectService"
    />
  </div>

  <div class="text-body-m-medium">{{price}}</div>
</div>
</template>

<style scoped>

</style>