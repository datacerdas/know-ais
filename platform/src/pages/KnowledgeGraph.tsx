import { Component, createEffect } from 'solid-js';

import { Network } from 'vis-network';

import neo4j from 'neo4j-driver';

const KnowledgeGraph: Component = () => {

  
  var nodes = [
    { id: 1, label: "Vessel" },
    { id: 2, label: "Port" },
    { id: 3, label: "Country" },
    { id: 4, label: "Trade" },
    { id: 5, label: "Poverty" }
  ];

  // create an array with edges
  var edges = [
    { from: 1, to: 3, label: "sail" },
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 3, to: 5 }
  ];

  // create a network

  createEffect(() => {
    // var container = document.querySelector("#kg-visjs");
    var container = document.getElementById("kg-visjs");
    if(container){
      
      var data = {
        nodes: nodes,
        edges: edges,
      };
      var options = {};
      var network = new Network(container, data, options);
    }
  })

  return (
    <div>
      <div id="kg-visjs" class="h-screen"></div>
      {/* <h1 class="font-extrabold text-2xl"> VIS JS </h1> */}
    </div>
  );
};

export default KnowledgeGraph;
