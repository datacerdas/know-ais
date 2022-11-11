import { Component, createEffect, createSignal, For } from "solid-js"
import MapGL, { Viewport, Source, Layer, Control } from "solid-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"

import { Select, createOptions } from "@thisbeyond/solid-select"
import "@thisbeyond/solid-select/style.css"

// @ts-ignore
import trajectory22 from "../data/trajectory/ais_trajectory_2022.csv"

// @ts-ignore
import shortest_path from "../data/trajectory/port_shortest_path.csv"

import AppLoader from "../AppLoader"
import { setShipping, shipping } from "../stores/ShippingStore"
import { ports } from "../stores/NodeStore"


let trajectoryObject: {}[] = []

const RouteRecommendation: Component = () => {
  const originSelect = createOptions([
    ...new Set(
      shortest_path.map(({ sourceNodeName }: any) => sourceNodeName)
    ),
  ])
  const [destinationSelect, setDestinationSelect] = createSignal([])

  const [origin, setOrigin] = createSignal('')
  const [destination, setDestination] = createSignal('')
  // const [shortTrajectories, setShortTrajectories] = createSignal([])

  const [shortestTrajectories, setShortestTrajectories] = createSignal([])
  const [shortestNodePorts, setShortestNodePorts] = createSignal([])

  const [filteredPort, setFilteredPort] = createSignal([])

  
  trajectory22.forEach((e: any) => {
    trajectoryObject.push({
      // id_trajectory: e.id_shipping + "-2022",
      id_trajectory: e.id_shipping,
      origin_port_id: e.origin_port_id,
      origin_port_name: e.origin_port_name,
      destination_port_id: e.destination_port_id,
      destination_port_name: e.destination_port_name,
      movements: {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: JSON.parse(e.movements),
        },
      },
    })
  })

  createEffect(() => {
    setShipping("trajectory", trajectoryObject)
  })

  return (
    <>
      <div
        class="top-32 left-8"
        style={{ position: "absolute", "z-index": 1 }}
      >
        <legend class="text-white mb-2 font-bold">Origin Port: </legend>
        <Select
          class="know-ais w-80"
          {...originSelect}
          onChange={(value) => {
            setShortestTrajectories([])
            setShortestNodePorts([])
            setDestinationSelect([])
            let dest = [
              ...new Set(
                shortest_path.map(
                  ({ sourceNodeName, targetNodeName }: any) =>
                  sourceNodeName == value
                      ? targetNodeName
                      : null
                )
              ),
            ]
            setOrigin(value)
            let port = filteredPort()
            port.push(value)
            setFilteredPort(port)
            // @ts-ignore
            setDestinationSelect(dest)
          }}
        />
        <legend class="text-white my-2 font-bold">
          Destination Port:{" "}
        </legend>
        <Select
          class="know-ais w-80"
          options={destinationSelect}
          onChange={(value) => {
            setDestination(value)
            // console.log(origin(), destination(), 'arieqo')
            let shortMovements: [] = []
            let shortPorts: [] = []
            shortest_path.forEach((e:any) => {
              if(e.sourceNodeName == origin() && e.targetNodeName == destination()) {
                shortMovements = JSON.parse(e.shipping_id.replace(/'/g, '"'))
                shortPorts = JSON.parse(e.port_id.replace(/'/g, '"'))
              }
            })
            let shortMovements_id = shortMovements.filter((v, i, a) => a.indexOf(v) === i)
            let shortPorts_id = shortPorts.filter((v, i, a) => a.indexOf(v) === i)

            let shortTrajectories: {}[] =[]
            for (let i = 0; i < shortMovements_id.length; i++) {
                let shippingIndex = shipping.trajectory.findIndex((obj) => obj.id_trajectory == shortMovements_id[i])
                if (shippingIndex !== -1) {
                  shortTrajectories.push(shipping.trajectory[shippingIndex].movements)
                  // console.log(shipping.trajectory[i], 's')    
                }              
            }
            // console.log(shortTrajectories, 'eadhheq')
            setShortestTrajectories(shortTrajectories)
            
            let shortNodePorts: {}[] =[]
            for (let i = 0; i < shortPorts_id.length; i++) {
                let portIndex = ports.port.findIndex((obj) => obj.port_id == shortPorts_id[i])
                if (portIndex !== -1) {
                  shortNodePorts.push(ports.port[portIndex].h3_5_hexring_MultiPolygon)
                  console.log(ports.port[portIndex].port_id, 's', shortPorts_id[i], 's', ports.port[portIndex].port)    
                }              
            }
            // console.log(shortNodePorts, 'eadhheq')
            setShortestNodePorts(shortNodePorts)

            console.log(origin(),'to', destination())
            console.log(shortestTrajectories(), 'traj')
            console.log(shortestNodePorts(), 'ports')

            console.log(ports)
            
          }}
        />
      </div>
      
      <For
        each={shortestNodePorts()}
      >
        {(item: any) => (
          <Source
            source={{
              type: "geojson",
              data: item,
            }}
          >
            <Layer
              style={{
                type: "fill",
                paint: {
                  "fill-color": "hsl(100, 90%, 50%)",
                  "fill-opacity": 0.6,
                  // https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/
                },
              }}
            />
          </Source>
        )}
      </For>
      <For each={shortestTrajectories()}>
        {(item: any) => (
          <Source
            source={{
              type: "geojson",
              data: item,
            }}
          >
            <Layer
              style={{
                type: "line",
                paint: {
                  "line-color": "hsl(52, 86%, 53%)",
                  "line-width": 3,
                },
              }}
            />
          </Source>
        )}
      </For>
    </>
  )
}

export default RouteRecommendation
