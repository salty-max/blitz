import type { LanguageDetectorModule } from 'i18next'

import { DEFAULT_LOCALE, isSupportedLocale } from '@/i18n/locale'

const STORAGE_KEY = 'blitz-lang'

/**
 * Resolves the UI language from a stored choice, then the browser preferences,
 * validated against the supported locales. Persists explicit changes so a
 * reload keeps the coach's language.
 */
export const languageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  detect: () => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isSupportedLocale(stored)) return stored

    for (const tag of navigator.languages ?? [navigator.language]) {
      const code = tag.split('-')[0]
      if (isSupportedLocale(code)) return code
    }

    return DEFAULT_LOCALE
  },
  cacheUserLanguage: (lng) => {
    localStorage.setItem(STORAGE_KEY, lng)
  },
}
