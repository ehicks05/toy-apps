import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header, Footer } from './layout';
import { Clock, Stopwatch, Timer } from '@/app';
import { BackgroundGradients } from './components';

function MyApp() {
  return (
    <div className="flex flex-col min-h-screen">
      <BackgroundGradients />
      <Header />
      <div className="flex-grow flex flex-col h-full sm:px-4">
        <Routes>
          <Route path="/" element={<Timer />} />
          <Route path="/stopwatch" element={<Stopwatch />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/clock" element={<Clock />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default MyApp;
