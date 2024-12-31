import {ref, computed, reactive} from 'vue'
import { defineStore } from 'pinia'
import getFullNamedDate from "@/utils/getFullNamedDate.js";

export const useSuccessOrderStore = defineStore('success', () => {

  const successOrder = ref({
    date: getFullNamedDate('05.01.2025'),
    time: '09:00-12:00',
    specialist: {
      id: 444,
      name: 'Александр Александров',
      prof: 'Массажист',
      img: 'https://placehold.jp/3d4070/ffffff/600x300.png',
      reviews: 5
    },

    services: [
      {
        id: 1,
        title: 'Массаж1',
        time: 60,
        price: 1240
      },
      {
        id: 2,
        title: 'Массаж2',
        time: 45,
        price: 1240
      }
    ],
    totalPrice: 2480,
    currentOffice: {
      id: 1,
      name: 'MASSANTE',
      address: 'ул. Пушкина 1',
      img: 'https://placehold.jp/3d4070/ffffff/150x150.png',
      addressImg: 'https://placehold.jp/3d4070/ffffff/600x300.png'
    }
  })

  const cancelOrder = () => {
    console.log('Запись отменена, тут будет запрос на отмену записи')
  }

  const changeDate = () => {
    console.log('Запись перенесена, тут будет запрос на замену записи')
  }

  return {
    successOrder,
    changeDate,
    cancelOrder
  }
})
