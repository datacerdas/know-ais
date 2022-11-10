import { createStore } from "solid-js/store"

export type Shipping = {
  id_trajectory: string
  origin: string
  destination: string
  movements: [[]]
}

export interface ShippingStore {
  trajectory: Shipping[]
}
export const [shipping, setShipping] = createStore<ShippingStore>({
  trajectory: [],
})
