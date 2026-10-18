export const Fiche = () => (
  <section id="fiche" aria-labelledby="fiche-t">
    <h2 id="fiche-t">Fiche : budget et chiffrage</h2>
    <h3>Estimer par lots</h3>
    <p><strong>Decouper avant de chiffrer.</strong> Chaque lot porte ses hypotheses : temps, materiel, relecture, dependances. <strong>A quoi ca sert.</strong> Rendre le chiffrage discutable et ajustable. <strong>Avantage.</strong> Un ecart se lit par lot, pas seulement sur un total. <strong>Limite.</strong> Trop de lots rendent la lecture inutilement lourde.</p>
    <h3>Fourchette a trois points</h3>
    <p><strong>Optimiste, probable, pessimiste.</strong> Trois reperes par lot aident a voir l incertitude. <strong>Quand.</strong> Des que le perimetre ou les moyens ne sont pas stabilises. <strong>Avantage.</strong> La discussion porte sur des hypotheses, pas sur un chiffre isole. <strong>Limite.</strong> Une fourchette n a de valeur que si ses bornes sont expliquees.</p>
    <h3>Marge d alea</h3>
    <p><strong>Une provision explicite.</strong> Elle couvre les inconnues reconnues, pas les oublis. <strong>Avantage.</strong> Le niveau de prudence devient visible et arbitrable. <strong>Limite.</strong> Une marge forte ne remplace pas une hypothese claire.</p>
    <h3>Suivi des ecarts</h3>
    <p><strong>Budget, depense, ecart.</strong> Comparer a chaque jalon, chercher la cause avant de corriger. <strong>Avantage.</strong> Les decisions arrivent avant la derive. <strong>Limite.</strong> Un suivi sans action devient un tableau de plus.</p>
  </section>
);

export default Fiche;
