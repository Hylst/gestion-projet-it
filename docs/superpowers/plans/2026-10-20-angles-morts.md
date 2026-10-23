# Angles morts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter les angles morts gouvernance/RACI (M7) et qualité/recette (M3), enrichir le glossaire et rendre le quiz à cinq questions sans nouvelle route ni nouveau module.

**Architecture:** Le contenu reste statique. `QuizBlock` dérive le nombre de questions et le seuil des deux tiers des données reçues. Les métadonnées M3/M7 sont mises à jour dans l’index global et dans le `meta` local de chaque page. Le glossaire reste une liste statique. Aucun état, stockage ou route ne change.

**Tech Stack:** Vite, React 18, TypeScript, React Router 7, Vitest, Testing Library, Playwright, Lighthouse mobile, localStorage.

**Spec:** `docs/superpowers/specs/2026-10-20-angles-morts-design.md`

## Global Constraints

- Base de l’application : `/gestion-projet-it/`, build `--base=/gestion-projet-it/`.
- Aucune dépendance, aucune route, aucun dixième module, aucun nouveau labo.
- Aucun nouvel asset, police, image, script ou requête externe.
- Aucun changement de `public/sw.js` (v3), `manifest.webmanifest`, `offline.html`, `robots.txt`, sitemap racine ou sitemap module.
- Typographie : accents partout, apostrophe `’`, NBSP avant `: ; ? !`, aucun tiret cadratin, aucun guillemet avec espace ordinaire, aucune apostrophe droite dans le texte visible.
- Fiches : les nouveaux textes restent en paragraphes ou `h3`, sans tableau et sans nouveau style.
- Tests : 147 existants, 152 après le plan. Smoke : 7/7. Lighthouse mobile accueil : performance et accessibilité supérieures ou égales à 90, attendu 100.
- Version plateforme : `2.17.55`, car `2.17.54` est déjà utilisé.
- Aucun commit ni push sans accord explicite. Le dépôt Docker ne reçoit que le build vérifié, le changelog et un seul push après smoke et Lighthouse.
- Le dossier Docker `gestion-projet-it` est propre au commit `cc871a24`; les autres entrées sales du dépôt plateforme, notamment neurodivers, ne sont ni touchées ni indexées.
- Ne pas ajouter de commentaires dans le code.

## File Structure

- `src/components/QuizBlock.tsx` : seuil et titre dynamiques.
- `src/modules/m7-parties/*` : fiche, fil rouge, démarche, fiche réflexe, exercice, quiz.
- `src/modules/m3-methodes/*` : fiche, fil rouge, démarche, fiche réflexe, exercice, quiz.
- `src/modules/index.ts` : métadonnées globales M3/M7.
- `src/modules/m3-methodes/index.tsx`, `src/modules/m7-parties/index.tsx` : métadonnées locales.
- `src/lib/glossaire.ts`, `src/routes/Glossaire.tsx` : neuf termes et description.
- `tests/blocks.test.tsx`, `tests/xp.test.ts`, `tests/search.test.ts`, `tests/typo.test.tsx`, `tests/glossaire.test.ts` : garde-fous.
- Aucun nouveau composant, aucune nouvelle route, aucun nouveau style.

---

### Task 1 : QuizBlock à seuil dynamique

**Files:**
- Modify: `src/components/QuizBlock.tsx`
- Test: `tests/blocks.test.tsx`, `tests/xp.test.ts`

**Interfaces:**
- Consumes: `QuizData` et `QuizQuestion` existants.
- Produces: `QuizBlock(props: { data: QuizData })` avec le même contrat public, mais titre, seuil et message dérivés de `questions.length`.

- [ ] **Step 1 : Ajouter le quiz à cinq questions dans `tests/blocks.test.tsx`**

Après la constante `quizData`, ajouter :

```tsx
const quiz5: QuizData = {
  id: 'q-unit-5',
  questions: [1, 2, 3, 4, 5].map((n) => ({
    question: `Qu ${n}`,
    choix: ['Bonne', 'Fausse a', 'Fausse b'] as [string, string, string],
    bonne: 0 as 0 | 1 | 2,
    motif: `M ${n}`,
  })),
};
```

Dans `describe('QuizBlock', ...)`, après le test existant, ajouter :

```tsx
  it('accorde XP des 4 sur 5, pas 3 sur 5', () => {
    localStorage.clear();
    render(<ProgressProvider><MemoryRouter><QuizBlock data={quiz5} /></MemoryRouter></ProgressProvider>);
    expect(screen.getByRole('heading', { name: /Quiz courant \(5 questions\)/ })).toBeTruthy();
    fireEvent.click(screen.getAllByRole('radio', { name: 'Bonne' })[0] as HTMLElement);
    fireEvent.click(screen.getAllByRole('radio', { name: 'Bonne' })[1] as HTMLElement);
    fireEvent.click(screen.getAllByRole('radio', { name: 'Bonne' })[2] as HTMLElement);
    fireEvent.click(screen.getAllByRole('radio', { name: 'Fausse a' })[3] as HTMLElement);
    fireEvent.click(screen.getAllByRole('radio', { name: 'Fausse a' })[4] as HTMLElement);
    const sansGain = screen.getByRole('status');
    expect(sansGain.textContent).toMatch(/3 sur 5/);
    expect(sansGain.textContent).not.toMatch(/10 XP/);
    fireEvent.click(screen.getByRole('button', { name: /Recommencer sans XP/ }));
    for (const i of [0, 1, 2, 3]) {
      fireEvent.click(screen.getAllByRole('radio', { name: 'Bonne' })[i] as HTMLElement);
    }
    fireEvent.click(screen.getAllByRole('radio', { name: 'Fausse a' })[4] as HTMLElement);
    const avecGain = screen.getByRole('status');
    expect(avecGain.textContent).toMatch(/4 sur 5/);
    expect(avecGain.textContent).toMatch(/10 XP/);
  });
```

- [ ] **Step 2 : Ajouter le cas cinq questions dans `tests/xp.test.ts`**

Après le test existant `quiz: gain seulement des 2/3 et une seule fois`, ajouter :

```ts
  it('quiz à cinq questions: gain des 4/5 seulement', () => {
    let s = reduireXP({ xp: 0, quizDone: [], laboDone: [], moduleDone: [] }, { type: 'quiz', id: 'q5', correctes: 3, total: 5 });
    expect(s.xp).toBe(0);
    s = reduireXP(s, { type: 'quiz', id: 'q5', correctes: 4, total: 5 });
    expect(s.xp).toBe(10);
  });
```

- [ ] **Step 3 : Lancer les tests pour vérifier l’échec**

Run: `npx vitest run tests/blocks.test.tsx tests/xp.test.ts`

Expected: FAIL sur `tests/blocks.test.tsx`. Le titre reste `Quiz courant (3 questions)` et le cas 3 sur 5 accorde encore 10 XP avec l’ancien seuil `bonnes >= 2`. Le test XP passe déjà : `reduireXP` applique déjà la règle des deux tiers ; il sert de garde de non-régression.

- [ ] **Step 4 : Remplacer `src/components/QuizBlock.tsx` par la version dynamique**

```tsx
import React from 'react';
import { useProgress } from '../lib/progress';

export interface QuizQuestion { question: string; choix: [string, string, string]; bonne: 0 | 1 | 2; motif: string }
export interface QuizData { id: string; questions: QuizQuestion[] }

export function QuizBlock(props: { data: QuizData }) {
  const p = useProgress();
  const [repondu, setRepondu] = React.useState<Array<number | null>>(() => props.data.questions.map(() => null));
  const deja = p.quizDone.includes(props.data.id);
  const bonnes = props.data.questions.filter((q, i) => repondu[i] === q.bonne).length;
  const total = props.data.questions.length;
  const seuil = Math.ceil((total * 2) / 3);
  const complet = repondu.every((r) => r !== null);
  const [verdict, setVerdict] = React.useState<null | string>(null);
  const [gagne, setGagne] = React.useState(false);

  React.useEffect(() => {
    if (complet) {
      const s = `${bonnes} sur ${total} bonnes réponses. ${deja ? 'Gain déjà reçu pour ce quiz.' : bonnes >= seuil ? '+10 XP' : `Moins de ${seuil} sur ${total}\u00A0: pas de gain, tu peux recommencer.`}`;
      setVerdict(s);
      if (bonnes >= seuil && !deja) {
        p.dispatch({ type: 'quiz', id: props.data.id, correctes: bonnes, total });
        setGagne(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complet]);

  const reset = () => { setRepondu(props.data.questions.map(() => null)); setVerdict(null); setGagne(false); };

  return (
    <section id="quiz" className="quiz" aria-labelledby="quiz-t">
      <h2 id="quiz-t">Quiz courant ({total} questions)</h2>
      {props.data.questions.map((q: QuizQuestion, i: number) => (
        <fieldset key={i} disabled={repondu[i] !== null}>
          <legend>{`Q${i + 1}.${q.question}`}</legend>
          {q.choix.map((c, j) => (
            <div key={j} className="choix">
              <input type="radio" name={`q-${i}`} id={`q-${i}-${j}`} value={j} checked={repondu[i] === j} onChange={() => setRepondu((r) => r.map((v, k) => (k === i ? j : v)))} />
              <label htmlFor={`q-${i}-${j}`}>{c}</label>
            </div>
          ))}
          {repondu[i] !== null && (
            <p className={repondu[i] === q.bonne ? 'ok' : 'err'} role="note">
              {repondu[i] === q.bonne ? 'Correct. ' : 'Pas cette fois. '} Motif&nbsp;: {q.motif}
            </p>
          )}
        </fieldset>
      ))}
      <p role="status">{verdict}{gagne && <strong> +10 XP ajoutés.</strong>}</p>
      {complet && <button type="button" className="btn secondary" onClick={reset}>Recommencer sans XP</button>}
    </section>
  );
}
```

- [ ] **Step 5 : Relancer les tests ciblés**

Run: `npx vitest run tests/blocks.test.tsx tests/xp.test.ts`

Expected: PASS. Le titre affiche cinq questions, 3 sur 5 ne donne rien, 4 sur 5 donne 10 XP, et le cas trois questions reste vert.

- [ ] **Step 6 : Lancer la suite complète**

Run: `npm test`

Expected: PASS, 149 tests.

- [ ] **Step 7 : Point d’arrêt**

Ne pas committer. Laisser les modifications dans l’arbre de travail et demander l’accord explicite de l’utilisateur avant tout commit.

---

### Task 2 : Module 7, gouvernance et RACI

**Files:**
- Modify: `src/modules/m7-parties/fiche.tsx`
- Modify: `src/modules/m7-parties/filRouge.tsx`
- Modify: `src/modules/m7-parties/demarche.tsx`
- Modify: `src/modules/m7-parties/ficheReflexe.ts`
- Modify: `src/modules/m7-parties/exercise.tsx`
- Modify: `src/modules/m7-parties/quiz.ts`
- Modify: `src/modules/m7-parties/index.tsx`
- Modify: `src/modules/index.ts`
- Test: `tests/search.test.ts`, `tests/typo.test.tsx`

**Interfaces:**
- Consumes: `QuizBlock` dynamique de la tâche 1.
- Produces: quiz M7 à cinq questions, métadonnées M7 identiques dans l’index global et le `meta` local, nouveaux textes visibles dans la fiche M7.

- [ ] **Step 1 : Ajouter le test de recherche M7**

Dans `tests/search.test.ts`, ajouter l’import :

```ts
import { MODULES } from '../src/modules/index';
```

Puis, dans `describe('search', ...)`, ajouter :

```ts
  it('trouve les angles morts du module 7', () => {
    const m7 = MODULES.find((m) => m.num === 7);
    expect(m7?.resume).toContain('clarifier les rôles');
    expect(m7?.motsCles).toContain('raci');
    const hits = searchIndex(index, 'raci');
    expect(hits.some((h) => h.moduleNum === 7)).toBe(true);
    const hits2 = searchIndex(index, 'gouvernance');
    expect(hits2.some((h) => h.moduleNum === 7)).toBe(true);
  });
```

- [ ] **Step 2 : Ajouter le test de présence M7**

Dans `tests/typo.test.tsx`, après le test `les corrections éditoriales sont présentes`, ajouter :

```tsx
  it('les angles morts du module 7 sont présents', () => {
    localStorage.clear();
    const m7 = rendre(<M7Page />).container.textContent ?? '';
    expect(m7).toContain('clarifier les rôles et les décisions');
    expect(m7).toContain('RACI');
    expect(m7).toContain('Journal de décisions');
    expect(m7).toContain('Quiz courant (5 questions)');
  });
```

- [ ] **Step 3 : Vérifier l’échec des deux tests**

Run: `npx vitest run tests/search.test.ts tests/typo.test.tsx`

Expected: FAIL. Les métadonnées M7 ne contiennent pas encore `raci` et le resume local ne contient pas `clarifier les rôles`; la fiche ne contient pas encore `RACI` ni `Journal de décisions`; le quiz M7 affiche encore trois questions.

- [ ] **Step 4 : Remplacer `src/modules/m7-parties/fiche.tsx`**

```tsx
export const Fiche = () => (
  <section id="fiche" aria-labelledby="fiche-t">
    <h2 id="fiche-t">Fiche&nbsp;: parties prenantes, rôles et communication</h2>
    <h3>Cartographier les parties prenantes</h3>
    <p><strong>Qui est concerné, qui influence.</strong> Une carte pouvoir et intérêt situe les personnes et les groupes, sans les réduire à une étiquette. <strong>À quoi ça sert.</strong> Choisir qui informer, qui consulter et à quel rythme. <strong>Avantage.</strong> Les oublis et les surprises deviennent visibles. <strong>Limite.</strong> La carte est un instantané&nbsp;: les positions évoluent avec le projet.</p>
    <h3>Rôles et gouvernance</h3>
    <p><strong>Un rôle n’est pas une personne.</strong> Le sponsor porte le projet et débloque les moyens. Le chef de projet organise, suit et alerte. Le product owner ordonne les besoins. L’équipe réalise. Le comité de pilotage arbitre aux jalons. <strong>À quoi ça sert.</strong> Chacun sait qui décide, qui propose et qui est informé. <strong>Limite.</strong> Une personne peut tenir plusieurs rôles, à condition que ce soit écrit et accepté.</p>
    <h3>Matrice RACI</h3>
    <p><strong>Quatre questions par activité.</strong> R&nbsp;: qui réalise. A&nbsp;: qui rend compte et décide, une seule personne par activité. C&nbsp;: qui est consulté avant la décision. I&nbsp;: qui est informé après. <strong>Exemple fictif.</strong> Pour valider le contenu de la page agenda, le chef de projet réalise (R), le bureau rend compte et décide (A), les bénévoles donnent un avis (C), les usagers sont informés (I). <strong>Règle.</strong> Un seul A par activité, au moins un R, pas de ligne vide. <strong>Limite.</strong> Une matrice trop lourde ralentit&nbsp;; une matrice vide laisse les décisions floues.</p>
    <h3>Journal de décisions et escalade</h3>
    <p><strong>Une décision se note.</strong> Date, décision, motif, responsable, suite. <strong>Escalade.</strong> Des critères écrits&nbsp;: conflit de priorités, dépassement de marge, risque majeur. <strong>À quoi ça sert.</strong> Donner au bon niveau la décision qui lui revient, sans attendre qu’un blocage grossisse. <strong>Limite.</strong> Escalader n’est pas se défausser&nbsp;; c’est décider au bon endroit, avec les faits et les options.</p>
    <h3>Plan de communication</h3>
    <p><strong>Qui, quoi, quand, par quel canal.</strong> Quelques lignes suffisent&nbsp;: destinataire, message utile, moment, format. <strong>Quand.</strong> Dès le cadrage, puis à chaque jalon. <strong>Avantage.</strong> Chacun sait ce qu’il recevra et quand. <strong>Limite.</strong> Un plan trop long n’est plus lu&nbsp;: mieux vaut peu de lignes, tenues.</p>
    <h3>Rituels et boucles de retour</h3>
    <p><strong>Un point court, un compte rendu, une question ouverte.</strong> Le rituel sert à faire circuler l’information et à capter les retours. <strong>Avantage.</strong> Les désaccords remontent avant de bloquer. <strong>Limite.</strong> Un rituel sans décision ni suite devient une réunion de plus.</p>
    <h3>Limites et vigilance</h3>
    <p><strong>La communication ne remplace pas la décision.</strong> Elle rend les choix lisibles, elle ne les prend pas. <strong>Vigilance.</strong> Trop de messages fatigue&nbsp;; trop peu laisse le vide. <strong>Repérer.</strong> Adapter le canal au besoin, pas à l’habitude.</p>
  </section>
);

export default Fiche;
```

- [ ] **Step 5 : Remplacer `src/modules/m7-parties/filRouge.tsx`**

```tsx
export const FilRouge = () => (
  <section id="fil-rouge" aria-labelledby="fr-t">
    <h2 id="fr-t">Exemples vécus du fil rouge</h2>
    <h3>Exemple 1&nbsp;: le bureau et les bénévoles</h3>
    <p>Le bureau fictif valide les jalons&nbsp;: un point court mensuel et un compte rendu suffisent. Les bénévoles portent les activités&nbsp;: un message court et un tableau des tâches à jour évitent les doublons.</p>
    <h3>Exemple 2&nbsp;: le financeur et la mairie</h3>
    <p>Le financeur fictif attend une note d’avancement trimestrielle qui relie moyens et résultats. La mairie fictive suit les étapes officielles&nbsp;: un courriel formel aux moments clés, avec une date et un interlocuteur.</p>
    <h3>Exemple 3&nbsp;: les usagers et l’hébergeur</h3>
    <p>Les usagers du quartier lisent l’affiche et la page d’actualités. L’hébergeur fictif dispose d’une fiche technique et d’un contact incident&nbsp;: le bon canal au bon moment.</p>
    <h3>Exemple 4&nbsp;: les rôles de la mise en ligne</h3>
    <p>Le bureau fictif rend compte et décide (A)&nbsp;: il approuve le contenu de la page agenda. Le chef de projet fictif réalise le planning et la recette (R). Les bénévoles donnent un avis sur les contenus (C). Les usagers sont informés par l’affiche (I). Une seule personne approuve chaque activité&nbsp;; le journal note la décision et sa suite.</p>
  </section>
);

export default FilRouge;
```

- [ ] **Step 6 : Remplacer `src/modules/m7-parties/demarche.tsx`**

```tsx
export const Demarche = () => (
  <section id="demarche" aria-labelledby="demarche-t">
    <h2 id="demarche-t">Démarche en 5 gestes</h2>
    <ol>
      <li>Liste les parties prenantes fictives et leurs rôles.</li>
      <li>Évalue pouvoir et intérêt, sans juger les personnes.</li>
      <li>Choisis un canal et un rythme pour chaque besoin.</li>
      <li>Écris un plan court (qui, quoi, quand, canal) et une matrice RACI courte.</li>
      <li>Après chaque jalon, ajuste le plan et note les décisions.</li>
    </ol>
  </section>
);

export default Demarche;
```

- [ ] **Step 7 : Remplacer `src/modules/m7-parties/ficheReflexe.ts`**

```ts
export const items = [
  'Liste les parties prenantes avant d’écrire un message.',
  'Évalue pouvoir et intérêt sans juger les personnes.',
  'Choisis un canal par besoin, pas par habitude.',
  'Nomme un responsable et un décideur par activité.',
  'Note les décisions, leur motif et leur suite.',
  'Prévois un rituel court et un compte rendu.',
  'Ajuste le plan après un retour, sans défensive.',
];
```

- [ ] **Step 8 : Ajouter le troisième exercice M7**

Dans `src/modules/m7-parties/exercise.tsx`, après le second `ExerciseBlock` et avant la fermeture `</div>`, insérer :

```tsx
    <ExerciseBlock
      id="m7-ex3"
      titre={'Exercice 3\u00A0: construire un RACI et noter une décision'}
      enonce={(
        <p>Pour la mise en ligne de la page agenda fictive, attribue R, A, C et I au bureau, au chef de projet, aux bénévoles, aux usagers et au financeur. Puis note une décision dans le journal avec son motif, son responsable et sa suite.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Validation du contenu&nbsp;:</strong> R&nbsp;: chef de projet&nbsp;; A&nbsp;: bureau&nbsp;; C&nbsp;: bénévoles&nbsp;; I&nbsp;: usagers.</li>
          <li><strong>Publication de la page&nbsp;:</strong> R&nbsp;: bénévole formé&nbsp;; A&nbsp;: chef de projet&nbsp;; C&nbsp;: bureau&nbsp;; I&nbsp;: financeur.</li>
          <li><strong>Règle&nbsp;:</strong> un seul A par activité, au moins un R, pas de ligne vide.</li>
          <li><strong>Journal&nbsp;:</strong> date&nbsp;: jalon de recette&nbsp;; décision&nbsp;: valider le contenu de la page agenda&nbsp;; motif&nbsp;: critères d’acceptation vérifiés&nbsp;; responsable&nbsp;: bureau&nbsp;; suite&nbsp;: publication puis annonce aux usagers.</li>
        </ul>
      )}
      methode={[
        'Écris les rôles avant l’activité, pas après le conflit.',
        'Un seul A par activité.',
        'Note la décision et sa suite.',
      ]}
    />
```

- [ ] **Step 9 : Ajouter deux questions au quiz M7**

Dans `src/modules/m7-parties/quiz.ts`, après le troisième objet question et avant la fermeture `],`, insérer :

```ts
    {
      question: 'Dans une matrice RACI, que signifie la lettre A\u00A0?',
      choix: [
        'La personne qui rend compte et décide',
        'La personne qui informe seulement',
        'La personne qui réalise toujours',
      ],
      bonne: 0,
      motif: 'Un seul A par activité\u00A0: il rend compte du résultat et tranche.',
    },
    {
      question: 'À quoi sert un journal de décisions\u00A0?',
      choix: [
        'Garder la décision, son motif, son responsable et sa suite',
        'Remplacer le planning',
        'Lister les réunions sans décision',
      ],
      bonne: 0,
      motif: 'Le journal garde la trace utile pour éviter de redécider sans contexte.',
    },
```

- [ ] **Step 10 : Mettre à jour le `meta` local de `src/modules/m7-parties/index.tsx`**

Remplacer les deux lignes du bloc `meta` :

```tsx
      resume: 'Cartographier, clarifier les rôles et les décisions, choisir les canaux, animer un rituel court et ajuster après les retours.',
      motsCles: ['parties prenantes', 'communication', 'cartographie', 'canaux', 'rituels', 'raci', 'gouvernance', 'decisions', 'escalade'],
```

- [ ] **Step 11 : Mettre à jour la ligne M7 de `src/modules/index.ts`**

Remplacer la ligne existante par :

```ts
  { id: 'm7-parties', num: 7, slug: 'module-7', titre: 'Parties prenantes et communication', resume: 'Cartographier, clarifier les rôles et les décisions, choisir les canaux, animer un rituel court et ajuster après les retours.', motsCles: ['parties prenantes', 'communication', 'cartographie', 'canaux', 'rituels', 'raci', 'gouvernance', 'decisions', 'escalade'] },
```

- [ ] **Step 12 : Relancer les tests ciblés M7**

Run: `npx vitest run tests/search.test.ts tests/typo.test.tsx`

Expected: PASS. Le resume M7 global et local contient `clarifier les rôles`, `raci` et `gouvernance` sont trouvables, la fiche contient `RACI` et `Journal de décisions`, et le quiz M7 affiche cinq questions.

- [ ] **Step 13 : Lancer la suite complète**

Run: `npm test`

Expected: PASS, 151 tests.

- [ ] **Step 14 : Point d’arrêt**

Ne pas committer. Laisser les modifications dans l’arbre de travail et demander l’accord explicite de l’utilisateur avant tout commit.

---

### Task 3 : Module 3, qualité et recette

**Files:**
- Modify: `src/modules/m3-methodes/fiche.tsx`
- Modify: `src/modules/m3-methodes/filRouge.tsx`
- Modify: `src/modules/m3-methodes/demarche.tsx`
- Modify: `src/modules/m3-methodes/ficheReflexe.ts`
- Modify: `src/modules/m3-methodes/exercise.tsx`
- Modify: `src/modules/m3-methodes/quiz.ts`
- Modify: `src/modules/m3-methodes/index.tsx`
- Modify: `src/modules/index.ts`
- Test: `tests/search.test.ts`, `tests/typo.test.tsx`

**Interfaces:**
- Consumes: `QuizBlock` dynamique de la tâche 1 et les tests de la tâche 2.
- Produces: quiz M3 à cinq questions, métadonnées M3 identiques dans l’index global et le `meta` local, nouveaux textes visibles dans la fiche M3.

- [ ] **Step 1 : Étendre le test de recherche M3**

Dans `tests/search.test.ts`, remplacer le test ajouté en tâche 2 par :

```ts
  it('trouve les angles morts des modules 3 et 7', () => {
    const m3 = MODULES.find((m) => m.num === 3);
    const m7 = MODULES.find((m) => m.num === 7);
    expect(m3?.resume).toContain('critères d’acceptation');
    expect(m3?.motsCles).toContain('non regression');
    expect(m7?.resume).toContain('clarifier les rôles');
    expect(m7?.motsCles).toContain('raci');
    const m3Hits = searchIndex(index, 'recette');
    expect(m3Hits.some((h) => h.moduleNum === 3)).toBe(true);
    const m3Regression = searchIndex(index, 'regression');
    expect(m3Regression.some((h) => h.moduleNum === 3)).toBe(true);
    const m7Hits = searchIndex(index, 'raci');
    expect(m7Hits.some((h) => h.moduleNum === 7)).toBe(true);
    const m7Gouvernance = searchIndex(index, 'gouvernance');
    expect(m7Gouvernance.some((h) => h.moduleNum === 7)).toBe(true);
  });
```

- [ ] **Step 2 : Étendre le test de présence M3**

Dans `tests/typo.test.tsx`, remplacer le test ajouté en tâche 2 par :

```tsx
  it('les angles morts des modules 3 et 7 sont présents', () => {
    localStorage.clear();
    const m3 = rendre(<M3Page />).container.textContent ?? '';
    expect(m3).toContain('cascade simple, critères d’acceptation');
    expect(m3).toContain('non-régression');
    expect(m3).toContain('Quiz courant (5 questions)');
    const m7 = rendre(<M7Page />).container.textContent ?? '';
    expect(m7).toContain('clarifier les rôles et les décisions');
    expect(m7).toContain('RACI');
    expect(m7).toContain('Journal de décisions');
    expect(m7).toContain('Quiz courant (5 questions)');
  });
```

- [ ] **Step 3 : Vérifier l’échec des tests M3**

Run: `npx vitest run tests/search.test.ts tests/typo.test.tsx`

Expected: FAIL. Le resume M3 global ne contient pas encore `critères d’acceptation`, le resume local ne contient pas `cascade simple, critères d’acceptation`, la fiche ne contient pas `non-régression`, et le quiz M3 affiche encore trois questions.

- [ ] **Step 4 : Remplacer `src/modules/m3-methodes/fiche.tsx`**

```tsx
export const Fiche = () => (
  <section id="fiche" aria-labelledby="fiche-t">
    <h2 id="fiche-t">Fiche&nbsp;: cycle en V, cascade (Waterfall), choisir sa méthode</h2>
    <p><strong>Définition cascade (Waterfall).</strong> Phases en suite&nbsp;: besoin, conception, réalisation, test, déploiement. Un document de fin de phase est relu avant la suivante&nbsp;; l’avancement se lit par jalons.</p>
    <p><strong>Définition cycle en V.</strong> Mêmes phases, avec des tests préparés en face de chaque niveau de conception&nbsp;: tests unitaires face au code, tests d’intégration face à la conception détaillée, tests système face à la conception globale, acceptation face au besoin.</p>
    <p><strong>À quoi ça sert.</strong> Ordonner un travail en phases simples avec jalons, quand le besoin est stable et les contraintes connues. Le cycle en V prévoit des tests préparés à l’avance en face de chaque conception.</p>
    <p><strong>Quand l’utiliser.</strong> La cascade convient quand le besoin est stable, le périmètre petit et les contraintes connues. Le cycle en V convient quand des traces et des tests sont attendus à chaque niveau.</p>
    <p><strong>Avantages.</strong> Lisibilité, jalons clairs, documents de référence par phase.</p>
    <p><strong>Critères d’acceptation.</strong> Un critère est observable et testable&nbsp;: un bénévole crée un événement avec un titre, une date et un lieu&nbsp;; l’événement apparaît dans la liste&nbsp;; un champ manquant affiche un message explicite. Les critères se discutent avant la réalisation, avec les parties prenantes. <strong>Définition de prêt.</strong> Elle dit quand une tâche est assez claire pour commencer. <strong>Définition de fini.</strong> Elle dit quand elle est vraiment terminée.</p>
    <p><strong>Recette et non-régression.</strong> La recette vérifie avec les parties prenantes que le résultat répond aux critères. La non-régression vérifie qu’un changement ne casse pas ce qui fonctionnait déjà. Un plan de test court suffit&nbsp;: quoi, qui, quand, quelle preuve.</p>
    <p><strong>Limite qualité.</strong> Une recette découverte à la fin ne rattrape pas un besoin flou&nbsp;; les critères se discutent tôt. La qualité n’est pas un document de plus, c’est une décision sur ce qui compte.</p>
    <p><strong>Limites.</strong> Retours tardifs coûteux, besoin flou mal porté, découverte d’usage faible. Aucune école supérieure à l’autre&nbsp;: le comparateur ci-dessous montre les trois familles côte à côte.</p>
  </section>
);

export default Fiche;
```

- [ ] **Step 5 : Remplacer `src/modules/m3-methodes/filRouge.tsx`**

```tsx
export const FilRouge = () => (
  <section id="fil-rouge" aria-labelledby="fr-t">
    <h2 id="fr-t">Exemples vécus du fil rouge</h2>
    <h3>Exemple 1&nbsp;: le site en cascade</h3>
    <p>Site des Amis du Square en cascade fictive&nbsp;: besoin figé (3 gabarits fictifs), conception, réalisation, tests par vague, déploiement. Chaque fin de phase fictive donne un document relu avant la suivante.</p>
    <h3>Exemple 2&nbsp;: le site en cycle en V</h3>
    <p>En face de chaque conception, un test préparé à l’avance&nbsp;: acceptation face au besoin fictif, système face à la conception globale, intégration face au détail, unitaire face au code. La recette fictive vérifie chaque niveau.</p>
    <h3>Exemple 3&nbsp;: la recette de la page agenda</h3>
    <p>La page agenda fictive est acceptée si un bénévole crée un événement avec un titre, une date et un lieu, si l’événement apparaît dans la liste et si un champ manquant affiche un message explicite. Le bureau et un bénévole font la recette sur un jeu fictif&nbsp;; une capture datée sert de preuve. La non-régression vérifie que la page contact fonctionne encore.</p>
  </section>
);

export default FilRouge;
```

- [ ] **Step 6 : Remplacer `src/modules/m3-methodes/demarche.tsx`**

```tsx
export const Demarche = () => (
  <section id="demarche" aria-labelledby="demarche-t">
    <h2 id="demarche-t">Démarche en 5 gestes</h2>
    <ol>
      <li>Décrire le besoin&nbsp;: stable, figé ou flou&nbsp;?</li>
      <li>Lister les contraintes (qualité, traces, date cible, équipe disponible) et les critères d’acceptation.</li>
      <li>Si le besoin est flou, avancer par maquette ou lot court avant de figer une phase.</li>
      <li>La méthode est choisie et écrite avec son motif, ses limites et son plan de recette.</li>
      <li>Rédiger une parade si le besoin bouge (jalon de relecture ou tranche courte avec revue) et prévoir la non-régression.</li>
    </ol>
  </section>
);

export default Demarche;
```

- [ ] **Step 7 : Remplacer `src/modules/m3-methodes/ficheReflexe.ts`**

```ts
export const items = [
  'Décris le besoin\u00A0: stable ou flou, avant de choisir.',
  'Choisis V si les traces et tests sont attendus.',
  'Choisis la cascade si le besoin est stable et petit.',
  'Repère prudent\u00A0: un lot court avant de figer une phase.',
  'Écris les critères d’acceptation avant de réaliser.',
  'Prévois la recette et la non-régression.',
  'Prévois une parade si le besoin bouge.',
];
```

- [ ] **Step 8 : Ajouter le troisième exercice M3**

Dans `src/modules/m3-methodes/exercise.tsx`, après le second `ExerciseBlock` et avant la fermeture `</div>`, insérer :

```tsx
    <ExerciseBlock
      id="m3-ex3"
      titre={'Exercice 3\u00A0: écrire trois critères d’acceptation'}
      enonce={(
        <p>Pour la page agenda fictive, écris trois critères d’acceptation observables et testables. Indique qui fait la recette et quelle preuve est gardée.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Critère 1&nbsp;:</strong> un bénévole crée un événement avec un titre, une date et un lieu&nbsp;; l’événement apparaît dans la liste.</li>
          <li><strong>Critère 2&nbsp;:</strong> un champ obligatoire manquant affiche un message explicite et l’enregistrement est refusé.</li>
          <li><strong>Critère 3&nbsp;:</strong> un événement modifié ou supprimé disparaît de la liste et de la page publique.</li>
          <li><strong>Recette&nbsp;:</strong> le bureau et un bénévole testent sur un jeu fictif&nbsp;; une capture datée ou un compte rendu sert de preuve.</li>
          <li><strong>Méthode&nbsp;:</strong> critère observable, testable et accepté avant la réalisation.</li>
        </ul>
      )}
      methode={[
        'Un critère se constate, il ne s’interprète pas.',
        'Écris le critère avant de réaliser.',
        'Garde une preuve de la recette.',
      ]}
    />
```

- [ ] **Step 9 : Ajouter deux questions au quiz M3**

Dans `src/modules/m3-methodes/quiz.ts`, après le troisième objet question et avant la fermeture `],`, insérer :

```ts
    {
      question: 'Quand écrit-on les critères d’acceptation\u00A0?',
      choix: [
        'Avant la réalisation, avec les parties prenantes',
        'Après la mise en ligne',
        'Seulement quand un bug apparaît',
      ],
      bonne: 0,
      motif: 'Les critères se discutent tôt\u00A0: ils guident la réalisation et la recette.',
    },
    {
      question: 'À quoi sert la non-régression\u00A0?',
      choix: [
        'Vérifier qu’un changement ne casse pas ce qui fonctionnait',
        'Ajouter des fonctionnalités',
        'Remplacer la recette',
      ],
      bonne: 0,
      motif: 'La non-régression protège l’existant pendant que le produit évolue.',
    },
```

- [ ] **Step 10 : Mettre à jour le `meta` local de `src/modules/m3-methodes/index.tsx`**

Remplacer les deux lignes du bloc `meta` :

```tsx
      resume: 'Phases, tests en miroir du V, cascade simple, critères d’acceptation, recette, comparateur sans dogme.',
      motsCles: ['cycle en v', 'waterfall', 'cascade', 'methodes', 'comparateur', 'phases', 'qualite', 'recette', 'acceptation', 'non regression'],
```

- [ ] **Step 11 : Mettre à jour la ligne M3 de `src/modules/index.ts`**

Remplacer la ligne existante par :

```ts
  { id: 'm3-methodes', num: 3, slug: 'module-3', titre: 'Cycle en V, cascade et choix de méthode', resume: 'Phases, tests en miroir du V, cascade simple, critères d’acceptation, recette, comparateur sans dogme.', motsCles: ['cycle en v', 'waterfall', 'cascade', 'methodes', 'comparateur', 'phases', 'qualite', 'recette', 'acceptation', 'non regression'] },
```

- [ ] **Step 12 : Relancer les tests ciblés M3 et M7**

Run: `npx vitest run tests/search.test.ts tests/typo.test.tsx`

Expected: PASS. Les deux resumes globaux et locaux sont à jour, `recette` et `regression` renvoient le module 3, `raci` et `gouvernance` renvoient le module 7, et les deux quiz affichent cinq questions.

- [ ] **Step 13 : Lancer la suite complète**

Run: `npm test`

Expected: PASS, 151 tests.

- [ ] **Step 14 : Point d’arrêt**

Ne pas committer. Laisser les modifications dans l’arbre de travail et demander l’accord explicite de l’utilisateur avant tout commit.

---

### Task 4 : Glossaire enrichi

**Files:**
- Modify: `src/lib/glossaire.ts`
- Modify: `src/routes/Glossaire.tsx`
- Test: `tests/glossaire.test.ts`

**Interfaces:**
- Consumes: rien.
- Produces: `TERMES` avec neuf entrées supplémentaires et une description SEO mise à jour.

- [ ] **Step 1 : Ajouter le test des neuf termes**

Dans `tests/glossaire.test.ts`, après le test `contient au moins 25 termes`, ajouter :

```ts
  it('contient les neuf termes des angles morts', () => {
    const noms = TERMES.map((t) => t.terme);
    for (const terme of [
      'Comité de pilotage',
      'Critère d’acceptation',
      'Définition de prêt',
      'Gouvernance',
      'Journal de décisions',
      'Non-régression',
      'RACI',
      'Recette',
      'Sponsor',
    ]) {
      expect(noms).toContain(terme);
    }
  });
```

- [ ] **Step 2 : Vérifier l’échec**

Run: `npx vitest run tests/glossaire.test.ts`

Expected: FAIL. Les neuf termes sont absents de `TERMES`.

- [ ] **Step 3 : Ajouter les neuf entrées dans `src/lib/glossaire.ts`**

Insérer `Comité de pilotage` après `Chaîne CI` :

```ts
  { terme: 'Comité de pilotage', definition: 'Instance de suivi et d’arbitrage qui réunit les décideurs aux moments clés du projet.', module: 7 },
```

Insérer `Critère d’acceptation` après `Conduite du changement` et avant `Cycle en V` :

```ts
  { terme: 'Critère d’acceptation', definition: 'Condition observable et testable qui permet de dire si un livrable est accepté.', module: 3 },
```

Insérer `Définition de prêt` après `Définition de fini` :

```ts
  { terme: 'Définition de prêt', definition: 'Critères partagés qui disent quand une tâche est assez claire pour commencer.', module: 3 },
```

Insérer `Gouvernance` après `GANTT` :

```ts
  { terme: 'Gouvernance', definition: 'Répartition des rôles, des instances et des droits de décision qui rend le projet lisible.', module: 7 },
```

Insérer `Journal de décisions` après `Jalon` :

```ts
  { terme: 'Journal de décisions', definition: 'Trace courte d’une décision, de son motif, de son responsable et de sa suite.', module: 7 },
```

Insérer `Non-régression` après `Marge d’aléa` :

```ts
  { terme: 'Non-régression', definition: 'Vérification qu’un changement ne casse pas ce qui fonctionnait déjà.', module: 3 },
```

Insérer `RACI` puis `Recette` après `Planning poker` et avant `Registre des risques` :

```ts
  { terme: 'RACI', definition: 'Matrice qui précise, pour chaque activité, qui réalise, qui rend compte et décide, qui est consulté et qui est informé.', module: 7 },
  { terme: 'Recette', definition: 'Vérification avec les parties prenantes que le livrable répond aux critères d’acceptation.', module: 3 },
```

Insérer `Sponsor` après `Scrum` et avant `Suivi` :

```ts
  { terme: 'Sponsor', definition: 'Personne qui porte le projet, débloque les moyens et répond au niveau décisionnel.', module: 7 },
```

- [ ] **Step 4 : Mettre à jour la description de `src/routes/Glossaire.tsx`**

Remplacer la ligne `SeoHead` par :

```tsx
      <SeoHead title="Glossaire" description={'Glossaire neutre du cours Gestion de Projet IT\u00A0: cadrage, planification, méthodes, agiles, outils, équipe, gouvernance, qualité, budget et changement.'} />
```

- [ ] **Step 5 : Relancer les tests du glossaire et de typographie**

Run: `npx vitest run tests/glossaire.test.ts tests/typo.test.tsx`

Expected: PASS. Les neuf termes existent, les définitions restent entre 30 et 240 caractères, les renvois restent dans 1 à 9, et la page glossaire reste typographiquement valide.

- [ ] **Step 6 : Lancer la suite complète**

Run: `npm test`

Expected: PASS, 152 tests.

- [ ] **Step 7 : Point d’arrêt**

Ne pas committer. Laisser les modifications dans l’arbre de travail et demander l’accord explicite de l’utilisateur avant tout commit.

---

### Task 5 : Vérification finale et livraison conditionnelle

**Files:**
- No source change expected.
- Verify: `dist/`, `D:\0CODE\AntiGravity\Cours_Memos\Docker\gestion-projet-it\`
- Conditional modify: `D:\0CODE\AntiGravity\Cours_Memos\Docker\changelog.md`

**Interfaces:**
- Consumes: toutes les tâches précédentes.
- Produces: preuves de tests, smoke, Lighthouse et diff de build; livraison Docker seulement après accord explicite.

- [ ] **Step 1 : Lancer la suite complète et les contrôles statiques**

Run:

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

Expected: 152 tests, lint sans erreur, typecheck sans erreur, build réussi. Noter le nom exact du bundle produit dans `dist/assets/index-*.js`.

- [ ] **Step 2 : Lancer le smoke sur le build**

Terminal A:

```bash
npm run preview
```

Terminal B:

```bash
NODE_OPTIONS=--dns-result-order=ipv4first npm run smoke
```

Expected: 7 tests Playwright passent; 12 routes répondent; zéro requête externe, zéro erreur console, `sw.js` v3.

- [ ] **Step 3 : Contrôles manuels ciblés**

Avec le serveur de prévisualisation toujours actif, ouvrir :

- `http://localhost:4173/gestion-projet-it/module-3`
- `http://localhost:4173/gestion-projet-it/module-7`
- `http://localhost:4173/gestion-projet-it/glossaire`

À 390, 736 et 1440 px, vérifier l’absence de débordement horizontal, la hiérarchie des titres et la lisibilité des nouveaux paragraphes. Sur l’accueil, comparer les résumés des cartes M3/M7 avec les en-têtes de module et l’index global. Au clavier, parcourir les quiz M3/M7 : cinq questions, verdict, gain unique, bouton de reprise. Dans le glossaire, vérifier les neuf termes, leurs liens vers les modules 3 et 7 et le sommaire alphabétique.

Expected: tous les contrôles passent, sans erreur console ni requête externe.

- [ ] **Step 4 : Lancer Lighthouse mobile sur l’accueil**

Avec le serveur de prévisualisation toujours actif :

```bash
npx --yes lighthouse@12 http://localhost:4173/gestion-projet-it/ --only-categories=performance,accessibility --form-factor=mobile --output=json --output-path="C:/Users/Geoffroy/AppData/Local/Temp/opencode/lighthouse-angles-morts.json" --chrome-flags="--headless=new"
```

Expected: performance et accessibilité supérieures ou égales à 0,90, attendu 1,00.

- [ ] **Step 5 : Vérifier le build local**

Run:

```bash
ls dist/assets/index-*.js
sha256sum dist/index.html dist/assets/index-*.js dist/assets/index-*.css dist/sw.js dist/manifest.webmanifest dist/sitemap.xml
```

Expected: un seul bundle principal haché, nom relevé pour le changelog; six empreintes SHA-256 relevées pour `index.html`, le JS, le CSS, `sw.js`, `manifest.webmanifest` et `sitemap.xml`. Aucun fichier source, aucun test, aucun dossier `.shots/` dans `dist`.

- [ ] **Step 6 : Point d’arrêt avant toute livraison**

Ne pas copier vers Docker, ne pas modifier le changelog plateforme, ne pas committer et ne pas pousser. Demander à l’utilisateur l’accord explicite de livraison.

Les étapes suivantes ne s’exécutent qu’après cet accord.

- [ ] **Step 7 : Copier le build vérifié vers le dossier plateforme**

```bash
rm -rf "D:/0CODE/AntiGravity/Cours_Memos/Docker/gestion-projet-it"/*
cp -r dist/* "D:/0CODE/AntiGravity/Cours_Memos/Docker/gestion-projet-it/"
diff -rq dist "D:/0CODE/AntiGravity/Cours_Memos/Docker/gestion-projet-it"
```

Expected: `diff` sans sortie.

- [ ] **Step 8 : Mettre à jour le changelog plateforme**

Ajouter l’entrée `2.17.55` dans `D:\0CODE\AntiGravity\Cours_Memos\Docker\changelog.md` avec les résultats réels relevés aux étapes 1, 2 et 4 et le nom exact du bundle produit. Ne pas recopier le motif `index-*.js` : reporter le nom relevé à l’étape 1. Contenu attendu :

```md
## 2.17.55 - 2026-10-20

- Gestion de Projet IT : angles morts (gouvernance et RACI, qualité et recette), glossaire enrichi, quiz M3 et M7 à cinq questions.
- Tests : 152/152. Smoke : 7/7. Lighthouse accueil mobile : performance et accessibilité supérieures ou égales à 90, attendu 100.
- Build : bundle principal produit à l’étape 1 (reporter son nom exact), sans ancien asset haché.
- Empreintes : reporter les valeurs SHA-256 exactes relevées à l’étape 5 pour `index.html`, le JS, le CSS, `sw.js`, `manifest.webmanifest` et `sitemap.xml`.
- Sitemaps, `robots.txt`, manifest et service worker v3 inchangés.
```

- [ ] **Step 9 : Contrôler le dépôt plateforme**

```bash
git -C "D:/0CODE/AntiGravity/Cours_Memos/Docker" status --short
```

Expected: seuls `gestion-projet-it/` et `changelog.md` sont modifiés pour ce lot. Les entrées neurodivers et les autres travaux sales ne sont ni touchés ni indexés.

- [ ] **Step 10 : Commit et push conditionnels**

Uniquement après accord explicite de l’utilisateur :

```bash
git -C "D:/0CODE/AntiGravity/Cours_Memos/Docker" add gestion-projet-it changelog.md
git -C "D:/0CODE/AntiGravity/Cours_Memos/Docker" commit -m "feat: angles morts gestion-projet-it 2.17.55"
git -C "D:/0CODE/AntiGravity/Cours_Memos/Docker" push
```

Expected: un seul commit et un seul push, contenant uniquement le module, le build et le changelog.

- [ ] **Step 11 : Point d’arrêt final**

Les modifications source restent non commitées sauf demande explicite. Ne pas relancer de smoke ou de Lighthouse après la copie sans rebuild, car le build copié est celui qui a été vérifié.
