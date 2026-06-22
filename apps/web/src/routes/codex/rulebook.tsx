import { getRuleTopic, getRuleTopics } from '@blitz/data'
import { Link, useParams } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { useDataLocale } from '@/i18n/use-data-locale'
import { RefText } from '@/reference/ref-text'
import { Card, EmptyState, PageHeading, SectionHeading, Text } from '@/ui'

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
              <Text
                as="h2"
                variant="subheading"
                className="group-hover:text-paper"
              >
                {topic.title}
              </Text>
              <Text
                tone="secondary"
                className="mt-2 flex-1 group-hover:text-paper/80"
              >
                {topic.summary}
              </Text>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}

type ProseBlock =
  | { kind: 'p'; text: string }
  | { kind: 'ol'; items: string[] }
  | { kind: 'ul'; items: string[] }

/** Group a body's lines into paragraphs and `1.`/`-` lists for readable layout. */
function toBlocks(body: string): ProseBlock[] {
  const blocks: ProseBlock[] = []
  for (const raw of body.split('\n')) {
    const line = raw.trim()
    if (!line) continue
    const ordered = /^\d+[.)] (.*)$/.exec(line)
    const unordered = /^[-•] (.*)$/.exec(line)
    const last = blocks.at(-1)
    if (ordered) {
      if (last?.kind === 'ol') last.items.push(ordered[1])
      else blocks.push({ kind: 'ol', items: [ordered[1]] })
    } else if (unordered) {
      if (last?.kind === 'ul') last.items.push(unordered[1])
      else blocks.push({ kind: 'ul', items: [unordered[1]] })
    } else {
      blocks.push({ kind: 'p', text: line })
    }
  }
  return blocks
}

/** A rule section's body — plain paragraphs, with `1.`/`-` lines as real lists. */
function RuleProse({ body }: { body: string }) {
  return (
    <div className="max-w-3xl space-y-3 leading-relaxed text-ink/85">
      {toBlocks(body).map((block, index) => {
        if (block.kind === 'p')
          return (
            <Text key={index}>
              <RefText>{block.text}</RefText>
            </Text>
          )
        const items = block.items.map((item, i) => (
          <li key={i} className="pl-1.5">
            <RefText>{item}</RefText>
          </li>
        ))
        return block.kind === 'ol' ? (
          <ol
            key={index}
            className="list-decimal space-y-1.5 pl-6 marker:font-display marker:font-semibold marker:text-blood"
          >
            {items}
          </ol>
        ) : (
          <ul
            key={index}
            className="list-disc space-y-1.5 pl-6 marker:text-blood"
          >
            {items}
          </ul>
        )
      })}
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
        <Text tone="secondary" className="mt-3 max-w-2xl">
          {topic.summary}
        </Text>
      </header>

      {topic.sections.map((section) => (
        <section key={section.key} className="space-y-2">
          <SectionHeading tone="blood" bordered>
            {section.heading}
          </SectionHeading>
          <RuleProse body={section.body} />
        </section>
      ))}
    </div>
  )
}
