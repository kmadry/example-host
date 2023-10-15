import React, { lazy, Suspense, useState } from 'react';
import _ from 'lodash';
import { createBrowserRouter, RouterProvider, Link, Outlet } from 'react-router-dom';
import style from './App.module.css';
import './MuiClassNameSetup';
import localRoutes from './routes';
import remoteRoutes from  'ExampleRemoteSite/routes';

const Header = lazy(() => import('ExampleRemote/Header'));
const Footer = lazy(() => import('ExampleRemote/Footer'));
const Clicker = lazy(() => import('ExampleRemote/Clicker'));

const routes = [...localRoutes, ...remoteRoutes];

const getRoutes = (routes) => [
  {
    element: <Layout routes={routes} />,
    children: routes
  }
]

const RenderRoutes = ({routes, prev = ""}) => routes.map(route => (
  <li key={route.path}>
    <Link to={prev + route.path}>To {prev + route.path}</Link>
    {route.children ? <RenderRoutes routes={route.children} prev={prev + route.path + "/"} /> : null}
  </li>
));


const Layout = ({routes}) => (
  <>
    <RenderRoutes routes={routes}/>
    <hr/>
    <Outlet/>
  </>
);


function App() {
  const [hostState, setHostState] = useState('initial');
  return (
    <div className={style.App}>
      <Suspense fallback={<div>Ładowanie Headera...</div>}>
        <Header />
      </Suspense>
      <p>
        Host App - {hostState} - Lodash v - {_.VERSION}
      </p>
      <hr />
      <Suspense fallback={<div>Ładowanie Routera...</div>}>
        <>
          <RouterProvider router={createBrowserRouter(getRoutes(routes))} />
        </>
      </Suspense>
      <hr />
      <Suspense fallback={<div>Ładowanie Clicker...</div>}>
        <Clicker hostState={hostState} setHostState={setHostState} />
      </Suspense>
      <hr />
      <Suspense fallback={<div>Ładowanie Footera...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;