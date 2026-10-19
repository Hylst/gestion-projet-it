# Qualité du français du site : plan d’implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Accentuer et typographier correctement tout le texte visible du site, corriger six points éditoriaux, sans changer routes, scores ni stockage.

**Architecture:** Un test de garde `tests/typo.test.ts` rend chaque page et vérifie ponctuation, apostrophes et formes non accentuées. Le test grandit lot par lot : pages transverses, puis modules 1 à 3, 4 à 6, 7 à 9, puis corrections éditoriales. Aucune logique applicative ne change, sauf la normalisation du slug de `LaboFrame` (identifiants stables).

**Tech Stack:** Vite + React 18 + TypeScript, Vitest + Testing Library (jsdom), Playwright (smoke), Lighthouse mobile.

**Spec:** `docs/superpowers/specs/2026-10-19-qualite-francais-design.md`

## Global Constraints

- Accents partout, majuscules incluses : `Équipe`, `Méthodes`, `À propos`, `Étape`.
- Apostrophe typographique `’` dans tout le texte français visible.
- Espace insécable `U+00A0` avant `: ; ? !` et dans les guillemets `« »` ; aussi entre nombre et unité quand le cas existe (`5 min`, `100 %`).
- Aucun tiret cadratin `U+2014`. Les traits d’union restent.
- Noms propres et méthodes inchangés : Scrum, Kanban, Lean, XP, Waterfall, PERT, GANTT, Eisenhower, Docker, Jira, GitHub.
- Périmètre : `src/routes`, `src/components`, `src/modules`, `src/labos`, `src/lib/glossaire.ts`, `src/modules/index.ts`, `index.html`, `public/offline.html`. Exclus : identifiants, slugs, clés `localStorage`, URL, tests internes, docs, dossier plateforme.
- Ne jamais toucher au code (ternaires `?`, types `:`, opérateurs) : seulement les textes visibles et les attributs visibles (`aria-label`, `title`, descriptions).
- Commits uniquement avec l’accord explicite de l’utilisateur. Le plan propose un message par lot, mais l’exécutant demande avant de commiter.
- Gates par lot : `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run smoke`. Lighthouse en fin de cycle.
- La recherche doit rester insensible aux accents (`normaliser` retire les diacritiques) ; les tests le confirment.
- Ne pas resynchroniser le build plateforme avant la fin du cycle.

## Dictionnaire de correction

Chaque forme interdite est remplacée par sa forme correcte dans le texte visible uniquement.

| Interdit | Correct |
| --- | --- |
| a propos | À propos |
| a quoi | À quoi |
| a faire | À faire |
| a relire | À relire |
| a l aise | à l’aise |
| a cote | à côté |
| cote a cote | côte à côte |
| au dela | au-delà |
| peut etre | peut-être |
| apres | après |
| apparait | apparaît |
| arriere | arrière |
| annee, annees | année(s) |
| activite, activites | activité(s) |
| actualite, actualites | actualité(s) |
| ajoute, ajoutee, ajoutes, ajoutees | ajouté(e)(s) |
| benevole, benevoles | bénévole(s) |
| casse | cassé |
| chaine, chaines | chaîne(s) |
| cle, cles | clé(s) |
| coherent, coherents, coherente, coherentes | cohérent(e)(s) |
| controle | contrôle |
| couteux, couteuse, couteuses | coûteux, coûteuse, couteuses |
| cout, couts | coût(s) |
| cree, creer | créé, créer |
| croisee, croisees | croisée(s) |
| deja | déjà |
| delai, delais | délai(s) |
| demarche | démarche |
| depart | départ |
| dependance, dependances | dépendance(s) |
| derniere, dernieres | dernière(s) |
| developpement | développement |
| difference, differences | différence(s) |
| disponibilite | disponibilité |
| donnee, donnees | donnée(s) |
| debloquer, debloque, deblocage | débloquer, débloqué, déblocage |
| decouverte, decouvertes | découverte(s) |
| decouper, decoupage | découper, découpage |
| detecter, detecte | détecter, détecte |
| ecart, ecarts | écart(s) |
| echoue, echouer, echec | échoue, échouer, échec |
| ecole, ecoles | école(s) |
| ecran, ecrans | écran(s) |
| ecrire, ecrit, ecrite, ecrits, ecrites | écrire, écrit(e)(s) |
| egal, egale, egaux, egalement | égal, égale, égaux, également |
| element, elements | élément(s) |
| eliminer | éliminer |
| enchainement | enchaînement |
| entree, entrees | entrée(s) |
| equilibre | équilibre |
| equipe, equipes | équipe(s) |
| etape, etapes | étape(s) |
| etat, etats | état(s) |
| ete | été |
| etre | être |
| etude, etudes | étude(s) |
| eviter | éviter |
| evenement, evenements | événement(s) |
| evident, evidents, evidente, evidentes | évident(e)(s) |
| evoluer, evolutif, evolutive | évoluer, évolutif, évolutive |
| experience, experiences | expérience(s) |
| fleche, fleches | flèche(s) |
| frequente, frequentes, frequent, frequents | fréquent(e)(s) |
| generale, generales | générale(s) |
| hebergeur | hébergeur |
| hypothese | hypothèse |
| interet, interets | intérêt(s) |
| lecon, lecons | leçon(s) |
| legende | légende |
| lisibilite | lisibilité |
| melange | mélange |
| meme, memes | même(s) |
| methode, methodes | méthode(s) |
| methodologie, methodologies | méthodologie(s) |
| modele | modèle |
| motive, motives, motivee, motivees | motivé(e)(s) |
| necessaire, necessaires | nécessaire(s) |
| perimetre | périmètre |
| periode, periodes | période(s) |
| piege, pieges | piège(s) |
| precis, precise, precises | précis, précise, précises |
| prepare, preparee, prepares, preparees | préparé(e)(s) |
| presentation, presentations | présentation(s) |
| presente, presenter, presentent | présente(r)(nt) |
| premiere, premieres | première(s) |
| prevoir | prévoir |
| prevu, prevue, prevus, prevues | prévu(e)(s) |
| priorise, priorisee, priorises, priorisees | priorisé(e)(s) |
| probabilite | probabilité |
| proximite | proximité |
| qualifie, qualifiee, qualifies, qualifiees | qualifié(e)(s) |
| qualite, qualites | qualité(s) |
| realise, realisee, realises, realisees | réalisé(e)(s) |
| realisation, realisations | réalisation(s) |
| recu, recue, recus, recues | reçu(e)(s) |
| reduire | réduire |
| reference, references | référence(s) |
| reflexe | réflexe |
| regle, regles | règle(s) |
| regression, regressions | régression(s) |
| regulier, reguliere, reguliers, regulieres | régulier(s), régulière(s) |
| reinitialiser | réinitialiser |
| repete, repetee, repetes, repetees | répété(e)(s) |
| reperer, repere, reperes | repérer, repère, repères |
| represente, representer, representent | représente(r)(nt) |
| reunion, reunions | réunion(s) |
| reveler, revele, revelent | révéler, révèle, révèlent |
| role, roles | rôle(s) |
| securite | sécurité |
| signale, signalee, signales, signalees | signalé(e)(s) |
| specificite, specificites | spécificité(s) |
| specifique | spécifique |
| succes | succès |
| sure | sûre |
| systeme | système |
| tache, taches | tâche(s) |
| termine, terminee, termines, terminees | terminé(e)(s) |
| tres | très |
| unite, unites | unité(s) |
| validee, validees | validée(s) |
| verifie, verifier, verification | vérifie, vérifier, vérification |
| visibilite | visibilité |
| zero | zéro |

## Règles de ponctuation et d’apostrophe

1. Texte JSX : ` :` devient `&nbsp;:`, pareil pour ` ; ? !`. `« ` devient `«&nbsp;`, ` »` devient `&nbsp;»`. `5 minutes` devient `5&nbsp;minutes`, `100 %` devient `100&nbsp;%`.
2. Chaînes TypeScript : `\u00A0` à la place de `&nbsp;`.
3. Attributs JSX : expression JS avec `\u00A0` (exemple : `aria-label={'Résultats\u00A0: liste'}`).
4. Apostrophe : `’` partout dans le texte français, y compris dans les chaînes entre guillemets simples (le caractère `’` n’est pas un délimiteur).
5. Ne pas insérer d’espace insécable dans le code : seulement dans les textes et attributs visibles.

## Structure des fichiers

- Créer : `tests/typo.test.ts`.
- Modifier pages et composants transverses (tâche 1), puis modules par lots (tâches 2 à 4), puis corrections éditoriales (tâche 5).
- Modifier les tests à chaînes exactes : `tests/seo.test.tsx`, `tests/labos/comparateur.test.tsx`, `tests/labos/phases.test.ts`, `tests/labos/kanban.test.ts`, `tests/labos/risques.test.ts`, `tests/search.test.ts`, `smoke/smoke.spec.ts`.
- Aucun nouveau composant, aucune nouvelle route.

---

### Task 1 : Garde typographique et pages transverses

**Files:**
- Create: `tests/typo.test.ts`
- Modify: `src/components/SiteHeader.tsx`, `src/components/Footer.tsx`, `src/components/SearchBar.tsx`, `src/components/ProgressHeader.tsx`, `src/components/LaboFrame.tsx`, `src/components/QuizBlock.tsx`, `src/components/ExerciseBlock.tsx`, `src/components/FicheReflexe.tsx`, `src/components/ModuleEnd.tsx`, `src/components/ModuleLayout.tsx`, `src/components/SeoHead.tsx`
- Modify: `src/routes/accueil.tsx`, `src/routes/Apropos.tsx`, `src/routes/Glossaire.tsx`, `src/routes/NotFound.tsx`, `src/lib/glossaire.ts`, `src/lib/search.ts`
- Modify: `index.html`, `public/offline.html`
- Modify: `tests/seo.test.tsx`, `smoke/smoke.spec.ts` (uniquement les chaînes transverses)

**Interfaces:**
- Produces: `normaliserEspaces(s: string): string`, `FORMES_DEFENDUES: string[]`, `PAGES: Array<[string, ReactElement]>` dans `tests/typo.test.ts`. Les tâches 2 à 4 étendent `PAGES` et `FORMES_DEFENDUES`.

- [ ] **Step 1 : écrire le test de garde**

Créer `tests/typo.test.ts` avec ce contenu exact (la liste `FORMES_DEFENDUES` sera allongée aux tâches suivantes si besoin) :

```tsx
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { ReactElement } from 'react';
import { ProgressProvider } from '../src/lib/progress';
import Accueil from '../src/routes/accueil';
import Apropos from '../src/routes/Apropos';
import Glossaire from '../src/routes/Glossaire';
import NotFound from '../src/routes/NotFound';
import SiteHeader from '../src/components/SiteHeader';
import { MODULES } from '../src/modules/index';

afterEach(cleanup);

const normaliserEspaces = (s: string): string => s.replace(/\s+/g, ' ').trim();

const FORMES_DEFENDUES = [
  'a propos', 'a quoi', 'a faire', 'a relire', 'a l aise', 'a cote', 'cote a cote', 'au dela', 'peut etre',
  'apres', 'apparait', 'arriere', 'annee', 'annees', 'activite', 'activites', 'actualite', 'actualites',
  'ajoute', 'ajoutee', 'ajoutes', 'ajoutees', 'benevole', 'benevoles', 'casse', 'chaine', 'chaines',
  'cle', 'cles', 'coherent', 'coherents', 'coherente', 'coherentes', 'controle', 'couteux', 'couteuse',
  'couteuses', 'cout', 'couts', 'cree', 'creer', 'croisee', 'croisees', 'deja', 'delai', 'delais',
  'demarche', 'depart', 'dependance', 'dependances', 'derniere', 'dernieres', 'developpement',
  'difference', 'differences', 'disponibilite', 'donnee', 'donnees', 'debloquer', 'debloque', 'deblocage',
  'decouverte', 'decouvertes', 'decouper', 'decoupage', 'detecter', 'detecte', 'ecart', 'ecarts',
  'echoue', 'echouer', 'echec', 'ecole', 'ecoles', 'ecran', 'ecrans', 'ecrire', 'ecrit', 'ecrite',
  'ecrits', 'ecrites', 'egal', 'egale', 'egaux', 'egalement', 'element', 'elements', 'eliminer',
  'enchainement', 'entree', 'entrees', 'equilibre', 'equipe', 'equipes', 'etape', 'etapes', 'etat',
  'etats', 'ete', 'etre', 'etude', 'etudes', 'eviter', 'evenement', 'evenements', 'evident', 'evidents',
  'evidente', 'evidentes', 'evoluer', 'evolutif', 'evolutive', 'experience', 'experiences', 'fleche',
  'fleches', 'frequente', 'frequentes', 'frequent', 'frequents', 'generale', 'generales', 'hebergeur',
  'hypothese', 'interet', 'interets', 'lecon', 'lecons', 'legende', 'lisibilite', 'melange', 'meme',
  'memes', 'methode', 'methodes', 'methodologie', 'methodologies', 'modele', 'motive', 'motives',
  'motivee', 'motivees', 'necessaire', 'necessaires', 'perimetre', 'periode', 'periodes', 'piege',
  'pieges', 'precis', 'precise', 'precises', 'prepare', 'preparee', 'prepares', 'preparees',
  'presentation', 'presentations', 'presente', 'presenter', 'presentent', 'premiere', 'premieres',
  'prevoir', 'prevu', 'prevue', 'prevus', 'prevues', 'priorise', 'priorisee', 'priorises', 'priorisees',
  'probabilite', 'proximite', 'qualifie', 'qualifiee', 'qualifies', 'qualifiees', 'qualite', 'qualites',
  'realise', 'realisee', 'realises', 'realisees', 'realisation', 'realisations', 'recu', 'recue', 'recus',
  'recues', 'reduire', 'reference', 'references', 'reflexe', 'regle', 'regles', 'regression',
  'regressions', 'regulier', 'reguliere', 'reguliers', 'regulieres', 'reinitialiser', 'repete',
  'repetee', 'repetes', 'repetees', 'reperer', 'repere', 'reperes', 'represente', 'representer',
  'representent', 'reunion', 'reunions', 'reveler', 'revele', 'revelent', 'role', 'roles', 'securite',
  'signale', 'signalee', 'signales', 'signalees', 'specificite', 'specificites', 'specifique', 'succes',
  'sure', 'systeme', 'tache', 'taches', 'termine', 'terminee', 'termines', 'terminees', 'tres', 'unite',
  'unites', 'validee', 'validees', 'verifie', 'verifier', 'verification', 'visibilite', 'zero',
];

const PAGES: Array<[string, ReactElement]> = [
  ['accueil', <Accueil />],
  ['a-propos', <Apropos />],
  ['glossaire', <Glossaire />],
  ['404', <NotFound />],
];

const rendre = (page: ReactElement) =>
  render(
    <ProgressProvider>
      <MemoryRouter>{page}</MemoryRouter>
    </ProgressProvider>,
  );

describe('typographie du site', () => {
  for (const [nom, page] of PAGES) {
    it(`${nom} : ponctuation française et accents`, () => {
      const { container } = rendre(page);
      const brut = container.textContent ?? '';
      const texte = normaliserEspaces(brut);
      expect(brut, `${nom} tiret cadratin`).not.toContain('—');
      expect(brut, `${nom} espace avant ponctuation`).not.toMatch(/ [;:?!]/);
      expect(brut, `${nom} guillemets`).not.toMatch(/« | »/);
      expect(brut, `${nom} apostrophe droite`).not.toContain("'");
      for (const forme of FORMES_DEFENDUES) {
        const motif = new RegExp(`(?<![a-z])${forme}(?![a-z])`, 'i');
        expect(motif.test(texte), `${nom} contient « ${forme} »`).toBe(false);
      }
      for (const el of Array.from(container.querySelectorAll('[aria-label]'))) {
        const label = el.getAttribute('aria-label') ?? '';
        expect(label, `${nom} aria-label ponctuation`).not.toMatch(/ [;:?!]/);
        expect(label, `${nom} aria-label apostrophe`).not.toContain("'");
      }
      expect(document.title, `${nom} titre`).not.toMatch(/ [;:?!]|—/);
      const description = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
      expect(description, `${nom} description`).not.toMatch(/ [;:?!]|—/);
    });
  }

  it('les libellés clés sont accentués', () => {
    expect(MODULES.find((m) => m.num === 6)?.titre).toBe('Équipe, risques (Eisenhower) et suivi');
    expect(MODULES.find((m) => m.num === 3)?.titre).toContain('méthode');
    const { container } = rendre(<SiteHeader />);
    const texte = container.textContent ?? '';
    expect(texte).toContain('À propos');
    expect(texte).toContain('Méthodologies et Équipes');
  });
});
```

- [ ] **Step 2 : lancer le test et vérifier l’échec**

Run: `npx vitest run tests/typo.test.ts`
Attendu : ÉCHEC avec une longue liste de formes (`equipe`, `a propos`, `methodes`, `resultat`, etc.) et des espaces avant ponctuation.

- [ ] **Step 3 : corriger les fichiers transverses**

Appliquer le dictionnaire et les règles de ponctuation. Corrections exactes attendues :

- `SiteHeader.tsx` : `Methodologies et Equipes` devient `Méthodologies et Équipes` ; `A propos` devient `À propos`.
- `Footer.tsx` : `Realise` devient `Réalisé` ; `donnee` devient `donnée` ; `A propos du projet` devient `À propos du projet`.
- `SeoHead.tsx` : `document.title = \`${props.title}\u00A0: Gestion de Projet IT\``.
- `SearchBar.tsx` : `Resultats de recherche` devient `Résultats de recherche` ; `Aucun resultat` devient `Aucun résultat` ; `${hits.length} resultat(s)` devient `${hits.length} résultat(s)` ; `Module {h.moduleNum} :` reçoit `&nbsp;`.
- `ProgressHeader.tsx` : `{p.xp} XP` devient `{p.xp}&nbsp;XP` ; `${p.xp} XP, niveau ...` reçoit `\u00A0` avant `XP`.
- `LaboFrame.tsx` : normaliser le slug avec `.normalize('NFD').replace(/[\u0300-\u036f]/g, '')` avant la regex ; `Reverifier` devient `Revérifier` ; `Verifier` devient `Vérifier` ; `Reinitialiser` devient `Réinitialiser` ; `Labo valide : +5 XP (un seul gain).` devient `Labo validé&nbsp;: +5 XP (un seul gain).`
- `QuizBlock.tsx` : `bonnes reponses` devient `bonnes réponses` ; `Gain deja recu` devient `Gain déjà reçu` ; `Motif :` reçoit `&nbsp;` ; `+10 XP ajoutes.` devient `+10 XP ajoutés.`
- `ExerciseBlock.tsx` : `Voir le corrige` devient `Voir le corrigé` ; `Methode reusable` devient `Méthode réutilisable`.
- `ModuleEnd.tsx` : `Module termine.` devient `Module terminé.` ; `Badge ajoute` devient `Badge ajouté` ; `comme termine` devient `comme terminé`.
- `ModuleLayout.tsx` : `Demarche` devient `Démarche` ; `Exercice corrige` devient `Exercice corrigé` ; `Fiche reflexe` devient `Fiche réflexe` ; `5 minutes` reçoit `&nbsp;`.
- `accueil.tsx` : `Gerer` devient `Gérer` ; `pas a pas` devient `pas à pas` ; `decouper`, `methode`, `l equipe`, `corriges` accentués ; labels SVG `taches, jalons, chaines` accentués ; colonne `A faire` devient `À faire` ; CTA `module 1 : cadrer et decouper` reçoit `&nbsp;` et devient `cadrer et découper` ; description SEO accentuée ; phrase fil rouge accentuée (`l’association`, `presentation`, `activites`, `donnees`).
- `Apropos.tsx` : tout accentuer (`A propos`, `Methodologies`, `Equipes`, `Paternite`, `Realise`, `depot`, `Donnees`, `privee`, `donnee`, `cote`, `cles`, `presentation`, `activites`) ; `100 % cote navigateur :` reçoit les insécables.
- `Glossaire.tsx` : `Definitions` devient `Définitions` ; `d ecole` devient `d’école` ; `entree` devient `entrée` ; `developpe` devient `développe`.
- `NotFound.tsx` : `n'existe` devient `n’existe` ; `l'accueil` devient `l’accueil`.
- `lib/search.ts` : `Demarche` devient `Démarche` ; `Exercice corrige` devient `Exercice corrigé` ; `Fiche reflexe` devient `Fiche réflexe` ; le `label` reçoit `\u00A0:` entre section et titre.
- `lib/glossaire.ts` : accentuer toutes les définitions avec le dictionnaire ; exemples : `Ecart` reçoit `Différence`, `Delai` reçoit `délai`, `Cout` reçoit `coût`, `Dependance` reçoit `dépendance`, `Chaine` reçoit `chaîne`, `Perimetre` reçoit `périmètre`, `Methode` reçoit `méthode`.
- `index.html` : titre `Gestion de Projet IT&nbsp;: Méthodologies et Équipes` ; description avec `méthodes`, `équipe`.
- `public/offline.html` : `n'est` devient `n’est`, `Reessaye` devient `Réessaie`, `visitees` devient `visitées`, `Retour a l'accueil` devient `Retour à l’accueil`.

Ajouter les apostrophes typographiques partout dans ces fichiers. Ne pas modifier les identifiants, les classes, les clés ni les URL.

- [ ] **Step 4 : faire passer le test de garde et la suite**

Run: `npx vitest run tests/typo.test.ts`
Attendu : PASS.

Run: `npm test`
Attendu : corriger les échecs de chaînes exactes. Connu : `tests/seo.test.tsx` attend `'Accueil\u00A0: Gestion de Projet IT'`.

- [ ] **Step 5 : mettre à jour le smoke transverse et vérifier**

Dans `smoke/smoke.spec.ts` : `hasText: 'À propos'` ; `'Verifier'` devient `'Vérifier'` (3 occurrences) ; `'Labo valide : +5 XP (un seul gain).'` devient `'Labo validé : +5 XP (un seul gain).'` (3 occurrences). Ne pas toucher aux chaînes des modules pas encore traités.

Run: `npm run lint && npm run typecheck && npm run build && npm run smoke`
Attendu : 6 tests smoke PASS.

- [ ] **Step 6 : demander l’accord puis commiter**

Message proposé :

```bash
git add tests/typo.test.ts src index.html public/offline.html smoke/smoke.spec.ts
git commit -m "fix: typographie francaise des pages transverses"
```

Ne commiter qu’après accord explicite de l’utilisateur.

---

### Task 2 : Modules 1 à 3

**Files:**
- Modify: `src/modules/m1-wbs/**`, `src/modules/m2-planif/**`, `src/modules/m3-methodes/**`
- Modify: `src/labos/LaboWbs.tsx`, `src/labos/LaboGanttPert.tsx`, `src/labos/LaboPhases.tsx`, `src/labos/ComparateurMethodes.tsx`
- Modify: `tests/labos/comparateur.test.tsx`, `tests/labos/phases.test.ts`, `tests/typo.test.ts`, `smoke/smoke.spec.ts`

**Interfaces:**
- Consumes: `PAGES`, `FORMES_DEFENDUES` de `tests/typo.test.ts`.

- [ ] **Step 1 : étendre le test de garde**

Ajouter les imports `M1Page`, `M2Page`, `M3Page` et les lignes suivantes à `PAGES` :

```tsx
  ['module-1', <M1Page />],
  ['module-2', <M2Page />],
  ['module-3', <M3Page />],
```

- [ ] **Step 2 : lancer le test et vérifier l’échec**

Run: `npx vitest run tests/typo.test.ts`
Attendu : ÉCHEC sur `module-1`, `module-2`, `module-3`.

- [ ] **Step 3 : corriger les contenus des modules 1 à 3**

Appliquer le dictionnaire, les apostrophes et les insécables à tous les fichiers `.tsx` et `.ts` de `src/modules/m1-wbs`, `m2-planif`, `m3-methodes` (fiche, fil rouge, démarche, exercices, quiz, fiche réflexe, index) et aux labos `LaboWbs`, `LaboGanttPert`, `LaboPhases`, `ComparateurMethodes`. Cas connus :

- `m3-methodes/fiche.tsx` : `Quand l utiliser. Cascade : ...` devient une phrase complète, voir Task 5.
- `src/modules/index.ts` : le titre du module 2 reçoit `\u00A0:` (`Planifier\u00A0:`).
- `ComparisonMethodes` : `methodes`, `Tests prepares`, `Phases simples et jalons clairs`, `coûteux`, `fichier`.
- `LaboPhases` : `Tests systeme` devient `Tests système`, `derniere` devient `dernière`, `realisation` devient `réalisation`.
- Conserver les identifiants `m1-wbs`, `m2-planif`, `m3-methodes`, les props et les valeurs de state.

- [ ] **Step 4 : faire passer le test de garde et la suite**

Run: `npx vitest run tests/typo.test.ts`
Attendu : PASS.

Run: `npm test`
Attendu : corriger `tests/labos/comparateur.test.tsx` (`/méthodes/i`, `/Tests préparés pour chaque phase/`) et `tests/labos/phases.test.ts` (`/Tests système/`).

- [ ] **Step 5 : mettre à jour le smoke des modules 1 à 3**

Dans `smoke/smoke.spec.ts` : `.module-card .titre` hasText `Cadrer et découper` ; `toHaveText('Cadrer et découper (WBS)')`.

Run: `npm run lint && npm run typecheck && npm run build && npm run smoke`
Attendu : PASS.

- [ ] **Step 6 : demander l’accord puis commiter**

Message proposé : `fix: typographie francaise des modules 1 a 3`.

---

### Task 3 : Modules 4 à 6

**Files:**
- Modify: `src/modules/m4-agiles/**`, `src/modules/m5-outils/**`, `src/modules/m6-equipe/**`
- Modify: `src/labos/LaboKanban.tsx`, `src/labos/LaboSelecteurOutil.tsx`, `src/labos/LaboChaineCI.tsx`, `src/labos/LaboEisenhower.tsx`, `src/labos/LaboRisques.tsx`, `src/labos/PokerPlanning.tsx`
- Modify: `tests/labos/kanban.test.ts`, `tests/labos/risques.test.ts`, `tests/typo.test.ts`, `smoke/smoke.spec.ts`

- [ ] **Step 1 : étendre le test de garde**

Ajouter les imports `M4Page`, `M5Page`, `M6Page` et les lignes `['module-4', <M4Page />]`, `['module-5', <M5Page />]`, `['module-6', <M6Page />]` à `PAGES`.

- [ ] **Step 2 : lancer le test et vérifier l’échec**

Run: `npx vitest run tests/typo.test.ts`
Attendu : ÉCHEC sur `module-4`, `module-5`, `module-6`.

- [ ] **Step 3 : corriger les contenus des modules 4 à 6**

Appliquer le dictionnaire, les apostrophes et les insécables. Cas connus :

- `LaboKanban` : `COLONNES = ['À faire', 'En cours', 'À relire', 'Fini']` ; `initialState` utilise `'À faire'` ; mettre à jour les comparaisons internes (`c !== 'À faire'`).
- `LaboRisques` : `probabilite` devient `probabilité` dans les messages.
- `m4-agiles/quiz.ts` : `reveler`, `frequents`, `qualite` accentués.
- `src/modules/index.ts` : titres modules 4 et 5, `\u00A0:` avant `Scrum` et `suivi`.
- `m5-outils/quiz.ts` : `controle`, `delai` accentués.
- Dans `LaboKanban`, `CARTES` devient `['Page accueil', 'Agenda des activités', 'Formulaire contact', 'Version mobile', 'Galerie photos', 'Notice bénévole']` ; mettre à jour les tests qui citent ces chaînes (`tests/labos/kanban.test.ts`). Le message `Reste ${pasFini.length} carte(s) a finir.` devient `à finir`.

- [ ] **Step 4 : faire passer le test de garde et la suite**

Run: `npx vitest run tests/typo.test.ts` puis `npm test`
Attendu : corriger `tests/labos/kanban.test.ts` (`À faire`), `tests/labos/risques.test.ts` (`/probabilité 2, impact 3/i`).

- [ ] **Step 5 : mettre à jour le smoke des modules 4 à 6**

Dans `smoke/smoke.spec.ts`, test module 6 : `Corriger le formulaire cassé`, `Placer Corriger le formulaire cassé en Urgent et important`.

Run: `npm run lint && npm run typecheck && npm run build && npm run smoke`
Attendu : PASS.

- [ ] **Step 6 : demander l’accord puis commiter**

Message proposé : `fix: typographie francaise des modules 4 a 6`.

---

### Task 4 : Modules 7 à 9

**Files:**
- Modify: `src/modules/m7-parties/**`, `src/modules/m8-budget/**`, `src/modules/m9-changement/**`
- Modify: `src/labos/LaboCommunication.tsx`, `src/labos/LaboAlea.tsx`, `src/labos/LaboAdoption.tsx`
- Modify: `tests/typo.test.ts`, `smoke/smoke.spec.ts`

- [ ] **Step 1 : étendre le test de garde**

Ajouter les imports `M7Page`, `M8Page`, `M9Page` et les lignes `['module-7', <M7Page />]`, `['module-8', <M8Page />]`, `['module-9', <M9Page />]` à `PAGES`.

- [ ] **Step 2 : lancer le test et vérifier l’échec**

Run: `npx vitest run tests/typo.test.ts`
Attendu : ÉCHEC sur `module-7`, `module-8`, `module-9`.

- [ ] **Step 3 : corriger les contenus des modules 7 à 9**

Appliquer le dictionnaire, les apostrophes et les insécables. Cas connus :

- `m7-parties` : `prevoir`, `interet`, `reunion`, `cles`, `qualifie` accentués.
- `m8-budget` : `ecart`, `ecarts`, `hypothese`, `prevu` accentués.
- `m9-changement` : `coherent`, `meme`, `adoption`, `motives`, `proximite` accentués.
- Labos : `presentation`, `activites`, `hebergeur`, `repete`, `melange`, `casse`, `benevole`, `motive` accentués.
- Conserver les ids de state des labos et les props.

- [ ] **Step 4 : faire passer le test de garde et la suite**

Run: `npx vitest run tests/typo.test.ts` puis `npm test`
Attendu : PASS, corriger les échecs éventuels de `tests/labos/adoption.test.ts`, `alea.test.ts`, `communication.test.ts`.

- [ ] **Step 5 : mettre à jour le smoke des modules 7 à 9**

Dans `smoke/smoke.spec.ts` :

- module 7 : `Bureau de l’association`, `Bénévoles`, `Message court et tableau des tâches`, `Note d’avancement trimestrielle`, `Affiche et page d’actualités`, `Courriel formel aux étapes clés`, `Hébergeur fictif`.
- module 8 : `Pages de présentation`, `Agenda des activités`.
- module 9 : `Bénévoles peu à l’aise avec le nouvel agenda`, `Deux bénévoles motivés peuvent accompagner`, `Le bureau mélange ancien et nouveau processus`, `Une équipe teste le formulaire et peut montrer le geste`, `Relais de proximité`, `Message répété et simple`.

Run: `npm run lint && npm run typecheck && npm run build && npm run smoke`
Attendu : PASS.

- [ ] **Step 6 : demander l’accord puis commiter**

Message proposé : `fix: typographie francaise des modules 7 a 9`.

---

### Task 5 : Corrections éditoriales

**Files:**
- Modify: `src/modules/m3-methodes/fiche.tsx`, `src/modules/m3-methodes/ficheReflexe.ts`
- Modify: `src/modules/m4-agiles/fiche.tsx`, `src/modules/m4-agiles/filRouge.tsx`
- Modify: `src/modules/m5-outils/exercise.tsx`
- Modify: tous les `src/modules/*/exercise.tsx` et `src/modules/m1-wbs/exercice.tsx` (titres)
- Modify: `tests/typo.test.ts`, `tests/search.test.ts`

- [ ] **Step 1 : écrire les assertions des corrections**

Ajouter dans `tests/typo.test.ts` un test :

```tsx
it('les corrections éditoriales sont présentes', () => {
  localStorage.clear();
  const m3 = rendre(<M3Page />).container.textContent ?? '';
  expect(m3).toContain('La cascade convient quand le besoin est stable');
  const m4 = rendre(<M4Page />).container.textContent ?? '';
  expect(m4).toContain('lead time');
  expect(m4).toContain('revue de flux');
  expect(m4).toContain('Les Amis du Square');
  expect(m4).toContain('Exercice 2\u00A0: débloquer un tableau');
  const m3Reflexe = rendre(<M3Page />).container.textContent ?? '';
  expect(m3Reflexe).toContain('Repère prudent');
  expect(m3Reflexe).not.toContain('Valeur sûre');
  const m5 = rendre(<M5Page />).container.textContent ?? '';
  expect(m5).toContain('Exercice 2\u00A0: placer la chaîne CI');
});
```

Ajouter dans `tests/search.test.ts` :

```ts
it('trouve le module 6 avec une requête sans accent', () => {
  const hits = searchIndex(index, 'equipe');
  expect(hits.some((h) => h.moduleNum === 6)).toBe(true);
});
```

- [ ] **Step 2 : lancer les tests et vérifier l’échec**

Run: `npx vitest run tests/typo.test.ts tests/search.test.ts`
Attendu : ÉCHEC sur les nouvelles assertions.

- [ ] **Step 3 : appliquer les corrections**

- `m3-methodes/fiche.tsx` : remplacer le paragraphe « Quand l utiliser » par « Quand l’utiliser. La cascade convient quand le besoin est stable, le périmètre petit et les contraintes connues. Le cycle en V convient quand des traces et des tests sont attendus à chaque niveau. »
- `m3-methodes/ficheReflexe.ts` : `'Valeur sure : un lot court avant de figer une phase.'` devient `'Repère prudent\u00A0: un lot court avant de figer une phase.'`
- `m4-agiles/fiche.tsx` : ajouter à la fin du paragraphe Kanban : `<strong>Indicateurs.</strong> Suivre le délai de traversée (lead time) et tenir une courte revue de flux pour agir sur les blocages.`
- `m4-agiles/filRouge.tsx` : premier paragraphe, ajouter « Pour l’association fictive Les Amis du Square, l’équipe fictive travaille en tranches courtes&nbsp;: ».
- Titres d’exercices finaux. Ce sont des attributs `titre`, donc utiliser une expression avec `\u00A0` : `titre={'Exercice 1\u00A0: cadrer en une page'}`.
  - m1 : `Exercice 1\u00A0: cadrer en une page`, `Exercice 2\u00A0: trier une liste tangible`.
  - m2 : `Exercice 1\u00A0: lire la chaîne tendue`, `Exercice 2\u00A0: lever un conflit dans un GANTT`.
  - m3 : `Exercice 1\u00A0: choisir entre V et cascade sur trois cas fictifs`, `Exercice 2\u00A0: choisir entre cascade et agile sur un cas dédié`.
  - m4 : `Exercice 1\u00A0: écrire des user stories et choisir une méthode`, `Exercice 2\u00A0: débloquer un tableau`.
  - m5 : `Exercice 1\u00A0: choisir un type d’outil pour trois situations`, `Exercice 2\u00A0: placer la chaîne CI`.
  - m6 : `Exercice 1\u00A0: trier et préparer un ordre du jour`, `Exercice 2\u00A0: tenir un registre des risques`.
  - m7 : `Exercice 1\u00A0: qualifier trois parties prenantes`, `Exercice 2\u00A0: préparer un plan de communication de mise en ligne`.
  - m8 : `Exercice 1\u00A0: chiffrer trois lots`, `Exercice 2\u00A0: lire un écart`.
  - m9 : `Exercice 1\u00A0: lire trois freins`, `Exercice 2\u00A0: préparer un plan d’adoption court`.

- [ ] **Step 4 : faire passer les tests**

Run: `npx vitest run tests/typo.test.ts tests/search.test.ts`
Attendu : PASS.

Run: `npm test`
Attendu : PASS. Corriger toute chaîne exacte cassée.

- [ ] **Step 5 : gates et smoke**

Run: `npm run lint && npm run typecheck && npm run build && npm run smoke`
Attendu : PASS.

- [ ] **Step 6 : demander l’accord puis commiter**

Message proposé : `fix: corrections editoriales du cours`.

---

### Task 6 : Vérification finale et resynchronisation

**Files:**
- Aucune modification de code attendue.

- [ ] **Step 1 : gates complètes**

Run: `npm run lint && npm run typecheck && npm test && npm run build`
Attendu : lint et typecheck sans erreur, tests PASS, build OK.

- [ ] **Step 2 : smoke complet**

Run: `npm run smoke`
Attendu : 6 tests PASS, zéro requête externe, zéro erreur console.
En cas de serveur de preview obsolète sur le port 4173 : `netstat -ano | grep :4173` puis `taskkill //PID <pid> //F`.

- [ ] **Step 3 : Lighthouse mobile**

```bash
MSYS_NO_PATHCONV=1 npx vite preview --base=/gestion-projet-it/ --port 4173 --strictPort
npx lighthouse "http://localhost:4173/gestion-projet-it/" --only-categories=performance,accessibility --form-factor=mobile --quiet --chrome-flags="--headless" --output=json --output-path=.lh-accueil.json
npx lighthouse "http://localhost:4173/gestion-projet-it/module-6" --only-categories=performance,accessibility --form-factor=mobile --quiet --chrome-flags="--headless" --output=json --output-path=.lh-m6.json
npx lighthouse "http://localhost:4173/gestion-projet-it/glossaire" --only-categories=performance,accessibility --form-factor=mobile --quiet --chrome-flags="--headless" --output=json --output-path=.lh-glossaire.json
```

Attendu : performance et accessibilité supérieures ou égales à 90 partout. Supprimer les fichiers JSON temporaires après lecture.

- [ ] **Step 4 : resynchroniser le build plateforme**

Copier `dist/` vers `D:/0CODE/AntiGravity/Cours_Memos/Docker/gestion-projet-it/` sans aucune opération git dans ce dossier. Recalculer les empreintes SHA-256 des fichiers PWA et les communiquer.

- [ ] **Step 5 : rapport final**

Résumer : lots passés, tests ajoutés, corrections éditoriales, résultats Lighthouse, empreintes du build. Ne pas commiter ni pousser sans accord explicite.
