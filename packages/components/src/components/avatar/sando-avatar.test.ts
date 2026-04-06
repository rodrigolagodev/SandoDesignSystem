/**
 * Unit Tests for sando-avatar
 * Tests rendering, fallback chain, properties, events, and structure.
 *
 * ## Fallback chain
 * 1. `src` image (if provided and loads successfully)
 * 2. Initials extracted from `name` (up to 2 characters)
 * 3. Generic person icon SVG
 *
 * ## Behaviors under test
 * - All size/shape/presence/presencePosition variants
 * - Link rendering when href is provided
 * - Security: rel="noopener noreferrer" for target="_blank"
 * - Initials extraction algorithm (first + last initial)
 * - Image error → fallback to initials/icon
 * - aria-label generation (static vs link)
 *
 * @see TESTING_STRATEGY.toon (TST-CR-R1, TST-CR-R2)
 * @see WCAG_COMPLIANCE.toon (WC-CR-R1)
 */

import { fixture, html } from '@open-wc/testing';
import './sando-avatar.js';
import type { SandoAvatar } from './sando-avatar.js';

describe('sando-avatar', () => {
  let element: SandoAvatar;

  // ─────────────────────────────────────────────
  // RENDERING
  // ─────────────────────────────────────────────
  describe('Rendering', () => {
    it('should render with no props (fallback icon)', async () => {
      element = await fixture<SandoAvatar>(html`<sando-avatar></sando-avatar>`);
      await element.updateComplete;

      expect(element).toBeDefined();
      expect(element.shadowRoot).toBeDefined();
    });

    it('should render shadow DOM', async () => {
      element = await fixture<SandoAvatar>(html`<sando-avatar></sando-avatar>`);
      expect(element.shadowRoot).toBeDefined();
    });

    it('should apply default property values', async () => {
      element = await fixture<SandoAvatar>(html`<sando-avatar></sando-avatar>`);
      await element.updateComplete;

      expect(element.size).toBe('md');
      expect(element.shape).toBe('circle');
      expect(element.presence).toBe('none');
      expect(element.presencePosition).toBe('bottom-end');
    });

    it('should render .avatar wrapper element', async () => {
      element = await fixture<SandoAvatar>(html`<sando-avatar></sando-avatar>`);
      await element.updateComplete;

      const wrapper = element.shadowRoot?.querySelector('.avatar');
      expect(wrapper).not.toBeNull();
    });

    it('should expose part="avatar" for styling', async () => {
      element = await fixture<SandoAvatar>(html`<sando-avatar></sando-avatar>`);
      await element.updateComplete;

      const wrapper = element.shadowRoot?.querySelector('[part="avatar"]');
      expect(wrapper).not.toBeNull();
    });
  });

  // ─────────────────────────────────────────────
  // FALLBACK CHAIN
  // ─────────────────────────────────────────────
  describe('Fallback Chain', () => {
    describe('Image', () => {
      it('should render <img> when src is provided', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar src="/photo.jpg" name="Rodrigo"></sando-avatar>
        `);
        await element.updateComplete;

        const img = element.shadowRoot?.querySelector('img.avatar__image');
        expect(img).not.toBeNull();
      });

      it('should set src attribute on the image', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar src="/photo.jpg" name="Rodrigo"></sando-avatar>
        `);
        await element.updateComplete;

        const img = element.shadowRoot?.querySelector('img.avatar__image') as HTMLImageElement;
        expect(img?.src).toContain('/photo.jpg');
      });

      it('should use name as alt text for the image', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar src="/photo.jpg" name="Rodrigo García"></sando-avatar>
        `);
        await element.updateComplete;

        const img = element.shadowRoot?.querySelector('img.avatar__image');
        expect(img?.getAttribute('alt')).toBe('Rodrigo García');
      });

      it('should use custom alt prop over name', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar src="/photo.jpg" name="Rodrigo" alt="Custom alt"></sando-avatar>
        `);
        await element.updateComplete;

        const img = element.shadowRoot?.querySelector('img.avatar__image');
        expect(img?.getAttribute('alt')).toBe('Custom alt');
      });

      it('should expose part="image" on the image element', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar src="/photo.jpg"></sando-avatar>
        `);
        await element.updateComplete;

        const img = element.shadowRoot?.querySelector('[part="image"]');
        expect(img).not.toBeNull();
      });

      it('should NOT render initials or icon when src is set', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar src="/photo.jpg" name="Rodrigo García"></sando-avatar>
        `);
        await element.updateComplete;

        const initials = element.shadowRoot?.querySelector('.avatar__initials');
        const icon = element.shadowRoot?.querySelector('.avatar__icon');
        expect(initials).toBeNull();
        expect(icon).toBeNull();
      });
    });

    describe('Initials', () => {
      it('should render initials span when name is set and no src', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar name="Rodrigo García"></sando-avatar>
        `);
        await element.updateComplete;

        const initials = element.shadowRoot?.querySelector('.avatar__initials');
        expect(initials).not.toBeNull();
      });

      it('should expose part="initials" on the initials element', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar name="Rodrigo García"></sando-avatar>
        `);
        await element.updateComplete;

        const initials = element.shadowRoot?.querySelector('[part="initials"]');
        expect(initials).not.toBeNull();
      });

      it('should set aria-hidden on initials span', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar name="Rodrigo García"></sando-avatar>
        `);
        await element.updateComplete;

        const initials = element.shadowRoot?.querySelector('.avatar__initials');
        expect(initials?.getAttribute('aria-hidden')).toBe('true');
      });

      it('should NOT render image or icon when only name is set', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar name="Rodrigo García"></sando-avatar>
        `);
        await element.updateComplete;

        expect(element.shadowRoot?.querySelector('img')).toBeNull();
        expect(element.shadowRoot?.querySelector('.avatar__icon')).toBeNull();
      });
    });

    describe('Icon Fallback', () => {
      it('should render icon when neither src nor name is provided', async () => {
        element = await fixture<SandoAvatar>(html`<sando-avatar></sando-avatar>`);
        await element.updateComplete;

        const icon = element.shadowRoot?.querySelector('sando-icon.avatar__icon');
        expect(icon).not.toBeNull();
      });

      it('should render sando-icon with name="user-round"', async () => {
        element = await fixture<SandoAvatar>(html`<sando-avatar></sando-avatar>`);
        await element.updateComplete;

        const icon = element.shadowRoot?.querySelector('sando-icon.avatar__icon');
        expect(icon?.getAttribute('name')).toBe('user-round');
      });

      it('should render sando-icon as decorative', async () => {
        element = await fixture<SandoAvatar>(html`<sando-avatar></sando-avatar>`);
        await element.updateComplete;

        const icon = element.shadowRoot?.querySelector('sando-icon.avatar__icon');
        expect(icon?.hasAttribute('decorative')).toBe(true);
      });

      it('should expose part="icon" on the icon element', async () => {
        element = await fixture<SandoAvatar>(html`<sando-avatar></sando-avatar>`);
        await element.updateComplete;

        const icon = element.shadowRoot?.querySelector('[part="icon"]');
        expect(icon).not.toBeNull();
      });
    });

    describe('Image Error Fallback', () => {
      it('should fall back to initials when image emits error event', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar src="/broken.jpg" name="Rodrigo García"></sando-avatar>
        `);
        await element.updateComplete;

        // Simulate image load error
        const img = element.shadowRoot?.querySelector('img') as HTMLImageElement;
        img?.dispatchEvent(new Event('error'));
        await element.updateComplete;

        const initials = element.shadowRoot?.querySelector('.avatar__initials');
        expect(initials).not.toBeNull();
      });

      it('should fall back to icon when image errors and no name', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar src="/broken.jpg"></sando-avatar>
        `);
        await element.updateComplete;

        const img = element.shadowRoot?.querySelector('img') as HTMLImageElement;
        img?.dispatchEvent(new Event('error'));
        await element.updateComplete;

        const icon = element.shadowRoot?.querySelector('.avatar__icon');
        expect(icon).not.toBeNull();
      });

      it('should reset image error state when src changes', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar src="/broken.jpg"></sando-avatar>
        `);
        await element.updateComplete;

        // Trigger error → should fall back to icon (no name)
        const img = element.shadowRoot?.querySelector('img') as HTMLImageElement;
        img?.dispatchEvent(new Event('error'));
        await element.updateComplete;

        expect(element.shadowRoot?.querySelector('.avatar__icon')).not.toBeNull();

        // Change src — updated() resets _imageError which triggers a second update
        element.src = '/valid.jpg';
        // Wait two cycles: one for src change, one for _imageError reset side-effect
        await element.updateComplete;
        await element.updateComplete;

        // After reset, the component should attempt to render the image again
        const newImg = element.shadowRoot?.querySelector('img.avatar__image');
        expect(newImg).not.toBeNull();
      });
    });
  });

  // ─────────────────────────────────────────────
  // INITIALS EXTRACTION
  // ─────────────────────────────────────────────
  describe('Initials Extraction', () => {
    it('should generate "RG" from "Rodrigo García"', async () => {
      element = await fixture<SandoAvatar>(html`
        <sando-avatar name="Rodrigo García"></sando-avatar>
      `);
      await element.updateComplete;

      const initials = element.shadowRoot?.querySelector('.avatar__initials');
      expect(initials?.textContent?.trim()).toBe('RG');
    });

    it('should generate "R" from single name "Rod"', async () => {
      element = await fixture<SandoAvatar>(html` <sando-avatar name="Rod"></sando-avatar> `);
      await element.updateComplete;

      const initials = element.shadowRoot?.querySelector('.avatar__initials');
      expect(initials?.textContent?.trim()).toBe('R');
    });

    it('should generate "RL" from "Rod García López" (first + last)', async () => {
      element = await fixture<SandoAvatar>(html`
        <sando-avatar name="Rod García López"></sando-avatar>
      `);
      await element.updateComplete;

      const initials = element.shadowRoot?.querySelector('.avatar__initials');
      expect(initials?.textContent?.trim()).toBe('RL');
    });

    it('should generate "AL" from "Ana María López"', async () => {
      element = await fixture<SandoAvatar>(html`
        <sando-avatar name="Ana María López"></sando-avatar>
      `);
      await element.updateComplete;

      const initials = element.shadowRoot?.querySelector('.avatar__initials');
      expect(initials?.textContent?.trim()).toBe('AL');
    });

    it('should uppercase initials', async () => {
      element = await fixture<SandoAvatar>(html` <sando-avatar name="john doe"></sando-avatar> `);
      await element.updateComplete;

      const initials = element.shadowRoot?.querySelector('.avatar__initials');
      expect(initials?.textContent?.trim()).toBe('JD');
    });

    it('should fall back to icon when name is only whitespace', async () => {
      element = await fixture<SandoAvatar>(html` <sando-avatar name="   "></sando-avatar> `);
      await element.updateComplete;

      const icon = element.shadowRoot?.querySelector('.avatar__icon');
      expect(icon).not.toBeNull();
    });
  });

  // ─────────────────────────────────────────────
  // SIZE PROP
  // ─────────────────────────────────────────────
  describe('Size Prop', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    sizes.forEach((size) => {
      it(`should reflect size="${size}" attribute`, async () => {
        element = await fixture<SandoAvatar>(html` <sando-avatar size=${size}></sando-avatar> `);
        await element.updateComplete;

        expect(element.size).toBe(size);
        expect(element.getAttribute('size')).toBe(size);
      });
    });

    it('should update size dynamically', async () => {
      element = await fixture<SandoAvatar>(html`<sando-avatar></sando-avatar>`);
      element.size = 'xl';
      await element.updateComplete;

      expect(element.size).toBe('xl');
      expect(element.getAttribute('size')).toBe('xl');
    });

    it('should reflect size attribute to property', async () => {
      element = await fixture<SandoAvatar>(html`<sando-avatar></sando-avatar>`);
      element.setAttribute('size', 'lg');
      await element.updateComplete;

      expect(element.size).toBe('lg');
    });
  });

  // ─────────────────────────────────────────────
  // SHAPE PROP
  // ─────────────────────────────────────────────
  describe('Shape Prop', () => {
    it('should default to circle shape', async () => {
      element = await fixture<SandoAvatar>(html`<sando-avatar></sando-avatar>`);
      await element.updateComplete;

      expect(element.shape).toBe('circle');
      expect(element.getAttribute('shape')).toBe('circle');
    });

    it('should apply shape="rounded" attribute', async () => {
      element = await fixture<SandoAvatar>(html` <sando-avatar shape="rounded"></sando-avatar> `);
      await element.updateComplete;

      expect(element.shape).toBe('rounded');
      expect(element.getAttribute('shape')).toBe('rounded');
    });

    it('should update shape dynamically', async () => {
      element = await fixture<SandoAvatar>(html`<sando-avatar></sando-avatar>`);
      element.shape = 'rounded';
      await element.updateComplete;

      expect(element.shape).toBe('rounded');
      expect(element.getAttribute('shape')).toBe('rounded');
    });
  });

  // ─────────────────────────────────────────────
  // PRESENCE INDICATOR
  // ─────────────────────────────────────────────
  describe('Presence Indicator', () => {
    it('should NOT render presence indicator when presence="none"', async () => {
      element = await fixture<SandoAvatar>(html` <sando-avatar presence="none"></sando-avatar> `);
      await element.updateComplete;

      const indicator = element.shadowRoot?.querySelector('.avatar__presence');
      expect(indicator).toBeNull();
    });

    it('should NOT render presence indicator by default', async () => {
      element = await fixture<SandoAvatar>(html`<sando-avatar></sando-avatar>`);
      await element.updateComplete;

      const indicator = element.shadowRoot?.querySelector('.avatar__presence');
      expect(indicator).toBeNull();
    });

    const presenceStates = ['online', 'offline', 'busy', 'away'] as const;

    presenceStates.forEach((state) => {
      it(`should render presence indicator for presence="${state}"`, async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar presence=${state}></sando-avatar>
        `);
        await element.updateComplete;

        const indicator = element.shadowRoot?.querySelector('.avatar__presence');
        expect(indicator).not.toBeNull();
      });

      it(`should have class "avatar__presence--${state}" for presence="${state}"`, async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar presence=${state}></sando-avatar>
        `);
        await element.updateComplete;

        const indicator = element.shadowRoot?.querySelector('.avatar__presence');
        expect(indicator?.classList.contains(`avatar__presence--${state}`)).toBe(true);
      });
    });

    it('should have aria-hidden on presence dot (sr-only text provides the label)', async () => {
      element = await fixture<SandoAvatar>(html` <sando-avatar presence="online"></sando-avatar> `);
      await element.updateComplete;

      const dot = element.shadowRoot?.querySelector('.avatar__presence');
      expect(dot?.getAttribute('aria-hidden')).toBe('true');
    });

    it('should render sr-only text for presence "online"', async () => {
      element = await fixture<SandoAvatar>(html` <sando-avatar presence="online"></sando-avatar> `);
      await element.updateComplete;

      const srOnly = element.shadowRoot?.querySelector('.sr-only');
      expect(srOnly).not.toBeNull();
      expect(srOnly?.textContent).toContain('conectado');
    });

    it('should render sr-only text for presence "offline"', async () => {
      element = await fixture<SandoAvatar>(html`
        <sando-avatar presence="offline"></sando-avatar>
      `);
      await element.updateComplete;

      const srOnly = element.shadowRoot?.querySelector('.sr-only');
      expect(srOnly?.textContent).toContain('desconectado');
    });

    it('should render sr-only text for presence "busy"', async () => {
      element = await fixture<SandoAvatar>(html` <sando-avatar presence="busy"></sando-avatar> `);
      await element.updateComplete;

      const srOnly = element.shadowRoot?.querySelector('.sr-only');
      expect(srOnly?.textContent).toContain('ocupado');
    });

    it('should render sr-only text for presence "away"', async () => {
      element = await fixture<SandoAvatar>(html` <sando-avatar presence="away"></sando-avatar> `);
      await element.updateComplete;

      const srOnly = element.shadowRoot?.querySelector('.sr-only');
      expect(srOnly?.textContent).toContain('ausente');
    });

    it('should expose part="presence" on the indicator', async () => {
      element = await fixture<SandoAvatar>(html` <sando-avatar presence="busy"></sando-avatar> `);
      await element.updateComplete;

      const part = element.shadowRoot?.querySelector('[part="presence"]');
      expect(part).not.toBeNull();
    });

    describe('Presence Position', () => {
      const positions = ['top-start', 'top-end', 'bottom-start', 'bottom-end'] as const;

      positions.forEach((position) => {
        it(`should apply class "avatar__presence--${position}" for presencePosition="${position}"`, async () => {
          element = await fixture<SandoAvatar>(html`
            <sando-avatar presence="online" presence-position=${position}></sando-avatar>
          `);
          await element.updateComplete;

          const indicator = element.shadowRoot?.querySelector('.avatar__presence');
          expect(indicator?.classList.contains(`avatar__presence--${position}`)).toBe(true);
        });
      });

      it('should default to bottom-end position', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar presence="online"></sando-avatar>
        `);
        await element.updateComplete;

        const indicator = element.shadowRoot?.querySelector('.avatar__presence');
        expect(indicator?.classList.contains('avatar__presence--bottom-end')).toBe(true);
      });

      it('should reflect presence-position attribute', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar presence="online" presence-position="top-start"></sando-avatar>
        `);
        await element.updateComplete;

        expect(element.presencePosition).toBe('top-start');
        expect(element.getAttribute('presence-position')).toBe('top-start');
      });
    });
  });

  // ─────────────────────────────────────────────
  // LINK BEHAVIOR (href)
  // ─────────────────────────────────────────────
  describe('Link Behavior', () => {
    it('should render as <div> when no href is provided', async () => {
      element = await fixture<SandoAvatar>(html`<sando-avatar></sando-avatar>`);
      await element.updateComplete;

      const div = element.shadowRoot?.querySelector('div.avatar');
      expect(div).not.toBeNull();
    });

    it('should render as <a> when href is provided', async () => {
      element = await fixture<SandoAvatar>(html` <sando-avatar href="/profile"></sando-avatar> `);
      await element.updateComplete;

      const anchor = element.shadowRoot?.querySelector('a.avatar');
      expect(anchor).not.toBeNull();
    });

    it('should set href attribute on the anchor element', async () => {
      element = await fixture<SandoAvatar>(html`
        <sando-avatar href="/profile/rodrigo"></sando-avatar>
      `);
      await element.updateComplete;

      const anchor = element.shadowRoot?.querySelector('a');
      expect(anchor?.getAttribute('href')).toBe('/profile/rodrigo');
    });

    it('should NOT render as <a> when href is absent', async () => {
      element = await fixture<SandoAvatar>(html`<sando-avatar></sando-avatar>`);
      await element.updateComplete;

      const anchor = element.shadowRoot?.querySelector('a');
      expect(anchor).toBeNull();
    });

    it('should apply avatar--interactive class when href is set', async () => {
      element = await fixture<SandoAvatar>(html` <sando-avatar href="/profile"></sando-avatar> `);
      await element.updateComplete;

      const wrapper = element.shadowRoot?.querySelector('.avatar');
      expect(wrapper?.classList.contains('avatar--interactive')).toBe(true);
    });

    it('should NOT apply avatar--interactive class without href', async () => {
      element = await fixture<SandoAvatar>(html`<sando-avatar></sando-avatar>`);
      await element.updateComplete;

      const wrapper = element.shadowRoot?.querySelector('.avatar');
      expect(wrapper?.classList.contains('avatar--interactive')).toBe(false);
    });

    it('should set target attribute on anchor when provided', async () => {
      element = await fixture<SandoAvatar>(html`
        <sando-avatar href="/profile" target="_blank"></sando-avatar>
      `);
      await element.updateComplete;

      const anchor = element.shadowRoot?.querySelector('a');
      expect(anchor?.getAttribute('target')).toBe('_blank');
    });

    it('should add rel="noopener noreferrer" for target="_blank"', async () => {
      element = await fixture<SandoAvatar>(html`
        <sando-avatar href="/profile" target="_blank"></sando-avatar>
      `);
      await element.updateComplete;

      const anchor = element.shadowRoot?.querySelector('a');
      expect(anchor?.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('should NOT add rel attribute when target is "_self"', async () => {
      element = await fixture<SandoAvatar>(html`
        <sando-avatar href="/profile" target="_self"></sando-avatar>
      `);
      await element.updateComplete;

      const anchor = element.shadowRoot?.querySelector('a');
      // rel should be absent for same-window links
      expect(anchor?.getAttribute('rel')).toBeNull();
    });

    it('should NOT add rel attribute when no target is set', async () => {
      element = await fixture<SandoAvatar>(html` <sando-avatar href="/profile"></sando-avatar> `);
      await element.updateComplete;

      const anchor = element.shadowRoot?.querySelector('a');
      expect(anchor?.getAttribute('rel')).toBeNull();
    });
  });

  // ─────────────────────────────────────────────
  // ARIA LABELS
  // ─────────────────────────────────────────────
  describe('ARIA Labels', () => {
    it('should set aria-label "Avatar de {name}" when name is set (static)', async () => {
      element = await fixture<SandoAvatar>(html`
        <sando-avatar name="Rodrigo García"></sando-avatar>
      `);
      await element.updateComplete;

      const wrapper = element.shadowRoot?.querySelector('.avatar');
      expect(wrapper?.getAttribute('aria-label')).toBe('Avatar de Rodrigo García');
    });

    it('should set generic aria-label "Avatar de usuario" when no name (static)', async () => {
      element = await fixture<SandoAvatar>(html`<sando-avatar></sando-avatar>`);
      await element.updateComplete;

      const wrapper = element.shadowRoot?.querySelector('.avatar');
      expect(wrapper?.getAttribute('aria-label')).toBe('Avatar de usuario');
    });

    it('should set aria-label "Ir al perfil de {name}" when href + name', async () => {
      element = await fixture<SandoAvatar>(html`
        <sando-avatar href="/profile" name="Rodrigo García"></sando-avatar>
      `);
      await element.updateComplete;

      const anchor = element.shadowRoot?.querySelector('a');
      expect(anchor?.getAttribute('aria-label')).toBe('Ir al perfil de Rodrigo García');
    });

    it('should set aria-label "Ir al perfil" when href but no name', async () => {
      element = await fixture<SandoAvatar>(html` <sando-avatar href="/profile"></sando-avatar> `);
      await element.updateComplete;

      const anchor = element.shadowRoot?.querySelector('a');
      expect(anchor?.getAttribute('aria-label')).toBe('Ir al perfil');
    });

    it('should have role="img" on the static div wrapper', async () => {
      element = await fixture<SandoAvatar>(html`<sando-avatar></sando-avatar>`);
      await element.updateComplete;

      const div = element.shadowRoot?.querySelector('div.avatar');
      expect(div?.getAttribute('role')).toBe('img');
    });

    it('should NOT have role="img" on the anchor wrapper (native <a> semantics)', async () => {
      element = await fixture<SandoAvatar>(html` <sando-avatar href="/profile"></sando-avatar> `);
      await element.updateComplete;

      const anchor = element.shadowRoot?.querySelector('a');
      expect(anchor?.getAttribute('role')).toBeNull();
    });
  });

  // ─────────────────────────────────────────────
  // PROPERTY REFLECTION
  // ─────────────────────────────────────────────
  describe('Property Reflection', () => {
    it('should reflect href attribute', async () => {
      element = await fixture<SandoAvatar>(html` <sando-avatar href="/profile"></sando-avatar> `);
      await element.updateComplete;

      expect(element.href).toBe('/profile');
      expect(element.getAttribute('href')).toBe('/profile');
    });

    it('should reflect presence attribute', async () => {
      element = await fixture<SandoAvatar>(html` <sando-avatar presence="online"></sando-avatar> `);
      await element.updateComplete;

      expect(element.presence).toBe('online');
      expect(element.getAttribute('presence')).toBe('online');
    });

    it('should update href dynamically and switch to link rendering', async () => {
      element = await fixture<SandoAvatar>(html`<sando-avatar></sando-avatar>`);
      await element.updateComplete;

      expect(element.shadowRoot?.querySelector('div.avatar')).not.toBeNull();
      expect(element.shadowRoot?.querySelector('a')).toBeNull();

      element.href = '/new-profile';
      await element.updateComplete;

      expect(element.shadowRoot?.querySelector('a')).not.toBeNull();
    });

    it('should update presence dynamically and show indicator', async () => {
      element = await fixture<SandoAvatar>(html`<sando-avatar></sando-avatar>`);
      await element.updateComplete;

      expect(element.shadowRoot?.querySelector('.avatar__presence')).toBeNull();

      element.presence = 'busy';
      await element.updateComplete;

      expect(element.shadowRoot?.querySelector('.avatar__presence')).not.toBeNull();
    });

    it('should update name and show new initials', async () => {
      element = await fixture<SandoAvatar>(html`<sando-avatar name="John Doe"></sando-avatar>`);
      await element.updateComplete;

      let initials = element.shadowRoot?.querySelector('.avatar__initials');
      expect(initials?.textContent?.trim()).toBe('JD');

      element.name = 'Ana López';
      await element.updateComplete;

      initials = element.shadowRoot?.querySelector('.avatar__initials');
      expect(initials?.textContent?.trim()).toBe('AL');
    });
  });

  // ─────────────────────────────────────────────
  // FLAVOR SYSTEM
  // ─────────────────────────────────────────────
  describe('Flavor System', () => {
    it('should allow explicit flavor to be set', async () => {
      element = await fixture<SandoAvatar>(html`
        <sando-avatar flavor="strawberry"></sando-avatar>
      `);
      await element.updateComplete;

      expect(element.flavor).toBe('strawberry');
    });

    it('should use default flavor when none is specified', async () => {
      element = await fixture<SandoAvatar>(html`<sando-avatar></sando-avatar>`);
      await element.updateComplete;

      expect(element.effectiveFlavor).toBe('original');
    });

    it('should reflect flavor attribute', async () => {
      element = await fixture<SandoAvatar>(html`<sando-avatar></sando-avatar>`);
      await element.updateComplete;

      element.flavor = 'tonkatsu';
      await element.updateComplete;

      expect(element.getAttribute('flavor')).toBe('tonkatsu');
    });
  });

  // ─────────────────────────────────────────────
  // EDGE CASES
  // ─────────────────────────────────────────────
  describe('Edge Cases', () => {
    it('should handle presence state change from online to busy', async () => {
      element = await fixture<SandoAvatar>(html`<sando-avatar presence="online"></sando-avatar>`);
      await element.updateComplete;

      element.presence = 'busy';
      await element.updateComplete;

      const indicator = element.shadowRoot?.querySelector('.avatar__presence');
      expect(indicator?.classList.contains('avatar__presence--busy')).toBe(true);
      expect(indicator?.classList.contains('avatar__presence--online')).toBe(false);
    });

    it('should handle presence change to "none" and remove indicator', async () => {
      element = await fixture<SandoAvatar>(html`<sando-avatar presence="online"></sando-avatar>`);
      await element.updateComplete;

      element.presence = 'none';
      await element.updateComplete;

      expect(element.shadowRoot?.querySelector('.avatar__presence')).toBeNull();
    });

    it('should render all sizes with image', async () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

      for (const size of sizes) {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar size=${size} src="/photo.jpg" name="Test"></sando-avatar>
        `);
        await element.updateComplete;

        expect(element.size).toBe(size);
        expect(element.shadowRoot?.querySelector('img')).not.toBeNull();
      }
    });

    it('should render all sizes with initials', async () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

      for (const size of sizes) {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar size=${size} name="Test User"></sando-avatar>
        `);
        await element.updateComplete;

        expect(element.size).toBe(size);
        expect(element.shadowRoot?.querySelector('.avatar__initials')).not.toBeNull();
      }
    });

    it('should handle all presence states with all positions', async () => {
      const presenceStates = ['online', 'offline', 'busy', 'away'] as const;
      const positions = ['top-start', 'top-end', 'bottom-start', 'bottom-end'] as const;

      for (const state of presenceStates) {
        for (const pos of positions) {
          element = await fixture<SandoAvatar>(html`
            <sando-avatar presence=${state} presence-position=${pos}></sando-avatar>
          `);
          await element.updateComplete;

          const indicator = element.shadowRoot?.querySelector('.avatar__presence');
          expect(indicator).not.toBeNull();
          expect(indicator?.classList.contains(`avatar__presence--${state}`)).toBe(true);
          expect(indicator?.classList.contains(`avatar__presence--${pos}`)).toBe(true);
        }
      }
    });

    it('should render both shapes with all fallback types', async () => {
      const shapes = ['circle', 'rounded'] as const;

      for (const shape of shapes) {
        // Icon fallback
        element = await fixture<SandoAvatar>(html` <sando-avatar shape=${shape}></sando-avatar> `);
        await element.updateComplete;
        expect(element.shape).toBe(shape);
        expect(element.shadowRoot?.querySelector('.avatar__icon')).not.toBeNull();

        // Initials fallback
        element = await fixture<SandoAvatar>(html`
          <sando-avatar shape=${shape} name="Test User"></sando-avatar>
        `);
        await element.updateComplete;
        expect(element.shape).toBe(shape);
        expect(element.shadowRoot?.querySelector('.avatar__initials')).not.toBeNull();
      }
    });
  });
});
