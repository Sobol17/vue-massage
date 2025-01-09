<script setup>
import {useI18n} from "vue-i18n";
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const {locale} = useI18n()
const route = useRoute()
const router = useRouter()
const selectedLocale = ref(route.params.locale);

const changeLocale = () => {
  locale.value = selectedLocale.value;
  router.replace({params: {...route.params, locale: selectedLocale.value}})
};
</script>

<template>
  <select class="border border-solid border-neutral-300 rounded-[6px] p-1 outline-none" v-model="selectedLocale" @change="changeLocale">
    <option value="en">English</option>
    <option value="ru">Русский</option>
  </select>
</template>

<style scoped>

</style>