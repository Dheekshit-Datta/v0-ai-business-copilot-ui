import { transformToMetrics } from "@/lib/data-transformer"
import { type NextRequest, NextResponse } from "next/server"

// Store uploaded business data in memory (in production, use a database)
let businessData: any = null

export async function GET(request: NextRequest) {
  try {
    // If no data uploaded, return empty metrics
    if (!businessData) {
      return NextResponse.json({
        metrics: [
          { title: "Total Sales", value: "$0", change: "0%", isPositive: true },
          { title: "Profit Margin", value: "$0", change: "0%", isPositive: true },
          { title: "Ad Spend Efficiency", value: "0x", change: "0%", isPositive: true },
          { title: "Growth Rate", value: "0%", change: "0%", isPositive: true },
        ],
      })
    }

    const metrics = transformToMetrics(businessData)
    return NextResponse.json({ metrics })
  } catch (error) {
    console.error("[v0] Analytics API Error:", error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    businessData = data
    return NextResponse.json({ success: true, message: "Business data uploaded" })
  } catch (error) {
    console.error("[v0] Analytics Upload Error:", error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
