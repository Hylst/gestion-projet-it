export interface IaSource {
  organisme: string;
  titre: string;
  version: string;
  url: string;
}

export const SOURCES = {
  aiAct: {
    organisme: 'Union européenne',
    titre: 'règlement sur l’intelligence artificielle',
    version: 'Règlement (UE) 2024/1689',
    url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj',
  },
  cnil: {
    organisme: 'CNIL',
    titre: 'intelligence artificielle',
    version: 'page de référence, consultée en octobre 2026',
    url: 'https://www.cnil.fr/fr/intelligence-artificielle',
  },
  nist: {
    organisme: 'NIST',
    titre: 'AI Risk Management Framework',
    version: 'NIST AI 100-1, 2023',
    url: 'https://www.nist.gov/itl/ai-risk-management-framework',
  },
  iso42001: {
    organisme: 'ISO',
    titre: 'ISO/IEC 42001:2023, systèmes de management de l’IA',
    version: '2023',
    url: 'https://www.iso.org/standard/42001',
  },
  oecd: {
    organisme: 'OCDE',
    titre: 'principes sur l’intelligence artificielle',
    version: 'mis à jour en 2024',
    url: 'https://www.oecd.org/fr/themes/principes-de-l-ia.html',
  },
} satisfies Record<string, IaSource>;
