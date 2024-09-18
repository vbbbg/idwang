import db from '@/lib/db'
import { UserInfo } from '@/actions/auth-actions'

export function createUser(phone: string, password: string) {
  const result = db
    .prepare(`insert into users (phoneNumber, password) values (?,?)`)
    .run(phone, password)

  return result.lastInsertRowid
}

export function getUserByPhoneNumber(phoneNumber: string): UserInfo {
  return db
    .prepare(`select * from users where phoneNumber=?`)
    .get(phoneNumber) as UserInfo
}
