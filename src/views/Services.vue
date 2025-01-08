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
import {useRoute} from "vue-router";
import Loader from "@/components/UI/Loader.vue";
import {useI18n} from "vue-i18n";

const serviceStore = useServiceStore()
const cartStore = useCartStore()
const officeStore = useOfficeStore()

const route = useRoute();

onMounted(() => {
  serviceStore.getServices({
    specialistId: route.query.specialist,
    time: cartStore.chosenTime,
    date: cartStore.chosenDate,
    branchId: officeStore.activeOffice?.id
  })

  const {t, locale} = useI18n();
  locale.value = route.params.locale
})
</script>

<template>
  <main>
    <div class="bg-white h-full min-h-[100vh] p-4">
      <Breadcrumb class="sticky top-0 bg-white pt-4 z-[10]"/>
      <h1 v-if="serviceStore.services.length !== 0" class="text-headline pt-6">{{$t('service_title')}}</h1>

      <div v-if="!serviceStore.isLoading" class="scrollbar sticky top-[64px] bg-white z-[10] pt-3">
        <div class="flex gap-x-2 max-w-full min-w-max pb-2">
          <CategoryChip
            v-for="item in serviceStore.categories"
            :title="item"
          />
        </div>
      </div>

      <AppInput
        v-if="!serviceStore.isLoading"
        v-model="serviceStore.searchQuery"
        name="search"
        :placeholder="$t('service_search')"
        class="mt-3"
        search
      />

      <div v-if="!serviceStore.isLoading" class="mb-[120px]">
        <section :id="service.category" v-for="service in serviceStore.filteredServices">
          <h3 class="text-headline py-6">{{ service.category }}</h3>
          <div class="flex flex-col gap-y-6">
            <ServiceCard
              v-for="item in service.items"
              :id="item?.id"
              :img="item?.img"
              :title="item?.title"
              :description="item?.description"
              :time="item?.time"
              :price="item?.price"
            />
          </div>
        </section>
      </div>

      <div class="text-headline mt-[80px]" v-if="serviceStore.services.length === 0 && !serviceStore.isLoading">
        {{$t('service_not_found')}}
      </div>

    </div>

    <FixedBasket
      v-if="cartStore.serviceInBasketCount > 0"
    />
  </main>

  <teleport to="body">
    <Loader v-if="serviceStore.isLoading" />
  </teleport>
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