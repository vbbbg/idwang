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

  return (
    <div className="overflow-hidden">
      <div className="mt-[64px]" />
      {children}
    </div>
  )
}
