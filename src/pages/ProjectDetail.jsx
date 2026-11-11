import { Link, useParams } from 'react-router-dom';
import { Seo, excerpt } from '../components/Seo';
import { ProjectCard } from '../components/ProjectCard';
import { PROJECTS } from '../data/projects';
import NotFound from './NotFound';

const GUTTER = 'clamp(20px, 4.5vw, 64px)';
const container = { maxWidth: '1440px', margin: '0 auto', paddingLeft: GUTTER, paddingRight: GUTTER };
const label = { display: 'block', marginBottom: '24px', fontSize: '13px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)' };
const statement = { margin: 0, fontSize: 'clamp(32px, 3.6vw, 52px)', lineHeight: 1.05, letterSpacing: '-0.02em' };

const GRID_MIN = { 'cols-2': 420, 'cols-3': 300, 'cols-4': 280 };
const grid = (min) => ({ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${min}px), 1fr))`, gap: '16px' });

function textColorFor(hex) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [n >> 16, (n >> 8) & 255, n & 255].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.25 ? '#0F0D0C' : '#FFFFFF';
}

function ProjectImage({ image }) {
  return (
    <img
      className="project-img reveal"
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading="lazy"
      decoding="async"
      style={image.ratio ? { aspectRatio: image.ratio.replace('/', ' / ') } : undefined}
    />
  );
}

function SectionImages({ section }) {
  const { layout, images } = section;
  if (layout === 'single') return <ProjectImage image={images[0]} />;
  if (layout === 'masonry') {
    return <div className="masonry">{images.map((im) => <ProjectImage key={im.src} image={im} />)}</div>;
  }
  if (layout === 'feature') {
    const [first, ...rest] = images;
    return (
      <>
        <ProjectImage image={first} />
        <div style={{ ...grid(420), marginTop: '16px' }}>{rest.map((im) => <ProjectImage key={im.src} image={im} />)}</div>
      </>
    );
  }
  return <div style={grid(GRID_MIN[layout] ?? 420)}>{images.map((im) => <ProjectImage key={im.src} image={im} />)}</div>;
}

function ProjectSection({ section, padClass }) {
  return (
    <section className={padClass} style={container}>
      {section.quote ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
          <span style={{ ...label, marginBottom: 0 }}>{section.label}</span>
          <p className="display" style={{ ...statement, maxWidth: '760px' }}>{section.quote}</p>
        </div>
      ) : (
        <span style={label}>{section.label}</span>
      )}
      <SectionImages section={section} />
    </section>
  );
}

function ColorsSection({ colors }) {
  return (
    <section className="pad-96" style={container}>
      <span style={label}>Couleurs</span>
      <div style={grid(240)}>
        {colors.map(({ name, hex }) => (
          <div
            key={hex}
            className="swatch reveal"
            style={{
              background: hex,
              color: textColorFor(hex),
              border: hex === '#000000' ? '1px solid rgba(243, 238, 231, 0.16)' : undefined,
            }}
          >
            <span style={{ fontSize: '17px', fontWeight: 500 }}>{name}</span>
            <span style={{ fontSize: '14px' }}>{hex}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  if (index === -1) return <NotFound />;

  const project = PROJECTS[index];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const [firstSection, ...otherSections] = project.sections;

  const meta = [
    ['Discipline', project.discipline],
    ['Secteur', project.sector],
    ['Livrables', project.deliverables],
    ['Année', project.year],
  ].filter(([, value]) => value);

  const ContextHeading = project.tagline ? 'h3' : 'h2';
  const paragraphs = (project.description ?? '').split(/\n\s*\n/).filter(Boolean);

  return (
    <div style={{ color: 'var(--text)' }}>
      <Seo
        title={`${project.displayTitle} — ${project.discipline} · ARIS ID Studio`}
        description={excerpt(project.description)}
        path={`/projets/${project.slug}`}
        image={`/og/${project.slug}.jpg`}
        type="article"
      />

      <section className="pad-top-page" style={{ ...container, paddingBottom: '56px' }}>
        <Link to="/projets" className="tap" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-3)', textDecoration: 'none' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          Tous les projets
        </Link>
        <h1
          className="display h-in"
          style={{ '--d': '0ms', '--y': '24px', margin: '32px 0 0', fontSize: 'clamp(52px, 9vw, 144px)', lineHeight: 0.92, letterSpacing: '-0.03em' }}
        >
          {project.displayTitle}
        </h1>
        {meta.length > 0 && (
          <dl style={{ margin: '56px 0 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '32px', paddingTop: '28px', borderTop: '1px solid var(--line)' }}>
            {meta.map(([term, value]) => (
              <div key={term} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <dt className="eyebrow">{term}</dt>
                <dd style={{ margin: 0, fontSize: '17px' }}>{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </section>

      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          className="h-img"
          src={project.hero.src}
          alt={project.hero.alt}
          width={project.hero.width}
          height={project.hero.height}
          fetchPriority="high"
          style={{ '--d': '200ms', display: 'block', width: '100%', height: 'clamp(320px, 52vw, 760px)', objectFit: 'cover' }}
        />
        <span
          className="glass h-fade"
          style={{ '--d': '700ms', position: 'absolute', left: GUTTER, bottom: 'clamp(20px, 3vw, 40px)', display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '12px 20px', borderRadius: '999px', fontSize: '15px', fontWeight: 500, color: 'var(--text)' }}
        >
          <span aria-hidden="true" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-soft)' }} />
          {project.discipline}
        </span>
      </div>

      {(project.tagline || paragraphs.length > 0) && (
        <section className="pad-128" style={container}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: '64px' }}>
            {project.tagline && <h2 className="display reveal" style={statement}>{project.tagline}</h2>}
            {paragraphs.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', gridColumn: project.tagline ? undefined : '1 / -1', maxWidth: project.tagline ? undefined : '760px' }}>
                <ContextHeading style={{ margin: 0, fontSize: '13px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)' }}>Le contexte</ContextHeading>
                {paragraphs.map((text, i) => (
                  <p key={i} style={{ margin: 0, fontSize: '17px', lineHeight: 1.6, color: 'var(--text-2)', textWrap: 'pretty' }}>{text}</p>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {firstSection && <ProjectSection section={firstSection} padClass="pad-128" />}
      {project.colors?.length > 0 && <ColorsSection colors={project.colors} />}
      {otherSections.map((section) => (
        <ProjectSection key={section.label} section={section} padClass={section.quote ? 'pad-128' : 'pad-96'} />
      ))}

      <section className="pad-160" style={{ ...container, paddingBottom: '128px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: '32px', paddingTop: '48px', borderTop: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: 0 }}>
            <span className="eyebrow">Projet suivant</span>
            <ProjectCard
              slug={next.slug}
              name={next.displayTitle}
              discipline={next.discipline}
              image={next.cover.src}
              alt={next.cover.alt}
              width={next.cover.width}
              height={next.cover.height}
              ratio="16/10"
              imageStyle={next.coverStyle}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '24px', minWidth: 0 }}>
            <h2 className="display reveal" style={{ margin: 0, fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 0.98, letterSpacing: '-0.025em' }}>Un projet de ce type ?</h2>
            <p style={{ margin: 0, maxWidth: '420px', fontSize: '17px', lineHeight: 1.55, color: 'var(--text-2)' }}>
              Parlez-moi de votre marque, je vous réponds avec une première approche.
            </p>
            <Link to="/contact" className="btn" style={{ alignSelf: 'flex-start' }}>
              Démarrer un projet
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
