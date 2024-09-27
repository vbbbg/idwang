// 定义 SKU 的接口
interface SKU {
  sku_id: number
  price: number
  color: string
  material: string
  compatibility: string
  stock: number
  color_hex: string
}

// 定义商品信息的接口，其中包含嵌套的 SKU 数组
interface ProductInfo {
  id: number
  name: string
  description: string
  skus: SKU[]
}

interface CartItem {
  cart_id: number
  sku_id: number
  quantity: number
  product_name: string
  product_description: string
  price: string
  color: string
  material: string
}
