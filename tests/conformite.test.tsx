// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import fs from 'node:fs';
import type { ReactElement } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MentionsLegales from '../src/routes/MentionsLegales';
import Confidentialite from '../src/routes/Confidentialite';
import TransparenceIA from '../src/routes/TransparenceIA';
import Accessibilite from '../src/routes/Accessibilite';

afterEach(cleanup);

const rendre = (page: ReactElement) => render(<MemoryRouter>{page}</MemoryRouter>);

describe('conformité et partage', () => {
  it('documente l’auteur, l’hébergeur et la licence', () => {
    const { container } = rendre(<MentionsLegales />);
    const texte = container.textContent ?? '';
    expect(texte).toContain('Geoffroy Streit');
    expect(texte).toContain('Hostinger International Limited');
    expect(texte).toContain('AGPL-3.0-or-later');
    expect(texte).toContain('geoffroy.streit@gmail.com');
  });

  it('documente les journaux, le stockage local et les droits RGPD', () => {
    const { container } = rendre(<Confidentialite />);
    const texte = container.textContent ?? '';
    expect(texte).toContain('six mois');
    expect(texte).toContain('gestion-projet-it:');
    expect(texte).toContain('CNIL');
    expect(texte).toContain('Royaume-Uni');
    expect(texte).toContain('19 décembre 2025');
  });

  it('documente les illustrations et l’absence d’IA au runtime', () => {
    const { container } = rendre(<TransparenceIA />);
    const texte = container.textContent ?? '';
    expect(texte).toContain('Z-Image-Turbo');
    expect(texte).toContain('Apache 2.0');
    expect(texte).toContain('Aucune IA au runtime');
    expect(texte).toContain('AI Act');
  });

  it('documente l’accessibilité et le contact', () => {
    const { container } = rendre(<Accessibilite />);
    const texte = container.textContent ?? '';
    expect(texte).toContain('WCAG 2.2 AA');
    expect(texte).toContain('geoffroy.streit@gmail.com');
  });

  it('publie les métadonnées sociales statiques et l’auteur', () => {
    const html = fs.readFileSync('index.html', 'utf8');
    expect(html).toContain('name="author" content="Geoffroy Streit"');
    expect(html).toContain('rel="canonical"');
    expect(html).toContain('property="og:image"');
    expect(html).toContain('name="twitter:card"');
    expect(html).toContain('apple-touch-icon');
  });

  it('fournit les icônes et l’image de partage aux bonnes dimensions', () => {
    const dimensions = (file: string) => {
      const buf = fs.readFileSync(file);
      return { largeur: buf.readUInt32BE(16), hauteur: buf.readUInt32BE(20) };
    };
    expect(dimensions('public/og-image.png')).toEqual({ largeur: 1200, hauteur: 630 });
    expect(dimensions('public/icon-192.png')).toEqual({ largeur: 192, hauteur: 192 });
    expect(dimensions('public/icon-512.png')).toEqual({ largeur: 512, hauteur: 512 });
    expect(dimensions('public/apple-touch-icon.png')).toEqual({ largeur: 180, hauteur: 180 });
    const manifest = JSON.parse(fs.readFileSync('public/manifest.webmanifest', 'utf8')) as { icons: Array<{ src: string; type: string }> };
    expect(manifest.icons.some((icone) => icone.src.endsWith('icon-192.png') && icone.type === 'image/png')).toBe(true);
    expect(manifest.icons.some((icone) => icone.src.endsWith('icon-512.png') && icone.type === 'image/png')).toBe(true);
  });

  it('fournit la licence AGPL complète', () => {
    const licence = fs.readFileSync('LICENSE', 'utf8');
    expect(licence).toContain('GNU AFFERO GENERAL PUBLIC LICENSE');
    expect(licence).toContain('Version 3, 19 November 2007');
    expect(fs.existsSync('public/LICENSE.txt')).toBe(true);
  });
});
