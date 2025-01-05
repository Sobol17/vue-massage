import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useOfficeStore = defineStore('office', () => {
  const activeOffice = ref({
    id: 1,
    title: 'Массажный салон №1',
    code: 'pushkina-25',
    text: 'Советуем прийти в студию за 10-15 минут В случае отмены,\n' +
      '          предупредите, пожалуйста, администратора +7(995)690-05-90',
    address: 'ул. Пушкина, 25',
  });

  const changeOffice = (office) => {
    activeOffice.value = office
  }

  return { activeOffice, changeOffice }
})
