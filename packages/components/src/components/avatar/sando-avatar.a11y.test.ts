/**
 * Accessibility Tests for sando-avatar
 * Validates WCAG 2.1 Level AA compliance using axe-core.
 *
 * ## Avatar accessibility model
 * - Static avatar: <div role="img" aria-label="Avatar de {name}">
 * - Link avatar: <a aria-label="Ir al perfil de {name}">
 * - Presence indicator: aria-hidden dot + visually-hidden text (.sr-only)
 * - Image: meaningful alt from `alt` prop or `name` prop
 * - Initials/icon: aria-hidden (wrapper aria-label covers them)
 *
 * @see WCAG_COMPLIANCE.toon (WC-CR-R1, WC-CR-R2)
 * @see TEST_COVERAGE.toon (TC-CR-R2)
 * @see KEYBOARD_NAVIGATION.toon (KN-CR-R1)
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-avatar.js';
import type { SandoAvatar } from './sando-avatar.js';

describe('sando-avatar Accessibility', () => {
  let element: SandoAvatar;

  // ─────────────────────────────────────────────
  // AXE-CORE AUTOMATED VALIDATION
  // ─────────────────────────────────────────────
  describe('axe-core Validation', () => {
    describe('Default State', () => {
      it('should have no accessibility violations (no props)', async () => {
        element = await fixture<SandoAvatar>(html`<sando-avatar></sando-avatar>`);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations with name only', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar name="Rodrigo García"></sando-avatar>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations with image', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar src="/photo.jpg" name="Rodrigo García"></sando-avatar>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations as a link', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar href="/profile" name="Rodrigo García"></sando-avatar>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations as a link without name', async () => {
        element = await fixture<SandoAvatar>(html` <sando-avatar href="/profile"></sando-avatar> `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });
    });

    describe('Presence Indicator States', () => {
      it('should have no violations with presence="online"', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar name="Ana López" presence="online"></sando-avatar>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations with presence="offline"', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar name="Ana López" presence="offline"></sando-avatar>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations with presence="busy"', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar name="Carlos Ruiz" presence="busy"></sando-avatar>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations with presence="away"', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar name="María García" presence="away"></sando-avatar>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations for all presence states (batch)', async () => {
        const states = ['none', 'online', 'offline', 'busy', 'away'] as const;

        for (const state of states) {
          element = await fixture<SandoAvatar>(html`
            <sando-avatar name="Test User" presence=${state}></sando-avatar>
          `);
          await element.updateComplete;

          const results = await axe(element);
          expect(results).toHaveNoViolations();
        }
      });
    });

    describe('Size Variants', () => {
      it('should have no violations for all sizes (batch)', async () => {
        const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

        for (const size of sizes) {
          element = await fixture<SandoAvatar>(html`
            <sando-avatar size=${size} name="Test User"></sando-avatar>
          `);
          await element.updateComplete;

          const results = await axe(element);
          expect(results).toHaveNoViolations();
        }
      });
    });

    describe('Shape Variants', () => {
      it('should have no violations with shape="circle"', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar shape="circle" name="Test User"></sando-avatar>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations with shape="rounded"', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar shape="rounded" name="Test User"></sando-avatar>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });
    });

    describe('Fallback States', () => {
      it('should have no violations in icon fallback state (no name)', async () => {
        element = await fixture<SandoAvatar>(html`<sando-avatar></sando-avatar>`);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations in initials state', async () => {
        element = await fixture<SandoAvatar>(html` <sando-avatar name="John Doe"></sando-avatar> `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations after image error fallback', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar src="/broken.jpg" name="Rodrigo García"></sando-avatar>
        `);
        await element.updateComplete;

        // Simulate image load error → fallback to initials
        const img = element.shadowRoot?.querySelector('img') as HTMLImageElement;
        img?.dispatchEvent(new Event('error'));
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });
    });

    describe('Link Variants', () => {
      it('should have no violations for link with target="_blank"', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar href="/profile" target="_blank" name="Rodrigo García"></sando-avatar>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations for link with image', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar href="/profile" src="/photo.jpg" name="Rodrigo García"></sando-avatar>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations for link with presence indicator', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar href="/profile" name="Ana López" presence="online"></sando-avatar>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });
    });
  });

  // ─────────────────────────────────────────────
  // ARIA ATTRIBUTES
  // ─────────────────────────────────────────────
  describe('ARIA Attributes', () => {
    describe('Static Avatar (div)', () => {
      it('should have role="img" on non-interactive wrapper', async () => {
        element = await fixture<SandoAvatar>(html`<sando-avatar></sando-avatar>`);
        await element.updateComplete;

        const div = element.shadowRoot?.querySelector('div.avatar');
        expect(div?.getAttribute('role')).toBe('img');
      });

      it('should have descriptive aria-label when name is set', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar name="Rodrigo García"></sando-avatar>
        `);
        await element.updateComplete;

        const div = element.shadowRoot?.querySelector('div.avatar');
        expect(div?.getAttribute('aria-label')).toBe('Avatar de Rodrigo García');
      });

      it('should have generic aria-label when no name', async () => {
        element = await fixture<SandoAvatar>(html`<sando-avatar></sando-avatar>`);
        await element.updateComplete;

        const div = element.shadowRoot?.querySelector('div.avatar');
        expect(div?.getAttribute('aria-label')).toBe('Avatar de usuario');
      });

      it('should update aria-label when name changes', async () => {
        element = await fixture<SandoAvatar>(html` <sando-avatar name="John Doe"></sando-avatar> `);
        await element.updateComplete;

        element.name = 'Jane Smith';
        await element.updateComplete;

        const div = element.shadowRoot?.querySelector('div.avatar');
        expect(div?.getAttribute('aria-label')).toBe('Avatar de Jane Smith');
      });
    });

    describe('Link Avatar (a)', () => {
      it('should NOT have role="img" — link semantics are sufficient', async () => {
        element = await fixture<SandoAvatar>(html` <sando-avatar href="/profile"></sando-avatar> `);
        await element.updateComplete;

        const anchor = element.shadowRoot?.querySelector('a');
        expect(anchor?.getAttribute('role')).toBeNull();
      });

      it('should have descriptive aria-label on the anchor when name is set', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar href="/profile" name="Rodrigo García"></sando-avatar>
        `);
        await element.updateComplete;

        const anchor = element.shadowRoot?.querySelector('a');
        expect(anchor?.getAttribute('aria-label')).toBe('Ir al perfil de Rodrigo García');
      });

      it('should have generic aria-label on the anchor when no name', async () => {
        element = await fixture<SandoAvatar>(html` <sando-avatar href="/profile"></sando-avatar> `);
        await element.updateComplete;

        const anchor = element.shadowRoot?.querySelector('a');
        expect(anchor?.getAttribute('aria-label')).toBe('Ir al perfil');
      });
    });

    describe('Decorative Inner Elements', () => {
      it('should have aria-hidden on initials span', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar name="Test User"></sando-avatar>
        `);
        await element.updateComplete;

        const initials = element.shadowRoot?.querySelector('.avatar__initials');
        expect(initials?.getAttribute('aria-hidden')).toBe('true');
      });

      it('should render sando-icon as decorative for the fallback', async () => {
        element = await fixture<SandoAvatar>(html`<sando-avatar></sando-avatar>`);
        await element.updateComplete;

        const icon = element.shadowRoot?.querySelector('sando-icon.avatar__icon');
        expect(icon?.hasAttribute('decorative')).toBe(true);
      });

      it('should have aria-hidden on presence dot', async () => {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar presence="online"></sando-avatar>
        `);
        await element.updateComplete;

        const dot = element.shadowRoot?.querySelector('.avatar__presence');
        expect(dot?.getAttribute('aria-hidden')).toBe('true');
      });
    });
  });

  // ─────────────────────────────────────────────
  // PRESENCE — SCREEN READER SUPPORT
  // ─────────────────────────────────────────────
  describe('Presence Screen Reader Support', () => {
    it('should render visually-hidden text for presence "online"', async () => {
      element = await fixture<SandoAvatar>(html`
        <sando-avatar name="Test User" presence="online"></sando-avatar>
      `);
      await element.updateComplete;

      const srOnly = element.shadowRoot?.querySelector('.sr-only');
      expect(srOnly).not.toBeNull();
      expect(srOnly?.textContent).toContain('conectado');
    });

    it('should render visually-hidden text for presence "offline"', async () => {
      element = await fixture<SandoAvatar>(html`
        <sando-avatar name="Test User" presence="offline"></sando-avatar>
      `);
      await element.updateComplete;

      const srOnly = element.shadowRoot?.querySelector('.sr-only');
      expect(srOnly?.textContent).toContain('desconectado');
    });

    it('should render visually-hidden text for presence "busy"', async () => {
      element = await fixture<SandoAvatar>(html`
        <sando-avatar name="Test User" presence="busy"></sando-avatar>
      `);
      await element.updateComplete;

      const srOnly = element.shadowRoot?.querySelector('.sr-only');
      expect(srOnly?.textContent).toContain('ocupado');
    });

    it('should render visually-hidden text for presence "away"', async () => {
      element = await fixture<SandoAvatar>(html`
        <sando-avatar name="Test User" presence="away"></sando-avatar>
      `);
      await element.updateComplete;

      const srOnly = element.shadowRoot?.querySelector('.sr-only');
      expect(srOnly?.textContent).toContain('ausente');
    });

    it('should NOT render sr-only text when presence="none"', async () => {
      element = await fixture<SandoAvatar>(html`
        <sando-avatar name="Test User" presence="none"></sando-avatar>
      `);
      await element.updateComplete;

      const srOnly = element.shadowRoot?.querySelector('.sr-only');
      expect(srOnly).toBeNull();
    });
  });

  // ─────────────────────────────────────────────
  // IMAGE ACCESSIBILITY
  // ─────────────────────────────────────────────
  describe('Image Accessibility', () => {
    it('should have non-empty alt text when name is set', async () => {
      element = await fixture<SandoAvatar>(html`
        <sando-avatar src="/photo.jpg" name="Rodrigo García"></sando-avatar>
      `);
      await element.updateComplete;

      const img = element.shadowRoot?.querySelector('img');
      const alt = img?.getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt).toBe('Rodrigo García');
    });

    it('should use custom alt prop when provided', async () => {
      element = await fixture<SandoAvatar>(html`
        <sando-avatar src="/photo.jpg" name="Rodrigo" alt="Photo of Rodrigo smiling"></sando-avatar>
      `);
      await element.updateComplete;

      const img = element.shadowRoot?.querySelector('img');
      expect(img?.getAttribute('alt')).toBe('Photo of Rodrigo smiling');
    });

    it('should use empty alt when no name and no alt prop', async () => {
      element = await fixture<SandoAvatar>(html` <sando-avatar src="/photo.jpg"></sando-avatar> `);
      await element.updateComplete;

      const img = element.shadowRoot?.querySelector('img');
      // Empty alt is valid for decorative images — role="img" on wrapper provides label
      expect(img?.getAttribute('alt')).toBe('');
    });

    it('should have no axe violations with image and proper alt', async () => {
      element = await fixture<SandoAvatar>(html`
        <sando-avatar src="/photo.jpg" name="Rodrigo García"></sando-avatar>
      `);
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });

  // ─────────────────────────────────────────────
  // FOCUS MANAGEMENT
  // ─────────────────────────────────────────────
  describe('Focus Management', () => {
    it('should NOT be focusable when not a link', async () => {
      element = await fixture<SandoAvatar>(html`<sando-avatar></sando-avatar>`);
      await element.updateComplete;

      const div = element.shadowRoot?.querySelector('div.avatar') as HTMLElement;
      // div with role="img" is NOT in tab order (no tabindex)
      expect(div?.getAttribute('tabindex')).toBeNull();
    });

    it('should be keyboard-accessible when rendered as a link', async () => {
      element = await fixture<SandoAvatar>(html`
        <sando-avatar href="/profile" name="Rodrigo García"></sando-avatar>
      `);
      await element.updateComplete;

      // <a href> is natively focusable without tabindex
      const anchor = element.shadowRoot?.querySelector('a');
      expect(anchor).not.toBeNull();
      expect(anchor?.getAttribute('href')).toBeTruthy();
    });

    it('should have no axe violations regarding focus on link avatar', async () => {
      element = await fixture<SandoAvatar>(html`
        <sando-avatar href="/profile" name="Rodrigo García"></sando-avatar>
      `);
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });

  // ─────────────────────────────────────────────
  // THEME / FLAVOR SUPPORT
  // ─────────────────────────────────────────────
  describe('Theme/Flavor Support', () => {
    it('should have no violations with flavor="strawberry"', async () => {
      element = await fixture<SandoAvatar>(html`
        <sando-avatar name="Test User" flavor="strawberry"></sando-avatar>
      `);
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('should maintain aria attributes when flavor changes', async () => {
      element = await fixture<SandoAvatar>(html` <sando-avatar name="Test User"></sando-avatar> `);
      await element.updateComplete;

      element.setAttribute('flavor', 'tonkatsu');
      await element.updateComplete;

      const div = element.shadowRoot?.querySelector('div.avatar');
      expect(div?.getAttribute('role')).toBe('img');
      expect(div?.getAttribute('aria-label')).toBe('Avatar de Test User');
    });

    it('should have no violations across multiple flavors', async () => {
      const flavors = ['original', 'strawberry', 'kiwi'];

      for (const flavor of flavors) {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar name="Test User" flavor=${flavor}></sando-avatar>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      }
    });
  });

  // ─────────────────────────────────────────────
  // COMPLEX COMBINATIONS
  // ─────────────────────────────────────────────
  describe('Complex Combinations', () => {
    it('should have no violations: link + image + presence + size', async () => {
      element = await fixture<SandoAvatar>(html`
        <sando-avatar
          href="/profile"
          src="/photo.jpg"
          name="Rodrigo García"
          size="lg"
          presence="online"
          presence-position="top-end"
        ></sando-avatar>
      `);
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations: static + initials + all presence positions', async () => {
      const positions = ['top-start', 'top-end', 'bottom-start', 'bottom-end'] as const;

      for (const pos of positions) {
        element = await fixture<SandoAvatar>(html`
          <sando-avatar name="Ana López" presence="busy" presence-position=${pos}></sando-avatar>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      }
    });

    it('should have no violations for rounded shape with link', async () => {
      element = await fixture<SandoAvatar>(html`
        <sando-avatar href="/profile" name="John Doe" shape="rounded" size="xl"></sando-avatar>
      `);
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });
});
