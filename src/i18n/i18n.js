import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en/en.json';
import ru from './locales/ru/ru.json';
import translationEn from './locales/en/translation.json';
import translationRu from './locales/ru/translation.json';

// Initialize i18next with the settings
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // Default language, if it was not possible to determine
    debug: true,
    resources: {
      en: { // Combining translations for English
        translation: {
          ...en,
          ...translationEn
        }
      },
      ru: { // Combining translations for Russian
        translation: {
          ...ru,
          ...translationRu
        }
      }
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
