<script setup>
import Breadcrumb from "@/components/Breadcrumb.vue";
import CategoryChip from "@/components/UI/CategoryChip.vue";
import ServiceCard from "@/components/ServiceCard.vue";
import {useServiceStore} from "@/stores/services.js";
import AppInput from "@/components/UI/AppInput.vue";
import FixedBasket from "@/components/FixedBasket.vue";
import {useCartStore} from "@/stores/cart.js";
import {onMounted} from "vue";
import {useOfficeStore} from "@/stores/office.js";

const serviceStore = useServiceStore()
const cartStore = useCartStore()
const officeStore = useOfficeStore()

onMounted(() => {
  serviceStore.getServices({
    specialistId: cartStore.chosenSpecialist.id,
    time: cartStore.chosenTime,
    date: cartStore.chosenDate,
    branchId: officeStore.activeOffice.id
  })
})
</script>

<template>
  <main>
    <div class="bg-white h-full p-4">
      <Breadcrumb class="sticky top-0 bg-white pt-4 z-[10]"/>
      <h1 class="text-headline pt-6">Выбрать услугу</h1>
      <div class="scrollbar sticky top-[64px] bg-white z-[10] pt-3">
        <div class="flex gap-x-2 max-w-full min-w-max">
          <CategoryChip
            v-for="item in serviceStore.categories"
            :title="item"
          />
        </div>
      </div>

      <AppInput
        v-model="serviceStore.searchQuery"
        name="search"
        placeholder="Поиск"
        class="mt-6"
        search
      />

      <section :id="service.category" v-for="service in serviceStore.filteredServices">
        <h3 class="text-headline py-6">{{ service.category }}</h3>
        <div class="flex flex-col gap-y-6">
          <ServiceCard
            v-for="item in service.items"
            :id="item.id"
            :img="item.img"
            :title="item.title"
            :description="item.description"
            :time="item.time"
            :price="item.price"
          />
        </div>
      </section>

    </div>

    <FixedBasket
      btnText="Выбрать специалиста"
      btnLink="specialists"
      v-if="cartStore.serviceInBasketCount > 0"
    />

  </main>
</template>

<style scoped>
.scrollbar {
  display: block;
  overflow-x: scroll !important;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0) transparent;
  transition: all .2s;
}

.scrollbar:hover {
  scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
}
</style>