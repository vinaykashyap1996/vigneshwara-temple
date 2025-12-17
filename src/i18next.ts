'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'

const timestamp = new Date().getTime()

i18n
    // Load translations using http backend
    .use(HttpBackend)
    // Detect user language
    .use(LanguageDetector)
    // Bind i18next to React
    .use(initReactI18next)
    // Initialize i18next
    .init({
        fallbackLng: 'en',
        supportedLngs: ['en', 'hi', 'kn'],
        debug: true,

        interpolation: {
            escapeValue: false,
        },

        backend: {
            loadPath: `/locales/{{lng}}/{{ns}}.json?t=${timestamp}`,
            crossDomain: false,
        },

        ns: ['common'],
        defaultNS: 'common',

        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },

        react: {
            useSuspense: false,
        },
    })

export default i18n