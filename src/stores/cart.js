import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {useRoute} from "vue-router";

export const useCartStore = defineStore('cart', () => {
  // логика работы с корзиной
  const chosenServices = ref([]);

  const chosenSpecialist = ref({
    id: null
  })

  const chosenDate = ref(null)
  const chosenTime = ref('')

  const addServiceToCart = (service) => {
    if (chosenServices.value.includes(service)) {
      chosenServices.value = chosenServices.value.filter(item => item.id !== service.id)
    } else {
      chosenServices.value.push(service);
    }
  }

  const removeServiceFromCart = (service) => {
    chosenServices.value = chosenServices.value.filter(item => item.id !== service.id)
  }

  const serviceInBasketCount = computed(() => chosenServices.value.length)

  const cartTotalPrice = computed(() => {
    return chosenServices.value.reduce((total, service) => {
      return total + service.price
    }, 0)
  })

  const cartTotalTime = computed(() => {
    return chosenServices.value.reduce((total, service) => {
      return total + service.time
    }, 0)
  });

  const route = useRoute();

  const cartButtonInfo = computed(() => {
    if (serviceInBasketCount.value > 0 && chosenSpecialist.value !== null && chosenDate.value !== null) {
      return {
        title: route.params.locale === 'ru' ? 'Готово' : 'Done',
        link: 'order'
      }
    } else if (serviceInBasketCount.value > 0 && chosenSpecialist.value.id !== null && chosenDate.value === null) {
      return {
        title: route.params.locale === 'ru' ? 'Выбрать дату и время' : 'Select date and time',
        link: {
          name: 'dates',
          query: {
            specialist: chosenSpecialist.value.id,
            serviceIds: chosenServices.value.map(item => item.id)
          }
        }
      }
    } else {
      return {
        title: route.params.locale === 'ru' ? 'Выбрать специалиста' : 'Select specialist',
        link: {
          name: 'specialists',
          query: {
            serviceIds: chosenServices.value.map(item => item.id),
          }
        }
      }
    }
  })

  const clearCart = () => {
    chosenServices.value = [];
    chosenSpecialist.value = {
      id: null
    }
    chosenDate.value = null
    chosenTime.value = ''
  }

  return {
    addServiceToCart,
    serviceInBasketCount ,
    cartTotalPrice,
    cartTotalTime,
    removeServiceFromCart,
    chosenServices,
    chosenSpecialist,
    chosenDate,
    chosenTime,
    cartButtonInfo,
    clearCart
  }
})
