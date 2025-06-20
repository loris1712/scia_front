// app/i18n.ts
'use client';

import { useTranslation as useTranslationOrg } from 'react-i18next';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const lang = typeof window !== "undefined" ? localStorage.getItem("language") : null;

if (!i18n.isInitialized) {
  i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'it',
      debug: false,
      lng: lang || "it",  // uso la variabile protetta
      supportedLngs: ['it', 'en', 'es'],
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
      ns: ['common', 'settings'],
      defaultNS: 'common',
      react: {
        useSuspense: false,
      },
    });
}

export const useTranslation = (namespace = 'common') => useTranslationOrg(namespace);
