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

  const getSpecialists = async () => {
    const response = await axios.get(`/specialists.json`)
    specialists.value = response.data
  }

  return {
    specialists,
    specialist,
    getSpecialistById,
    getSpecialists
  }
})
