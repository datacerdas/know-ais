import { createStore } from "solid-js/store";

// export type Shipping = {
//     avg_speed : any
//     destination_country_iso2 : any
//     destination_port_id : any
//     destination_port_name : any
//     distance : any
//     end_time : any
//     id_shipping : any
//     is_imputed_port : any
//     mmsi : any
//     movements : []
//     origin_country_iso2 : any
//     origin_port_id : any
//     origin_port_name : any
//     start_time : any
//     vessel_type : any
// }

// export const [movement, setMovement] = createStore<Shipping>({
//     avg_speed : '',
//     destination_country_iso2 : '',
//     destination_port_id : '',
//     destination_port_name : '',
//     distance : '',
//     end_time : '',
//     id_shipping : '',
//     is_imputed_port : '',
//     mmsi : '',
//     movements : [],
//     origin_country_iso2 : '',
//     origin_port_id : '',
//     origin_port_name : '',
//     start_time : '',
//     vessel_type : '',
// });

type Geom = {
    type: string
    coordinates: [[]]
}

type MovementPath = {
    type: string
    geometry: Geom
}

export const [movement, setMovement] = createStore<MovementPath>({
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: [[]],
    },
})