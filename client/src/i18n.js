import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import ru from "./lang/ru.json";
import uz from "./lang/uz.json";
import en from "./lang/en.json";

const resources = {
  ru: {
    translation: ru,
  },
  uz: {
    translation: uz,
  },
  us: {
    translation: en,
  },
};
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    detection: {
      checkWhitelist: true,
    },
    debug: true,

    fallbackLng: "ru",
    keySeparator: false,
    debug: false,
    whitelist: resources,
    interpolation: {
      escapeValue: false,
    },
    react: { useSuspense: false },
  });

export default i18n;
