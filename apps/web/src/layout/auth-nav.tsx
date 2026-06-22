import { Link, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { authClient } from '@/lib/auth-client'
import { navLinkVariants } from '@/ui'

/** Masthead auth control — a sign-in link when signed out, or the coach's name and sign-out. */
export function AuthNav() {
  const { t } = useTranslation('masthead')
  const navigate = useNavigate()
  const { data, isPending } = authClient.useSession()

  async function handleSignOut() {
    await authClient.signOut()
    await navigate({ to: '/' })
  }

  if (isPending) return null

  if (!data) {
    return (
      <Link to="/login" className={navLinkVariants({ tone: 'masthead' })}>
        {t('auth.signIn')}
      </Link>
    )
  }

  return (
    <div className="flex items-center gap-3 font-headline text-sm font-semibold uppercase tracking-wide">
      <span className="text-gold">{data.user.name}</span>
      <button
        type="button"
        onClick={() => void handleSignOut()}
        className="text-paper/70 transition-colors hover:text-gold"
      >
        {t('auth.signOut')}
      </button>
    </div>
  )
}
