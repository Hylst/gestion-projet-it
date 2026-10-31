# Audit d’accessibilité du parcours Cybersécurité

**Date :** 30 octobre 2026
**Statut :** conforme pour les pages (30 octobre 2026) et les laboratoires (31 octobre 2026)
**Périmètre :** `/cybersecurite`, `/cybersecurite/menaces`, `/cybersecurite/acces`, `/cybersecurite/dependances`, `/cybersecurite/donnees`, `/cybersecurite/incident` et les trois laboratoires intégrés.
**Référence :** WCAG 2.2 AA, sans certification.

## 1. Méthode

- Revue de structure et de sémantique dans les tests de composants.
- Smoke Playwright sur les 31 routes, les liens internes, les ancres et le clavier.
- Lighthouse mobile sur l’accueil et `/cybersecurite`.
- Contrôle des largeurs 390, 720, 768 et 1440 px.
- Contrôle du mouvement réduit et de l’impression.
- Vérification des liens externes et de l’absence de chargement automatique.

## 2. Résultats

| Contrôle | Résultat |
| --- | --- |
| Langue de la page | `lang="fr"` dans `index.html` |
| Titre et description par route | `SeoHead` sur les six pages |
| Titre principal | Un seul `h1` par page |
| Hiérarchie | `h1`, `h2`, `h3` continus |
| Repères | `header`, `nav`, `main`, `footer` |
| Lien d’évitement | Présent et focalisable |
| Sommaire | Six ancres valides par page, vérifiées dans les tests |
| Focus visible | Contour global sur liens, boutons, champs et éléments focusables |
| Navigation clavier | Smoke clavier sur le header, la recherche et les liens |
| Liens externes | `target="_blank"` et `rel="noopener noreferrer"` |
| Libellé des liens | Texte visible, complément « nouvel onglet » en lecture d’écran |
| Contrastes | Aucun échec `color-contrast` dans Lighthouse |
| Mouvement réduit | Transitions ramenées à 0,00001 s avec `prefers-reduced-motion` |
| Tableaux | `caption`, `scope`, défilement horizontal accessible |
| Impression | Checklist visible, sommaire et pagination masqués |
| Chargement externe | Aucun chargement automatique |
| Laboratoires | Radios, liste de rôles, boutons Monter et Descendre, messages `alert` et `status` |

## 3. Lighthouse mobile

| Page | Performance | Accessibilité | Bonnes pratiques | SEO |
| --- | --- | --- | --- | --- |
| `/` | 100 | 100 | 100 | 100 |
| `/cybersecurite` | 99 | 100 | 100 | 100 |

Le contrôle de contraste ne relève aucun échec. Le CLI Lighthouse peut sortir avec le code 1 sous Windows lors du nettoyage du profil temporaire (`EPERM`) ; les rapports JSON produits sont complets et les scores sont lus depuis ces fichiers.

## 4. Tests et smoke

- `npm test` : 42 fichiers, 280 tests passés.
- `npm run lint` : aucune erreur.
- `npm run typecheck` : aucune erreur.
- `npm run check:liens` : 67 liens relatifs, 31 routes, sitemap cohérent.
- `npm run build` : build production réussi.
- Smoke Playwright : 16 tests passés, 31 routes rechargées, zéro erreur console, zéro requête externe.
- Contrôle des largeurs : 6 routes × 390, 768 et 1440 px, aucun débordement horizontal, un seul `h1` par page, tableaux en défilement horizontal.
- Contrôle à 720 px : aucun débordement, mouvement réduit actif.

## 5. Limites

- Pas de test avec un lecteur d’écran réel dans ce lot.
- Le zoom navigateur à 200 % est approché par une largeur de 720 px, sans débordement.
- Les scores Lighthouse dépendent du poste et du réseau local.
- Les sites externes cités dans les sources ne sont pas audités dans leur contenu.
- Les trois laboratoires sont couverts par l’extension du 31 octobre 2026 ci-dessous.

## 6. Décision

Le parcours Cybersécurité est conforme aux critères vérifiés de WCAG 2.2 AA pour ses pages et ses laboratoires. `QUA-001` reste ouvert pour le parcours Produit.

## 7. Extension du 31 octobre 2026 : laboratoires

- Trois laboratoires intégrés : modèle de menace avec cinq scénarios, matrice d’accès avec quatre rôles, chronologie avec six actions.
- Interactions : radios, liste de rôles, boutons Monter et Descendre. Aucun glisser-déposer obligatoire.
- Messages d’erreur en `role="alert"`, succès en `role="status"`, aucun message `+5 XP`.
- Aucun stockage local, aucun XP, aucune requête externe.
- Tests : 49 fichiers, 298 tests passés.
- Smoke : 16 tests passés, chronologie complétée au clavier, zéro erreur console.
- Lighthouse mobile : `/cybersecurite`, `/cybersecurite/menaces`, `/cybersecurite/acces` et `/cybersecurite/incident` à 99 en performance et 100 en accessibilité, bonnes pratiques et SEO.
- Contrôle clavier : boutons nommés, focus visible, boutons désactivés aux bornes de la chronologie.
- Limite : pas de test avec un lecteur d’écran réel.
