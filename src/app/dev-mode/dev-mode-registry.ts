import type { DevModeRegistry } from '../components/dev-mode';
import { lbsDevContent } from './lbs-dev-content';
import { rolePermissionsDevContent, rolesDevContent } from './roles-permissions-dev-content';

export const devModeRegistry: DevModeRegistry = {
  'project-settings:locations': lbsDevContent,
  'project-settings:roles': rolesDevContent,
  'project-settings:role-access-level': rolePermissionsDevContent,
};
