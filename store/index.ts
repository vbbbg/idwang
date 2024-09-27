import { create } from 'zustand'

// 定义状态类型
interface AppState {
  cartStatus: boolean
  openCartStatus: () => void
  closeCartStatus: () => void
  switchCartStatus: (status: boolean) => void
}

// 创建 store
const useStore = create<AppState>(set => ({
  cartStatus: false,
  switchCartStatus: (status: boolean) => set(state => ({ cartStatus: status })),
  openCartStatus: () => set(state => ({ cartStatus: true })),
  closeCartStatus: () => set(state => ({ cartStatus: false })),
}))

export default useStore
