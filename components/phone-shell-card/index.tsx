import Image from 'next/image'
import Link from 'next/link'

function getLinkBorderClass(linkBorderStyle: 'white' | 'black') {
  switch (linkBorderStyle) {
    case 'white':
      return 'border border-white'

    case 'black':
      return 'border border-black'

    default:
      return ''
  }
}

export default function PhoneShellCard({
  src,
  bigSrc,
  no,
  brief,
  link,
  bgClass,
  textClass = 'text-black',
  linkBorderStyle,
  containerClass,
  imageClass,
}: {
  src: string
  bigSrc: string
  no: string
  brief: string
  link: string
  bgClass: string
  textClass?: string
  linkBorderStyle: 'white' | 'black'
  containerClass: string
  imageClass: string
}) {
  let linkBorderClass = getLinkBorderClass(linkBorderStyle)

  return (
    <div
      className={`rounded-[16px] overflow-hidden flex flex-col ${containerClass}`}
    >
      <div className="relative">
        <picture>
          <source srcSet={bigSrc} media="(min-width: 768px)" />
          <Image
            src={src}
            alt="production-1"
            width={375}
            className={imageClass}
            height={375}
            style={{ width: '100%', height: 'auto' }}
          />
        </picture>
      </div>

      <div
        className={`${bgClass} p-[16px] text-[12px] flex flex-col gap-[12px] md:grow md:shrink md:basis-[auto]`}
      >
        <div className="bg-black rounded-[40px] w-fit px-[20px] py-[4px]">
          {no}
        </div>
        <div
          className={`flex flex-col gap-[32px] md:grow md:shrink md:basis-[auto] md:justify-between ${textClass}`}
        >
          <div className="text-[26px] font-[800] md:text-[36px]">{brief}</div>
          <Link href={`/series/${no}`}>
            <div
              className={`text-[16px] rounded-[40px] ${linkBorderClass} w-fit py-[10px] px-[20px] font-[500] cursor-pointer leading-[1.2]`}
            >
              {link}
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
