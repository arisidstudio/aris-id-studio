import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Head } from 'vite-react-ssg';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CreativeBackground } from './components/CreativeBackground';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const isRedesigned = !['/parcours', '/mentions-legales', '/offres'].includes(pathname);
  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans" style={{ position: 'relative', ...(isRedesigned && { background: 'var(--bg)' }) }}>
      <Head>
        <title>ARIS ID Studio — Direction Artistique &amp; Brand Design</title>
      </Head>
      <a href="#contenu" className="skip-link">Aller au contenu</a>
      {!isRedesigned && <CreativeBackground />}
      <Header />
      <ScrollToTop />
      <main id="contenu" tabIndex={-1} className={pathname === '/' ? undefined : 'main-offset'}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
