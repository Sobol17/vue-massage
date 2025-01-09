<script setup>
import Breadcrumb from "@/components/Breadcrumb.vue";
import IconCheck from "@/components/icons/IconCheck.vue";
import SpecialistCard from "@/components/SpecialistCard.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import IconCalendar from "@/components/icons/IconCalendar.vue";
import IconPathArrow from "@/components/icons/IconPathArrow.vue";
import IconCross from "@/components/icons/IconCross.vue";
import AppButton from "@/components/UI/AppButton.vue";
import IconLocation from "@/components/icons/IconLocation.vue";
import IconCopy from "@/components/icons/IconCopy.vue";
import IconWeb from "@/components/icons/IconWeb.vue";
import IconPhone from "@/components/icons/IconPhone.vue";
import IconWA from "@/components/icons/IconWA.vue";
import {useSuccessOrderStore} from "@/stores/successOrder.js";
import formatTime from "../utils/formatTime.js";
import formatPrice from "../utils/formatPrice.js";
import CopyChip from "@/components/UI/CopyChip.vue";
import {onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useRoute} from "vue-router";

const successOrderStore = useSuccessOrderStore()

const showCopyPopup = ref(false);
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(successOrderStore.successOrder.currentOffice.address);
    showCopyPopup.value = true;
    setTimeout(() => {
      showCopyPopup.value = false;
    }, 2000);
  } catch (e) {
    console.log(e);
  }
};

const route = useRoute();

onMounted(() => {
  successOrderStore.getSuccessOrder(route.params.locale);
  const {t, locale} = useI18n();
  locale.value = route.params.locale
})
</script>

<template>
<main class="relative">
  <div class="bg-white p-4 rounded-[20px]">
    <Breadcrumb class="sticky top-0 bg-white pt-4 z-[10]"/>

    <div class="p-4 mt-8 rounded-[20px] shadow-base">

      <div class="inline-flex items-center rounded-[8px] gap-x-2 text-green-txt bg-green-light py-1 px-2">
        <IconCheck class="size-4" />
        <p>{{$t('order_success')}}</p>
      </div>

      <h1 class="text-headline mt-4">{{ successOrderStore.successOrder.date }}</h1>
      <h2 class="text-body-l-medium"> {{successOrderStore.successOrder.time}} </h2>

      <SpecialistCard
        class="mt-6"
        :id="successOrderStore.successOrder.specialist?.id"
        :name="successOrderStore.successOrder.specialist?.name"
        :prof="successOrderStore.successOrder.specialist?.prof"
        :img="successOrderStore.successOrder.specialist?.img"
        :reviews="successOrderStore.successOrder.specialist?.reviews"
        :dates="['12:00']"
        :inSuccess="true"
      />
    </div>

<!--    <div class="flex items-center justify-center gap-x-5 mt-6">-->

<!--      <RouterLink to="/services" class="flex flex-col items-center cursor-pointer">-->
<!--        <div class="size-[50px] rounded-full bg-green-dark flex items-center justify-center border border-solid border-neutral-300">-->
<!--          <IconPlus class="text-white" />-->
<!--        </div>-->
<!--        <p class="text-[13px] mt-1 text-center">Записаться <br> еще</p>-->
<!--      </RouterLink>-->

<!--      <div class="flex flex-col items-center cursor-pointer">-->
<!--        <div class="size-[50px] rounded-full flex items-center justify-center border border-solid border-neutral-300">-->
<!--          <IconCalendar />-->
<!--        </div>-->
<!--        <p class="text-[13px] mt-1 text-center">Добавить в <br> календарь</p>-->
<!--      </div>-->

<!--      <RouterLink to="dates" class="flex flex-col items-center cursor-pointer">-->
<!--        <div class="size-[50px] rounded-full flex items-center justify-center border border-solid border-neutral-300">-->
<!--          <IconPathArrow />-->
<!--        </div>-->
<!--        <p class="text-[13px] mt-1 text-center">Перенести <br> запись</p>-->
<!--      </RouterLink>-->

<!--      <div class="flex flex-col items-center cursor-pointer">-->
<!--        <div class="size-[50px] rounded-full flex items-center justify-center border border-solid border-neutral-300">-->
<!--          <IconCross class="size-4" />-->
<!--        </div>-->
<!--        <p class="text-[13px] mt-1 text-center">Отменить <br> запись</p>-->
<!--      </div>-->

<!--    </div>-->

    <h3 class="text-body-l-medium mt-6">{{$t('order_service')}}</h3>

    <div
      class="flex flex-col gap-y-3 mt-3"
      v-for="service in successOrderStore.successOrder.services"
    >
      <div class="flex items-start justify-between">
        <div>
          <p class="text-body-m-regular mb-1">{{ service.title }}</p>
          <p class="text-body-s-regular text-neutral-500">{{ formatTime(service.time, route.params.locale) }}</p>
        </div>
        <div class="text-body-m-medium">{{ formatPrice(service.price) }}</div>
      </div>
    </div>

    <hr class="my-4 text-neutral-300">

    <div class="flex items-baseline justify-between">
      <div class="text-body-m-regular">{{ $t('order_total') }}</div>
      <div class="text-body-m-medium">{{formatPrice(successOrderStore.successOrder.total_price)}}</div>
    </div>

<!--    <div class="flex items-center gap-x-3 mt-4">-->

<!--      <div class="flex items-center self-start justify-center rounded-full size-[48px] bg-neutral-200">-->
<!--        <IconCalendar/>-->
<!--      </div>-->

<!--      <div class="flex flex-col items-start">-->
<!--        <p class="text-body-s-regular text-neutral-500 mb-2">Вам доступен (1) новый подарок за оформление записи</p>-->
<!--        <AppButton sm text="Выбрать" />-->
<!--      </div>-->
<!--    </div>-->

    <h3 class="text-body-l-medium mt-6">{{ $t('order_contacts') }}</h3>

    <div class="flex items-center gap-x-2 mt-4">
      <img class="size-[48px] rounded-[12px]" :src="successOrderStore.successOrder.office?.img" alt="">
      <p class="text-body-m-regular uppercase">{{ successOrderStore.successOrder.office?.name }}</p>
    </div>

    <div class="mt-4 flex items-center gap-x-3">
      <IconLocation />
      <p>{{ successOrderStore.successOrder.office?.address }}</p>
      <IconCopy @click="copyLink" class="text-neutral-500 cursor-pointer size-4 ml-auto"/>
    </div>

    <div class="rounded-[12px] overflow-hidden my-3">
      <img src="https://placehold.jp/3d4070/ffffff/600x300.png" class="w-full h-[227px]" alt="">
    </div>

    <RouterLink to="/" class="flex gap-x-3 items-center">
      <IconPhone />
      <p>+7 995 690-05-90</p>
    </RouterLink>

    <RouterLink to="/" class="flex gap-x-3 items-center mt-3">
      <IconWeb />
      <p>instagram.com/massante.perm</p>
    </RouterLink>

    <RouterLink to="/" class="inline-block rounded-[8px] bg-neutral-200 py-1 px-2 mt-3">
      <IconWA />
    </RouterLink>

  </div>

  <CopyChip v-if="showCopyPopup" />
</main>
</template>

<style scoped>

</style>