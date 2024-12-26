<script setup>

import Avatar from "@/components/UI/Avatar.vue";
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import {useOfficeStore} from "@/stores/office.js";

const officeStore = useOfficeStore()

</script>

<template>
  <RouterLink class="flex items-center gap-x-2" to="/">
    <IconArrowLeft md/>
    <div class="flex gap-x-2">
      <Avatar
        image="https://placehold.jp/3d4070/ffffff/150x150.png"
        class="size-[48px]"
      />
      <RouterLink to="/" class="block">
        <div class="text-body-m-regular uppercase">{{officeStore.activeOffice.title}}</div>
        <div class="text-body-m-regular text-neutral-500">{{officeStore.activeOffice.address}}</div>
      </RouterLink>
    </div>
  </RouterLink>
</template>

<style scoped>

</style>