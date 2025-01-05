<script setup>
import Breadcrumb from "@/components/Breadcrumb.vue";
import AppRadio from "@/components/UI/AppRadio.vue";
import IconService from "@/components/icons/IconService.vue";
import SpecialistCard from "@/components/SpecialistCard.vue";
import {useSpecialistsStore} from "@/stores/specialists.js";
import FixedBasket from "@/components/FixedBasket.vue";
import {useCartStore} from "@/stores/cart.js";
import AppButton from "@/components/UI/AppButton.vue";
import {useRouter} from "vue-router";
import {onMounted} from "vue";


const specialistsStore = useSpecialistsStore()
const cartStore = useCartStore()

const router = useRouter()

onMounted(() => {
  specialistsStore.getSpecialists()
})
</script>

<template>
<main class="bg-white h-[100vh] relative">
  <div class="p-4">
    <Breadcrumb />

    <h1 class="text-headline mt-4">Выбрать специалиста</h1>

    <div @click="check = true" class="flex items-center gap-x-3 mt-6 cursor-pointer">
      <div class="flex items-center justify-center rounded-full size-[48px] bg-neutral-200">
        <IconService />
      </div>
      <p class="text-body-m-regular flex-grow">Любой специалист</p>
      <AppRadio
        value="any"
        name="spec"
        v-model="cartStore.chosenSpecialist"
        @update:modelValue="cartStore.chosenDate = null"
      />
    </div>

    <div class="flex flex-col mt-6 gap-y-10">
      <SpecialistCard
        v-for="specialist in specialistsStore.specialists"
        :id="specialist.id"
        :name="specialist.name"
        :prof="specialist.prof"
        :img="specialist.img"
        :reviews="specialist.reviews"
        :dates="specialist.dates"
        @setActiveDate=""
        @selectSpecialist=""
      />
    </div>
  </div>

  <FixedBasket
    btnLink="dates"
    v-if="cartStore.serviceInBasketCount > 0 && cartStore.chosenSpecialist.id !== null"
  />

  <div v-if="cartStore.chosenSpecialist.id !== null && cartStore.serviceInBasketCount === 0" class="mt-4 absolute bottom-6 left-4 right-4">
    <AppButton text="Выбрать услугу" @click="router.push('services')" class="w-full"/>
  </div>


</main>
</template>

<style scoped>

</style>