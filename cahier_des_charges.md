# Gestion de Projet IT - cahier des charges (source de verite)

> **Addendum 2026-10-23 :** l’état livré, les commandes et les priorités courantes sont décrits dans `README.md` et `BACKLOG.md`. La section 17 est historique : les trois modules v2 sont livrés.

## 1. Vision

Apprendre a mener un projet informatique : cadrer, decouper (WBS),
planifier (PERT, GANTT), choisir sa methode (cycle en V, Scrum, Kanban,
Lean, XP), outiller (suivi, CI/CD, environnements reproductibles),
suivre et animer l equipe. Formats courts, cas fictifs, quiz corriges,
laboratoires interactifs. Outils reels cites a titre informatif
(suivi, forge, CI/CD, conteneurs), exemples d usage fictifs uniquement.
Aucune ecole presentee comme superieure, aucune certification promise.

## 2. Identite

- Nom : Gestion de Projet IT. Accroche : Methodologies et Equipes.
- Slug : `gestion-projet-it`. URL : `https://hylst.fr/gestion-projet-it/`.
- Source : `D:\0CODE\OpenCode\gestion-projet-it`. Build depose dans
  `D:\0CODE\AntiGravity\Cours_Memos\Docker\gestion-projet-it/`.
- Dépôt source : `https://github.com/Hylst/gestion-projet-it`, privé.
- Hub : carte Bloc 3 active.
- 9 modules, quiz, recherche, gamification XP, dossier projet et section IA.
- Auteur : Geoffroy, avec assistance IA. Licence AGPL-3.0-or-later.

## 3. Perimetre MVP (v1)

1. Cadrer et decouper (WBS).
2. Planifier : PERT et GANTT.
3. Cycle en V et choix de methode.
4. Agiles : Scrum, Kanban, Lean, XP.
5. Outils : suivi, CI/CD et environnements.
6. Equipe, risques (Eisenhower) et suivi.

Chaque module : fiche (5 min) avec rubrique a quoi ca sert et quand
l utiliser, laboratoire SVG manipulable, exercice corrige sur le fil
rouge (refonte fictive du site d une association), quiz 3 questions,
fiche reflexe imprimable.

## 4. Charte editoriale (obligatoire pour tout contenu)

- Methodes et outils decrits avec avantages, limites et cas d usage,
  sans dogme. Chaque outil ou diagramme a sa rubrique a quoi ca sert
  et quand l utiliser.
- Outils reels cites a titre informatif uniquement, jamais moques,
  jamais preferes sans critere. Tous les exemples d usage restent
  fictifs (fil rouge : refonte fictive du site d une association).
- Aucun auteur fictif, aucun chiffre sans source, francais sobre,
  aucun tiret cadratin.

## 5. Architecture technique

- Vite + React + TypeScript, SPA 100 % front, sans compte, sans cookie.
- Router `basename="/gestion-projet-it/"`, build `--base=/gestion-projet-it/`.
- Canonical et `og:url` par route depuis `window.location.href`.
- Progression et XP en `localStorage` (`gestion-projet-it:*`), export JSON.
- PWA : manifest, icones locales, `offline.html`, SW scope au dossier.

## 6. Regles maison (rappel, voir `agents.md`)

Zero externe au runtime, CSP `script-src 'self'`, Lighthouse >= 90,
smoke Playwright avant depot, un seul push (build + carte + sitemap).

## 7. Non objectifs (v1)

- Ni logiciel de gestion operationnel, ni certification, ni backend,
  ni conseil juridique ou comptable.

## 8. Criteres d acceptation (v1)

- 6 modules en ligne, quiz corriges immediats, labos manipulables.
- 0 requete externe, 0 erreur console, sitemap 7 URL minimum.
- Fil rouge coherent sur les 6 modules (refonte fictive).
- Chaque outil et diagramme attendu present avec labo : WBS, PERT,
  GANTT, Kanban avec WIP, Eisenhower placable, comparateur Agile,
  selecteur d outil et chaine CI/CD simplifiee.

## 9. Jalons

- Jalon 1 : maquette (accueil + module type cadrer et decouper).
- Jalons 2 a 6 : un module chacun. Jalon 7 : PWA, sitemap, depot Docker.

## 10. Gabarit de module type

Definition, exemple vecu (fil rouge), demarche en 5 gestes,
laboratoire SVG, exercice corrige (details/summary), quiz 3 questions
(+10 XP des 2/3), fiche reflexe imprimable, bouton termine (+20 XP).

## 11. Activites detaillees par module

### 11.1 Module 1 : cadrer et decouper (WBS)

Besoin, perimetre (dedans et dehors), WBS (a quoi ca sert : visualiser
livrables et lots, partager le perimetre ; quand l utiliser : cadrage,
lotissement, avant planification), jalons, definition de fini. Labo :
decoupage WBS interactif (glisser 8 taches fictives en 3 lots, controle
des oublis, clavier complet). Exercice : cadrer la refonte fictive en
une page plus WBS en 3 lots.

### 11.2 Module 2 : planifier PERT et GANTT

PERT (a quoi ca sert : ordonner taches et dependances, lire la chaine
tendue ; quand l utiliser : projet avec dependances, besoin de date
cible). GANTT (a quoi ca sert : voir qui fait quoi et quand, suivre
l avancement ; quand l utiliser : suivi partage, jalons). Labo :
mini GANTT manipulable (5 taches fictives, deplacer une barre,
dependances affichees, jalons, clavier complet) plus chaine PERT
simplifiee (relier 5 noeuds fictifs, chaine tendue surlignee).
Exercice : lire un GANTT fictif et citer 2 risques de delai plus
1 action.

### 11.3 Module 3 : cycle en V, Waterfall (cycle en cascade) et choix de methode

Phases sequentielles, documentation, tests, retours limites une fois
la phase validee. Waterfall (cycle en cascade, terme demande par
l utilisateur, a ne pas confondre avec un autre mot proche) : suite
simple besoin, conception, realisation, test, deploiement, documents
de fin de phase, avancement par jalons. Cycle en V : variante avec
tests prepares en face de chaque phase de conception (tests unitaires
face au code, tests d integration face a la conception detaillee,
tests systeme face a la conception globale, acceptation face au
besoin). Pour chaque methode : a quoi ca sert et quand l utiliser,
avantages, limites, cas d usage, sans hierarchie entre ecoles.
Comparateur a trois entrees : cycle en V, Waterfall, Agiles
(avantages, limites, cas). Labo : associer 6 livrables fictifs a leur
phase (consigne V ou cascade selon l exercice). Exercice de base :
dire si le cycle en V ou la cascade convient a 3 cas fictifs avec
motif. Exercice dedie demande : cascade face a agile sur 1 cas fictif
a trancher avec motif et parade si le besoin bouge.

### 11.4 Module 4 : Agiles Scrum, Kanban, Lean, XP

Pour chaque methode : a quoi ca sert et quand l utiliser. Scrum
(produit evolutif, backlog priorise, rituels : planning, daily, review,
retro, roles PO, SM, devs, user stories). Kanban (flux continu, colonnes,
limites de WIP, lead time, revue de flux). Lean (eliminer les
gaspillages, petits lots, boucle courte). XP (qualite code, pair,
tests frequents, lien avec la CI du module 5). Labo : tableau Kanban
jouable (avancer 6 cartes fictives, WIP bloque au dela de 2, compteur
de blocages) plus poker planning (estimer 5 stories fictives, comparer
a la correction). Exercice : ecrire 3 user stories correctes et choisir
Scrum ou Kanban pour 2 cas fictifs avec motif.

### 11.5 Module 5 : outils suivi, CI/CD et environnements

Descriptif sans tutoriel operatoire, sans preference. Suivi : Jira et
GitHub Projects cites comme exemples d outils existants (a quoi ca sert :
centraliser backlog, colonnes, assignation ; quand l utiliser : equipe
partagee, besoin de trace). CI/CD avec GitHub Actions cite comme exemple
(a quoi ca sert : tester et livrer a chaque changement ; quand
l utiliser : base partagee, regressions frequentes). Docker cite comme
exemple pour environnements reproductibles (a quoi ca sert : meme poste
partout, onboarding simple ; quand l utiliser : ecarts entre postes,
demo fragile). Labo : selecteur d outil (3 besoins fictifs, outil
suggere avec motif, sans verdict definitif) plus chaine CI simplifiee
(ordonner 4 etapes fictives : test, build, revue, deploiement, clavier
complet). Exercice : choisir l outil adapte a 3 situations fictives
avec motif.

### 11.6 Module 6 : equipe, risques (Eisenhower) et suivi

Communication (qui, quoi, quand), matrice d Eisenhower (a quoi ca sert :
trier urgent et important, decider ; quand l utiliser : surcharge,
arbitrage), registre des risques (probabilite x impact, parade),
indicateurs simples, retrospective. Labo : matrice d Eisenhower placable
(placer 6 taches fictives, quadrant affiche, clavier complet) plus
matrice des risques (placer 6 risques fictifs, priorites calculees).
Exercice : ordre du jour de retro en 4 points plus 2 taches classees
Eisenhower avec motif.

## 12. Quiz, exercices et fiches reflexes

### 12.1 Format commun des quiz

3 questions, 3 choix, corrige immediat par question, +10 XP des 2/3,
un seul gain par quiz (cle locale), bouton recommencer sans XP.

### 12.2 Format commun des exercices corriges

Enonce sur le fil rouge, corrige masque (details/summary), methode
reutilisable, jamais de piege.

### 12.3 Format commun des fiches reflexes

5 items actionnables, bouton imprimer, phrases courtes a l imperatif.

## 13. Specification des visuels SVG interactifs

SVG inline pur, zero asset externe, cliquables au clavier. Prevus :
decoupage WBS en lots, chaine PERT simplifiee, mini GANTT deplacable
(5 taches fictives), phases du cycle en V, poker planning, Kanban avec
WIP bloque, matrice d Eisenhower placable, matrice des risques,
selecteur d outil, chaine CI en 4 etapes a ordonner.

## 14. Gamification et progression

XP : quiz +10, module termine +20, labo termine +5. Niveaux : Curieux
(0), Organisateur (50), Capitaine (120), Chef de projet (200). Badge
Termine par module. Tout en `localStorage`, export JSON. Aucune donnee
sortante.

## 15. Contenus rediges v1 elargie (plan de developpement large)

Tous les nombres ci dessous sont des consignes fictives d exercice,
sauf les XP qui reprennent la section 14. Fil rouge unique et fictif
pour les 6 modules : refonte du site de l association fictive Les
Amis du Square (association fictive creee pour le cours, pages de
presentation, agenda des activites, formulaire de contact fictif).
Aucune methode presentee comme superieure. Chaque methode garde ses
avantages, ses limites et ses cas d usage.

### 15.1 Module 1 : cadrer et decouper (WBS)

Fil rouge, exemple 1 : perimetre fictif en une page. Dedans : pages
de presentation, agenda, formulaire de contact fictif, version mobile
lisible. Dehors : espace membre avec paiement, application mobile
dediee, traduction en plusieurs langues. Jalon fictif : maquette
validee par le bureau fictif de l association.
Fil rouge, exemple 2 : WBS fictif en 3 lots. Lot 1 Contenu : inventaire
des pages, textes relus, photos locales. Lot 2 Realisation : maquette,
integration, tests sur mobile. Lot 3 Mise en ligne : notice simple,
formation courte des benevoles fictifs, sauvegarde.

Exercice 1, enonce : sur le fil rouge fictif, ecris le cadrage en une
page (besoin, dedans et dehors, 3 lots, 2 jalons fictifs, 1 definition
de fini par lot).
Exercice 1, corrige : besoin formule en une phrase (refonte lisible et
simple). Dedans et dehors separes sans recouvrement. 3 lots nommes par
livrable. 2 jalons places (maquette validee, site publie). Definition
de fini concrete par lot (exemple fictif : lot Contenu fini quand
chaque page a un texte relu et une photo locale).

Exercice 2, enonce : la liste fictive melange 8 taches dont 2 hors
perimetre et 1 oubliee (notice benevole). Trie en 3 lots, isole les
hors perimetre, ajoute l oubliee.
Exercice 2, corrige : hors perimetre ecartes avec motif (paiement en
ligne et application dediee, hors cadrage fictif). Oubli ajoute au
lot Mise en ligne. Methode reutilisable : tout item sans lot revele
un oubli ou un hors perimetre.

Quiz 1 : a quoi sert un WBS. Choix A : visualiser les livrables et les
lots pour partager le perimetre. Choix B : coder plus vite. Choix C :
remplacer le planning. Bonne reponse : A. Motif : le WBS montre ce qui
est a livrer, pas comment coder ni quand livrer.
Quiz 2 : ou mettre le paiement en ligne dans le cas fictif. Choix A :
dans le lot Realisation. Choix B : dehors, car hors cadrage fictif.
Choix C : en jalon. Bonne reponse : B. Motif : le cadrage fictif
l exclut, donc il reste dehors avec motif ecrit.
Quiz 3 : qu est ce qu une bonne definition de fini. Choix A : une
formule vague. Choix B : un critere verifiable par lot. Choix C : une
date. Bonne reponse : B. Motif : on peut constater que c est fini,
la date seule ne le prouve pas.

Labo SVG pas a pas, decoupage WBS : etape 1, l ecran montre 8 cartes
fictives et 3 lots vides. Etape 2, glisser ou deplacer au clavier une
carte vers un lot (fleches puis entree). Etape 3, le compteur par lot
se met a jour et signale les lots vides. Etape 4, bouton verifier :
les hors perimetre attendus restent hors lots. Etape 5, aide proposee
si oubli (indice : il manque la notice). Etape 6, validation quand
les 3 lots sont coherents, +5 XP selon section 14.

### 15.2 Module 2 : planifier PERT et GANTT

Fil rouge, exemple 1 : chaine fictive simple. Contenu relu, puis
maquette, puis integration, puis tests, puis mise en ligne. Si la
relecture fictive glisse, tout glisse : chaine tendue visible.
Fil rouge, exemple 2 : GANTT fictif partage. 5 barres fictives avec
responsables fictifs (benevole Contenu, benevole Technique, relecteur
fictif), 1 jalon maquette validee, 1 jalon site publie. La barre tests
ne commence qu apres la fin de l integration fictive.

Exercice 1, enonce : avec 5 taches fictives et leurs dependances
fournies dans l enonce (durees fictives fixees pour l exercice),
cite la chaine tendue et 2 risques de delai plus 1 action.
Exercice 1, corrige : chaine tendue = suite sans marge (exemple de
l enonce : relecture, maquette, integration, tests). Risques fictifs :
relecture tardive, tests repousses par manque de benevole fictif.
Action : figer la relecture a date fictive et preparer un benevole
de rechange fictif.
Exercice 2, enonce : lis le GANTT fictif fourni (5 barres, 1 chevauchement
interdit entre integration et tests). Propose 1 deplacement qui leve
le conflit sans toucher aux jalons fictifs.
Exercice 2, corrige : decaler les tests apres la fin de l integration
fictive, garder les jalons, noter le nouveau flottement de la tache
deplacee. Methode : ne deplacer qu une barre a la fois puis relire
les dependances.

Quiz 1 : a quoi sert un PERT. Choix A : ordonner taches et dependances
et lire la chaine tendue. Choix B : lister les outils. Choix C :
animer une reunion. Bonne reponse : A. Motif : le PERT montre l ordre
et ce qui commande la date cible fictive.
Quiz 2 : a quoi sert un GANTT. Choix A : voir qui fait quoi et quand
et suivre l avancement. Choix B : ecrire le code. Choix C : chiffrer
sans hypothese. Bonne reponse : A. Motif : barres, jalons et avancement
partages, sans lien direct avec le code.
Quiz 3 : que faire si une tache de la chaine tendue glisse. Choix A :
ne rien changer. Choix B : ajouter des taches. Choix C : replanifier
et proteger la chaine (reordre, aide, jalon revu). Bonne reponse : C.
Motif : la chaine tendue commande la fin, il faut agir dessus en
priorite.

Labo SVG pas a pas, GANTT plus PERT : etape 1, GANTT fictif a 5 barres
affiche avec dependances en fleches. Etape 2, deplacer une barre a la
souris ou au clavier (fleches gauche et droite). Etape 3, les dependances
violées passent en alerte et le texte l explique. Etape 4, replacer la
barre apres la precedente requise. Etape 5, basculer vers la vue PERT :
relier 5 noeuds fictifs dans l ordre. Etape 6, la chaine tendue fictive
se surligne et le bouton valider donne +5 XP selon section 14.

### 15.3 Module 3 : cycle en V, Waterfall et choix de methode

Fil rouge, exemple 1, cascade fictive : besoin fige du site fictif
(3 gabarits fictifs), conception, realisation, tests par vague,
deploiement. Chaque fin de phase fictive donne un document relu avant
de passer a la suivante.
Fil rouge, exemple 2, cycle en V fictif : en face de chaque conception,
un test prepare a l avance (acceptation face au besoin fictif, systeme
face a la conception globale fictive, integration face au detail fictif,
unitaire face au code fictif). La recette fictive verifie chaque niveau.

Exercice 1, enonce : pour 3 cas fictifs fournis (site vitrine fige,
demande peu detaillee, besoin medical fictif a contraintes fortes),
dis si V ou cascade convient, avec motif et limite.
Exercice 1, corrige : cas 1 : cascade possible, besoin stable et petit
perimetre fictif, limite : tout changement tardif coute une reprise de
phase. Cas 2 : ni V ni cascade adaptes seuls, besoin flou, limite :
ni l une ni l autre seules, cadrer d abord par maquette ou par lot court. Cas 3 : V pertinent,
traces et tests attendus, limite : lourdeur documentaire a calibrer.
Aucune methode declaree superieure.
Exercice 2 dedie demande, cascade face a agile, enonce : l association
fictive hesite entre cascade (tout figer puis livrer) et agile (livrer
par tranches avec retours). Tranche avec motif et propose 1 parade si
le besoin bouge.
Exercice 2, corrige : tranche possible : agile si le contenu fictif
hesite encore (agenda, galerie), cascade si le contenu est fige et la
date fictive contrainte. Parade : jalon de relecture fige en cascade,
ou tranche 1 courte en agile avec revue. Motif attendu : stabilite du
besoin et capacite a accueillir des retours, pas de dogme.

Quiz 1 : specificite du cycle en V. Choix A : tests prepares en face
de chaque conception. Choix B : aucune documentation. Choix C : livraison
sans tests. Bonne reponse : A. Motif : la forme en V relie chaque
niveau de conception a son niveau de test.
Quiz 2 : specificite Waterfall. Choix A : phases en suite avec validation
par phase. Choix B : phases toutes en parallele sans ordre. Choix C :
absence de jalons. Bonne reponse : A. Motif : on valide une phase
fictive avant de passer a la suivante.
Quiz 3 : bon usage de la cascade. Choix A : besoin stable et jalons
clairs. Choix B : besoin flou qui change chaque semaine. Choix C :
aucune contrainte de qualite. Bonne reponse : A. Motif : la cascade
supporte mal les allers retours tardifs, elle convient quand le besoin
bouge peu.

Labo SVG pas a pas, phases : etape 1, 6 livrables fictifs affiches
(besoin fictif, maquette fictive, code fictif, tests fictifs, recette
fictive, mise en ligne fictive). Etape 2, glisser chaque livrable vers
sa phase (cascade ou V selon consigne). Etape 3, clavier complet
(tabulation, fleches, entree). Etape 4, erreur expliquee sans piege
(exemple : recette attendue en face acceptation). Etape 5, comparateur
a trois entrees affiche avantages, limites et cas. Etape 6, validation
et +5 XP selon section 14.

### 15.4 Module 4 : Agiles Scrum, Kanban, Lean, XP

Fil rouge, exemple 1, Scrum fictif : backlog fictif priorise (accueil,
agenda, contact), tranches courtes, revue avec le bureau fictif,
retro entre benevoles fictifs. Roles fictifs : porteur de besoin fictif,
animateur fictif, realisateurs fictifs.
Fil rouge, exemple 2, Kanban fictif : colonnes A faire, En cours, A
relire, Fini, limite fictive de 2 cartes en En cours, revue de flux
pour debloquer la relecture fictive.

Exercice 1, enonce : ecris 3 user stories correctes pour le site fictif
(qui, quoi, pourquoi) puis choisis Scrum ou Kanban pour 2 cas fictifs
avec motif.
Exercice 1, corrige : stories au format qui, quoi, pourquoi, avec
critere simple (exemple fictif : en tant que visiteur fictif, je veux
voir l agenda fictif pour connaitre les dates). Cas A contenu evolutif
avec priorites : Scrum pertinent. Cas B demandes au fil de l eau :
Kanban pertinent. Limites rappelees pour chaque choix.
Exercice 2, enonce : sur un tableau fictif bloque (3 cartes en En cours
pour une limite fictive de 2), propose 2 actions Lean et 1 pratique XP
liee a la qualite, sans changer l outil de suivi.
Exercice 2, corrige : actions Lean fictives : finir une carte avant
d en commencer une, reduire la taille des cartes. Pratique XP : relecture
croisee et tests frequents avant de passer en A relire. Lien avec le
module 5 : ces tests alimentent la chaine CI simplifiee.

Quiz 1 : role du backlog en Scrum. Choix A : liste priorisee qui pilote
les tranches. Choix B : liste fige pour toujours. Choix C : planning
detaille des heures. Bonne reponse : A. Motif : le backlog evolue avec
les retours, il n est pas fige.
Quiz 2 : limite de WIP en Kanban. Choix A : finir avant de commencer,
pour reveler les blocages. Choix B : commencer le plus possible a la
fois. Choix C : supprimer la colonne Fini. Bonne reponse : A. Motif :
la limite fictive rend visible l encombrement et aide a debloquer.
Quiz 3 : apport Lean et XP. Choix A : petits lots et qualite frequente.
Choix B : gros lot unique sans relecture. Choix C : tests seulement a
la fin. Bonne reponse : A. Motif : Lean reduit les gaspillages par
petits lots, XP soigne le code par tests et relectures frequents.

Labo SVG pas a pas, Kanban plus poker : etape 1, tableau fictif a 4
colonnes avec 6 cartes fictives. Etape 2, avancer une carte (clic ou
clavier). Etape 3, au dela de la limite fictive de 2 en En cours, le
depot est bloque avec message. Etape 4, compteur de blocages fictifs
mis a jour. Etape 5, poker planning : estimer 5 stories fictives puis
comparer a la correction fictive fournie. Etape 6, validation et +5 XP
selon section 14.

### 15.5 Module 5 : outils suivi, CI/CD et environnements

Outils reels cites a titre informatif uniquement, sans moquerie et
sans preference sans critere. Exemples d usage fictifs uniquement.
Fil rouge, exemple 1 : suivi fictif partage. Backlog fictif centralise,
colonnes, assignation a un benevole fictif, trace des decisions
fictives. Besoin couvert : equipe dispersee qui doit voir le reste
a faire.
Fil rouge, exemple 2 : chaine fictive simple. A chaque changement
fictif : tests courts, assemblage, relecture, mise en ligne fictive.
Environnement reproductible fictif pour la demo devant le bureau fictif.

Exercice 1, enonce : pour 3 situations fictives (equipe dispersee,
regressions frequentes, demo fragile sur postes differents), choisis
un type d outil avec motif et limite, sans verdict definitif.
Exercice 1, corrige : situation 1 : outil de suivi partage, motif :
trace et assignation, limite : a renseigner sinon inutile. Situation 2 :
chaine CI avec tests a chaque changement fictif, motif : detecter tot,
limite : tests a entretenir. Situation 3 : environnement reproductible
fictif, motif : meme poste partout, limite : image a maintenir.
Exercice 2, enonce : ordonne 4 etapes fictives (test, assemblage,
relecture, deploiement fictif) et dis ou placer un controle qualite
simple.
Exercice 2, corrige : ordre attendu : test, assemblage, relecture,
deploiement fictif. Controle place avant deploiement, avec critere
simple (tests au vert et relecture faite). Methode : si la relecture
echoue, retour avant deploiement.

Quiz 1 : a quoi sert un outil de suivi. Choix A : centraliser backlog,
colonnes et assignation. Choix B : ecrire a la place de l equipe.
Choix C : garantir le delai seul. Bonne reponse : A. Motif : il rend
visible le travail partage, il ne remplace ni l arbitrage ni le travail.
Quiz 2 : a quoi sert une chaine CI. Choix A : tester et assembler a
chaque changement fictif. Choix B : publier sans aucun controle.
Choix C : remplacer la relecture. Bonne reponse : A. Motif : detection
tot des regressions fictives, relecture gardee.
Quiz 3 : a quoi sert un environnement reproductible. Choix A : meme
poste partout pour demo simple. Choix B : accelerer le reseau. Choix C :
supprimer les tests. Bonne reponse : A. Motif : ecarts entre postes
reduits, onboarding fictif plus simple.

Labo SVG pas a pas, selecteur plus chaine : etape 1, 3 besoins fictifs
affiches. Etape 2, choisir un type d outil par besoin (clic ou clavier).
Etape 3, motif affiche sans verdict definitif, avec limite rappelee.
Etape 4, vue chaine CI : 4 etapes fictives a ordonner par glisser ou
clavier. Etape 5, ordre verifie avec message explicite en cas d inversion.
Etape 6, validation et +5 XP selon section 14.

### 15.6 Module 6 : equipe, risques (Eisenhower) et suivi

Fil rouge, exemple 1 : tri fictif Eisenhower. Tache urgente et
importante fictive : corriger le formulaire fictif casse. Importante
peu urgente fictive : preparer la notice benevole. Urgente peu
importante fictive : repondre a une demande simple d horaire. Ni urgente
ni importante : refaire un logo fictif non demande.
Fil rouge, exemple 2 : registre fictif des risques. Risque fictif 1 :
benevole indisponible avant la mise en ligne. Risque fictif 2 : photos
non recues. Chaque risque fictif note avec parade (benevole de rechange
fictif, jeu de photos locales de rechange).

Exercice 1, enonce : classe 2 taches fictives avec Eisenhower avec motif
et ecris l ordre du jour de retro en 4 points pour le site fictif.
Exercice 1, corrige : classement attendu avec motif urgent et important
separes. Ordre du jour fictif : ce qui a aide, ce qui a gene, 1 action
concrete, qui la porte avec echeance fictive. Methode : 1 action a la
fois, responsable nomme parmi les roles fictifs.
Exercice 2, enonce : pour 3 risques fictifs fournis, place les sur la
matrice probabilite x impact fictive et propose 1 parade par risque
majeur.
Exercice 2, corrige : priorites lues sur la matrice fictive (impact
fort et probabilite forte en premier). Parades simples : rechange,
delai tampon fictif, simplification du perimetre fictif. Suivi par
indicateurs simples (taches finies, blocages, date fictive tenue).

Quiz 1 : usage d Eisenhower. Choix A : trier urgent et important pour
decider. Choix B : tout faire en meme temps. Choix C : trier par ordre
alphabetique. Bonne reponse : A. Motif : l arbitrage vient de la
distinction entre urgence et importance.
Quiz 2 : contenu d un registre des risques. Choix A : risque fictif,
probabilite, impact, parade. Choix B : prenoms sans action. Choix C :
dates seules. Bonne reponse : A. Motif : sans parade ni priorite, le
registre ne sert pas au pilotage.
Quiz 3 : bonne retro. Choix A : 4 points courts avec 1 action attribuee.
Choix B : bilan sans action. Choix C : reproches sans suite. Bonne
reponse : A. Motif : la retro fictive vise une amelioration concrete
et suivie.

Labo SVG pas a pas, Eisenhower plus risques : etape 1, 6 taches fictives
a placer dans 4 quadrants. Etape 2, deplacement souris ou clavier avec
quadrant annonce. Etape 3, quadrant affiche apres depot avec motif court.
Etape 4, vue risques : placer 6 risques fictifs sur probabilite x impact
fictive. Etape 5, priorites calculees localement et parade a choisir.
Etape 6, validation et +5 XP selon section 14.

## 16. Fiche Waterfall (cycle en cascade), complement du module 3

Objet : decrire Waterfall sans dogme, comme demande, et l articuler
avec le cycle en V et les Agiles. Terme retenu : Waterfall, traduit
cycle en cascade dans le cours.
A quoi ca sert : ordonner un travail en phases simples avec jalons,
quand le besoin est stable et les contraintes connues. Quand l utiliser :
petit perimetre fictif fige, jalons contractuels simples, besoin de
traces par phase.
Deroule pedagogique fictif du cours : besoin, conception, realisation,
test, deploiement. Chaque fin de phase fictive produit un document relu
qui autorise la suite. Variante cycle en V : memes phases avec tests
prepares en miroir.
Avantages presentes sans hierarchie : lisibilite, jalons clairs,
documents de reference. Limites presentees : retours tardifs couteux,
besoin flou mal porte, decouverte d usage faible.
Cas fictifs : convient au site vitrine fige, convient peu a un besoin
qui bouge chaque semaine. Exercice dedie demande : voir 15.3, cascade
face a agile, avec tranche motivee et parade.

## 17. Plan de contenu v2 (historique, livré)

Module futur A : parties prenantes et communication.
- Perimetre : identifier les roles fictifs, leurs attentes et leur pouvoir de decision sur le fil rouge fictif.
- Contenu : carte simple des roles, plan de communication (qui, quoi, quand), rituel court de point fictif.
- Cas : bureau fictif, benevoles fictifs, prestataire fictif, visiteurs fictifs, sans donnees reelles.
- Sans dogme : chaque canal garde avantages, limites et cas, aucun outil impose.
- Labo envisage : placer 6 roles fictifs sur une carte et generer un plan de messages fictif a valider.

Module futur B : budget et chiffrage.
- Perimetre : chiffrer en charges fictives, sans conseil comptable ni juridique, montants fictifs d exercice uniquement.
- Contenu : lots valorises, hypothese ecrite par lot, marge d alea fictive expliquee comme consigne, suivi simple.
- Cas : devis fictif pour la refonte fictive, variantes avec et sans galerie fictive, arbitrage motive.
- Sans dogme : plusieurs manieres de chiffrer presentees avec limites, aucun tarif reel avance.
- Labo envisage : curseurs fictifs par lot qui recalculent un total fictif avec hypothese visible et alerte si oubli.

Module futur C : conduite du changement.
- Perimetre : aider les benevoles fictifs a adopter le nouveau site fictif, sans promesse de resultat.
- Contenu : freins fictifs, messages simples, formation courte, relais parmi les benevoles fictifs.
- Cas : notice fictive, demo fictive, permanence fictive d aide, retours collectes puis tries.
- Sans dogme : demarche progressive avec ecoute, aucune methode presentee comme superieure.
- Labo envisage : frise fictive avant et apres avec 5 actions a ordonner puis quiz court de validation fictive.

## 18. Addendum 2026-10-23 : état publié et prochain cycle

Les sections 3 et 8 décrivent le MVP v1 et restent historiques. L’état livré est le suivant :

- Neuf modules avec fiche, démarche, laboratoire, exercice corrigé, quiz et fiche réflexe.
- Dossier projet en six étapes, sauvegarde locale, export JSON, impression et auto-évaluation.
- Section IA en cinq pages : introduction, usages, méthodes, outils et gouvernance.
- Recherche globale avec synonymes, glossaire étendu, bibliothèque de ressources, fiches outils, journal de projet, modèles imprimables, sitemap 25 URL et service worker v11.
- Exercices de transfert dans les neuf modules et pré-mortem dans le module 6.
- Build publié : `index-CSOg-N2L.js` et `index-PPGPK_P4.css`.
- CI GitHub Actions sur `main` et les pull requests : audit npm, lint, typecheck, contrôle des liens, tests et build.
- Contrôle manuel : branche, PR, CI verte, fusion. La protection de branche GitHub n’est pas disponible sur l’offre gratuite pour un dépôt privé.

Mise à jour du 24 octobre 2026 : les lots P0, P1 et P2 sont livrés, ainsi que le build 1.5.0 dans Docker au commit `008f33e2`.

- Les neuf modules ajoutent trois erreurs fréquentes, un point de décision et des ressources qualifiées.
- La page `/ressources` regroupe 18 ressources de modules et 6 ressources de parcours.
- La politique de sources est dans `docs/sources.md` et l’audit WCAG dans `docs/accessibilite/audit-2026-10-24.md`.
- Le parcours reste sans XP et sans modification du compteur `0/9`.

Le prochain cycle reste cadré dans `BACKLOG.md` :

- exercices de transfert, glossaire étendu et pré-mortem ;
- fiches outils et grille de comparaison ;
- parcours Produit et parcours Cybersécurité, autonomes, sans XP.

Les non-objectifs du projet restent : backend, comptes, cookies, analytics, certification, ressources chargées automatiquement et contenus inventés.
