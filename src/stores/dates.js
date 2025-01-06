import {ref, computed, reactive} from 'vue'
import { defineStore } from 'pinia'
import getFullNamedDate from "@/utils/getFullNamedDate.js";
import axios from "axios";

export const useDateStore = defineStore('dates', () => {

  const dates = ref([])

  const getAvailableDates = async ({specialistId = null}) => {
    let url = '/dates.json';
    const params = new URLSearchParams();

    if (specialistId) {
      params.append('specialistId', specialistId);
    }

    url += `?${params.toString()}`
    const response = await axios.get(url)
    dates.value = response.data
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
