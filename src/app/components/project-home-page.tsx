import React, { useEffect, useState } from 'react';
import svgInfoPaths from '../../imports/svg-xnv9n830gq';
import svgWafflePaths from '../../imports/svg-4n56u6vlml';

// ─── Open-Meteo — no API key needed ──────────────────────────────────────────
// Project location: Cleveland, Ohio (from General Information defaults)
const LAT = 41.5036;
const LON = -81.62;
const TIMEZONE = 'America%2FNew_York';
const LOCATION_LABEL = 'Cleveland, OH';

// ─── WMO weather code → description + emoji ──────────────────────────────────
function wmoDescription(code: number): { label: string; icon: string } {
  if (code === 0) return { label: 'Clear Sky', icon: '☀️' };
  if (code === 1) return { label: 'Mainly Clear', icon: '🌤️' };
  if (code === 2) return { label: 'Partly Cloudy', icon: '⛅' };
  if (code === 3) return { label: 'Overcast', icon: '☁️' };
  if (code <= 49) return { label: 'Foggy', icon: '🌫️' };
  if (code <= 59) return { label: 'Drizzle', icon: '🌦️' };
  if (code <= 69) return { label: 'Rain', icon: '🌧️' };
  if (code <= 79) return { label: 'Snow', icon: '❄️' };
  if (code <= 82) return { label: 'Rain Showers', icon: '🌦️' };
  if (code <= 86) return { label: 'Snow Showers', icon: '🌨️' };
  if (code <= 99) return { label: 'Thunderstorm', icon: '⛈️' };
  return { label: 'Unknown', icon: '🌡️' };
}

function cToF(c: number) { return Math.round((c * 9) / 5 + 32); }

const SHORT_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// ─── Types ────────────────────────────────────────────────────────────────────
interface CurrentWeather {
  temp: number;       // °C
  windspeed: number;  // km/h
  code: number;
  isDay: number;
  humidity: number;   // %
  feelsLike: number;  // °C
  precip: number;     // mm today
  uvIndex: number;
}

interface DayForecast {
  date: string;
  code: number;
  maxC: number;
  minC: number;
  precip: number;
  wind: number;
}

// ─── Hook: fetch weather from Open-Meteo ─────────────────────────────────────
function useWeather() {
  const [current, setCurrent] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<DayForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const url =
          `https://api.open-meteo.com/v1/forecast` +
          `?latitude=${LAT}&longitude=${LON}&timezone=${TIMEZONE}` +
          `&current=temperature_2m,apparent_temperature,relative_humidity_2m,` +
          `precipitation,weather_code,wind_speed_10m,uv_index,is_day` +
          `&daily=weather_code,temperature_2m_max,temperature_2m_min,` +
          `precipitation_sum,wind_speed_10m_max` +
          `&forecast_days=10`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const j = await res.json();

        const c = j.current;
        setCurrent({
          temp: c.temperature_2m,
          windspeed: c.wind_speed_10m,
          code: c.weather_code,
          isDay: c.is_day,
          humidity: c.relative_humidity_2m,
          feelsLike: c.apparent_temperature,
          precip: c.precipitation,
          uvIndex: c.uv_index ?? 0,
        });

        const d = j.daily;
        const days: DayForecast[] = (d.time as string[]).map((dt: string, i: number) => ({
          date: dt,
          code: d.weather_code[i],
          maxC: d.temperature_2m_max[i],
          minC: d.temperature_2m_min[i],
          precip: d.precipitation_sum[i],
          wind: d.wind_speed_10m_max[i],
        }));
        setForecast(days);
      } catch (e: any) {
        setError(e.message ?? 'Failed to load weather');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { current, forecast, loading, error };
}

// ─── Small skeleton bar ───────────────────────────────────────────────────────
function Skeleton({ w = '100%', h = 16 }: { w?: string | number; h?: number }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: 4,
      background: 'linear-gradient(90deg,#e5e7e9 25%,#f0f2f5 50%,#e5e7e9 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.4s infinite',
      flexShrink: 0,
    }} />
  );
}

// ─── Today's Weather Card ────────────────────────────────────────────────────
function TodayCard({ current, loading, error }: {
  current: CurrentWeather | null;
  loading: boolean;
  error: string | null;
}) {
  const { label, icon } = current ? wmoDescription(current.code) : { label: '', icon: '' };

  return (
    <div style={{
      background: '#FFFFFF', border: '1px solid #D9D9D9', borderRadius: 8,
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
      minWidth: 280, flex: '0 0 auto',
    }}>
      {/* Card header */}
      <div style={{
        background: '#243746', padding: '14px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.55)', margin: 0, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Today's Weather
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, color: 'rgba(255,255,255,0.4)', margin: '2px 0 0', }}>
            {LOCATION_LABEL}
          </p>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
            stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Body */}
      <div style={{ padding: '20px 20px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Skeleton w="60%" h={48} />
            <Skeleton w="80%" h={16} />
            <Skeleton w="40%" h={14} />
          </div>
        ) : error ? (
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#D92D20', margin: 0 }}>
            Unable to load weather data.
          </p>
        ) : current ? (
          <>
            {/* Big temp + icon */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span style={{ fontSize: 48, lineHeight: 1, flexShrink: 0 }}>{icon}</span>
              <div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 42, fontWeight: 700, color: '#1D2C38', margin: 0, lineHeight: 1 }}>
                  {cToF(current.temp)}°
                  <span style={{ fontSize: 18, fontWeight: 400, color: '#616D79' }}>F</span>
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#384857', margin: '4px 0 0' }}>
                  {label}
                </p>
              </div>
            </div>

            {/* Stats grid */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: 10, paddingTop: 12,
              borderTop: '1px solid #F0F0F0',
            }}>
              {[
                { label: 'Feels Like', value: `${cToF(current.feelsLike)}°F` },
                { label: 'Humidity', value: `${current.humidity}%` },
                { label: 'Wind', value: `${Math.round(current.windspeed * 0.621)} mph` },
                { label: 'Precipitation', value: `${(current.precip * 0.0394).toFixed(2)}"` },
                { label: 'UV Index', value: `${Math.round(current.uvIndex)}` },
                { label: 'Condition', value: current.isDay ? 'Daytime' : 'Nighttime' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, fontWeight: 600, color: '#9CA4AE', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {label}
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: '#1D2C38', margin: '2px 0 0' }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>

      {/* Footer */}
      <div style={{
        padding: '10px 20px', borderTop: '1px solid #F0F0F0',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#9CA4AE" strokeWidth="1.5" />
          <path d="M12 6v6l4 2" stroke="#9CA4AE" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, color: '#9CA4AE', fontWeight: 400 }}>
          Live · Open-Meteo · {LOCATION_LABEL}
        </span>
      </div>
    </div>
  );
}

// ─── 10-Day Forecast Card ─────────────────────────────────────────────────────
function ForecastCard({ forecast, loading, error }: {
  forecast: DayForecast[];
  loading: boolean;
  error: string | null;
}) {
  // find min/max across all days for the temp bar scaling
  const allMax = forecast.map(d => d.maxC);
  const allMin = forecast.map(d => d.minC);
  const absMax = allMax.length ? Math.max(...allMax) : 35;
  const absMin = allMin.length ? Math.min(...allMin) : -5;
  const range = absMax - absMin || 1;

  function barLeft(minC: number) { return ((minC - absMin) / range) * 100; }
  function barWidth(minC: number, maxC: number) { return ((maxC - minC) / range) * 100; }

  // temp bar gradient: cold(blue) → mild(yellow) → hot(orange)
  function tempGradient(minC: number, maxC: number): string {
    const avgC = (minC + maxC) / 2;
    if (avgC < 0)  return '#91D5FF';   // cold — blue
    if (avgC < 10) return '#69C0FF';   // cool — light blue
    if (avgC < 18) return '#52C41A';   // mild — green
    if (avgC < 26) return '#FAAD14';   // warm — amber
    return '#FF4D00';                  // hot — orange
  }

  return (
    <div style={{
      background: '#FFFFFF', border: '1px solid #D9D9D9', borderRadius: 8,
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
      flex: 1, minWidth: 0,
    }}>
      {/* Card header */}
      <div style={{
        background: '#243746', padding: '14px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.55)', margin: 0, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            10-Day Forecast
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, color: 'rgba(255,255,255,0.4)', margin: '2px 0 0' }}>
            {LOCATION_LABEL}
          </p>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
          <path d="M3 10h18M8 2v4M16 2v4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '12px 20px' }}>
            {[...Array(7)].map((_, i) => <Skeleton key={i} h={20} />)}
          </div>
        ) : error ? (
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#D92D20', margin: '16px 20px' }}>
            Unable to load forecast data.
          </p>
        ) : (
          forecast.map((day, i) => {
            const dt = new Date(day.date + 'T12:00:00');
            const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : SHORT_DAYS[dt.getDay()];
            const { icon } = wmoDescription(day.code);
            const { label } = wmoDescription(day.code);
            const left = barLeft(day.minC);
            const width = barWidth(day.minC, day.maxC);
            const grad = tempGradient(day.minC, day.maxC);
            const precipIn = (day.precip * 0.0394).toFixed(2);

            return (
              <div key={day.date} style={{
                display: 'flex', alignItems: 'center',
                padding: '10px 20px', gap: 10,
                borderBottom: i < forecast.length - 1 ? '1px solid #F0F0F0' : 'none',
              }}>
                {/* Day name */}
                <span style={{
                  fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: i === 0 ? 600 : 400,
                  color: '#1D2C38', width: 70, flexShrink: 0,
                }}>
                  {dayName}
                </span>

                {/* Icon + label */}
                <span style={{ fontSize: 18, flexShrink: 0, width: 24, textAlign: 'center' }}>{icon}</span>
                <span style={{
                  fontFamily: 'Open Sans, sans-serif', fontSize: 12, color: '#616D79',
                  width: 100, flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {label}
                </span>

                {/* Min temp */}
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, color: '#9CA4AE', width: 34, flexShrink: 0, textAlign: 'right' }}>
                  {cToF(day.minC)}°
                </span>

                {/* Temp bar */}
                <div style={{ flex: 1, height: 6, background: '#F0F2F5', borderRadius: 9999, position: 'relative', minWidth: 60 }}>
                  <div style={{
                    position: 'absolute',
                    left: `${left}%`,
                    width: `${Math.max(width, 4)}%`,
                    height: '100%',
                    borderRadius: 9999,
                    background: grad,
                  }} />
                </div>

                {/* Max temp */}
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#1D2C38', width: 34, flexShrink: 0 }}>
                  {cToF(day.maxC)}°
                </span>

                {/* Precip */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, width: 44, flexShrink: 0, justifyContent: 'flex-end' }}>
                  <svg width="10" height="12" viewBox="0 0 10 14" fill="none">
                    <path d="M5 1C5 1 1 6.5 1 9.5a4 4 0 008 0C9 6.5 5 1 5 1z"
                      fill={day.precip > 0.5 ? '#69C0FF' : '#D9D9D9'} />
                  </svg>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: day.precip > 0.5 ? '#1890FF' : '#BFBFBF', fontWeight: 400 }}>
                    {precipIn}"
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div style={{
        padding: '10px 20px', borderTop: '1px solid #F0F0F0',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#9CA4AE" strokeWidth="1.5" />
          <path d="M12 6v6l4 2" stroke="#9CA4AE" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, color: '#9CA4AE', fontWeight: 400 }}>
          10-day forecast · Open-Meteo · {LOCATION_LABEL}
        </span>
      </div>
    </div>
  );
}

// ─── Shimmer keyframes ────────────────────────────────────────────────────────
const shimmerStyle = `
@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}`;

// ─── Figma-style Banner (matches Banner-2235-631) ─────────────────────────────
function NexusBanner({ onDismiss }: { onDismiss: () => void }) {
  const [closeHov, setCloseHov] = useState(false);

  // Inline waffle icon using the actual Figma SVG path
  const WaffleIcon = () => (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 20, height: 20,
      background: '#243746', borderRadius: 3,
      verticalAlign: 'middle', flexShrink: 0,
      marginLeft: 3, marginRight: 3,
      position: 'relative', top: -1,
    }}>
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ display: 'block' }}>
        <path d={svgWafflePaths.p2d448e00} fill="#FF4D00" />
      </svg>
    </span>
  );

  // Reusable step chip
  const Chip = ({ color, bg, border, children }: {
    color: string; bg: string; border: string; children: React.ReactNode;
  }) => (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600,
      color, background: bg, border: `1px solid ${border}`,
      borderRadius: 9999, padding: '2px 8px',
      whiteSpace: 'nowrap', flexShrink: 0, letterSpacing: '0.02em',
      textTransform: 'uppercase',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: color, flexShrink: 0, display: 'inline-block' }} />
      {children}
    </span>
  );

  return (
    <div style={{
      position: 'relative',
      background: '#E6F7FF',
      borderRadius: 4,
      border: '1px solid #1890FF',
      display: 'flex',
      gap: 8,
      alignItems: 'flex-start',
      padding: '14px 4px 16px 16px',
      flexShrink: 0,
    }}>
      {/* Content — icon + text */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flex: 1, minWidth: 0 }}>

        {/* Teal info-circle icon — exact Figma path */}
        <div style={{ flexShrink: 0, width: 24, height: 24, position: 'relative', marginTop: 1 }}>
          <div style={{ position: 'absolute', inset: '8.33%' }}>
            <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <path d={svgInfoPaths.p93c9e00} fill="#36CFC9" />
            </svg>
          </div>
        </div>

        {/* Text wrapper */}
        <div style={{ flex: 1, minWidth: 0, paddingRight: 8 }}>

          {/* Title */}
          <p style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16,
            lineHeight: '24px', color: '#262626', margin: 0,
          }}>
            Nexus Interactive Mock
          </p>

          {/* Intro */}
          <p style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14,
            lineHeight: '20px', color: '#595959', margin: '4px 0 12px',
          }}>
            This environment demonstrates the early Nexus experience. The areas listed below are
            currently functional — all other sections are placeholders intended to illustrate the
            planned structure of the platform.
          </p>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(24,144,255,0.2)', marginBottom: 12 }} />

          {/* ── Row 1 — Login Page ─────────────────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
            <Chip color="#027A48" bg="#ECFDF3" border="#6CE9A6">Login Page</Chip>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14,
              lineHeight: '20px', color: '#262626', margin: 0,
            }}>
              To revisit the Login page, <strong style={{ fontWeight: 600 }}>sign out</strong> using
              the profile / avatar menu in the <strong style={{ fontWeight: 600 }}>top-right corner</strong> of the navigation bar.
            </p>
          </div>

          {/* ── Row 2 — New User Invitation ───────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
            <Chip color="#027A48" bg="#ECFDF3" border="#6CE9A6">Invitation Flow</Chip>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14,
              lineHeight: '20px', color: '#262626', margin: 0,
            }}>
              To explore the new-user invitation workflow, sign out and click{' '}
              <strong style={{ fontWeight: 700, color: '#FF4D00' }}>"SIGN UP HERE"</strong>{' '}
              on the main Login page. This will walk you through the full account creation and company registration flow.
            </p>
          </div>

          {/* ── Row 3 — Project Settings ──────────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <Chip color="#027A48" bg="#ECFDF3" border="#6CE9A6">Project Settings</Chip>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14,
              lineHeight: '20px', color: '#262626', margin: 0,
            }}>
              Access Project Settings via the{' '}
              <strong style={{ fontWeight: 600 }}>App Launcher</strong>{' '}
              <WaffleIcon />{' '}
              button in the <strong style={{ fontWeight: 600 }}>top-left corner</strong> of the navigation bar,
              then select <strong style={{ fontWeight: 600 }}>"Project Settings"</strong> from the module grid.
            </p>
          </div>

        </div>
      </div>

      {/* Close button — 44×44 hit zone, × rotated +plus */}
      <button
        onClick={onDismiss}
        onMouseEnter={() => setCloseHov(true)}
        onMouseLeave={() => setCloseHov(false)}
        style={{
          flexShrink: 0,
          width: 44, height: 44,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: closeHov ? 'rgba(24,144,255,0.08)' : 'transparent',
          border: 'none', borderRadius: 4,
          cursor: 'pointer',
          transition: 'background 0.15s',
          padding: 0,
        }}
        aria-label="Dismiss"
      >
        {/* × drawn as two crossing lines (same as Figma: + rotated 45°) */}
        <div style={{ width: 18, height: 18, position: 'relative', transform: 'rotate(45deg)' }}>
          <div style={{ position: 'absolute', inset: '-4.17%' }}>
            <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 19.5">
              <path d="M0.75 9.75H18.75" stroke="#262626" strokeLinecap="square" strokeWidth="1.5" />
              <path d="M9.75 0.75L9.75 18.75" stroke="#262626" strokeLinecap="square" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export function ProjectHomePage() {
  const { current, forecast, loading, error } = useWeather();
  const [bannerVisible, setBannerVisible] = useState(true);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, background: '#F0F2F5', overflow: 'hidden' }}>
      <style>{shimmerStyle}</style>

      {/* Section header */}
      <div style={{
        height: 72, flexShrink: 0,
        background: '#FFFFFF', borderBottom: '1px solid #D9D9D9',
        display: 'flex', alignItems: 'center',
        paddingLeft: 24, paddingRight: 24,
      }}>
        <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: 24, fontWeight: 600, lineHeight: '32px', color: '#1D2C38', margin: 0 }}>
          Home
        </h1>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* ── Figma-style Banner ──────────────────────────────────────────── */}
        {bannerVisible && (
          <NexusBanner onDismiss={() => setBannerVisible(false)} />
        )}

        {/* ── Weather widgets row ─────────────────────────────────────────── */}
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <TodayCard current={current} loading={loading} error={error} />
          <ForecastCard forecast={forecast} loading={loading} error={error} />
        </div>

        {/* ── Placeholder dashboard tiles ─────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          {[
            { label: 'Open Issues', value: '—', icon: '⚠️', sub: 'Placeholder' },
            { label: 'Inspections Due', value: '—', icon: '📋', sub: 'Placeholder' },
            { label: 'Team Members', value: '—', icon: '👥', sub: 'Placeholder' },
            { label: 'Files Uploaded', value: '—', icon: '📁', sub: 'Placeholder' },
          ].map(({ label, value, icon, sub }) => (
            <div key={label} style={{
              background: '#FFFFFF', border: '1px solid #D9D9D9', borderRadius: 8,
              padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 8,
              opacity: 0.55,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 12, fontWeight: 600, color: '#9CA4AE', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {label}
                </p>
                <span style={{ fontSize: 18 }}>{icon}</span>
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 30, fontWeight: 700, color: '#1D2C38', margin: 0, lineHeight: 1 }}>
                {value}
              </p>
              <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, color: '#BFBFBF', margin: 0 }}>
                {sub}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}