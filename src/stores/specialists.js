import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";
import axiosInst from "@/axios.instance.js";

export const useSpecialistsStore = defineStore('specialists', () => {
  const specialists = ref([]);
  const isLoading = ref(false);
  const specialist = ref({});

  const getSpecialistById = async (id) => {
    isLoading.value = true
    const response = await axiosInst.get(`/specialist.json?id=${id}`)
    specialist.value = response.data
    isLoading.value = false
  }

  const sendReview = async (specialistId, review) => {
    await axiosInst.post(`/review/${specialistId}`, review)
  }

  const getSpecialists = async ({date = null, time = null, branchId = null}) => {
    isLoading.value = true
    let url = '/specialists.json';
    const params = new URLSearchParams();

    if (time) {
      params.append('time', time);
    }

    if (date) {
      params.append('date', date);
    }

    if (branchId) {
      params.append('branch_id', branchId);
    }

    url += `?${params.toString()}`
    const response = await axiosInst.get(url)
    specialists.value = response.data
    isLoading.value = false
  }

  return {
    specialists,
    specialist,
    getSpecialistById,
    getSpecialists,
    isLoading,
    sendReview
  }
})
