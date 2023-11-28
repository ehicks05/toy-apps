import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header, Footer } from './layout';
import { Clock, Stopwatch, Timer } from '@/app';

function MyApp() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-sky-950 to-blue-950">
      <Header />
      <div className="flex-grow flex flex-col h-full sm:px-4">
        <Routes>
          <Route path="/" element={<Clock />} />
          <Route path="/clock" element={<Clock />} />
          <Route path="/stopwatch" element={<Stopwatch />} />
          <Route path="/timer" element={<Timer />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default MyApp;
