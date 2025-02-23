import Link from "next/link"
import { createClient } from "@supabase/supabase-js"

// Supabaseクライアントの初期化
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

type Post = {
  id: string
  title: string
  content: string
  created_at: string
}

export default async function Home() {
  // Supabaseから投稿を取得
  const { data: posts, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching posts:", error)
    return <div>Error loading posts</div>
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">掲示板</h1>
      <Link href="/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        新規投稿
      </Link>
      <div className="mt-8 grid gap-4">
        {posts.map((post: Post) => (
          <div key={post.id} className="border p-4 rounded">
            <Link href={`/posts/${post.id}`} className="text-xl font-semibold hover:underline">
              {post.title}
            </Link>
            <p className="text-gray-600 text-sm mt-2">投稿日: {new Date(post.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </main>
  )
}

