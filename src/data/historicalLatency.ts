//simulated/mock Latency
// src/data/historicalLatency.ts
export function generateHistoricalLatency(hours: number): number[] {
    const data: number[] = [];
    const now = new Date();
    for (let i = 0; i < hours; i++) {
      // Simulate values between 20ms and 180ms
      data.push(Math.floor(20 + Math.random() * 160));
    }
    return data;
}