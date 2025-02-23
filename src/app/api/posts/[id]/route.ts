import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { data, error } = await supabase.from("posts").select("*").eq("id", params.id).single()

        if (error) throw error
        if (!data) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 })
        }

        return NextResponse.json(data)
    } catch (error) {
        console.error("Failed to fetch post:", error)
        return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { title, content } = await request.json()

        const { data, error } = await supabase
            .from("posts")
            .update({ title, content })
            .eq("id", params.id)
            .select()
            .single()

        if (error) throw error
        if (!data) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 })
        }

        return NextResponse.json(data)
    } catch (error) {
        console.error("Failed to update post:", error)
        return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
    }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { error } = await supabase.from("posts").delete().eq("id", params.id)

        if (error) throw error

        return NextResponse.json({ message: "Post deleted" })
    } catch (error) {
        console.error("Failed to delete post:", error)
        return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
    }
}

