import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import Footer from './components/Footer';
import './styles/reveal.css';

export default function App() {
  return (
    <BrowserRouter basename="/gestion-projet-it/">
      <SiteHeader />
      <main id="contenu">
        <Routes>
          <Route path="/" element={<p>accueil (jalon 1)</p>} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
