import React, { lazy, Suspense, useState } from 'react';
import './App.css';
const Header = lazy(() => import('ExampleRemote/Header'));
const Footer = lazy(() => import('ExampleRemote/Footer'));
const Clicker = lazy(() => import('ExampleRemote/Clicker'));

function App() {
  const [hostState, setHostState] = useState('initial');
  return (
    <div className="App">
      <Suspense fallback={<div>Ładowanie Headera...</div>}>
        <Header />
      </Suspense>
      <p>
        Host App - {hostState}
      </p>
      <Suspense fallback={<div>Ładowanie Clicker...</div>}>
        <Clicker hostState={hostState} setHostState={setHostState} />
      </Suspense>
      <Suspense fallback={<div>Ładowanie Footera...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;