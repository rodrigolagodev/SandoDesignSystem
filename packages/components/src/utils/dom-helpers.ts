/**
 * DOM Helper Utilities
 * Utilities for DOM manipulation and queries
 */

/**
 * Check if an element is focusable
 *
 * @param element - Element to check
 * @returns Whether the element can receive focus
 */
export function isFocusable(element: HTMLElement): boolean {
  if (element.hasAttribute('disabled') || element.getAttribute('tabindex') === '-1') {
    return false;
  }

  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ];

  return focusableSelectors.some((selector) => element.matches(selector));
}

/**
 * Get all focusable elements within a container
 *
 * @param container - Container element to search within
 * @returns Array of focusable elements
 */
export function getFocusableElements(container: HTMLElement | ShadowRoot): HTMLElement[] {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ].join(',');

  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors));
}

/**
 * Trap focus within a container
 *
 * @param container - Container to trap focus within
 * @returns Cleanup function to remove event listeners
 *
 * @example
 * const cleanup = trapFocus(dialogElement);
 * // Later...
 * cleanup();
 */
export function trapFocus(container: HTMLElement): () => void {
  const focusableElements = getFocusableElements(container);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  };

  container.addEventListener('keydown', handleKeyDown);
  firstElement?.focus();

  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Get slot content as text
 *
 * @param slot - Slot element
 * @returns Text content of slotted elements
 */
export function getSlotTextContent(slot: HTMLSlotElement): string {
  const nodes = slot.assignedNodes({ flatten: true });
  return nodes.map((node) => node.textContent).join('');
}

/**
 * Check if a slot has content
 *
 * @param slot - Slot element
 * @returns Whether the slot has assigned nodes
 */
export function hasSlotContent(slot: HTMLSlotElement): boolean {
  return slot.assignedNodes({ flatten: true }).length > 0;
}
