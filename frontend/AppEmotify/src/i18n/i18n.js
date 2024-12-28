import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import tr from './locales/tr.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3', // React Native için gerekli
  resources: {
    en: { translation: en },
    tr: { translation: tr },
  },
  lng: 'en', // Varsayılan dil
  fallbackLng: 'en', // Desteklenmeyen dil için geri dönüş dili
  interpolation: {
    escapeValue: false, // React Native için gereksiz
  },
});

export default i18n;
