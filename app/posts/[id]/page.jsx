import { getPostData } from '@/lib/posts'
import MacTerminal from '@/components/MacTerminal'

export default async function Post({ params }) {
  const postData = await getPostData(params.id)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-8 md:p-16 lg:p-24">
      <div className="w-full max-w-4xl mx-auto">
        <MacTerminal showBackButton={true}>
          <p>$ cat {postData.title}</p>

          <div
            className="mt-2 whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />
        </MacTerminal>
      </div>
    </main>
  )
}
