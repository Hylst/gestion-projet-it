# Politique de sources et de veille

**Date :** 24 octobre 2026
**Statut :** applicable
**Périmètre :** ressources des neuf modules, parcours Produit et Cybersécurité, fiches outils et futurs contenus.

## 1. Principe

Une ressource est acceptée si elle peut être rattachée à un organisme identifiable et si son usage est précis. Une source officielle ne vaut pas validation générale : elle éclaire un point, avec ses limites.

Aucune ressource n’est chargée automatiquement. Un lien externe s’ouvre après une action de l’utilisateur, dans un nouvel onglet, avec `rel="noopener noreferrer"`.

## 2. Champs obligatoires

Chaque ressource porte :

- un organisme identifiable ;
- un titre ;
- une URL stable ;
- une date ou une version ;
- un usage recommandé ;
- une limite explicite ;
- une date de dernière vérification.

Les données de la bibliothèque sont dans `src/lib/ressources.ts`. La page `/ressources` est la vue publique.

## 3. Niveaux de source

1. **Norme ou cadre institutionnel** : organisme de normalisation, autorité publique, agence. Exemple : W3C, CNIL, ANSSI, GOV.UK.
2. **Documentation officielle d’un outil** : éditeur du produit. Elle décrit l’outil, pas une méthode universelle.
3. **Guide professionnel** : association ou organisme reconnu. Il est daté et présenté avec sa limite.
4. **Opinion ou retour d’expérience** : utile pour illustrer, jamais pour établir une règle générale.

Une norme payante est signalée comme telle. Un contenu généré sans relecture n’est pas publié.

## 4. Procédure d’acceptation

1. Vérifier l’organisme et l’URL.
2. Ouvrir la page et contrôler le titre, la date ou la version.
3. Écrire l’usage précis et la limite.
4. Vérifier que la ressource n’est pas un lien d’affiliation.
5. Ajouter la date de vérification.
6. Relire la formulation selon la charte éditoriale.
7. Tester que le lien ne provoque aucun chargement au chargement de la page.

Un accès automatisé refusé par un site officiel ne suffit pas à déclarer le lien mort. Il est signalé dans la revue, puis vérifié dans un navigateur.

## 5. Revue périodique

- Revue annuelle au minimum, ou à chaque changement de version majeur.
- Revue immédiate si un organisme publie une nouvelle édition, change d’URL ou retire le document.
- La date de vérification est mise à jour dans les données et dans la page.
- Une ressource sans date de vérification n’est pas publiée.

## 6. Retrait

Une ressource est retirée si :

- l’URL ne répond plus ;
- l’organisme a disparu ou le document est remplacé sans archive ;
- le contenu contredit une source officielle plus récente ;
- le lien est affilié ou promotionnel ;
- la limite ne peut plus être expliquée simplement.

Le retrait ne supprime pas l’historique du changelog. Il remplace la ressource ou laisse une section vide plutôt qu’un lien douteux.

## 7. Journal de vérification

Vérification du 24 octobre 2026, 24 URL en réponse HTTP 200.

| Périmètre | Ressources | Date | Résultat |
| --- | --- | --- | --- |
| Modules 1 à 9 | 18 | 24 octobre 2026 | 18 URL accessibles |
| Parcours Produit | 3 | 24 octobre 2026 | 3 URL accessibles |
| Parcours Cybersécurité | 3 | 24 octobre 2026 | 3 URL accessibles |
| Pages du parcours Cybersécurité | 6 | 30 octobre 2026 | 4 URL en 200, 2 protégées, vérifiées au navigateur |

Vérification complémentaire du 30 octobre 2026 pour les six sources des pages du parcours Cybersécurité : ANSSI, CNIL, OWASP et NIST répondent en HTTP 200. ISO/IEC 27001 répond en 403 au contrôle automatisé et en 200 dans un navigateur. EUR-Lex répond en 202 derrière un pare-feu applicatif ; la page du règlement est rendue dans le navigateur. Aucune source n’est déclarée morte sur la seule foi d’un refus automatisé.

Prochaine revue : 24 octobre 2027, ou avant en cas de changement de version.

## 8. Limites

- La vérification automatisée ne remplace pas une lecture humaine.
- Une page officielle peut évoluer sans changer d’URL.
- Les sources du parcours Cybersécurité ont été relues le 30 octobre 2026. Celles du parcours Produit seront relues à son ouverture.
- Aucun conseil juridique ou comptable personnalisé n’est déduit d’une ressource.
