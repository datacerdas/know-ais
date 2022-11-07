import { render } from "solid-js/web";
import { Component, createSignal } from "solid-js";
import MapGL, { Viewport, Source, Layer } from "solid-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import * as h3 from "h3-js";
import geojson2h3 from "geojson2h3";

import Papa from 'papaparse'
import port_wsl from "../data/port_wsl.csv"

// const port_wsl = Papa.parse(datacsv[0]);
// console.log(port_wsl[1].h3_5_hexring)

const DATA = {
  type: "Feature",
  geometry: {
    type: "LineString",
    coordinates: [
      [36.21824109074759, 43.93089294433594],
      [36.15838983302817, 43.93226623535156],
      [36.115690180653395, 43.97346496582031],
      [36.097938036628065, 44.03800964355469],
      [36.12068224829002, 44.11491394042969],
      [36.157281045104284, 44.15748596191406],
      [36.20882309283712, 44.16435241699218],
      [36.24316561280259, 44.147186279296875],
      [36.27860013544234, 44.09156799316406],
      [36.29963177650553, 44.0167236328125],
      [36.27361812705447, 43.9727783203125],
      [36.24427318493909, 43.98582458496094],
      [36.22599623781621, 43.97209167480469],
      [36.212701229262045, 43.95149230957031],
      [36.21824109074759, 43.93089294433594],
    ],
  },
};

// const kRing = h3.kRing(index, 3);
// const poly = h3.polyfill(
//   [
//     [
//       [36.21824109074759, 43.93089294433594],
//       [36.15838983302817, 43.93226623535156],
//       [36.115690180653395, 43.97346496582031],
//       [36.097938036628065, 44.03800964355469],
//       [36.12068224829002, 44.11491394042969],
//       [36.157281045104284, 44.15748596191406],
//       [36.20882309283712, 44.16435241699218],
//       [36.24316561280259, 44.147186279296875],
//       [36.27860013544234, 44.09156799316406],
//       [36.29963177650553, 44.0167236328125],
//       [36.27361812705447, 43.9727783203125],
//       [36.24427318493909, 43.98582458496094],
//       [36.22599623781621, 43.97209167480469],
//       [36.212701229262045, 43.95149230957031],
//       [36.21824109074759, 43.93089294433594],
//     ],
//   ],
//   8
// );
// // const cor = h3.h3SetToMultiPolygon(poly, true);
// const polyfi = geojson2h3.h3SetToFeatureCollection(poly);
// // console.log(DATA, 'ada', polyfi, 'sazda');

const polygon = {
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-122.47485823276713, 37.85878356045377],
        [-122.47504834087829, 37.86196795698972],
        [-122.47845104316997, 37.86010614563313],
        [-122.47485823276713, 37.85878356045377],
      ],
    ],
  },
};

const hexagons = geojson2h3.featureToH3Set(polygon, 10);
// -> ['8a2830855047fff', '8a2830855077fff', '8a283085505ffff', '8a283085506ffff']
// console.log(hexagons)
// console.log('______________________')
// console.log(JSON.parse(port_wsl[1].h3_5_hexring.replace(/'/g, '"')))

;
// const hexagons2 = port_wsl[1].h3_5_hexring

// const feature = geojson2h3.h3SetToFeature(hexagons);
const feature = geojson2h3.h3SetToMultiPolygonFeature(JSON.parse(port_wsl[20].h3_5_hexring.replace(/'/g, '"')));
// -> {type: 'Feature', properties: {}, geometry: {type: 'Polygon', coordinates: [...]}}

const Map: Component = () => {
  const [viewport, setViewport] = createSignal({
    center: [-151.75039, 59.5983 ],
    zoom: 8,
  } as Viewport);
  const [mouseCoords, setMouseCoords] = createSignal({ lat: 0, lng: 0 });

  return (
    <MapGL
      options={{
        style: "mb:dark",
      }}
      viewport={viewport()}
      onViewportChange={(evt: Viewport) => setViewport(evt)}
      onMouseMove={(evt: any) => setMouseCoords(evt.lngLat)}
    >
      <div >
        Lat: {mouseCoords().lat.toFixed(4)} Lng: {mouseCoords().lng.toFixed(4)}
      </div>
      <Source
        source={{
          type: "geojson",
          data: feature,
        }}
      >
        <Layer
          style={{
            type: "line",
            paint: {
              "line-color": "hsl(100, 100%, 50%)",
              "line-width": 3,
            },
          }}
        />
      </Source>
    </MapGL>
  );
};

export default Map;
