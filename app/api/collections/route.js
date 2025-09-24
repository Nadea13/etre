import { NextResponse } from "next/server"
import { listCollections, appendCollection } from "@/lib/sheets"

export const runtime = "nodejs"

export async function GET() {
    try {
        const items = await listCollections()
        return NextResponse.json(items, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: err.message || "error" }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        const body = await req.json()
        const name = body?.name?.toString().trim()
        const images = Array.isArray(body?.images) ? body.images : []
        if (!name) return NextResponse.json({ error: "name is required" }, { status: 400 })

        const item = await appendCollection({ name, images })
        return NextResponse.json({ ok: true, item }, { status: 201 })
    } catch (err) {
        return NextResponse.json({ error: err.message || "error" }, { status: 500 })
    }
}