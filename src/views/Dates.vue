<script setup>
import Breadcrumb from "@/components/Breadcrumb.vue";
import DatePicker from "@/components/DatePicker.vue";
import {computed, onMounted, ref} from "vue";
import TimeAccordion from "@/components/TimeAccordion.vue";
import TimeChip from "@/components/UI/TimeChip.vue";
import AppButton from "@/components/UI/AppButton.vue";
import {useRoute, useRouter} from "vue-router";
import {useCartStore} from "@/stores/cart.js";
import {useDateStore} from "@/stores/dates.js";
import {useI18n} from "vue-i18n";
import {useOfficeStore} from "@/stores/office.js";

const cartStore = useCartStore()
const datesStore = useDateStore()
const officeStore = useOfficeStore()
const router = useRouter()

const activeTimeSlots = computed(() => {
  return datesStore.dates.find(item => item.date === cartStore.chosenDate)?.day_time
})

const route = useRoute();
const {t, locale} = useI18n();

onMounted(() => {
  datesStore.getAvailableDates({
    specialistId: route.query.specialist,
    branchId: officeStore.activeOffice?.id,
    locale: route.params.locale,
    serviceIds: route.query.serviceIds
  })
  locale.value = route.params.locale
})
</script>

<template>
<main class="bg-white relative min-h-[100vh] h-100%">
  <div class="p-4 sm:h-full">
    <Breadcrumb />
    <DatePicker
      :available-days="datesStore.availableDates"
      v-model="cartStore.chosenDate"
    />
    <div class="mt-6 pb-[80px]">
      <TimeAccordion
        v-for="time in activeTimeSlots"
        class="py-3"
        :title="time.title">
        <div class="flex gap-2 mt-3">
          <TimeChip
            v-for="slot in time.times"
            :time="slot"
            v-model="cartStore.chosenTime"
          />
        </div>
      </TimeAccordion>

    </div>

    <div class="absolute sm:fixed bottom-6 left-0 right-0 px-4">
      <AppButton
        v-if="cartStore.chosenTime && cartStore.chosenSpecialist.id !== null"
        class="w-full"
        :text="$t('home_services')"
        @click="router.push({
          name: 'services',
          query: {
            date: cartStore.chosenDate,
            time: cartStore.chosenTime,
            branchId: route.query.branchId,
            specialist: cartStore.chosenSpecialist.id
          }
        })"
      />

      <AppButton
        v-if="cartStore.chosenTime && cartStore.chosenSpecialist.id === null"
        class="w-full"
        :text="cartStore.cartButtonInfo.title"
        @click="router.push({
          name: 'specialists',
          query: {
            date: cartStore.chosenDate,
            time: cartStore.chosenTime,
            branchId: route.query.branchId
          }
        })"
      />
    </div>

  </div>
</main>
</template>

<style scoped>

</style>