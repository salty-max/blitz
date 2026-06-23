import {
  getProgression,
  getSkills,
  getTeam,
  teamBuildingRules,
} from '@blitz/data'
import {
  accessibleCategories,
  type Advancement,
  advancementCost,
  type CharacteristicKey,
  currentTeamValue,
  playerCharacteristics,
  playerLevel,
  playerValue,
  type Roster,
  type RosterPlayer,
} from '@blitz/resolver'
import type { Position, Progression, Skill } from '@blitz/schema'
import { Link, useParams } from '@tanstack/react-router'
import { Pencil, Plus, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CharacteristicsRow } from '@/components/characteristics'
import { useDataLocale } from '@/i18n/use-data-locale'
import { gp } from '@/lib/format'
import { type SavedTeam, teamsApi } from '@/lib/teams-api'
import {
  Button,
  Chip,
  Dialog,
  EmptyState,
  PageHeading,
  SectionHeading,
  Select,
  Table,
  Text,
  useToast,
} from '@/ui'

import { randomPlayerName } from './player-names'
import {
  addInjury,
  addJourneyman,
  addSpp,
  applyAdvancement,
  hireJourneyman,
  removeInjury,
} from './roster'

const rules = teamBuildingRules
const CHARACTERISTICS: CharacteristicKey[] = ['ma', 'st', 'ag', 'pa', 'av']

/** A saved team's overview — its roster's live progression, value, and management. */
export function TeamPage() {
  const { t } = useTranslation('teamBuilder')
  const locale = useDataLocale()
  const { toast } = useToast()
  const { id } = useParams({ strict: false })

  const [saved, setSaved] = useState<SavedTeam | undefined>(undefined)
  const [roster, setRoster] = useState<Roster | undefined>(undefined)
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState(false)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!id) return
    let active = true
    teamsApi
      .get(id)
      .then((team) => {
        if (!active) return
        setSaved(team)
        setRoster(team.roster)
      })
      .catch(() => active && setNotFound(true))
    return () => {
      active = false
    }
  }, [id])

  const progression = useMemo(() => getProgression(locale), [locale])
  const skills = useMemo(() => getSkills(locale), [locale])
  const team = saved ? getTeam(saved.teamKey, locale) : undefined

  function edit(change: (current: Roster) => Roster) {
    setRoster((current) => (current ? change(current) : current))
    setDirty(true)
  }

  async function save() {
    if (!id || !roster) return
    setSaving(true)
    try {
      await teamsApi.update(id, { roster })
      setDirty(false)
      toast({ title: t('toast.saved'), tone: 'success' })
    } catch {
      toast({ title: t('toast.saveError'), tone: 'danger' })
    } finally {
      setSaving(false)
    }
  }

  if (!id || notFound) return <EmptyState>{t('builder.notFound')}</EmptyState>
  if (!saved || !roster || !team) {
    return <Text tone="muted">{t('page.loading')}</Text>
  }

  const positionOf = (key: string) =>
    team.positions.find((position) => position.key === key)
  const teamValue = currentTeamValue(team, rules, roster, progression)
  const squad = [...roster.players].sort(
    (a, b) => (a.number ?? 0) - (b.number ?? 0)
  )

  // A Journeyman is a free Lineman — the 0–16 positional, the cheapest at the cap.
  const lineman = [...team.positions].sort(
    (a, b) => b.max - a.max || a.cost - b.cost
  )[0]
  const takeJourneyman = () => {
    const used = new Set(
      roster.players
        .map((player) => player.name)
        .filter((name): name is string => Boolean(name))
    )
    edit((current) =>
      addJourneyman(current, lineman.key, randomPlayerName(team.key, used))
    )
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <PageHeading>{saved.name}</PageHeading>
          <Text variant="label" tone="muted" className="mt-2 block">
            {team.name}
          </Text>
        </div>
        <div className="flex gap-2">
          {dirty && (
            <Button
              onClick={() => void save()}
              disabled={saving}
              data-testid="team-save"
            >
              {saving ? t('builder.saving') : t('page.save')}
            </Button>
          )}
          <Button
            variant="outline"
            onClick={takeJourneyman}
            disabled={roster.players.length >= rules.maxPlayers}
            data-testid="add-journeyman"
          >
            <Plus className="h-4 w-4" />
            {t('page.addJourneyman')}
          </Button>
          <Button variant="outline" asChild>
            <Link to="/teams/$id/edit" params={{ id }}>
              <Pencil className="h-4 w-4" />
              {t('page.editRoster')}
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-end gap-x-10 gap-y-3 border-2 border-ink bg-paper-2 p-5">
        <Metric
          label={t('summary.teamValue')}
          value={gp(teamValue)}
          prominent
        />
        <Metric
          label={t('page.squad')}
          value={`${roster.players.length} / ${rules.maxPlayers}`}
        />
      </div>

      {squad.length === 0 ? (
        <EmptyState className="mt-8">{t('page.emptyRoster')}</EmptyState>
      ) : (
        <Table className="mt-8">
          <Table.Header>
            <Table.Row>
              <Table.Head className="pr-2">{t('cols.number')}</Table.Head>
              <Table.Head>{t('cols.name')}</Table.Head>
              <Table.Head className="px-2">{t('page.profile')}</Table.Head>
              <Table.Head className="px-2">{t('page.skills')}</Table.Head>
              <Table.Head className="px-2 text-center">
                {t('page.spp')}
              </Table.Head>
              <Table.Head className="px-2 text-right">
                {t('page.value')}
              </Table.Head>
              <Table.Head />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {squad.map((player) => {
              const number = player.number ?? 0
              const position = positionOf(player.position)
              if (!position) return null
              return (
                <Table.Row key={number}>
                  <Table.Cell className="pr-2">
                    <Text variant="stat" tone="blood">
                      {number}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text variant="labelLg">
                      {player.name || t('builder.playerName')}
                    </Text>
                    <Text variant="caption" tone="muted" className="block">
                      {position.name}
                      {player.journeyman ? ` · ${t('page.journeyman')}` : ''}
                    </Text>
                  </Table.Cell>
                  <Table.Cell className="px-2">
                    <CharacteristicsRow
                      characteristics={playerCharacteristics(
                        position.characteristics,
                        player
                      )}
                    />
                  </Table.Cell>
                  <Table.Cell className="px-2">
                    <SkillList
                      player={player}
                      position={position}
                      skills={skills}
                    />
                  </Table.Cell>
                  <Table.Cell className="px-2 text-center">
                    <Text variant="figure" weight="semibold">
                      {player.spp ?? 0}
                    </Text>
                  </Table.Cell>
                  <Table.Cell className="px-2 text-right">
                    <Text variant="figure" weight="semibold">
                      {gp(playerValue(position, player, progression))}
                    </Text>
                  </Table.Cell>
                  <Table.Cell className="text-right">
                    <ManagePlayer
                      player={player}
                      position={position}
                      skills={skills}
                      progression={progression}
                      onChange={edit}
                    />
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      )}
    </div>
  )
}

/** A labelled figure in the team header. */
function Metric({
  label,
  value,
  prominent = false,
}: {
  label: string
  value: string
  prominent?: boolean
}) {
  return (
    <div>
      <Text variant="overline" tone="muted">
        {label}
      </Text>
      <Text
        variant="stat"
        className={
          prominent ? 'block text-4xl leading-none' : 'block leading-none'
        }
      >
        {value}
      </Text>
    </div>
  )
}

/** The skills a player holds — starting (muted) and earned (gold). */
function SkillList({
  player,
  position,
  skills,
}: {
  player: RosterPlayer
  position: Position
  skills: Skill[]
}) {
  const { t } = useTranslation('teamBuilder')
  const nameOf = (key: string) => skills.find((s) => s.key === key)?.name ?? key
  const earned = (player.advancements ?? [])
    .filter((a) => a.kind === 'skill')
    .map((a) => (a.kind === 'skill' ? a.skill : ''))
  const stats = (player.advancements ?? []).filter(
    (a) => a.kind === 'characteristic'
  ).length
  const isEmpty =
    position.startingSkills.length === 0 && earned.length === 0 && stats === 0
  if (isEmpty && !player.journeyman) {
    return <Text tone="muted">—</Text>
  }
  return (
    <div className="flex flex-wrap gap-1">
      {player.journeyman && (
        <Chip variant="accent" size="sm">
          {t('page.loner')}
        </Chip>
      )}
      {position.startingSkills.map((key) => (
        <Chip key={key} variant="outline" size="sm">
          {nameOf(key)}
        </Chip>
      ))}
      {earned.map((key) => (
        <Chip key={key} variant="gold" size="sm">
          {nameOf(key)}
        </Chip>
      ))}
      {stats > 0 && (
        <Chip variant="gold" size="sm">
          {t('page.statGains', { n: stats })}
        </Chip>
      )}
    </div>
  )
}

/** A dialog to record a player's SPP, advancements and lasting injuries. */
function ManagePlayer({
  player,
  position,
  skills,
  progression,
  onChange,
}: {
  player: RosterPlayer
  position: Position
  skills: Skill[]
  progression: Progression
  onChange: (change: (roster: Roster) => Roster) => void
}) {
  const { t } = useTranslation('teamBuilder')
  const number = player.number ?? 0
  const spp = player.spp ?? 0

  const [skillKey, setSkillKey] = useState('')
  const [statKey, setStatKey] = useState<CharacteristicKey | ''>('')
  const [injuryStat, setInjuryStat] = useState<CharacteristicKey | ''>('')

  const known = new Set([
    ...position.startingSkills,
    ...(player.advancements ?? [])
      .filter((a) => a.kind === 'skill')
      .map((a) => (a.kind === 'skill' ? a.skill : '')),
  ])
  const categories = new Set(accessibleCategories(position))
  const available = skills.filter(
    (skill) => categories.has(skill.category) && !known.has(skill.key)
  )

  const sppActions = progression.sppActions.filter((action) =>
    ['completion', 'casualty', 'touchdown', 'mvp'].includes(action.key)
  )

  const isSecondary = (skill: Skill) =>
    !position.primary.includes(skill.category)
  const skill = available.find((s) => s.key === skillKey)
  const skillCost = skill
    ? advancementCost(
        progression,
        player,
        isSecondary(skill) ? 'chosenSecondary' : 'chosenPrimary'
      )
    : 0
  const statCost = advancementCost(progression, player, 'characteristic')

  function learnSkill() {
    if (!skill || spp < skillCost) return
    const advancement: Advancement = {
      kind: 'skill',
      skill: skill.key,
      secondary: isSecondary(skill),
    }
    onChange((roster) =>
      applyAdvancement(roster, number, advancement, skillCost)
    )
    setSkillKey('')
  }

  function improveStat() {
    if (!statKey || spp < statCost) return
    onChange((roster) =>
      applyAdvancement(
        roster,
        number,
        { kind: 'characteristic', characteristic: statKey },
        statCost
      )
    )
    setStatKey('')
  }

  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button size="sm" variant="outline" data-testid={`manage-${number}`}>
          {t('page.manage')}
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="max-w-lg">
        <Dialog.Title>
          {player.name || position.name} ·{' '}
          {t('page.level', { n: playerLevel(player) })}
        </Dialog.Title>

        <div className="mt-2 flex flex-col gap-5">
          {player.journeyman && (
            <div className="flex items-center justify-between gap-3 border-2 border-ink bg-paper-2 p-3">
              <Text variant="caption" tone="muted">
                {t('page.journeymanNote')}
              </Text>
              <Button
                size="sm"
                onClick={() =>
                  onChange((roster) => hireJourneyman(roster, number))
                }
              >
                {t('page.hire')}
              </Button>
            </div>
          )}
          <section>
            <SectionHeading>{t('page.addSpp')}</SectionHeading>
            <div className="mt-2 flex items-center gap-2">
              <Text
                variant="stat"
                tone="gold"
                className="text-3xl leading-none"
              >
                {spp}
              </Text>
              <Text variant="caption" tone="muted">
                {t('page.sppBanked')}
              </Text>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {sppActions.map((action) => (
                <Button
                  key={action.key}
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    onChange((roster) => addSpp(roster, number, action.spp))
                  }
                >
                  +{action.spp} {action.action.replace(/ \(.*\)$/, '')}
                </Button>
              ))}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onChange((roster) => addSpp(roster, number, -1))}
                disabled={spp === 0}
                aria-label={t('page.removeSpp')}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </section>

          <section>
            <SectionHeading>{t('page.advance')}</SectionHeading>
            <div className="mt-2 flex flex-col gap-2">
              <div className="flex items-end gap-2">
                <Select value={skillKey} onValueChange={setSkillKey}>
                  <Select.Trigger className="flex-1">
                    <Select.Value placeholder={t('page.chooseSkill')} />
                  </Select.Trigger>
                  <Select.Content>
                    {available.map((option) => (
                      <Select.Item key={option.key} value={option.key}>
                        {option.name}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select>
                <Button
                  onClick={learnSkill}
                  disabled={!skill || spp < skillCost}
                >
                  {skill
                    ? t('page.learnFor', { spp: skillCost })
                    : t('page.learn')}
                </Button>
              </div>
              <div className="flex items-end gap-2">
                <Select
                  value={statKey}
                  onValueChange={(value) =>
                    setStatKey(value as CharacteristicKey)
                  }
                >
                  <Select.Trigger className="flex-1">
                    <Select.Value placeholder={t('page.chooseStat')} />
                  </Select.Trigger>
                  <Select.Content>
                    {CHARACTERISTICS.map((key) => (
                      <Select.Item key={key} value={key}>
                        {t(`page.stat.${key}` as 'page.stat.ma')}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select>
                <Button
                  onClick={improveStat}
                  disabled={!statKey || spp < statCost}
                >
                  {t('page.improveFor', { spp: statCost })}
                </Button>
              </div>
            </div>
          </section>

          <section>
            <SectionHeading>{t('page.injuries')}</SectionHeading>
            {(player.injuries ?? []).length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {(player.injuries ?? []).map((injury, index) => (
                  <Chip
                    key={index}
                    variant="blood"
                    size="sm"
                    onClick={() =>
                      onChange((roster) => removeInjury(roster, number, index))
                    }
                    className="cursor-pointer"
                  >
                    {injury.kind === 'niggling'
                      ? t('page.niggling')
                      : t(
                          `page.minusStat.${injury.characteristic}` as 'page.minusStat.ma'
                        )}{' '}
                    ✕
                  </Chip>
                ))}
              </div>
            )}
            <div className="mt-3 flex items-end gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  onChange((roster) =>
                    addInjury(roster, number, { kind: 'niggling' })
                  )
                }
              >
                {t('page.niggling')}
              </Button>
              <Select
                value={injuryStat}
                onValueChange={(value) => {
                  onChange((roster) =>
                    addInjury(roster, number, {
                      kind: 'characteristic',
                      characteristic: value as CharacteristicKey,
                    })
                  )
                  setInjuryStat('')
                }}
              >
                <Select.Trigger>
                  <Select.Value placeholder={t('page.minusStatPick')} />
                </Select.Trigger>
                <Select.Content>
                  {CHARACTERISTICS.map((key) => (
                    <Select.Item key={key} value={key}>
                      {t(`page.minusStat.${key}` as 'page.minusStat.ma')}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
            </div>
          </section>
        </div>

        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant="outline">{t('page.done')}</Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  )
}
