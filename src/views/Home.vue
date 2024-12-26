<script setup>
import {useOfficeStore} from "@/stores/office.js";
import IconArrowDown from "@/components/icons/IconArrowDown.vue";
import Avatar from "@/components/UI/Avatar.vue";
import OfficeModal from "@/components/modals/OfficeModal.vue";
import AppButton from "@/components/UI/AppButton.vue";
import {ref} from "vue";
import SelectionRow from "@/components/UI/SelectionRow.vue";
import IconAccount from "@/components/icons/IconAccount.vue";
import IconCalendar from "@/components/icons/IconCalendar.vue";
import IconMore from "@/components/icons/IconMore.vue";
import IconWallet from "@/components/icons/IconWallet.vue";
import {useRouter} from "vue-router";
import Header from "@/components/Header.vue";

const officeStore = useOfficeStore()

const showOfficeModal = ref(false)

const router = useRouter()
</script>

<template>
<Header />
<main class="rounded-t-[24px] bg-white p-4 mt-[60px] h-full">

  <div class="relative">
    <Avatar
      class="absolute left-0 top-[-56px] size-[80px]"
      image="https://placehold.jp/3d4070/ffffff/150x150.png"
    />
    <div class="flex items-center gap-x-2 pt-10">
      <h1 class="text-headline">{{ officeStore.activeOffice.title }}</h1>
      <button @click="showOfficeModal = true">
        <IconArrowDown bg />
      </button>
    </div>
    <h3 class="text-body-m-regular text-neutral-500 pt-2">{{ officeStore.activeOffice.address }}</h3>
  </div>

  <div class="flex flex-col gap-y-4 mt-6">
    <SelectionRow
      title="Выбрать специалиста"
      link="/specialists"
    >
      <IconAccount />
    </SelectionRow>
    <SelectionRow
      title="Выбрать дату"
      link="/dates"
    >
      <IconCalendar />
    </SelectionRow>
    <SelectionRow
      title="Выбрать услуги"
      link="/services"
    >
      <IconMore />
    </SelectionRow>
  </div>

  <p class="text-body-m-regular mt-8">Купить</p>

  <SelectionRow
    class="mt-4"
    title="Выбрать услугу"
    link="/"
  >
    <IconWallet />
  </SelectionRow>

  <Transition name="fade">
    <OfficeModal v-if="showOfficeModal" @close="showOfficeModal = false">
      <div class="mt-6 text-center">
        <h2 class="text-headline">{{ officeStore.activeOffice.title }}</h2>
        <h3 class="text-body-m-regular text-neutral-500 pt-2">{{ officeStore.activeOffice.address }}</h3>
        <AppButton text="О филиале" class="mt-8 w-full" @click="$emit('close')" />
        <AppButton text="Все филиалы" class="mt-3 w-full" @click="router.push('/offices')" />
      </div>
    </OfficeModal>
  </Transition>
</main>
</template>
