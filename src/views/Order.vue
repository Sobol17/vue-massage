<script setup>
import Breadcrumb from "@/components/Breadcrumb.vue";
import {useCartStore} from "@/stores/cart.js";
import IconPen from "@/components/icons/IconPen.vue";
import formatPrice from "../utils/formatPrice.js";
import OrderForm from "@/components/OrderForm.vue";
import formatTime from "../utils/formatTime.js";
import IconBell from "@/components/icons/IconBell.vue";
import AppButton from "@/components/UI/AppButton.vue";
import AppSwitch from "@/components/UI/AppSwitch.vue";
import {useOrderStore} from "@/stores/order.js";
import getFullNamedDate from "../utils/getFullNamedDate.js";
import SpecialistCard from "@/components/SpecialistCard.vue";
import IconCalendar from "@/components/icons/IconCalendar.vue";
import {useRoute, useRouter} from "vue-router";
import {useOfficeStore} from "@/stores/office.js";
import IconCross from "@/components/icons/IconCross.vue";
import AppModal from "@/components/modals/AppModal.vue";
import {onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";

const cartStore = useCartStore()
const orderStore = useOrderStore()
const officeStore = useOfficeStore()

const router = useRouter()
const {t, locale} = useI18n();
const route = useRoute();
const sendForm = () => {
  if (orderStore.validateForm()) {
    const requestData = {
      locale: route.params.locale,
      name: orderStore.orderForm.name,
      phone: orderStore.orderForm.phone,
      email: orderStore.orderForm.email,
      comment: orderStore.orderForm.comment,
      remind: orderStore.orderForm.remind,
      // onlinePayment: orderStore.orderForm.onlinePayment,
      specialistId: cartStore.chosenSpecialist.id,
      services: cartStore.chosenServices,
      date: cartStore.chosenDate,
      time: cartStore.chosenTime
    }

    orderStore.sendOrderForm(requestData)

    localStorage.setItem("name", requestData.name)
    localStorage.setItem("phone", requestData.phone)
    localStorage.setItem("email", requestData.email)

    router.push('thanks')
  } else {
    console.log('validation error')
  }
}

const showModal = ref(false)

onMounted(() => {
  locale.value = route.params.locale
})
</script>

<template>
  <main
    :class="{'bg-white min-h-[100vh]' : cartStore.serviceInBasketCount === 0}"
  >
    <Breadcrumb class="sticky top-0 bg-white pt-4 pb-2 z-[10] px-4"/>
    <div v-if="cartStore.serviceInBasketCount > 0">
      <div class="bg-white p-4">
        <h1 class="text-headline pt-6">{{ $t('order_title') }}</h1>

        <SpecialistCard
          class="mt-6"
          :inOrder="true"
          :id="cartStore.chosenSpecialist.id"
          :name="cartStore.chosenSpecialist.name"
          :prof="cartStore.chosenSpecialist.prof"
          :img="cartStore.chosenSpecialist.img"
          :reviews="cartStore.chosenSpecialist.reviews"
          :dates="cartStore.chosenSpecialist.dates"
        />

        <div class="flex items-center gap-x-3 mt-4">
          <div class="flex items-center justify-center rounded-full size-[48px] bg-neutral-200">
            <IconCalendar/>
          </div>

          <div>
            <p class="text-body-s-regular text-neutral-500">{{ getFullNamedDate(cartStore.chosenDate, route.params.locale) }}</p>
            <p class="text-body-m-regular">{{ cartStore.chosenTime }}</p>
          </div>

          <RouterLink
            :to="{
              name: 'dates',
              query: {
                specialist: cartStore.chosenSpecialist.id,
                branch_id: officeStore.activeOffice?.id
              }
            }"
            class="ml-auto">
            <IconPen class="text-neutral-500"/>
          </RouterLink>
        </div>

        <hr class="my-4 text-neutral-300"/>

        <div class="flex gap-x-1 items-baseline">
          <div class="text-body-l-bold">{{ $t('order_service') }}</div>
          <div class="text-neutral-500 text-body-m-regular">{{ formatTime(cartStore.cartTotalTime, route.params.locale) }}</div>
          <IconPen class="text-neutral-500 ml-auto" @click="showModal = true"/>
        </div>

        <div class="flex flex-col gap-y-3 mt-3">

          <div v-for="service in cartStore.chosenServices" class="flex items-start justify-between">
            <div>
              <p class="text-body-m-regular mb-1">{{ service.title }}</p>
              <p class="text-body-s-regular text-neutral-500">{{ formatTime(service.time) }}</p>
            </div>
            <div class="text-body-m-medium">{{ formatPrice(service.price) }}</div>
          </div>

        </div>

        <hr class="my-4 text-neutral-300"/>

        <div class="flex items-baseline justify-between">
          <div class="text-body-m-regular">{{ $t('order_total') }}</div>
          <div class="text-body-m-regular">{{ formatPrice(cartStore.cartTotalPrice) }}</div>
        </div>
      </div>

      <OrderForm/>

      <div class="flex items-start gap-x-2 rounded-[20px] p-4 bg-white mt-3">
        <IconBell class="text-neutral-500"/>
        <p class="text-[12px] text-neutral-500">{{officeStore.activeOffice.text}}</p>
      </div>

      <div class="bg-white mt-3 rounded-[20px] p-4">
<!--        <div class="flex items-center justify-between">-->
<!--          <p class="text-body-m-regular">Оплатить онлайн</p>-->
<!--          <AppSwitch-->
<!--            v-model="orderStore.orderForm.onlinePayment"-->
<!--          />-->
<!--        </div>-->

<!--        <hr class="mx-[-16px] my-4 text-neutral-300">-->

        <div class="flex items-center justify-between">
          <p class="text-body-s-regular">{{ $t('order_total') }}</p>
          <p class="text-body-s-regular">{{ formatPrice(cartStore.cartTotalPrice) }}</p>
        </div>
      </div>

      <div class="bg-white p-4 mt-3">
        <AppButton @click="sendForm" :text="$t('order_btn')" class="w-full"/>
        <p class="text-[12px] text-neutral-500 mt-3">{{ $t('order_notify') }}</p>
      </div>
    </div>

    <div v-else class="pt-[120px] pb-10 px-4 text-center bg-white">
      <h1 class="text-headline">{{ $t('order_empty') }}</h1>
      <AppButton :text="$t('home_services')" class="w-full mt-4" @click="router.push('services')"/>
    </div>
  </main>

  <teleport to="body">
    <AppModal
      v-if="showModal"
      title=""
      @close="showModal = false"
    >
      <div class="flex mt-6">
        <div class="flex-grow flex gap-x-2 items-baseline">
          <span class="text-body-m-regular">{{ cartStore.serviceInBasketCount }} {{ transformWord }}</span>
          <span class="text-body-s-regular text-neutral-500">{{formatTime(cartStore.cartTotalTime)}}</span>
        </div>
        <div class="text-body-l-bold">{{ formatPrice(cartStore.cartTotalPrice) }}</div>
      </div>

      <div class="flex flex-col gap-y-3 mt-3">
        <div
          class="flex gap-x-3 items-start"
          v-for="service in cartStore.chosenServices"
        >
          <div>
            <p>{{service.title}}</p>
            <p class="text-body-s-regular text-neutral-500">{{formatTime(service.time)}}</p>
          </div>
          <div class="text-body-m-medium ml-auto">{{formatPrice(service.price)}}</div>
          <IconCross @click="cartStore.removeServiceFromCart(service)" class="size-4 cursor-pointer text-neutral-500" />
        </div>
      </div>
    </AppModal>
  </teleport>
</template>

<style scoped>

</style>