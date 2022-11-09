import { Component, lazy } from "solid-js";
import { Routes, Route } from "solid-app-router";
import Mainboard from "./pages/Mainboard";


const KnowledgeGraph = lazy(() => import("./pages/KnowledgeGraph"));
const Map = lazy(() => import("./pages/Map"));

export default function AppRouter() {
  return (
    <Routes>
        <Route path="" >
            <Route path="/" element={<Mainboard />} />
            <Route path="/kg" element={<KnowledgeGraph />} />
            {/* <Route path="/soap" element={<Soap />} /> */}

            {/* <Route path="/form" element={<Form />} /> */}
            {/* <Route path="/:surveyTag" element={<Onboarding />} /> */}
            {/* <Route path="/:surveyTag/form" element={<Form />} /> */}
        </Route>
    </Routes>
  );
}


