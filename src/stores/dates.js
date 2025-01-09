import {ref, computed, reactive} from 'vue'
import { defineStore } from 'pinia'
import axiosInst from "@/axios.instance.js";

export const useDateStore = defineStore('dates', () => {

  const dates = ref([])
  const isLoading = ref(false)

  const getAvailableDates = async ({specialistId = null, branchId = null, locale = 'ru'}) => {
    isLoading.value = true
    let url = '/dates.json';
    const params = new URLSearchParams();

    if (specialistId) {
      params.append('specialist', specialistId);
    }

    if (branchId) {
      params.append('branch_id', branchId);
    }

    params.append('locale', locale);

    url += `?${params.toString()}`
    const response = await axiosInst.get(url)
    dates.value = response.data
    isLoading.value = false
  }

  const availableDates = computed(() => {
    return dates.value.map(item => {
      return item.date
    })
  })

  return {
    dates,
    getAvailableDates,
    availableDates
  }
})
