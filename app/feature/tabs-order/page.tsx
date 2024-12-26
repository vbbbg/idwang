'use client'

import { ITab, Tabs } from '@/app/feature/constant'
import React, {
  Children,
  DragEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'

function setPlaceholderAndInitStyle(dragId: string): void {
  // 获取目标 DOM 元素
  const targetElement = document.getElementById(dragId)
  if (!targetElement) return

  const offsetLeftSnapshot = targetElement.offsetLeft

  // 创建一个大小一致的空白 div
  const blankDiv: HTMLDivElement = document.createElement('div')
  blankDiv.style.width = `${targetElement.offsetWidth}px`
  blankDiv.style.height = `${targetElement.offsetHeight}px`
  blankDiv.id = `placeholder-${dragId}`

  // 将空白 div 添加到目标 DOM 的父节点中
  const parent = targetElement.parentNode
  if (!parent) return

  parent.insertBefore(blankDiv, targetElement)

  // 设置原有 DOM 为 absolute
  const style = targetElement.style
  style.position = 'absolute'
  style.left = `${offsetLeftSnapshot}px`
  style.zIndex = '1'
}

function switchHover(target: HTMLDivElement, action: 'on' | 'off') {
  const parent = target.parentElement
  if (!parent) return

  Array.from(parent.children).forEach(child => {
    if (child.id === target.id) return
    ;(child as HTMLDivElement).style.pointerEvents =
      action === 'off' ? 'none' : ''
  })
}

function removePlaceholderAndSetStyle(dragId: string): void {
  const placeholderId = `placeholder-${dragId}`
  const placeholder = document.getElementById(placeholderId)
  if (!placeholder) return

  const target = document.getElementById(dragId)
  if (!target) return

  requestAnimationFrame(() => {
    target.style.transition = 'all 150ms linear'
    target.style.left = `${placeholder.offsetLeft}px`
    target.style.transform = 'translateX(0)'
  })

  // 清理动画样式
  target.addEventListener(
    'transitionend',
    () => {
      target.style.position = ''
      target.style.left = ''
      target.style.transform = ''
      target.style.transition = ''
      target.style.zIndex = ''

      placeholder.style.position = 'absolute'
      target.parentElement?.insertBefore(target, placeholder)
      target.parentElement?.removeChild(placeholder)
    },
    { once: true }
  )
}

function updateTranslateX(dragId: string, offsetX: number) {
  const target = document.getElementById(dragId)
  if (!target) return

  target.style.transform = `translateX(${offsetX}px)`
}

function swapWithFlipAnimation(
  drag: HTMLElement,
  drop: HTMLElement,
  action: 'left' | 'right'
) {
  if (!drag || !drop || drag === drop) {
    console.error('Invalid DOM elements provided.')
    return
  }

  const parent = drag.parentNode

  if (!parent || parent !== drop.parentNode) {
    console.error('DOM elements must share the same parent.')
    return
  }

  if (drop.dataset.animation) {
    return
  }

  // 加锁，防止重复触发动画
  drop.dataset.animation = '1'

  // Step 1: First - 获取初始位置
  const rectB = drop.getBoundingClientRect()

  // Step 2: Last
  if (action === 'left') {
    parent.insertBefore(drag, drop)
  }

  if (action === 'right') {
    parent.insertBefore(drag, drop.nextSibling)
  }

  // 获取更新后的最终位置
  const newRectB = drop.getBoundingClientRect()

  // Step 3: Invert - 计算位置差异
  const deltaB = { x: rectB.left - newRectB.left }

  // Step 4: Play - 设置反向位移并添加动画
  drop.style.transform = `translateX(${deltaB.x}px)`

  // 使用 requestAnimationFrame 确保动画顺序正确
  requestAnimationFrame(() => {
    drop.style.transition = 'transform 150ms linear'
    drop.style.transform = 'translateX(0)'
  })

  // 清理动画样式
  drop.addEventListener(
    'transitionend',
    () => {
      drop.dataset.animation = ''

      drop.style.transition = ''
      drop.style.transform = ''
    },
    { once: true }
  )
}

function sortWhenDrag(target: HTMLDivElement, action: 'left' | 'right') {
  const parent = target.parentElement
  if (!parent) return

  const placeholder = document.getElementById(`placeholder-${target.id}`)
  if (!placeholder) return

  const siblings = Array.from(parent.children) as HTMLDivElement[]

  siblings.forEach(sibling => {
    if (target.id === sibling.id) return
    if (placeholder.id === sibling.id) return

    const rect = target.getBoundingClientRect()
    const siblingRect = sibling.getBoundingClientRect()

    switch (action) {
      case 'left':
        {
          if (
            rect.left < siblingRect.left ||
            rect.left > siblingRect.left + siblingRect.width
          ) {
            return
          }

          // 左边触及
          if (rect.left <= siblingRect.left + siblingRect.width / 2) {
            swapWithFlipAnimation(placeholder, sibling, action)
          }
        }

        break

      case 'right':
        {
          if (
            rect.left + rect.width < siblingRect.left ||
            rect.left + rect.width > siblingRect.left + siblingRect.width
          ) {
            return
          }

          // 右边触及
          if (
            rect.left + rect.width >
            siblingRect.left + siblingRect.width / 2
          ) {
            swapWithFlipAnimation(placeholder, sibling, action)
          }
        }
        break
      default:
    }
  })
}

function hideDragPreview(element: HTMLDivElement) {
  if (!element) return

  element.addEventListener('dragstart', (event: DragEvent) => {
    if (!event.dataTransfer) return

    const emptyImage = new Image()
    emptyImage.src =
      'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

    // 设置拖拽时显示的图片为透明图片
    event.dataTransfer.setDragImage(emptyImage, 0, 0)
  })
}

function getMouseMove(current: number, prev?: number) {
  if (!prev) return

  if (current > prev) {
    return 'right'
  } else if (current < prev) {
    return 'left'
  }
}

function DragWrapper(props: {
  tab: ITab
  onDragStart?: () => void
  children: ReactNode
}) {
  const { tab } = props

  const initMouseXRef = useRef(0)
  const mouseXBeforeMove = useRef<number>()

  const onDragStart: DragEventHandler<HTMLDivElement> | undefined = e => {
    initMouseXRef.current = e.clientX

    switchHover(e.target as HTMLDivElement, 'off')

    setPlaceholderAndInitStyle(tab.key)

    props.onDragStart?.()
  }

  const onDrag: DragEventHandler<HTMLDivElement> | undefined = e => {
    const mouseX = e.clientX

    // 鼠标移动到屏幕范围外 or 松手
    if (mouseX === 0) return

    const _offsetX = mouseX === 0 ? 0 : mouseX - initMouseXRef.current
    updateTranslateX(tab.key, _offsetX)

    const action = getMouseMove(e.clientX, mouseXBeforeMove.current)
    mouseXBeforeMove.current = e.clientX

    const target = e.target as HTMLDivElement
    if (action) {
      sortWhenDrag(target, action)
    }
  }

  const onDragEnd: DragEventHandler<HTMLDivElement> | undefined = e => {
    removePlaceholderAndSetStyle(tab.key)

    switchHover(e.target as HTMLDivElement, 'on')
  }

  useEffect(() => {
    hideDragPreview(document.getElementById(tab.key) as HTMLDivElement)
  })

  return Children.map(props.children, child => {
    if (child === undefined) return undefined

    if (React.isValidElement(child)) {
      return React.cloneElement(child as any, {
        draggable: true,
        id: tab.key,
        onDragStart: onDragStart,
        onDrag: onDrag,
        onDragEnd: onDragEnd,
      })
    }

    return child // 对于非 React 元素，直接返回
  })
}

const TabItem = ({
  label,
  onClick,
  isSelected,
  variant = 'default',
  ...other
}: {
  label: string
  isSelected?: boolean
  onClick?: () => void
  variant?: 'default' | 'secondary'
  other?: { [K: string]: any }
}) => {
  const variants = {
    default: {
      selected: 'bg-[rgb(60,60,60)] text-white',
      unselected: 'text-gray-400 hover:bg-gray-700',
    },
    secondary: {
      selected: 'bg-blue-600 text-white',
      unselected: 'bg-gray-800 text-gray-300 hover:bg-gray-600',
    },
  }

  const styles = variants[variant] || variants.default

  return (
    <div
      className={`relative flex items-center justify-between w-48 h-8 px-4 py-2 rounded-md select-none text-xs ${
        isSelected ? styles.selected : styles.unselected
      }`}
      onClick={onClick}
      {...other}
    >
      <span>{label}</span>
      <button className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-500 text-white rotate-45 select-none text-[1rem]">
        +
      </button>
      {isSelected ? (
        <>
          <div className="absolute bottom-0 w-[18px] h-[23px] shadow-[6px_6px_1px_rgb(60,60,60)] left-[-18px] rounded-[16px] z-40" />
          <div className="absolute bottom-0 w-[18px] h-[23px] shadow-[-6px_6px_1px_rgb(60,60,60)] right-[-18px] rounded-[16px] z-40" />
        </>
      ) : null}
    </div>
  )
}

export default function TabsOrder() {
  const [select, setSelect] = useState('')

  return (
    <div className="h-screen overflow-hidden">
      <div className="bg-[rgb(60,60,60)] pb-[6px] flex items-end mt-[100px]">
        <div className="relative w-full pt-[6px] flex  bg-[rgb(31,32,32)] justify-center items-end  gap-[5px]">
          {Tabs.map(item => {
            return (
              <DragWrapper
                tab={item}
                key={item.key}
                onDragStart={() => setSelect(item.key)}
              >
                <TabItem
                  label={item.label}
                  isSelected={item.key === select}
                  onClick={() => setSelect(item.key)}
                />
              </DragWrapper>
            )
          })}
        </div>
      </div>
    </div>
  )
}
