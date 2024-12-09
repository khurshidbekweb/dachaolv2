import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'uz', // Default til
    supportedLngs: ['ru', 'uz'], // Qo‘llab-quvvatlanadigan tillar
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
