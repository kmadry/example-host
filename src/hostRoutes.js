import React, {lazy} from 'react';

const Info = lazy(() => import('./components/info'));
const Contact = lazy(() => import('./components/contact'));

const routes = [
  {
    path: '/info',
    element: <Info />
  },
  {
    path: '/contact',
    element: <Contact />
  }
];

export default routes;