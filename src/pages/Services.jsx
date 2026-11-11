import { Link } from 'react-router-dom';
import { SERVICES } from '../data/services';
import { PROCESS_STEPS } from '../data/process';
import { PROJECTS } from '../data/projects';
import { Seo } from '../components/Seo';

const GUTTER = 'clamp(20px, 4.5vw, 64px)';
const container = { maxWidth: '1440px', margin: '0 auto', paddingLeft: GUTTER, paddingRight: GUTTER };

const hasProjects = (id) => PROJECTS.some((p) => p.services.includes(id));

function ServiceText({ service }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0, maxWidth: service.image ? undefined : '640px' }}>
      <h2 className="display reveal" style={{ margin: 0, fontSize: 'clamp(36px, 4.2vw, 60px)', lineHeight: 1, letterSpacing: '-0.02em' }}>{service.title}</h2>
      <p style={{ margin: 0, maxWidth: '480px', fontSize: '17px', lineHeight: 1.6, color: 'var(--text-2)' }}>{service.desc}</p>
      <ul className="ruled-list" aria-label={`Inclus : ${service.title}`}>
        {service.included.map((item) => <li key={item}>{item}</li>)}
      </ul>
      {hasProjects(service.id) && (
        <Link to={`/projets?service=${service.id}`} className="text-link" style={{ alignSelf: 'flex-start', marginTop: '8px' }}>Voir les projets</Link>
      )}
    </div>
  );
}

function ServiceImage({ image }) {
  return (
    <img
      className="reveal"
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading="lazy"
      decoding="async"
      style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: '4px' }}
    />
  );
}

export default function Services() {
  return (
    <div style={{ color: 'var(--text)' }}>
      <Seo title="Services · ARIS ID Studio" description="Branding & Identity, UI/UX Design, Shooting Photo et Shooting produit avec l'IA." path="/services" />
      <section className="pad-top-page" style={container}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '32px', flexWrap: 'wrap', paddingBottom: '56px', borderBottom: '1px solid var(--line)' }}>
          <h1 className="display h-in" style={{ '--d': '0ms', '--y': '24px', margin: 0, fontSize: 'clamp(56px, 9vw, 144px)', lineHeight: 0.92, letterSpacing: '-0.03em' }}>Services</h1>
          <p style={{ margin: 0, maxWidth: '460px', fontSize: '17px', lineHeight: 1.55, color: 'var(--text-2)' }}>
            De l'identité de marque aux images qui la font vivre, je vous accompagne sur tout ce qui rend votre marque reconnaissable.
          </p>
        </div>
      </section>

      {SERVICES.map((service, i) => {
        const imageFirst = i % 2 === 1;
        return (
          <section key={service.id} id={service.id} className={i === 0 ? 'pad-96' : 'pad-128'} style={container}>
            {service.image ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))', gap: '64px', alignItems: 'center' }}>
                {imageFirst && <ServiceImage image={service.image} />}
                <ServiceText service={service} />
                {!imageFirst && <ServiceImage image={service.image} />}
              </div>
            ) : (
              <ServiceText service={service} />
            )}
          </section>
        );
      })}

      <section className="pad-160" style={container}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '48px' }}>
          <span className="eyebrow">Ma méthode</span>
          <h2 className="display reveal" style={{ margin: 0, fontSize: 'clamp(36px, 4.4vw, 64px)', lineHeight: 1, letterSpacing: '-0.02em' }}>Quatre étapes, quatre lettres.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '32px' }}>
          {PROCESS_STEPS.map((step) => (
            <div key={step.num} style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '24px', borderTop: '1px solid var(--line)' }}>
              <span aria-hidden="true" style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 600, fontSize: '120px', lineHeight: 0.85, letterSpacing: '-0.04em', color: 'var(--accent-soft)' }}>{step.num}</span>
              <h3 className="display" style={{ margin: 0, fontSize: '28px' }}>{step.title}</h3>
              <p style={{ margin: 0, fontSize: '16px', lineHeight: 1.6, color: 'var(--text-2)' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pad-160" style={{ ...container, paddingBottom: '128px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '32px', flexWrap: 'wrap', paddingTop: '48px', borderTop: '1px solid var(--line)' }}>
          <h2 className="display reveal" style={{ margin: 0, maxWidth: '760px', fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 0.98, letterSpacing: '-0.025em' }}>Un besoin précis ? Parlons-en.</h2>
          <Link to="/contact" className="btn">
            Démarrer un projet
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
