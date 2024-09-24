'use client'

import { usePathname } from 'next/navigation'

export default function LayoutNav({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  const isHomePage = pathname === '/'

  const baseClass =
    'text-[28px] z-10 text-black px-[16px] md:px-[32px] py-[12px] flex justify-between w-full items-center leading-[22px]'

  return (
    <nav className={`${baseClass} ${isHomePage && 'absolute'}`}>{children}</nav>
  )
}
