import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Projets',  path: '/projets' },
  { label: 'Services', path: '/services' },
  { label: 'À propos', path: '/a-propos' },
  { label: 'Contact',  path: '/contact' },
];

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/arisid_studio?igsh=ZTN6Mmllc3VkYXNq&utm_source=qr',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/lut%C3%A9cia-rustico-011064213/',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1AoGoDNwTp/?mibextid=wwXIfr',
  },
];

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)', position: 'relative', zIndex: 1 }}>
      {/* Ligne 1 : logo · nav · réseaux */}
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          boxSizing: 'border-box',
          padding: '48px clamp(20px, 4.5vw, 64px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '40px',
          flexWrap: 'wrap',
        }}
      >
        <Link to="/" aria-label="ARIS ID Studio, accueil" className="tap-flex" style={{ display: 'flex', flexShrink: 0 }}>
          <img
            src="/images/logo-arisid.png"
            alt="ARIS ID Studio"
            width="96"
            height="31"
            loading="lazy"
            decoding="async"
            style={{ width: '96px', height: 'auto' }}
          />
        </Link>

        <nav
          aria-label="Pied de page"
          style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}
        >
          {NAV_LINKS.map(({ label, path }) => (
            <Link key={path} to={path} className="footer-link">
              {label}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {SOCIAL_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Ligne 2 : copyright · mentions légales */}
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          boxSizing: 'border-box',
          padding: '0 clamp(20px, 4.5vw, 64px) 40px',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '16px',
          flexWrap: 'wrap',
          fontSize: '13px',
          color: 'var(--text-3)',
        }}
      >
        <span>© 2026 ARIS ID Studio</span>
        <Link
          to="/mentions-legales"
          className="footer-legal"
        >
          Mentions légales &amp; CGV
        </Link>
      </div>
    </footer>
  );
}
