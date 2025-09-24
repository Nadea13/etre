import { NextResponse } from "next/server"
export async function GET() {
    const hasSheet = !!process.env.SPREADSHEET_ID
    const hasCreds = !!process.env.GOOGLE_PROJECT_CREDENTIALS
    return NextResponse.json({ hasSheet, hasCreds }, { status: 200 })
}