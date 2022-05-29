import React, { useState, useEffect } from 'react';
import _ from 'lodash';

const App = () => {
  const word = 'valor';
  const [guesses, setGuesses] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');


  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <h1 className='text-4xl mb-4'>Eordle</h1>
      {[...new Array(6)].map(row => 
        <div className='flex gap-2'>
          {[...new Array(5)].map(col => 
          <input maxLength={1} className='w-10 h-10 text-center bg-neutral-900 border border-neutral-500 rounded' />)}
          </div>)}
    </div>
  );
};

export default App;
