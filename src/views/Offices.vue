<script setup>
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import IconLocation from "@/components/icons/IconLocation.vue";
import IconPen from "@/components/icons/IconPen.vue";
import OfficeCard from "@/components/OfficeCard.vue";
import {onMounted, ref} from "vue";
import Loader from "@/components/UI/Loader.vue";
import {useOfficeStore} from "@/stores/office.js";
import {useI18n} from "vue-i18n";
import {useRoute} from "vue-router";

const officeStore = useOfficeStore()
const route = useRoute()

onMounted(() => {
  officeStore.getOffices(route.params.locale);
  const {t, locale} = useI18n();
  locale.value = route.params.locale
})
</script>

<template>
<main>
  <div class="bg-white p-4">
    <RouterLink class="flex items-center gap-x-2" to="/">
      <IconArrowLeft md/>
      <div class="text-body-m-regular">{{$t('branches_back')}}</div>
    </RouterLink>

    <div class="chose-city">
      <IconLocation class="ml-auto" />
      <div class="text-body-m-regular">{{ $t('branches_city') }}</div>
      <IconPen class="ml-auto" />
    </div>

    <div class="text-center mt-6 text-body-m-medium">{{ $t('branches_list') }}</div>
  </div>

  <div v-if="!officeStore.isLoading" class="flex flex-col gap-y-3 mt-6">
    <OfficeCard
      v-for="office in officeStore.offices"
      :office="office"
    />
  </div>

  <teleport to="body">
    <Loader v-if="officeStore.isLoading" />
  </teleport>
</main>
</template>

<style scoped>
.chose-city {
  @apply w-full flex gap-x-2 items-center justify-center rounded-[24px] bg-neutral-200 py-3 px-5 mt-7 cursor-pointer
}
</style>