<script setup>
import Breadcrumb from "@/components/Breadcrumb.vue";
import AppRadio from "@/components/UI/AppRadio.vue";
import IconService from "@/components/icons/IconService.vue";
import {ref} from "vue";
import SpecialistCard from "@/components/SpecialistCard.vue";
import {useSpecialistsStore} from "@/stores/specialists.js";

const check = ref(false)

const specialistsStore = useSpecialistsStore()

</script>

<template>
<main>
  <div class="bg-white p-4">
    <Breadcrumb />

    <h1 class="text-headline mt-4">Выбрать специалиста</h1>

    <div @click="check = true" class="flex items-center gap-x-3 mt-6 cursor-pointer">
      <div class="flex items-center justify-center rounded-full size-[48px] bg-neutral-200">
        <IconService />
      </div>
      <p class="text-body-m-regular flex-grow">Любой специалист</p>
      <AppRadio
        v-model="check"
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
        :selected="specialist.selected"
        @setActiveDate="specialistsStore.changeActiveDate"
        @selectSpecialist="specialistsStore.selectSpecialist"
      />
    </div>
  </div>
</main>
</template>

<style scoped>

</style>