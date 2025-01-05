<script setup>
import Breadcrumb from "@/components/Breadcrumb.vue";
import Avatar from "@/components/UI/Avatar.vue";
import getReviewWord from "@/utils/countWord.js";
import ReviewStars from "@/components/ReviewStars.vue";
import IconStarGray from "@/components/icons/IconStarGray.vue";
import ReviewCard from "@/components/ReviewCard.vue";
import AppButton from "@/components/UI/AppButton.vue";
import {onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useSpecialistsStore} from "@/stores/specialists.js";

const specialistStore = useSpecialistsStore()
const route = useRoute()

onMounted(() => {
  specialistStore.getSpecialistById(route.params.id)
})
</script>

<template>
  <main class="relative h-[100vh]">
    <Breadcrumb class="pt-4" />

    <div class="mt-16 relative text-center bg-white rounded-[16px]">
      <Avatar
        class="absolute left-1/2 translate-x-[-50%] top-[-56px] size-[120px]"
        image="https://placehold.jp/3d4070/ffffff/150x150.png"
      />
      <h1 class="text-headline pt-18">{{ specialistStore.specialist.name }}</h1>
      <p class="text-body-m-regular text-neutral-500">{{ specialistStore.specialist.prof }}</p>
      <div class="flex items-center justify-center gap-x-1 mt-1 pb-4">
        <ReviewStars :count="specialistStore.specialist.reviews" />
        <p class="text-body-s-regular text-neutral-500">{{specialistStore.specialist.reviews}} {{getReviewWord(specialistStore.specialist.reviews)}}</p>
      </div>
    </div>

    <div class="bg-white rounded-[16px] mt-3 p-4">
      <div class="text-headline">Отзывы</div>
      <div class="bg-neutral-100 text-center rounded-[16px] mt-2 p-4">
        <p>Оцените и оставьте отзыв</p>
        <div class="flex gap-x-2 items-center justify-center">
          <IconStarGray v-for="i in 5" class="size-8 cursor-pointer" />
        </div>
      </div>

      <div class="flex flex-col gap-y-3 mt-4">
        <ReviewCard
          v-for="reviews in specialistStore.specialist.reviews_items"
          :author="reviews.author"
          :date="reviews.date"
          :text="reviews.text"
          :countReviews="reviews.count"
        />
      </div>
    </div>

    <AppButton
      class="absolute bottom-6 left-4 right-4"
      text="Выбрать этого специалиста"
    />
  </main>
</template>

<style scoped>

</style>