import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
    try {
        const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false })

        if (error) throw error

        return NextResponse.json(data)
    } catch (error) {
        console.error("Failed to fetch posts:", error)
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const { title, content } = await request.json()

        const { data, error } = await supabase.from("posts").insert([{ title, content }]).select().single()

        if (error) throw error

        return NextResponse.json(data, { status: 201 })
    } catch (error) {
        console.error("Failed to create post:", error)
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
    }
}

