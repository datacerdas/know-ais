import { Component, createEffect, createSignal, For, onMount } from 'solid-js';

const [thead, setThead ] = createSignal([])
const [tbody, setTbody] = createSignal([]);


const NodeImportance: Component<{
    sectionPage?: string;
    setSectionPage?: (value: any) => void;
}> = (props) => {
    
  return (
    <>  
    <div class="modal-remark fixed inset-0 overflow-none" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={e => props.setSectionPage?.('route')}></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="relative inline-block bg-white rounded-lg text-center overflow-hidden shadow-xl align-middle w-7xl">
              
            <iframe frameborder="0" allowtransparency="true" allowfullscreen="true" 
                title="Data Visualization" marginheight="0" marginwidth="0" scrolling="yes" 
                style="display: block; width: 1280px; height: 575px; visibility: visible;" 
                //   src="https://public.tableau.com/views/TenagaKerjaBoard/TenagaKerjaPariwisata?:embed=y&amp;:showVizHome=n&amp;:tabs=n&amp;:toolbar=n&amp;:device=mobile&amp;showAppBanner=false&amp;:apiID=host0#navType=0&amp;navSrc=Parse">
                    src="https://public.tableau.com/views/know-ais/Country_PageRank?:embed=y&amp;:showVizHome=n&amp;:tabs=n&amp;:toolbar=n&amp;:device=mobile&amp;showAppBanner=false&amp;:apiID=host0#navType=0&amp;navSrc=Parse">
            </iframe>
        </div>
        
      </div>
    </div>
    </>
  );
};

export default NodeImportance;