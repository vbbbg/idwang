'use client'

import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@radix-ui/react-dialog'
import { IonChevronBackCircleOutline } from '@/components/svg/BackCircle'
import useStore from '@/store'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { IconamoonCloseBold } from '@/components/svg/IconamoonCloseBold'

export default function CartDrawer() {
  const { cartStatus, switchCartStatus } = useStore()

  const [isAuth, setIsAuth] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    if (!cartStatus) return

    const updateHandler = async () => {
      const response = await fetch(`/api/auth`)
      const data = await response.json()
      const { user } = data.data || {}
      setIsAuth(!!user)

      const response2 = await fetch(`/api/cart?userId=${user.id}`)
      const data2 = await response2.json()
      console.log(data2)
      setCartItems(data2)
    }

    updateHandler().then()
  }, [cartStatus])

  const renderCartContent = () => {
    if (!isAuth) {
      return (
        <Link href="/sso?mode=login">
          <Button>登陆</Button>
        </Link>
      )
    }

    return (
      <>
        {cartItems.map(item => {
          return (
            <div
              key={item.sku_id}
              className={`text-[12px] font-medium leading-[1.2] m-0 -mx-4 p-4 bg-gradient-to-b from-[hsla(0,0%,93%,0)] to-[#eee]`}
            >
              <div className="flex justify-end">
                <IconamoonCloseBold className="w-[20px] h-[20px] cursor-pointer" />
              </div>

              <div className="flex gap-[8px]">
                <div className="w-[112px] h-[112px] bg-gray-300"></div>
                <div className="flex flex-col gap-[10px]">
                  <div className="text-[14px]">
                    {item.product_name} - {item.color}
                  </div>
                  <div>价格：${item.price}</div>
                  <div>颜色：{item.color}</div>
                  <div>材料：{item.material}</div>
                </div>
              </div>
            </div>
          )
        })}
      </>
    )
  }

  return (
    <Drawer direction="right" open={cartStatus} onOpenChange={switchCartStatus}>
      <DrawerTrigger asChild>
        <Button>购物车</Button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay className="fixed inset-0 bg-black/40 " />
        <DrawerContent className="bg-white flex flex-col rounded-t-[10px] h-full w-[400px] mt-24 fixed bottom-0 right-0">
          <div className="p-4 bg-white flex-1 h-full text-black">
            <div className="max-w-md mx-auto">
              <DrawerTitle className="font-medium mb-4">
                <div className="bg-[#eee] w-full h-[56px] rounded-[20px] flex items-center p-[10px] relative justify-center gap-[4px]">
                  <DialogClose asChild>
                    <IonChevronBackCircleOutline className="w-[34px] h-[34px] cursor-pointer absolute left-[10px]" />
                  </DialogClose>

                  <div>购物车</div>

                  <span className="inline-block text-center leading-[20px] w-[20px] h-[20px] bg-black rounded-[50%] text-white text-[12px]">
                    {cartItems.length}
                  </span>
                </div>
              </DrawerTitle>

              <p className="text-zinc-600 mb-8">{renderCartContent()}</p>
            </div>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  )
}
