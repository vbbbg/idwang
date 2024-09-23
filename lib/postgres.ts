import { Lucia } from 'lucia'
import { NodePostgresAdapter } from '@lucia-auth/adapter-postgresql'
import { sql } from '@vercel/postgres'

/**
 * -- 创建 users 表
 * CREATE TABLE IF NOT EXISTS users (
 *     id SERIAL PRIMARY KEY,
 *     phone_number TEXT UNIQUE NOT NULL,
 *     password TEXT NOT NULL
 * );
 *
 * -- 创建 sessions 表
 * CREATE TABLE IF NOT EXISTS sessions (
 *     id TEXT NOT NULL PRIMARY KEY,
 *     expires_at TIMESTAMPTZ NOT NULL,
 *     user_id INTEGER NOT NULL,
 *     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
 * );
 */

const adapter = new NodePostgresAdapter(sql, {
  user: 'users',
  session: 'sessions',
})

export const postgresLucia = new Lucia(adapter)
