import Head from 'next/head'
import { SeriesItem } from '@/components/series-item'
import { sql } from '@vercel/postgres'

export async function generateMetadata() {
  return {
    title: '波漾手机壳',
  }
}

export default async function SeriesPage({
  params,
}: {
  params: { no: string }
}) {
  const { no } = params

  const { rows } = await sql`
            SELECT 
                p.id AS product_id, 
                p.name AS product_name, 
                p.description AS product_description, 
                s.id AS sku_id, 
                s.price AS sku_price, 
                s.color AS sku_color, 
                s.material AS sku_material, 
                s.compatibility AS sku_compatibility, 
                s.stock AS sku_stock,
                s.color_hex AS sku_color_hex
            FROM 
                products p
            JOIN 
                skus s ON p.id = s.product_id
            WHERE 
                p.id = ${1};
        `

  const productInfo = {
    id: rows[0].product_id,
    name: rows[0].product_name,
    description: rows[0].product_description,
    skus: rows.map(row => ({
      sku_id: row.sku_id,
      price: row.sku_price,
      color: row.sku_color,
      material: row.sku_material,
      compatibility: row.sku_compatibility,
      stock: row.sku_stock,
      color_hex: row.sku_color_hex,
    })),
  }

  return (
    <>
      <Head>
        <title>{productInfo.name}</title>
      </Head>
      <SeriesItem itemInfo={productInfo} />
    </>
  )
}
