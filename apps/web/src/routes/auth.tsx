import { useNavigate, useSearch } from '@tanstack/react-router'
import { type FormEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { authClient } from '@/lib/auth-client'
import { Button, FormField, Input, PageHeading } from '@/ui'

type Mode = 'signIn' | 'signUp'

/** Where to land after authenticating — whitelisted to in-app, auth-gated routes (no open redirect). */
type Destination = '/' | '/teams' | '/leagues'
function destination(redirect: string | undefined): Destination {
  return redirect === '/teams' || redirect === '/leagues' ? redirect : '/'
}

/** The sign-in / sign-up page — a coach authenticates here to own and save teams. */
export function AuthPage() {
  const { t } = useTranslation('auth')
  const navigate = useNavigate()
  const { data: session } = authClient.useSession()
  const search = useSearch({ strict: false })
  const target = destination(search.redirect)
  const [mode, setMode] = useState<Mode>('signIn')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const isSignUp = mode === 'signUp'

  // An already-signed-in coach has no business on the login page.
  useEffect(() => {
    if (session) void navigate({ to: target })
  }, [session, navigate, target])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setPending(true)
    const result = isSignUp
      ? await authClient.signUp.email({ name, email, password })
      : await authClient.signIn.email({ email, password })
    setPending(false)
    if (result.error) {
      setError(t(isSignUp ? 'errors.signUp' : 'errors.signIn'))
      return
    }
    await navigate({ to: target })
  }

  return (
    <div className="mx-auto max-w-sm">
      <PageHeading>{t(isSignUp ? 'title.signUp' : 'title.signIn')}</PageHeading>

      <form
        onSubmit={(event) => void handleSubmit(event)}
        className="mt-6 flex flex-col gap-4"
      >
        {isSignUp && (
          <FormField label={t('fields.name')} required>
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              required
            />
          </FormField>
        )}
        <FormField label={t('fields.email')} required>
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </FormField>
        <FormField label={t('fields.password')} required>
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
            minLength={8}
            required
          />
        </FormField>
        {error && (
          <p role="alert" className="text-sm font-semibold text-blood">
            {error}
          </p>
        )}
        <Button type="submit" disabled={pending}>
          {t(isSignUp ? 'submit.signUp' : 'submit.signIn')}
        </Button>
      </form>

      <p className="mt-4 text-sm text-ink/65">
        {t(isSignUp ? 'toggle.haveAccount' : 'toggle.needAccount')}{' '}
        <button
          type="button"
          onClick={() => {
            setMode(isSignUp ? 'signIn' : 'signUp')
            setError(null)
          }}
          className="font-semibold text-blood underline underline-offset-2 hover:text-blood/80"
        >
          {t(isSignUp ? 'toggle.toSignIn' : 'toggle.toSignUp')}
        </button>
      </p>
    </div>
  )
}
