// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';

export default function TransparenceIA() {
  return (
    <article className="module-page">
      <SeoHead
        title="Transparence IA"
        description={'Transparence IA de Gestion de Projet IT\u00A0: code et textes assistés, illustrations générées localement, absence d’IA au runtime et limites.'}
      />
      <header className="module-head">
        <p className="kicker">Transparence</p>
        <h1>Transparence sur l’IA</h1>
        <p>Ce site est un support pédagogique statique. Il ne déploie aucun système d’intelligence artificielle au moment de la consultation.</p>
      </header>

      <section aria-labelledby="auteur">
        <h2 id="auteur">Auteur et assistance</h2>
        <p>Le site est réalisé par <strong>Geoffroy Streit</strong>. Le code, les tests et les textes ont été produits avec l’assistance d’outils d’intelligence artificielle, puis relus, corrigés et testés.</p>
        <p>Les choix éditoriaux, les sources et la validation finale restent sous la responsabilité de l’auteur.</p>
      </section>

      <section aria-labelledby="illustrations">
        <h2 id="illustrations">Illustrations</h2>
        <p>Les pictogrammes, les panneaux du hero et les décors SVG ont été créés avec un assistant IA local, puis relus et intégrés dans le code.</p>
        <p><strong>Z-Image-Turbo</strong>, modèle local sous licence Apache 2.0, a aussi été utilisé comme outil de création graphique. Aucune image raster générée par ce modèle n’est présente dans la version 1.4.0.</p>
        <p>Aucune illustration ne représente une personne réelle. Aucun contenu ne constitue un deepfake. Aucune donnée personnelle n’a été utilisée dans les prompts.</p>
        <p>L’image de partage et les icônes PNG sont générées localement à partir des éléments vectoriels du site.</p>
      </section>

      <section aria-labelledby="runtime">
        <h2 id="runtime">Aucune IA au runtime</h2>
        <p>Le site ne fait aucun appel à une API d’IA. Il n’exécute aucun modèle dans le navigateur ou sur le serveur. Aucun profilage, aucune recommandation automatique et aucune décision automatisée ne sont produits.</p>
        <p>Les données de progression et de journal restent dans le navigateur et ne sont pas utilisées pour entraîner un modèle.</p>
      </section>

      <section aria-labelledby="ai-act">
        <h2 id="ai-act">AI Act</h2>
        <p>Le site n’est pas un système d’IA au sens de l’article 3 du règlement (UE) 2024/1689. Il n’est ni un système à haut risque, ni un modèle GPAI, et ne met en œuvre aucune pratique interdite.</p>
        <p>La présente page assure une transparence volontaire sur les contenus assistés ou générés par IA. Elle ne constitue pas une certification.</p>
      </section>

      <section aria-labelledby="limites">
        <h2 id="limites">Limites</h2>
        <p>Les contenus peuvent comporter des erreurs ou des imprécisions malgré les relectures. Les sources documentaires sont datées et les limites sont indiquées dans les ressources.</p>
        <p>Une erreur ou une question peut être signalée à <a href="mailto:geoffroy.streit@gmail.com">geoffroy.streit@gmail.com</a>.</p>
      </section>

      <p className="help">Dernière mise à jour&nbsp;: 24 octobre 2026. <Link to="/mentions-legales">Mentions légales</Link></p>
    </article>
  );
}
