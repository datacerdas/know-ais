import { Component, createEffect, createSignal, For } from "solid-js";
import MapGL, { Viewport, Source, Layer, Control } from "solid-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { Select, createOptions } from "@thisbeyond/solid-select";
import "@thisbeyond/solid-select/style.css";

import * as h3 from "h3-js";
import geojson2h3 from "geojson2h3";


import HackathonLogo from "../assets/hackathon-web-banner.png";

// import ports_wfp from "../data/ports_wfp.csv";
import ports__ from "../data/ports__.csv";
// import shipping_traj from "../data/shipping_traj.csv";
import shipping_traj from "../data/shipping_traj_2.csv";

import AppLoader from "../AppLoader";
import { movement, setMovement } from "../stores/MovementStore";


let ports : any[] = []
ports__.forEach((e:any) => {
  let h3_5_hexring = 
    geojson2h3.h3SetToMultiPolygonFeature(
      JSON.parse(e.h3_5_hexring.replace(/'/g, '"'))
    );
  ports.push(h3_5_hexring)
})


const RouteRecommendation: Component = () => {

  const optionSelect = createOptions(["apple", "banana", "pear", "pineapple", "kiwi"]);
  
  createEffect( () => {
    setMovement('geometry', 'coordinates', JSON.parse(shipping_traj[29].movements))
  })

  return (
    <>
        <div class="top-32 left-8" style={{ position: 'absolute', 'z-index': 1 }}>
            <Select class="know-ais w-80" {...optionSelect} />
        </div>

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
                "line-color": "hsl(52, 86%, 53%)",
                "line-width": 3,
                },
            }}
            />
        </Source>
        
    </>
  );
};

export default RouteRecommendation;
