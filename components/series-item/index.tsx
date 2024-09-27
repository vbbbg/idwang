'use client'

import Image from 'next/image'
import useStore from '@/store'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function SeriesItem({ itemInfo }: { itemInfo: ProductInfo }) {
  const { openCartStatus } = useStore()

  const [addingToCart, setAddingToCart] = useState(false)

  const [selectedSku, setSelectedSku] = useState(itemInfo.skus[0])

  const imageLoader = ({ src }: { src: string }) => {
    return `https://cdn-stamplib.casetify.cn${src}`
  }

  const addToCart = async () => {
    setAddingToCart(true)

    const response = await fetch(`/api/auth`)
    const { data } = await response.json()
    const { user } = data || {}

    if (!user) {
      setAddingToCart(false)
      openCartStatus()
      return
    }

    const response2 = await fetch(`/api/cart`, {
      method: 'post',
      body: JSON.stringify({
        skuId: selectedSku.sku_id,
        quantity: 1,
        userId: user.id,
      }),
    })

    const json = await response2.json()
    openCartStatus()

    setAddingToCart(false)
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
        <div className="flex flex-col gap-[10px] flex-shrink-0 w-[400px]">
          <div className="text-[36px] font-[800] leading-[120%]">
            {itemInfo.name} - {selectedSku.color}
          </div>

          <div className="text-[24px]">¥{selectedSku.price} 免运费</div>

          <div className="text-[16px]">已选择: {selectedSku.color}</div>

          <div className="w-full overscroll-x-auto flex gap-[10px]">
            {itemInfo.skus.map(item => {
              return (
                <div
                  key={item.sku_id}
                  style={{ backgroundColor: item.color_hex }}
                  className={`w-[44px] h-[44px] rounded-[50%] cursor-pointer  ${'shadow-[inset_0_1.5px_1.5px_rgba(0,0,0,0.3)]'}`}
                  onClick={() => setSelectedSku(item)}
                />
              )
            })}
          </div>

          <Button
            className="mt-1 py-[19px] px-[24px] bg-black rounded-[20px] cursor-pointer text-white text-center text-[20px]"
            onClick={() => addToCart()}
            disabled={addingToCart}
          >
            加入购物车
          </Button>
        </div>
      </div>
    </div>
  )
}
