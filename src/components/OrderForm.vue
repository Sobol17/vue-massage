<script setup>
import AppInput from "@/components/UI/AppInput.vue";
import IconArrowRight from "@/components/icons/IconArrowRight.vue";
import {useOrderStore} from "@/stores/order.js";
import {ref} from "vue";

const orderStore = useOrderStore()

</script>

<template>
  <div class="rounded-[20px] bg-white mt-3 p-4">
    <h3 class="text-body-l-bold">{{$t('order_form')}}</h3>
    <hr class="my-2 text-neutral-300 mx-[-16px]">

    <div class="mb-4">
      <p class="text-body-s-regular text-neutral-500 mb-1">{{$t('order_form_name')}} *</p>
      <AppInput
        v-model="orderStore.orderForm.name"
        name="name"
        :placeholder="$t('order_form_name')"
        :error="orderStore.errors.name"
      />
      <p v-if="orderStore.errors.name" class="text-[12px] text-red pt-1">Введите имя</p>
    </div>

    <div class="mb-4">
      <p class="text-body-s-regular text-neutral-500 mb-1">{{$t('order_form_phone')}} *</p>
      <AppInput
        v-model="orderStore.orderForm.phone"
        name="tel"
        :placeholder="$t('order_form_name')"
        v-mask="'+7 ### ###-##-##'"
        :error="orderStore.errors.phone"
      />
      <p v-if="orderStore.errors.phone" class="text-[12px] text-red pt-1">Неверный номер</p>
    </div>

    <div class="mb-4">
      <p class="text-body-s-regular text-neutral-500 mb-1">E-mail</p>
      <AppInput
        v-model="orderStore.orderForm.email"
        name="email"
        placeholder="Введите e-mail"
      />
    </div>

    <div class="mb-4">
      <p class="text-body-s-regular text-neutral-500 mb-1">{{$t('order_form_comment')}}</p>
      <AppInput
        v-model="orderStore.orderForm.comment"
        name="comment"
        :placeholder="$t('order_form_name')"
      />
    </div>

    <div>
      <p class="text-body-s-regular text-neutral-500 mb-1">{{$t('order_form_send')}}</p>
      <div class="relative">
        <select class="select" v-model="orderStore.orderForm.remind">
          <option value="0" class="select__option"> Не отправлять</option>
          <option value="1" class="ng-star-inserted"> За 1 час</option>
          <option value="2" class="ng-star-inserted"> За 2 часа</option>
          <option  value="3" class="ng-star-inserted"> За 3 часа</option>
          <option  value="4" class="ng-star-inserted"> За 4 часа</option>
          <option  value="5" class="ng-star-inserted"> За 5 часов</option>
          <option  value="6" class="ng-star-inserted"> За 6 часов</option>
          <option  value="9" class="ng-star-inserted"> За 9 часов</option>
          <option  value="12" class="ng-star-inserted"> За 12 часов</option>
          <option  value="15" class="ng-star-inserted"> За 15 часов</option>
          <option  value="18" class="ng-star-inserted"> За 18 часов</option>
          <option  value="21" class="ng-star-inserted"> За 21 час</option>
          <option  value="24" class="ng-star-inserted"> За 24 часа</option>
          <option value="48" class="ng-star-inserted"> За 2 дня</option>
          <option  value="72" class="ng-star-inserted"> За 3 дня</option>
          <option  value="120" class="ng-star-inserted"> За 5 дней</option>
          <option  value="144" class="ng-star-inserted"> За 7 дней</option>
        </select>

        <IconArrowRight bg class="absolute right-2 top-1/2 -translate-y-1/2" />
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.select {
  width: 100%;
  appearance: none;
  -moz-appearance: none;
  outline: none;
  &__options {

  }
}
</style>