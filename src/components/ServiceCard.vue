<script setup>
import {computed, ref} from "vue";
import AppCheckbox from "@/components/UI/AppCheckbox.vue";
import {useServiceStore} from "@/stores/services.js";
import formatPrice from "../utils/formatPrice.js";
import formatTime from "../utils/formatTime.js";
import {useCartStore} from "@/stores/cart.js";

const serviceStore = useServiceStore()
const cartStore = useCartStore()

const props = defineProps({
  id: Number,
  img: String,
  title: String,
  description: String,
  time: Number,
  price: Number,
  selected: Boolean
})

const selected = computed(() => {
  return cartStore.chosenServices.some(item => item.id === props.id)
})

const opened = ref(false);
</script>

<template>
<div class="cursor-pointer" @click="cartStore.addServiceToCart(props)">
  <img
    class="w-full object-cover h-[240px] rounded-[16px] mb-3"
    :src="img"
    alt=""
  >
  <div class="flex items-start justify-between gap-x-3">
    <div>
      <div class="text-body-m-regular mb-1">{{title}}</div>
    </div>
    <AppCheckbox
      v-model="selected"
      @update:modelValue="cartStore.addServiceToCart(props)"
    />
  </div>

  <div class="text-body-m-medium">{{formatPrice(price)}}</div>
</div>
</template>

<style scoped>

</style>