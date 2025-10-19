import { transformToChartData } from "@/lib/data-transformer"
import { type NextRequest, NextResponse } from "next/server"

let businessData: any = null

export async function GET(request: NextRequest) {
  try {
    if (!businessData) {
      return NextResponse.json({
        chartData: [
          { name: "Mon", value: 0 },
          { name: "Tue", value: 0 },
          { name: "Wed", value: 0 },
          { name: "Thu", value: 0 },
          { name: "Fri", value: 0 },
          { name: "Sat", value: 0 },
          { name: "Sun", value: 0 },
        ],
      })
    }

    const chartData = transformToChartData(businessData)
    return NextResponse.json({ chartData })
  } catch (error) {
    console.error("[v0] Charts API Error:", error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    businessData = data
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Charts Upload Error:", error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
