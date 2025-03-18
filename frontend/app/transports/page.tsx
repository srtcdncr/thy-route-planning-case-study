"use client"

import { useEffect, useState } from "react"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import type { Transport } from "@/types"
import { transportApi } from "@/services/api"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function TransportsPage() {
  const [transports, setTransports] = useState<Transport[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchTransports = async () => {
    try {
      setLoading(true)
      const data = await transportApi.findAll()
      setTransports(data)
      setError(null)
    } catch (err) {
      setError("Failed to fetch transports")
      toast({
        title: "Error",
        description: "Failed to fetch transports",
        variant: "destructive",
      })
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransports()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await transportApi.delete(id)
      toast({
        title: "Success",
        description: "Transport deleted successfully",
      })
      // Refresh the transports list
      fetchTransports()
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete transport",
        variant: "destructive",
      })
      console.error(err)
    }
  }

  return (
    <div className="w-full py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Transports</h1>
        <Button asChild>
          <Link href="/transports/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Transport
          </Link>
        </Button>
      </div>

      {error && <div className="mb-4 rounded-md bg-destructive/15 p-4 text-destructive">{error}</div>}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Origin</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Transportation Types</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-8" />
                  </TableCell>
                  <TableCell>
                    <div>
                      <Skeleton className="h-5 w-40 mb-1" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Skeleton className="h-5 w-40 mb-1" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Skeleton className="h-9 w-16" />
                      <Skeleton className="h-9 w-16" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : transports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No transports found. Add your first transport.
                </TableCell>
              </TableRow>
            ) : (
              transports.map((transport) => (
                <TableRow key={transport.id}>
                  <TableCell>{transport.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{transport.origin.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {transport.origin.city}, {transport.origin.country}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{transport.destination.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {transport.destination.city}, {transport.destination.country}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {transport.transportationType.map((type) => (
                        <Badge key={type} variant="outline">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/transports/${transport.id}`}>Edit</Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the transport and may affect
                              any routes that use this transport.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(transport.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

