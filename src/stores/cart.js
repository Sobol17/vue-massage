import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

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

  const cartButtonInfo = computed(() => {
    if (serviceInBasketCount.value > 0 && chosenSpecialist.value !== null && chosenDate.value !== null) {
      return {
        title: 'Готово',
        link: 'order'
      }
    } else if (serviceInBasketCount.value > 0 && chosenSpecialist.value.id !== null && chosenDate.value === null) {
      return {
        title: 'Выбрать дату и время',
        link: {
          name: 'dates',
          query: {
            specialist: chosenSpecialist.value.id
          }
        }
      }
    } else {
      return {
        title: 'Выбрать специалиста',
        link: 'specialists'
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
