"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { type Location, TransportationType } from "@/types"
import { locationApi, transportApi } from "@/services/api"

const transportationTypeOptions = [
  { id: TransportationType.FLIGHT, label: "Flight" },
  { id: TransportationType.BUS, label: "Bus" },
  { id: TransportationType.UBER, label: "Uber" },
  { id: TransportationType.SUBWAY, label: "Subway" },
]

export default function TransportForm() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const isNew = params.action === "new"
  const transportId = isNew ? null : Number(params.action)

  const [locations, setLocations] = useState<Location[]>([])
  const [formData, setFormData] = useState({
    originId: "",
    destinationId: "",
    transportationType: [] as TransportationType[],
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch all locations for the dropdowns
        const locationsData = await locationApi.findAll()
        setLocations(locationsData)

        // If editing, fetch the transport details
        if (!isNew && transportId) {
          const transport = await transportApi.findById(transportId)
          setFormData({
            originId: transport.origin.id.toString(),
            destinationId: transport.destination.id.toString(),
            transportationType: [...transport.transportationType],
          })
        }

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
  }, [isNew, transportId, toast])

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (type: TransportationType, checked: boolean) => {
    setFormData((prev) => {
      if (checked) {
        return {
          ...prev,
          transportationType: [...prev.transportationType, type],
        }
      } else {
        return {
          ...prev,
          transportationType: prev.transportationType.filter((t) => t !== type),
        }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Find the origin and destination locations
      const origin = locations.find((l) => l.id.toString() === formData.originId)
      const destination = locations.find((l) => l.id.toString() === formData.destinationId)

      if (!origin || !destination) {
        throw new Error("Origin or destination not found")
      }

      const transportData = {
        origin,
        destination,
        transportationType: formData.transportationType,
      }

      if (isNew) {
        await transportApi.create(transportData)
        toast({
          title: "Success",
          description: "Transport created successfully",
        })
      } else if (transportId) {
        await transportApi.update(transportId, transportData)
        toast({
          title: "Success",
          description: "Transport updated successfully",
        })
      }

      router.push("/transports")
    } catch (err) {
      const action = isNew ? "create" : "update"
      setError(`Failed to ${action} transport`)
      toast({
        title: "Error",
        description: `Failed to ${action} transport`,
        variant: "destructive",
      })
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="w-full py-8">
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full mt-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex justify-between w-full">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full py-8">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>{isNew ? "Add New Transport" : "Edit Transport"}</CardTitle>
          <CardDescription>
            {isNew ? "Add a new transport option to your route planner" : "Update the details of this transport option"}
          </CardDescription>
        </CardHeader>
        {error && <div className="mx-6 mb-4 rounded-md bg-destructive/15 p-4 text-destructive">{error}</div>}
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="originId">Origin Location</Label>
              <Select
                value={formData.originId}
                onValueChange={(value) => handleSelectChange("originId", value)}
                disabled={submitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select origin location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={location.id.toString()}>
                      {location.name} ({location.locationCode})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="destinationId">Destination Location</Label>
              <Select
                value={formData.destinationId}
                onValueChange={(value) => handleSelectChange("destinationId", value)}
                disabled={submitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select destination location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={location.id.toString()}>
                      {location.name} ({location.locationCode})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Transportation Types</Label>
              <div className="space-y-2">
                {transportationTypeOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={formData.transportationType.includes(option.id)}
                      onCheckedChange={(checked) => handleCheckboxChange(option.id, checked as boolean)}
                      disabled={submitting}
                    />
                    <Label htmlFor={option.id} className="cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/transports")} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : isNew ? "Create" : "Update"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

