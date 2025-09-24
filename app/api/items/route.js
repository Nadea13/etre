import { NextResponse } from "next/server"
import { listProducts, appendProduct } from "@/lib/sheets"

export const runtime = "nodejs"

export async function GET() {
  try {
    const items = await listProducts()
    return NextResponse.json(items, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err.message || "error" }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const name = body?.name?.toString().trim()
    const price = Number(body?.price ?? 0)
    const images = Array.isArray(body?.images) ? body.images : []
    const colls = (body?.colls ?? "").toString()
    const url = body?.url?.toString().trim()

    if (!name) return NextResponse.json({ error: "name is required" }, { status: 400 })

    const item = await appendProduct({ name, images, price, colls, url })
    return NextResponse.json({ ok: true, item }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err.message || "error" }, { status: 500 })
  }
}