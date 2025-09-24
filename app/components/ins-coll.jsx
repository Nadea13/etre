import { useEffect, useMemo, useState } from "react"

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_COLL

const MAX_BYTES = 1_000_000
const MAX_DIM = 1600
const MIN_DIM = 512
const MIN_QUALITY = 0.5
const TARGET_MIME = "image/webp"

function loadImage(file) {
    return new Promise((res, rej) => {
        const url = URL.createObjectURL(file)
        const img = new Image()
        img.onload = () => { URL.revokeObjectURL(url); res(img) }
        img.onerror = e => { URL.revokeObjectURL(url); rej(e) }
        img.src = url
    })
}

function canvasToBlob(c, t, q) {
    return new Promise((res, rej) => {
        c.toBlob(b => b ? res(b) : rej(new Error("toBlob failed")), t, q)
    })

}

async function compressToUnder1MB(file) {
    if (file.size <= MAX_BYTES) return file

    let img
    try {
        img = await loadImage(file)
    } catch {
        return file
    }

    let w = img.naturalWidth, h = img.naturalHeight

    const maxSide = Math.max(w, h)
    const scale = maxSide > MAX_DIM ? (MAX_DIM / maxSide) : 1
    w = Math.max(Math.round(w * scale), Math.min(w, MIN_DIM))
    h = Math.max(Math.round(h * scale), Math.min(h, MIN_DIM))

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = w
    canvas.height = h
    ctx.drawImage(img, 0, 0, w, h)

    let qLow = MIN_QUALITY, qHigh = 0.95, best = null

    for (let i = 0; i < 7; i++) {
        const q = (qLow + qHigh) / 2
        const b = await canvasToBlob(canvas, TARGET_MIME, q)
        if (b.size <= MAX_BYTES) {
            best = b
            qLow = q
        } else {
            qHigh = q
        }
    }
    if (!best || best.size > MAX_BYTES) {
        const factor = 0.85
        const w2 = Math.max(Math.round(w * factor), MIN_DIM)
        const h2 = Math.max(Math.round(h * factor), MIN_DIM)
        if (w2 !== w && h2 !== h) {
            canvas.width = w2; canvas.height = h2
            ctx.drawImage(img, 0, 0, w2, h2)
            best = await canvasToBlob(canvas, TARGET_MIME, Math.max(qLow, MIN_QUALITY))
        }
    }

    const out = best || await canvasToBlob(canvas, TARGET_MIME, MIN_QUALITY);
    const newName = file.name.replace(/\.[^.]+$/, "") + ".webp";
    return new File([out], newName, { type: TARGET_MIME, lastModified: Date.now() });
}

function InsertCollection() {
    const [form, setForm] = useState({ name: "" })
    const [files, setFiles] = useState([])
    const [uploading, setUploading] = useState(false)

    const thumb = (url) => url?.replace("/upload/", "/upload/f_auto,q_auto,c_fill,w_300,h_300/")

    const previews = useMemo(
        () => files.map(f => ({ name: f.name, url: URL.createObjectURL(f) })),
        [files]
    )
    useEffect(() => () => previews.forEach(p => URL.revokeObjectURL(p.url)), [previews])

    const handleFiles = (e) => {
        const list = Array.from(e.target.files || [])
        const images = list.filter(f => f.type.startsWith("image/"))
        setFiles(prev => [...prev, ...images])
    }
    const removeFile = (name) => setFiles(prev => prev.filter(f => f.name !== name))

    async function uploadCloudinary(inFiles) {
        if (!CLOUD || !PRESET) throw new Error("Cloudinary env is missing")
        if (!inFiles?.length) return []

        setUploading(true)
        try {
            const processed = await Promise.all(inFiles.map(f => compressToUnder1MB(f)))
            const results = await Promise.all(processed.map(async (f) => {
                const fd = new FormData()
                fd.append("file", f)
                fd.append("upload_preset", PRESET)
                fd.append("folder", "collections")
                fd.append("context", `alt=${f.name}`)
                const r = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, { method: "POST", body: fd })
                const data = await r.json()
                if (!r.ok) throw new Error(data?.error?.message || "upload failed")
                return { url: data.secure_url, publicId: data.public_id }
            }))
            return results
        } finally {
            setUploading(false)
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!form.name.trim() || uploading) return
        try {
            const uploaded = await uploadCloudinary(files)
            const imageUrls = uploaded.map(u => u.url)
            const r = await fetch("/api/collections", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: form.name, images: imageUrls }),
            })
            const data = await r.json()
            if (!r.ok) throw new Error(data.error || "save failed")
            setForm({ name: "" })
            setFiles([])
        } catch (err) {
            alert(err.message || "Upload error")
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">Insert Collection</h1>

            <form onSubmit={onSubmit} className="grid gap-3 p-4 ring-1 ring-gray-200 rounded-xl">
                <input
                    className="px-3 py-2 ring-1 ring-gray-300 rounded-lg"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm(s => ({ ...s, name: e.target.value }))}
                />
                <div className="space-y-2">
                    <label className="block font-medium">Images</label>
                    <input type="file" accept="image/*" multiple onChange={handleFiles} className="block" />
                    {files.length > 0 && (
                        <div className="grid grid-cols-3 gap-3">
                            {previews.map(p => (
                                <div key={p.name} className="relative">
                                    <img src={p.url} alt={p.name} className="w-full h-28 object-cover ring-1 ring-gray-200 rounded-lg" />
                                    <button
                                        type="button"
                                        onClick={() => removeFile(p.name)}
                                        className="absolute top-1 right-1 px-2 py-1 text-xs bg-black/70 text-white rounded"
                                    >
                                        remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded-lg disabled:opacity-50"
                    disabled={!form.name.trim() || uploading}
                >
                    {uploading ? "Uploading..." : "Add"}
                </button>
            </form>
        </div>
    )
}

export default InsertCollection
