import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { languageDetector } from '@/i18n/detector'
import { DEFAULT_LOCALE } from '@/i18n/locale'
import { en } from '@/i18n/locales/en'
import { fr } from '@/i18n/locales/fr'

const resources = { en, fr } as const
type Resources = typeof resources

/** Initialise i18next once, before any component renders. */
export function initI18n(): void {
  void i18n
    .use(initReactI18next)
    .use(languageDetector)
    .init({
      resources,
      fallbackLng: DEFAULT_LOCALE,
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    })

  const applyLang = (lng: string) => {
    document.documentElement.lang = lng
  }
  i18n.on('languageChanged', applyLang)
  applyLang(i18n.resolvedLanguage ?? DEFAULT_LOCALE)
}

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: Resources['en']
  }
}
