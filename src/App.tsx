import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import Footer from './components/Footer';
import NotFound from './routes/NotFound';
import { moduleMetaByNum } from './modules/index';
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
          <Route path="/" element={<p>accueil (jalon 1)</p>} />
          <Route path="/module-:num" element={<ModulePlaceholder />} />
          <Route path="/a-propos" element={<p>prochainement</p>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
