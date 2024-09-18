import { Lucia } from 'lucia'
import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite'
import db from '@/lib/db'
import { cookies } from 'next/headers'

const lucia = new Lucia(
  new BetterSqlite3Adapter(db, { user: 'users', session: 'sessions' }),
  {
    sessionCookie: {
      expires: false,
      attributes: { secure: process.env.NODE_ENV === 'production' },
    },
  }
)

export async function createAuthSession(userId: string) {
  const session = await lucia.createSession(userId, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )
}

export async function verifyAuth() {
  const sessionCookie = cookies().get(lucia.sessionCookieName)

  if (!sessionCookie) {
    return {
      user: null,
      session: null,
    }
  }

  const sessionId = sessionCookie.value

  if (!sessionId) {
    return {
      user: null,
      session: null,
    }
  }

  const result = await lucia.validateSession(sessionId)

  if (!result.session) {
    const sessionCookie = lucia.createBlankSessionCookie()
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )
  }
  return result
}

export async function clearSession() {
  const { session } = await verifyAuth()
  if (!session) {
  }

  await lucia.invalidateSession(session?.id || '')

  const newSession = lucia.createBlankSessionCookie()
  cookies().set(newSession.name, newSession.value, newSession.attributes)
}
