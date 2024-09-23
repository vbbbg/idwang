import { cookies } from 'next/headers'
import { postgresLucia } from '@/lib/postgres'

const lucia = postgresLucia

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
