import { Lucia } from 'lucia'
import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite'
import db from '@/lib/db'

export const sqliteLucia = new Lucia(
  new BetterSqlite3Adapter(db, { user: 'users', session: 'sessions' }),
  {
    sessionCookie: {
      expires: false,
      attributes: { secure: process.env.NODE_ENV === 'production' },
    },
  }
)
