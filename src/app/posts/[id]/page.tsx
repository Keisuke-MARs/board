import Link from "next/link"
import { notFound } from "next/navigation"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

type Post = {
    id: string
    title: string
    content: string
    createdAt: Date
}

async function getPost(id: string): Promise<Post | null> {
    return await prisma.post.findUnique({
        where: { id }
    })
}


export default async function PostDetail({ params }: { params: { id: string } }) {
    // ここでバックエンドAPIを呼び出して投稿データを取得します（後で実装）
    const post = await getPost(params.id)

    if (!post) {
        notFound()
    }
    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-600 mb-4">投稿日: {new Date(post.createdAt).toLocaleString()}</p>
            <p className="mb-8">{post.content}</p>
            <div className="space-x-4">
                <Link
                    href={`/posts/${post.id}/edit`}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                >
                    編集
                </Link>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">削除</button>
            </div>
            <Link href="/" className="block mt-8 text-blue-500 hover:underline">
                戻る
            </Link>
        </main>
    )
}

