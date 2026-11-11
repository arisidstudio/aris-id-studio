import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Projets',  path: '/projets' },
  { label: 'Services', path: '/services' },
  { label: 'À propos', path: '/a-propos' },
  { label: 'Contact',  path: '/contact' },
];

const PANEL_ID = 'mobile-nav-panel';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const btnRef = useRef(null);
  const sentinelRef = useRef(null);

  // The 1px sentinel sits 24px from the top of the page: once it leaves the viewport, the page is scrolled.
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Fermeture au changement de route
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  // Fermeture avec Échap
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
    <div ref={sentinelRef} className="scroll-sentinel" aria-hidden="true" />
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div
        className="header-inner"
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          boxSizing: 'border-box',
          padding: '0 clamp(20px, 4.5vw, 64px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
        }}
      >
        <Link
          to="/"
          aria-label="ARIS ID Studio, accueil"
          className="tap-flex"
          style={{ display: 'flex', flexShrink: 0, textDecoration: 'none' }}
        >
          <img
            src="/images/logo-arisid.png"
            alt="ARIS ID Studio"
            width="104"
            height="34"
            className="header-logo-img"
            style={{ width: '104px', height: 'auto' }}
          />
        </Link>

        {/* Nav desktop — pilule glass, cachée sous 720 px */}
        <nav
          aria-label="Navigation principale"
          className="glass header-nav-desktop"
          style={{
            gap: '2px',
            padding: '6px',
            borderRadius: '999px',
          }}
        >
          {NAV_LINKS.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className="header-nav-link"
              aria-current={isActive(path) ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Bouton Menu mobile — caché au-dessus de 720 px */}
        <div className="header-nav-mobile">
          <button
            ref={btnRef}
            className="glass"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls={PANEL_ID}
            aria-label="Ouvrir le menu de navigation"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              height: '44px',
              padding: '0 16px',
              borderRadius: '999px',
              fontSize: '15px',
              fontWeight: 500,
              fontFamily: "'Excon', sans-serif",
              color: 'var(--text)',
              cursor: 'pointer',
              userSelect: 'none',
              border: 'none',
              background: 'none',
            }}
          >
            Menu
            <svg
              width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="1.6"
              aria-hidden="true"
            >
              <path d="M4 8h16M4 16h16" />
            </svg>
          </button>

          {/* Panneau mobile */}
          {menuOpen && (
            <div
              id={PANEL_ID}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation mobile"
              className="glass"
              style={{
                position: 'absolute',
                right: 0,
                top: 'calc(100% + 8px)',
                zIndex: 20,
                minWidth: '220px',
                display: 'flex',
                flexDirection: 'column',
                padding: '8px',
                borderRadius: '14px',
              }}
            >
              {NAV_LINKS.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  className="mobile-nav-link"
                  aria-current={isActive(path) ? 'page' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
    </>
  );
}
