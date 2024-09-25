import Head from 'next/head'
import { SeriesItem } from '@/components/series-item'

export async function generateMetadata() {
  return {
    title: '波漾手机壳',
  }
}

export default function SeriesPage({ params }: { params: { no: string } }) {
  const { no } = params

  const itemInfo = {
    name: '波漾手机壳',
    price: 419,
  }

  return (
    <>
      <Head>
        <title>{itemInfo.name}</title>
      </Head>
      <SeriesItem itemInfo={itemInfo} />
    </>
  )
}
