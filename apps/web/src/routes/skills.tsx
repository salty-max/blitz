import { skills } from '@blitz/data'
import { DescriptionList, DescriptionRow, SectionHeading } from '@blitz/ui'

import { RefText } from '@/components/ref-text'

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
      <h1 className="font-display text-5xl uppercase">Skills &amp; Traits</h1>

      {CATEGORIES.map(([key, label]) => {
        const group = skills.filter((skill) => skill.category === key)
        return (
          <section key={key} className="mt-8">
            <SectionHeading tone="blood" bordered hint={`· ${group.length}`}>
              {label}
            </SectionHeading>
            <DescriptionList className="mt-3">
              {group.map((skill) => (
                <DescriptionRow key={skill.key} term={skill.name}>
                  <RefText>{skill.effect}</RefText>
                </DescriptionRow>
              ))}
            </DescriptionList>
          </section>
        )
      })}
    </div>
  )
}
