'use client';
import './globals.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import PairSelector from '@/components/PairSelector';
import HistoricalLatencyChart from '@/components/HistoricalLatencyChart';
import { exchangeServers } from '@/data/exchangeServers';
import ControlPanel from '@/components/ControlPanel';
import { Filters } from '@/types/filters';

const Globe = dynamic(() => import('@/components/Globe'), { ssr: false });

export default function HomePage() {
  const [showChart, setShowChart] = useState(false);
  const [selectedPair, setSelectedPair] = useState(
    `${exchangeServers[0].name} - ${exchangeServers[1].name}`
  );
  const [timeRange, setTimeRange] = useState(24);

  const [filters, setFilters] = useState<Filters>({
    exchange: '',
    cloud: '',
    latency: 0,
    showRegions: true,
    showLatency: true,
  });

  const pairs = exchangeServers.flatMap((a, i) =>
    exchangeServers.slice(i + 1).map((b) => `${a.name} - ${b.name}`)
  );

  return (
    <div className="relative w-screen h-screen">
      {/* 🌍 Globe */}
      <div className="absolute inset-0 z-0">
        <Globe filters={{ ...filters, showLatency: !showChart }} />
      </div>

      {/* 🎛️ Filters */}
      <ControlPanel
        filters={filters}
        setFilters={setFilters}
        showChart={showChart}
        setShowChart={setShowChart}
      />

      {/* 📘 Show Button */}
      {/* {!showChart && (
        <button
          onClick={() => setShowChart(true)}
          className={`flex-1 px-4 py-2 rounded-md font-semibold transition ${
            showChart ? 'bg-green-600 text-white' : 'bg-gray-200 text-black'
          }`}
        >
          Show Historical Latency
        </button>
      )} */}

      {/* 📊 Chart Panel */}
      {showChart && (
        <div className="absolute inset-0 z-50 flex justify-center items-start pt-10 bg-black/90 width-100%">
          <div className="bg-black/100 relative w-screen max-w-25xl rounded-xl shadow-2xl border-none p-6 text-white">
            {/* ❌ Close Button */}
            <button
              onClick={() => setShowChart(false)}
              className="absolute top-4 right-0 bg-gray-700 hover:bg-gray-600 text-white w-10 h-10 rounded-full text-xl flex items-center justify-center shadow"
            >
              ❌ 
            </button>

            {/* 🔧 Title */}
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 justify-center">
              <span role="img">📊</span> Historical Latency
            </h2>

            {/* 🔍 Selector */}
            <PairSelector
              pairs={pairs}
              onPairChange={setSelectedPair}
              onRangeChange={setTimeRange}
            />

            {/* 📈 Chart */}
            <div className=" border border-gray-600 p-4 rounded-md">
              <HistoricalLatencyChart pair={selectedPair} timeRange={timeRange} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}