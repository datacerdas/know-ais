import { Component, createEffect, createSignal, For } from "solid-js";
import MapGL, { Viewport, Source, Layer, Control } from "solid-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { Select } from "@thisbeyond/solid-select";
import "@thisbeyond/solid-select/style.css";

import * as h3 from "h3-js";
import geojson2h3 from "geojson2h3";

// import ports_wfp from "../data/ports_wfp.csv";
// @ts-ignore
import ports__ from "../data/ports__.csv";
// import shipping_traj from "../data/shipping_traj.csv";
// @ts-ignore
import shipping_traj from "../data/shipping_traj_2.csv";

import neo4j from "neo4j-driver"
import AppLoader from "../AppLoader";
import { movement, setMovement } from "../stores/GeoStore";


// const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'bps12345'))
// const session = driver.session()

// const personName = 'Alice'

// try {
//   const result = await session.run(
//     'CREATE (a:Person {name: $name}) RETURN a',
//     { name: personName }
//   )

//   const singleRecord = result.records[0]
//   const node = singleRecord.get(0)

//   // console.log(node.properties.name, 'voila')
// } finally {
//   await session.close()
// }

// // on application exit:
// await driver.close()


let ports : any[] = []
ports__.forEach((e:any) => {
  let h3_5_hexring = 
    geojson2h3.h3SetToMultiPolygonFeature(
      JSON.parse(e.h3_5_hexring.replace(/'/g, '"'))
    );
  ports.push(h3_5_hexring)
})

const styles = [
  'OSM Org',
  'OSM Human',
  'OSM Cycle',
  'OSM Topo',
  'Carto Voyager',
  'Carto Positron',
  'Carto Dark',
  'Stamen Toner',
  'Stamen Toner-Lite',
  'Stamen Watercolor',
  'Stamen Terrain',
  'TF Cycle',
  'TF Trans',
  'TF Trans-Dark',
  'TF Landscape',
  'TF Outdoors',
  'TF Neighbourhood',
  'TF Spinal',
  'TF Pioneer',
  'TF Atlas',
  'TF Mobile',
];

const Map: Component = () => {
  const [viewport, setViewport] = createSignal({
    center: [20.177059, 60.143988],
    zoom: 4,
  } as Viewport);
  const [mouseCoords, setMouseCoords] = createSignal({ lat: 0, lng: 0 });

  createEffect( () => {
    // console.log(mouseCoords())
    setMovement('geometry', 'coordinates', JSON.parse(shipping_traj[4564].movements))
  })
  const [style, setStyle] = createSignal('osm:org');

  return (
    <MapGL
      options={{
        style: "mb:dark",
      }}
      viewport={viewport()}
      onViewportChange={(evt: Viewport) => setViewport(evt)}
      onMouseMove={(evt: any) => setMouseCoords(evt.lngLat)}
    >
      
      <Control type="navigation" />
      <Control type="geolocate" />
      <Control type="fullscreen" position="top-right" />
      <Control type="scale" />

      {/* <select
        style={{ position: 'absolute', 'z-index': 1 }}
        onChange={(evt: any) =>
          setStyle(
            evt.target.value.toLowerCase().replace(/ /g, ':').replace('-', '_')
          )
        }
      >
        {styles.map((s) => (
          <option>{s}</option>
        ))}
      </select> */}

      <button style={{ position: 'absolute', 'z-index': 1 }} 
            class="text-white bottom-8 right-3 font-extralight text-xs">
        Lat: {mouseCoords().lat.toFixed(6)}&emsp;Lon: {mouseCoords().lng.toFixed(6)}
      </button>
      
      <Select class="custom" options={["apple", "banana", "pear", "pineapple", "kiwi"]} />
      
      <For each={ports} fallback={<AppLoader />}>
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
                    "fill-opacity": 0.6
                    // https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/
                  },
                }}
              />
            </Source>
          )
        }
      </For>

      <Source
        source={{
          type: "geojson",
          data: JSON.parse(JSON.stringify(movement)),
        }}
      >
        <Layer
          style={{
            type: "line",
            paint: {
              "line-color": "hsl(50, 100%, 50%)",
              "line-width": 3,
            },
          }}
        />
      </Source>

    </MapGL>
  );
};

export default Map;
