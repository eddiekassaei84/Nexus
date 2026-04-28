import type { DevModeRegistry } from '../components/dev-mode';
import { lbsDevContent } from './lbs-dev-content';

export const devModeRegistry: DevModeRegistry = {
  'project-settings:locations': lbsDevContent,
};
