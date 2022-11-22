// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../public/locales/en/common.json";
import hk from "../public/locales/hk/common.json";

const userLang = "hk";

export const supportedLanguages = ["en", "hk"];

const resources = {
  en: {
    translation: en,
  },
  hk: {
    translation: hk,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: userLang, //預設語言
  fallbackLng: "en", //如果當前切換的語言沒有對應的翻譯則使用這個語言，
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
