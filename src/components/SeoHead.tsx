// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { canonicalUrl, OG_IMAGE_URL, SITE_NAME, SITE_PATH, SITE_URL } from '../lib/seo';

export { canonicalUrl };

export interface SeoHeadProps {
  title: string;
  description: string;
  noindex?: boolean;
  image?: string;
  type?: 'website' | 'article';
}

export function SeoHead(props: SeoHeadProps) {
  const image = props.image ?? OG_IMAGE_URL;
  const type = props.type ?? 'website';

  React.useEffect(() => {
    document.title = props.title.includes(SITE_NAME) ? props.title : `${props.title}\u00A0: ${SITE_NAME}`;
    const set = (attr: 'name' | 'property', key: string, value: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute('content', value);
    };
    set('name', 'description', props.description);
    set('name', 'robots', props.noindex ? 'noindex' : 'index, follow');
    set('name', 'application-name', SITE_NAME);
    set('property', 'og:site_name', SITE_NAME);
    set('property', 'og:locale', 'fr_FR');
    set('property', 'og:title', props.title);
    set('property', 'og:description', props.description);
    set('property', 'og:url', canonicalUrl());
    set('property', 'og:type', type);
    set('property', 'og:image', image);
    set('property', 'og:image:type', 'image/png');
    set('property', 'og:image:width', '1200');
    set('property', 'og:image:height', '630');
    set('property', 'og:image:alt', `Aperçu de ${props.title}`);
    set('name', 'twitter:card', 'summary_large_image');
    set('name', 'twitter:title', props.title);
    set('name', 'twitter:description', props.description);
    set('name', 'twitter:image', image);
    set('name', 'twitter:image:alt', `Aperçu de ${props.title}`);
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.href = canonicalUrl();
  }, [props.title, props.description, props.noindex, image, type]);

  return null;
}

export { SITE_NAME, SITE_PATH, SITE_URL };
