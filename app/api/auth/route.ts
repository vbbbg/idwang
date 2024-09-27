import { NextResponse } from 'next/server'
import { verifyAuth } from '@/lib/auth'

export async function GET() {
  const { user } = await verifyAuth()
  return NextResponse.json({ data: { user } })
}
