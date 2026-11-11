import { Seo } from '../components/Seo';
import { ProjectForm } from '../components/ProjectForm';

const GUTTER = 'clamp(20px, 4.5vw, 64px)';

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/arisid_studio?igsh=ZTN6Mmllc3VkYXNq&utm_source=qr' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lut%C3%A9cia-rustico-011064213/' },
  { label: 'Facebook', href: 'https://www.facebook.com/share/1AoGoDNwTp/?mibextid=wwXIfr' },
];

const row = { display: 'flex', justifyContent: 'space-between', gap: '8px 24px', flexWrap: 'wrap', padding: '18px 0', borderBottom: '1px solid var(--line)' };
const dt = { fontSize: '14px', color: 'var(--text-3)' };
const dd = { margin: 0, fontSize: '16px', minWidth: 0 };
const plainLink = { color: 'var(--text)', textDecoration: 'none' };

export default function Contact() {
  return (
    <div style={{ color: 'var(--text)' }}>
      <Seo title="Contact · ARIS ID Studio" description="Parlez-moi de votre projet : je vous réponds avec une première proposition d'approche." path="/contact" />
      <section className="pad-top-page" style={{ position: 'relative', maxWidth: '1440px', margin: '0 auto', paddingLeft: GUTTER, paddingRight: GUTTER, paddingBottom: '128px' }}>
        <img className="h-fade ct-bg" src="/images/hero-glass.webp" srcSet="/images/hero-glass-828.webp 828w, /images/hero-glass-1280.webp 1280w, /images/hero-glass-1920.webp 1920w, /images/hero-glass.webp 2880w" sizes="(max-width: 1000px) 100vw, 72vw" alt="" aria-hidden="true" width="2880" height="1800" style={{ '--d': '150ms' }} />

        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: '80px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', minWidth: 0 }}>
            <span className="eyebrow">Contact</span>
            <h1 className="display h-in" style={{ '--d': '0ms', '--y': '24px', margin: 0, fontSize: 'clamp(52px, 7vw, 112px)', lineHeight: 0.92, letterSpacing: '-0.03em' }}>
              Parlons de votre projet.
            </h1>
            <p style={{ margin: 0, maxWidth: '440px', fontSize: '17px', lineHeight: 1.6, color: 'var(--text-2)' }}>
              Remplissez le brief en deux minutes. Je vous réponds sous À REMPLIR (ex. « 48 h ») avec une première proposition d'approche.
            </p>
            <dl style={{ margin: '24px 0 0', display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--line)' }}>
              <div style={row}>
                <dt style={dt}>Email</dt>
                <dd style={dd}><a href="mailto:helloarisidstudio@gmail.com" className="text-link break-anywhere" style={{ fontWeight: 400 }}>helloarisidstudio@gmail.com</a></dd>
              </div>
              <div style={row}>
                <dt style={dt}>Téléphone</dt>
                <dd style={dd}><a href="tel:+33614132971" className="tap" style={plainLink}>+33 6 14 13 29 71</a></dd>
              </div>
              <div style={row}>
                <dt style={dt}>Basée à</dt>
                <dd style={dd}>Nice, France</dd>
              </div>
              <div style={row}>
                <dt style={dt}>Réseaux</dt>
                <dd style={{ ...dd, display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  {SOCIALS.map((s) => (
                    <a key={s.label} href={s.href} className="footer-link" style={{ fontSize: '16px' }} target="_blank" rel="noopener noreferrer">{s.label}</a>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          <ProjectForm variant="full" className="glass" style={{ padding: 'clamp(24px, 3vw, 40px)', borderRadius: '16px' }} />
        </div>
      </section>
    </div>
  );
}
