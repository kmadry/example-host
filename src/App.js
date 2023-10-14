import React, { lazy, Suspense } from 'react';
import './App.css';
const Header = lazy(() => import('ExampleRemote/Header'));
const Footer = lazy(() => import('ExampleRemote/Footer'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Ładowanie Headera...</div>}>
        <Header />
      </Suspense>
      <p>
        Host App
      </p>
      <Suspense fallback={<div>Ładowanie Footera...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;