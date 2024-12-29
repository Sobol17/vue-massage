<script setup>
import {useServiceStore} from "@/stores/services.js";
import IconPen from "@/components/icons/IconPen.vue";
import AppButton from "@/components/UI/AppButton.vue";
import {numWord} from "@/utils/numWord.js";
import {computed, ref} from "vue";
import formatPrice from "../utils/formatPrice.js";
import formatTime from "../utils/formatTime.js";
import AppModal from "@/components/modals/AppModal.vue";
import IconCross from "@/components/icons/IconCross.vue";
import {useRouter} from "vue-router";
import {useCartStore} from "@/stores/cart.js";

const props = defineProps({
  btnLink: String
})

const router = useRouter()
const serviceStore = useServiceStore()
const cartStore = useCartStore()

const transformWord = computed(() => {
  return numWord(cartStore.serviceInBasketCount, ['услуга', 'услуги', 'услуг'])
})

const showModal = ref(false)
</script>

<template>
<div class="fixed bottom-0 w-full max-w-[600px] p-4 bg-white basket-shadow">
  <div class="flex">
    <div class="flex-grow flex gap-x-2 items-baseline">
      <span class="text-body-m-regular">{{ cartStore.serviceInBasketCount }} {{ transformWord }}</span>
      <span class="text-body-s-regular text-neutral-500">{{formatTime(cartStore.cartTotalTime)}}</span>
    </div>
    <div class="flex items-center gap-x-2">
      <span class="text-body-l-medium">{{ formatPrice(cartStore.cartTotalPrice) }}</span>
      <IconPen @click="showModal = true" class="size-5 text-neutral-500 cursor-pointer"/>
    </div>
  </div>
  <AppButton @click="router.push(cartStore.cartButtonInfo.link)" class="w-full mt-4" :text="cartStore.cartButtonInfo.title" />

  <teleport to="body">
    <AppModal
      v-if="showModal"
      title=""
      @close="showModal = false"
    >
      <div class="flex mt-6">
        <div class="flex-grow flex gap-x-2 items-baseline">
          <span class="text-body-m-regular">{{ cartStore.serviceInBasketCount }} {{ transformWord }}</span>
          <span class="text-body-s-regular text-neutral-500">{{formatTime(cartStore.cartTotalTime)}}</span>
        </div>
        <div class="text-body-l-bold">{{ formatPrice(cartStore.cartTotalPrice) }}</div>
      </div>

      <div class="flex flex-col gap-y-3 mt-3">
        <div
          class="flex gap-x-3 items-start"
          v-for="service in cartStore.chosenServices"
        >
          <div>
            <p>{{service.title}}</p>
            <p class="text-body-s-regular text-neutral-500">{{formatTime(service.time)}}</p>
          </div>
          <div class="text-body-m-medium ml-auto">{{formatPrice(service.price)}}</div>
          <IconCross @click="cartStore.removeServiceFromCart(service)" class="size-4 cursor-pointer text-neutral-500" />
        </div>
      </div>
    </AppModal>
  </teleport>
</div>

</template>

<style scoped>
.basket-shadow {
  box-shadow: 0 12px 48px #0613333d;
}
</style>