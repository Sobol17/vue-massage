<script setup>
import Breadcrumb from "@/components/Breadcrumb.vue";
import Avatar from "@/components/UI/Avatar.vue";
import getReviewWord from "@/utils/countWord.js";
import ReviewStars from "@/components/ReviewStars.vue";
import IconStarGray from "@/components/icons/IconStarGray.vue";
import ReviewCard from "@/components/ReviewCard.vue";
import AppButton from "@/components/UI/AppButton.vue";
import {onMounted, reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useSpecialistsStore} from "@/stores/specialists.js";
import AppModal from "@/components/modals/AppModal.vue";
import AppInput from "@/components/UI/AppInput.vue";

const specialistStore = useSpecialistsStore()
const route = useRoute()

const showForm = ref(false)
const showThanksModal = ref(false)

const form = reactive({
  name: '',
  phone: '',
  email: '',
  comment: '',
})

const formError = reactive({
  name: false,
  phone: false,
  email: false,
})

const validateForm = () => {
  formError.name = form.name === ''
  formError.phone = form.phone === ''
  formError.email = form.email === ''

  return !formError.name && !formError.phone && !formError.email
}

const sendReviewForm = async () => {
  if (!validateForm()) return
  await specialistStore.sendReview(route.params.id, form)
  showForm.value = false
  showThanksModal.value = true
}

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
      <div @click="showForm = true" class="bg-neutral-100 text-center rounded-[16px] mt-2 p-4">
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

    <AppModal
      v-if="showForm"
      @close="showForm = false"
    >
      <p class="text-headline">Оцените работу мастера</p>
      <div class="flex flex-col gap-y-4 mt-6">
        <div>
          <AppInput v-model="form.name" name="name" placeholder="Ваше имя*" :error="formError.name"/>
          <p v-if="formError.name" class="text-[12px] text-red pt-1">Указите ваше имя</p>
        </div>
        <div>
          <AppInput v-model="form.phone" name="phone" placeholder="Номер телефона*" v-mask="'+7 ### ###-##-##'" :error="formError.phone"/>
          <p v-if="formError.phone" class="text-[12px] text-red pt-1">Неверный номер</p>
        </div>
        <div>
          <AppInput v-model="form.email" name="email" placeholder="Электронная почта*" :error="formError.email"/>
          <p v-if="formError.email" class="text-[12px] text-red pt-1">Укажите ваш email</p>
        </div>
        <textarea v-model="form.comment" class="border border-solid outline-none border-neutral-300 rounded-[16px] p-4 resize-none h-[120px]" placeholder="Комментарий"></textarea>
      </div>
      <AppButton @click="sendReviewForm" class="w-full mt-6" text="Отправить" />
    </AppModal>

    <AppModal
      @close="showThanksModal = false"
      v-if="showThanksModal"
    >
      <p class="text-headline">Спасибо за ваш отзыв!</p>
      <div class="mt-4 text-body-m-regular text-center">
        Мы благодарим вас за ваш отзыв, для нас это очень важно
      </div>
      <AppButton @click="showThanksModal = false" class="w-full mt-6" text="Закрыть" />
    </AppModal>
  </main>
</template>

<style scoped>

</style>