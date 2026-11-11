import { Link } from 'react-router-dom';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ClientLogosSection } from '../components/ClientLogosSection';
import { Seo } from '../components/Seo';

const GUTTER = 'clamp(20px, 4.5vw, 64px)';
const container = { maxWidth: '1440px', margin: '0 auto', paddingLeft: GUTTER, paddingRight: GUTTER };

const VALUES = [
  { title: 'Excellence', text: 'Chaque détail compte.' },
  { title: 'Audace', text: 'Oser sortir des codes.' },
  { title: 'Transparence', text: 'Une communication claire, du brief à la livraison.' },
];

const STATS = [
  { value: '4 ans', label: "d'expérience en design de marque" },
  { value: '50+', label: 'projets livrés' },
];

export default function About() {
  return (
    <div style={{ color: 'var(--text)' }}>
      <Seo title="À propos · ARIS ID Studio" description="Lutécia Rustico, graphiste et directrice artistique à Nice, fondatrice d'ARIS ID Studio." path="/a-propos" />
      <section style={{ ...container, paddingTop: '56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))', gap: '64px', alignItems: 'end' }}>
          <img
            className="h-img"
            src="/images/about-portrait.webp"
            alt="Portrait de Lutécia Rustico, assise bras croisés"
            width="1200"
            height="1500"
            fetchPriority="high"
            style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '4 / 5', objectFit: 'cover', borderRadius: '4px' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', paddingBottom: '8px', minWidth: 0 }}>
            <span className="eyebrow">À propos</span>
            <h1 className="display h-in" style={{ '--d': '0ms', '--y': '24px', margin: 0, fontSize: 'clamp(52px, 7vw, 112px)', lineHeight: 0.92, letterSpacing: '-0.03em' }}>Lutécia Rustico</h1>
            <p style={{ margin: 0, fontSize: '19px', lineHeight: 1.55 }}>
              ARIS ID est né d'une conviction simple : une identité juste ne se crée pas dans l'urgence.
            </p>
            <p style={{ margin: 0, maxWidth: '520px', fontSize: '17px', lineHeight: 1.6, color: 'var(--text-2)' }}>
              Graphiste et directrice artistique, basée à Nice. Je ne crée pas de logos : je crée une histoire autour de votre marque, puis je la rends visible partout, du logo aux maquettes, des photos aux réseaux.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '32px', marginTop: '16px', paddingTop: '28px', borderTop: '1px solid var(--line)' }}>
              {STATS.map((s) => (
                <div key={s.value} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span className="display stat-value" style={{ fontSize: '56px', lineHeight: 1, letterSpacing: '-0.02em' }}>{s.value}</span>
                  <span style={{ fontSize: '15px', color: 'var(--text-3)' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pad-160" style={container}>
        <p className="display reveal" style={{ margin: 0, maxWidth: '1100px', fontSize: 'clamp(36px, 5vw, 76px)', lineHeight: 1.02, letterSpacing: '-0.025em', textWrap: 'balance' }}>
          « Ici, la création n'est jamais décorative. Elle est <span style={{ color: 'var(--accent-soft)' }}>ancrée, réglée, pensée.</span> »
        </p>
      </section>

      <section className="pad-128" style={container}>
        <span className="eyebrow" style={{ display: 'block', marginBottom: '32px' }}>Ce qui guide mon travail</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '32px' }}>
          {VALUES.map((v) => (
            <div key={v.title} style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '24px', borderTop: '1px solid var(--line)' }}>
              <h2 className="display" style={{ margin: 0, fontSize: '36px', letterSpacing: '-0.01em' }}>{v.title}</h2>
              <p style={{ margin: 0, fontSize: '17px', color: 'var(--text-2)' }}>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <TestimonialsSection className="pad-160" style={container} />

      <ClientLogosSection className="pad-128" />

      <section className="pad-160" style={{ ...container, paddingBottom: '128px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '32px', flexWrap: 'wrap', paddingTop: '48px', borderTop: '1px solid var(--line)' }}>
          <h2 className="display reveal" style={{ margin: 0, maxWidth: '760px', fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 0.98, letterSpacing: '-0.025em' }}>Travaillons ensemble.</h2>
          <Link to="/contact" className="btn">
            Démarrer un projet
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
