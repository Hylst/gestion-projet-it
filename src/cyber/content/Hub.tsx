// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Link } from 'react-router-dom';
import { CyberCallout } from '../CyberCallout';
import { CyberLayout } from '../CyberLayout';
import { CYBER_PAGES } from '../pages';
import { CYBER_SOURCES } from '../sources';

export function CyberHubPage() {
  const meta = CYBER_PAGES[0];
  if (!meta) throw new Error('Page hub cyber absente.');
  return (
    <CyberLayout
      meta={meta}
      intro="La cybersécurité n’est pas un projet à part. C’est une qualité du projet, au même titre que le délai, le budget ou l’accessibilité. Ce parcours propose des repères pour identifier les actifs, réduire les chemins d’attaque et réagir sans improviser."
      retenir={[
        'La sécurité est une qualité du projet, pas un produit à installer.',
        'Un risque se décrit par un actif, une menace, un impact et une parade.',
        'Une parade proportionnée vaut mieux qu’une promesse de sécurité totale.',
        'Ce qui n’est pas vérifié ni tracé ne peut pas être défendu.',
      ]}
      checklist={[
        'J’ai nommé ce que je protège.',
        'J’ai identifié les menaces plausibles et leurs chemins.',
        'J’ai relié chaque risque à une parade et à un responsable.',
        'J’ai vérifié les accès et les sauvegardes avant la mise en ligne.',
        'J’ai prévu une réaction et un contact en cas d’incident.',
        'J’ai noté la date et la prochaine revue.',
      ]}
      sources={[CYBER_SOURCES.anssi, CYBER_SOURCES.cnil, CYBER_SOURCES.owasp, CYBER_SOURCES.nist]}
    >
      <section id="pourquoi">
        <h2>Pourquoi la sécurité entre dans le projet</h2>
        <p>Un projet informatique manipule des données, des comptes, un service et une réputation. Ces éléments ont une valeur pour l’organisation, pour les personnes concernées et parfois pour un attaquant. La sécurité consiste à les protéger de façon proportionnée, pas à empiler des outils.</p>
        <p>Les incidents ne viennent pas seulement d’une attaque sophistiquée. Un compte partagé, une dépendance non mise à jour, un fichier exposé ou un courriel trompeur suffisent à créer un dommage. La plupart des incidents commencent par un geste ordinaire ou par un angle mort du projet.</p>
        <p>La sécurité se traite donc comme les autres qualités du projet&nbsp;: elle a des critères, des responsables, un budget et des moments de vérification. Elle ne s’ajoute pas à la fin, quand tout est déjà en ligne.</p>
      </section>

      <section id="pas-un-produit">
        <h2>Ce que la sécurité n’est pas</h2>
        <ul>
          <li><strong>Un produit qu’on installe.</strong> Un outil ne remplace ni les règles ni les vérifications.</li>
          <li><strong>Un audit ponctuel.</strong> Une photo à un instant donné ne dit pas ce qui change ensuite.</li>
          <li><strong>Un sujet seulement technique.</strong> Les accès, les contrats et les usages comptent autant que le code.</li>
          <li><strong>Une garantie.</strong> Aucun dispositif ne promet l’absence d’incident.</li>
          <li><strong>Une punition.</strong> Une erreur signalée tôt vaut mieux qu’un incident tu.</li>
        </ul>
      </section>

      <section id="cinq-questions">
        <h2>Cinq questions avant de traiter un risque</h2>
        <ol>
          <li><strong>Que protège-t-on&nbsp;?</strong> Données, comptes, service, réputation ou personnes&nbsp;: le risque se rattache à un actif identifié.</li>
          <li><strong>Contre qui&nbsp;?</strong> Un attaquant opportuniste, un ancien prestataire, un fournisseur compromis ou une erreur interne ne demandent pas les mêmes parades.</li>
          <li><strong>Quel serait l’impact&nbsp;?</strong> Une gêne passagère, une perte de données ou une atteinte aux personnes n’ont pas le même poids.</li>
          <li><strong>Quelle parade est proportionnée&nbsp;?</strong> Le coût de la mesure se compare à l’impact et à la vraisemblance du scénario.</li>
          <li><strong>Qui décide et qui vérifie&nbsp;?</strong> Un nom, un rôle et un moment de contrôle évitent la responsabilité diffuse.</li>
        </ol>
      </section>

      <CyberCallout titre="Fil rouge" variante="fil">
        <p>Sur Les Amis du Square, le site stocke des contacts d’adhérents. Le projet identifie les données, les comptes et les sauvegardes avant l’ouverture.</p>
      </CyberCallout>

      <section id="carte">
        <h2>Carte du parcours</h2>
        <ul className="cyber-carte">
          {CYBER_PAGES.slice(1).map((page) => (
            <li className="module-card" key={page.slug}>
              <span className="module-kicker">Parcours Cybersécurité</span>
              <Link className="titre" to={page.path}>{page.titre}</Link>
              <p className="resume">{page.resume}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="humain">
        <h2>Ce qui reste humain</h2>
        <ul>
          <li><strong>Décider.</strong> Le chef de projet arbitre entre le risque accepté et la parade engagée, avec le commanditaire.</li>
          <li><strong>Vérifier.</strong> Une sauvegarde, un droit ou une alerte se testent. La confiance ne suffit pas.</li>
          <li><strong>Communiquer.</strong> Une information claire vaut mieux qu’un silence, surtout quand un incident touche des personnes.</li>
          <li><strong>Apprendre.</strong> Un incident ou un exercice produit des décisions, pas seulement un rapport.</li>
        </ul>
      </section>

      <section id="suite">
        <h2>La suite du parcours</h2>
        <p>Cinq pages prolongent ce panorama&nbsp;: les menaces et le modèle de menace, les accès et les secrets, les dépendances et les fournisseurs, les données et le cadre juridique, puis l’incident, la sauvegarde et la reprise.</p>
        <p>Le parcours ne délivre ni certification ni XP. Il propose des repères défensifs, à compléter par la pratique, les sources citées et l’avis d’un professionnel quand le risque le justifie.</p>
      </section>
    </CyberLayout>
  );
}
