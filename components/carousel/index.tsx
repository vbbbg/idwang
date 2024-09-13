'use client'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaCarouselType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'

import carouselCss from './index.module.css'

const sourceList = [
  {
    image: '/first/1.jpg',
    pcImage: '/first/11.jpg',
    title: '无畏，更自由',
    subTitle: [
      { text: '兼具极致防护与个性风格' },
      { text: '专为你的 iPhone 16 打造' },
    ],
    id: 'No1',
    banner: () => {
      return (
        <BannerContainer>
          <div className="relative bg-[#F6E163] text-[26px] text-[#2c5dab] font-bold	rounded-[16px] p-[12px] pb-[6px] rounded-bl-[0] rounded-br-[0] w-fit">
            无畏，更自由
            <BannerAfter />
          </div>
          <div className="px-[12px] py-[6px] bg-[#F6E163] w-[228px] rounded-[16px] rounded-tl-[0] text-[14px] text-black">
            <div>兼具极致防护与个性风格</div>
            <div>专为你的 iPhone 16 打造</div>
          </div>
        </BannerContainer>
      )
    },
  },
  {
    image: '/first/2.jpg',
    pcImage: '/first/22.jpg',
    title: '全新 iPhone 16 手机壳',
    subTitle: ['打造你的个性风格'],
    id: 'No2',
    banner: () => (
      <BannerContainer>
        <div className="relative bg-[#2c5dab] text-[26px] text-[#f6e163] font-bold	rounded-[16px] p-[12px] pb-[6px] rounded-bl-[0] w-fit">
          全新 iPhone 16 手机壳
        </div>
        <div className="relative px-[12px] py-[6px] bg-[#2c5dab] rounded-[16px] rounded-tl-[0] rounded-tr-[0] text-[14px] text-white w-fit">
          <BannerAfter className="top-0 shadow-[-6px_-6px_1px_#2c5dab] rounded-none rounded-tl-[16px]" />
          <div>打造你的个性风格</div>
        </div>
      </BannerContainer>
    ),
  },
  {
    image: '/first/3.png',
    pcImage: '/first/33.png',
    title: '丰富的印花设计',
    subTitle: ['支持全新 iPhone 16 系列'],
    id: 'No3',
    banner: () => (
      <BannerContainer>
        <div className="relative bg-[#21a664] text-[26px] text-[#f6e163] font-bold	rounded-[16px] p-[12px] pb-[6px] rounded-bl-[0] w-fit">
          丰富的印花设计
        </div>
        <div className="relative px-[12px] py-[6px] bg-[#21a664] rounded-[16px] rounded-tl-[0] rounded-tr-[0] text-[14px] text-black w-fit">
          <BannerAfter className="top-0 shadow-[-6px_-6px_1px_#21a664] rounded-none rounded-tl-[16px]" />
          <div>支持全新 iPhone 16 系列</div>
        </div>
      </BannerContainer>
    ),
  },
  {
    image: '/first/4.png',
    pcImage: '/first/44.png',
    title: '全新 Apple Watch 10 表带',
    subTitle: ['Bounce Odyssey™ 极强一体式表带'],
    id: 'No4',
    banner: () => (
      <BannerContainer>
        <div className="relative bg-[#f15b41] text-[26px] text-[#f6e163] font-bold	rounded-[16px] p-[12px] pb-[6px] rounded-bl-[0] w-fit">
          全新 Apple Watch 10 表带
        </div>
        <div className="relative px-[12px] py-[6px] bg-[#f15b41] rounded-[16px] rounded-tl-[0] rounded-tr-[0] text-[14px] text-black w-fit">
          <BannerAfter className="top-0 shadow-[-6px_-6px_1px_#f15b41] rounded-none rounded-tl-[16px]" />
          <div>Bounce Odyssey™ 极强一体式表带</div>
        </div>
      </BannerContainer>
    ),
  },
  {
    image: '/first/5.png',
    pcImage: '/first/55.png',
    title: 'MagSafe 配件',
    subTitle: ['Snappy™ 系列产品', '为你的 iPhone 16 创造更多可能'],
    id: 'No5',
    banner: () => {
      return (
        <BannerContainer>
          <div className="relative bg-[#fecad6] text-[26px] text-[#2c5dab] font-bold	rounded-[16px] p-[12px] pb-[6px] rounded-bl-[0] rounded-br-[0] w-fit">
            MagSafe 配件
            <BannerAfter className="shadow-[-6px_6px_1px_#fecad6] " />
          </div>
          <div className="px-[12px] py-[6px] bg-[#fecad6] w-[269px] rounded-[16px] rounded-tl-[0] text-[14px] text-black">
            <div>Snappy™ 系列产品</div>
            <div>为你的 iPhone 16 创造更多可能</div>
          </div>
        </BannerContainer>
      )
    },
  },
  {
    image: '/first/6.mp4',
    pcImage: '/first/66.mp4',
    id: 'No6',
    title: '屏幕保护贴',
    subTitle: ['提供多方位防护'],
    type: 'mp4',
    banner: () => (
      <BannerContainer>
        <div className="relative bg-[#F6E163] text-[26px] text-[#2c5dab] font-bold rounded-[16px] p-[12px] pb-[6px] rounded-bl-[0] w-fit">
          屏幕保护贴
        </div>
        <div className="relative px-[12px] py-[6px] bg-[#F6E163] rounded-[16px] rounded-tl-[0] rounded-tr-[0] text-[14px] text-black w-fit">
          <BannerAfter className="top-0 shadow-[-6px_-6px_1px_#F6E163] rounded-none rounded-tl-[16px]" />
          <div>提供多方位防护</div>
        </div>
      </BannerContainer>
    ),
  },
]

function BannerContainer({ children }: { children: ReactNode }) {
  return (
    <div className="absolute bottom-[42px] left-[16px] leading-[1.2]">
      {children}
    </div>
  )
}

function BannerAfter({ className }: { className?: string }) {
  return (
    <div
      className={`absolute bottom-0 w-[18px] h-[23px] rounded-[16px] right-[-18px] shadow-[-6px_6px_1px_#F6E163] ${className}`}
    />
  )
}

export default function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 10000 }),
  ])

  const [selectedIndex, setSelectedIndex] = useState(0)

  const onClick = useCallback(
    (index: number) => {
      if (!emblaApi) return
      emblaApi.scrollTo(index)

      const autoplay = emblaApi?.plugins()?.autoplay
      autoplay?.play()
    },
    [emblaApi]
  )

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className={carouselCss.carouselEmbla} ref={emblaRef}>
      <div className={carouselCss.carouselContainer}>
        {sourceList.map(item => {
          let slide = null
          switch (item.type) {
            case 'mp4':
              slide = (
                <>
                  <video
                    autoPlay
                    loop
                    playsInline
                    muted
                    width="100%"
                    height="auto"
                    className={`${carouselCss.carouselVideo} hidden md:block aspect-[21/8]`}
                  >
                    <source src={item.pcImage} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <video
                    autoPlay
                    loop
                    playsInline
                    muted
                    width="100%"
                    height="auto"
                    className={`${carouselCss.carouselVideo} md:hidden aspect-[78/100]`}
                  >
                    <source src={item.image} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </>
              )
              break
            default:
              slide = (
                <picture>
                  <source srcSet={item.pcImage} media="(min-width: 768px)" />
                  <Image
                    className={carouselCss.carouselSlide}
                    width={375}
                    height={479}
                    style={{ width: '100%', height: 'auto' }}
                    src={item.image}
                    alt={item.id}
                  />
                </picture>
              )
          }

          const Banner = item.banner

          return (
            <div key={item.id} className={carouselCss.slideContainer}>
              {slide}

              <Banner />
            </div>
          )
        })}
      </div>

      <div className={carouselCss.carouselDotContainer}>
        {sourceList.map((item, idx) => {
          return (
            <div
              key={item.id}
              className={`${carouselCss.carouselDot} ${selectedIndex === idx ? carouselCss.active : ''}`}
              onClick={() => onClick(idx)}
            />
          )
        })}
      </div>
    </div>
  )
}
