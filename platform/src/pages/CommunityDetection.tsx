import { Component, createEffect, createSignal, For, Show } from "solid-js"
import MapGL, { Viewport, Source, Layer, Control } from "solid-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"

import { Select, createOptions } from "@thisbeyond/solid-select"
import "@thisbeyond/solid-select/style.css"
// @ts-ignore
import country_louvain from "../data/cluster/country_community_detection_louvain.csv"
// @ts-ignore
import port_louvain from "../data/cluster/port_community_detection_louvain.csv"

import AppLoader from "../AppLoader"
import {
  setCountryCommunity,
  setPortCommunity,
} from "../stores/CommunityStore"
import { countries, ports } from "../stores/NodeStore"

const CommunityDetection: Component = () => {
  const portCommunityObject: {}[] = []
  port_louvain.forEach((e: any) => {
    let portIndex = ports.port.findIndex((obj) => obj.port_id == e.id)
    if (portIndex !== -1) {
      let port = ports.port[portIndex]
      portCommunityObject.push({
        id: e.id,
        name: e.port,
        cluster: parseInt(e.communityId),
        port: port.port,
        port_id: port.port_id,
        lat_port: port.lat_port,
        lon_port: port.lon_port,
        coordinate: port.coordinate,
        iso2: port.iso2,
        area: port.area,
        h3_5_hexring: port.h3_5_hexring,
        h3_5_hexring_MultiPolygon: port.h3_5_hexring_MultiPolygon,
      })
    }
  })

  const countryCommunityObject: {}[] = []
  country_louvain.forEach((e: any) => {
    let countryIndex = countries.country.findIndex(
      (obj) => obj.iso2 == e.code
    )
    if (countryIndex !== -1) {
      let country = countries.country[countryIndex]
      countryCommunityObject.push({
        id: e.code,
        name: e.country,
        cluster: parseInt(e.communityId),
        country: country.country,
        iso2: country.iso2,
        geojson: country.geojson,
        lat_country: country.lat_country,
        lon_country: country.lon_country,
        coordinate: country.coordinate,
      })
    }
  })

  const [mode, setMode] = createSignal("country")

  const optionSelect = createOptions(["country", "port"])

  createEffect(() => {
    setPortCommunity("community", portCommunityObject)
    setCountryCommunity("community", countryCommunityObject)
  })

  return (
    <>
      <div
        class="top-32 left-8"
        style={{ position: "absolute", "z-index": 1 }}
      >
        <legend class="text-white mb-2 font-bold">Select Filter: </legend>
        <Select
          class="know-ais w-80"
          {...optionSelect}
          onChange={(val) => {
            setMode(val)
          }}
          initialValue="country"
          placeholder="Select filter"
        />
      </div>

      <For
        each={
          mode() === "country"
            ? countryCommunityObject
            : portCommunityObject
        }
        fallback={<AppLoader />}
      >
        {(item: any) => (
          <>
            <Source
              source={{
                type: "geojson",
                data:
                  mode() === "country"
                    ? item.geojson
                    : item.h3_5_hexring_MultiPolygon,
              }}
            >
              <Layer
                style={{
                  type: "fill",
                  paint: {
                    "fill-color":
                      "rgb(" +
                      `${item.cluster + 22}` +
                      "," +
                      `${item.cluster}` +
                      "," +
                      `${(item.cluster * 42) / 3}` +
                      ")",
                    "fill-opacity": 0.9,
                    // https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/
                  },
                }}
              />
            </Source>
          </>
        )}
      </For>
    </>
  )
}

export default CommunityDetection
