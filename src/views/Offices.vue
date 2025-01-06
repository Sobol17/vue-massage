<script setup>
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import IconLocation from "@/components/icons/IconLocation.vue";
import IconPen from "@/components/icons/IconPen.vue";
import OfficeCard from "@/components/OfficeCard.vue";
import {onMounted, ref} from "vue";
import Loader from "@/components/UI/Loader.vue";
import {useOfficeStore} from "@/stores/office.js";

const officeStore = useOfficeStore()

onMounted(() => {
  officeStore.getOffices();
})
</script>

<template>
<main>
  <div class="bg-white p-4">
    <RouterLink class="flex items-center gap-x-2" to="/">
      <IconArrowLeft md/>
      <div class="text-body-m-regular">Выберите филиал</div>
    </RouterLink>

    <div class="chose-city">
      <IconLocation class="ml-auto" />
      <div class="text-body-m-regular">Город</div>
      <IconPen class="ml-auto" />
    </div>

    <div class="text-center mt-6 text-body-m-medium">Список</div>
  </div>

  <div class="flex flex-col gap-y-3 mt-6">
    <OfficeCard
      v-for="office in officeStore.offices"
      :office="office"
    />
  </div>
</main>
</template>

<style scoped>
.chose-city {
  @apply w-full flex gap-x-2 items-center justify-center rounded-[24px] bg-neutral-200 py-3 px-5 mt-7 cursor-pointer
}
</style>