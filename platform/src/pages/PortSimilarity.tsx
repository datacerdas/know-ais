import { Component, createEffect, createSignal, For } from "solid-js"
import MapGL, { Viewport, Source, Layer, Control } from "solid-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"

import { Select, createOptions } from "@thisbeyond/solid-select"
import "@thisbeyond/solid-select/style.css"

// @ts-ignore
import port_embedding from "../data/embedding/port_embedding_similarity_TOP.csv"

import { ports } from "../stores/NodeStore"


const PortSimilarity: Component = () => {
  const originSelect = createOptions([
    ...new Set(
      port_embedding.map(({ port1 }: any) => port1)
    ),
  ])

  const [similarNodePorts, setSimilarNodePorts] = createSignal([])


  return (
    <>
      <div
        class="top-32 left-8"
        style={{ position: "absolute", "z-index": 1 }}
      >
        <legend class="text-white mb-2 font-bold">Select Port: </legend>
        <Select
          class="know-ais w-80"
          {...originSelect}
          onChange={(value) => {

            let similarPorts: [] = []
            port_embedding.forEach((e:any) => {
              if(e.port1 == value && e.sim_score >= 0.95) {
                similarPorts.push(value)
                similarPorts.push(e.port2)
              }
            })
            let similarPorts_id = similarPorts.filter((v, i, a) => a.indexOf(v) === i)            
            console.log(similarPorts_id, 'similaira')

            let similarNodePorts: {}[] =[]
            for (let i = 0; i < similarPorts_id.length; i++) {
                let portIndex = ports.port.findIndex((obj) => obj.port == similarPorts_id[i])
                if (portIndex !== -1) {
                  similarNodePorts.push(ports.port[portIndex].h3_5_hexring_MultiPolygon)
                //   console.log(ports.port[portIndex].port_id, 's', similarPorts_id[i], 's', ports.port[portIndex].port)    
                }              
            }
            // console.log(shortNodePorts, 'eadhheq')
            setSimilarNodePorts(similarNodePorts)
          }}
        />
      </div>
      
      <For
        each={similarNodePorts()}
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
    </>
  )
}

export default PortSimilarity
