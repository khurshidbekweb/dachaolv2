import 'react-i18next';

declare module 'react-i18next' {
  interface Resources {
    common: typeof import('../locales/uz/translation.json');
  }
}



const a = {
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'uz'],
    },
  };
const {i18n} = a
  module.exports = {
    i18n
  };
  