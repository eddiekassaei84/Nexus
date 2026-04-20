import React, { useEffect, useRef, useState, useCallback } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface MapProject {
  id: string;
  name: string;
  projectNumber: string;
  account: string;
  status?: string;
  thumbnail: string;
  integrations: ('autodesk' | 'inertia')[];
  coordinates: [number, number];
}

// ── Status colour lookup ─────────────────────────────────────────────────────
const STATUS_COLOR: Record<string, { bg: string; text: string }> = {
  Updated: { bg: '#52C41A', text: '#fff' },
  'Requires Update': { bg: '#FAAD14', text: '#fff' },
  Disconnected: { bg: '#EF4444', text: '#fff' },
};

// ── Custom orange Leaflet marker ─────────────────────────────────────────────
function createMarkerIcon(status?: string, active?: boolean) {
  const fill = status ? (STATUS_COLOR[status]?.bg ?? '#FF4D00') : '#8C8C8C';
  const scale = active ? 1.25 : 1;
  const html = `
    <div style="
      display:flex; flex-direction:column; align-items:center;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.28));
      transform: scale(${scale});
      transform-origin: bottom center;
      transition: transform 0.15s ease;
    ">
      <div style="
        width:32px; height:32px; border-radius:50%;
        background:${fill}; border:3px solid #fff;
        display:flex; align-items:center; justify-content:center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.22);
      ">
        <svg width="13" height="16" viewBox="0 0 13 16" fill="none">
          <path d="M6.5 0C2.91 0 0 2.91 0 6.5C0 11.375 6.5 16 6.5 16C6.5 16 13 11.375 13 6.5C13 2.91 10.09 0 6.5 0ZM6.5 8.75C5.26 8.75 4.25 7.74 4.25 6.5C4.25 5.26 5.26 4.25 6.5 4.25C7.74 4.25 8.75 5.26 8.75 6.5C8.75 7.74 7.74 8.75 6.5 8.75Z" fill="white"/>
        </svg>
      </div>
      <div style="
        width:2px; height:8px;
        background:${fill};
        border-radius:0 0 2px 2px;
      "></div>
    </div>
  `;
  return L.divIcon({
    html,
    className: '',
    iconSize: [32, 44],
    iconAnchor: [16, 44],
  });
}

// ── React project card popup ─────────────────────────────────────────────────
interface ProjectCardPopupProps {
  project: MapProject;
  position: { x: number; y: number };
  containerWidth: number;
  containerHeight: number;
  onOpen: (id: string) => void;
  onClose: () => void;
}

function ProjectCardPopup({
  project,
  position,
  containerWidth,
  containerHeight,
  onOpen,
  onClose,
}: ProjectCardPopupProps) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const CARD_W = 248;
  const CARD_H = 210; // approx height
  const GAP = 12; // gap above pin head

  // Animate in on mount
  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  // Position card centred above the marker, clamped inside container
  let left = position.x - CARD_W / 2;
  let top = position.y - CARD_H - GAP;

  // Clamp horizontally
  left = Math.max(8, Math.min(left, containerWidth - CARD_W - 8));
  // If card would go off top, flip below marker
  if (top < 8) {
    top = position.y + 52 + GAP; // below pin
  }
  // Clamp vertically
  top = Math.max(8, Math.min(top, containerHeight - CARD_H - 8));

  const statusStyle = project.status ? STATUS_COLOR[project.status] : null;

  return (
    <>
      {/* Click-away backdrop (transparent) */}
      <div
        style={{ position: 'absolute', inset: 0, zIndex: 900 }}
        onClick={onClose}
      />

      {/* Card */}
      <div
        style={{
          position: 'absolute',
          left,
          top,
          width: CARD_W,
          zIndex: 901,
          borderRadius: 10,
          overflow: 'hidden',
          background: '#fff',
          boxShadow: hovered
            ? '0 16px 40px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.12)'
            : '0 8px 24px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.10)',
          border: '1px solid #E0E4E8',
          cursor: 'pointer',
          transform: visible
            ? hovered
              ? 'translateY(-4px) scale(1.025)'
              : 'translateY(0px) scale(1)'
            : 'translateY(8px) scale(0.97)',
          opacity: visible ? 1 : 0,
          transition:
            'transform 0.22s cubic-bezier(0.34,1.56,0.64,1), opacity 0.18s ease, box-shadow 0.18s ease',
          fontFamily: 'Open Sans, sans-serif',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          onOpen(project.id);
        }}
      >
        {/* Thumbnail */}
        <div style={{ position: 'relative', width: '100%', height: 128, background: '#c4c4c4', overflow: 'hidden' }}>
          <img
            src={project.thumbnail}
            alt={project.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* Status badge */}
          {statusStyle && (
            <div style={{ position: 'absolute', top: 8, left: 8 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '2px 8px', borderRadius: 9999,
                background: statusStyle.bg, color: statusStyle.text,
                fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500,
                whiteSpace: 'nowrap', lineHeight: '16px',
              }}>
                {project.status}
              </span>
            </div>
          )}
          {/* Close button */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            style={{
              position: 'absolute', top: 8, right: 8,
              width: 24, height: 24, borderRadius: '50%',
              background: 'rgba(0,0,0,0.45)', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#fff', fontSize: 14, lineHeight: 1,
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.7)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.45)'; }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '12px 14px 14px' }}>
          <div style={{
            fontSize: 14, fontWeight: 600, color: '#1D2C38',
            lineHeight: '20px', marginBottom: 4,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {project.name}
          </div>
          <div style={{ fontSize: 12, color: '#616D79', marginBottom: 2, lineHeight: '16px' }}>
            {project.projectNumber}
          </div>
          <div style={{ fontSize: 12, color: '#616D79', lineHeight: '16px', marginBottom: 12 }}>
            {project.account}
          </div>

          {/* Open project CTA */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500,
              color: hovered ? '#FF773E' : '#FF4D00',
              transition: 'color 0.15s',
            }}>
              Open project
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke={hovered ? '#FF773E' : '#FF4D00'}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transition: 'stroke 0.15s' }}
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
interface ProjectsMapViewProps {
  projects: MapProject[];
  onOpen: (id: string) => void;
}

export function ProjectsMapView({ projects, onOpen }: ProjectsMapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapWrapRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const [selectedProject, setSelectedProject] = useState<MapProject | null>(null);
  const [popupPos, setPopupPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ w: 800, h: 600 });

  // Track container size for clamping
  useEffect(() => {
    if (!mapWrapRef.current) return;
    const obs = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setContainerSize({ w: width, h: height });
    });
    obs.observe(mapWrapRef.current);
    return () => obs.disconnect();
  }, []);

  const openCard = useCallback((project: MapProject, marker: L.Marker) => {
    const map = mapRef.current;
    if (!map) return;
    const pt = map.latLngToContainerPoint(marker.getLatLng());
    setPopupPos({ x: pt.x, y: pt.y });
    setSelectedProject(project);
  }, []);

  const closeCard = useCallback(() => {
    setSelectedProject(null);
  }, []);

  // Rebuild markers helper
  const buildMarkers = useCallback((map: L.Map, projectList: MapProject[]) => {
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    projectList.forEach(project => {
      const icon = createMarkerIcon(project.status, false);
      const marker = L.marker(project.coordinates, { icon }).addTo(map);

      marker.on('click', (e: L.LeafletMouseEvent) => {
        L.DomEvent.stopPropagation(e);
        openCard(project, marker);
      });

      (marker as any)._projectId = project.id;
      markersRef.current.push(marker);
    });
  }, [openCard]);

  // Map init
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const lats = projects.map(p => p.coordinates[0]);
    const lngs = projects.map(p => p.coordinates[1]);
    const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
    const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;

    const map = L.map(containerRef.current, {
      center: [centerLat, centerLng],
      zoom: 4,
      zoomControl: false,
    });
    mapRef.current = map;

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }
    ).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Close card on map click
    map.on('click', () => closeCard());

    buildMarkers(map, projects);

    if (projects.length > 0) {
      const bounds = L.latLngBounds(projects.map(p => p.coordinates));
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 8 });
    }

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update markers when projects change (filter)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    buildMarkers(map, projects);
    closeCard();
  }, [projects, buildMarkers, closeCard]);

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', padding: 12 }}>
      <div
        ref={mapWrapRef}
        style={{
          flex: 1,
          minHeight: 0,
          borderRadius: 8,
          overflow: 'hidden',
          border: '1px solid #e5e7eb',
          background: '#fafafa',
          position: 'relative',
        }}
      >
        <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

        {/* React-rendered project card popup */}
        {selectedProject && (
          <ProjectCardPopup
            project={selectedProject}
            position={popupPos}
            containerWidth={containerSize.w}
            containerHeight={containerSize.h}
            onOpen={(id) => { closeCard(); onOpen(id); }}
            onClose={closeCard}
          />
        )}
      </div>

      {/* Leaflet + zoom control overrides */}
      <style>{`
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.16) !important;
          border-radius: 6px !important;
          overflow: hidden;
        }
        .leaflet-control-zoom a {
          width: 32px !important;
          height: 32px !important;
          line-height: 32px !important;
          font-size: 16px !important;
          color: #384857 !important;
          background: white !important;
          border: none !important;
          border-bottom: 1px solid #f0f0f0 !important;
          font-family: 'Open Sans', sans-serif !important;
        }
        .leaflet-control-zoom a:last-child {
          border-bottom: none !important;
        }
        .leaflet-control-zoom a:hover {
          background: #f5f5f5 !important;
          color: #243746 !important;
        }
        .leaflet-control-attribution {
          font-family: 'Open Sans', sans-serif;
          font-size: 10px;
          color: #8C8C8C;
          background: rgba(255,255,255,0.85) !important;
        }
        .leaflet-marker-icon:hover {
          filter: brightness(1.1) drop-shadow(0 3px 8px rgba(0,0,0,0.32)) !important;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

// ── Project coordinates lookup ───────────────────────────────────────────────
export const PROJECT_COORDINATES: Record<string, [number, number]> = {
  'cleveland-hospital':       [41.4993, -81.6944],
  'inertia-demo':             [40.7128, -74.0060],
  'westfield-tower':          [37.7749, -122.4194],
  'harbor-bridge':            [-33.8688, 151.2093],
  'metro-station':            [41.8781, -87.6298],
  'sunridge-residential':     [33.4484, -112.0740],
  'lakeview-plaza':           [51.5074, -0.1278],
  'northgate-campus':         [47.6062, -122.3321],
  'riverside-park':           [45.5051, -122.6750],
  'central-library':          [42.3601, -71.0589],
  'pearson-airport':          [43.6777, -79.6248],
  'downtown-transit':         [49.2827, -123.1207],
  'bayfront-hotel':           [25.7617, -80.1918],
  'innovation-hub':           [30.2672, -97.7431],
  'southpark-school':         [29.7604, -95.3698],
  'greenfield-wastewater':    [39.7392, -104.9903],
  'harbour-walk':             [-27.4698, 153.0251],
  'tech-campus':              [37.3382, -121.8863],
  'oakridge-hospital':        [34.0522, -118.2437],
  'diamond-tower':            [36.1699, -115.1398],
  'grand-arena':              [32.7767, -96.7970],
  'westbrook-park':           [44.9778, -93.2650],
};
