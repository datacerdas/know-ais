import { createStore } from "solid-js/store"

export type Shipping = {
  id_trajectory: string
  origin_port_name: string
  origin_port_id: string
  destination_port_name: string
  destination_port_id: string
  movements: [[]]
}

export interface ShippingStore {
  trajectory: Shipping[]
}
export const [shipping, setShipping] = createStore<ShippingStore>({
  trajectory: [],
})
