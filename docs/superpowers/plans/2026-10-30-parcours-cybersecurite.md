# Parcours Cybersécurité Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ouvrir un parcours Cybersécurité autonome de six routes, sans XP, avec un hub, cinq pages thématiques, la recherche, le glossaire, le sitemap, le service worker et un audit d’accessibilité.

**Architecture:** Un registre `src/cyber/pages.ts` décrit les six routes et leurs sections. Un gabarit `CyberLayout` reprend la structure de la section IA avec les classes `cyber-*`. Les six pages composent le gabarit. La recherche, le glossaire et le sitemap sont étendus sans modifier les modules existants. Les laboratoires restent hors de ce lot.

**Tech Stack:** Vite, React 19, TypeScript strict, React Router 7, CSS existant, Vitest, Testing Library, Playwright, Lighthouse.

**Spec:** `docs/superpowers/specs/2026-10-30-parcours-cybersecurite-design.md`

## Global Constraints

- Branche de travail : `feat/parcours-cybersecurite`, créée depuis `docs/parcours-cybersecurite` (qui contient la spec validée). Ne pas travailler directement sur `main`.
- Six routes : `/cybersecurite`, `/cybersecurite/menaces`, `/cybersecurite/acces`, `/cybersecurite/dependances`, `/cybersecurite/donnees`, `/cybersecurite/incident`.
- Aucun XP, aucun changement de `src/lib/xp.ts`, `src/lib/progress.tsx`, du compteur `0/9` ni des clés `gestion-projet-it:*`.
- Aucune dépendance nouvelle, aucun backend, aucun cookie, aucune requête externe, aucune ressource chargée automatiquement.
- Router : `basename="/gestion-projet-it/"`. Build : `--base=/gestion-projet-it/`.
- Charte : accents, apostrophe `’`, `&nbsp;` avant `: ; ? !`, guillemets français avec `&nbsp;` à l’intérieur, aucun tiret cadratin dans les textes rédigés.
- Les descriptions font moins de 160 caractères. Les titres de section sont uniques dans une page.
- Sources : schéma complet de `docs/sources.md`, URL `https://`, usage, limite, date de vérification. ISO/IEC 27001 est signalée payante.
- Sitemap : 31 URL. Service worker : `gestion-projet-it-v12`.
- Tests : `npm test`, `npm run lint`, `npm run typecheck`, `npm run check:liens`, `npm run build`, puis smoke Playwright.
- Lighthouse : le CLI peut sortir en code 1 sous Windows (`EPERM`) ; lire les scores dans le JSON produit.
- Aucune livraison Docker sans accord explicite.
- Chaque tâche se termine par un commit.

## Review Focus

- **Ancre de registre contre ancre rendue** : chaque `section.id` du registre doit exister dans le DOM, sinon le sommaire, la recherche et le smoke cassent. Test : `tests/cyber.test.tsx` et smoke des ancres.
- **Source externe chargée au chargement** : les sources sont de simples liens, jamais des images, iframes ou scripts. Test : `container.querySelectorAll('img, iframe, script, video')` vide et smoke sans requête externe.
- **Source incomplète** : une source sans usage, limite ou date de vérification viole `docs/sources.md`. Test : boucle sur `CYBER_SOURCES`.
- **Mention obsolète « parcours non ouvert »** : les pages Accessibilité et Ressources ne doivent plus contredire le parcours livré. Test : rendu de `Accessibilite` et `Ressources` dans `tests/cyber.test.tsx`.
- **Sitemap compté deux fois** : le nombre global doit vivre dans `tests/sitemap.test.ts` uniquement, sinon `tests/ia.test.tsx` échoue à 31 URL. Test : `tests/sitemap.test.ts` et retrait du compteur dans `tests/ia.test.tsx`.

---

## File Structure

Créer :

- `src/cyber/pages.ts` : registre des six pages et sections.
- `src/cyber/sources.ts` : six sources officielles datées.
- `src/cyber/CyberChecklist.tsx` : liste de contrôle.
- `src/cyber/CyberCallout.tsx` : encart éditorial.
- `src/cyber/CyberLayout.tsx` : gabarit commun.
- `src/cyber/content/Hub.tsx`, `Menaces.tsx`, `Acces.tsx`, `Dependances.tsx`, `Donnees.tsx`, `Incident.tsx`.
- `src/styles/cyber.css`.
- `tests/cyber.test.tsx`, `tests/sitemap.test.ts`.
- `docs/accessibilite/audit-2026-10-30-parcours-cybersecurite.md`.
- `docs/superpowers/plans/2026-10-30-parcours-cybersecurite.md` (ce plan).

Modifier :

- `src/App.tsx`, `src/components/SiteHeader.tsx`, `src/routes/accueil.tsx`.
- `src/lib/search.ts`, `src/components/SearchBar.tsx`, `src/lib/glossaire.ts`.
- `public/sitemap.xml`, `public/sw.js`.
- `tests/search.test.ts`, `tests/searchbar.test.tsx`, `tests/glossaire.test.ts`, `tests/header.test.tsx`, `tests/typo.test.tsx`, `tests/ia.test.tsx`.
- `smoke/smoke.spec.ts`.
- `src/routes/Accessibilite.tsx`, `src/routes/Ressources.tsx`.
- `README.md`, `BACKLOG.md`, `CHANGELOG.md`, `docs/README.md`, `docs/sources.md`, `docs/accessibilite/checklist-parcours.md`.

Ne pas modifier :

- `src/modules/**`, `src/lib/xp.ts`, `src/lib/progress.tsx`, `src/lib/capstone*`, `src/routes/DossierProjet.tsx`, `src/styles/capstone.css`.
- `src/ia/**` et `src/styles/ia.css`.
- `public/manifest.webmanifest`, les icônes, `offline.html`, `robots.txt`.
- `vite.config.ts`, `package.json`, `tsconfig.json`, `eslint.config.js`.

---

### Task 1: Socle cyber

**Files:**
- Create: `src/cyber/pages.ts`
- Create: `src/cyber/sources.ts`
- Create: `src/cyber/CyberChecklist.tsx`
- Create: `src/cyber/CyberCallout.tsx`
- Create: `src/cyber/CyberLayout.tsx`
- Create: `src/styles/cyber.css`
- Create: `tests/cyber.test.tsx`

**Interfaces:**
- Produces: `CYBER_PAGES: readonly CyberPageMeta[]`, `CYBER_SOURCES`, `CyberLayout`, `CyberChecklist`, `CyberCallout`.
- `CyberPageMeta` : `{ slug: string; path: string; titre: string; titreCourt: string; description: string; resume: string; sections: readonly CyberPageSection[]; motsCles?: readonly string[] }`.
- `CyberSource` : `{ organisme: string; titre: string; version: string; url: string; usage: string; limite: string; verifieLe: string; payant?: boolean }`.
- `CyberLayout` props : `{ meta: CyberPageMeta; intro: string; retenir: readonly string[]; checklist: readonly string[]; checklistTitre?: string; sources: readonly CyberSource[]; children: ReactNode }`.
- Consumed by: les six pages, `src/App.tsx`, `src/lib/search.ts`, les tests.

- [ ] **Step 1: Écrire le test du registre et du gabarit**

Créer `tests/cyber.test.tsx` avec exactement :

```tsx
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { ReactElement } from 'react';
import { CYBER_PAGES, type CyberPageMeta } from '../src/cyber/pages';
import { CYBER_SOURCES } from '../src/cyber/sources';
import { CyberLayout } from '../src/cyber/CyberLayout';

afterEach(() => {
  cleanup();
  document.title = '';
  document.head.querySelectorAll('meta[name="description"], meta[name="robots"], meta[property^="og:"], link[rel="canonical"]').forEach((el) => el.remove());
});

const rendre = (ui: ReactElement) => render(<MemoryRouter>{ui}</MemoryRouter>);

const page = (slug: string): CyberPageMeta => {
  const meta = CYBER_PAGES.find((candidate) => candidate.slug === slug);
  if (!meta) throw new Error(`Page cyber absente\u00A0: ${slug}`);
  return meta;
};

describe('registre cyber', () => {
  it('contient six pages uniques et completes', () => {
    expect(CYBER_PAGES).toHaveLength(6);
    expect(new Set(CYBER_PAGES.map((p) => p.slug)).size).toBe(6);
    expect(new Set(CYBER_PAGES.map((p) => p.path)).size).toBe(6);
    for (const p of CYBER_PAGES) {
      expect(p.path.startsWith('/cybersecurite')).toBe(true);
      expect(p.description.length).toBeLessThan(160);
      expect(p.sections.length).toBeGreaterThanOrEqual(5);
      expect(new Set(p.sections.map((s) => s.id)).size).toBe(p.sections.length);
    }
  });

  it('fournit des sources completes et conformes a la politique', () => {
    for (const source of Object.values(CYBER_SOURCES)) {
      expect(source.organisme.length).toBeGreaterThan(2);
      expect(source.titre.length).toBeGreaterThan(3);
      expect(source.version.length).toBeGreaterThan(2);
      expect(source.url).toMatch(/^https:\/\//);
      expect(source.usage.length).toBeGreaterThan(10);
      expect(source.limite.length).toBeGreaterThan(10);
      expect(source.verifieLe).toBe('30 octobre 2026');
    }
    expect(CYBER_SOURCES.iso27001.payant).toBe(true);
  });
});

describe('gabarit cyber', () => {
  const meta = page('cybersecurite');

  it('rend le titre, le sommaire, les ancres, les sources et les reperes', () => {
    const { container } = rendre(
      <CyberLayout
        meta={meta}
        intro="Introduction de test."
        retenir={['Point un.']}
        checklist={['Item un.']}
        sources={[CYBER_SOURCES.anssi, CYBER_SOURCES.iso27001]}
      >
        {meta.sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2>{section.label}</h2>
            <p>Contenu.</p>
          </section>
        ))}
      </CyberLayout>,
    );
    expect(screen.getByRole('heading', { level: 1, name: meta.titre })).not.toBeNull();
    const nav = screen.getByRole('navigation', { name: 'Sommaire de la page' });
    for (const section of meta.sections) {
      expect(nav.querySelector(`a[href="#${section.id}"]`)?.textContent).toBe(section.label);
      expect(document.getElementById(section.id)).not.toBeNull();
    }
    expect(screen.getByRole('heading', { level: 2, name: 'À retenir' })).not.toBeNull();
    expect(screen.getByRole('heading', { level: 2, name: 'Checklist' })).not.toBeNull();
    expect(screen.getByText('Veille arrêtée en octobre 2026.')).not.toBeNull();
    expect(screen.getByText(/Usage\s*:\s*Trouver les guides d’hygiène et de réponse à incident\./)).not.toBeNull();
    expect(screen.getByText(/Limite\s*:\s*Pas de diagnostic d’infrastructure\./)).not.toBeNull();
    expect(screen.getAllByText('Vérifié le 30 octobre 2026.')).toHaveLength(2);
    expect(screen.getByText('Norme payante.')).not.toBeNull();
    const sources = Array.from(container.querySelectorAll('.cyber-sources a'));
    expect(sources).toHaveLength(2);
    for (const source of sources) {
      expect(source.getAttribute('target')).toBe('_blank');
      expect(source.getAttribute('rel')).toBe('noopener noreferrer');
    }
    expect(container.querySelectorAll('img, iframe, script, video')).toHaveLength(0);
  });

  it('propose le lien suivant et aucun precedent sur le hub', () => {
    rendre(
      <CyberLayout meta={meta} intro="Intro." retenir={['Un.']} checklist={['Un.']} sources={[CYBER_SOURCES.anssi]}>
        <section id="pourquoi"><h2>Pourquoi</h2></section>
      </CyberLayout>,
    );
    const nav = screen.getByRole('navigation', { name: 'Navigation dans le parcours Cybersécurité' });
    expect(nav.querySelector('a[href="/cybersecurite"]')).toBeNull();
    expect(nav.querySelector('a[href="/cybersecurite/menaces"]')).not.toBeNull();
  });
});
```

- [ ] **Step 2: Lancer le test pour le voir échouer**

Run : `npm test -- tests/cyber.test.tsx`

Expected : échec de résolution de `../src/cyber/pages`, `../src/cyber/sources` ou `../src/cyber/CyberLayout`.

- [ ] **Step 3: Écrire le registre**

Créer `src/cyber/pages.ts` avec les interfaces ci-dessus et exactement ces six entrées, dans cet ordre :

| Page | `titre` | `titreCourt` | Sections |
| --- | --- | --- | --- |
| `/cybersecurite` | Cybersécurité et gestion de projet | Introduction | `pourquoi`, `pas-un-produit`, `cinq-questions`, `carte`, `humain`, `suite` |
| `/cybersecurite/menaces` | Menaces et modèle de menace | Menaces | `actifs`, `menaces`, `modele`, `surface`, `proportionner`, `verifier` |
| `/cybersecurite/acces` | Accès, rôles et secrets | Accès | `comptes`, `privileges`, `mfa`, `secrets`, `revue`, `compromission` |
| `/cybersecurite/dependances` | Dépendances, fournisseurs et chaîne logicielle | Dépendances | `cartographie`, `versions`, `fournisseurs`, `chaine`, `sortie`, `veille` |
| `/cybersecurite/donnees` | Données, RGPD et AI Act | Données | `classer`, `rgpd`, `bases`, `aiact`, `cycle`, `droits` |
| `/cybersecurite/incident` | Incident, sauvegarde et reprise | Incident | `detecter`, `confiner`, `decider`, `reprendre`, `apprendre`, `preparer` |

Libellés de section exacts :

1. Hub : « Pourquoi la sécurité entre dans le projet », « Ce que la sécurité n’est pas », « Cinq questions avant de traiter un risque », « Carte du parcours », « Ce qui reste humain », « La suite du parcours ».
2. Menaces : « Actifs et valeur », « Menaces plausibles », « Construire un modèle de menace », « Surface d’attaque », « Proportionner les parades », « Vérifier et mettre à jour ».
3. Accès : « Comptes et identités », « Moindre privilège », « Authentification et mots de passe », « Secrets et clés », « Revue des accès », « En cas de compromission ».
4. Dépendances : « Cartographier les dépendances », « Versions et vulnérabilités », « Fournisseurs et contrats », « Chaîne de build et provenance », « Plan de sortie », « Veille et réponse ».
5. Données : « Classer les données », « Principes RGPD », « Bases légales et rôles », « AI Act », « Cycle de vie », « Droits et incidents ».
6. Incident : « Détecter et qualifier », « Confiner et préserver », « Décider et communiquer », « Reprendre », « Apprendre », « Préparer ».

Descriptions et résumés exacts :

```ts
// Hub
description: 'Cybersécurité et gestion de projet\u00A0: menaces, accès, dépendances, données et incidents, avec des repères défensifs pour étudiants et juniors.',
resume: 'Un parcours pour traiter la sécurité comme une qualité du projet, sans dogme ni promesse de sécurité totale.',
// Menaces
description: 'Menaces et modèle de menace\u00A0: actifs, attaquants, chemins d’attaque, surface et parades proportionnées pour un projet informatique.',
resume: 'Identifier ce qui compte, contre quoi le protéger et par où un incident peut arriver.',
// Accès
description: 'Accès, rôles et secrets\u00A0: comptes nominatifs, moindre privilège, authentification multifacteur, coffre et révocation.',
resume: 'Réduire les droits, protéger les comptes et traiter les secrets comme des données sensibles.',
// Dépendances
description: 'Dépendances, fournisseurs et chaîne logicielle\u00A0: versions, vulnérabilités, build, contrat, sortie et veille.',
resume: 'Savoir ce qui entre dans le projet, qui le fournit et comment sortir sans perdre les données.',
// Données
description: 'Données, RGPD et AI Act\u00A0: classification, bases légales, rôles, cycle de vie, droits et incidents.',
resume: 'Classer les données, limiter leur usage et connaître les obligations sans se substituer à un juriste.',
// Incident
description: 'Incident, sauvegarde et reprise\u00A0: détection, confinement, communication, restauration, retour d’expérience et préparation.',
resume: 'Réagir sans improviser, préserver les preuves et restaurer un service testé.',
```

`motsCles` par page :

```ts
['cybersecurite', 'securite', 'risque', 'hygiene numerique', 'projet']
['menace', 'modele de menace', 'actif', 'surface attaque', 'phishing', 'ransomware']
['acces', 'role', 'moindre privilege', 'mfa', 'mot de passe', 'secret', 'revocation']
['dependance', 'fournisseur', 'chaine logicielle', 'vulnerabilite', 'build', 'sortie']
['donnees', 'rgpd', 'ai act', 'donnee personnelle', 'base legale', 'conservation']
['incident', 'sauvegarde', 'reprise', 'confinement', 'restauration', 'retour experience', 'rancongiciel', 'ransomware']
```

- [ ] **Step 4: Écrire les sources**

Créer `src/cyber/sources.ts` avec exactement ces entrées, sous les clés `anssi`, `cnil`, `owasp`, `nist`, `iso27001`, `aiAct` :

| Clé | Organisme | Titre | Version | URL | Usage | Limite | Payant |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `anssi` | ANSSI | Guides d’hygiène et de réponse à incident | Site en ligne | `https://cyber.gouv.fr/` | Trouver les guides d’hygiène et de réponse à incident. | Pas de diagnostic d’infrastructure. | non |
| `cnil` | CNIL | RGPD | Version en ligne | `https://www.cnil.fr/fr/rgpd-de-quoi-parle-t-on` | Comprendre les principes de données personnelles. | Pas de conseil juridique personnalisé. | non |
| `owasp` | OWASP | Top 10 | Édition 2021 | `https://owasp.org/www-project-top-ten/` | Identifier les risques web courants. | Liste de sensibilisation, pas un audit complet. | non |
| `nist` | NIST | Cybersecurity Framework | CSF 2.0, 2024 | `https://www.nist.gov/cyberframework` | Situer identifier, protéger, détecter, répondre et rétablir. | Cadre volontaire, pas une méthode de projet. | non |
| `iso27001` | ISO | ISO/IEC 27001:2022 | 2022 | `https://www.iso.org/standard/27001` | Structurer un système de management de la sécurité. | Norme payante, non reproduite ici. | oui |
| `aiAct` | Union européenne | Règlement sur l’intelligence artificielle | Règlement (UE) 2024/1689 | `https://eur-lex.europa.eu/eli/reg/2024/1689/oj` | Situer les obligations de transparence et les niveaux de risque. | Pas un conseil juridique. | non |

`verifieLe: '30 octobre 2026'` pour les six. Exporter `CYBER_SOURCES` avec `satisfies Record<string, CyberSource>`.

- [ ] **Step 5: Écrire la checklist, l’encart et le gabarit**

Créer `CyberChecklist` sur le modèle de `src/ia/IaChecklist.tsx`, avec `className="cyber-checklist"` et le même `aria-labelledby`.

Créer `CyberCallout` sur le modèle de `src/ia/IaCallout.tsx`, avec `className={`cyber-callout cyber-callout--${variante}`}`.

Créer `CyberLayout` en copiant `src/ia/IaLayout.tsx`, puis :

- remplacer `IA_PAGES` par `CYBER_PAGES` et `IaPageMeta` par `CyberPageMeta` ;
- remplacer `ia-` par `cyber-` dans toutes les classes ;
- remplacer le kicker par « Parcours Cybersécurité » ;
- remplacer `aria-label="Navigation dans la section IA"` par `aria-label="Navigation dans le parcours Cybersécurité"` ;
- ajouter sous chaque lien de source : `Usage&nbsp;: {source.usage}`, `Limite&nbsp;: {source.limite}`, `Vérifié le {source.verifieLe}.` et, si `source.payant`, `Norme payante.` ;
- garder « Veille arrêtée en octobre 2026. » et le lien `target="_blank" rel="noopener noreferrer"` avec `sr-only` « (nouvel onglet) ».

- [ ] **Step 6: Ajouter les styles**

Créer `src/styles/cyber.css` en copiant `src/styles/ia.css`, puis remplacer `.ia-` par `.cyber-`. Ajouter en tête :

```css
.theme-cyber { --accent: #334155; --accent-ink: #1e293b; --accent-soft: #edf1f5; --accent-line: #cbd5e1; --accent-wash: #f8fafc; }
```

Ajouter les styles des sources :

```css
.cyber-source-usage, .cyber-source-limite { margin: 0.15rem 0 0; font-size: 0.88rem; color: var(--c-muted); }
.cyber-source-date { margin: 0.1rem 0 0.6rem; font-size: 0.82rem; color: var(--c-muted); }
.cyber-source-payant { font-weight: 700; }
```

- [ ] **Step 7: Lancer le test et corriger**

Run : `npm test -- tests/cyber.test.tsx`

Expected : 4 tests passent.

- [ ] **Step 8: Vérifier le typage et le lint**

Run : `npm run typecheck && npm run lint`

Expected : aucune erreur.

- [ ] **Step 9: Commit**

```bash
git add src/cyber src/styles/cyber.css tests/cyber.test.tsx
git commit -m "feat: socle du parcours cybersecurite"
```

---

### Task 2: Page hub `/cybersecurite`

**Files:**
- Create: `src/cyber/content/Hub.tsx`
- Modify: `tests/cyber.test.tsx`
- Modify: `tests/typo.test.tsx`

**Interfaces:**
- Consumes: `CyberLayout`, `CyberCallout`, `CYBER_PAGES`, `CYBER_SOURCES`.
- Produces: `export function CyberHubPage(): JSX.Element`.

- [ ] **Step 1: Ajouter le test du hub**

Ajouter en tête de `tests/cyber.test.tsx` : `import { CyberHubPage } from '../src/cyber/content/Hub';`

Ajouter à la fin :

```tsx
describe('hub cyber', () => {
  it('expose les cinq questions et les liens vers les pages', () => {
    rendre(<CyberHubPage />);
    expect(document.querySelectorAll('#cinq-questions li')).toHaveLength(5);
    expect(screen.getByRole('link', { name: 'Menaces et modèle de menace' })).not.toBeNull();
    expect(screen.getByText('Sur Les Amis du Square, le site stocke des contacts d’adhérents. Le projet identifie les données, les comptes et les sauvegardes avant l’ouverture.')).not.toBeNull();
  });
});
```

- [ ] **Step 2: Lancer le test pour le voir échouer**

Run : `npm test -- tests/cyber.test.tsx`

Expected : échec de résolution de `../src/cyber/content/Hub`.

- [ ] **Step 3: Écrire la page hub**

Créer `src/cyber/content/Hub.tsx` avec `meta = CYBER_PAGES[0]` et une garde explicite. Contenu imposé par la spec, section 5.2 :

- intro : « La cybersécurité n’est pas un projet à part. C’est une qualité du projet, au même titre que le délai, le budget ou l’accessibilité. Ce parcours propose des repères pour identifier les actifs, réduire les chemins d’attaque et réagir sans improviser. »
- `pourquoi` : trois paragraphes sur les actifs, les incidents possibles et la sécurité comme qualité du projet.
- `pas-un-produit` : liste de cinq points, dont « La sécurité n’est pas un produit qu’on installe. », « Elle ne se réduit pas à un audit ponctuel. », « Elle n’est pas seulement technique. ».
- `cinq-questions` : `<ol>` de cinq `<li>` avec les questions exactes de la spec, chacune suivie d’une phrase d’explication. Écrire `&nbsp;?` à la fin de chaque question.
- Encart `CyberCallout` titre « Fil rouge », variante `fil`, avec exactement : « Sur Les Amis du Square, le site stocke des contacts d’adhérents. Le projet identifie les données, les comptes et les sauvegardes avant l’ouverture. »
- `carte` : liste `.cyber-carte` avec `CYBER_PAGES.slice(1)` ; chaque carte utilise `.module-card`, un `span.module-kicker` « Parcours Cybersécurité », un `Link.titre` vers `page.path` et `page.resume`. Le libellé du lien est exactement `page.titre`.
- `humain` : liste de quatre responsabilités non délégables.
- `suite` : deux paragraphes qui annoncent les cinq pages et rappellent l’absence de XP et de certification.
- `retenir` : quatre phrases de la spec.
- `checklist` : six items, dont « J’ai nommé ce que je protège. », « J’ai relié chaque risque à une parade et à un responsable. », « J’ai vérifié les accès et les sauvegardes avant la mise en ligne. ».
- `sources` : `CYBER_SOURCES.anssi`, `.cnil`, `.owasp`, `.nist`.

- [ ] **Step 4: Ajouter la page au test de charte**

Dans `tests/typo.test.tsx`, ajouter l’import `import { CyberHubPage } from '../src/cyber/content/Hub';` et la ligne `['/cybersecurite', <CyberHubPage />],` dans `PAGES`.

- [ ] **Step 5: Lancer les tests**

Run : `npm test -- tests/cyber.test.tsx tests/typo.test.tsx`

Expected : les tests passent.

- [ ] **Step 6: Lint et typecheck**

Run : `npm run typecheck && npm run lint`

Expected : aucune erreur.

- [ ] **Step 7: Commit**

```bash
git add src/cyber/content/Hub.tsx tests/cyber.test.tsx tests/typo.test.tsx
git commit -m "feat: page hub du parcours cybersecurite"
```

---

### Task 3: Page menaces `/cybersecurite/menaces`

**Files:**
- Create: `src/cyber/content/Menaces.tsx`
- Modify: `tests/cyber.test.tsx`
- Modify: `tests/typo.test.tsx`

**Interfaces:**
- Produces: `export function CyberMenacesPage(): JSX.Element`.

- [ ] **Step 1: Ajouter le test**

Ajouter l’import `import { CyberMenacesPage } from '../src/cyber/content/Menaces';` et à la fin :

```tsx
describe('menaces cyber', () => {
  it('expose le modele, la surface et les parades', () => {
    rendre(<CyberMenacesPage />);
    const table = screen.getByRole('table', { name: 'Modèle de menace' });
    expect(table.querySelectorAll('tbody tr')).toHaveLength(5);
    expect(screen.getByRole('heading', { level: 2, name: 'Construire un modèle de menace' })).not.toBeNull();
    expect(screen.getByText(/Un modèle de menace n’est pas une garantie/)).not.toBeNull();
  });
});
```

- [ ] **Step 2: Lancer le test pour le voir échouer**

Run : `npm test -- tests/cyber.test.tsx`

Expected : échec de résolution de `../src/cyber/content/Menaces`.

- [ ] **Step 3: Écrire la page**

Créer `src/cyber/content/Menaces.tsx` avec `meta = CYBER_PAGES[1]`. Contenu de la spec, section 5.3 :

- intro : « Une menace n’est pas une abstraction. Elle se décrit par un actif, un attaquant plausible, un chemin et un impact. Le modèle de menace sert à choisir les parades qui comptent, pas à tout prévoir. »
- `actifs` : données, comptes, service, réputation, personnes, sauvegardes.
- `menaces` : hameçonnage, vol d’identifiants, rançongiciel, erreur humaine, insider, fournisseur compromis, dépendance vulnérable.
- `modele` : quatre temps (actifs, attaquants, chemins, parades). Tableau `Modèle de menace` avec cinq lignes, colonnes `Actif`, `Menace`, `Chemin`, `Impact`, `Parade`.
- `surface` : navigateur, comptes, dépendances, fournisseurs, bâtiment, personnes.
- `proportionner` : réduire, éviter, transférer, accepter. Critère : impact, vraisemblance, coût, réversibilité.
- Encart `CyberCallout` titre « Limite », variante `limite` : « Un modèle de menace n’est pas une garantie. C’est une liste priorisée à revoir à chaque jalon. »
- `verifier` : revue aux jalons, retour d’incident, mise à jour du registre.
- `retenir` : quatre phrases.
- `checklist` : sept items.
- `sources` : `anssi`, `owasp`, `nist`.

- [ ] **Step 4: Ajouter la page au test de charte**

Dans `tests/typo.test.tsx`, importer `CyberMenacesPage` et ajouter `['/cybersecurite/menaces', <CyberMenacesPage />],`.

- [ ] **Step 5: Lancer les tests**

Run : `npm test -- tests/cyber.test.tsx tests/typo.test.tsx`

Expected : les tests passent.

- [ ] **Step 6: Lint et typecheck**

Run : `npm run typecheck && npm run lint`

Expected : aucune erreur.

- [ ] **Step 7: Commit**

```bash
git add src/cyber/content/Menaces.tsx tests/cyber.test.tsx tests/typo.test.tsx
git commit -m "feat: page menaces du parcours cybersecurite"
```

---

### Task 4: Page accès `/cybersecurite/acces`

**Files:**
- Create: `src/cyber/content/Acces.tsx`
- Modify: `tests/cyber.test.tsx`
- Modify: `tests/typo.test.tsx`

**Interfaces:**
- Produces: `export function CyberAccesPage(): JSX.Element`.

- [ ] **Step 1: Ajouter le test**

Ajouter l’import `import { CyberAccesPage } from '../src/cyber/content/Acces';` et à la fin :

```tsx
describe('acces cyber', () => {
  it('expose la matrice, les secrets et la revocation', () => {
    rendre(<CyberAccesPage />);
    const table = screen.getByRole('table', { name: 'Matrice des accès' });
    expect(table.querySelectorAll('tbody tr')).toHaveLength(4);
    expect(screen.getByRole('heading', { level: 2, name: 'Moindre privilège' })).not.toBeNull();
    expect(screen.getByText('Un secret retiré du code doit aussi être révoqué.')).not.toBeNull();
  });
});
```

- [ ] **Step 2: Lancer le test pour le voir échouer**

Run : `npm test -- tests/cyber.test.tsx`

Expected : échec de résolution de `../src/cyber/content/Acces`.

- [ ] **Step 3: Écrire la page**

Créer `src/cyber/content/Acces.tsx` avec `meta = CYBER_PAGES[2]`. Contenu de la spec, section 5.4 :

- intro : « Les accès sont la première couche pratique. Un compte partagé, un droit trop large ou un secret dans un dépôt suffisent à ouvrir une brèche. »
- `comptes` : comptes nominatifs, arrivée, mobilité, départ, revue.
- `privileges` : séparation des rôles, administrateur distinct, juste à temps, revue trimestrielle.
- `mfa` : MFA, gestionnaire de mots de passe, passkeys, pas de compte partagé.
- `secrets` : jamais dans le code, les journaux ou un ticket. Coffre, rotation, révocation. Encart `CyberCallout` titre « Secret », variante `limite`, avec exactement « Un secret retiré du code doit aussi être révoqué. »
- `revue` : preuve de retrait, matrice des accès. Tableau `Matrice des accès` avec quatre lignes, colonnes `Rôle`, `Besoin`, `Accès`, `Contrôle`.
- `compromission` : révoquer, tourner les secrets, isoler, enquêter, communiquer.
- `retenir` : quatre phrases.
- `checklist` : sept items.
- `sources` : `anssi`, `cnil`, `nist`.

- [ ] **Step 4: Ajouter la page au test de charte**

Dans `tests/typo.test.tsx`, importer `CyberAccesPage` et ajouter `['/cybersecurite/acces', <CyberAccesPage />],`.

- [ ] **Step 5: Lancer les tests**

Run : `npm test -- tests/cyber.test.tsx tests/typo.test.tsx`

Expected : les tests passent.

- [ ] **Step 6: Lint et typecheck**

Run : `npm run typecheck && npm run lint`

Expected : aucune erreur.

- [ ] **Step 7: Commit**

```bash
git add src/cyber/content/Acces.tsx tests/cyber.test.tsx tests/typo.test.tsx
git commit -m "feat: page acces du parcours cybersecurite"
```

---

### Task 5: Page dépendances `/cybersecurite/dependances`

**Files:**
- Create: `src/cyber/content/Dependances.tsx`
- Modify: `tests/cyber.test.tsx`
- Modify: `tests/typo.test.tsx`

**Interfaces:**
- Produces: `export function CyberDependancesPage(): JSX.Element`.

- [ ] **Step 1: Ajouter le test**

Ajouter l’import `import { CyberDependancesPage } from '../src/cyber/content/Dependances';` et à la fin :

```tsx
describe('dependances cyber', () => {
  it('expose la chaine, les fournisseurs et le plan de sortie', () => {
    rendre(<CyberDependancesPage />);
    const table = screen.getByRole('table', { name: 'Dépendances et parades' });
    expect(table.querySelectorAll('tbody tr')).toHaveLength(5);
    expect(screen.getByRole('heading', { level: 2, name: 'Chaîne de build et provenance' })).not.toBeNull();
    expect(screen.getByText(/Le test de la panne/)).not.toBeNull();
  });
});
```

- [ ] **Step 2: Lancer le test pour le voir échouer**

Run : `npm test -- tests/cyber.test.tsx`

Expected : échec de résolution de `../src/cyber/content/Dependances`.

- [ ] **Step 3: Écrire la page**

Créer `src/cyber/content/Dependances.tsx` avec `meta = CYBER_PAGES[3]`. Contenu de la spec, section 5.5 :

- intro : « Un projet est une chaîne de dépendances. Certaines sont du code, d’autres des services, des fournisseurs ou des personnes. Ce qui n’est pas cartographié ne peut pas être surveillé. »
- `cartographie` : dépendances directes, transitives, services, fournisseurs, chaîne de build.
- `versions` : fichier de verrouillage, audit, politique de mise à jour, fin de vie.
- `fournisseurs` : données, localisation, sous-traitants, sécurité, sortie, contrat, contact incident.
- `chaine` : permissions minimales, secrets, artefacts, revue des actions, reproductibilité.
- `sortie` : export, alternative, restitution des données, délai. Encart `CyberCallout` titre « Le test de la panne », variante `limite`, avec exactement « Si le fournisseur disparaît demain, que reste-t-il ? Les sources, les décisions et les compétences de l’équipe. »
- Tableau `Dépendances et parades` avec cinq lignes, colonnes `Dépendance`, `Risque`, `Parade`, `Preuve`.
- `veille` : avis de sécurité, fenêtre de correctif, contact incident.
- `retenir` : quatre phrases.
- `checklist` : sept items.
- `sources` : `owasp`, `nist`, `anssi`, `iso27001`.

- [ ] **Step 4: Ajouter la page au test de charte**

Dans `tests/typo.test.tsx`, importer `CyberDependancesPage` et ajouter `['/cybersecurite/dependances', <CyberDependancesPage />],`.

- [ ] **Step 5: Lancer les tests**

Run : `npm test -- tests/cyber.test.tsx tests/typo.test.tsx`

Expected : les tests passent.

- [ ] **Step 6: Lint et typecheck**

Run : `npm run typecheck && npm run lint`

Expected : aucune erreur.

- [ ] **Step 7: Commit**

```bash
git add src/cyber/content/Dependances.tsx tests/cyber.test.tsx tests/typo.test.tsx
git commit -m "feat: page dependances du parcours cybersecurite"
```

---

### Task 6: Page données `/cybersecurite/donnees`

**Files:**
- Create: `src/cyber/content/Donnees.tsx`
- Modify: `tests/cyber.test.tsx`
- Modify: `tests/typo.test.tsx`

**Interfaces:**
- Produces: `export function CyberDonneesPage(): JSX.Element`.

- [ ] **Step 1: Ajouter le test**

Ajouter l’import `import { CyberDonneesPage } from '../src/cyber/content/Donnees';` et à la fin :

```tsx
describe('donnees cyber', () => {
  it('expose la classification, le RGPD et l AI Act', () => {
    rendre(<CyberDonneesPage />);
    const table = screen.getByRole('table', { name: 'Classification des données' });
    expect(table.querySelectorAll('tbody tr')).toHaveLength(5);
    expect(screen.getByRole('heading', { level: 2, name: 'AI Act' })).not.toBeNull();
    expect(screen.getByText(/Ce contenu n’est pas un conseil juridique/)).not.toBeNull();
  });
});
```

- [ ] **Step 2: Lancer le test pour le voir échouer**

Run : `npm test -- tests/cyber.test.tsx`

Expected : échec de résolution de `../src/cyber/content/Donnees`.

- [ ] **Step 3: Écrire la page**

Créer `src/cyber/content/Donnees.tsx` avec `meta = CYBER_PAGES[4]`. Contenu de la spec, section 5.6 :

- intro : « Une donnée personnelle n’est pas un fichier comme un autre. Sa finalité, sa durée et ses accès se décident avant la mise en ligne. »
- `classer` : public, interne, confidentiel, personnel, sensible. Tableau `Classification des données` avec cinq lignes, colonnes `Niveau`, `Exemple`, `Accès`, `Conservation`.
- `rgpd` : finalité, minimisation, conservation, droits, sécurité, responsabilité.
- `bases` : responsable, sous-traitant, personne concernée. Bases : consentement, contrat, intérêt légitime, obligation légale. Ne pas conclure à la place d’un juriste.
- `aiact` : niveaux de risque, transparence, fournisseur et déployeur. Renvoi à `/ia/gouvernance`.
- `cycle` : collecter, stocker, partager, archiver, supprimer. Chiffrement, accès, sauvegardes.
- `droits` : accès, rectification, effacement, opposition, portabilité, notification d’incident.
- Encart `CyberCallout` titre « Pas un conseil juridique », variante `limite`, avec exactement : « Ce contenu n’est pas un conseil juridique. Pour un cas réel, consulter un juriste ou le référent données. »
- `retenir` : quatre phrases.
- `checklist` : sept items.
- `sources` : `cnil`, `aiAct`, `anssi`, `nist`.

- [ ] **Step 4: Ajouter la page au test de charte**

Dans `tests/typo.test.tsx`, importer `CyberDonneesPage` et ajouter `['/cybersecurite/donnees', <CyberDonneesPage />],`.

- [ ] **Step 5: Lancer les tests**

Run : `npm test -- tests/cyber.test.tsx tests/typo.test.tsx`

Expected : les tests passent.

- [ ] **Step 6: Lint et typecheck**

Run : `npm run typecheck && npm run lint`

Expected : aucune erreur.

- [ ] **Step 7: Commit**

```bash
git add src/cyber/content/Donnees.tsx tests/cyber.test.tsx tests/typo.test.tsx
git commit -m "feat: page donnees du parcours cybersecurite"
```

---

### Task 7: Page incident `/cybersecurite/incident`

**Files:**
- Create: `src/cyber/content/Incident.tsx`
- Modify: `tests/cyber.test.tsx`
- Modify: `tests/typo.test.tsx`

**Interfaces:**
- Produces: `export function CyberIncidentPage(): JSX.Element`.

- [ ] **Step 1: Ajouter le test**

Ajouter l’import `import { CyberIncidentPage } from '../src/cyber/content/Incident';` et à la fin :

```tsx
describe('incident cyber', () => {
  it('expose la chronologie, la reprise et la sauvegarde testee', () => {
    rendre(<CyberIncidentPage />);
    const table = screen.getByRole('table', { name: 'Chronologie d’incident' });
    expect(table.querySelectorAll('tbody tr')).toHaveLength(5);
    expect(screen.getByRole('heading', { level: 2, name: 'Reprendre' })).not.toBeNull();
    expect(screen.getByText('Une sauvegarde non testée n’est pas une sauvegarde.')).not.toBeNull();
  });
});
```

- [ ] **Step 2: Lancer le test pour le voir échouer**

Run : `npm test -- tests/cyber.test.tsx`

Expected : échec de résolution de `../src/cyber/content/Incident`.

- [ ] **Step 3: Écrire la page**

Créer `src/cyber/content/Incident.tsx` avec `meta = CYBER_PAGES[5]`. Contenu de la spec, section 5.7 :

- intro : « Un incident se prépare avant d’arriver. Les premières minutes servent à qualifier, confiner et préserver les preuves, pas à improviser une communication. »
- `detecter` : signaux, gravité, périmètre, données, service.
- `confiner` : isoler, révoquer, préserver les preuves, ne pas effacer.
- `decider` : cellule de crise, rôles, communication interne et externe, juriste, CNIL si données personnelles.
- `reprendre` : sauvegardes, test de restauration, RTO et RPO, service prioritaire.
- `apprendre` : chronologie, cause, actions, responsables, échéances.
- `preparer` : playbook, contacts, exercice, test de sauvegarde. Encart `CyberCallout` titre « Sauvegarde », variante `limite`, avec exactement « Une sauvegarde non testée n’est pas une sauvegarde. »
- Tableau `Chronologie d’incident` avec cinq lignes, colonnes `Temps`, `Événement`, `Décision`, `Responsable`, `Preuve`.
- `retenir` : quatre phrases.
- `checklist` : sept items.
- `sources` : `anssi`, `cnil`, `nist`, `iso27001`.

- [ ] **Step 4: Ajouter la page au test de charte**

Dans `tests/typo.test.tsx`, importer `CyberIncidentPage` et ajouter `['/cybersecurite/incident', <CyberIncidentPage />],`.

- [ ] **Step 5: Lancer les tests**

Run : `npm test -- tests/cyber.test.tsx tests/typo.test.tsx`

Expected : les tests passent.

- [ ] **Step 6: Lint et typecheck**

Run : `npm run typecheck && npm run lint`

Expected : aucune erreur.

- [ ] **Step 7: Commit**

```bash
git add src/cyber/content/Incident.tsx tests/cyber.test.tsx tests/typo.test.tsx
git commit -m "feat: page incident du parcours cybersecurite"
```

---

### Task 8: Routes, header et accueil

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/SiteHeader.tsx`
- Modify: `src/routes/accueil.tsx`
- Modify: `tests/cyber.test.tsx`
- Modify: `tests/header.test.tsx`

**Interfaces:**
- Consumes: les six exports de `src/cyber/content/`, `CYBER_PAGES`.
- Produces: six routes, un lien « Sécurité » et une section d’accueil.

- [ ] **Step 1: Ajouter les tests du header**

Dans `tests/header.test.tsx`, ajouter au tableau `cas` :

```ts
['/cybersecurite', 'Sécurité'],
['/cybersecurite/menaces', 'Sécurité'],
```

Ajouter le test :

```ts
it('expose le lien Securite dans la navigation principale', () => {
  const { container } = rendu();
  const lien = container.querySelector('nav[aria-label="Navigation principale"] a[href="/cybersecurite"]');
  expect(lien?.textContent).toBe('Sécurité');
});
```

- [ ] **Step 2: Ajouter le test de l’accueil**

Dans `tests/cyber.test.tsx`, ajouter les imports `import Accueil from '../src/routes/accueil';`, `import { ProgressProvider } from '../src/lib/progress';` et à la fin :

```tsx
describe('accueil cyber', () => {
  it('expose la section et les cinq pages', () => {
    render(
      <ProgressProvider>
        <MemoryRouter>
          <Accueil />
        </MemoryRouter>
      </ProgressProvider>,
    );
    expect(screen.getByRole('heading', { level: 2, name: 'Cybersécurité et gestion de projet' })).not.toBeNull();
    expect(screen.getByRole('link', { name: 'Ouvrir le parcours Cybersécurité' })).not.toBeNull();
    for (const page of CYBER_PAGES.slice(1)) {
      expect(screen.getByRole('link', { name: page.titre })).not.toBeNull();
    }
  });
});
```

- [ ] **Step 3: Lancer les tests pour les voir échouer**

Run : `npm test -- tests/header.test.tsx tests/cyber.test.tsx`

Expected : le lien `/cybersecurite` est absent et la section d’accueil est absente.

- [ ] **Step 4: Ajouter les routes**

Dans `src/App.tsx`, ajouter les imports :

```tsx
const CyberHubPage = lazy(() => import('./cyber/content/Hub').then((m) => ({ default: m.CyberHubPage })));
const CyberMenacesPage = lazy(() => import('./cyber/content/Menaces').then((m) => ({ default: m.CyberMenacesPage })));
const CyberAccesPage = lazy(() => import('./cyber/content/Acces').then((m) => ({ default: m.CyberAccesPage })));
const CyberDependancesPage = lazy(() => import('./cyber/content/Dependances').then((m) => ({ default: m.CyberDependancesPage })));
const CyberDonneesPage = lazy(() => import('./cyber/content/Donnees').then((m) => ({ default: m.CyberDonneesPage })));
const CyberIncidentPage = lazy(() => import('./cyber/content/Incident').then((m) => ({ default: m.CyberIncidentPage })));
```

Ajouter les routes après `/ia/gouvernance` et avant `/module-:num` :

```tsx
<Route path="/cybersecurite" element={<CyberHubPage />} />
<Route path="/cybersecurite/menaces" element={<CyberMenacesPage />} />
<Route path="/cybersecurite/acces" element={<CyberAccesPage />} />
<Route path="/cybersecurite/dependances" element={<CyberDependancesPage />} />
<Route path="/cybersecurite/donnees" element={<CyberDonneesPage />} />
<Route path="/cybersecurite/incident" element={<CyberIncidentPage />} />
```

- [ ] **Step 5: Ajouter le lien header**

Dans `src/components/SiteHeader.tsx`, ajouter après le lien IA :

```tsx
<NavLink to="/cybersecurite">Sécurité</NavLink>
```

- [ ] **Step 6: Ajouter la section d’accueil**

Dans `src/routes/accueil.tsx`, ajouter les imports `import { CYBER_PAGES } from '../cyber/pages';` et `import '../styles/cyber.css';`. Ajouter après la section IA :

```tsx
<section className="cyber-accueil theme-cyber" aria-labelledby="cyber-accueil-titre">
  <h2 id="cyber-accueil-titre">Cybersécurité et gestion de projet</h2>
  <p>
    Un parcours autonome pour identifier les actifs, réduire les accès et réagir sans improviser. Aucun XP, aucune obligation de parcours.
  </p>
  <p><Link className="btn" to="/cybersecurite">Ouvrir le parcours Cybersécurité</Link></p>
  <div className="cyber-carte">
    {CYBER_PAGES.slice(1).map((page) => (
      <div className="module-card" key={page.slug}>
        <span className="module-kicker">Parcours Cybersécurité</span>
        <Link className="titre" to={page.path}>{page.titre}</Link>
        <p className="resume">{page.resume}</p>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 7: Lancer les tests**

Run : `npm test -- tests/header.test.tsx tests/cyber.test.tsx tests/typo.test.tsx`

Expected : les tests passent.

- [ ] **Step 8: Lint et typecheck**

Run : `npm run typecheck && npm run lint`

Expected : aucune erreur.

- [ ] **Step 9: Commit**

```bash
git add src/App.tsx src/components/SiteHeader.tsx src/routes/accueil.tsx tests/header.test.tsx tests/cyber.test.tsx
git commit -m "feat: routes, header et accueil du parcours cybersecurite"
```

---

### Task 9: Recherche et glossaire

**Files:**
- Modify: `src/lib/search.ts`
- Modify: `src/components/SearchBar.tsx`
- Modify: `src/lib/glossaire.ts`
- Modify: `tests/search.test.ts`
- Modify: `tests/searchbar.test.tsx`
- Modify: `tests/glossaire.test.ts`

**Interfaces:**
- Produces: `CyberSearchHit`, `isCyberHit`, les six pages dans `buildIndex`, dix termes de glossaire.
- `CyberSearchHit` : `{ type: 'cyber'; pageTitre: string; path: string; section: string; ancre: string; label: string; needles: string }`.

- [ ] **Step 1: Ajouter les tests de recherche**

Dans `tests/search.test.ts`, ajouter les imports `isCyberHit` et `CYBER_PAGES`, puis :

```ts
it('indexe les six pages cyber et leurs sections', () => {
  const cyber = index.filter(isCyberHit);
  expect(new Set(cyber.map((h) => h.path))).toEqual(new Set(CYBER_PAGES.map((p) => p.path)));
  for (const page of CYBER_PAGES) {
    for (const section of page.sections) {
      expect(cyber.some((h) => h.path === page.path && h.ancre === section.id)).toBe(true);
    }
  }
});

it('trouve les pages cyber par mot cle', () => {
  const phishing = searchIndex(index, 'phishing');
  expect(phishing.some((h) => isCyberHit(h) && h.path === '/cybersecurite/menaces')).toBe(true);
  const ransomware = searchIndex(index, 'ransomware');
  expect(ransomware.some((h) => isCyberHit(h) && h.path === '/cybersecurite/incident')).toBe(true);
  const rgpd = searchIndex(index, 'rgpd');
  expect(rgpd.some((h) => isCyberHit(h) && h.path === '/cybersecurite/donnees')).toBe(true);
});
```

Dans `tests/searchbar.test.tsx`, ajouter une route et un test :

```tsx
function CibleCyber() {
  return (<section id="actifs"><h1>Menaces</h1></section>);
}
```

Ajouter `<Route path="/cybersecurite/menaces" element={<CibleCyber />} />` dans `App`, puis :

```tsx
it('navigue vers une page cyber et scrolle la section cible', async () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText('Rechercher dans le cours'), { target: { value: 'phishing' } });
  fireEvent.click(screen.getAllByRole('button', { name: /Menaces/ })[0] as HTMLElement);
  await waitFor(() => expect(screen.getByRole('heading', { level: 1, name: 'Menaces' })).not.toBeNull());
  expect(scrollIntoView).toHaveBeenCalledTimes(1);
  const cible = scrollIntoView.mock.instances[0] as HTMLElement;
  expect(cible.id).toBe('actifs');
});
```

- [ ] **Step 2: Lancer les tests pour les voir échouer**

Run : `npm test -- tests/search.test.ts tests/searchbar.test.tsx`

Expected : `isCyberHit` absent et aucune page cyber dans l’index.

- [ ] **Step 3: Étendre la recherche**

Dans `src/lib/search.ts` :

- importer `CYBER_PAGES` ;
- ajouter `CyberSearchHit` et `isCyberHit` ;
- ajouter `CyberSearchHit` à l’union `SearchHit` ;
- dans `buildIndex`, après la boucle IA, ajouter une boucle identique sur `CYBER_PAGES` avec `type: 'cyber'`, `pageTitre: page.titreCourt`, `label: `${page.titre}\u00A0: ${section.label}`` et `needles: normaliser(`${page.titre} ${page.resume} ${(page.motsCles ?? []).join(' ')} ${section.label}`)`.

Dans `src/components/SearchBar.tsx`, étendre la clé :

```tsx
key={h.type === 'module' ? `m-${h.moduleNum}-${h.ancre}` : h.type === 'ia' ? `ia-${h.path}-${h.ancre}` : h.type === 'cyber' ? `cyber-${h.path}-${h.ancre}` : `page-${h.path}`}
```

Le libellé `<>{h.pageTitre}</> <span>{h.section}</span>` fonctionne déjà pour `cyber`.

- [ ] **Step 4: Ajouter les termes de glossaire**

Dans `src/lib/glossaire.ts`, ajouter les dix termes avec les définitions et liens ci-dessous, puis remplacer le lien de « Modèle de menace » par `{ to: '/cybersecurite/menaces', label: 'Voir la page Menaces' }`.

| Terme | Définition | Lien |
| --- | --- | --- |
| Authentification multifacteur | Mécanisme qui demande au moins deux preuves d’identité de nature différente, par exemple un mot de passe et un code temporaire. | `/cybersecurite/acces` |
| Chiffrement | Transformation de données en une forme illisible sans clé, pour les protéger en transit ou au repos. | `/cybersecurite/donnees` |
| Contrôle d’accès | Ensemble des règles qui décident qui peut lire, modifier ou supprimer une ressource, et dans quelles conditions. | `/cybersecurite/acces` |
| Défense en profondeur | Stratégie qui empile plusieurs parades indépendantes, pour qu’une seule erreur ne suffise pas à tout compromettre. | `/cybersecurite/menaces` |
| Hygiène numérique | Gestes de base qui réduisent les risques courants : mises à jour, mots de passe uniques, sauvegardes et prudence face aux messages. | `/cybersecurite` |
| Incident de sécurité | Événement qui compromet ou menace la confidentialité, l’intégrité ou la disponibilité d’un système ou d’une donnée. | `/cybersecurite/incident` |
| Moindre privilège | Principe qui donne à chaque compte uniquement les droits nécessaires à sa tâche, pour la durée nécessaire. | `/cybersecurite/acces` |
| Phishing | Message trompeur qui pousse une personne à révéler une information, ouvrir une pièce jointe ou cliquer sur un lien. | `/cybersecurite/menaces` |
| Rançongiciel | Logiciel malveillant qui chiffre ou bloque des données et réclame un paiement pour les libérer. | `/cybersecurite/incident` |
| Surface d’attaque | Ensemble des points d’entrée par lesquels un attaquant peut tenter d’atteindre un système. | `/cybersecurite/menaces` |

Chaque définition fait entre 30 et 240 caractères, sans tiret cadratin. Le libellé de lien suit le modèle « Voir la page Menaces », « Voir la page Accès », etc.

- [ ] **Step 5: Ajouter les tests du glossaire**

Dans `tests/glossaire.test.ts`, ajouter :

```ts
it('contient les dix termes cyber et leurs liens', () => {
  const attendus = [
    'Authentification multifacteur',
    'Chiffrement',
    'Contrôle d’accès',
    'Défense en profondeur',
    'Hygiène numérique',
    'Incident de sécurité',
    'Moindre privilège',
    'Phishing',
    'Rançongiciel',
    'Surface d’attaque',
  ];
  for (const terme of attendus) {
    const entree = TERMES.find((t) => t.terme === terme);
    expect(entree, terme).toBeDefined();
    expect(entree?.lien?.to.startsWith('/cybersecurite')).toBe(true);
    expect(entree?.lien?.label.length).toBeGreaterThan(5);
  }
  expect(TERMES.find((t) => t.terme === 'Modèle de menace')?.lien?.to).toBe('/cybersecurite/menaces');
});
```

Modifier l’assertion existante qui attend `/ressources#parcours-cybersecurite` pour « Modèle de menace » : la remplacer par `/cybersecurite/menaces`.

- [ ] **Step 6: Lancer les tests**

Run : `npm test -- tests/search.test.ts tests/searchbar.test.tsx tests/glossaire.test.ts`

Expected : les tests passent.

- [ ] **Step 7: Lint et typecheck**

Run : `npm run typecheck && npm run lint`

Expected : aucune erreur.

- [ ] **Step 8: Commit**

```bash
git add src/lib/search.ts src/components/SearchBar.tsx src/lib/glossaire.ts tests/search.test.ts tests/searchbar.test.tsx tests/glossaire.test.ts
git commit -m "feat: recherche et glossaire du parcours cybersecurite"
```

---

### Task 10: Sitemap, service worker et smoke

**Files:**
- Modify: `public/sitemap.xml`
- Modify: `public/sw.js`
- Create: `tests/sitemap.test.ts`
- Modify: `tests/ia.test.tsx`
- Modify: `smoke/smoke.spec.ts`

**Interfaces:**
- Consumes: `CYBER_PAGES`.
- Produces: 31 URL dans le sitemap, service worker `v12`, smoke à 31 routes.

- [ ] **Step 1: Écrire le test du sitemap**

Créer `tests/sitemap.test.ts` :

```ts
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { CYBER_PAGES } from '../src/cyber/pages';
import { IA_PAGES } from '../src/ia/pages';

const xml = readFileSync('public/sitemap.xml', 'utf8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

describe('sitemap', () => {
  it('contient 31 URL uniques', () => {
    expect(urls).toHaveLength(31);
    expect(new Set(urls).size).toBe(31);
  });

  it('contient les routes IA et cyber', () => {
    for (const page of [...IA_PAGES, ...CYBER_PAGES]) {
      expect(urls).toContain(`https://hylst.fr/gestion-projet-it${page.path}`);
    }
  });
});
```

- [ ] **Step 2: Retirer le compteur global de `tests/ia.test.tsx`**

Supprimer le bloc `describe('sitemap IA', ...)` et l’import `readFileSync` devenu inutile. Le test global du sitemap appartient désormais à `tests/sitemap.test.ts`.

- [ ] **Step 3: Ajouter les six URL au sitemap**

Dans `public/sitemap.xml`, ajouter après `/ia/gouvernance` :

```xml
<url><loc>https://hylst.fr/gestion-projet-it/cybersecurite</loc></url>
<url><loc>https://hylst.fr/gestion-projet-it/cybersecurite/menaces</loc></url>
<url><loc>https://hylst.fr/gestion-projet-it/cybersecurite/acces</loc></url>
<url><loc>https://hylst.fr/gestion-projet-it/cybersecurite/dependances</loc></url>
<url><loc>https://hylst.fr/gestion-projet-it/cybersecurite/donnees</loc></url>
<url><loc>https://hylst.fr/gestion-projet-it/cybersecurite/incident</loc></url>
```

- [ ] **Step 4: Passer le service worker en v12**

Dans `public/sw.js`, remplacer `const version = 'gestion-projet-it-v11';` par `const version = 'gestion-projet-it-v12';`.

- [ ] **Step 5: Étendre le smoke**

Dans `smoke/smoke.spec.ts`, importer `CYBER_PAGES`, ajouter les six routes au tableau `routes`, ajouter `...Object.fromEntries(CYBER_PAGES.map((p) => [p.path, p.titre]))` à `routeTitres`, remplacer l’assertion `v11` par `v12`, puis ajouter le test :

```ts
test('parcours cyber : navigation, recherche, glossaire et impression', async ({ page }) => {
  await page.goto(`${base}/`);
  await page.getByRole('link', { name: 'Sécurité', exact: true }).click();
  await expect(page).toHaveURL(/\/cybersecurite$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Cybersécurité et gestion de projet' })).toBeVisible();

  await page.goto(`${base}/cybersecurite`);
  await page.getByLabel('Rechercher dans le cours').fill('phishing');
  const resultat = page.getByRole('button', { name: /Menaces/ }).first();
  await expect(resultat).toBeVisible();
  await resultat.click();
  await expect(page).toHaveURL(/\/cybersecurite\/menaces$/);
  await expect(page.locator('#actifs')).toBeInViewport();

  await page.goto(`${base}/glossaire`);
  await expect(page.getByText('Phishing', { exact: true })).toBeVisible();

  await page.goto(`${base}/cybersecurite/menaces`);
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.cyber-checklist')).toBeVisible();
  await expect(page.locator('.cyber-sommaire')).toBeHidden();
  await page.emulateMedia({ media: 'screen' });
});
```

- [ ] **Step 6: Lancer les tests et le contrôle des liens**

Run : `npm test -- tests/sitemap.test.ts tests/ia.test.tsx && npm run check:liens`

Expected : le test sitemap passe, le test IA passe, le contrôle affiche 31 routes et 31 URL.

- [ ] **Step 7: Lint et typecheck**

Run : `npm run typecheck && npm run lint`

Expected : aucune erreur.

- [ ] **Step 8: Commit**

```bash
git add public/sitemap.xml public/sw.js tests/sitemap.test.ts tests/ia.test.tsx smoke/smoke.spec.ts
git commit -m "feat: sitemap, service worker et smoke du parcours cybersecurite"
```

---

### Task 11: Documentation, sources et audit

**Files:**
- Modify: `src/routes/Accessibilite.tsx`
- Modify: `src/routes/Ressources.tsx`
- Modify: `README.md`
- Modify: `BACKLOG.md`
- Modify: `CHANGELOG.md`
- Modify: `docs/README.md`
- Modify: `docs/sources.md`
- Modify: `docs/accessibilite/checklist-parcours.md`
- Create: `docs/accessibilite/audit-2026-10-30-parcours-cybersecurite.md`
- Modify: `tests/cyber.test.tsx`

**Interfaces:**
- Consumes: les six pages, le sitemap et le service worker.
- Produces: documentation cohérente, sources vérifiées, audit d’accessibilité consigné.

- [ ] **Step 1: Corriger les mentions obsolètes dans les pages**

Dans `src/routes/Accessibilite.tsx`, remplacer le paragraphe « Les parcours Produit et Cybersécurité ne sont pas encore ouverts. Leur audit sera réalisé à leur livraison, selon la checklist interne. » par :

```text
Le parcours Cybersécurité a été audité le 30 octobre 2026. Le parcours Produit n’est pas encore ouvert ; son audit sera réalisé à sa livraison, selon la checklist interne.
```

Mettre à jour la date en bas de page.

Dans `src/routes/Ressources.tsx`, remplacer le paragraphe d’aide par :

```tsx
<p className="help">Le parcours Cybersécurité est ouvert. Le parcours Produit reste au backlog. Leurs ressources sont regroupées ici. <Link to="/cybersecurite">Ouvrir le parcours Cybersécurité</Link></p>
```

- [ ] **Step 2: Ajouter le test des copies**

Dans `tests/cyber.test.tsx`, ajouter les imports `Accessibilite` et `Ressources`, puis :

```tsx
describe('mentions du parcours', () => {
  it('ne présente plus la cybersécurité comme non ouverte', () => {
    const accessibilite = rendre(<Accessibilite />).container.textContent ?? '';
    expect(accessibilite).toContain('Le parcours Cybersécurité a été audité');
    const ressources = rendre(<Ressources />).container.textContent ?? '';
    expect(ressources).toContain('Le parcours Cybersécurité est ouvert');
    expect(ressources).not.toContain('Les pages des parcours Produit et Cybersécurité restent au backlog');
  });
});
```

- [ ] **Step 3: Mettre à jour la documentation**

- `README.md` : remplacer la phrase « Deux parcours futurs sont cadrés dans le backlog : Produit et Cybersécurité. Ils ne sont pas encore implémentés. » par « Le parcours Cybersécurité est ouvert avec un hub et cinq pages. Le parcours Produit reste cadré dans le backlog. » Ajouter les six routes au tableau des routes.
- `BACKLOG.md` : passer `CYB-001` à `CYB-006` et `CYB-008` en `Livré`, laisser `CYB-007` en `Candidat` pour le second lot. Ajouter une ligne au « Lot P1 livré » et mettre à jour la phrase de synthèse.
- `CHANGELOG.md` : ajouter une section `## [Non publié]` avec « Parcours Cybersécurité » et les vérifications réelles. Si la section existe déjà, fusionner sans dupliquer le titre.
- `docs/README.md` : ajouter le plan `2026-10-30-parcours-cybersecurite.md` en statut `Livré` et l’audit d’accessibilité dans la section Audits.
- `docs/sources.md` : ajouter une ligne au journal pour les six sources des pages cyber, avec la date et le résultat HTTP. Mettre à jour la phrase sur la relecture des parcours.
- `docs/accessibilite/checklist-parcours.md` : statut « Cybersécurité auditée le 30 octobre 2026, Produit en attente » et mise à jour de la section 7.

- [ ] **Step 4: Vérifier les sources externes**

Exécuter :

```bash
for url in \
  https://cyber.gouv.fr/ \
  https://www.cnil.fr/fr/rgpd-de-quoi-parle-t-on \
  https://owasp.org/www-project-top-ten/ \
  https://www.nist.gov/cyberframework \
  https://www.iso.org/standard/27001 \
  https://eur-lex.europa.eu/eli/reg/2024/1689/oj; do
  code=$(curl -sL -o /dev/null -w "%{http_code}" --max-time 20 "$url")
  echo "$code $url"
done
```

Expected : six réponses 200 ou 301/302 suivies vers 200. Consigner les résultats réels dans `docs/sources.md`. Si une URL échoue, la remplacer par une URL officielle stable et mettre à jour `src/cyber/sources.ts`.

- [ ] **Step 5: Exécuter la vérification complète**

```bash
npm test
npm run lint
npm run typecheck
npm run check:liens
npm run build
```

Expected : tests, lint, typecheck, liens et build passent. Noter le nombre de tests et de fichiers.

- [ ] **Step 6: Lancer le smoke**

Démarrer le preview :

```bash
MSYS_NO_PATHCONV=1 npx vite preview --host 127.0.0.1 --base=/gestion-projet-it/ --port 4182 --strictPort
```

Puis, dans un autre terminal :

```bash
SMOKE_BASE_URL=http://127.0.0.1:4182/gestion-projet-it npm run smoke
```

Expected : 31 routes rechargées, zéro erreur console, zéro requête externe, smoke cyber au vert.

- [ ] **Step 7: Lancer Lighthouse**

Sur le preview, exécuter Lighthouse mobile sur `/` et `/cybersecurite`, lire les scores dans les fichiers JSON et vérifier performance et accessibilité au moins 90. Consigner les scores réels.

- [ ] **Step 8: Écrire l’audit d’accessibilité**

Créer `docs/accessibilite/audit-2026-10-30-parcours-cybersecurite.md` avec :

- date, statut, périmètre des six routes ;
- méthode : tests de composants, smoke, Lighthouse, contrôle manuel ;
- tableau des contrôles : langue, titre unique, hiérarchie, repères, sommaire, focus, clavier, liens externes, contrastes, mouvement réduit, tableaux, impression ;
- scores Lighthouse réels ;
- résultats des tests et du smoke ;
- limites : pas de lecteur d’écran réel, scores dépendants du poste ;
- décision : conforme pour le périmètre, `QUA-001` reste ouvert pour Produit.

- [ ] **Step 9: Vérifier les mentions et les liens**

Run : `npm test -- tests/cyber.test.tsx tests/typo.test.tsx tests/glossaire.test.ts tests/sitemap.test.ts && npm run check:liens`

Expected : les tests passent, 31 routes et 31 URL, aucun lien cassé.

- [ ] **Step 10: Commit**

```bash
git add src/routes/Accessibilite.tsx src/routes/Ressources.tsx README.md BACKLOG.md CHANGELOG.md docs/README.md docs/sources.md docs/accessibilite/checklist-parcours.md docs/accessibilite/audit-2026-10-30-parcours-cybersecurite.md docs/superpowers/plans/2026-10-30-parcours-cybersecurite.md tests/cyber.test.tsx
git commit -m "docs: parcours cybersecurite, sources et audit"
```

---

## Final Verification

- [ ] `npm test` : tous les tests passent, noter le total.
- [ ] `npm run lint` : aucune erreur.
- [ ] `npm run typecheck` : aucune erreur.
- [ ] `npm run check:liens` : 31 routes, 31 URL, aucun lien cassé.
- [ ] `npm run build` : build réussi, aucun avertissement de taille.
- [ ] Smoke Playwright : 31 routes, zéro erreur console, zéro requête externe.
- [ ] Lighthouse mobile : accueil et `/cybersecurite` au moins 90 en performance et accessibilité.
- [ ] `git status` propre, branche `feat/parcours-cybersecurite` prête pour la pull request.
- [ ] Branche poussée et pull request ouverte, CI verte, fusion manuelle.
- [ ] Aucun fichier copié dans Docker.
