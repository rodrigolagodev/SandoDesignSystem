/**
 * @sando/components
 * Web Components library for Sando Design System built with Lit
 *
 * This package provides framework-agnostic Web Components that work
 * seamlessly with React, Vue, Angular, Svelte, or plain HTML/JavaScript.
 *
 * @packageDocumentation
 */

// ========================================
// Components
// ========================================

export { SandoButton } from './components/button/index.js';
export type {
  ButtonVariant,
  ButtonSize,
  ButtonStatus,
  ButtonType,
  SandoButtonProps,
  ButtonClickEventDetail,
  ButtonClickEvent
} from './components/button/index.js';

export { SandoIcon } from './components/icon/index.js';
export type {
  IconName,
  IconSize,
  IconColor,
  SandoIconProps,
  IconLoadEvent,
  IconLoadEventDetail,
  IconErrorEvent,
  IconErrorEventDetail
} from './components/icon/index.js';
export { iconNames, isValidIconName, loadIconSvg, ICON_COUNT } from './components/icon/index.js';

export { SandoInput } from './components/input/index.js';
export type {
  InputVariant,
  InputSize,
  InputType,
  SandoInputProps,
  InputChangeEventDetail
} from './components/input/index.js';

export { SandoFormGroup } from './components/form-group/index.js';
export type {
  SandoFormGroupProps,
  FormGroupValidationChangeDetail
} from './components/form-group/index.js';

// ========================================
// Common Types
// ========================================

export type {
  Flavor,
  ComponentSize,
  ComponentVariant,
  ComponentStatus,
  BaseComponentProps,
  InteractiveComponentProps,
  CustomEventDetail,
  CustomComponentEvent
} from './types/index.js';

// ========================================
// Mixins
// ========================================

export { FlavorableMixin, type FlavorableInterface, type Flavorable } from './mixins/index.js';

// Note: ColorModeAwareMixin was removed because it caused flickering issues.
// Color mode switching works through CSS custom property inheritance from the document.
// See: preview-styles.css for html[data-color-mode] overrides that inherit into Shadow DOM.

// ========================================
// Utilities
// ========================================

export {
  // Event helpers
  createCustomEvent,
  dispatchCustomEvent,
  debounce,
  throttle,
  // DOM helpers
  isFocusable,
  getFocusableElements,
  trapFocus,
  getSlotTextContent,
  hasSlotContent,
  // String helpers
  toKebabCase,
  toCamelCase,
  truncate,
  uniqueId,
  capitalize,
  // Validation helpers
  isEmpty,
  isValidEmail,
  isValidUrl,
  isInRange,
  clamp,
  isOneOf
} from './utils/index.js';

// ========================================
// Token Helpers
// ========================================

export { token, tokenWithFallback, isToken, getTokenName } from './styles/tokens.js';

// ========================================
// Shared Styles
// ========================================

export {
  // Base styles
  buttonReset,
  visuallyHidden,
  focusVisible,
  disabledState,
  transition,
  flexCenter,
  textTruncate,
  containerQuery,
  safeAreaInsets,
  // Animations
  spinAnimation,
  fadeInAnimation,
  fadeOutAnimation,
  slideInTop,
  slideInBottom,
  scaleIn,
  shakeAnimation,
  pulseAnimation,
  bounceAnimation
} from './styles/shared/index.js';
