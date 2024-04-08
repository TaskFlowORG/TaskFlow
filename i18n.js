const i18n = require('i18next');
const { initReactI18next } = require('react-i18next');
//consome de public -> locales > en.json || pt.json || es.json
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: require('./public/locales/en/common.json'),
      },
      pt: {
        translation: require('./public/locales/pt/common.json'),
      },
      es: {
        translation: require('./public/locales/es/common.json'),
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    ns: ['translation'],
    defaultNS: 'translation',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

module.exports = i18n;