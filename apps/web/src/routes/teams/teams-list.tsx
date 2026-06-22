import { getTeam } from '@blitz/data'
import { Link } from '@tanstack/react-router'
import { Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useDataLocale } from '@/i18n/use-data-locale'
import { type SavedTeam, teamsApi } from '@/lib/teams-api'
import {
  Button,
  Card,
  Dialog,
  EmptyState,
  PageHeading,
  Text,
  useToast,
} from '@/ui'

/** The coach's saved teams — open one to edit, or start a new draft. */
export function TeamsListPage() {
  const { t } = useTranslation('teamBuilder')
  const locale = useDataLocale()
  const { toast } = useToast()
  const [teams, setTeams] = useState<SavedTeam[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let active = true
    teamsApi
      .list()
      .then((rows) => active && setTeams(rows))
      .catch(
        () => active && toast({ title: t('toast.loadError'), tone: 'danger' })
      )
      .finally(() => active && setLoaded(true))
    return () => {
      active = false
    }
  }, [t, toast])

  async function remove(teamId: string) {
    try {
      await teamsApi.remove(teamId)
      setTeams((current) => current.filter((team) => team.id !== teamId))
      toast({ title: t('toast.deleted'), tone: 'success' })
    } catch {
      toast({ title: t('toast.saveError'), tone: 'danger' })
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <PageHeading>{t('list.heading')}</PageHeading>
        <Button asChild>
          <Link to="/teams/new" data-testid="teams-new">
            <Plus className="h-4 w-4" />
            {t('list.new')}
          </Link>
        </Button>
      </div>

      {loaded && teams.length === 0 && (
        <EmptyState className="mt-8">{t('list.empty')}</EmptyState>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => {
          const archetype = getTeam(team.teamKey, locale)
          return (
            <Card
              key={team.id}
              className="flex items-start justify-between gap-3 p-5"
            >
              <Link
                to="/teams/$id"
                params={{ id: team.id }}
                className="flex-1"
                data-testid={`team-card-${team.id}`}
              >
                <Text as="h2" variant="heading" className="leading-none">
                  {team.name}
                </Text>
                <Text variant="label" tone="muted" className="mt-2">
                  {(archetype?.name ?? team.teamKey) +
                    ' · ' +
                    t('list.players', { n: team.roster.players.length })}
                </Text>
              </Link>
              <Dialog>
                <Dialog.Trigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label={t('list.delete')}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </Dialog.Trigger>
                <Dialog.Content>
                  <Dialog.Title>{t('list.deleteTitle')}</Dialog.Title>
                  <Dialog.Description>
                    {t('list.deleteBody', { name: team.name })}
                  </Dialog.Description>
                  <Dialog.Footer>
                    <Dialog.Close asChild>
                      <Button variant="outline">{t('list.cancel')}</Button>
                    </Dialog.Close>
                    <Dialog.Close asChild>
                      <Button onClick={() => void remove(team.id)}>
                        {t('list.deleteConfirm')}
                      </Button>
                    </Dialog.Close>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
