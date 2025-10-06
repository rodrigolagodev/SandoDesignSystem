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
