'use client'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaCarouselType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'

import carouselCss from './index.module.css'

const sourceList = [
  {
    image: '/first/1.jpg',
    title: '无畏，更自由',
    subTitle: [
      { text: '兼具极致防护与个性风格' },
      { text: '专为你的 iPhone 16 打造' },
    ],
    id: 'No1',
  },
  {
    image: '/first/2.jpg',
    title: '全新 iPhone 16 手机壳',
    subTitle: ['打造你的个性风格'],
    id: 'No2',
  },
  {
    image: '/first/3.png',
    title: '丰富的印花设计',
    subTitle: ['支持全新 iPhone 16 系列'],
    id: 'No3',
  },
  {
    image: '/first/4.png',
    title: '全新 Apple Watch 10 表带',
    subTitle: ['Bounce Odyssey™ 极强一体式表带'],
    id: 'No4',
  },
  {
    image: '/first/5.png',
    title: 'MagSafe 配件',
    subTitle: ['Snappy™ 系列产品', '为你的 iPhone 16 创造更多可能'],
    id: 'No5',
  },
  {
    image: '/first/6.mp4',
    id: 'No6',
    title: '屏幕保护贴',
    subTitle: ['提供多方位防护'],
    type: 'mp4',
  },
]

function CarouselBanner({
  title,
  subTitle,
  id,
}: {
  id: string
  title: string
  subTitle: (string | { text: string })[]
}) {
  // todo font-family

  return (
    <div className={carouselCss.bannerContainer} data-id={id}>
      <div className={`${carouselCss.bannerTitle} ${carouselCss.curveCorner}`}>
        {title}
      </div>

      <div
        className={`${carouselCss.bannerSubtitle} ${carouselCss.curveCorner}`}
      >
        {subTitle.map(item => {
          if (typeof item === 'string') {
            return <div key={item}>{item}</div>
          }

          return <div key={item.text}>{item?.text}</div>
        })}
      </div>
    </div>
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
                <video
                  autoPlay
                  loop
                  playsInline
                  muted
                  width="100%"
                  height="100%"
                  className={carouselCss.carouselVideo}
                >
                  <source src={item.image} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )
              break
            default:
              slide = (
                <Image
                  className={carouselCss.carouselSlide}
                  src={item.image}
                  alt={item.id}
                  fill
                />
              )
          }

          return (
            <div key={item.id} className={carouselCss.slideContainer}>
              {slide}

              <CarouselBanner
                id={item.id}
                title={item.title}
                subTitle={item.subTitle}
              />
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
