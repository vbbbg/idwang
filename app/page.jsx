import { getSortedPostsData } from '@/lib/posts'
import MacTerminal from '@/components/MacTerminal'

export default function Home() {
  const allPostsData = getSortedPostsData()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-8 md:p-16 lg:p-24">
      <div className="w-full max-w-4xl mx-auto">
        <MacTerminal posts={allPostsData} />
      </div>
    </main>
  )
}
