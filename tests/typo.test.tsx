import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { ReactElement } from 'react';
import { ProgressProvider } from '../src/lib/progress';
import Accueil from '../src/routes/accueil';
import Apropos from '../src/routes/Apropos';
import Glossaire from '../src/routes/Glossaire';
import DossierProjet from '../src/routes/DossierProjet';
import Ressources from '../src/routes/Ressources';
import Outils from '../src/routes/Outils';
import NotFound from '../src/routes/NotFound';
import SiteHeader from '../src/components/SiteHeader';
import { MODULES } from '../src/modules/index';
import { M1Page } from '../src/modules/m1-wbs';
import { M2Page } from '../src/modules/m2-planif';
import { M3Page } from '../src/modules/m3-methodes';
import { M4Page } from '../src/modules/m4-agiles';
import { M5Page } from '../src/modules/m5-outils';
import { M6Page } from '../src/modules/m6-equipe';
import { M7Page } from '../src/modules/m7-parties';
import { M8Page } from '../src/modules/m8-budget';
import { M9Page } from '../src/modules/m9-changement';
import { IaHubPage } from '../src/ia/content/Hub';
import { IaUsagesPage } from '../src/ia/content/Usages';
import { IaMethodesPage } from '../src/ia/content/Methodes';
import { IaOutilsPage } from '../src/ia/content/OutilsConfiguration';
import { IaGouvernancePage } from '../src/ia/content/Gouvernance';

afterEach(cleanup);

const normaliserEspaces = (s: string): string => s.replace(/\s+/g, ' ').trim();

const FORMES_DEFENDUES = [
  'a propos', 'a quoi', 'a faire', 'a relire', 'a l aise', 'a cote', 'cote a cote', 'au dela', 'peut etre',
  'apres', 'apparait', 'arriere', 'annee', 'annees', 'activite', 'activites', 'actualite', 'actualites',
  'ajoutee', 'ajoutees', 'benevole', 'benevoles', 'casse', 'chaine', 'chaines',
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
  'prevoir', 'prevu', 'prevue', 'prevus', 'prevues', 'priorisee', 'priorisees', 'priorite', 'priorites',
  'probabilite', 'proximite', 'qualifiee', 'qualifiees', 'qualite', 'qualites',
  'realise', 'realisee', 'realises', 'realisees', 'realisation', 'realisations', 'recu', 'recue', 'recus',
  'recues', 'reduire', 'reference', 'references', 'reflexe', 'regle', 'regles', 'regression',
  'regressions', 'resultat', 'resultats', 'regulier', 'reguliere', 'reguliers', 'regulieres', 'reinitialiser', 'repete',
  'repetee', 'repetes', 'repetees', 'reperer', 'repere', 'reperes', 'represente', 'representer',
  'representent', 'reunion', 'reunions', 'reveler', 'revele', 'revelent', 'role', 'roles', 'securite',
  'signalee', 'signalees', 'specificite', 'specificites', 'specifique', 'succes',
  'sure', 'systeme', 'tache', 'taches', 'termine', 'terminee', 'termines', 'terminees', 'tres', 'unite',
  'unites', 'validee', 'validees', 'verifie', 'verifier', 'verification', 'visibilite', 'zero',
];

const PAGES: Array<[string, ReactElement]> = [
  ['accueil', <Accueil />],
  ['a-propos', <Apropos />],
  ['glossaire', <Glossaire />],
  ['dossier-projet', <DossierProjet />],
  ['ressources', <Ressources />],
  ['outils', <Outils />],
  ['404', <NotFound />],
  ['module-1', <M1Page />],
  ['module-2', <M2Page />],
  ['module-3', <M3Page />],
  ['module-4', <M4Page />],
  ['module-5', <M5Page />],
  ['module-6', <M6Page />],
  ['module-7', <M7Page />],
  ['module-8', <M8Page />],
  ['module-9', <M9Page />],
  ['/ia', <IaHubPage />],
  ['/ia/usages', <IaUsagesPage />],
  ['/ia/methodes', <IaMethodesPage />],
  ['/ia/outils-configuration', <IaOutilsPage />],
  ['/ia/gouvernance', <IaGouvernancePage />],
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
        const exception = forme === 'casse' ? '(?! pas\\b)' : '';
        const motif = new RegExp(`(?<!\\p{L})${forme}(?!\\p{L})${exception}`, 'iu');
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

  it('les libellés clés sont accentués', () => {
    expect(MODULES.find((m) => m.num === 6)?.titre).toBe('Équipe, risques (Eisenhower) et suivi');
    expect(MODULES.find((m) => m.num === 3)?.titre).toContain('méthode');
    const { container } = rendre(<SiteHeader />);
    const texte = container.textContent ?? '';
    expect(texte).toContain('À propos');
    expect(texte).toContain('Méthodologies et Équipes');
  });
});
