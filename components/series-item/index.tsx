'use client'

import Image from 'next/image'

export function SeriesItem({
  itemInfo,
}: {
  itemInfo: { name: string; price: number }
}) {
  const imageLoader = ({ src }: { src: string }) => {
    return `https://cdn-stamplib.casetify.cn${src}`
  }

  return (
    <div className="text-black p-[32px]">
      <div className="flex justify-between gap-[8px]">
        <div className="flex-grow relative">
          <Image
            width={0}
            height={0}
            style={{ width: '83.333%', height: 'auto' }}
            loader={imageLoader}
            src="/cms/image/860b2272def885e189c0d2bf7d6e0a5f.png"
            alt="ok"
          />
        </div>
        <div className="flex flex-col gap-[10px] flex-shrink-0 w-[370px]">
          <div className="text-[36px] font-[800] leading-[120%]">
            {itemInfo.name} - 樱草粉
          </div>
          <div className="text-[24px]">¥{itemInfo.price} 免运费</div>

          <div className="text-[16px]">已选择: 黑色</div>
          <div className="w-full overscroll-x-auto flex gap-[10px]">
            <div
              className={`w-[44px] h-[44px] rounded-[50%] cursor-pointer bg-white ${'shadow-[inset_0_1.5px_1.5px_rgba(0,0,0,0.3)]'}`}
            />

            <div
              className={`w-[44px] h-[44px] rounded-[50%] cursor-pointer bg-[#edbad2] ${'shadow-[inset_0_1.5px_1.5px_rgba(0,0,0,0.3)]'}`}
            />

            <div
              className={`w-[44px] h-[44px] rounded-[50%] cursor-pointer bg-black ${'shadow-[inset_0_1.5px_1.5px_rgba(0,0,0,0.3)]'}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
