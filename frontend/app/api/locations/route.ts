import { type NextRequest, NextResponse } from "next/server"
import type { Location } from "@/types"

// In-memory database for testing
const locations: Location[] = [
  {
    id: 1,
    name: "Istanbul Airport",
    country: "Turkey",
    city: "Istanbul",
    locationCode: "IST",
  },
  {
    id: 2,
    name: "Ankara Bus Terminal",
    country: "Turkey",
    city: "Ankara",
    locationCode: "ANK-BT",
  },
  {
    id: 3,
    name: "Izmir Adnan Menderes Airport",
    country: "Turkey",
    city: "Izmir",
    locationCode: "ADB",
  },
]

export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json(locations)
}

export async function POST(request: NextRequest) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const body = await request.json()

  // Validate required fields
  if (!body.name || !body.country || !body.city || !body.locationCode) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  // Create new location
  const newLocation: Location = {
    id: locations.length > 0 ? Math.max(...locations.map((l) => l.id)) + 1 : 1,
    name: body.name,
    country: body.country,
    city: body.city,
    locationCode: body.locationCode,
  }

  locations.push(newLocation)

  return NextResponse.json(newLocation, { status: 201 })
}

