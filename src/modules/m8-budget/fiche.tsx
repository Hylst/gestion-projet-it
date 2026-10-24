// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

export const Fiche = () => (
  <section id="fiche" aria-labelledby="fiche-t">
    <h2 id="fiche-t">Fiche&nbsp;: budget et chiffrage</h2>
    <h3>Estimer par lots</h3>
    <p><strong>Découper avant de chiffrer.</strong> Chaque lot porte ses hypothèses&nbsp;: temps, matériel, relecture, dépendances. <strong>À quoi ça sert.</strong> Rendre le chiffrage discutable et ajustable. <strong>Avantage.</strong> Un écart se lit par lot, pas seulement sur un total. <strong>Limite.</strong> Trop de lots rendent la lecture inutilement lourde.</p>
    <h3>Fourchette à trois points</h3>
    <p><strong>Optimiste, probable, pessimiste.</strong> Trois repères par lot aident à voir l’incertitude. <strong>Quand.</strong> Dès que le périmètre ou les moyens ne sont pas stabilisés. <strong>Avantage.</strong> La discussion porte sur des hypothèses, pas sur un chiffre isolé. <strong>Limite.</strong> Une fourchette n’a de valeur que si ses bornes sont expliquées.</p>
    <h3>Marge d’aléa</h3>
    <p><strong>Une provision explicite.</strong> Elle couvre les inconnues reconnues, pas les oublis. <strong>Avantage.</strong> Le niveau de prudence devient visible et arbitrable. <strong>Limite.</strong> Une marge forte ne remplace pas une hypothèse claire.</p>
    <h3>Suivi des écarts</h3>
    <p><strong>Budget, dépense, écart.</strong> Comparer à chaque jalon, chercher la cause avant de corriger. <strong>Avantage.</strong> Les décisions arrivent avant la dérive. <strong>Limite.</strong> Un suivi sans action devient un tableau de plus.</p>
  </section>
);

export default Fiche;
