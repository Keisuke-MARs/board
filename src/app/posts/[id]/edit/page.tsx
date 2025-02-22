"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type Post = {
    id: string
    title: string
    content: string
    createdAt: Date
}

export default function EditPost({ params }: { params: { id: string } }) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/posts/${params.id}`)
                if (!response.ok) {
                    throw new Error("投稿の取得に失敗しました")
                }
                const post: Post = await response.json()
                setTitle(post.title)
                setContent(post.content)
            } catch (err) {
                setError(err instanceof Error ? err.message : "未知のエラーが発生しました")
            } finally {
                setIsLoading(false)
            }
        }

        fetchPost()
    }, [params.id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        //APIで投稿を更新
        setIsLoading(true)
        try {
            const response = await fetch(`/api/posts/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, content }),
            })
            if (!response.ok) {
                throw new Error("投稿の更新に失敗しました")
            }
            router.push(`/posts/${params.id}`)
        } catch (err) {
            setError(err instanceof Error ? err.message : "未知のエラーが発生しました")
            setIsLoading(false)
        }
    }

    if (isLoading) return <div>読み込み中...</div>
    if (error) return <div>エラー:{error}</div>

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">投稿の編集</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block mb-2">
                        タイトル
                    </label>
                    <input type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block mb-2">
                        内容
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        rows={5}
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                    disabled={isLoading}
                >
                    {isLoading ? "更新中..." : "更新する"}
                </button>
            </form>
        </main>
    )
}