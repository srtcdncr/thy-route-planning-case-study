import { type NextRequest, NextResponse } from "next/server"
import type { Location } from "@/types"

// In-memory database for testing (shared with the main locations route)
let locations: Location[] = [
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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const id = Number.parseInt(params.id)

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 })
  }

  const location = locations.find((l) => l.id === id)

  if (!location) {
    return NextResponse.json({ error: "Location not found" }, { status: 404 })
  }

  return NextResponse.json(location)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const id = Number.parseInt(params.id)

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 })
  }

  const locationIndex = locations.findIndex((l) => l.id === id)

  if (locationIndex === -1) {
    return NextResponse.json({ error: "Location not found" }, { status: 404 })
  }

  const body = await request.json()

  // Validate required fields
  if (!body.name || !body.country || !body.city || !body.locationCode) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  // Update location
  const updatedLocation: Location = {
    id,
    name: body.name,
    country: body.country,
    city: body.city,
    locationCode: body.locationCode,
  }

  locations[locationIndex] = updatedLocation

  return NextResponse.json(updatedLocation)
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const id = Number.parseInt(params.id)

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 })
  }

  const locationIndex = locations.findIndex((l) => l.id === id)

  if (locationIndex === -1) {
    return NextResponse.json({ error: "Location not found" }, { status: 404 })
  }

  // Remove location
  locations = locations.filter((l) => l.id !== id)

  return new NextResponse(null, { status: 204 })
}

