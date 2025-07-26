'use client';
import { useEffect, useState } from 'react';
import { generateHistoricalLatency } from '@/data/historicalLatency';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

export interface HistoricalLatencyChartProps {
  pair: string;
  timeRange: number;
}

export default function HistoricalLatencyChart({ pair, timeRange }: HistoricalLatencyChartProps) {
  const [latencyData, setLatencyData] = useState<{ time: string; latency: number }[]>([]);

  useEffect(() => {
    const data = generateHistoricalLatency(timeRange).map((value, index) => ({
      time: `${index + 1}h`,
      latency: value,
    }));
    setLatencyData(data);
  }, [pair, timeRange]);

  const values = latencyData.map((d) => d.latency);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);

  return (
    <div className="bg-[#000000] bg-opacity-100 text-white p-4 rounded-lg shadow-lg max-w-5xl mx-auto z-50">
      <h2 className="text-lg font-semibold mb-2">Latency: {pair}</h2>
      <div className="mb-2 text-sm text-gray-300">
        Range: {timeRange} hours — <strong>Min:</strong> {min}ms, <strong>Max:</strong> {max}ms, <strong>Avg:</strong> {avg}ms
      </div>
  
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={latencyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="time" stroke="#ccc" />
          <YAxis domain={[0, 'auto']} stroke="#ccc" />
          <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#000000', color: '#000000' }} />
          <Line type="monotone" dataKey="latency" stroke="#38bdf8" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}