import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";
import axiosInst from "@/axios.instance.js";

export const useServiceStore = defineStore('service', () => {
  // логика работы с услугами
  const services = ref([])
  const isLoading = ref(false)
  const searchQuery = ref('')

  const filteredServices = computed(() => {
    return services.value.map(service => {
      return {
        ...service,
        items: service.items.filter(item =>
          item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      };
    }).filter(service => service.items.length > 0);
  });

  const categories = computed(() => {
    return services.value.map(service => service.category)
  })

  const getServices = async ({ specialistId = null, time = null, date = null, branchId = null } = {}) => {
    isLoading.value = true
    let url = '/services.json';
    const params = new URLSearchParams();

    if (specialistId && specialistId != 0) {
      params.append('specialist_id', specialistId);
    }

    if (time) {
      params.append('time', time);
    }

    if (date) {
      params.append('date', date);
    }

    if (branchId) {
      params.append('branch_id', branchId);
    }

    if (Array.from(params).length > 0) {
      url += `?${params.toString()}`;
    }

    const response = await axiosInst.get(url);
    services.value = response.data;
    isLoading.value = false
  };

  return {
    services,
    categories,
    filteredServices,
    searchQuery,
    getServices,
    isLoading
  }
})
