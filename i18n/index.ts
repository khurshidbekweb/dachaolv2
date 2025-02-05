import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import { safeLocalStorage } from '@/utils/safeLocalstorge';
import enTranslation from '@/locales/en/translation.json'
import uzTranslation from '@/locales/uz/translation.json'
import ruTranslation from '@/locales/ru/translation.json'

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    resources: {
      uz: { translation: uzTranslation },
      ru: { translation: ruTranslation },
      en: { translation: enTranslation },
    },
    fallbackLng: safeLocalStorage.getItem('language') || 'uz', // Default til
    supportedLngs: ['ru', 'uz', 'en'], // Qo‘llab-quvvatlanadigan tillar
    interpolation: {
      escapeValue: false, // React uchun xavfsiz
    },
    detection: {
      order: ['path', 'cookie', 'localStorage', 'navigator'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Tarjima fayllar yo‘li
    },
  });

export default i18n;
