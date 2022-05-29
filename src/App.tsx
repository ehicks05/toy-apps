import React, { useState, useEffect } from 'react';
import _ from 'lodash';

const App = () => {
  const word = 'valor';
  const [guesses, setGuesses] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');


  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className='text-4xl'>Eordle</h1>
      {[...new Array(6)].map(row => 
        <div className='flex gap-4'>
          {[...new Array(5)].map(col => 
          <input maxLength={1} className='w-8 h-8 p-2 bg-slate-600' />)}
          </div>)}
    </div>
  );
};

export default App;
