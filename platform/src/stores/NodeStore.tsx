import { createStore } from "solid-js/store"

export type Port = {
    port?: string
    port_id?: any
    lat_port?: any
    lon_port?: any
    iso2?: any
    area?: any
    h3_5_hexring?: any
    h3_5_hexring_MultiPolygon?: any
}

export type Country = {
    country?: string
    lat_country?: any
    lon_country?: any
    iso2?: any
    geojson?: any
}

export interface PortStore { port: Port[] }
export interface CountryStore { country: Country[] }

export const [ports, setPorts] = createStore<PortStore>({ port: [] })
export const [countries, setCountries] = createStore<CountryStore>({ country: [] })