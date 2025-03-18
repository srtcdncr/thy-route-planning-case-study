import type {Location, RouteDTO, Transport} from "@/types"

const API_BASE_URL = "http://localhost:7070"

// Location API calls
export const locationApi = {
  findAll: async (): Promise<Location[]> => {
    const response = await fetch(`${API_BASE_URL}/locations`)
    if (!response.ok) {
      throw new Error(`Error fetching locations: ${response.statusText}`)
    }
    return response.json()
  },

  findById: async (id: number): Promise<Location> => {
    const response = await fetch(`${API_BASE_URL}/locations/${id}`)
    if (!response.ok) {
      throw new Error(`Error fetching location: ${response.statusText}`)
    }
    return response.json()
  },

  create: async (location: Omit<Location, "id">): Promise<Location> => {
    const response = await fetch(`${API_BASE_URL}/locations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(location),
    })
    if (!response.ok) {
      throw new Error(`Error creating location: ${response.statusText}`)
    }
    return response.json()
  },

  update: async (id: number, location: Omit<Location, "id">): Promise<Location> => {
    const response = await fetch(`${API_BASE_URL}/locations/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(location),
    })
    if (!response.ok) {
      throw new Error(`Error updating location: ${response.statusText}`)
    }
    return response.json()
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/locations/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error(`Error deleting location: ${response.statusText}`)
    }
  },
}

// Transport API calls
export const transportApi = {
  findAll: async (): Promise<Transport[]> => {
    const response = await fetch(`${API_BASE_URL}/transportations`)
    if (!response.ok) {
      throw new Error(`Error fetching transportations: ${response.statusText}`)
    }
    return response.json()
  },

  findById: async (id: number): Promise<Transport> => {
    const response = await fetch(`${API_BASE_URL}/transportations/${id}`)
    if (!response.ok) {
      throw new Error(`Error fetching transport: ${response.statusText}`)
    }
    return response.json()
  },

  create: async (transport: Omit<Transport, "id">): Promise<Transport> => {
    const response = await fetch(`${API_BASE_URL}/transportations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transport),
    })
    if (!response.ok) {
      throw new Error(`Error creating transport: ${response.statusText}`)
    }
    return response.json()
  },

  update: async (id: number, transport: Omit<Transport, "id">): Promise<Transport> => {
    const response = await fetch(`${API_BASE_URL}/transportations/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transport),
    })
    if (!response.ok) {
      throw new Error(`Error updating transport: ${response.statusText}`)
    }
    return response.json()
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/transportations/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error(`Error deleting transport: ${response.statusText}`)
    }
  },
}

// Routes API calls
export const routesApi = {
  findRoutes: async (origin: string, destination: string): Promise<RouteDTO[]> => {
    const url = new URL(`${API_BASE_URL}/routes`)
    url.searchParams.append("origin", origin)
    url.searchParams.append("destination", destination)

    const response = await fetch(url.toString())
    if (!response.ok) {
      throw new Error(`Error fetching routes: ${response.statusText}`)
    }
    return response.json()
  },
}