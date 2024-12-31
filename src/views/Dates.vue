<script setup>
import Breadcrumb from "@/components/Breadcrumb.vue";
import DatePicker from "@/components/DatePicker.vue";
import {ref} from "vue";
import TimeAccordion from "@/components/TimeAccordion.vue";
import TimeChip from "@/components/UI/TimeChip.vue";
import AppButton from "@/components/UI/AppButton.vue";
import {useRouter} from "vue-router";
import {useCartStore} from "@/stores/cart.js";
const cartStore = useCartStore()

const router = useRouter()
</script>

<template>
<main>
  <div class="bg-white p-4 h-[100vh] relative">
    <Breadcrumb />
    <DatePicker v-model="cartStore.chosenDate" />

    <div class="mt-6">
      <TimeAccordion class="py-3" title="Утро">
        <div class="flex gap-2 mt-3">
          <TimeChip
            time="9:00"
            v-model="cartStore.chosenTime"
          />
          <TimeChip
            time="10:00"
            v-model="cartStore.chosenTime"
          />
          <TimeChip
            time="11:00"
            v-model="cartStore.chosenTime"
          />
        </div>
      </TimeAccordion>

      <TimeAccordion class="py-3" title="День">
        <div class="flex gap-2 mt-3">
          <TimeChip
            time="12:00"
            v-model="cartStore.chosenTime"
          />
          <TimeChip
            time="13:00"
            v-model="cartStore.chosenTime"
          />
          <TimeChip
            time="14:00"
            v-model="cartStore.chosenTime"
          />
        </div>
      </TimeAccordion>

      <TimeAccordion class="py-3" title="Вечер">
        <div class="flex gap-2 mt-3">
          <TimeChip
            time="15:00"
            v-model="cartStore.chosenTime"
          />
          <TimeChip
            time="16:00"
            v-model="cartStore.chosenTime"
          />
          <TimeChip
            time="17:00"
            v-model="cartStore.chosenTime"
          />
        </div>
      </TimeAccordion>
    </div>
    <div class="absolute bottom-6 left-0 right-0 px-4">
      <AppButton
        v-if="cartStore.chosenDate"
        class="w-full"
        :text="cartStore.cartButtonInfo.title"
        @click="router.push('/specialists')"
      />
    </div>
  </div>
</main>
</template>

<style scoped>

</style>