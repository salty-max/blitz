import { DATA_LOCALES, type DataLocale } from '@blitz/data'
import { useTranslation } from 'react-i18next'

/** The active UI language narrowed to a locale the reference data can be read in (English otherwise). */
export function useDataLocale(): DataLocale {
  const lang = useTranslation().i18n.resolvedLanguage ?? ''
  return (DATA_LOCALES as readonly string[]).includes(lang)
    ? (lang as DataLocale)
    : 'en'
}
