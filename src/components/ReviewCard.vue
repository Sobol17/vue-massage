<script setup>
import ReviewStars from "@/components/ReviewStars.vue";

const props = defineProps({
  author: String,
  date: String,
  text: String,
  countReviews: Number
})
</script>

<template>
<div>
  <div class="flex items-center gap-x-2">
    <div class="rounded-full size-12 bg-neutral-200 flex items-center justify-center text-neutral-500">{{author[0]}}</div>
    <div>
      <p>{{author}}</p>
      <div class="flex items-center gap-x-2">
        <ReviewStars :count="countReviews" />
        <span class="text-body-s-regular text-neutral-500">{{date}}</span>
      </div>
    </div>
  </div>

  <p class="mt-2">{{text}}</p>
</div>
</template>

<style scoped>

</style>