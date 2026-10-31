# Laboratoires Cybersécurité : conception

Date : 2026-10-31
Statut : proposition de second lot, à valider avant planification.
Périmètre : `CYB-007`, trois laboratoires intégrés aux pages existantes.

## 1. Contexte et objectif

Le premier lot du parcours Cybersécurité ouvre six routes et cinq pages. Les laboratoires de `CYB-007` ont été reportés. Ce lot ajoute trois exercices manipulables, sans nouvelle route et sans XP.

Objectifs :

1. Faire manipuler un modèle de menace, une matrice d’accès et une chronologie d’incident.
2. Garder une interaction clavier complète, sans glisser-déposer obligatoire.
3. Ne modifier ni la progression, ni les clés `gestion-projet-it:*`, ni le compteur `0/9`.
4. Réutiliser le gabarit de laboratoire existant, avec une variante sans XP.
5. Rester 100 % front, sans dépendance, sans cookie et sans requête externe.

## 2. Périmètre

### Inclus

- `LaboModeleMenace` dans la section « Construire un modèle de menace » de `/cybersecurite/menaces`.
- `LaboMatriceAcces` dans la section « Revue des accès » de `/cybersecurite/acces`.
- `LaboTimelineIncident` dans la section « Préparer » de `/cybersecurite/incident`.
- Une variante `sansXp` du composant `LaboFrame`.
- Les tests de logique, de rendu, de clavier et de non-régression.
- La mise à jour du smoke, de l’audit d’accessibilité, du backlog et du changelog.

### Exclu

- Toute nouvelle route, tout nouveau sitemap et tout nouveau service worker.
- Tout XP, tout stockage local, tout bouton « Terminé » persistant.
- Tout glisser-déposer exclusif, tout canvas et toute animation obligatoire.
- Tout scénario d’attaque opérationnel ou code d’exploit.
- Toute dépendance supplémentaire.
- Toute livraison Docker sans accord explicite.

## 3. Décisions

1. Les laboratoires vivent dans `src/labos/` et sont intégrés aux pages, sans route dédiée.
2. `LaboFrame` reçoit deux props optionnelles : `sansXp?: boolean` et `messageValide?: string`. Sans ces props, le comportement actuel et le message `+5 XP` restent inchangés.
3. Les laboratoires cyber n’utilisent ni `useProgress`, ni `localStorage`, ni `onValide`. La validation reste un état local de la session.
4. Le modèle de menace est un exercice d’association entre cinq récits et une parade parmi trois.
5. La matrice d’accès est un exercice d’attribution d’un droit minimal à quatre rôles.
6. La chronologie d’incident est un exercice d’ordonnancement de six actions avec des boutons Monter et Descendre.
7. Les interactions utilisent des boutons, des radios et des listes sémantiques. Aucun geste de glisser-déposer n’est requis.
8. Les messages de validation sont explicites et sans jugement.
9. Le smoke vérifie un parcours complet sur la chronologie et l’absence de `+5 XP` dans les laboratoires cyber.
10. L’audit d’accessibilité du parcours est complété avec les trois laboratoires.

## 4. Architecture

### 4.1 Fichiers

Créer :

- `src/labos/LaboModeleMenace.tsx`.
- `src/labos/LaboMatriceAcces.tsx`.
- `src/labos/LaboTimelineIncident.tsx`.
- `tests/labos/modele-menace.test.ts`.
- `tests/labos/modele-menace-render.test.tsx`.
- `tests/labos/matrice-acces.test.ts`.
- `tests/labos/matrice-acces-render.test.tsx`.
- `tests/labos/timeline-incident.test.ts`.
- `tests/labos/timeline-incident-render.test.tsx`.

Modifier :

- `src/components/LaboFrame.tsx` : props `sansXp` et `messageValide`.
- `src/cyber/content/Menaces.tsx`, `Acces.tsx`, `Incident.tsx` : intégration des labos.
- `tests/cyber.test.tsx` : présence des labos et absence de XP.
- `smoke/smoke.spec.ts` : parcours du labo chronologie.
- `docs/accessibilite/audit-2026-10-30-parcours-cybersecurite.md` : ajout des labos.
- `BACKLOG.md`, `CHANGELOG.md`, `README.md` : état et preuves.

### 4.2 Variante sans XP

`LaboFrame` garde sa signature actuelle et ajoute :

```ts
sansXp?: boolean;
messageValide?: string;
```

Le message de succès devient :

```tsx
{props.valide && (
  <p className="ok" role="status">
    {props.messageValide ?? (props.sansXp ? 'Labo terminé.' : 'Labo validé\u00A0: +5 XP (un seul gain).')}
  </p>
)}
```

Aucun laboratoire existant ne change de comportement.

## 5. Contenu des laboratoires

### 5.1 Modèle de menace

Titre : « Labo : associer menaces et parades ».
Consigne : « Choisis une parade proportionnée pour chacun des cinq scénarios fictifs, puis vérifie. »

Cinq scénarios :

| Scénario | Menace | Bonne parade |
| --- | --- | --- |
| Un courriel demande au bureau de saisir son mot de passe pour consulter une facture. | Hameçonnage | MFA et signalement du message |
| Un ancien prestataire garde un accès au site après la fin de sa mission. | Accès oublié | Révoquer le compte et revoir les accès |
| Une bibliothèque du site n’est plus mise à jour depuis un an. | Dépendance vulnérable | Auditer et mettre à jour la bibliothèque |
| La seule sauvegarde du site est stockée sur le même serveur. | Perte de service | Copie hors ligne et restauration testée |
| Un bénévole envoie un fichier d’adhérents à la mauvaise adresse. | Erreur humaine | Minimiser les données et vérifier le destinataire |

Chaque scénario propose trois parades, une seule correcte. Les mauvaises options sont plausibles mais disproportionnées ou dangereuses. La vérification signale les scénarios sans choix et les choix incorrects, avec la menace rappelée.

État : `Record<string, string>` scénario vers parade choisie.
Fonctions exportées : `SCENARIOS`, `initialiserModele`, `choisirParade`, `verifierModele`.

### 5.2 Matrice des accès

Titre : « Labo : attribuer le droit minimal ».
Consigne : « Sélectionne un rôle, choisis le droit minimal qui lui suffit, puis vérifie. »

Quatre rôles :

| Rôle | Besoin | Droit minimal |
| --- | --- | --- |
| Bénévole | Mettre à jour les textes du site | Édition du contenu |
| Chef de projet | Publier et administrer le site | Administration |
| Prestataire | Corriger une page pendant une mission | Édition temporaire |
| Bureau | Lire les adhésions pour valider les comptes | Lecture seule |

Quatre droits : `Lecture seule`, `Édition du contenu`, `Édition temporaire`, `Administration`.

Interaction : liste de rôles avec sélection, puis quatre boutons de droit. Le rôle sélectionné reçoit le droit choisi. La vérification signale les rôles sans droit et les droits trop larges, avec le besoin rappelé.

État : `Record<string, string>` rôle vers droit choisi.
Fonctions exportées : `ROLES_ACCES`, `DROITS_ACCES`, `initialiserAcces`, `attribuerDroit`, `verifierAcces`.

### 5.3 Chronologie d’incident

Titre : « Labo : ordonner la réponse à incident ».
Consigne : « Replace les six actions dans l’ordre de réponse, avec les boutons Monter et Descendre, puis vérifie. »

Ordre attendu :

1. Détecter et qualifier l’alerte.
2. Confiner et révoquer les accès.
3. Préserver les journaux et les preuves.
4. Décider et communiquer.
5. Restaurer et tester le service.
6. Tirer les leçons et planifier les actions.

L’ordre initial est volontairement mélangé. Chaque action est un élément de liste avec deux boutons nommés « Monter » et « Descendre ». Le premier bouton Monter et le dernier bouton Descendre sont désactivés. La vérification indique la première position divergente et l’action attendue.

État : `string[]` d’identifiants d’action.
Fonctions exportées : `ACTIONS_INCIDENT`, `ORDRE_INCIDENT`, `initialiserChronologie`, `deplacerAction`, `verifierChronologie`.

## 6. Intégration et style

Les laboratoires reprennent les classes existantes `.labo`, `.labo-head`, `.labo-body`, `.labo-actions`, `.messages`, `.ok`, `.wbs-cards` et `.wbs-card`. Aucun nouveau fichier CSS n’est nécessaire, sauf un ajustement mineur pour la liste d’actions :

```css
.cyber-timeline { list-style: none; padding: 0; display: grid; gap: 0.6rem; }
.cyber-timeline li { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; }
.cyber-timeline .rang { font-weight: 700; min-width: 1.5rem; }
```

Les boutons de déplacement ont un libellé accessible explicite, par exemple « Monter Décider et communiquer ».

## 7. Accessibilité

- Un seul `h3` de laboratoire par page, sous le `h2` de section.
- Radios dans des `fieldset` avec `legend`.
- Liste de rôles en `listbox` avec navigation par flèches, comme les labos existants.
- Boutons de déplacement avec `aria-label` explicite.
- Messages d’erreur en `role="alert"`, message de succès en `role="status"`.
- Aucun glisser-déposer obligatoire.
- Focus visible et retour du focus après une sélection.
- Contrastes AA, aucun contenu porté uniquement par la couleur.
- Aucun XP, aucun stockage, aucune requête externe.

## 8. Tests

### 8.1 Logique

- Modèle de menace : choix, réinitialisation, vérification des scénarios manquants et incorrects.
- Matrice d’accès : attribution, réinitialisation, vérification des droits manquants et trop larges.
- Chronologie : déplacement vers le haut et le bas, bornes, vérification de l’ordre et du premier écart.

### 8.2 Rendu et clavier

- Chaque labo affiche son titre, sa consigne, ses options et son bouton Vérifier.
- Le modèle de menace valide les cinq bonnes parades et affiche le message de succès.
- La matrice d’accès attribue un droit au clavier et valide les quatre rôles.
- La chronologie se réordonne avec les boutons et valide l’ordre attendu.
- Aucun laboratoire cyber n’affiche `+5 XP`.

### 8.3 Pages et smoke

- `tests/cyber.test.tsx` vérifie la présence des trois labos et l’absence de `+5 XP`.
- Smoke : ouvrir `/cybersecurite/incident`, déplacer une action, vérifier, constater le message de succès et l’absence de requête externe.
- `tests/typo.test.tsx` couvre les pages avec les labos.

### 8.4 Audit

- Mettre à jour `docs/accessibilite/audit-2026-10-30-parcours-cybersecurite.md` avec les trois labos, le clavier, les messages et l’absence de XP.
- Vérifier Lighthouse sur `/cybersecurite`, `/cybersecurite/menaces`, `/cybersecurite/acces` et `/cybersecurite/incident` en mobile.

## 9. Risques et parades

- **Interaction trop complexe** : trois exercices courts, un objectif par labo.
- **Confusion avec les labos notés** : message sans XP, vocabulaire « Labo terminé ».
- **Accessibilité du réordonnancement** : boutons Monter et Descendre, pas de glisser-déposer.
- **Charge de contenu** : cinq scénarios, quatre rôles, six actions.
- **Régression des labos existants** : `LaboFrame` garde son comportement par défaut, tests de non-régression.
- **Bundle** : trois composants légers, aucune dépendance.

## 10. Critères d’acceptation

1. Les trois laboratoires sont visibles dans les pages menaces, accès et incident.
2. Chaque laboratoire se termine par un message de succès sans XP.
3. Aucun laboratoire ne lit ou n’écrit dans `localStorage`.
4. La chronologie se réordonne entièrement au clavier.
5. La matrice d’accès et le modèle de menace se complètent au clavier.
6. Les tests de logique, de rendu, de pages, de typographie et le smoke passent.
7. Lighthouse mobile reste au moins 90 en performance et accessibilité sur les pages concernées.
8. Aucune dépendance, aucun cookie, aucune requête externe et aucune ressource externe ne sont ajoutés.
9. Aucune route, aucun sitemap et aucune version de service worker ne changent.
10. Aucun fichier n’est copié dans Docker sans accord explicite.
