import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

//投稿の取得
export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: "desc" },
        })
        return NextResponse.json(posts)
    } catch (error) {
        console.error("投稿の取得に失敗しました", error)
        return NextResponse.json({ error: "投稿の取得に失敗しました" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const { title, content } = await request.json()
        const post = await prisma.post.create({
            data: { title, content },
        })
        return NextResponse.json(post, { status: 201 })
    } catch (error) {
        console.error("投稿の作成に失敗しました", error)
        return NextResponse.json({ error: "投稿の作成に失敗しました" }, { status: 500 })
    }
}