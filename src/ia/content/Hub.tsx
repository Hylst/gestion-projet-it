// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Link } from 'react-router-dom';
import { IaCallout } from '../IaCallout';
import { IaLayout } from '../IaLayout';
import { IA_PAGES } from '../pages';
import { SOURCES } from '../sources';

export function IaHubPage() {
  const meta = IA_PAGES[0];
  if (!meta) throw new Error('Page hub IA absente.');
  return (
    <IaLayout
      meta={meta}
      intro="L’IA ne remplace pas la méthode de projet. Elle change la vitesse à laquelle certaines tâches se font, et donc la manière de les encadrer. Cette section propose des repères pour l’utiliser comme un outil, avec discernement."
      retenir={[
        'L’IA produit une proposition, pas une décision.',
        'Le contexte et la vérification comptent plus que la formulation du prompt.',
        'Les données personnelles, secrètes ou clientes ne se donnent pas sans cadre.',
        'Un usage utile a un critère de réussite observable.',
      ]}
      checklist={[
        'J’ai écrit le problème et le livrable attendu.',
        'J’ai vérifié les données que je peux utiliser.',
        'J’ai prévu une relecture humaine et une source de vérité.',
        'J’ai testé la réponse sur au moins deux cas.',
        'J’ai noté ce qui a été gagné et ce qui a coûté.',
        'J’ai supprimé les données sensibles de l’historique.',
      ]}
      sources={[SOURCES.aiAct, SOURCES.cnil, SOURCES.nist, SOURCES.oecd, SOURCES.iso42001]}
    >
      <section id="pourquoi">
        <h2>Pourquoi l’IA entre dans le projet</h2>
        <p>Les assistants génératifs produisent un texte, un tableau ou du code à partir d’une consigne. Les copilotes s’insèrent dans un outil existant et proposent des compléments au fil de la frappe. Les agents enchaînent plusieurs actions, parfois avec des accès à des fichiers ou à des services.</p>
        <p>Le glissement est net&nbsp;: «&nbsp;de l’intention à la première matière&nbsp;». Là où il fallait une page blanche et un temps de rédaction, il faut désormais une consigne, un contexte et une relecture.</p>
        <p>Cette vitesse ne dispense pas de méthode. Elle rend même la méthode plus visible&nbsp;: sans besoin clair, sans critère de vérification et sans responsable, la production générée reste une matière à trier. <strong>Un outil, pas une méthode.</strong></p>
      </section>

      <IaCallout titre="Fil rouge" variante="fil">
        <p>Sur Les Amis du Square, l’IA peut préparer un brouillon de note de cadrage. Le bureau de l’association valide le besoin, le périmètre et les critères de réussite.</p>
      </IaCallout>

      <section id="fait-bien">
        <h2>Ce que l’IA fait bien</h2>
        <ul>
          <li>
            <strong>Passer d’une intention à une première matière.</strong> Utile pour dégrossir, à condition de ne pas prendre le brouillon pour une décision.
          </li>
          <li>
            <strong>Reformuler, résumer, expliquer à plusieurs niveaux.</strong> Le résumé reste à vérifier sur le texte source, surtout quand des chiffres ou des nuances comptent.
          </li>
          <li>
            <strong>Explorer des options et repérer des angles morts.</strong> Les options proposées ne valent que si elles sont confrontées au terrain, aux contraintes et aux personnes concernées.
          </li>
          <li>
            <strong>Accélérer les tâches répétitives et la mise en forme.</strong> Le gain de temps se mesure&nbsp;; il ne justifie pas de supprimer les contrôles.
          </li>
          <li>
            <strong>Interroger un texte, un cahier des charges ou un jeu de données.</strong> La réponse ne prouve pas le contenu&nbsp;: il faut revenir au document et à la source.
          </li>
        </ul>
      </section>

      <section id="ne-fait-pas">
        <h2>Ce qu’elle ne fait pas</h2>
        <ul>
          <li>
            <strong>Décider à la place du chef de projet.</strong> L’arbitrage reste humain&nbsp;: l’outil propose, le responsable tranche.
          </li>
          <li>
            <strong>Garantir un fait, un chiffre ou une source.</strong> Une affirmation convaincante peut être fausse&nbsp;; la vérification se fait à la source.
          </li>
          <li>
            <strong>Connaître le contexte politique, historique et relationnel.</strong> Ce qui se joue entre les personnes ne figure pas dans le prompt.
          </li>
          <li>
            <strong>Porter la responsabilité.</strong> La responsabilité reste celle de l’équipe et de l’organisation qui utilisent l’outil.
          </li>
          <li>
            <strong>Remplacer l’essai réel, les tests et l’observation.</strong> Seul le terrain dit si la solution tient dans l’usage.
          </li>
        </ul>
      </section>

      <section id="cinq-questions">
        <h2>Cinq questions avant de l’utiliser</h2>
        <ol>
          <li>
            <strong>Quel problème je cherche à résoudre&nbsp;?</strong> Sans problème formulé, l’outil produit une réponse à une question qui n’a pas été posée.
          </li>
          <li>
            <strong>Quelles données puis-je donner&nbsp;?</strong> La question porte sur la nature des données, leur origine et le cadre qui autorise leur usage.
          </li>
          <li>
            <strong>Quel niveau de vérification est nécessaire&nbsp;?</strong> Un brouillon interne et une décision client n’exigent pas le même contrôle.
          </li>
          <li>
            <strong>Qui valide et qui assume&nbsp;?</strong> Un nom, un rôle et un moment de validation évitent la responsabilité diffuse.
          </li>
          <li>
            <strong>Comment je saurai que c’est utile&nbsp;?</strong> Le critère de réussite se fixe avant l’usage, pas après la réponse.
          </li>
        </ol>
      </section>

      <section id="carte-usages">
        <h2>Carte des usages</h2>
        <ul className="ia-carte">
          {IA_PAGES.slice(1).map((page) => (
            <li className="module-card" key={page.slug}>
              <span className="module-kicker">Section IA</span>
              <Link className="titre" to={page.path}>{page.titre}</Link>
              <p className="resume">{page.resume}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="suite">
        <h2>La suite de la section</h2>
        <p>Quatre pages prolongent ce panorama&nbsp;: les usages par phase de projet, les méthodes et l’évaluation, les outils et leur configuration, puis la gouvernance, les risques et la qualité.</p>
        <p>La section ne délivre ni certification ni XP. Elle propose des repères pour travailler, à compléter par la pratique et par les sources citées.</p>
      </section>
    </IaLayout>
  );
}
