import Link from "next/link"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function Home() {
  type Post = {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
  }
  const posts: Post[] = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">掲示板</h1>
      <Link href="/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        新規投稿
      </Link>
      <div className="mt-8 grid gap-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded">
            <Link href={`/posts/${post.id}`} className="text-xl font-semibold hover:underline">
              {post.title}
            </Link>
            <p className="text-gray-600 text-sm mt-2">投稿日: {new Date(post.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </main>
  )
}

