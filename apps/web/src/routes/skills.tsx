import { skills } from '@blitz/data'

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
            <h2 className="flex items-baseline gap-2 border-b-2 border-ink pb-1 font-display text-3xl uppercase text-blood">
              {label}
              <span className="font-headline text-base font-semibold text-ink/40">
                · {group.length}
              </span>
            </h2>
            <dl className="mt-3 divide-y divide-ink/10">
              {group.map((skill) => (
                <div
                  key={skill.key}
                  className="grid gap-1 py-2.5 sm:grid-cols-[12rem_1fr] sm:gap-4"
                >
                  <dt className="font-headline text-lg font-semibold uppercase tracking-wide">
                    {skill.name}
                  </dt>
                  <dd className="text-ink/85">
                    <RefText>{skill.effect}</RefText>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )
      })}
    </div>
  )
}
