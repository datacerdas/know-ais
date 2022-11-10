import { createStore } from "solid-js/store"
import { Country, Port } from "./NodeStore"

export type Community = {
    id?: string
    name?: string
    cluster?: any
}

export interface CommunityStore {
    community: Community[] & (Port[] | Country[])
}

export const [community, setCommunity] = createStore<CommunityStore>({ community: [] })
export const [countryCommunity, setCountryCommunity] = createStore<CommunityStore>({ community: [] })
export const [portCommunity, setPortCommunity] = createStore<CommunityStore>({ community: [] })