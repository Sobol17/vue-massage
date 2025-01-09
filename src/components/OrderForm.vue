<script setup>
import AppInput from "@/components/UI/AppInput.vue";
import IconArrowRight from "@/components/icons/IconArrowRight.vue";
import {useOrderStore} from "@/stores/order.js";
import {ref, watch} from "vue";
import {useI18n} from "vue-i18n";

const orderStore = useOrderStore()
const {locale} = useI18n();
const notifyOptions = ref([]);

watch(() => locale.value,
  () => {
    if (locale.value === 'ru') {
      notifyOptions.value = [
        {
          value: "0",
          text: "Не отправлять",
        },
        {
          value: "1",
          text: "За 1 час",
        },
        {
          value: "2",
          text: "За 2 часа",
        },
        {
          value: "3",
          text: "За 3 часа",
        },
        {
          value: "4",
          text: "За 4 часа",
        },
        {
          value: "5",
          text: "За 5 часов",
        },
        {
          value: "6",
          text: "За 6 часов",
        },
        {
          value: "9",
          text: "За 9 часов",
        },
        {
          value: "12",
          text: "За 12 часов",
        },
        {
          value: "15",
          text: "За 15 часов",
        },
        {
          value: "18",
          text: "За 18 часов",
        },
        {
          value: "21",
          text: "За 21 час",
        },
        {
          value: "24",
          text: "За 24 часов",
        },
        {
          value: "48",
          text: "За 48 часов",
        },
        {
          value: "72",
          text: "За 72 часа",
        },
        {
          value: "120",
          text: "За 120 часов",
        },
        {
          value: "144",
          text: "За 144 часа",
        }
      ]
    } else {
      notifyOptions.value = [
        {
          value: "0",
          text: "Don't send",
        },
        {
          value: "1",
          text: "for 1 hour",
        },
        {
          value: "2",
          text: "for 2 hours",
        },
        {
          value: "3",
          text: "for 3 hours",
        },
        {
          value: "4",
          text: "for 4 hours",
        },
        {
          value: "5",
          text: "for 5 hours",
        },
        {
          value: "6",
          text: "for 6 hours",
        },
        {
          value: "9",
          text: "for 9 hours",
        },
        {
          value: "12",
          text: "for 12 hours",
        },
        {
          value: "15",
          text: "for 15 hours",
        },
        {
          value: "18",
          text: "for 18 hours",
        },
        {
          value: "21",
          text: "for 21 hour",
        },
        {
          value: "24",
          text: "for 24 hours",
        },
        {
          value: "48",
          text: "for 48 hours",
        },
        {
          value: "72",
          text: "for 72 hours",
        },
        {
          value: "120",
          text: "for 120 hours",
        },
        {
          value: "144",
          text: "for 144 hours",
        }
      ]
    }
  },
  {immediate: true}
)
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
          <option
            v-for="option in notifyOptions"
            :value="option.value"
            class="select__option"
          > {{ option.text }}
          </option>
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