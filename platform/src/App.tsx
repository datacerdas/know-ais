import { Component, Suspense } from "solid-js";
import AppRouter from "./AppRouter";
import AppLoader from "./AppLoader";

import { inject } from '@vercel/analytics';

const App = () => {
  inject();
  
  return (
    <Suspense fallback={<AppLoader />}>
        <AppRouter/>
    </Suspense>
  );
};

export default App;

