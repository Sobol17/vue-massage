import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useOfficeStore = defineStore('office', () => {
  const activeOffice = ref({
    title: 'Массажный салон №1',
    address: 'ул. Пушкина, 25',
  });

  const changeOffice = (office) => {
    activeOffice.value = office
  }

  return { activeOffice, changeOffice }
})
