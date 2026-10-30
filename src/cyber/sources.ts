// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

export interface CyberSource {
  organisme: string;
  titre: string;
  version: string;
  url: string;
  usage: string;
  limite: string;
  verifieLe: string;
  payant?: boolean;
}

export const CYBER_SOURCES = {
  anssi: {
    organisme: 'ANSSI',
    titre: 'Guides d’hygiène et de réponse à incident',
    version: 'Site en ligne',
    url: 'https://cyber.gouv.fr/',
    usage: 'Trouver les guides d’hygiène et de réponse à incident.',
    limite: 'Pas de diagnostic d’infrastructure.',
    verifieLe: '30 octobre 2026',
  },
  cnil: {
    organisme: 'CNIL',
    titre: 'RGPD',
    version: 'Version en ligne',
    url: 'https://www.cnil.fr/fr/rgpd-de-quoi-parle-t-on',
    usage: 'Comprendre les principes de données personnelles.',
    limite: 'Pas de conseil juridique personnalisé.',
    verifieLe: '30 octobre 2026',
  },
  owasp: {
    organisme: 'OWASP',
    titre: 'Top 10',
    version: 'Édition 2021',
    url: 'https://owasp.org/www-project-top-ten/',
    usage: 'Identifier les risques web courants.',
    limite: 'Liste de sensibilisation, pas un audit complet.',
    verifieLe: '30 octobre 2026',
  },
  nist: {
    organisme: 'NIST',
    titre: 'Cybersecurity Framework',
    version: 'CSF 2.0, 2024',
    url: 'https://www.nist.gov/cyberframework',
    usage: 'Situer identifier, protéger, détecter, répondre et rétablir.',
    limite: 'Cadre volontaire, pas une méthode de projet.',
    verifieLe: '30 octobre 2026',
  },
  iso27001: {
    organisme: 'ISO',
    titre: 'ISO/IEC 27001:2022',
    version: '2022',
    url: 'https://www.iso.org/standard/27001',
    usage: 'Structurer un système de management de la sécurité.',
    limite: 'Norme payante, non reproduite ici.',
    verifieLe: '30 octobre 2026',
    payant: true,
  },
  aiAct: {
    organisme: 'Union européenne',
    titre: 'Règlement sur l’intelligence artificielle',
    version: 'Règlement (UE) 2024/1689',
    url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj',
    usage: 'Situer les obligations de transparence et les niveaux de risque.',
    limite: 'Pas un conseil juridique.',
    verifieLe: '30 octobre 2026',
  },
} satisfies Record<string, CyberSource>;
