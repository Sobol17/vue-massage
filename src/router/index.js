import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Offices from "@/views/Offices.vue";
import Specialist from "@/views/Specialist.vue";
import Dates from "@/views/Dates.vue";
import Services from "@/views/Services.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/offices',
      name: 'offices',
      component: Offices,
    },
    {
      path: '/specialists',
      name: 'specialists',
      component: Specialist,
    },
    {
      path: '/dates',
      name: 'dates',
      component: Dates,
    },
    {
      path: '/services',
      name: 'services',
      component: Services,
    },
  ],
})

export default router
