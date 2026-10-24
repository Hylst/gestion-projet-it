import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import Footer from './components/Footer';
import NotFound from './routes/NotFound';
import Accueil from './routes/accueil';
import Apropos from './routes/Apropos';
import Glossaire from './routes/Glossaire';
import DossierProjet from './routes/DossierProjet';
import Ressources from './routes/Ressources';
import Outils from './routes/Outils';
import Modeles from './routes/Modeles';
import { IaHubPage } from './ia/content/Hub';
import { IaUsagesPage } from './ia/content/Usages';
import { IaMethodesPage } from './ia/content/Methodes';
import { IaOutilsPage } from './ia/content/OutilsConfiguration';
import { IaGouvernancePage } from './ia/content/Gouvernance';
import { moduleMetaByNum } from './modules/index';
import { M1Page } from './modules/m1-wbs';
import { M2Page } from './modules/m2-planif';
import { M3Page } from './modules/m3-methodes';
import { M4Page } from './modules/m4-agiles';
import { M5Page } from './modules/m5-outils';
import { M6Page } from './modules/m6-equipe';
import { M7Page } from './modules/m7-parties';
import { M8Page } from './modules/m8-budget';
import { M9Page } from './modules/m9-changement';
import './styles/reveal.css';

function ModulePlaceholder() {
  const { num } = useParams() as { num: string };
  const meta = moduleMetaByNum(Number(num));
  if (!meta) return <p>Module inconnu.</p>;
  return <h1>{meta.titre}</h1>;
}

export default function App() {
  return (
    <BrowserRouter basename="/gestion-projet-it/">
      <SiteHeader />
      <main id="contenu">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/module-1" element={<M1Page />} />
          <Route path="/module-2" element={<M2Page />} />
          <Route path="/module-3" element={<M3Page />} />
          <Route path="/module-4" element={<M4Page />} />
          <Route path="/module-5" element={<M5Page />} />
          <Route path="/module-6" element={<M6Page />} />
          <Route path="/module-7" element={<M7Page />} />
          <Route path="/module-8" element={<M8Page />} />
          <Route path="/module-9" element={<M9Page />} />
          <Route path="/dossier-projet" element={<DossierProjet />} />
          <Route path="/ia" element={<IaHubPage />} />
          <Route path="/ia/usages" element={<IaUsagesPage />} />
          <Route path="/ia/methodes" element={<IaMethodesPage />} />
          <Route path="/ia/outils-configuration" element={<IaOutilsPage />} />
          <Route path="/ia/gouvernance" element={<IaGouvernancePage />} />
          <Route path="/module-:num" element={<ModulePlaceholder />} />
          <Route path="/a-propos" element={<Apropos />} />
          <Route path="/glossaire" element={<Glossaire />} />
          <Route path="/ressources" element={<Ressources />} />
          <Route path="/outils" element={<Outils />} />
          <Route path="/modeles" element={<Modeles />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
