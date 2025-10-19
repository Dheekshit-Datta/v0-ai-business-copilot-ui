import { transformToPredictions } from "@/lib/data-transformer"
import { type NextRequest, NextResponse } from "next/server"

let businessData: any = null

export async function GET(request: NextRequest) {
  try {
    if (!businessData) {
      return NextResponse.json({
        predictions: [
          { week: "Next week", revenue: "$0", change: "0%" },
          { week: "Week after", revenue: "$0", change: "0%" },
          { week: "Month end", revenue: "$0", change: "0%" },
        ],
      })
    }

    const predictions = transformToPredictions(businessData)
    return NextResponse.json({ predictions })
  } catch (error) {
    console.error("[v0] Predictions API Error:", error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    businessData = data
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Predictions Upload Error:", error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
