import { useTranslation } from 'react-i18next'

import {
  DEFAULT_LOCALE,
  isSupportedLocale,
  type Locale,
  SUPPORTED_LOCALES,
} from '@/i18n/locale'
import { SegmentedControl } from '@/ui'

/** A compact segmented switch between the supported UI languages. */
export function LanguageToggle() {
  const { i18n, t } = useTranslation('common')
  const active = isSupportedLocale(i18n.resolvedLanguage)
    ? i18n.resolvedLanguage
    : DEFAULT_LOCALE

  return (
    <SegmentedControl<Locale>
      size="sm"
      aria-label={t('language.label')}
      value={active}
      options={SUPPORTED_LOCALES.map((value) => ({
        value,
        label: value.toUpperCase(),
      }))}
      onValueChange={(value) => void i18n.changeLanguage(value)}
    />
  )
}
