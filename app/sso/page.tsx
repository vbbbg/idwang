import { SignInForm } from '@/components/sign-in-form'
import { verifyAuth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function SignInPage({
  searchParams,
}: {
  searchParams: { mode: string; [key: string]: string | string[] | undefined }
}) {
  const result = await verifyAuth()

  if (result.user) redirect('/dashboard')

  const { mode = 'login' } = searchParams

  return (
    <div className="pt-[80px] px-[16px]">
      <div className="rounded-[16px]">
        <div className="py-[32px] px-[16px]">
          <SignInForm key={mode} mode={mode} />
        </div>
      </div>
    </div>
  )
}
