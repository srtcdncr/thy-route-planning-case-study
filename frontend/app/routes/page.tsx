"use client"

import { useEffect, useState } from "react"
import { MapPin, RouteIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import type { Location, Transport, RouteDTO } from "@/types"
import { locationApi, transportApi, routesApi } from "@/services/api"

// Update the Route interface
interface Route {
  id: number
  segments?: Transport[]
  apiResponse?: RouteDTO
}

interface LocationOption {
  label: string
  value: number
}

export default function RoutesPage() {
  const [locations, setLocations] = useState<Location[]>([])
  const [transports, setTransports] = useState<Transport[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const [fromLocationId, setFromLocationId] = useState<string>("")
  const [toLocationId, setToLocationId] = useState<string>("")
  const [routes, setRoutes] = useState<Route[]>([])
  const [findingRoutes, setFindingRoutes] = useState(false)



  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch locations and transports
        const [locationsData, transportsData] = await Promise.all([locationApi.findAll(), transportApi.findAll()])

        setLocations(locationsData)
        setTransports(transportsData)
        setError(null)
      } catch (err) {
        setError("Failed to fetch data")
        toast({
          title: "Error",
          description: "Failed to fetch data",
          variant: "destructive",
        })
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [toast])

  const locationOptions: LocationOption[] = locations.map((location) => ({
    label: location.name,
    value: location.id,
  }))

  // Update the findRoutes function
  const findRoutes = async () => {
    if (!fromLocationId || !toLocationId) return

    setFindingRoutes(true)

    try {
      const routeResults = await routesApi.findRoutes(fromLocationId, toLocationId)

      // Set the routes from the API response
      setRoutes(
          routeResults.map((route, index) => ({
            id: index + 1,
            apiResponse: route,
          })),
      )

      if (routeResults.length === 0) {
        toast({
          title: "No Routes Found",
          description: "No routes were found between the selected locations.",
          variant: "default",
        })
      } else {
        toast({
          title: "Routes Found",
          description: `Found ${routeResults.length} possible route(s).`,
          variant: "default",
        })
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to find routes",
        variant: "destructive",
      })
      console.error(err)
    } finally {
      setFindingRoutes(false)
    }
  }

  return (
      <div className="container mx-auto py-10">
        <div className="mb-8 flex items-end justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">Find Routes</h2>
            <p className="text-muted-foreground">Find routes between locations</p>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <Label htmlFor="from">From</Label>
            <Select onValueChange={setFromLocationId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>
              <SelectContent>
                {locationOptions.map((location) => (
                    <SelectItem key={location.label} value={location.label}>
                      {location.label}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="to">To</Label>
            <Select onValueChange={setToLocationId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>
              <SelectContent>
                {locationOptions.map((location) => (
                    <SelectItem key={location.label} value={location.label}>
                      {location.label}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col justify-end">
            <Button onClick={findRoutes} disabled={findingRoutes} className="w-full">
              {findingRoutes ? "Finding Routes..." : "Find Routes"}
            </Button>
          </div>
        </div>

        {routes.length > 0 ? (
            <div className="space-y-4">
              {routes.map((route) => (
                  <Card key={route.id}>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Route {route.id}</CardTitle>
                      {route.apiResponse?.description && <CardDescription>{route.apiResponse.description}</CardDescription>}
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      {route.apiResponse ? (
                          // New API response display logic
                          <div className="space-y-4">
                            {route.apiResponse.beforeFlightTransfer && (
                                <div className="mb-2 border-b pb-2">
                                  <div className="flex justify-between">
                                    <div>
                                      <div className="font-medium">Before Flight Transfer</div>
                                      <div className="text-sm text-muted-foreground">
                                        From: {route.apiResponse.beforeFlightTransfer.origin}
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="font-medium">To: {route.apiResponse.beforeFlightTransfer.destination}</div>
                                      <Badge variant="outline">{route.apiResponse.beforeFlightTransfer.transportationType}</Badge>
                                    </div>
                                  </div>
                                </div>
                            )}

                            <div className="mb-2 border-b pb-2">
                              <div className="flex justify-between">
                                <div>
                                  <div className="font-medium">Flight</div>
                                  <div className="text-sm text-muted-foreground">From: {route.apiResponse.flight.origin}</div>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium">To: {route.apiResponse.flight.destination}</div>
                                  <Badge variant="outline">{route.apiResponse.flight.transportationType}</Badge>
                                </div>
                              </div>
                            </div>

                            {route.apiResponse.afterFlightTransfer && (
                                <div className="mb-2">
                                  <div className="flex justify-between">
                                    <div>
                                      <div className="font-medium">After Flight Transfer</div>
                                      <div className="text-sm text-muted-foreground">
                                        From: {route.apiResponse.afterFlightTransfer.origin}
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="font-medium">To: {route.apiResponse.afterFlightTransfer.destination}</div>
                                      <Badge variant="outline">{route.apiResponse.afterFlightTransfer.transportationType}</Badge>
                                    </div>
                                  </div>
                                </div>
                            )}
                          </div>
                      ) : null}
                    </CardContent>
                  </Card>
              ))}
            </div>
        ) : (
            <div className="flex h-48 items-center justify-center rounded-md border border-dashed">
              <div className="text-center">
                <MapPin className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">Select locations to see possible routes</p>
              </div>
            </div>
        )}
      </div>
  )
}