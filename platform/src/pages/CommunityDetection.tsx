import { Component, createEffect, createSignal, For, Show } from "solid-js";
import MapGL, { Viewport, Source, Layer, Control } from "solid-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { Select, createOptions } from "@thisbeyond/solid-select";
import "@thisbeyond/solid-select/style.css";

import * as h3 from "h3-js";
import geojson2h3 from "geojson2h3";
import simplify from "simplify-js";

import country_louvain from "../data/cluster/country_community_detection_louvain.csv";
// import countries___ from "../data/countries.geojson";

import port_louvain from "../data/cluster/port_community_detection_louvain.csv";

import AppLoader from "../AppLoader";
import { coordinatePoint, setCoordinatePoint } from "../stores/GeoStore";
import { createStore } from "solid-js/store";
import { community, countryCommunity, portCommunity, setCommunity, setCountryCommunity, setPortCommunity } from "../stores/CommunityStore";
import { countries, ports } from "../stores/NodeStore";


const CommunityDetection: Component = () => {
  

  let portCommunityObject: {}[] = []
  port_louvain.forEach((e:any) => {
    let portIndex = ports.port.findIndex(obj => obj.port_id == e.id)
    if(portIndex !== -1){
      let port = ports.port[portIndex];
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
        h3_5_hexring_MultiPolygon: port.h3_5_hexring_MultiPolygon
      })
    }
  })
  
  let countryCommunityObject: {}[] = []
  country_louvain.forEach((e:any) => {
    let countryIndex = countries.country.findIndex(obj => obj.iso2 == e.code)
    if(countryIndex !== -1){
      let country = countries.country[countryIndex];
      countryCommunityObject.push({
        id: e.code,
        name: e.country,
        cluster: parseInt(e.communityId),
        country: country.country,
        iso2: country.iso2,
        geojson: country.geojson,
        lat_country: country.lat_country,
        lon_country: country.lon_country,
        coordinate: country.coordinate
      })
    }
  })

  const optionSelect = createOptions(["apple", "banana", "pear", "pineapple", "kiwi"]);

  createEffect( () => {
    setPortCommunity('community', portCommunityObject)
    setCountryCommunity('community', countryCommunityObject)
    // setCountryGeo('geojson',JSON.parse(JSON.stringify(countries)))
    // console.log(countryGeo);
    // setCountryGeo(JSON.parse(countries__[7].country_geojson))
    // setCoord(coord_array)
    // setCoordinatePoint('geometry', 'coordinates', coord_array)
    // console.log(coordinatePoint, 'a4w')
    // setMovement('geometry', 'coordinates', JSON.parse(shipping_traj[29].movements))
  })

  return (
    <>
    
            <div class="top-32 left-8" style={{ position: 'absolute', 'z-index': 1 }}>
                <Select class="know-ais w-80" {...optionSelect} />
            </div>           

            {/* <For each={countries} fallback={<AppLoader />}>
                {(item: any) => (          
                    <Source
                    source={{
                        type: "geojson",
                        data: item,
                    }}
                    >
                    <Layer
                        style={{
                          type: "circle",
                          paint: {
                            "circle-color": "#00ffff",
                            "circle-radius" : 12
                          },
                        }}
                    />
                    </Source>
                )
                }
            </For> */}
            
            {/* <Show when={portCommunity.community.length > 0}> */}
              {/* <For each={portCommunity.community}  fallback={<AppLoader />}>
                  {(item: any) => (     
                    <>
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
                                "fill-color": "rgb("+`${item.cluster+22}`+","+`${item.cluster}`+","+`${item.cluster*42/3}`+")",
                                // "fill-color": "hsl("+`${item.cluster/2}`+", 90%, 50%)",
                                // "fill-color": "#00ffff",
                                "fill-opacity": 0.8
                                // https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/
                            },
                            }}
                        />
                      </Source>
                    </>     
                  )
                  }
              </For> */}
            {/* </Show> */}

            
            {/* <Show when={portCommunity.community.length > 0}> */}
              <For each={countryCommunity.community}  fallback={<AppLoader />}>
                  {(item: any) => (     
                    <>
                    {/* {console.log(item.coordinate, 'sd')} */}
                      <Source
                        source={{
                            type: "geojson",
                            data: item.geojson,
                        }}
                      >
                        <Layer
                            style={{
                            type: "fill",
                            paint: {
                                "fill-color": "rgb("+`${item.cluster+22}`+","+`${item.cluster}`+","+`${item.cluster*42/3}`+")",
                                // "fill-color": "hsl("+`${item.cluster/2}`+", 90%, 50%)",
                                // "fill-color": "#00ffff",
                                "fill-opacity": 0.90
                                // https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/
                            },
                            }}
                        />
                      </Source>
                    </>     
                  )
                  }
              </For>
            {/* </Show> */}

            {/* <Source
                source={{
                    type: "geojson",
                    data:  coordinatePoint,
                }}
            >
                <Layer
                style={{
                    type: "circle",
                    paint: {
                      "circle-color": "#00ffff",
                      "circle-radius" : 29
                    },
                }}
                />
            </Source> */}
            
    </>
  );
};

export default CommunityDetection;
