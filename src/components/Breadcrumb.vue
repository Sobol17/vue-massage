<script setup>

import Avatar from "@/components/UI/Avatar.vue";
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import {useOfficeStore} from "@/stores/office.js";
import {useRoute} from "vue-router";
import {useI18n} from "vue-i18n";
import LangSwitch from "@/components/langSwitch.vue";

const officeStore = useOfficeStore()
const route = useRoute();

const {locale} = useI18n()
</script>

<template>
  <div class="flex justify-between">
    <RouterLink class="flex items-center gap-x-2" :to="`/${locale}`">
      <IconArrowLeft md/>
      <div class="flex gap-x-2">
        <Avatar
          image="https://placehold.jp/3d4070/ffffff/150x150.png"
          class="size-[48px]"
        />
        <div class="block">
          <div class="text-body-m-regular uppercase">{{officeStore.activeOffice?.title}}</div>
          <div class="text-body-m-regular text-neutral-500">{{officeStore.activeOffice?.address}}</div>
        </div>
      </div>
    </RouterLink>
    <LangSwitch class="shrink-0 self-start"/>
  </div>
</template>

<style scoped>

</style>