"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function EditPost({ params }: { params: { id: string } }) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const router = useRouter()

    useEffect(() => {
        //APIでデータを取得
        setTitle("サンプル投稿")
        setContent("投稿内容")
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        //APIで投稿を更新
        console.log("投稿更新:", { id: params.id, title, content })
        router.push(`/posts/${params.id}`)
    }

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
                <button type="submit" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                    更新する
                </button>
            </form>
        </main>
    )
}