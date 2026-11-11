import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';

const GUTTER = 'clamp(20px, 4.5vw, 64px)';

export default function NotFound() {
  return (
    <div style={{ color: 'var(--text)' }}>
      <Seo title="Page introuvable · ARIS ID Studio" path={null} noindex />
      <section
        className="pad-top-page"
        style={{ maxWidth: '1440px', margin: '0 auto', paddingLeft: GUTTER, paddingRight: GUTTER, paddingBottom: '160px', minHeight: '60vh' }}
      >
        <h1
          className="display h-in"
          style={{ '--d': '0ms', '--y': '24px', margin: 0, maxWidth: '1000px', fontSize: 'clamp(52px, 9vw, 144px)', lineHeight: 0.92, letterSpacing: '-0.03em' }}
        >
          Cette page n'existe pas.
        </h1>
        <p style={{ margin: '32px 0 0', maxWidth: '460px', fontSize: '17px', lineHeight: 1.55, color: 'var(--text-2)' }}>
          Le lien est peut-être ancien, ou la page a changé d'adresse.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px 32px', flexWrap: 'wrap', marginTop: '40px' }}>
          <Link to="/" className="btn">
            Retour à l'accueil
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
          <Link to="/projets" className="text-link">Voir les projets</Link>
        </div>
      </section>
    </div>
  );
}
