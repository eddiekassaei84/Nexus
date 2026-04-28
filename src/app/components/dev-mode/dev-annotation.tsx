import React from 'react';

export function DevAnnotationCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        width: 260,
        borderRadius: 8,
        border: '1px solid rgba(24, 144, 255, 0.45)',
        background: 'rgba(255, 255, 255, 0.94)',
        boxShadow: '0 8px 28px rgba(29, 44, 56, 0.18)',
        color: '#1D2C38',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '9px 12px',
          borderBottom: '1px solid rgba(195, 199, 204, 0.7)',
          background: 'rgba(230, 247, 255, 0.9)',
        }}
      >
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700, lineHeight: '18px' }}>
          {title}
        </span>
      </div>
      <div style={{ padding: '10px 12px', fontFamily: 'Open Sans, sans-serif', fontSize: 12, lineHeight: '18px', color: '#384857' }}>
        {children}
      </div>
    </div>
  );
}
