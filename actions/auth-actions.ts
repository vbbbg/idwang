'use server'

import { createUserVPostgres, getUserByPhoneNumberVPostgres } from '@/lib/user'
import { hashUserPassword, verifyPassword } from '@/lib/hash'
import { redirect } from 'next/navigation'
import { clearSession, createAuthSession } from '@/lib/auth'

export interface UserInfo {
  id: number
  phoneNumber: string
  password: string
}

export async function create({
  phoneNumber,
  password,
}: Pick<UserInfo, 'password' | 'phoneNumber'>) {
  const hashedPassword = hashUserPassword(password)

  try {
    const id = await createUserVPostgres(phoneNumber, hashedPassword)
    await createAuthSession(`${id}`)
  } catch (e) {
    if (e instanceof Error && e.message === 'phone_exists') {
      return { error: '该手机号已注册' }
    }

    return { error: '出现了些状况，请稍后再试' }
  }

  redirect('/dashboard')
}

export async function login({
  phoneNumber,
  password,
}: Pick<UserInfo, 'password' | 'phoneNumber'>) {
  const existUser = await getUserByPhoneNumberVPostgres(phoneNumber)

  if (!existUser) {
    return { error: '用户不存在' }
  }

  if (!verifyPassword(existUser.password, password)) {
    return { error: '密码不正确' }
  }

  try {
    await createAuthSession(`${existUser.id}`)
  } catch (e) {}

  redirect('/dashboard')
}

export async function logout() {
  await clearSession()

  redirect('/')
}

export async function auth(
  mode: string,
  authInfo: Pick<UserInfo, 'password' | 'phoneNumber'>
) {
  if (mode === 'register') {
    return await create(authInfo)
  } else {
    return await login(authInfo)
  }
}
