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
import {useRouter} from "vue-router";

const cartStore = useCartStore()
const orderStore = useOrderStore()

const router = useRouter()

const sendForm = () => {
  if (orderStore.validateForm()) {
    const requestData = {
      name: orderStore.orderForm.name,
      phone: orderStore.orderForm.phone,
      email: orderStore.orderForm.email,
      comment: orderStore.orderForm.comment,
      remind: orderStore.orderForm.remind,
      onlinePayment: orderStore.orderForm.onlinePayment,
      specialistId: cartStore.chosenSpecialist.id,
      services: cartStore.chosenServices,
      date: cartStore.chosenDate.date,
      time: cartStore.chosenDate.time
    }

    orderStore.sendOrderForm(requestData)
    router.push('/thanks')
  } else {
    console.log('validation error')
  }
}
</script>

<template>
  <main>
    <Breadcrumb class="sticky top-0 bg-white pt-4 pb-2 z-[10]"/>
    <div v-if="cartStore.serviceInBasketCount > 0">
      <div class="bg-white p-4">
        <h1 class="text-headline pt-6">Детали для записи</h1>
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
            <p class="text-body-s-regular text-neutral-500">{{ getFullNamedDate(cartStore.chosenDate.date) }}</p>
            <p class="text-body-m-regular">{{ cartStore.chosenDate.time }}</p>
          </div>

          <RouterLink to="/dates" class="ml-auto">
            <IconPen class="text-neutral-500"/>
          </RouterLink>
        </div>

        <hr class="my-4 text-neutral-300"/>

        <div class="flex gap-x-1 items-baseline">
          <div class="text-body-l-bold">Услуги</div>
          <div class="text-neutral-500 text-body-m-regular">{{ formatTime(cartStore.cartTotalTime) }}</div>
          <IconPen class="text-neutral-500 ml-auto"/>
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
          <div class="text-body-m-regular">Итого</div>
          <div class="text-body-m-regular">{{ formatPrice(cartStore.cartTotalPrice) }}</div>
        </div>
      </div>

      <OrderForm/>

      <div class="flex items-start gap-x-2 rounded-[20px] p-4 bg-white mt-3">
        <IconBell class="text-neutral-500"/>
        <p class="text-[12px] text-neutral-500">Советуем прийти в студию за 10-15 минут В случае отмены,
          предупредите, пожалуйста, администратора +7(995)690-05-90</p>
      </div>

      <div class="bg-white mt-3 rounded-[20px] p-4">
        <div class="flex items-center justify-between">
          <p class="text-body-m-regular">Оплатить онлайн</p>
          <AppSwitch
            v-model="orderStore.orderForm.onlinePayment"
          />
        </div>

        <hr class="mx-[-16px] my-4 text-neutral-300">

        <div class="flex items-center justify-between">
          <p class="text-body-s-regular">Итого</p>
          <p class="text-body-s-regular">{{ formatPrice(cartStore.cartTotalPrice) }}</p>
        </div>
      </div>

      <div class="bg-white p-4 mt-3">
        <AppButton @click="sendForm" text="Записаться" class="w-full"/>
        <p class="text-[12px] text-neutral-500 mt-3">Нажимая на кнопку, я предоставляю ООО "Уайклаентс" согласие на
          обработку своих персональных данных, а также
          подтверждаю ознакомление и согласие с Политикой конфиденциальности и Пользовательским соглашением</p>
      </div>
    </div>

    <div v-else class="py-10 px-4 text-center bg-white">
      <h1 class="text-headline">Ваша корзина услуг пуста</h1>
      <AppButton text="Выбрать услуги" class="w-full mt-4" @click="router.push('/services')"/>
    </div>
  </main>
</template>

<style scoped>

</style>