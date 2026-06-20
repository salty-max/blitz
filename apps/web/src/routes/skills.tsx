import { skills } from '@blitz/data'

import { RefText } from '@/components/ref-text'
import { DescriptionList, PageHeading, SectionHeading } from '@/components/ui'

const CATEGORIES = [
  ['general', 'General'],
  ['agility', 'Agility'],
  ['passing', 'Passing'],
  ['strength', 'Strength'],
  ['devious', 'Devious'],
  ['mutation', 'Mutations'],
  ['trait', 'Traits'],
] as const

/** The skills & traits catalogue — every effect renders its `[[ref]]`s as drawer links. */
export function SkillsPage() {
  return (
    <div>
      <PageHeading>Skills &amp; Traits</PageHeading>

      {CATEGORIES.map(([key, label]) => {
        const group = skills.filter((skill) => skill.category === key)
        return (
          <section key={key} className="mt-8">
            <SectionHeading tone="blood" bordered hint={`· ${group.length}`}>
              {label}
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
