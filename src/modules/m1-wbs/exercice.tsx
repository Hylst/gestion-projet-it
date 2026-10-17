import { ExerciseBlock } from '../../components/ExerciseBlock';

export const Exercices = () => (
  <div id="exercice">
    <ExerciseBlock
      id="m1-ex1"
      titre="Exercice 1 : cadrer en une page"
      enonce={(
        <div>
          <p>Sur le fil rouge fictif (refonte du site des Amis du Square), ecris le cadrage en une page : besoin, dedans et dehors, 3 lots, 2 jalons fictifs, 1 definition de fini par lot.</p>
        </div>
      )}
      corrige={(
        <div>
          <p><strong>Besoin formule en une phrase :</strong> "rendre le site de l association lisible et simple a maintenir par des benevoles fictifs."</p>
          <p><strong>Dedans :</strong> presentation, agenda, contact fictif, version mobile lisible. <strong>Dehors :</strong> paiement, application dediee, traductions.</p>
          <p><strong>3 lots :</strong> Contenu (inventaire des pages, textes relus, photos locales), Realisation (maquette, integration, mobile), Mise en ligne (notice, formation des benevoles, sauvegarde).</p>
          <p><strong>2 jalons :</strong> maquette validee par le bureau fictif ; site publie.</p>
          <p><strong>Definition de fini (exemple) :</strong> lot Contenu fini quand chaque page a un texte relu et une photo locale.</p>
        </div>
      )}
      methode={[
        'Une phrase de besoin, sans jargon.',
        'Deux listes : dedans, dehors ; aucune ambiguite.',
        'Des lots nommes par livrable, jamais par role.',
        'Deux jalons places, lisibles et valides par une personne.',
        'Une definition de fini verifiable par lot.',
      ]}
    />
    <ExerciseBlock
      id="m1-ex2"
      titre="Exercice 2 : trier une liste tangible"
      enonce={(
        <div>
          <p>La liste fictive melange 8 taches dont 2 hors perimetre et 1 oubliee (la notice des benevoles fictifs). Trie en 3 lots, isole les hors perimetre, ajoute l oubliee.</p>
          <ul>
            <li>inventaire des pages</li>
            <li>choix des photos locales</li>
            <li>reecrire les textes</li>
            <li>realiser la maquette</li>
            <li>integration des pages</li>
            <li>paiement des cotisations en ligne</li>
            <li>sauvegarde du site</li>
            <li>application mobile dediee</li>
          </ul>
        </div>
      )}
      corrige={(
        <div>
          <p><strong>Hors perimetre</strong> (isoles avec motif) : paiement des cotisations en ligne et application mobile dediee, exclus du cadrage fictif.</p>
          <p><strong>Lot Contenu :</strong> inventaire, textes, photos. <strong>Lot Realisation :</strong> maquette, integration. <strong>Lot Mise en ligne :</strong> sauvegarde, plus la <strong>notice des benevoles</strong> (l oubli a ajouter).</p>
          <p><strong>Methode :</strong> tout item sans lot revele un oubli ou un hors perimetre.</p>
        </div>
      )}
      methode={[
        'Distribuer chaque tache dans un lot.',
        'Isoler ce qui refuse de rentrer et l expliquer.',
        'Chercher une dependance oubliee et la nommer.',
      ]}
    />
  </div>
);

export default Exercices;
