<script setup>
import {useOfficeStore} from "@/stores/office.js";
import IconArrowDown from "@/components/icons/IconArrowDown.vue";
import Avatar from "@/components/UI/Avatar.vue";
import OfficeModal from "@/components/modals/AppModal.vue";
import AppButton from "@/components/UI/AppButton.vue";
import {onMounted, ref} from "vue";
import SelectionRow from "@/components/UI/SelectionRow.vue";
import IconAccount from "@/components/icons/IconAccount.vue";
import IconCalendar from "@/components/icons/IconCalendar.vue";
import IconMore from "@/components/icons/IconMore.vue";
import IconWallet from "@/components/icons/IconWallet.vue";
import {useRouter} from "vue-router";
import Header from "@/components/Header.vue";
import {useCartStore} from "@/stores/cart.js";

const officeStore = useOfficeStore()
const cartStore = useCartStore()
const showOfficeModal = ref(false)

const router = useRouter()

onMounted(() => {
  cartStore.clearCart()
})
</script>

<template>
<main class="rounded-t-[24px] bg-white p-4 mt-[60px] h-[100vh] sm:mx-2">
  <div class="relative">
    <Avatar
      class="absolute left-1/2 translate-x-[-50%] top-[-56px] size-[128px]"
      image="https://placehold.jp/3d4070/ffffff/150x150.png"
    />
    <div class="text-center gap-x-2 pt-20">
      <div class="relative inline-block">
        <h1 class="text-headline">{{ officeStore.activeOffice?.title }}</h1>
        <button
          class="absolute right-[-32px] top-1/2 translate-y-[-50%]"
          @click="showOfficeModal = true">
          <IconArrowDown bg />
        </button>
      </div>
    </div>
    <h3 class="text-body-m-regular text-neutral-500 pt-2 text-center">{{ officeStore.activeOffice?.address }}</h3>
  </div>

  <div class="flex flex-col gap-y-4 mt-6">
    <SelectionRow
      :title="$t('welcome')"
      :link=" {
        name: 'specialists',
        query: {
          branch_id: officeStore.activeOffice?.id
        }
      }"
    >
      <IconAccount />
    </SelectionRow>
    <SelectionRow
      title="Выбрать дату"
      link="dates"
    >
      <IconCalendar />
    </SelectionRow>
    <SelectionRow
      title="Выбрать услуги"
      link="services"
    >
      <IconMore />
    </SelectionRow>
  </div>

<!--  <p class="text-body-m-regular mt-8">Купить</p>-->

<!--  <SelectionRow-->
<!--    class="mt-4"-->
<!--    title="Оформление заказа"-->
<!--    link="/order"-->
<!--  >-->
<!--    <IconWallet />-->
<!--  </SelectionRow>-->

  <Transition name="fade">
    <OfficeModal v-if="showOfficeModal" @close="showOfficeModal = false">
      <div class="mt-6 text-center">
        <h2 class="text-headline">{{ officeStore.activeOffice?.title }}</h2>
        <h3 class="text-body-m-regular text-neutral-500 pt-2">{{ officeStore.activeOffice?.address }}</h3>
        <AppButton text="О филиале" class="mt-8 w-full" @click="$emit('close')" />
        <AppButton text="Все филиалы" class="mt-3 w-full" @click="router.push({name: 'offices'})" />
      </div>
    </OfficeModal>
  </Transition>
</main>
</template>
