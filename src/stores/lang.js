import { defineStore } from 'pinia';
import {ref, watch} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import i18n from '@/i18n';

export const useLangStore = defineStore('lang', () => {
  const router = useRouter();
  const route = useRoute();

  const locale = ref(localStorage.getItem('locale') || 'ru'); // Определяем locale

  function setLocale(newLocale, updateUrl = true) {
    if (newLocale === locale.value) return;

    locale.value = newLocale;

    i18n.global.locale = newLocale;

    localStorage.setItem('locale', newLocale);

    if (updateUrl && route.params.locale !== newLocale) {
      const newPath = `/${newLocale}${route.path.replace(/^\/(en|ru)/, '')}`;
      router.push({ path: newPath });
    }
  }

  function initLocale() {
    const routeLocale = route.params.locale; // Получаем язык из URL
    const supportedLocales = ['en', 'ru'];

    if (supportedLocales.includes(routeLocale)) {
      setLocale(routeLocale, false); // Устанавливаем язык без обновления URL
    } else {
      setLocale('ru', false); // Устанавливаем язык по умолчанию
    }
  }

  watch(
    () => route.params.locale,
    (newLocale) => {
      if (newLocale && newLocale !== locale.value) {
        setLocale(newLocale, false);
      }
    },
    { immediate: true }
  );

  return {
    locale,
    setLocale,
    initLocale
  };
});