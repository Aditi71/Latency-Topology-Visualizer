// pages/api/historical-latency.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const mockData = Array.from({ length: 10 }, (_, i) => ({
    time: `T-${10 - i}`,
    latency: Math.floor(Math.random() * 200),
  }));

  res.status(200).json(mockData);
}
