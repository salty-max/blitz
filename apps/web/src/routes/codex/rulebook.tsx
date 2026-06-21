import { getRuleTopic, getRuleTopics } from '@blitz/data'
import { Link, useParams } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { useDataLocale } from '@/i18n/use-data-locale'
import { RefText } from '@/reference/ref-text'
import { Card, EmptyState, PageHeading, SectionHeading } from '@/ui'

/** The rulebook landing — a card per rules topic. */
export function RulebookIndex() {
  const { t } = useTranslation('codex')
  const locale = useDataLocale()

  return (
    <div>
      <PageHeading>{t('rulebook.heading')}</PageHeading>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {getRuleTopics(locale).map((topic) => (
          <Card
            key={topic.key}
            asChild
            interactive
            className="flex flex-col p-5"
          >
            <Link to="/codex/rulebook/$topic" params={{ topic: topic.key }}>
              <h2 className="font-display text-2xl uppercase group-hover:text-paper">
                {topic.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-ink/65 group-hover:text-paper/80">
                {topic.summary}
              </p>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}

/** A single rules topic — its sections, with `[[ref]]` prose linked to the drawer. */
export function RulebookTopic() {
  const { t } = useTranslation('codex')
  const locale = useDataLocale()
  const { topic: key } = useParams({ strict: false })
  const topic = key ? getRuleTopic(key, locale) : undefined

  if (!topic) {
    return <EmptyState>{t('rulebook.notFound')}</EmptyState>
  }

  return (
    <div className="space-y-8">
      <header className="border-b-4 border-ink pb-5">
        <PageHeading>{topic.title}</PageHeading>
        <p className="mt-3 max-w-2xl text-ink/75">{topic.summary}</p>
      </header>

      {topic.sections.map((section) => (
        <section key={section.key} className="space-y-2">
          <SectionHeading tone="blood" bordered>
            {section.heading}
          </SectionHeading>
          <p className="max-w-3xl whitespace-pre-line leading-relaxed text-ink/85">
            <RefText>{section.body}</RefText>
          </p>
        </section>
      ))}
    </div>
  )
}
