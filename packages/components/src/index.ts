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

export { SandoForm } from './components/form/index.js';
export type {
  SandoFormProps,
  FormMethod,
  FormValidationError,
  FormSubmitEventDetail,
  FormInvalidEventDetail,
  FormResetEventDetail,
  FormChangeEventDetail,
  FormValidateEventDetail,
  FormSubmitEvent,
  FormInvalidEvent,
  FormResetEvent,
  FormChangeEvent,
  FormValidateEvent
} from './components/form/index.js';

export { SandoCheckbox } from './components/checkbox/index.js';
export type {
  CheckboxVariant,
  CheckboxSize,
  CheckboxChangeEventDetail,
  CheckboxChangeEvent,
  SandoCheckboxProps
} from './components/checkbox/index.js';

export { SandoRadio } from './components/radio/index.js';
export type {
  RadioVariant,
  RadioSize,
  RadioChangeEventDetail,
  RadioChangeEvent,
  SandoRadioProps
} from './components/radio/index.js';

export { SandoRadioGroup } from './components/radio-group/index.js';
export type {
  RadioGroupOrientation,
  RadioGroupChangeEventDetail,
  RadioGroupChangeEvent,
  SandoRadioGroupProps
} from './components/radio-group/index.js';

export { SandoTag } from './components/tag/index.js';
export type {
  TagVariant,
  TagSize,
  SandoTagProps,
  TagRemoveEventDetail,
  TagRemoveEvent
} from './components/tag/index.js';

export { SandoBadge } from './components/badge/index.js';
export type {
  BadgeColor,
  BadgeVariant,
  BadgeSize,
  SandoBadgeProps
} from './components/badge/index.js';

export { SandoOption } from './components/option/index.js';
export type {
  SandoOptionProps,
  OptionSelectEventDetail,
  OptionSelectEvent
} from './components/option/index.js';

export { SandoOptionGroup } from './components/option-group/index.js';
export type { SandoOptionGroupProps } from './components/option-group/index.js';

export { SandoSelect } from './components/select/index.js';
export type {
  SelectVariant,
  SelectSize,
  SelectPlacement,
  SandoSelectProps,
  SelectChangeEventDetail,
  SelectChangeEvent,
  SelectVisibilityEventDetail,
  SelectVisibilityEvent
} from './components/select/index.js';

export { SandoTextarea } from './components/textarea/index.js';
export type {
  TextareaVariant,
  TextareaSize,
  TextareaResize,
  TextareaWrap,
  TextareaInputEventDetail,
  TextareaChangeEventDetail,
  TextareaInputEvent,
  TextareaChangeEvent,
  SandoTextareaProps
} from './components/textarea/index.js';

export { SandoSwitch } from './components/switch/index.js';
export type {
  SwitchVariant,
  SwitchSize,
  SwitchChangeEventDetail,
  SwitchChangeEvent,
  SandoSwitchProps
} from './components/switch/index.js';

export { SandoSpinner } from './components/spinner/index.js';
export type { SpinnerSize, SpinnerVariant, SandoSpinnerProps } from './components/spinner/index.js';

export { SandoSkeleton, SandoSkeletonText } from './components/skeleton/index.js';
export type {
  SkeletonShape,
  SkeletonEffect,
  SandoSkeletonProps,
  SkeletonTextSize,
  SandoSkeletonTextProps
} from './components/skeleton/index.js';

export { SandoSkeletonParagraph } from './components/skeleton-paragraph/index.js';
export type {
  SkeletonParagraphSpacing,
  SandoSkeletonParagraphProps
} from './components/skeleton-paragraph/index.js';

export { SandoSkeletonAvatar } from './components/skeleton-avatar/index.js';
export type {
  SkeletonAvatarSize,
  SkeletonAvatarEffect,
  SandoSkeletonAvatarProps
} from './components/skeleton-avatar/index.js';

export { SandoSkeletonImage } from './components/skeleton-image/index.js';
export type {
  SkeletonImageRatio,
  SkeletonImageEffect,
  SandoSkeletonImageProps
} from './components/skeleton-image/index.js';

export { SandoSkeletonButton } from './components/skeleton-button/index.js';
export type {
  SkeletonButtonSize,
  SkeletonButtonWidth,
  SandoSkeletonButtonProps
} from './components/skeleton-button/index.js';

export { SandoSkeletonRow } from './components/skeleton-row/index.js';
export type {
  SkeletonRowGap,
  SkeletonRowAlign,
  SandoSkeletonRowProps
} from './components/skeleton-row/index.js';

export { SandoSkeletonStack } from './components/skeleton-stack/index.js';
export type {
  SkeletonStackGap,
  SkeletonStackAlign,
  SandoSkeletonStackProps
} from './components/skeleton-stack/index.js';

export { SandoSkeletonComposer } from './components/skeleton-composer/index.js';
export type { SandoSkeletonComposerProps } from './components/skeleton-composer/index.js';

export { SandoSkeletonListItem } from './components/skeleton-list-item/index.js';
export type {
  SkeletonListItemAvatarSize,
  SandoSkeletonListItemProps
} from './components/skeleton-list-item/index.js';

export { SandoSkeletonTableRow } from './components/skeleton-table-row/index.js';
export type { SandoSkeletonTableRowProps } from './components/skeleton-table-row/index.js';

export { SandoSkeletonCard } from './components/skeleton-card/index.js';
export type {
  SkeletonCardImageRatio,
  SandoSkeletonCardProps
} from './components/skeleton-card/index.js';

export { SandoSkeletonArticle } from './components/skeleton-article/index.js';
export type { SandoSkeletonArticleProps } from './components/skeleton-article/index.js';

export { SandoSkeletonProfile } from './components/skeleton-profile/index.js';
export type {
  SkeletonProfileAvatarSize,
  SandoSkeletonProfileProps
} from './components/skeleton-profile/index.js';

export { SandoSkeletonComment } from './components/skeleton-comment/index.js';
export type {
  SkeletonCommentAvatarSize,
  SandoSkeletonCommentProps
} from './components/skeleton-comment/index.js';

export { SandoSkeletonMediaCard } from './components/skeleton-media-card/index.js';
export type {
  SkeletonMediaCardImageRatio,
  SandoSkeletonMediaCardProps
} from './components/skeleton-media-card/index.js';

export { SandoDivider } from './components/divider/index.js';
export type {
  DividerOrientation,
  DividerWeight,
  DividerVariant,
  DividerSpacing,
  SandoDividerProps
} from './components/divider/index.js';

export { SandoLabel } from './components/label/index.js';
export type { LabelSize, LabelWeight, SandoLabelProps } from './components/label/index.js';

export { SandoHelpText } from './components/help-text/index.js';
export type { HelpTextVariant, SandoHelpTextProps } from './components/help-text/index.js';

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
