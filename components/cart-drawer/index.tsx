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

export default function CartDrawer() {
  const { cartStatus, switchCartStatus } = useStore()

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
                    11
                  </span>
                </div>
              </DrawerTitle>

              <p className="text-zinc-600 mb-8"></p>
            </div>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  )
}
