import { ReactNode } from 'react'

export default function ContentBlock({
  title,
  children,
}: {
  title?: string
  children: ReactNode
}) {
  return (
    <div className="bg-[#F0ECE1] py-[30px] px-[16px]">
      <div className="text-[32px] text-black font-bold pb-[16px]">{title}</div>
      {children}
    </div>
  )
}
