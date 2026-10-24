# Sécurité

## Signaler une vulnérabilité

Écrire à `geoffroy.streit@gmail.com` avec une description reproductible, la page concernée et, si possible, une proposition de correction. Ne pas publier de secret, de donnée personnelle ou d’exploit détaillé avant réponse.

## Périmètre

- Application statique et service worker.
- Configuration Nginx et en-têtes de sécurité.
- Dépendances npm.
- Chaîne de build et de déploiement.

## Règles

- Aucun secret, jeton, clé ou fichier `.env` dans le dépôt.
- Aucun script inline.
- Aucune ressource distante au chargement.
- `npm audit` et GitGuardian avant publication.
- Les signalements sont traités dans un délai raisonnable, sans promesse de prime.
