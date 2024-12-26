<script setup>
import Avatar from "@/components/UI/Avatar.vue";
import getReviewWord from "../utils/countWord.js";
import ReviewStars from "@/components/ReviewStars.vue";
import AppRadio from "@/components/UI/AppRadio.vue";
import IconInfo from "@/components/icons/IconInfo.vue";
import AppChip from "@/components/UI/AppChip.vue";

const props = defineProps({
  id: Number,
  name: String,
  prof: String,
  img: String,
  reviews: Number,
  dates: Array,
  selected: Boolean
})

const emit = defineEmits(['setActiveDate', 'selectSpecialist'])

const setActiveDate = (id, date) => {
  emit('setActiveDate', id, date)
}

const selectSpecialist = () => {
  emit('selectSpecialist', props.id)
}
</script>

<template>
<div>
  <div class="flex items-start gap-x-3">
    <Avatar
      image="https://placehold.jp/3d4070/ffffff/150x150.png"
      class="size-[48px]"
    />
    <div class="flex flex-col gap-y-1">
      <div class="text-body-m-regular">{{name}}</div>
      <div class="text-body-m-regular text-neutral-500">{{prof}}</div>
      <div class="flex items-center gap-x-1">
        <ReviewStars :count="reviews" />
        <p class="text-body-s-regular text-neutral-500">{{reviews}} {{getReviewWord(reviews)}}</p>
      </div>
    </div>
    <div class="flex gap-x-3 ml-auto self-center">
      <IconInfo class="text-neutral-500" />
      <AppRadio
        :model-value="selected"
        :value="id"
        @update:modelValue="selectSpecialist"
      />
    </div>
  </div>
  <div class="text-body-m-regular text-neutral-500 mt-2">Ближайшее время для записи:</div>
  <div class="flex items-center flex-wrap gap-x-2 mt-2">
    <AppChip
      v-for="date in dates"
      :key="date"
      :title="date.title"
      :active="date.active"
      @click="setActiveDate(id, date)"
    />
  </div>
</div>
</template>

<style scoped>

</style>