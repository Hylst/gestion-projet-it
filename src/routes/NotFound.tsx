import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';

export default function NotFound() {
  return (
    <>
      <SeoHead title="Page introuvable" description="Cette route n’existe pas dans le cours." noindex />
      <h1>Page introuvable</h1>
      <p>Retour vers <Link to="/">l’accueil du cours</Link>.</p>
    </>
  );
}
