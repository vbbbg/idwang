// 定义 SKU 的接口
interface SKU {
  sku_id: number
  price: number
  color: string
  material: string
  compatibility: string
  stock: number
}

// 定义商品信息的接口，其中包含嵌套的 SKU 数组
interface ProductInfo {
  id: number
  name: string
  description: string
  skus: SKU[]
}
