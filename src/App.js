import React, { Suspense } from 'react';
import _ from 'lodash';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './MuiClassNameSetup';
import hostRoutes from './hostRoutes';
import siteRoutes from 'ExampleRemoteSite/routes';
import productRoutes from 'ExampleRemoteProduct/routes';
import Layout from './components/layout';

const routes = [...siteRoutes, ...productRoutes, ...hostRoutes];

const getRoutes = (routes) => [
  {
    element: <Layout routes={routes} />,
    children: routes
  }
]

function App() {
  return (
    <>
      <Suspense fallback={<div>Ładowanie Routera...</div>}>
        <RouterProvider router={createBrowserRouter(getRoutes(routes))} />
      </Suspense>
    </>
  );
}

export default App;