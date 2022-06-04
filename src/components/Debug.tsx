import React from 'react';
import { useLocalStorageValue } from '@react-hookz/web';
import { HiOutlineCode } from 'react-icons/hi';

const Debug = ({ state }: { state: any }) => {
  const [debug, setDebug] = useLocalStorageValue('debug', false);

  return (
    <>
      {import.meta.env.DEV && (
        <button
          type="button"
          onClick={() => setDebug((debug) => !debug)}
          className="px-4 py-2 bg-neutral-500 text-xl rounded"
        >
          <HiOutlineCode />
        </button>
      )}
      {debug && (
        <div className="flex p-4 bg-neutral-800 text-xs">
          <pre className="text-xs">{JSON.stringify(state, null, 2)}</pre>
        </div>
      )}
    </>
  );
};

export default Debug;
