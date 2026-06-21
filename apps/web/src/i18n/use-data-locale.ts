import type { DataLocale } from '@blitz/data'
import { useTranslation } from 'react-i18next'

/** The active UI language narrowed to the locales the reference data translates. */
export function useDataLocale(): DataLocale {
  const { i18n } = useTranslation()
  return i18n.resolvedLanguage === 'fr' ? 'fr' : 'en'
}
