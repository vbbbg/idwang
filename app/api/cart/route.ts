import { NextRequest } from 'next/server'
import { sql } from '@vercel/postgres'

export async function POST(request: NextRequest) {
  try {
    const { userId, skuId, quantity } = await request.json()
    // 检查请求参数是否完整
    if (!userId || !skuId || !quantity) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // 查询是否存在该用户的购物车
    let cart = await sql`SELECT id FROM carts WHERE user_id = ${userId}`

    // 如果没有购物车，则创建一个新的购物车
    let cartId
    if (cart.rows.length === 0) {
      const newCart =
        await sql`INSERT INTO carts (user_id) VALUES (${userId}) RETURNING id`
      cartId = newCart.rows[0].id
    } else {
      cartId = cart.rows[0].id
    }

    // 检查购物车中是否已经存在该 SKU
    let cartItem =
      await sql`SELECT id, quantity FROM cart_items WHERE cart_id = ${cartId} AND sku_id = ${skuId}`

    if (cartItem.rows.length === 0) {
      // 如果购物车中没有该 SKU，插入新记录
      const newCartItem =
        await sql`INSERT INTO cart_items (cart_id, sku_id, quantity) VALUES (${cartId}, ${skuId}, ${quantity}) RETURNING *`

      return new Response(JSON.stringify(newCartItem.rows[0]), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      })
    } else {
      // 如果购物车中已有该 SKU，更新数量
      const updatedQuantity = cartItem.rows[0].quantity + quantity
      const updatedCartItem =
        await sql`UPDATE cart_items SET quantity = ${updatedQuantity}, updated_at = NOW() WHERE id = ${cartItem.rows[0].id} RETURNING *`

      return new Response(JSON.stringify(updatedCartItem.rows[0]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  } catch (error) {
    console.error('Error adding item to cart:', error)
    return new Response(
      JSON.stringify({ message: 'Error adding item to cart' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}

// GET 请求处理函数
export async function GET(request: NextRequest) {
  try {
    // 从查询参数中获取用户ID
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return new Response(
        JSON.stringify({ message: 'Missing userId in query' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // 查询用户的购物车信息
    const { rows: cart } = await sql`
      SELECT
        c.id AS cart_id,
        ci.sku_id,
        ci.quantity,
        p.name AS product_name,
        p.description AS product_description,
        s.price,
        s.color,
        s.material
      FROM carts c
      JOIN cart_items ci ON c.id = ci.cart_id
      JOIN skus s ON ci.sku_id = s.id
      JOIN products p ON s.product_id = p.id
      WHERE c.user_id = ${userId};
    `

    // 返回购物车详情
    return new Response(JSON.stringify(cart), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error fetching cart:', error)
    return new Response(JSON.stringify({ message: 'Error fetching cart' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
