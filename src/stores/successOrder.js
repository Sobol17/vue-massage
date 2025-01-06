import {ref, computed, reactive} from 'vue'
import { defineStore } from 'pinia'
import getFullNamedDate from "@/utils/getFullNamedDate.js";
import axios from "axios";
import axiosInst from "@/axios.instance.js";

export const useSuccessOrderStore = defineStore('success', () => {

  const successOrder = ref({})

  const cancelOrder = () => {
    console.log('Запись отменена, тут будет запрос на отмену записи')
  }

  const changeDate = () => {
    console.log('Запись перенесена, тут будет запрос на замену записи')
  }

  const getSuccessOrder = async () => {
    const response = await axiosInst.get("/success.json");
    successOrder.value = response.data;
  }

  return {
    successOrder,
    changeDate,
    cancelOrder,
    getSuccessOrder
  }
})
