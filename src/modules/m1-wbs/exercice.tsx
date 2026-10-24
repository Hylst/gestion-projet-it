import { ExerciseBlock } from '../../components/ExerciseBlock';

export const Exercices = () => (
  <div id="exercice">
    <ExerciseBlock
      id="m1-ex1"
      titre={'Exercice 1\u00A0: cadrer en une page'}
      enonce={(
        <div>
          <p>Sur le fil rouge fictif (refonte du site des Amis du Square), écris le cadrage en une page&nbsp;: besoin, dedans et dehors, 3 lots, 2 jalons fictifs, 1 définition de fini par lot.</p>
        </div>
      )}
      corrige={(
        <div>
          <p><strong>Besoin formulé en une phrase&nbsp;:</strong> «&nbsp;rendre le site de l’association lisible et simple à maintenir par des bénévoles fictifs.&nbsp;»</p>
          <p><strong>Dedans&nbsp;:</strong> présentation, agenda, contact fictif, version mobile lisible. <strong>Dehors&nbsp;:</strong> paiement, application dédiée, traductions.</p>
          <p><strong>3 lots&nbsp;:</strong> Contenu (inventaire des pages, textes relus, photos locales), Réalisation (maquette, intégration, mobile), Mise en ligne (notice, formation des bénévoles, sauvegarde).</p>
          <p><strong>2 jalons&nbsp;:</strong> maquette validée par le bureau fictif&nbsp;; site publié.</p>
          <p><strong>Définition de fini (exemple)&nbsp;:</strong> lot Contenu fini quand chaque page a un texte relu et une photo locale.</p>
        </div>
      )}
      methode={[
        'Une phrase de besoin, sans jargon.',
        'Deux listes\u00A0: dedans, dehors\u00A0; aucune ambiguïté.',
        'Des lots nommés par livrable, jamais par rôle.',
        'Deux jalons placés, lisibles et validés par une personne.',
        'Une définition de fini vérifiable par lot.',
      ]}
    />
    <ExerciseBlock
      id="m1-ex2"
      titre={'Exercice 2\u00A0: trier une liste tangible'}
      enonce={(
        <div>
          <p>La liste fictive mélange 8 tâches dont 2 hors périmètre et 1 oubliée (la notice des bénévoles fictifs). Trie en 3 lots, isole les hors périmètre, puis complète avec l’oubliée.</p>
          <ul>
            <li>inventaire des pages</li>
            <li>choix des photos locales</li>
            <li>réécrire les textes</li>
            <li>réaliser la maquette</li>
            <li>intégration des pages</li>
            <li>paiement des cotisations en ligne</li>
            <li>sauvegarde du site</li>
            <li>application mobile dédiée</li>
          </ul>
        </div>
      )}
      corrige={(
        <div>
          <p><strong>Hors périmètre</strong> (isolés avec motif)&nbsp;: paiement des cotisations en ligne et application mobile dédiée, exclus du cadrage fictif.</p>
          <p><strong>Lot Contenu&nbsp;:</strong> inventaire, textes, photos. <strong>Lot Réalisation&nbsp;:</strong> maquette, intégration. <strong>Lot Mise en ligne&nbsp;:</strong> sauvegarde, plus la <strong>notice des bénévoles</strong> (l’oubli à ajouter).</p>
          <p><strong>Méthode&nbsp;:</strong> tout item sans lot révèle un oubli ou un hors périmètre.</p>
        </div>
      )}
      methode={[
        'Distribuer chaque tâche dans un lot.',
        'Isoler ce qui refuse de rentrer et l’expliquer.',
        'Chercher une dépendance oubliée et la nommer.',
      ]}
    />
    <ExerciseBlock
      id="m1-transfert"
      titre={'Exercice de transfert\u00A0: arbitrer un ajout de périmètre'}
      enonce={(
        <div>
          <p>Le bureau fictif demande le paiement en ligne à mi-parcours. Écris la décision, l’impact sur les trois lots et la définition de fini à modifier.</p>
        </div>
      )}
      corrige={(
        <div>
          <p><strong>Décision&nbsp;:</strong> refuser pour cette version, ou ouvrir un lot Paiement avec budget, date et responsable.</p>
          <p><strong>Impact&nbsp;:</strong> Contenu et Réalisation restent inchangés&nbsp;; le nouveau lot ajoute une dépendance prestataire et une recette de paiement.</p>
          <p><strong>Fin de lot&nbsp;:</strong> paiement testé, remboursement documenté, support formé.</p>
        </div>
      )}
      methode={[
        'Nommer la décision et son motif.',
        'Séparer ajout de périmètre et marge d’aléa.',
        'Mettre à jour la définition de fini.',
      ]}
    />
  </div>
);

export default Exercices;
