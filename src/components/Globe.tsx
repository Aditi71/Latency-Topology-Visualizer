import { useEffect, useRef, useState } from 'react';
import {
  Viewer,
  Cartesian3,
  Color,
  Ion,
  VerticalOrigin,
  PolylineGlowMaterialProperty,
  Entity,
} from 'cesium/Cesium';
import 'cesium/Widgets/widgets.css';
import { exchangeServers } from '../data/exchangeServers';
import { cloudRegions } from '../data/cloudRegions';
import { generateMockLatency } from '../data/mockLatency';
import { createWorldImagery } from 'cesium/Cesium';

Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_ION_TOKEN!;

type Filters = {
  exchanges?: string[];
  clouds?: string[];
  latencyRange?: [number, number];
  showRegions?: boolean;
  showLatency?: boolean;
};

export default function Globe({ filters }: { filters?: Filters }) {
  const globeRef = useRef<HTMLDivElement>(null);
  const [viewer, setViewer] = useState<Viewer | null>(null);

  useEffect(() => {
    if (!globeRef.current) return;
    const cesiumViewer = new Viewer(globeRef.current, {
      baseLayerPicker: false,
      geocoder: false,
      animation: false,
      timeline: false,
      homeButton: false,
      fullscreenButton: false,
      imageryProvider: createWorldImagery(),
    });
    setViewer(cesiumViewer);
    return () => cesiumViewer.destroy();
  }, []);

  useEffect(() => {
    if (!viewer || filters?.showLatency === false) return;
    // show lines
    viewer.entities.removeAll();

    const cloudIcons: { [key: string]: string } = {
      AWS: '/icons/aws.png',
      GCP: '/icons/gcp.png',
      Azure: '/icons/azure.png',
    };

    if (filters?.showRegions !== false) {
      cloudRegions.forEach((region) => {
        if (filters?.clouds && !filters.clouds.includes(region.cloud)) return;
        const iconUrl = cloudIcons[region.cloud] || '/icons/default.png';
        viewer.entities.add({
          name: region.name,
          position: Cartesian3.fromDegrees(region.lon, region.lat),
          billboard: {
            image: iconUrl,
            width: 44,
            height: 44,
            verticalOrigin: VerticalOrigin.BOTTOM,
          },
          description: `
            <b>Region:</b> ${region.name}<br/>
            <b>Cloud:</b> ${region.cloud}
          `,
        });
      });
    }

    exchangeServers.forEach((server) => {
      if (filters?.exchanges && !filters.exchanges.includes(server.name)) return;
      viewer.entities.add({
        name: server.name,
        position: Cartesian3.fromDegrees(server.lon, server.lat),
        billboard: {
          image: '/icons/exchange.png',
          width: 38,
          height: 38,
          verticalOrigin: VerticalOrigin.BOTTOM,
        },
        description: `
          <b>Exchange:</b> ${server.name}<br/>
          <b>City:</b> ${server.city}<br/>
          <b>Cloud:</b> ${server.cloud}
        `,
      });
    });
  }, [viewer, filters]);

  useEffect(() => {
    if (!viewer || filters?.showLatency === false) return;

    let latencyData = generateMockLatency(exchangeServers.length, cloudRegions.length);

    const updateLatencyConnections = () => {
      const allEntities = viewer.entities.values;
      for (const entity of allEntities) {
        if (entity.name?.startsWith('latency-')) {
          viewer.entities.remove(entity);
        }
      }

      exchangeServers.forEach((server, i) => {
        if (filters?.exchanges && !filters.exchanges.includes(server.name)) return;
        cloudRegions.forEach((region, j) => {
          if (filters?.clouds && !filters.clouds.includes(region.cloud)) return;

          const latency = latencyData[i][j];

          if (
            filters?.latencyRange &&
            (latency < filters.latencyRange[0] || latency > filters.latencyRange[1])
          )
            return;

          const color =
            latency < 60 ? Color.LIME :
            latency < 130 ? Color.YELLOW :
            Color.RED;

          viewer.entities.add(
            new Entity({
              name: `latency-${server.name}-${region.name}`,
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
            })
          );
        });
      });
    };

    updateLatencyConnections();
    const interval = setInterval(() => {
      latencyData = generateMockLatency(exchangeServers.length, cloudRegions.length);
      updateLatencyConnections();
    }, 5000);

    return () => clearInterval(interval);
  }, [viewer, filters]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        width: '100vw',
        height: '100vh',
      }}
    >
      <div ref={globeRef} style={{ width: '100%', height: '100%' }} />

      {/* Legend */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          padding: '20px 28px',
          borderRadius: '10px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          color: '#fff',
          gap: '1.5rem',
          fontSize: '1.25rem',
          zIndex: 10,
          // transform: scale(1.1)
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <img src="/icons/aws.png" alt="AWS" width={20} height={20} /> AWS
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <img src="/icons/gcp.png" alt="GCP" width={20} height={20} /> GCP
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <img src="/icons/azure.png" alt="Azure" width={20} height={20} /> Azure
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: 'lime' }}>●</span> Low
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: 'yellow' }}>●</span> Medium
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: 'red' }}>●</span> High
        </div>
      </div>
    </div>
  );
}