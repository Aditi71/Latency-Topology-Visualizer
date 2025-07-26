'use client';
import React from 'react';
import { Filters } from '@/types/filters';

type ControlPanelProps = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  showChart: boolean;
  setShowChart: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ControlPanel({
  filters,
  setFilters,
  showChart,
  setShowChart,
}: ControlPanelProps) {
  return (
    <div className="absolute top-4 left-4 z-10 bg-white/90 text-black p-4 rounded-xl shadow-lg space-y-4 w-72 backdrop-blur">

      <div className="flex gap-2">
        <button
          onClick={() => setShowChart(false)}
          className={`flex-1 px-4 py-2 rounded-md font-semibold transition ${
            !showChart ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
          }`}
        >
        
        </button>
        <button
          onClick={() => setShowChart(true)}
          className={`flex-1 px-4 py-2 rounded-md font-semibold transition ${
            showChart ? 'bg-green-600 text-white' : 'bg-gray-200 text-black'
          }`}
        >
          📊 Historical Latency
        </button>
      </div>
    </div>
  );
}