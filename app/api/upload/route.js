// app/api/upload/route.js
export const runtime = "nodejs"

import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(req) {
    try {
        const form = await req.formData()
        const files = form.getAll("files") // name ต้องตรงกับ fd.append("files", f)

        if (!files || files.length === 0) {
            return NextResponse.json({ error: "no files" }, { status: 400 })
        }

        const uploadDir = path.join(process.cwd(), "public", "uploads")
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

        const urls = []
        for (const f of files) {
            // f เป็น Blob (file)
            const arrayBuffer = await f.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)

            const safeName = `${Date.now()}-${(f.name || "file")
                .replaceAll(" ", "_")
                .replace(/[^a-zA-Z0-9._-]/g, "")}`

            const filePath = path.join(uploadDir, safeName)
            fs.writeFileSync(filePath, buffer)

            urls.push(`/uploads/${safeName}`)
        }

        return NextResponse.json({ ok: true, urls }, { status: 201 })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ error: e.message || "upload failed" }, { status: 500 })
    }
}