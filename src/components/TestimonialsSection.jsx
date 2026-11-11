import { useRef, useState } from 'react';
import { TESTIMONIALS } from '../data/testimonials';

const pad = (n) => String(n).padStart(2, '0');
const PANEL_ID = 'testimonial-panel';
const tabId = (i) => `testimonial-tab-${i}`;

function Highlight({ text, accent }) {
  const i = accent ? text.indexOf(accent) : -1;
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <span style={{ color: 'var(--accent-soft)' }}>{accent}</span>
      {text.slice(i + accent.length)}
    </>
  );
}

// The highlight is already shown in large type: drop it from the body when it appears there verbatim.
const bodyText = ({ text, highlight }) =>
  highlight && text.includes(highlight) ? text.replace(highlight, '').replace(/\s{2,}/g, ' ').trim() : text;

export function TestimonialsSection({ className, style }) {
  const [active, setActive] = useState(0);
  const tabsRef = useRef([]);
  const t = TESTIMONIALS[active];

  const focusTab = (i) => {
    const next = (i + TESTIMONIALS.length) % TESTIMONIALS.length;
    setActive(next);
    tabsRef.current[next]?.focus();
  };

  const onKeyDown = (e) => {
    const keys = { ArrowRight: active + 1, ArrowDown: active + 1, ArrowLeft: active - 1, ArrowUp: active - 1, Home: 0, End: TESTIMONIALS.length - 1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    focusTab(keys[e.key]);
  };

  return (
    <section className={className} style={style}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px', flexWrap: 'wrap', paddingBottom: '40px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <span className="eyebrow">Témoignages</span>
          <h2 className="display reveal" style={{ margin: 0, fontSize: 'clamp(36px, 4.4vw, 64px)', lineHeight: 1, letterSpacing: '-0.02em' }}>Ce qu'ils en disent</h2>
        </div>
        <span className="display" aria-hidden="true" style={{ fontSize: '20px', color: 'var(--text-3)', fontVariantNumeric: 'tabular-nums' }}>
          <span style={{ color: 'var(--text)' }}>{pad(active + 1)}</span> / {pad(TESTIMONIALS.length)}
        </span>
      </div>

      <div className="t-grid">
        <div
          id={PANEL_ID}
          role="tabpanel"
          aria-labelledby={tabId(active)}
          style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: '32px' }}
        >
          <svg width="56" height="44" viewBox="0 0 56 44" fill="var(--accent-soft)" aria-hidden="true">
            <path d="M0 44V27.5C0 11.7 8.4 2.6 22.4 0l2.4 6.2C16.5 8.6 12.6 13.4 12 20.6h11V44H0zm31.2 0V27.5C31.2 11.7 39.6 2.6 53.6 0L56 6.2c-8.3 2.4-12.2 7.2-12.8 14.4h11V44h-23z" />
          </svg>
          <figure key={t.id} className="t-in" style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <blockquote style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <p className="display" style={{ margin: 0, fontSize: 'clamp(30px, 3.4vw, 50px)', lineHeight: 1.08, letterSpacing: '-0.02em', textWrap: 'balance' }}>
                <Highlight text={t.highlight} accent={t.accent} />
              </p>
              <p style={{ margin: 0, maxWidth: '680px', fontSize: '17px', lineHeight: 1.65, color: 'var(--text-2)', textWrap: 'pretty' }}>{bodyText(t)}</p>
            </blockquote>
            <figcaption style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img src={t.image} alt="" width="56" height="56" loading="lazy" decoding="async" style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
              <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
                <span style={{ fontSize: '17px', fontWeight: 500 }}>{t.name}</span>
                <span style={{ fontSize: '14px', color: 'var(--text-3)' }}>{t.role}</span>
              </span>
            </figcaption>
          </figure>
        </div>

        <div role="tablist" aria-label="Choisir un témoignage" className="t-list" onKeyDown={onKeyDown}>
          {TESTIMONIALS.map((item, i) => {
            const selected = i === active;
            return (
              <button
                key={item.id}
                ref={(el) => { tabsRef.current[i] = el; }}
                id={tabId(i)}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={PANEL_ID}
                tabIndex={selected ? 0 : -1}
                className="t-tab"
                onClick={() => setActive(i)}
              >
                <img src={item.image} alt="" width="44" height="44" loading="lazy" decoding="async" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, minWidth: 0 }}>
                  <span className="t-tab__name" style={{ fontSize: '17px', fontWeight: 500 }}>{item.name}</span>
                  <span className="t-tab__company" style={{ fontSize: '14px', color: 'var(--text-3)' }}>{item.company}</span>
                </span>
                <span className="t-tab__dot" aria-hidden="true" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-soft)', flexShrink: 0 }} />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
