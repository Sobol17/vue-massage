import { createRouter, createWebHistory } from 'vue-router'
import {useOfficeStore} from "@/stores/office.js";
import Home from "@/views/Home.vue";
import Offices from "@/views/Offices.vue";
import Specialist from "@/views/Specialist.vue";
import SpecialistId from "@/views/SpecialistId.vue";
import Dates from "@/views/Dates.vue";
import Services from "@/views/Services.vue";
import Order from "@/views/Order.vue";
import SuccessOrder from "@/views/SuccessOrder.vue";
import {useLangStore} from "@/stores/lang.js";

const router = createRouter({
  history: createWebHistory(process.env.NODE_ENV === 'production' ? '/vue-massage/' : '/'),
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
  routes: [
    {
      path: '/:locale(en|ru)',
      children: [
        {
          path: ':address',
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
          ],
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const officeStore = useOfficeStore();
  const localeStore = useLangStore();

  // Получаем параметры маршрута
  const locale = to.params.locale;
  const address = to.params.address;

  // Проверяем, существует ли язык (en или ru)
  const supportedLocales = ['en', 'ru'];
  if (!supportedLocales.includes(locale)) {
    const correctedPath = `/ru${to.path.replace(/^\/[^/]+/, '')}`;
    if (to.fullPath !== correctedPath) {
      return next(correctedPath); // Перенаправляем на язык по умолчанию
    }
  }

  // Устанавливаем язык в хранилище
  if (localeStore.locale !== locale) {
    localeStore.setLocale(locale, false);
  }

  // Если адрес не указан, загружаем офисы и перенаправляем
  if (!address) {
    await officeStore.getOffices();

    // Перенаправляем с использованием текущего языка
    const correctedPath = `/${locale}/${officeStore.activeOffice.code}/`;
    if (to.fullPath !== correctedPath) {
      return next(correctedPath);
    }
  }

  // Если список офисов ещё не загружен, загружаем его
  if (officeStore.offices.length === 0) {
    await officeStore.getOffices();
  }

  // Проверяем, существует ли офис с таким кодом
  const officeExists = officeStore.offices.some((office) => office.code === address);

  // Если офис не найден, перенаправляем на активный офис
  if (!officeExists) {
    const correctedPath = `/${locale}/${officeStore.activeOffice.code}/`;
    if (to.fullPath !== correctedPath) {
      return next(correctedPath);
    }
  }

  // Устанавливаем активный офис
  const targetOffice = officeStore.offices.find((office) => office.code === address);
  if (targetOffice) {
    officeStore.changeOffice(targetOffice);
  }
  // Продолжаем навигацию
  next();
});


export default router
