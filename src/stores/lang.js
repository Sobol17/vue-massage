import { defineStore } from 'pinia';
import {ref} from "vue";


export const useLangStore = defineStore('lang', () => {
  const locale = ref('')

  return {
    locale
  };
});