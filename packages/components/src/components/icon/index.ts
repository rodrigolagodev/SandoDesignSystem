/**
 * Barrel export for sando-icon component
 */

export { SandoIcon } from './sando-icon.js';
export type {
  IconSize,
  IconColor,
  SandoIconProps,
  IconLoadEvent,
  IconLoadEventDetail,
  IconErrorEvent,
  IconErrorEventDetail
} from './sando-icon.types.js';
export type { IconName } from './icon-manifest.js';
export { iconNames, isValidIconName, loadIconSvg, ICON_COUNT } from './icon-manifest.js';
