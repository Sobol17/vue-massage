<script setup>
import IconArrowRight from "@/components/icons/IconArrowRight.vue";
import {useOfficeStore} from "@/stores/office.js";
import {useRouter} from "vue-router";
import Loader from "@/components/UI/Loader.vue";
import {ref} from "vue";
import {useCartStore} from "@/stores/cart.js";

const officeStore = useOfficeStore()
const cartStore = useCartStore()
const router = useRouter()
const props = defineProps({
  office: Object
})

const loading = ref(false);

const setActiveOffice = () => {
  loading.value = true;
  cartStore.clearCart()
  setTimeout(() => {
    officeStore.changeOffice(props.office)
    router.push('/')
    loading.value = false;
  }, 300)
}
</script>

<template>
<div @click="setActiveOffice" class="rounded-[8px] overflow-hidden cursor-pointer card-shadow">
  <img :src="office.img" class="w-full h-[227px]" alt="">
  <div class="flex justify-between items-center bg-white w-full p-3">
    <div>
      <p class="text-body-m-regular uppercase">{{office.title}}</p>
      <p class="text-body-m-regular text-neutral-500">{{office.address}}</p>
    </div>
    <IconArrowRight bg/>
  </div>

  <teleport to="body">
    <Loader v-if="loading" />
  </teleport>
</div>
</template>

<style scoped>
.card-shadow {
  box-shadow: 0 4px 8px #292b330d;
}
</style>