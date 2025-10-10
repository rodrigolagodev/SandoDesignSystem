/**
 * Type definitions for sando-icon component
 * All icon-specific type definitions in one place
 */

import type { IconName } from './icon-manifest';

/**
 * Size variants for the icon
 * Icons scale with font sizes for visual harmony with text
 */
export type IconSize = 'xs' | 'small' | 'medium' | 'large' | 'xl';

/**
 * Color variants for the icon
 */
export type IconColor = 'default' | 'muted' | 'emphasis' | 'brand' | 'onSolid';

/**
 * Props for the SandoIcon component
 */
export interface SandoIconProps {
	/**
	 * Name of the icon to display
	 * Must be a valid Lucide icon name from the icon library
	 * @required
	 */
	name: IconName;

	/**
	 * Size of the icon
	 * Icons scale with font sizes (xs=12px, small=14px, medium=18px, large=24px, xl=32px)
	 * @default 'medium'
	 */
	size?: IconSize;

	/**
	 * Color variant of the icon
	 * Uses semantic color tokens from the design system
	 * @default 'default'
	 */
	color?: IconColor;

	/**
	 * Custom color override
	 * Use CSS color value (e.g., '#ff0000', 'var(--custom-color)')
	 * Overrides the color prop
	 */
	customColor?: string;

	/**
	 * Custom size override
	 * Use CSS dimension value (e.g., '16px', '2rem', '1em')
	 * Overrides the size prop
	 */
	customSize?: string;

	/**
	 * Whether to flip the icon horizontally
	 * @default false
	 */
	flipHorizontal?: boolean;

	/**
	 * Whether to flip the icon vertically
	 * @default false
	 */
	flipVertical?: boolean;

	/**
	 * Rotation angle in degrees (0, 90, 180, 270)
	 * @default 0
	 */
	rotate?: 0 | 90 | 180 | 270;

	/**
	 * Accessible label for screen readers
	 * Required if the icon has semantic meaning (not purely decorative)
	 */
	ariaLabel?: string | null;

	/**
	 * Whether the icon is purely decorative (hidden from screen readers)
	 * @default false
	 */
	decorative?: boolean;

	/**
	 * Design system flavor/theme
	 * Inherited from parent if not specified
	 * @default 'original'
	 */
	flavor?: string;

	/**
	 * Stroke width for the SVG
	 * @default 2
	 */
	strokeWidth?: number;

	/**
	 * Whether to inherit color from parent text color
	 * When true, icon uses currentColor instead of token values
	 * @default false
	 */
	inheritColor?: boolean;
}

/**
 * Custom event detail for icon load events
 */
export interface IconLoadEventDetail {
	/**
	 * Name of the loaded icon
	 */
	iconName: IconName;

	/**
	 * Whether the icon loaded successfully
	 */
	success: boolean;

	/**
	 * Error message if load failed
	 */
	error?: string;
}

/**
 * Type-safe custom event for icon load completion
 */
export type IconLoadEvent = CustomEvent<IconLoadEventDetail>;

/**
 * Custom event detail for icon error events
 */
export interface IconErrorEventDetail {
	/**
	 * Name of the icon that failed to load
	 */
	iconName: IconName;

	/**
	 * Error message
	 */
	error: string;
}

/**
 * Type-safe custom event for icon load errors
 */
export type IconErrorEvent = CustomEvent<IconErrorEventDetail>;
