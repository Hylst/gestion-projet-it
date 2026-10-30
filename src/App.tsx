// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import Footer from './components/Footer';
import Accueil from './routes/accueil';
import { moduleMetaByNum } from './modules/index';
import './styles/reveal.css';

const NotFound = lazy(() => import('./routes/NotFound'));
const Apropos = lazy(() => import('./routes/Apropos'));
const Glossaire = lazy(() => import('./routes/Glossaire'));
const DossierProjet = lazy(() => import('./routes/DossierProjet'));
const Ressources = lazy(() => import('./routes/Ressources'));
const Outils = lazy(() => import('./routes/Outils'));
const Modeles = lazy(() => import('./routes/Modeles'));
const MentionsLegales = lazy(() => import('./routes/MentionsLegales'));
const Confidentialite = lazy(() => import('./routes/Confidentialite'));
const TransparenceIA = lazy(() => import('./routes/TransparenceIA'));
const Accessibilite = lazy(() => import('./routes/Accessibilite'));
const IaHubPage = lazy(() => import('./ia/content/Hub').then((m) => ({ default: m.IaHubPage })));
const IaUsagesPage = lazy(() => import('./ia/content/Usages').then((m) => ({ default: m.IaUsagesPage })));
const IaMethodesPage = lazy(() => import('./ia/content/Methodes').then((m) => ({ default: m.IaMethodesPage })));
const IaOutilsPage = lazy(() => import('./ia/content/OutilsConfiguration').then((m) => ({ default: m.IaOutilsPage })));
const IaGouvernancePage = lazy(() => import('./ia/content/Gouvernance').then((m) => ({ default: m.IaGouvernancePage })));
const CyberHubPage = lazy(() => import('./cyber/content/Hub').then((m) => ({ default: m.CyberHubPage })));
const CyberMenacesPage = lazy(() => import('./cyber/content/Menaces').then((m) => ({ default: m.CyberMenacesPage })));
const CyberAccesPage = lazy(() => import('./cyber/content/Acces').then((m) => ({ default: m.CyberAccesPage })));
const CyberDependancesPage = lazy(() => import('./cyber/content/Dependances').then((m) => ({ default: m.CyberDependancesPage })));
const CyberDonneesPage = lazy(() => import('./cyber/content/Donnees').then((m) => ({ default: m.CyberDonneesPage })));
const CyberIncidentPage = lazy(() => import('./cyber/content/Incident').then((m) => ({ default: m.CyberIncidentPage })));
const M1Page = lazy(() => import('./modules/m1-wbs').then((m) => ({ default: m.M1Page })));
const M2Page = lazy(() => import('./modules/m2-planif').then((m) => ({ default: m.M2Page })));
const M3Page = lazy(() => import('./modules/m3-methodes').then((m) => ({ default: m.M3Page })));
const M4Page = lazy(() => import('./modules/m4-agiles').then((m) => ({ default: m.M4Page })));
const M5Page = lazy(() => import('./modules/m5-outils').then((m) => ({ default: m.M5Page })));
const M6Page = lazy(() => import('./modules/m6-equipe').then((m) => ({ default: m.M6Page })));
const M7Page = lazy(() => import('./modules/m7-parties').then((m) => ({ default: m.M7Page })));
const M8Page = lazy(() => import('./modules/m8-budget').then((m) => ({ default: m.M8Page })));
const M9Page = lazy(() => import('./modules/m9-changement').then((m) => ({ default: m.M9Page })));

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
        <Suspense fallback={<div className="route-loading" role="status" aria-live="polite">Chargement de la page…</div>}>
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
            <Route path="/cybersecurite" element={<CyberHubPage />} />
            <Route path="/cybersecurite/menaces" element={<CyberMenacesPage />} />
            <Route path="/cybersecurite/acces" element={<CyberAccesPage />} />
            <Route path="/cybersecurite/dependances" element={<CyberDependancesPage />} />
            <Route path="/cybersecurite/donnees" element={<CyberDonneesPage />} />
            <Route path="/cybersecurite/incident" element={<CyberIncidentPage />} />
            <Route path="/module-:num" element={<ModulePlaceholder />} />
            <Route path="/a-propos" element={<Apropos />} />
            <Route path="/glossaire" element={<Glossaire />} />
            <Route path="/ressources" element={<Ressources />} />
            <Route path="/outils" element={<Outils />} />
            <Route path="/modeles" element={<Modeles />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/confidentialite" element={<Confidentialite />} />
            <Route path="/transparence-ia" element={<TransparenceIA />} />
            <Route path="/accessibilite" element={<Accessibilite />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
