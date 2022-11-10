import { Component, createEffect, createSignal, For } from "solid-js";
import MapGL, { Viewport, Source, Layer, Control } from "solid-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import geojson2h3 from "geojson2h3";
import * as turf from '@turf/turf';

import HackathonLogo from "../assets/hackathon-web-banner.png";
import RouteRecommendation from "./RouteRecommendation";
import KnowledgeGraph from "./KnowledgeGraph";
import CommunityDetection from "./CommunityDetection";

// @ts-ignore
import ports__ from "../data/ports__.csv";
// @ts-ignore
import countries__ from "../data/country_geojson.csv";
// @ts-ignore
import h3_coverage from "../data/h3_1_int.csv";
import { countries, ports, setCountries, setPorts } from "../stores/NodeStore";

import AppLoader from "../AppLoader";

const Mainboard: Component = () => {
  const [viewport, setViewport] = createSignal({
    center: [-12.677059, 52.543988],
    zoom: 3,
  } as Viewport);
  const [mouseCoords, setMouseCoords] = createSignal({ lat: 0, lng: 0 });  

    var options = {tolerance: 0.01, highQuality: false};
    console.log(JSON.parse(countries__[3].country_geojson) )

    let countryObject: {}[] = []
    countries__.forEach((e:any) => {
        countryObject.push({
            country: e.country,
            iso2: e.iso2,
            // geojson: e.country_geojson,
            geojson: turf.simplify(JSON.parse(e.country_geojson), {tolerance: 0.01, highQuality: false}),
            lat_country: e.Lat,
            lon_country: e.Lon,
            coordinate: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [parseFloat(e.Lon),parseFloat(e.Lat)] ,
                },
            },
        })
    })
    // console.log(countries)

    let portObject: {}[] = []
    ports__.forEach((e:any) => {
        portObject.push({
            port: e.name,
            port_id: e.port_id,
            lat_port: e.lat_port,
            lon_port: e.lon_port,
            coordinate: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [parseFloat(e.lon_port),parseFloat(e.lat_port)] ,
                },
            },
            iso2: e.iso2,
            area: e.area,
            h3_5_hexring: e.h3_5_hexring,
            h3_5_hexring_MultiPolygon: geojson2h3.h3SetToMultiPolygonFeature(JSON.parse(e.h3_5_hexring.replace(/'/g, '"')))
        })
    })

    
    let coveragetObject: {}[] = []
    h3_coverage.forEach((e:any) => {
        coveragetObject.push(geojson2h3.h3ToFeature(e.h3_1))
    })

  createEffect(()=>{
    setCountries('country', countryObject)
    setPorts('port', portObject)
    console.log(countries, ports)
  })

  return (
    <>
        <a href="https://unstats.un.org/bigdata/events/2022/hackathon/" target="_blank">
            <img src={HackathonLogo} style={{ position: 'absolute', 'z-index': 1 }} 
                class="top-3 left-3 h-20" />
        </a>

        <div style={{ position: 'absolute', 'z-index': 1 }} 
                class="top-7 left-36 relative pt-6 lg:pt-8 flex items-center justify-between text-slate-700 font-semibold text-sm leading-6 dark:text-slate-200">
            <div class="flex items-center">
                <div class="hidden md:flex items-center border-l border-slate-200 ml-6 pl-6 dark:border-slate-800">
                    <nav>
                        <ul class="flex items-center space-x-8">
                            <li><a class="hover:text-sky-500 dark:hover:text-sky-400" href="/docs/installation">Route Recommendation</a></li>
                            <li><a href="https://tailwindui.com/?ref=top" class="hover:text-sky-500 dark:hover:text-sky-400">Community Detection</a></li>
                            <li><a class="hover:text-sky-500 dark:hover:text-sky-400" href="/blog">Node Importance</a></li>
                            <li><a class="hover:text-sky-500 dark:hover:text-sky-400" href="/showcase">Knowledge Graph</a>
                            <span class="ml-2 font-medium text-xs leading-5 rounded-full text-sky-600 bg-sky-400/10 px-2 py-0.5 dark:text-sky-400">Soon!</span>
                            </li>
                        </ul>
                    </nav>
                    <div class="flex items-center border-l border-slate-200 ml-6 pl-6 dark:border-slate-800">
                        <a href="https://github.com/datacerdas/know-ais" class="block text-slate-400 hover:text-slate-500 dark:hover:text-sky-400" target="_blank">
                            <span class="sr-only">Know-AIS on GitHub</span>
                            <svg viewBox="0 0 16 16" class="w-5 h-5" fill="currentColor" aria-hidden="true">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>      

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
            <button style={{ position: 'absolute', 'z-index': 1 }} 
                    class="text-white bottom-8 right-3 font-extralight text-xs">
                Lat: {mouseCoords().lat.toFixed(6)}&emsp;Lon: {mouseCoords().lng.toFixed(6)}
            </button>
            
            {/* <div style={{ position: 'absolute', 'z-index': 1 }} 
                class="flex items-center justify-center">
                <KnowledgeGraph />
            </div> */}

            {/* <RouteRecommendation /> */}
            <CommunityDetection />

            <For each={coveragetObject}  fallback={<AppLoader />}>
                  {(item: any) => (     
                    <>
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
                                // "fill-color": "rgb("+`${item.cluster+22}`+","+`${item.cluster}`+","+`${item.cluster*42/3}`+")",
                                // "fill-color": "hsl("+`${item.cluster/2}`+", 90%, 50%)",
                                "fill-color": "#000",
                                "fill-opacity": 0.4
                                // https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/
                            },
                            }}
                        />
                      </Source>
                    </>     
                  )
                  }
              </For>

        </MapGL>
    </>
  );
};

export default Mainboard;
