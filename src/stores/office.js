import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

export const useOfficeStore = defineStore('office', () => {

  const offices = ref([]);

  const activeOffice = computed(() => {
    return offices.value[0]
  })

  const changeOffice = (office) => {
    activeOffice.value = office
  }

  const getOffices = async () => {
    const response = await axios.get('/offices.json')
    offices.value = response.data
  }

  return { activeOffice, changeOffice, getOffices, offices }
})
