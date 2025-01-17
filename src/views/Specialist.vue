<script setup>
import Breadcrumb from "@/components/Breadcrumb.vue";
import AppRadio from "@/components/UI/AppRadio.vue";
import IconService from "@/components/icons/IconService.vue";
import SpecialistCard from "@/components/SpecialistCard.vue";
import {useSpecialistsStore} from "@/stores/specialists.js";
import FixedBasket from "@/components/FixedBasket.vue";
import {useCartStore} from "@/stores/cart.js";
import AppButton from "@/components/UI/AppButton.vue";
import {useRoute, useRouter} from "vue-router";
import {onMounted} from "vue";
import Loader from "@/components/UI/Loader.vue";
import {useI18n} from "vue-i18n";
import {useOfficeStore} from "@/stores/office.js";


const specialistsStore = useSpecialistsStore()
const cartStore = useCartStore()
const officeStore = useOfficeStore()
const route = useRoute()

const router = useRouter()
const {t, locale} = useI18n();

onMounted(() => {
  specialistsStore.getSpecialists({
    branchId: officeStore.activeOffice?.id,
    date: route.query.date,
    time: route.query.time,
    locale: route.params.locale,
    serviceIds: route.query.serviceIds
  })
  locale.value = route.params.locale
})
</script>

<template>
<main class="bg-white h-[100vh] relative">
  <div class="p-4">
    <Breadcrumb />

    <h1 v-if="specialistsStore.specialists.length !== 0" class="text-headline mt-4">{{ $t('specialist_headline') }}</h1>

    <div v-if="specialistsStore.specialists.length !== 0" @click="check = true" class="flex items-center gap-x-3 mt-6 cursor-pointer">
      <div class="flex items-center justify-center rounded-full size-[48px] bg-neutral-200">
        <IconService />
      </div>
      <p class="text-body-m-regular flex-grow">{{ $t('specialist_any') }}</p>
      <AppRadio
        :value="{
          id: 0,
        }"
        name="spec"
        v-model="cartStore.chosenSpecialist"
      />
    </div>

    <div v-if="!specialistsStore.isLoading" class="flex flex-col mt-6 gap-y-10">
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

    <div class="text-headline mt-[80px]" v-if="specialistsStore.specialists.length === 0 && !specialistsStore.isLoading">
      {{ $t('specialist_not_found') }}
    </div>

  </div>

  <FixedBasket
    v-if="cartStore.serviceInBasketCount > 0 && cartStore.chosenSpecialist.id !== null"
  />

  <div v-if="cartStore.chosenSpecialist.id !== null && cartStore.serviceInBasketCount === 0 && cartStore.chosenDate !== null" class="mt-4 absolute bottom-6 left-4 right-4">
    <AppButton
      :text="locale === 'ru' ? 'Выбрать услугу' : 'Select service'"
      @click="router.push(
        {
          name: 'services',
          query: {
            specialist: cartStore.chosenSpecialist.id,
            date: cartStore.chosenDate,
            time: cartStore.chosenTime
          }
        }
      )"
      class="w-full"
    />
  </div>

  <div v-if="cartStore.chosenSpecialist.id !== null && cartStore.serviceInBasketCount === 0 && cartStore.chosenDate === null" class="mt-4 absolute bottom-6 left-4 right-4">
    <AppButton
      :text="$t('home_date')"
      @click="router.push(
        {
          name: 'dates',
          query: {
            specialist: cartStore.chosenSpecialist.id
          }
        }
      )"
      class="w-full"
    />
  </div>

  <teleport to="body">
    <Loader v-if="specialistsStore.isLoading" />
  </teleport>

</main>
</template>

<style scoped>

</style>