export enum TransportationType {
  FLIGHT = "FLIGHT",
  BUS = "BUS",
  UBER = "UBER",
  SUBWAY = "SUBWAY",
}

export interface Location {
  id: number
  name: string
  country: string
  city: string
  locationCode: string
}

export interface Transport {
  id: number
  origin: Location
  destination: Location
  transportationType: TransportationType[]
}

export interface TransportationDTO {
  origin: string
  destination: string
  transportationType: TransportationType
}

export interface RouteDTO {
  description: string
  beforeFlightTransfer: TransportationDTO | null
  flight: TransportationDTO
  afterFlightTransfer: TransportationDTO | null
}
