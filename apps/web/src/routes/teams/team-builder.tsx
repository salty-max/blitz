import { getTeam, getTeams, teamBuildingRules } from '@blitz/data'
import {
  type Diagnostic,
  type RosterValidation,
  validateRoster,
} from '@blitz/resolver'
import { Link, useNavigate, useParams } from '@tanstack/react-router'
import { Dices, GripVertical, X } from 'lucide-react'
import { type ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CharacteristicsRow } from '@/components/characteristics'
import { CostBadge } from '@/components/cost-badge'
import { useDataLocale } from '@/i18n/use-data-locale'
import { gp } from '@/lib/format'
import { teamsApi } from '@/lib/teams-api'
import {
  Button,
  Card,
  cn,
  EmptyState,
  FormField,
  Input,
  NumberStepper,
  PageHeading,
  SectionHeading,
  Select,
  Switch,
  Table,
  Text,
  useToast,
} from '@/ui'

import { randomPlayerName } from './player-names'
import {
  emptyRoster,
  positionCount,
  randomizePlayer,
  removePlayer,
  renamePlayer,
  reorderPlayers,
  setPositionCount,
} from './roster'

const rules = teamBuildingRules

/** A sideline-asset card: a label, its unit cost and a control. */
function StaffCard({
  label,
  cost,
  children,
}: {
  label: string
  cost: number
  children: ReactNode
}) {
  return (
    <Card className="flex items-center justify-between gap-3 p-4">
      <div className="flex flex-col items-start gap-1">
        <Text variant="labelLg">{label}</Text>
        <CostBadge cost={cost} size="sm" />
      </div>
      {children}
    </Card>
  )
}

/** Build the human-readable message for a roster diagnostic. */
function useDiagnosticText() {
  const { t } = useTranslation('teamBuilder')
  return (diagnostic: Diagnostic, positionName: (key: string) => string) => {
    const money = diagnostic.code === 'over-budget'
    const amount = (value: number | undefined): string | number =>
      value == null ? '' : money ? gp(value) : value
    // Cast the code-derived key to a single member so the (key, options) t()
    // overload is chosen; the runtime key is unchanged and unused vars are ignored.
    const key = `diagnostics.${diagnostic.code}` as 'diagnostics.position-limit'
    return t(key, {
      position: diagnostic.position ? positionName(diagnostic.position) : '',
      actual: amount(diagnostic.actual),
      limit: amount(diagnostic.limit),
    })
  }
}

/**
 * The always-on-screen summary: legality, squad size, the budget spend bar, the
 * treasury and team value, and Save/Cancel. Floats just above the bottom edge.
 */
function SummaryCard({
  validation,
  positionName,
  canSave,
  saving,
  onSave,
}: {
  validation: RosterValidation
  positionName: (key: string) => string
  canSave: boolean
  saving: boolean
  onSave: () => void
}) {
  const { t } = useTranslation('teamBuilder')
  const diagnosticText = useDiagnosticText()
  const tone = !validation.valid
    ? 'blood'
    : validation.diagnostics.length > 0
      ? 'gold'
      : 'pitch'
  const label = !validation.valid
    ? t('status.issues')
    : validation.diagnostics.length > 0
      ? t('status.incomplete')
      : t('status.legal')
  const spent = validation.cost.total
  const treasury = rules.budget - spent
  const pct = Math.min(100, Math.round((spent / rules.budget) * 100))
  const blocking = validation.diagnostics.filter(
    (diagnostic) => diagnostic.severity === 'error'
  )
  const figures = [
    { label: t('summary.spent'), value: gp(spent), tone: 'default' as const },
    {
      label: t('summary.treasury'),
      value: gp(treasury),
      tone: treasury < 0 ? ('blood' as const) : ('pitch' as const),
    },
    {
      label: t('summary.teamValue'),
      value: gp(validation.teamValue),
      tone: 'default' as const,
    },
  ]
  return (
    <div className="sticky bottom-4 z-10 mt-8 border-2 border-ink bg-paper-2 p-5 shadow-[6px_6px_0_0_rgba(22,19,16,0.15)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="flex items-baseline gap-1.5">
            <Text variant="stat" tone={tone} className="text-4xl leading-none">
              {validation.playerCount}
            </Text>
            <Text variant="labelLg" tone="muted">
              / {rules.maxPlayers}
            </Text>
          </span>
          <Text variant="labelLg" tone={tone} data-testid="builder-status">
            {label}
          </Text>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => void onSave()}
            disabled={!canSave || saving}
            data-testid="builder-save"
          >
            {saving ? t('builder.saving') : t('builder.save')}
          </Button>
          <Button variant="outline" asChild>
            <Link to="/teams">{t('builder.cancel')}</Link>
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <div className="h-2.5 border-2 border-ink bg-paper">
          <div
            className={cn('h-full', tone === 'blood' ? 'bg-blood' : 'bg-pitch')}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-x-10 gap-y-2">
          {figures.map((figure) => (
            <div key={figure.label}>
              <Text variant="overline" tone="muted">
                {figure.label}
              </Text>
              <Text
                variant="stat"
                tone={figure.tone}
                className="block leading-none"
              >
                {figure.value}
              </Text>
            </div>
          ))}
        </div>
      </div>

      {blocking.length > 0 && (
        <ul className="mt-3 flex flex-col gap-0.5">
          {blocking.map((diagnostic, index) => (
            <Text
              as="li"
              key={`${diagnostic.code}-${index}`}
              variant="caption"
              tone="blood"
            >
              {diagnosticText(diagnostic, positionName)}
            </Text>
          ))}
        </ul>
      )}
    </div>
  )
}

/** Draft a roster for a new or existing team, validated live against the rules. */
export function TeamBuilderPage() {
  const { t } = useTranslation('teamBuilder')
  const locale = useDataLocale()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { id } = useParams({ strict: false })
  const isEdit = Boolean(id)

  const [name, setName] = useState('')
  const [teamKey, setTeamKey] = useState<string | undefined>(undefined)
  const [roster, setRoster] = useState(() => emptyRoster(rules))
  const [saving, setSaving] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [dragFrom, setDragFrom] = useState<number | null>(null)
  const [dragOver, setDragOver] = useState<number | null>(null)

  // Editing an existing team: hydrate name, archetype and roster from the API.
  useEffect(() => {
    if (!id) return
    let active = true
    teamsApi
      .get(id)
      .then((saved) => {
        if (!active) return
        setName(saved.name)
        setTeamKey(saved.teamKey)
        setRoster(saved.roster)
      })
      .catch(() => active && setNotFound(true))
    return () => {
      active = false
    }
  }, [id])

  const team = teamKey ? getTeam(teamKey, locale) : undefined
  const validation = team ? validateRoster(team, rules, roster) : undefined
  const positionOf = (key: string) =>
    team?.positions.find((position) => position.key === key)
  const positionName = (key: string) => positionOf(key)?.name ?? key

  function pickTeam(key: string) {
    setTeamKey(key)
    setRoster(emptyRoster(rules))
  }

  async function handleSave() {
    if (!team || !validation?.valid) return
    setSaving(true)
    try {
      if (id) {
        await teamsApi.update(id, { name, roster })
      } else {
        await teamsApi.create({ name, teamKey: team.key, roster })
      }
      toast({ title: t('toast.saved'), tone: 'success' })
      await navigate({ to: '/teams' })
    } catch {
      toast({ title: t('toast.saveError'), tone: 'danger' })
    } finally {
      setSaving(false)
    }
  }

  if (notFound) {
    return <EmptyState>{t('builder.notFound')}</EmptyState>
  }

  const canSave = Boolean(team && validation?.valid && name.trim())
  // Players carry their number as their list position, so the squad reads in
  // order; reordering re-numbers them.
  const squad = roster.players

  return (
    <div>
      <PageHeading>{name || t('builder.newTitle')}</PageHeading>

      <div className="mt-6 flex flex-col gap-4 sm:max-w-2xl sm:flex-row">
        <FormField label={t('builder.name')} className="flex-1">
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t('builder.namePlaceholder')}
            data-testid="builder-name"
          />
        </FormField>
        <FormField label={t('builder.chooseTeam')} className="flex-1">
          {isEdit ? (
            <Text variant="labelLg">{team?.name ?? teamKey}</Text>
          ) : (
            <Select value={teamKey} onValueChange={pickTeam}>
              <Select.Trigger data-testid="builder-team">
                <Select.Value placeholder={t('builder.choosePlaceholder')} />
              </Select.Trigger>
              <Select.Content>
                {getTeams(locale).map((option) => (
                  <Select.Item key={option.key} value={option.key}>
                    {option.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          )}
        </FormField>
      </div>

      {!team || !validation ? (
        <Text tone="muted" className="mt-8">
          {t('builder.pickTeamFirst')}
        </Text>
      ) : (
        <>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <section>
              <SectionHeading bordered>{t('builder.positions')}</SectionHeading>
              <Table className="mt-3">
                <Table.Header>
                  <Table.Row>
                    <Table.Head>{t('cols.position')}</Table.Head>
                    <Table.Head className="px-2 text-right">
                      {t('cols.cost')}
                    </Table.Head>
                    <Table.Head className="px-2 text-center">
                      {t('cols.count')}
                    </Table.Head>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {team.positions.map((position) => {
                    const count = positionCount(roster, position.key)
                    const free = rules.maxPlayers - roster.players.length
                    return (
                      <Table.Row key={position.key}>
                        <Table.Cell>
                          <Text variant="labelLg">{position.name}</Text>
                          <CharacteristicsRow
                            characteristics={position.characteristics}
                          />
                        </Table.Cell>
                        <Table.Cell className="px-2 text-right">
                          <CostBadge cost={position.cost} size="sm" />
                        </Table.Cell>
                        <Table.Cell className="px-2">
                          <div className="flex justify-center">
                            <NumberStepper
                              value={count}
                              min={0}
                              max={Math.min(position.max, count + free)}
                              onValueChange={(value) =>
                                setRoster((current) => {
                                  // Apply the press as a delta against the live
                                  // roster, not the stepper's (possibly stale)
                                  // value — so fast clicks don't drop steps.
                                  const now = positionCount(
                                    current,
                                    position.key
                                  )
                                  const room =
                                    rules.maxPlayers - current.players.length
                                  const upper = Math.min(
                                    position.max,
                                    now + room
                                  )
                                  const target = Math.max(
                                    0,
                                    Math.min(now + (value - count), upper)
                                  )
                                  return setPositionCount(
                                    current,
                                    position.key,
                                    target,
                                    (used) => randomPlayerName(team.key, used)
                                  )
                                })
                              }
                              aria-label={position.name}
                              data-testid={`count-${position.key}`}
                            />
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </section>

            <section>
              <SectionHeading bordered>{t('builder.roster')}</SectionHeading>
              {squad.length === 0 ? (
                <EmptyState className="mt-3 text-base">
                  {t('builder.emptyRoster')}
                </EmptyState>
              ) : (
                <Table className="mt-3">
                  <Table.Header>
                    <Table.Row>
                      <Table.Head />
                      <Table.Head className="pr-2">
                        {t('cols.number')}
                      </Table.Head>
                      <Table.Head>{t('cols.name')}</Table.Head>
                      <Table.Head className="px-2">
                        {t('cols.position')}
                      </Table.Head>
                      <Table.Head />
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {squad.map((player, index) => {
                      const number = player.number ?? 0
                      return (
                        <Table.Row
                          key={number}
                          onDragOver={(event) => {
                            if (dragFrom === null) return
                            event.preventDefault()
                            setDragOver(index)
                          }}
                          onDrop={(event) => {
                            event.preventDefault()
                            if (dragFrom !== null && dragFrom !== index) {
                              setRoster((current) =>
                                reorderPlayers(current, dragFrom, index)
                              )
                            }
                            setDragFrom(null)
                            setDragOver(null)
                          }}
                          className={cn(
                            dragFrom === index && 'opacity-40',
                            dragOver === index &&
                              dragFrom !== index &&
                              'border-t-2 border-blood'
                          )}
                        >
                          <Table.Cell>
                            <button
                              type="button"
                              draggable
                              onDragStart={(event) => {
                                setDragFrom(index)
                                event.dataTransfer.effectAllowed = 'move'
                              }}
                              onDragEnd={() => {
                                setDragFrom(null)
                                setDragOver(null)
                              }}
                              aria-label={t('builder.reorder')}
                              className="cursor-grab text-ink/35 transition-colors hover:text-ink active:cursor-grabbing"
                            >
                              <GripVertical className="h-4 w-4" />
                            </button>
                          </Table.Cell>
                          <Table.Cell className="pr-2">
                            <Text variant="stat" tone="blood">
                              {number}
                            </Text>
                          </Table.Cell>
                          <Table.Cell>
                            <div className="relative">
                              <Input
                                size="sm"
                                value={player.name ?? ''}
                                onChange={(event) =>
                                  setRoster((current) =>
                                    renamePlayer(
                                      current,
                                      number,
                                      event.target.value
                                    )
                                  )
                                }
                                placeholder={t('builder.playerName')}
                                aria-label={t('cols.name')}
                                className="pr-8"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setRoster((current) =>
                                    randomizePlayer(current, number, (used) =>
                                      randomPlayerName(team.key, used)
                                    )
                                  )
                                }
                                aria-label={t('builder.randomName')}
                                className="absolute inset-y-0 right-0 flex items-center px-2 text-ink/40 transition-colors hover:text-blood"
                              >
                                <Dices className="h-4 w-4" />
                              </button>
                            </div>
                          </Table.Cell>
                          <Table.Cell className="px-2">
                            <Text tone="secondary">
                              {positionName(player.position)}
                            </Text>
                          </Table.Cell>
                          <Table.Cell className="text-right">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                setRoster((current) =>
                                  removePlayer(current, number)
                                )
                              }
                              aria-label={t('builder.remove')}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </Table.Cell>
                        </Table.Row>
                      )
                    })}
                  </Table.Body>
                </Table>
              )}
            </section>
          </div>

          <section className="mt-8">
            <SectionHeading bordered>{t('builder.staff')}</SectionHeading>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <StaffCard label={t('assets.rerolls')} cost={team.rerollCost}>
                <NumberStepper
                  value={roster.rerolls}
                  min={0}
                  max={rules.rerollMax}
                  onValueChange={(value) =>
                    setRoster((current) => ({ ...current, rerolls: value }))
                  }
                  aria-label={t('assets.rerolls')}
                />
              </StaffCard>
              {team.apothecary && (
                <StaffCard
                  label={t('assets.apothecary')}
                  cost={rules.apothecaryCost}
                >
                  <Switch
                    checked={roster.apothecary}
                    onCheckedChange={(checked) =>
                      setRoster((current) => ({
                        ...current,
                        apothecary: checked,
                      }))
                    }
                    aria-label={t('assets.apothecary')}
                  />
                </StaffCard>
              )}
              <StaffCard
                label={t('assets.assistantCoaches')}
                cost={rules.assistantCoaches.cost}
              >
                <NumberStepper
                  value={roster.assistantCoaches}
                  min={0}
                  max={rules.assistantCoaches.max}
                  onValueChange={(value) =>
                    setRoster((current) => ({
                      ...current,
                      assistantCoaches: value,
                    }))
                  }
                  aria-label={t('assets.assistantCoaches')}
                />
              </StaffCard>
              <StaffCard
                label={t('assets.cheerleaders')}
                cost={rules.cheerleaders.cost}
              >
                <NumberStepper
                  value={roster.cheerleaders}
                  min={0}
                  max={rules.cheerleaders.max}
                  onValueChange={(value) =>
                    setRoster((current) => ({
                      ...current,
                      cheerleaders: value,
                    }))
                  }
                  aria-label={t('assets.cheerleaders')}
                />
              </StaffCard>
              <StaffCard
                label={t('assets.dedicatedFans')}
                cost={rules.dedicatedFans.cost}
              >
                <NumberStepper
                  value={roster.dedicatedFans}
                  min={rules.dedicatedFans.start}
                  max={rules.dedicatedFans.max}
                  onValueChange={(value) =>
                    setRoster((current) => ({
                      ...current,
                      dedicatedFans: value,
                    }))
                  }
                  aria-label={t('assets.dedicatedFans')}
                />
              </StaffCard>
            </div>
          </section>

          <SummaryCard
            validation={validation}
            positionName={positionName}
            canSave={canSave}
            saving={saving}
            onSave={() => void handleSave()}
          />
        </>
      )}
    </div>
  )
}
