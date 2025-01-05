import {ref, computed, reactive} from 'vue'
import { defineStore } from 'pinia'
import getFullNamedDate from "@/utils/getFullNamedDate.js";
import axios from "axios";

export const useDateStore = defineStore('dates', () => {

  const dates = ref([])

  const getAvailableDates = async () => {
    const res = await axios.get('/dates.json')
    dates.value = res.data
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
