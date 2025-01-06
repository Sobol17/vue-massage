import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Offices from "@/views/Offices.vue";
import Specialist from "@/views/Specialist.vue";
import Dates from "@/views/Dates.vue";
import Services from "@/views/Services.vue";
import Order from "@/views/Order.vue";
import SuccessOrder from "@/views/SuccessOrder.vue";
import SpecialistId from "@/views/SpecialistId.vue";
import {useOfficeStore} from "@/stores/office.js";

const router = createRouter({
  history: createWebHistory(process.env.NODE_ENV === 'production' ? '/vue-massage/' : '/'),
  routes: [
    {
      path: '/:address',
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
        },
        {
          path: 'offices',
          name: 'offices',
          component: Offices,
        },
        {
          path: 'specialists',
          name: 'specialists',
          component: Specialist,
        },
        {
          path: 'specialists/:id',
          name: 'specialist',
          component: SpecialistId,
        },
        {
          path: 'dates',
          name: 'dates',
          component: Dates,
        },
        {
          path: 'services',
          name: 'services',
          component: Services,
        },
        {
          path: 'order',
          name: 'order',
          component: Order,
        },
        {
          path: 'thanks',
          name: 'thanks',
          component: SuccessOrder,
        },
      ]
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  if (!to.params.address) {
    const officeStore = useOfficeStore()
    await officeStore.getOffices();
    next(`/${officeStore.activeOffice.code}/`);
  } else {
    next();
  }
});

export default router
