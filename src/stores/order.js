import {ref, computed, reactive} from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

export const useOrderStore = defineStore('order', () => {
  const orderForm = reactive({
    name: localStorage.getItem('name') || '',
    phone: localStorage.getItem('phone') || '',
    email: localStorage.getItem('email') || '',
    comment: '',
    remind: '0',
    onlinePayment: false
  });

  // Объект для хранения ошибок
  const errors = reactive({
    name: false,
    phone: false,
    email: false,
    comment: false,
    remind: false
  });

  const validateForm = () => {
    let isValid = true;

    if (!orderForm.name.trim()) {
      errors.name = true;
      isValid = false;
    } else {
      errors.name = false;
    }

    if (!orderForm.phone.trim()) {
      errors.phone = true;
      isValid = false;
    } else {
      errors.phone = false;
    }

    if (orderForm.phone.length < 16) {
      errors.phone = true;
      isValid = false;
    } else {
      errors.phone = false;
    }

    return isValid;
  }

  const sendOrderForm = async (request) => {
    await axios.post('/order', request)
  }

  return {
    orderForm,
    errors,
    validateForm,
    sendOrderForm
  }
})
