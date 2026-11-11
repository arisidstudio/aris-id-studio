import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProjectCard } from '../components/ProjectCard';
import { PROJECTS } from '../data/projects';
import { Seo } from '../components/Seo';

const GUTTER = 'clamp(20px, 4.5vw, 64px)';
const container = { maxWidth: '1440px', margin: '0 auto', paddingLeft: GUTTER, paddingRight: GUTTER };

const FILTERS = [
  { value: null, label: 'Tous' },
  { value: 'branding', label: 'Branding & Identity' },
  { value: 'uiux', label: 'UI/UX Design' },
  { value: 'photo', label: 'Shooting Photo' },
  { value: 'produit-ia', label: 'Shooting produit IA' },
];

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  // The static HTML is rendered without a query string: apply ?service= only after hydration.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const requested = hydrated ? searchParams.get('service') : null;
  const active = FILTERS.find((f) => f.value === requested) ?? FILTERS[0];
  const projects = active.value ? PROJECTS.filter((p) => p.services.includes(active.value)) : PROJECTS;

  const select = (value) => setSearchParams(value ? { service: value } : {}, { replace: true });

  return (
    <div style={{ color: 'var(--text)' }}>
      <Seo title="Projets · ARIS ID Studio" description="Identités, maquettes d'interface et images réalisées pour des startups, PME et marques lifestyle." path="/projets" />
      <section className="pad-top-page" style={container}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '32px', flexWrap: 'wrap' }}>
          <h1
            className="display h-in"
            style={{ '--d': '0ms', '--y': '24px', margin: 0, fontSize: 'clamp(56px, 9vw, 144px)', lineHeight: 0.92, letterSpacing: '-0.03em' }}
          >
            Projets
          </h1>
          <p style={{ margin: 0, maxWidth: '420px', fontSize: '17px', lineHeight: 1.55, color: 'var(--text-2)' }}>
            Identités, maquettes d'interface et images réalisées pour des startups, PME et marques lifestyle.
          </p>
        </div>

        <div
          role="group"
          aria-label="Filtrer par service"
          style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '56px', paddingTop: '28px', borderTop: '1px solid var(--line)' }}
        >
          {FILTERS.map((f) => (
            <button
              key={f.label}
              type="button"
              className="filter-btn"
              aria-pressed={f === active}
              onClick={() => select(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      <section style={{ ...container, paddingTop: '48px' }} aria-live="polite">
        {projects.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))', columnGap: '32px', rowGap: '64px' }}>
            {projects.map((p) => (
              <ProjectCard
                key={p.slug}
                slug={p.slug}
                name={p.displayTitle}
                discipline={p.discipline}
                image={p.cover.src}
                alt={p.cover.alt}
                width={p.cover.width}
                height={p.cover.height}
                ratio="4/3"
                imageStyle={p.coverStyle}
              />
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '20px', padding: '48px 0' }}>
            <p style={{ margin: 0, fontSize: '17px', lineHeight: 1.55, color: 'var(--text-2)' }}>
              Les projets de {active.label.toLowerCase()} arrivent bientôt.
            </p>
            <Link to="/contact" className="text-link">Me parler de votre projet</Link>
          </div>
        )}
      </section>

      <section className="pad-160" style={{ ...container, paddingBottom: '128px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '32px', flexWrap: 'wrap', paddingTop: '48px', borderTop: '1px solid var(--line)' }}>
          <h2 className="display reveal" style={{ margin: 0, fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 0.98, letterSpacing: '-0.025em' }}>
            Votre marque pourrait être la prochaine.
          </h2>
          <Link to="/contact" className="btn">
            Démarrer un projet
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
