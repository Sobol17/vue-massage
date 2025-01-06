import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

export const useSpecialistsStore = defineStore('specialists', () => {
  const specialists = ref([]);

  const specialist = ref({});

  const getSpecialistById = async (id) => {
    const response = await axios.get(`/specialist.json?id=${id}`)
    specialist.value = response.data
  }

  const getSpecialists = async ({date = null, time = null}) => {
    let url = '/specialists.json';
    const params = new URLSearchParams();

    if (time) {
      params.append('time', time);
    }

    if (date) {
      params.append('date', date);
    }

    url += `?${params.toString()}`
    const response = await axios.get(url)
    specialists.value = response.data
  }

  return {
    specialists,
    specialist,
    getSpecialistById,
    getSpecialists
  }
})
