// app/api/gsheet-debug/route.js
import { NextResponse } from "next/server"
import { google } from "googleapis"

export const runtime = "nodejs"

const ok = (v) => !!v

export async function GET() {
  const hasSheet = ok(process.env.SPREADSHEET_ID)
  const hasBlob  = ok(process.env.GOOGLE_PROJECT_CREDENTIALS)
  const hasPair  = ok(process.env.GOOGLE_CLIENT_EMAIL) && ok(process.env.GOOGLE_PRIVATE_KEY)

  let auth = "skipped"
  try {
    let client_email, private_key
    if (hasPair) {
      client_email = process.env.GOOGLE_CLIENT_EMAIL
      private_key  = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n")
    } else if (hasBlob) {
      const c = JSON.parse(process.env.GOOGLE_PROJECT_CREDENTIALS)
      client_email = c.client_email
      private_key  = (c.private_key || "").replace(/\\n/g, "\n")
    }

    if (client_email && private_key) {
      const jwt = new google.auth.JWT({
        email: client_email,
        key: private_key,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      })
      await jwt.authorize()
      auth = "authorized"
    } else {
      auth = "missing client_email/private_key"
    }
  } catch (e) {
    auth = `auth error: ${e.message}`
  }

  return NextResponse.json({ hasSheet, hasBlob, hasPair, auth }, { status: 200 })
}