import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

interface RouteContext {
    params: {
        id: string
    }
}

export async function GET(_request: NextRequest, context: RouteContext) {
    try {
        const post = await prisma.post.findUnique({
            where: { id: context.params.id },
        })
        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 })
        }
        return NextResponse.json(post)
    } catch (error) {
        console.error("Failed to fetch post:", error)
        return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
    }
}

export async function PUT(request: NextRequest, context: RouteContext) {
    try {
        const { title, content } = await request.json()
        const post = await prisma.post.update({
            where: { id: context.params.id },
            data: { title, content },
        })
        return NextResponse.json(post)
    } catch (error) {
        console.error("Failed to update post:", error)
        return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
    }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
    try {
        await prisma.post.delete({
            where: { id: context.params.id },
        })
        return NextResponse.json({ message: "Post deleted" })
    } catch (error) {
        console.error("Failed to delete post:", error)
        return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
    }
}

