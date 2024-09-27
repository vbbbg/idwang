'use client'

import Image from 'next/image'
import useStore from '@/store'

export function SeriesItem({ itemInfo }: { itemInfo: ProductInfo }) {
  const { openCartStatus } = useStore()
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
            {itemInfo.name} - {itemInfo.skus[0].color}
          </div>

          <div className="text-[24px]">¥{itemInfo.skus[0].price} 免运费</div>

          <div className="text-[16px]">已选择: {itemInfo.skus[0].color}</div>

          <div className="w-full overscroll-x-auto flex gap-[10px]">
            {itemInfo.skus.map(item => {
              return (
                <div
                  key={item.sku_id}
                  className={`w-[44px] h-[44px] rounded-[50%] cursor-pointer bg-${item.color.toLowerCase()} ${'shadow-[inset_0_1.5px_1.5px_rgba(0,0,0,0.3)]'}`}
                />
              )
            })}
          </div>

          <div
            className="mt-1 py-[19px] px-[24px] bg-black rounded-[20px] cursor-pointer text-white text-center text-[20px]"
            onClick={() => openCartStatus()}
          >
            加入购物车
          </div>
        </div>
      </div>
    </div>
  )
}
