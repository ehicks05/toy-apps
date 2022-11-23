import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header, Footer } from './components';
import { Home } from './app/index';

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-tr from-violet-900 to-gray-900 text-gray-50">
      <Header />
      <div className="flex h-full flex-grow flex-col p-4 pt-0">
        <Routes>
          <Route element={<Home />} path={'/'} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
