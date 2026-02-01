import { html, TemplateResult } from "lit";

/**
 * Storybook Decorators for Sando Design System
 *
 * Reusable decorators for consistent story layouts.
 * These wrap stories in predefined layout containers.
 */

/**
 * Row decorator - Horizontal flex layout with gap
 * Use for displaying multiple items side by side
 *
 * @example
 * export const AllVariants: Story = {
 *   decorators: [rowDecorator],
 *   render: () => html`...`
 * }
 */
export const rowDecorator = (story: () => TemplateResult) => html`
  <div
    style="
      display: flex;
      flex-direction: row;
      gap: 1rem;
      flex-wrap: wrap;
      align-items: center;
    "
  >
    ${story()}
  </div>
`;

/**
 * Column decorator - Vertical flex layout with gap
 * Use for stacked elements or form-like layouts
 */
export const columnDecorator = (story: () => TemplateResult) => html`
  <div
    style="
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
    "
  >
    ${story()}
  </div>
`;

/**
 * Grid decorator - CSS Grid layout with auto-fill columns
 * Use for showcasing many items in a grid pattern
 */
export const gridDecorator = (story: () => TemplateResult) => html`
  <div
    style="
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    "
  >
    ${story()}
  </div>
`;

/**
 * Center decorator - Centers content both horizontally and vertically
 * Use for single component showcase
 */
export const centerDecorator = (story: () => TemplateResult) => html`
  <div
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;
    "
  >
    ${story()}
  </div>
`;

/**
 * Padded decorator - Adds padding around the story
 * Use when you need extra spacing
 */
export const paddedDecorator = (story: () => TemplateResult) => html`
  <div style="padding: 2rem;">${story()}</div>
`;

/**
 * Dark background decorator - Wraps story in dark background
 * Use for testing light-colored components
 */
export const darkBackgroundDecorator = (story: () => TemplateResult) => html`
  <div
    style="
      background-color: #1c1917;
      padding: 2rem;
      border-radius: 8px;
    "
  >
    ${story()}
  </div>
`;

/**
 * Max width decorator - Constrains width for form-like layouts
 * Use for input fields and forms
 */
export const maxWidthDecorator =
  (maxWidth = "400px") =>
  (story: () => TemplateResult) => html`
    <div style="max-width: ${maxWidth}; width: 100%;">${story()}</div>
  `;
