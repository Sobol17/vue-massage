<script setup>
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import IconLocation from "@/components/icons/IconLocation.vue";
import IconPen from "@/components/icons/IconPen.vue";
import OfficeCard from "@/components/OfficeCard.vue";
import {ref} from "vue";
import Loader from "@/components/UI/Loader.vue";

const offices = ref([
  {
    id: 1,
    title: "Массаж 1",
    address: "ул. Пушкина, 15",
    code: "pushkina-15",
    text: "Советуем прийти в студию за 10-15 минут В случае отмены,\n" +
      "          предупредите, пожалуйста, администратора +7(995)690-05-90",
    img: "https://placehold.jp/3d4070/ffffff/600x300.png"
  },
  {
    id: 2,
    title: "Массаж 2",
    address: "ул. Пушкина, 4124",
    code: "pushkina-4124",
    text: "Советуем прийти в студию за 10-15 минут В случае отмены,\n" +
      "          предупредите, пожалуйста, администратора +7(995)690-05-90",
    img: "https://placehold.jp/3d4070/ffffff/600x300.png"
  },
  {
    id: 3,
    title: "Массаж 3",
    address: "ул. Постышева, 5",
    code: "postisheva-5",
    text: "Советуем прийти в студию за 10-15 минут В случае отмены,\n" +
      "          предупредите, пожалуйста, администратора +7(995)690-05-90",
    img: "https://placehold.jp/3d4070/ffffff/600x300.png"
  },
])
</script>

<template>
<main>
  <div class="bg-white p-4">
    <RouterLink class="flex items-center gap-x-2" to="/">
      <IconArrowLeft md/>
      <div class="text-body-m-regular">Выберите филиал</div>
    </RouterLink>

    <div class="chose-city">
      <IconLocation class="ml-auto" />
      <div class="text-body-m-regular">Город</div>
      <IconPen class="ml-auto" />
    </div>

    <div class="text-center mt-6 text-body-m-medium">Список</div>
  </div>

  <div class="flex flex-col gap-y-3 mt-6">
    <OfficeCard
      v-for="office in offices"
      :office="office"
    />
  </div>
</main>
</template>

<style scoped>
.chose-city {
  @apply w-full flex gap-x-2 items-center justify-center rounded-[24px] bg-neutral-200 py-3 px-5 mt-7 cursor-pointer
}
</style>