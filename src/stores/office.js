import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";
import axiosInst from "@/axios.instance.js";

export const useOfficeStore = defineStore('office', () => {

  const offices = ref([]);
  const isLoading = ref(false);
  const initialOffice = ref(null);

  const activeOffice = computed(() => {
    return initialOffice.value;
  });

  const changeOffice = (office) => {
    initialOffice.value = office
  }

  const getOffices = async () => {
    isLoading.value = true
    const response = await axiosInst.get('/offices.json')
    offices.value = response.data

    if (initialOffice.value === null) initialOffice.value = response.data[0];

    isLoading.value = false
  }

  return { activeOffice, changeOffice, getOffices, offices, isLoading}
})
