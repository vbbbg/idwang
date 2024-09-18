import { verifyAuth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user } = await verifyAuth()

  if (!user) {
    redirect('/')
  }

  return children
}
