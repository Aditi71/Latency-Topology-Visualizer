'use client';
import { useEffect } from 'react';
import {
  Cartesian3,
  Color,
  PolylineGlowMaterialProperty,
  CallbackProperty,
  Entity,
} from 'cesium/Cesium';
import { exchangeServers } from '../data/exchangeServers';
import { cloudRegions } from '../data/cloudRegions';
import { generateMockLatency } from '../data/mockLatency';
import { Viewer } from 'cesium/Cesium'; // ✅ Import Viewer

interface LatencyLayerProps {
  viewer: Viewer; // Use the imported type directly
}

export default function LatencyLayer({ viewer }: LatencyLayerProps) {
  useEffect(() => {
    let latencyData = generateMockLatency(exchangeServers.length, cloudRegions.length);

    const updateLines = () => {
      viewer.entities.removeAll(); // Remove old
      exchangeServers.forEach((server, i) => {
        cloudRegions.forEach((region, j) => {
          const latency = latencyData[i][j];
          const color =
            latency < 60 ? Color.LIME :
            latency < 130 ? Color.YELLOW :
            Color.RED;

          viewer.entities.add(new Entity({
            polyline: {
              positions: Cartesian3.fromDegreesArray([
                server.lon, server.lat,
                region.lon, region.lat,
              ]),
              width: 4,
              material: new PolylineGlowMaterialProperty({
                glowPower: 0.2,
                color,
              }),
            },
            description: `Latency: ${latency} ms`,
          }));
        });
      });
    };

    updateLines();
    const interval = setInterval(() => {
      latencyData = generateMockLatency(exchangeServers.length, cloudRegions.length);
      updateLines();
    }, 5000);

    return () => clearInterval(interval);
  }, [viewer]);

  return null;
}