import React, { lazy, Suspense } from 'react';
import './App.css';

const Header = lazy(() => import('ExampleRemote/Header'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Ładowanie Headera...</div>}>
        <Header />
      </Suspense>
      Host App
    </div>
  );
}

export default App;
