import { Component, createEffect, onMount } from 'solid-js';
import toast from 'solid-toast';

// onMount(() =>{
//     toast.custom(() => (
//         <div style={{ position: 'absolute', 'z-index': 10 }} >
//           <h1>Custom Toast</h1>
//           <p>This is a custom toast!</p>
//         </div>
//       ));
// })

const KGBloom: Component<{
    sectionPage?: string;
    setSectionPage?: (value: any) => void;
}> = (props) => {

  createEffect(() => {
  })

  return (
    <>
      <div class="modal-remark fixed inset-0 overflow-none" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={e => props.setSectionPage?.('route')}></div>

          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div class="relative inline-block bg-white rounded-lg text-center overflow-hidden shadow-xl align-middle max-w-7xl">

            <div class="p-4 text-left">User: neo4j<br />Password: zi4aMWJEMlxLDE2h6IqcwdCIOKBnI-5wJ8gwrzkDzFs</div>

            <div id="kg-visjs" >             
                <iframe 
                    width="1280"
                    height="580"
                    src="https://bloom.neo4j.io/index.html?connectURL=neo4j%2Bs%3A%2F%2F101537b0.databases.neo4j.io&_ga=2.92822168.4616645.1667972888-2146945464.1667447232"
                ></iframe>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default KGBloom;