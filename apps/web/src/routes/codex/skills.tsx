import { getSkills } from '@blitz/data'
import { useTranslation } from 'react-i18next'

import { useDataLocale } from '@/i18n/use-data-locale'
import { RefText } from '@/reference/ref-text'
import { DescriptionList, PageHeading, SectionHeading } from '@/ui'

const CATEGORIES = [
  'general',
  'agility',
  'passing',
  'strength',
  'devious',
  'mutation',
  'trait',
] as const

/** The skills & traits catalogue — every effect renders its `[[ref]]`s as drawer links. */
export function SkillsPage() {
  const { t } = useTranslation('codex')
  const locale = useDataLocale()
  const localizedSkills = getSkills(locale)

  return (
    <div>
      <PageHeading>{t('skills.heading')}</PageHeading>

      {CATEGORIES.map((key) => {
        const group = localizedSkills.filter((skill) => skill.category === key)
        return (
          <section key={key} className="mt-8">
            <SectionHeading tone="blood" bordered hint={`· ${group.length}`}>
              {t(`skills.categories.${key}`)}
            </SectionHeading>
            <DescriptionList className="mt-3">
              {group.map((skill) => (
                <DescriptionList.Row key={skill.key} term={skill.name}>
                  <RefText>{skill.effect}</RefText>
                </DescriptionList.Row>
              ))}
            </DescriptionList>
          </section>
        )
      })}
    </div>
  )
}
