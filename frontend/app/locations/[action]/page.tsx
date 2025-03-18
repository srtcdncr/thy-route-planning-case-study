"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import type { Location } from "@/types"
import { locationApi } from "@/services/api"

export default function LocationForm() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const isNew = params.action === "new"
  const locationId = isNew ? null : Number(params.action)

  const [formData, setFormData] = useState<Omit<Location, "id">>({
    name: "",
    country: "",
    city: "",
    locationCode: "",
  })
  const [loading, setLoading] = useState(!isNew)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLocation = async () => {
      if (!isNew && locationId) {
        try {
          setLoading(true)
          const location = await locationApi.findById(locationId)
          setFormData({
            name: location.name,
            country: location.country,
            city: location.city,
            locationCode: location.locationCode,
          })
          setError(null)
        } catch (err) {
          setError("Failed to fetch location details")
          toast({
            title: "Error",
            description: "Failed to fetch location details",
            variant: "destructive",
          })
          console.error(err)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchLocation()
  }, [isNew, locationId, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      if (isNew) {
        await locationApi.create(formData)
        toast({
          title: "Success",
          description: "Location created successfully",
        })
      } else if (locationId) {
        await locationApi.update(locationId, formData)
        toast({
          title: "Success",
          description: "Location updated successfully",
        })
      }
      router.push("/locations")
    } catch (err) {
      const action = isNew ? "create" : "update"
      setError(`Failed to ${action} location`)
      toast({
        title: "Error",
        description: `Failed to ${action} location`,
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
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
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
          <CardTitle>{isNew ? "Add New Location" : "Edit Location"}</CardTitle>
          <CardDescription>
            {isNew ? "Add a new location to your route planner" : "Update the details of this location"}
          </CardDescription>
        </CardHeader>
        {error && <div className="mx-6 mb-4 rounded-md bg-destructive/15 p-4 text-destructive">{error}</div>}
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Location Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={submitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                disabled={submitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                disabled={submitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="locationCode">Location Code</Label>
              <Input
                id="locationCode"
                name="locationCode"
                value={formData.locationCode}
                onChange={handleChange}
                required
                disabled={submitting}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/locations")} disabled={submitting}>
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

