import "server-only"
import { google } from "googleapis"

export const runtime = "nodejs"

function normalizePrivateKey(k) {
    if (!k) return k
    return k.includes("\\n") ? k.replace(/\\n/g, "\n") : k
}

function loadCreds() {
    const client_email = process.env.GOOGLE_CLIENT_EMAIL
    const private_key = normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY)
    if (client_email && private_key) return { client_email, private_key }

    const blob = process.env.GOOGLE_PROJECT_CREDENTIALS
    if (blob) {
        const json = JSON.parse(blob)
        return {
            client_email: json.client_email,
            private_key: normalizePrivateKey(json.private_key),
        }
    }
    throw new Error("Missing GOOGLE_CLIENT_EMAIL/GOOGLE_PRIVATE_KEY or GOOGLE_PROJECT_CREDENTIALS")
}

function getAuth() {
    const { client_email, private_key } = loadCreds()
    if (!client_email) throw new Error("Service account client_email is missing")
    if (!private_key) throw new Error("Service account private_key is missing")

    return new google.auth.JWT({
        email: client_email,
        key: private_key,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })
}

const SHEET_ID = process.env.SPREADSHEET_ID
const TAB = "ชีต1"

function quoteTabIfNeeded(tabName) {
    const needsQuote = /[^A-Za-z0-9_]/.test(tabName)
    if (!needsQuote) return tabName
    return `'${tabName.replace(/'/g, "''")}'`
}
function A1(part) { return `${quoteTabIfNeeded(TAB)}!${part}` }

async function ensureHeaders({ range, headers }) {
    const auth = getAuth()
    await auth.authorize()
    const sheets = google.sheets({ version: "v4", auth })

    const { data } = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: A1(range),
        majorDimension: "ROWS",
    })

    const current = (data.values && data.values[0]) || []
    const same =
        current.length >= headers.length &&
        headers.every((h, i) => (current[i] || "").toString().trim() === h)

    if (!same) {
        await sheets.spreadsheets.values.update({
            spreadsheetId: SHEET_ID,
            range: A1(range),
            valueInputOption: "USER_ENTERED",
            requestBody: { values: [headers] },
        })
    }
}

/* -------------------- Products (A..F) -------------------- */

export async function listProducts() {
    if (!SHEET_ID) throw new Error("Missing SPREADSHEET_ID")
    await ensureHeaders({
        range: "A1:I1",
        headers: ["id", "name", "images", "type", "createdAt", "updatedAt", "price", "colls", "url"],
    })

    const auth = getAuth(); await auth.authorize()
    const sheets = google.sheets({ version: "v4", auth })

    const { data } = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: A1("A2:I"),
    })

    const rows = data.values ?? []
    return rows.map((r) => {
        let images = []
        try { images = r[2] ? JSON.parse(r[2]) : [] }
        catch { images = (r[2] || "").split(",").filter(Boolean) }
        return {
            type: r[3] || "product",
            id: r[0] || "",
            name: r[1] || "",
            images,
            createdAt: r[4] || "",
            updatedAt: r[5] || "",
            price: r[6] === "" || r[6] == null ? "" : Number(r[6]),
            colls: r[7] || "",
            url: r[8] || "",
        }
    })
}

export async function appendProduct({ name, images = [], price = 0, colls = "", url = "" }) {
    if (!SHEET_ID) throw new Error("Missing SPREADSHEET_ID")
    if (!name) throw new Error("name is required")

    await ensureHeaders({
        range: "A1:I1",
        headers: ["id", "name", "images", "type", "createdAt", "updatedAt", "price", "colls", "url"],
    })

    const id = globalThis.crypto?.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)
    const now = new Date().toISOString()
    const row = [id, name, JSON.stringify(images), "product", now, now, Number(price || 0), colls || "", url || ""]

    const auth = getAuth(); await auth.authorize()
    const sheets = google.sheets({ version: "v4", auth })

    await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: A1("A:I"),
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [row] },
    })

    return { type: "product", id, name, images, createdAt: now, updatedAt: now, price: Number(price || 0), colls: colls || "", url: url || "" }
}

/* -------------------- Collections (H..L) -------------------- */

export async function listCollections() {
    if (!SHEET_ID) throw new Error("Missing SPREADSHEET_ID")

    const auth = getAuth(); await auth.authorize()
    const sheets = google.sheets({ version: "v4", auth })

    const { data } = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: A1("H2:O"),
    })

    const rows = data.values ?? []
    return rows.map((r) => {
        let images = []
        try { images = r[2] ? JSON.parse(r[2]) : [] } catch { images = [] }
        return {
            type: r[3] || "collection",
            id: r[0] || "",
            name: r[1] || "",
            images,
            createdAt: r[4] || "",
            updatedAt: r[5] || "",
            price: r[6] === "" || r[6] == null ? "" : Number(r[6]), // ส่วนใหญ่ค่าว่าง
            colls: r[7] || "",  // สำหรับ collection ปล่อยว่างไว้
        }
    })
}

export async function appendCollection({ name, images = [] }) {
    if (!SHEET_ID) throw new Error("Missing SPREADSHEET_ID")
    if (!name) throw new Error("name is required")

    const id = globalThis.crypto?.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)
    const now = new Date().toISOString()
    const row = [id, name, JSON.stringify(images), "collection", now, now, "", ""]

    const auth = getAuth(); await auth.authorize()
    const sheets = google.sheets({ version: "v4", auth })

    await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: A1("H:O"),
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [row] },
    })

    return { type: "collection", id, name, images, createdAt: now, updatedAt: now, price: "", colls: "" }
}

/* -------------------- รวมทั้งหมด (มี type แยกให้) -------------------- */

// รวมทั้ง products + collections และเรียงตาม createdAt (ล่าสุดก่อน)
export async function listAll({ order = "desc" } = {}) {
    const [products, collections] = await Promise.all([
        listProducts(),
        listCollections(),
    ])

    const combined = [...products, ...collections].map((it) => ({
        ...it,
        // เผื่อ createdAt ว่าง ให้เป็น 0
        __ts: it.createdAt ? Date.parse(it.createdAt) : 0,
    }))

    combined.sort((a, b) => {
        return order === "asc" ? a.__ts - b.__ts : b.__ts - a.__ts
    })

    // ลบฟิลด์ชั่วคราวก่อนคืนค่า
    return combined.map(({ __ts, ...rest }) => rest)
}
