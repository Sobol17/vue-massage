<script setup>
import Avatar from "@/components/UI/Avatar.vue";
import getReviewWord from "../utils/countWord.js";
import ReviewStars from "@/components/ReviewStars.vue";
import AppRadio from "@/components/UI/AppRadio.vue";
import IconInfo from "@/components/icons/IconInfo.vue";
import AppChip from "@/components/UI/AppChip.vue";
import {computed} from "vue";
import {useCartStore} from "@/stores/cart.js";
import IconPen from "@/components/icons/IconPen.vue";
import router from "@/router/index.js";
import getFullNamedDate from "../utils/getFullNamedDate.js";

const props = defineProps({
  id: Number,
  name: String,
  prof: String,
  img: String,
  reviews: Number,
  dates: Array,
  inOrder: Boolean,
  inSuccess: Boolean,
})

const cartStore = useCartStore()

const selectDate = (time) => {
  cartStore.chosenSpecialist.id = props.id
  cartStore.chosenDate = props.dates[0].date
  cartStore.chosenTime = time
  cartStore.chosenSpecialist = props
}

const activeDate = (time) => {
  return cartStore.chosenSpecialist.id === props.id && cartStore.chosenTime === time
}

</script>

<template>
<div>
  <div class="flex items-start gap-x-3 cursor-pointer" @click="cartStore.chosenSpecialist = props">
    <Avatar
      image="https://placehold.jp/3d4070/ffffff/150x150.png"
      class="size-[48px]"
    />
    <div class="flex flex-col gap-y-1">
      <div class="text-body-m-regular">{{name}}</div>
      <div class="text-body-s-regular text-neutral-500">{{prof}}</div>
      <div class="flex items-center gap-x-1">
        <ReviewStars :count="reviews" />
        <p class="text-body-s-regular text-neutral-500">{{reviews}} {{getReviewWord(reviews)}}</p>
      </div>
    </div>
    <div v-if="!inOrder" class="flex gap-x-3 ml-auto self-center">
      <RouterLink :to="`specialists/${id}`">
        <IconInfo class="text-neutral-500" />
      </RouterLink>
      <AppRadio
        v-if="!inSuccess"
        name="spec"
        :value="props.id"
        v-model="cartStore.chosenSpecialist.id"
      />
    </div>
  </div>
  <div v-if="!inOrder && !inSuccess" class="text-body-m-regular text-neutral-500 mt-2">Ближайшее время для записи: {{getFullNamedDate(dates[0].date)}}</div>
  <div v-if="!inOrder" class="flex items-center flex-wrap gap-x-2 mt-2">
    <AppChip
      v-for="time in dates[0].times"
      :key="time"
      :title="time"
      :active="activeDate(time)"
      @click="selectDate(time)"
    />
  </div>
</div>
</template>

<style scoped>

</style>