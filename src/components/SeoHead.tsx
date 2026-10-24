// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { canonicalUrl } from '../lib/seo';

export { canonicalUrl };

export function SeoHead(props: { title: string; description: string; noindex?: boolean }) {
  React.useEffect(() => {
    document.title = props.title.includes('Gestion de Projet IT') ? props.title : `${props.title}\u00A0: Gestion de Projet IT`;
    const set = (attr: 'name' | 'property', key: string, value: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute('content', value);
    };
    set('name', 'description', props.description);
    set('name', 'robots', props.noindex ? 'noindex' : 'index, follow');
    set('property', 'og:title', props.title);
    set('property', 'og:description', props.description);
    set('property', 'og:url', canonicalUrl());
    set('property', 'og:type', 'website');
    set('property', 'og:image', 'https://hylst.fr/gestion-projet-it/og-image.png');
    set('name', 'twitter:card', 'summary_large_image');
    set('name', 'twitter:title', props.title);
    set('name', 'twitter:description', props.description);
    set('name', 'twitter:image', 'https://hylst.fr/gestion-projet-it/og-image.png');
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.href = canonicalUrl();
  }, [props.title, props.description, props.noindex]);
  return null;
}
