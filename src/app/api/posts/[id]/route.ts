import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

//指定された(id)投稿の取得
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const post = await prisma.post.findUnique({
            where: { id: params.id }
        })
        if (!post) {
            return NextResponse.json({ error: "投稿がありません" }, { status: 404 })
        }
        return NextResponse.json(post)
    } catch (error) {
        console.error("投稿の取得ができませんでした", error)
        return NextResponse.json({ error: "投稿の取得ができませんでした" }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { title, content } = await request.json()
        const post = await prisma.post.update({
            where: { id: params.id },
            data: { title, content },
        })
        return NextResponse.json(post)
    } catch (error) {
        console.error("投稿の編集ができませんでした", error)
        return NextResponse.json({ error: "投稿の編集ができませんでした" }, { status: 500 })
    }
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.post.delete({
            where: { id: params.id },
        })
        return NextResponse.json({ message: "投稿を削除しました" })
    } catch (error) {
        console.error("投稿が削除できませんでした", error)
        return NextResponse.json({ error: "投稿を削除できませんでした" }, { status: 500 })
    }
}