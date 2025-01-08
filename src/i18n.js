import { createI18n } from 'vue-i18n';

import en from '@/locales/en.json';
import ru from '@/locales/ru.json';

const i18n = createI18n({
  locale: 'ru',
  fallbackLocale: 'ru',
  messages: {
    ru,
    en,
  },
});

export default i18n;
