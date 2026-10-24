// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { ENTREES_JOURNAL, JOURNAL_STORAGE_KEY, type JournalEtat, type JournalValeur } from '../lib/journal';

function lireJournal(): JournalEtat {
  try {
    const brut = localStorage.getItem(JOURNAL_STORAGE_KEY);
    if (!brut) return {};
    const valeur = JSON.parse(brut) as JournalEtat;
    return typeof valeur === 'object' && valeur !== null ? valeur : {};
  } catch {
    return {};
  }
}

type StatutSauvegarde = 'idle' | 'ok' | 'error';

export default function Modeles() {
  const [journal, setJournal] = useState<JournalEtat>(lireJournal);
  const [sauvegarde, setSauvegarde] = useState<StatutSauvegarde>('idle');
  const journalRef = useRef(journal);

  const changer = (id: string, champ: keyof JournalValeur, valeur: string) => {
    const suivant: JournalEtat = {
      ...journalRef.current,
      [id]: {
        decision: journalRef.current[id]?.decision ?? '',
        suite: journalRef.current[id]?.suite ?? '',
        [champ]: valeur,
      },
    };
    journalRef.current = suivant;
    setJournal(suivant);
    try {
      localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(suivant));
      setSauvegarde('ok');
    } catch {
      setSauvegarde('error');
    }
  };

  const messageSauvegarde = sauvegarde === 'error'
    ? 'Sauvegarde impossible : vérifiez l’espace disponible.'
    : sauvegarde === 'ok'
      ? 'Enregistré localement'
      : 'Sauvegarde locale à la saisie';

  return (
    <article className="module-page">
      <SeoHead
        title="Journal et modèles"
        description="Journal de projet guidé, grille de revue par les pairs et modèles imprimables pour les neuf modules et le dossier projet."
      />
      <header className="module-head">
        <p className="kicker">Ateliers</p>
        <h1>Journal et modèles</h1>
        <p className="accroche">Un journal guidé pour tracer les décisions, une revue courte pour un livrable et six modèles imprimables. La progression reste dans le navigateur.</p>
        <p><Link to="/dossier-projet">Dossier projet</Link> · <Link to="/outils">Fiches outils</Link></p>
      </header>
      <nav className="sommaire" aria-label="Sommaire du journal et des modèles">
        <a href="#journal">Journal de projet</a>
        <a href="#revue">Revue par les pairs</a>
        <a href="#modeles">Modèles imprimables</a>
      </nav>

      <section id="journal" aria-labelledby="journal-t">
        <h2 id="journal-t">Journal de projet</h2>
        <p>Une décision et une suite par étape. Le journal reste local et ne compte aucun XP.</p>
        <div className="journal-liste">
          {ENTREES_JOURNAL.map((entree) => (
            <fieldset key={entree.id} className="journal-entree card">
              <legend>{entree.titre}</legend>
              <p>{entree.question}</p>
              <label htmlFor={`journal-${entree.id}-decision`}>Décision</label>
              <textarea
                id={`journal-${entree.id}-decision`}
                rows={2}
                value={journal[entree.id]?.decision ?? ''}
                onChange={(event) => changer(entree.id, 'decision', event.target.value)}
              />
              <label htmlFor={`journal-${entree.id}-suite`}>Suite et échéance</label>
              <textarea
                id={`journal-${entree.id}-suite`}
                rows={2}
                value={journal[entree.id]?.suite ?? ''}
                onChange={(event) => changer(entree.id, 'suite', event.target.value)}
              />
            </fieldset>
          ))}
        </div>
        <p className={`help no-print journal-statut ${sauvegarde}`} role={sauvegarde === 'error' ? 'alert' : 'status'}>{messageSauvegarde}</p>
        <button type="button" className="btn secondary no-print" onClick={() => window.print()}>Imprimer le journal</button>
      </section>

      <section id="revue" aria-labelledby="revue-t">
        <h2 id="revue-t">Revue par les pairs</h2>
        <p>Une relecture courte, sur des critères observables. Elle porte sur le livrable, pas sur la personne.</p>
        <div className="modele-wrap">
          <table className="modele-table">
            <caption>Grille de revue d’un livrable de projet.</caption>
            <thead>
              <tr><th scope="col">Critère</th><th scope="col">Observable</th><th scope="col">Verdict</th></tr>
            </thead>
            <tbody>
              <tr><td>Périmètre</td><td>Le livrable dit ce qui est dedans et dehors.</td><td>À compléter</td></tr>
              <tr><td>Preuves</td><td>Chaque critère d’acceptation a un test ou une preuve.</td><td>À compléter</td></tr>
              <tr><td>Risques</td><td>Les risques majeurs ont un propriétaire et un déclencheur.</td><td>À compléter</td></tr>
              <tr><td>Décisions</td><td>Les décisions ont un motif et une suite.</td><td>À compléter</td></tr>
              <tr><td>Lisibilité</td><td>Une personne extérieure retrouve le besoin et la prochaine étape.</td><td>À compléter</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="modeles" aria-labelledby="modeles-t">
        <h2 id="modeles-t">Modèles imprimables</h2>
        <p>Des grilles courtes à remplir à la main ou à recopier dans l’outil de l’équipe. Aucune donnée n’est envoyée.</p>

        <h3>WBS</h3>
        <div className="modele-wrap">
          <table className="modele-table">
            <caption>Découpage par livrables.</caption>
            <thead><tr><th scope="col">Livrable</th><th scope="col">Lot</th><th scope="col">Définition de fini</th></tr></thead>
            <tbody><tr><td>Site fictif</td><td>Contenu</td><td>Textes relus, photos locales</td></tr><tr><td>Site fictif</td><td>Réalisation</td><td>Pages intégrées et testées</td></tr><tr><td>Site fictif</td><td>Mise en ligne</td><td>Notice et sauvegarde vérifiées</td></tr></tbody>
          </table>
        </div>

        <h3>RACI</h3>
        <div className="modele-wrap">
          <table className="modele-table">
            <caption>Un seul A par activité.</caption>
            <thead><tr><th scope="col">Activité</th><th scope="col">R</th><th scope="col">A</th><th scope="col">C</th><th scope="col">I</th></tr></thead>
            <tbody><tr><td>Valider la page agenda</td><td>Chef de projet</td><td>Bureau</td><td>Bénévoles</td><td>Usagers</td></tr><tr><td>Publier la page</td><td>Bénévole formé</td><td>Chef de projet</td><td>Bureau</td><td>Financeur</td></tr><tr><td>Annoncer la mise en ligne</td><td>Communication</td><td>Bureau</td><td>Bénévoles</td><td>Mairie</td></tr></tbody>
          </table>
        </div>

        <h3>Registre des risques</h3>
        <div className="modele-wrap">
          <table className="modele-table">
            <caption>Probabilité et impact sur une échelle courte.</caption>
            <thead><tr><th scope="col">Risque</th><th scope="col">P</th><th scope="col">I</th><th scope="col">Parade</th><th scope="col">Propriétaire</th></tr></thead>
            <tbody><tr><td>Photos non reçues</td><td>2</td><td>3</td><td>Jeu local de rechange</td><td>Contenu</td></tr><tr><td>Notice absente</td><td>2</td><td>3</td><td>Atelier court</td><td>Mise en ligne</td></tr><tr><td>Hébergeur indisponible</td><td>1</td><td>3</td><td>Sauvegarde et plan de reprise</td><td>Technique</td></tr></tbody>
          </table>
        </div>

        <h3>Plan de recette</h3>
        <div className="modele-wrap">
          <table className="modele-table">
            <caption>Critère, test et preuve.</caption>
            <thead><tr><th scope="col">Critère</th><th scope="col">Test</th><th scope="col">Preuve</th><th scope="col">Décision</th></tr></thead>
            <tbody><tr><td>Page agenda lisible</td><td>Parcours mobile</td><td>Capture datée</td><td>Accepté</td></tr><tr><td>Formulaire accessible</td><td>Clavier et labels</td><td>Rapport de test</td><td>À revoir</td></tr><tr><td>Contact fonctionnel</td><td>Envoi fictif</td><td>Trace de recette</td><td>Accepté</td></tr></tbody>
          </table>
        </div>

        <h3>Journal de décisions</h3>
        <div className="modele-wrap">
          <table className="modele-table">
            <caption>Date, décision, motif, responsable et suite.</caption>
            <thead><tr><th scope="col">Date</th><th scope="col">Décision</th><th scope="col">Motif</th><th scope="col">Responsable</th><th scope="col">Suite</th></tr></thead>
            <tbody><tr><td>J-10</td><td>Reporter la page agenda</td><td>Photos non reçues</td><td>Bureau</td><td>Relancer à J-5</td></tr><tr><td>J-5</td><td>Garder le formulaire</td><td>Critères vérifiés</td><td>Chef de projet</td><td>Tester au jalon</td></tr><tr><td>J-2</td><td>Former deux relais</td><td>Adoption fragile</td><td>Bureau</td><td>Observer les usages</td></tr></tbody>
          </table>
        </div>

        <h3>Guide d’entretien</h3>
        <ol>
          <li>Quel problème cherchez-vous à résoudre, avec vos mots&nbsp;?</li>
          <li>Comment faites-vous aujourd’hui, et qu’est-ce qui vous ralentit&nbsp;?</li>
          <li>Qu’est-ce qui vous ferait abandonner la nouvelle solution&nbsp;?</li>
          <li>Qui décide, qui utilise et qui peut bloquer&nbsp;?</li>
          <li>Quelle preuve vous ferait dire que le changement a réussi&nbsp;?</li>
          <li>Quelle question aurions-nous dû poser et que nous avons oubliée&nbsp;?</li>
        </ol>
      </section>
    </article>
  );
}
