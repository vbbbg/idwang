import { sql } from '@vercel/postgres'

export async function createUserVPostgres(
  phoneNumber: string,
  password: string
) {
  const result =
    await sql`INSERT INTO users (phone_number, password) VALUES (${phoneNumber}, ${password}) RETURNING id;`

  if (result.rowCount === 1) {
    return result.rows[0].id
  }

  return null
}

export async function getUserByPhoneNumberVPostgres(phoneNumber: string) {
  const result =
    await sql`SELECT * FROM users WHERE phone_number = ${phoneNumber};`

  if (result.rowCount === 0) {
    return null
  }

  return result.rows[0]
}
