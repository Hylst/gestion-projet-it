import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { ModulePicto } from '../src/components/ModulePicto';

afterEach(cleanup);

describe('pictos de module', () => {
  it('les neuf numéros rendent un picto décoratif', () => {
    for (let num = 1; num <= 9; num += 1) {
      const { container, unmount } = render(<ModulePicto num={num} />);
      const svg = container.querySelector('svg.module-picto');
      expect(svg, `module ${num}`).not.toBeNull();
      expect(svg?.getAttribute('aria-hidden')).toBe('true');
      expect(svg?.getAttribute('focusable')).toBe('false');
      unmount();
    }
  });
});
