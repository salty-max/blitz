import { getTeam, getTeams, teamBuildingRules } from '@blitz/data'
import { type Diagnostic, validateRoster } from '@blitz/resolver'
import { Link, useNavigate, useParams } from '@tanstack/react-router'
import { type ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useDataLocale } from '@/i18n/use-data-locale'
import { gp } from '@/lib/format'
import { teamsApi } from '@/lib/teams-api'
import {
  Button,
  EmptyState,
  FormField,
  Input,
  NumberStepper,
  PageHeading,
  SectionHeading,
  Select,
  StatBlock,
  Switch,
  Table,
  Text,
  useToast,
} from '@/ui'

import { emptyRoster, positionCount, setPositionCount } from './roster'

const rules = teamBuildingRules

/** One sideline-asset row: a label, its unit cost and a control. */
function StaffRow({
  label,
  cost,
  children,
}: {
  label: string
  cost: number
  children: ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-ink/10 pb-3">
      <div>
        <Text variant="labelLg">{label}</Text>
        <Text variant="caption" tone="muted">
          {gp(cost)}
        </Text>
      </div>
      {children}
    </div>
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

/** Draft a roster for a new or existing team, validated live against the rules. */
export function TeamBuilderPage() {
  const { t } = useTranslation('teamBuilder')
  const locale = useDataLocale()
  const navigate = useNavigate()
  const { toast } = useToast()
  const diagnosticText = useDiagnosticText()
  const { id } = useParams({ strict: false })
  const isEdit = Boolean(id)

  const [name, setName] = useState('')
  const [teamKey, setTeamKey] = useState<string | undefined>(undefined)
  const [roster, setRoster] = useState(() => emptyRoster(rules))
  const [saving, setSaving] = useState(false)
  const [notFound, setNotFound] = useState(false)

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
  const positionName = (key: string) =>
    team?.positions.find((position) => position.key === key)?.name ?? key

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

  const canSave = Boolean(team) && validation?.valid && name.trim().length > 0

  return (
    <div>
      <PageHeading>{name || t('builder.newTitle')}</PageHeading>

      <div className="mt-5 flex flex-col gap-4 sm:max-w-md">
        <FormField label={t('builder.name')}>
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t('builder.namePlaceholder')}
            data-testid="builder-name"
          />
        </FormField>
        <FormField label={t('builder.chooseTeam')}>
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
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <section>
              <SectionHeading bordered>{t('builder.roster')}</SectionHeading>
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
                    <Table.Head className="text-right">
                      {t('cols.subtotal')}
                    </Table.Head>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {team.positions.map((position) => {
                    const count = positionCount(roster, position.key)
                    return (
                      <Table.Row key={position.key}>
                        <Table.Cell>
                          <Text variant="labelLg">{position.name}</Text>
                        </Table.Cell>
                        <Table.Cell className="px-2 text-right">
                          <Text variant="figure">{gp(position.cost)}</Text>
                        </Table.Cell>
                        <Table.Cell className="px-2">
                          <div className="flex justify-center">
                            <NumberStepper
                              value={count}
                              min={0}
                              max={position.max}
                              onValueChange={(value) =>
                                setRoster((current) =>
                                  setPositionCount(current, position.key, value)
                                )
                              }
                              aria-label={position.name}
                            />
                          </div>
                        </Table.Cell>
                        <Table.Cell className="text-right">
                          <Text variant="figure" weight="semibold">
                            {gp(position.cost * count)}
                          </Text>
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </section>

            <section className="mt-8">
              <SectionHeading bordered>{t('builder.staff')}</SectionHeading>
              <div className="mt-3 flex flex-col gap-3">
                <StaffRow label={t('assets.rerolls')} cost={team.rerollCost}>
                  <NumberStepper
                    value={roster.rerolls}
                    min={0}
                    max={rules.rerollMax}
                    onValueChange={(value) =>
                      setRoster((current) => ({ ...current, rerolls: value }))
                    }
                    aria-label={t('assets.rerolls')}
                  />
                </StaffRow>
                {team.apothecary && (
                  <StaffRow
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
                  </StaffRow>
                )}
                <StaffRow
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
                </StaffRow>
                <StaffRow
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
                </StaffRow>
                <StaffRow
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
                </StaffRow>
              </div>
            </section>
          </div>

          <aside className="flex flex-col gap-4">
            <SectionHeading bordered>{t('summary.heading')}</SectionHeading>
            <div className="grid grid-cols-2 gap-3">
              <StatBlock label={t('summary.budget')} value={gp(rules.budget)} />
              <StatBlock
                label={t('summary.spent')}
                value={gp(validation.cost.total)}
              />
              <StatBlock
                label={t('summary.treasury')}
                value={gp(rules.budget - validation.cost.total)}
              />
              <StatBlock
                label={t('summary.teamValue')}
                value={gp(validation.teamValue)}
              />
            </div>
            <StatBlock
              label={t('summary.players')}
              value={validation.playerCount}
            />

            <Text
              variant="labelLg"
              tone={validation.valid ? 'pitch' : 'blood'}
              data-testid="builder-status"
            >
              {validation.valid ? t('status.legal') : t('status.issues')}
            </Text>
            {validation.diagnostics.length > 0 && (
              <ul className="flex flex-col gap-1">
                {validation.diagnostics.map((diagnostic, index) => (
                  <Text
                    as="li"
                    key={`${diagnostic.code}-${index}`}
                    variant="caption"
                    tone={diagnostic.severity === 'error' ? 'blood' : 'gold'}
                  >
                    {diagnosticText(diagnostic, positionName)}
                  </Text>
                ))}
              </ul>
            )}

            <div className="mt-2 flex gap-2">
              <Button
                onClick={() => void handleSave()}
                disabled={!canSave || saving}
                data-testid="builder-save"
              >
                {saving ? t('builder.saving') : t('builder.save')}
              </Button>
              <Button variant="outline" asChild>
                <Link to="/teams">{t('builder.cancel')}</Link>
              </Button>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
