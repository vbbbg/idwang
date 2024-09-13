import Carousel from '@/components/carousel'
import ContentBlock from '@/components/content-block'
import PhoneShellCard from '@/components/phone-shell-card'

export default function Home() {
  return (
    <main>
      <Carousel />
      <ContentBlock title="特色系列">
        <div className="flex flex-col gap-[12px] md:flex-row">
          <PhoneShellCard
            imageClass="aspect-square md:aspect-[173/100]"
            containerClass="md:grow md:shrink md:basis-[auto]"
            bigSrc="/first/p-1-b.png"
            src="/first/p-1.jpg"
            no="01"
            brief="够强韧，够任性"
            link="了解更多"
            bgClass="bg-[#f6e163]"
            linkBorderStyle="black"
          />
          <PhoneShellCard
            imageClass="aspect-square md:aspect-[128/100]"
            containerClass="md:grow md:shrink-0 md:basis-[32%]"
            bigSrc="/first/p-2-b.png"
            src="/first/p-2.png"
            no="02"
            brief="全新 Apple Watch 10 表带"
            link="立即选购"
            bgClass="bg-[#2b5dab]"
            textClass="text-white"
            linkBorderStyle="white"
          />
        </div>
      </ContentBlock>
    </main>
  )
}
