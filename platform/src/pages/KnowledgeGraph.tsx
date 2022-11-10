import { Component, createEffect } from 'solid-js';

import { Network } from 'vis-network';

import neo4j from 'neo4j-driver';

const KnowledgeGraph: Component = () => {
    
  // var nodes = [
  //   { id: 1, label: "Vessel" },
  //   { id: 2, label: "Port" },
  //   { id: 3, label: "Country" },
  //   { id: 4, label: "Trade" },
  //   { id: 5, label: "Poverty" }
  // ];

  // create an array with edges
  // var edges = [
  //   { from: 1, to: 3, label: "sail" },
  //   { from: 1, to: 2 },
  //   { from: 2, to: 3 },
  //   { from: 3, to: 4 },
  //   { from: 3, to: 5 }
  // ];

  var nodes = [
    {id: 1, label: "Ambarli"},
    {id: 2, label: "Braila"},
    {id: 3, label: "Shipping #001"},
    {id: 4, label: "MMSI: 2641"}
  ];

  var edges = [
      {from: 1, to: 3, label: "Origin"},
      {from: 3, to: 2, label: "Destination"},
      {from: 3, to: 4, label: "Of"}
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
      var options = {
        autoResize: true,
        height: '100%',
        width: '100%',
        locale: 'en',
        clickToUse: false,
      }
      
      var network = new Network(container, data, options);
    }
  })

  return (
    <>
      <div class="modal-remark fixed inset-0 overflow-none" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div class="relative inline-block bg-white rounded-lg text-center overflow-hidden shadow-xl align-middle max-w-7xl">

            <div id="kg-visjs" class="bg-transparent w-auto"> </div>
          </div>
          
        </div>
      </div>
      {/* <h1 class="font-extrabold text-2xl"> VIS JS </h1> */}
    </>
  );
};

export default KnowledgeGraph;
