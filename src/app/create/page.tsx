"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreatePost() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // ここでバックエンドAPIを呼び出して投稿を作成します（後で実装）
        console.log("投稿作成:", { title, content })
        router.push("/")
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">新規投稿</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block mb-2">
                        タイトル
                    </label>
                    <input
                        type="text"
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
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    投稿する
                </button>
            </form>
        </main>
    )
}

