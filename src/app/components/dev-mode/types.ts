import type React from 'react';

export type DevLayerId = string;
export type DevAnchorPlacement = 'top' | 'right' | 'bottom' | 'left';
export type DevPageMode = 'view' | 'edit';
export type DevDocumentContentType = 'markdown' | 'mermaid';

export interface DevAnnotation {
  id: string;
  anchor: string;
  title: string;
  body: React.ReactNode;
  layerId?: DevLayerId;
  placement?: DevAnchorPlacement;
  mode?: DevPageMode | 'all';
}

export interface DevPanel {
  id: string;
  title: string;
  body: React.ReactNode;
  layerId?: DevLayerId;
}

export interface DevDocument {
  id: string;
  title: string;
  sourceUrl: string;
  markdown: string;
  contentType?: DevDocumentContentType;
  diagram?: string;
  children?: DevDocument[];
}

export interface DevPageContent {
  annotations?: DevAnnotation[];
  panels?: DevPanel[];
  documents?: DevDocument[];
}

export type DevModeRegistry = Record<string, DevPageContent>;

export interface DevModeContextValue {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  activeLayers: Set<DevLayerId>;
  setActiveLayers: (layers: Set<DevLayerId>) => void;
}
