'use client';
import { useState } from 'react';

export interface PairSelectorProps {
  pairs: string[];
  onPairChange: (pair: string) => void;
  onRangeChange: (range: number) => void;
}

export default function PairSelector({ pairs, onPairChange, onRangeChange }: PairSelectorProps) {
  const [selectedPair, setSelectedPair] = useState(pairs[0]);
  const [selectedRange, setSelectedRange] = useState(24);

  const ranges = [
    { label: '1 Hour', value: 1 },
    { label: '24 Hours', value: 24 },
    { label: '7 Days', value: 168 },
    { label: '30 Days', value: 720 },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 p-4 bg-black text-white rounded-lg shadow-md">
    {/* Dropdown */}
    <select
      value={selectedPair}
      onChange={(e) => {
        setSelectedPair(e.target.value);
        onPairChange(e.target.value);
      }}
      className="border border-gray-600 bg-gray-900 text-white px-5 py-3 text-lg"
    >
      {pairs.map((pair) => (
        <option key={pair} value={pair}>
          {pair}
        </option>
      ))}
    </select>

    {/* Buttons */}
    <div className="flex flex-wrap gap-3">
      {ranges.map((range) => (
        <button
          key={range.value}
          onClick={() => {
            setSelectedRange(range.value);
            onRangeChange(range.value);
          }}
          className={`px-5 py-3 text-lg font-medium transition ${
            selectedRange === range.value
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  </div>
  );
}
