import React, { createContext, useContext, useMemo, useState } from 'react';
import type { DevLayerId, DevModeContextValue } from './types';

const DevModeContext = createContext<DevModeContextValue | null>(null);

export function DevModeProvider({
  children,
  enabled,
  onEnabledChange,
}: {
  children: React.ReactNode;
  enabled?: boolean;
  onEnabledChange?: (enabled: boolean) => void;
}) {
  const [internalEnabled, setInternalEnabled] = useState(false);
  const [activeLayers, setActiveLayers] = useState<Set<DevLayerId>>(new Set());
  const isControlled = typeof enabled === 'boolean';
  const currentEnabled = isControlled ? enabled : internalEnabled;

  const value = useMemo<DevModeContextValue>(() => ({
    enabled: currentEnabled,
    setEnabled: (next) => {
      if (!isControlled) setInternalEnabled(next);
      onEnabledChange?.(next);
    },
    activeLayers,
    setActiveLayers,
  }), [activeLayers, currentEnabled, isControlled, onEnabledChange]);

  return (
    <DevModeContext.Provider value={value}>
      {children}
    </DevModeContext.Provider>
  );
}

export function useDevMode() {
  const value = useContext(DevModeContext);
  if (!value) {
    throw new Error('useDevMode must be used inside DevModeProvider');
  }
  return value;
}
