import React from 'react';
import GraphCanvas from './components/GraphCanvas';

function App() {
  return (
    <div className="flex h-screen w-screen flex-col">
      <header className="bg-engine-dark border-b border-slate-700 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-engine-accent">Cognitive Session Engine</h1>
        <div className="flex gap-4">
          <button className="bg-slate-800 px-3 py-1 rounded hover:bg-slate-700 transition">Idea Stash</button>
          <button className="bg-engine-accent text-slate-950 px-3 py-1 rounded font-semibold">Freeze Context</button>
        </div>
      </header>
      <main className="flex-1 relative">
        <GraphCanvas />
      </main>
    </div>
  );
}

export default App;
