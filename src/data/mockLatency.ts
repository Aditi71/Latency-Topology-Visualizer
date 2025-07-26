// src/data/mockLatency.ts
export function generateMockLatency(serverCount: number, regionCount: number) {
    const data: number[][] = [];
    for (let i = 0; i < serverCount; i++) {
      const row: number[] = [];
      for (let j = 0; j < regionCount; j++) {
        // Simulate latency between 10ms - 200ms
        row.push(Math.floor(Math.random() * 190 + 10));
      }
      data.push(row);
    }
    return data;
  }