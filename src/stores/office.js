import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";
import axiosInst from "@/axios.instance.js";

export const useOfficeStore = defineStore('office', () => {

  const offices = ref([]);

  const initialOffice = ref(null);

  const activeOffice = computed(() => {
    return initialOffice.value;
  });

  const changeOffice = (office) => {
    initialOffice.value = office
  }

  const getOffices = async () => {
    const response = await axiosInst.get('/offices.json')
    offices.value = response.data
    initialOffice.value = response.data[0]
  }

  return { activeOffice, changeOffice, getOffices, offices}
})
