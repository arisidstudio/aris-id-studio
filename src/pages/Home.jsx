import { Link } from 'react-router-dom';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectForm } from '../components/ProjectForm';
import { Seo, SITE_URL } from '../components/Seo';

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'ARIS ID Studio',
  founder: { '@type': 'Person', name: 'Lutécia Rustico' },
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/og/default.jpg`,
  email: 'helloarisidstudio@gmail.com',
  telephone: '+33614132971',
  address: { '@type': 'PostalAddress', addressLocality: 'Nice', addressCountry: 'FR' },
  sameAs: [
    'https://www.instagram.com/arisid_studio',
    'https://www.linkedin.com/in/lut%C3%A9cia-rustico-011064213/',
    'https://www.facebook.com/share/1AoGoDNwTp/',
  ],
};

const GUTTER = 'clamp(20px, 4.5vw, 64px)';
const LINE = '1px solid var(--line)';

const container = { maxWidth: '1440px', margin: '0 auto', paddingLeft: GUTTER, paddingRight: GUTTER };
const h2Style = { margin: 0, fontSize: 'clamp(36px, 4.4vw, 64px)', lineHeight: 1, letterSpacing: '-0.02em' };
const twoCols = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))' };

const SERVICES = [
  {
    name: 'Branding & Identity',
    desc: 'Logotype, charte graphique et univers de marque, pensés pour être reconnus partout où la marque apparaît.',
    deliverables: 'Logo · Charte graphique · Stratégie de marque',
  },
  {
    name: 'UI/UX Design',
    desc: 'Interfaces web et mobiles claires et agréables, de la maquette au prototype testable.',
    deliverables: 'Maquettes · Prototypage · Audit UX',
  },
  {
    name: 'Shooting Photo',
    desc: 'Des photos qui ressemblent vraiment à votre marque : portraits, équipe, lieux et coulisses.',
    deliverables: 'Portrait · Équipe · Lieux',
  },
  {
    name: "Shooting produit avec l'IA",
    desc: 'Vos produits mis en scène dans des décors sur mesure, créés par IA à partir de vos vraies photos.',
    deliverables: 'Packshots · Mises en scène · Visuels réseaux',
  },
];

const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export default function Home() {
  return (
    <div style={{ color: 'var(--text)', background: 'var(--bg)' }}>
      <Seo title="ARIS ID Studio — Identité de marque, UI/UX et images · Lutécia Rustico" description="Studio de design de Lutécia Rustico à Nice : identité visuelle, maquettes d'interface, shooting photo et shooting produit avec l'IA pour startups, PME et marques lifestyle." path="/" jsonLd={JSON_LD} />
      {/* HERO */}
      <section className="hero">
        <img
          className="h-img hero-img"
          src="/images/hero-glass.webp"
          srcSet="/images/hero-glass-828.webp 828w, /images/hero-glass-1280.webp 1280w, /images/hero-glass-1920.webp 1920w, /images/hero-glass.webp 2880w"
          sizes="100vw"
          alt=""
          width="2880"
          height="1800"
          fetchPriority="high"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="hero-scrim" aria-hidden="true" style={{ position: 'absolute', inset: 0 }} />

        <div
          className="h-fade hero-label eyebrow"
          style={{ '--d': '200ms', position: 'absolute', left: GUTTER, display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <span aria-hidden="true" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-soft)' }} />
          <span>Studio de design</span>
        </div>

        <div style={{ position: 'absolute', left: GUTTER, right: GUTTER, bottom: '72px', maxWidth: '720px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <h1
            className="h-in display"
            style={{ '--d': '150ms', '--y': '28px', margin: 0, fontSize: 'clamp(44px, 7.2vw, 104px)', lineHeight: 0.96, letterSpacing: '-0.025em' }}
          >
            Votre marque, à la hauteur de votre projet.
          </h1>
          <p
            className="h-in"
            style={{ '--d': '280ms', '--y': '14px', margin: 0, maxWidth: '480px', fontSize: '18px', lineHeight: 1.55, color: 'var(--text-2)', textWrap: 'pretty' }}
          >
            Je suis Lutécia Rustico. Je conçois l'identité visuelle, les maquettes d'interface et les images des startups, PME et marques lifestyle.
          </p>
          <div
            className="h-in"
            style={{ '--d': '360ms', '--y': '10px', display: 'flex', alignItems: 'center', gap: '16px 32px', marginTop: '8px', flexWrap: 'wrap' }}
          >
            <a href="#contact" className="btn">Démarrer un projet <ArrowRight /></a>
            <Link to="/projets" className="text-link">Voir les projets</Link>
          </div>
        </div>

        <Link
          to="/projets/morwen-automobile"
          className="h-in hero-card glass"
          style={{ '--d': '600ms', '--y': '12px', position: 'absolute', right: GUTTER, bottom: '72px', width: '320px', padding: '12px', display: 'flex', alignItems: 'center', gap: '16px', borderRadius: '6px', textDecoration: 'none', color: 'var(--text)' }}
        >
          <img src="/images/proj-morwen.webp" alt="" width="72" height="72" loading="lazy" decoding="async" style={{ width: '72px', height: '72px', objectFit: 'cover', borderRadius: '3px', flexShrink: 0 }} />
          <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)' }}>Dernier projet</span>
            <span style={{ fontSize: '16px', fontWeight: 500 }}>Morwen Automobile</span>
            <span style={{ fontSize: '13px', color: 'var(--text-3)' }}>Identité de marque</span>
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-soft)" strokeWidth="1.8" aria-hidden="true" style={{ flexShrink: 0 }}><path d="M7 17L17 7M9 7h8v8" /></svg>
        </Link>
      </section>

      {/* PROJETS RÉCENTS */}
      <section id="projets" className="home-section" style={container}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap', paddingBottom: '40px', borderBottom: LINE }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span className="eyebrow">Projets</span>
            <h2 className="display reveal" style={h2Style}>Projets récents</h2>
          </div>
          <Link to="/projets" className="text-link">Tous les projets</Link>
        </div>

        <div style={{ ...twoCols, gap: '32px', paddingTop: '48px' }}>
          <ProjectCard
            slug="morwen-automobile"
            name="Morwen Automobile"
            discipline="Identité de marque"
            image="/images/proj-morwen.webp"
            alt="Identité Morwen Automobile déclinée sur coffret, carte et signalétique"
            width={720}
            height={900}
            ratio="4/5"
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', minWidth: 0 }}>
            <ProjectCard
              slug="tic-tac"
              name="Tic Tac"
              discipline="Identité visuelle"
              image="/images/proj-tictac.webp"
              alt="Enseigne Tic Tac sur une façade"
              width={900}
              height={640}
              ratio="16/10"
            />
            <ProjectCard
              slug="spicy-20s"
              name="Spicy 20's"
              discipline="Branding · Direction artistique"
              image="/images/proj-spicy.webp"
              alt="Bouteille Spicy 20's rouge avec le logo flamme"
              width={900}
              height={675}
              ratio="16/10"
            />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="home-section-lg" style={container}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '40px' }}>
          <span className="eyebrow">Services</span>
          <h2 className="display reveal" style={{ ...h2Style, maxWidth: '760px' }}>De l'identité à l'image.</h2>
        </div>

        {SERVICES.map((s, i) => (
          <div
            key={s.name}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              columnGap: '48px',
              rowGap: '24px',
              padding: '40px 0',
              borderTop: LINE,
              borderBottom: i === SERVICES.length - 1 ? LINE : undefined,
            }}
          >
            <h3 className="display" style={{ margin: 0, fontSize: '32px', lineHeight: 1.1, letterSpacing: '-0.01em' }}>{s.name}</h3>
            <p style={{ margin: 0, fontSize: '17px', lineHeight: 1.55, color: 'var(--text-2)' }}>{s.desc}</p>
            <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.8, color: 'var(--text-3)' }}>{s.deliverables}</p>
          </div>
        ))}
      </section>

      {/* À PROPOS */}
      <section id="a-propos" className="home-section-lg" style={container}>
        <div style={{ ...twoCols, gap: '64px', alignItems: 'end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', minWidth: 0 }}>
            <span className="eyebrow">À propos</span>
            <p className="display" style={{ margin: 0, fontSize: 'clamp(30px, 3.2vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.015em', textWrap: 'pretty' }}>
              Je cherche ce qui rend votre marque unique, puis je le rends visible partout : logo, maquettes, photos, réseaux.
            </p>
            <Link to="/a-propos" className="text-link" style={{ alignSelf: 'flex-start' }}>Mon parcours</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '32px', borderTop: LINE, paddingTop: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span className="display stat-value" style={{ fontSize: '64px', lineHeight: 1, letterSpacing: '-0.02em' }}>4 ans</span>
              <span style={{ fontSize: '15px', color: 'var(--text-3)' }}>d'expérience en design de marque</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span className="display stat-value" style={{ fontSize: '64px', lineHeight: 1, letterSpacing: '-0.02em' }}>50+</span>
              <span style={{ fontSize: '15px', color: 'var(--text-3)' }}>projets livrés</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="home-section-lg" style={{ ...container, paddingBottom: '128px', scrollMarginTop: '24px' }}>
        <div style={{ ...twoCols, gap: '64px', paddingTop: '64px', borderTop: LINE }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0 }}>
            <span className="eyebrow">Démarrer un projet</span>
            <h2 className="display reveal" style={{ margin: 0, fontSize: 'clamp(40px, 5.6vw, 80px)', lineHeight: 0.98, letterSpacing: '-0.025em' }}>Un projet en tête ?</h2>
            <p style={{ margin: 0, maxWidth: '420px', fontSize: '17px', lineHeight: 1.55, color: 'var(--text-2)' }}>
              Décrivez-le en quelques lignes. Je vous réponds sous 24 h avec une première proposition d'approche.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px', fontSize: '16px' }}>
              <a href="mailto:helloarisidstudio@gmail.com" className="text-link break-anywhere" style={{ alignSelf: 'flex-start', fontWeight: 400 }}>helloarisidstudio@gmail.com</a>
              <a href="tel:+33614132971" className="tap" style={{ alignSelf: 'flex-start', color: 'var(--text-3)', textDecoration: 'none' }}>+33 6 14 13 29 71</a>
            </div>
          </div>
          <ProjectForm />
        </div>
      </section>
    </div>
  );
}
