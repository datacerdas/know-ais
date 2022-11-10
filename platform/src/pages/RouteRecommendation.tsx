import { Component, createEffect, createSignal, For } from "solid-js"
import MapGL, { Viewport, Source, Layer, Control } from "solid-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"

import { Select, createOptions } from "@thisbeyond/solid-select"
import "@thisbeyond/solid-select/style.css"

import * as h3 from "h3-js"
import geojson2h3 from "geojson2h3"

import HackathonLogo from "../assets/hackathon-web-banner.png"

// @ts-ignore
import trajectory22 from "../data/trajectory/ais_trajectory_2022.csv"

// @ts-ignore
import trajectory21 from "../data/trajectory/ais_trajectory_2021.csv"

// @ts-ignore
import ports__ from "../data/ports__.csv"
// @ts-ignore

import shortest from "../data/trajectory/dummy_shortest_trajectory.csv"

import AppLoader from "../AppLoader"
import { movement, setMovement } from "../stores/GeoStore"
import { setShipping, shipping } from "../stores/ShippingStore"
import { ports } from "../stores/NodeStore"

let trajectoryObject: {}[] = []
trajectory21.forEach((e: any) => {
  trajectoryObject.push({
    id_trajectory: e.id_shipping + "-2021",
    origin: e.origin_port_name,
    destination: e.destination_port_name,
    movements: {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: JSON.parse(e.movements),
      },
    },
  })
})
trajectory22.forEach((e: any) => {
  trajectoryObject.push({
    id_trajectory: e.id_shipping + "-2022",
    origin: e.origin_port_name,
    destination: e.destination_port_name,
    movements: {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: JSON.parse(e.movements),
      },
    },
  })
})
const RouteRecommendation: Component = () => {
  const originSelect = createOptions([
    ...new Set(
      shortest.map(({ origin_port_name }: any) => origin_port_name)
    ),
  ])
  const [destinationSelect, setDestinationSelect] = createSignal([])

  const [origin, setOrigin] = createSignal("KIEL")

  const [shortestTrajectories, setShortestTrajectories] = createSignal([])

  const [filteredPort, setFilteredPort] = createSignal([])

  createEffect(() => {
    setShipping("trajectory", trajectoryObject)
    console.log(ports)
  })

  return (
    <>
      <div
        class="top-32 left-8"
        style={{ position: "absolute", "z-index": 1 }}
      >
        <legend class="text-white mb-2 font-bold">Select Origin: </legend>
        <Select
          class="know-ais w-80"
          {...originSelect}
          onChange={(value) => {
            let dest = [
              ...new Set(
                shortest.map(
                  ({ origin_port_name, destination_port_name }: any) =>
                    origin_port_name == value
                      ? destination_port_name
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
          Select Destination:{" "}
        </legend>
        <Select
          class="know-ais w-80"
          options={destinationSelect}
          onChange={(value) => {
            let filtered = shipping.trajectory.filter(
              (obj: any) =>
                obj.destination == value && obj.origin == origin()
            )
            let port = filteredPort()
            port.push(value)
            setFilteredPort(port)
            setShortestTrajectories(filtered)
          }}
        />
      </div>
      //TODO filter port
      <For
        each={ports.port.filter((x) => filteredPort().includes(x.port))}
      >
        {(item: any) => (
          <Source
            source={{
              type: "geojson",
              data: item.h3_5_hexring_MultiPolygon,
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
              data: item.movements,
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
