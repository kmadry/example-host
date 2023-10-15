
import React, { lazy, Suspense, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import style from './Layout.module.css';

const Header = lazy(() => import('ExampleRemote/Header'));
const Footer = lazy(() => import('ExampleRemote/Footer'));
const Clicker = lazy(() => import('ExampleRemote/Clicker'));
const Profile = lazy(() => import('ExampleRemoteAuth0/Profile'));

const RenderRoutes = ({ routes, prev = "" }) => <ul className={style.list}>
  {routes.map(route => (
    <li key={route.path}>
      <Link to={prev + route.path}>To {route.path}</Link>
      {route.children ? <RenderRoutes routes={route.children} prev={prev + route.path + "/"} /> : null}
    </li>
  ))}
</ul>

const Layout = ({ routes }) => {
  const [hostState, setHostState] = useState('initial');
  return (
    <>
      <Suspense fallback={<div>Ładowanie Headera...</div>}>
        <Header />
      </Suspense>
      <Suspense fallback={<div>Ładowanie Auth0...</div>}>
        <Profile />
      </Suspense>
      <p>
        Host App - {hostState} - Lodash v - {_.VERSION}
      </p>
      <hr />
      <RenderRoutes routes={routes} />
      <hr />
      <Outlet />
      <hr />
      <Suspense fallback={<div>Ładowanie Clicker...</div>}>
        <Clicker hostState={hostState} setHostState={setHostState} />
      </Suspense>
      <hr />
      <Suspense fallback={<div>Ładowanie Footera...</div>}>
        <Link to="/">MAIN - host</Link>
        <Footer />
      </Suspense>
    </>
  )
};

export default Layout;