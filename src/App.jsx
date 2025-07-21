// App.jsx
import React, { useState } from 'react';
import BottomSheet from './components/BottomSheet';

export default function App() {
  const [position, setPosition] = useState('closed');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">React Bottom Sheet</h1>
      <div className="space-x-2">
        <button
          onClick={() => setPosition('open')}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow"
        >
          Open
        </button>
        <button
          onClick={() => setPosition('half')}
          className="px-4 py-2 bg-yellow-500 text-white rounded shadow"
        >
          Half Open
        </button>
        <button
          onClick={() => setPosition('closed')}
          className="px-4 py-2 bg-red-500 text-white rounded shadow"
        >
          Close
        </button>
      </div>
      <BottomSheet position={position} setPosition={setPosition} />
    </div>
  );
}
