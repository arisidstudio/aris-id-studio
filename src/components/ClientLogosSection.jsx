import { Fragment } from 'react';
import { CLIENTS } from '../data/clients';

function ClientGroup({ hidden }) {
  return (
    <div className="mq-group display" aria-hidden={hidden || undefined}>
      {CLIENTS.map((client) => (
        <Fragment key={client}>
          <span>{client}</span>
          <span aria-hidden="true" style={{ color: 'var(--accent-soft)' }}>✦</span>
        </Fragment>
      ))}
    </div>
  );
}

export function ClientLogosSection({ className, style }) {
  return (
    <section className={className} style={style}>
      <div style={{ maxWidth: '1440px', margin: '0 auto 32px', paddingLeft: 'clamp(20px, 4.5vw, 64px)', paddingRight: 'clamp(20px, 4.5vw, 64px)' }}>
        <span className="eyebrow">Ils m'ont fait confiance</span>
      </div>
      <div className="mq" role="img" aria-label={`Clients : ${CLIENTS.join(', ')}`}>
        <div className="mq-track">
          <ClientGroup />
          <ClientGroup hidden />
        </div>
      </div>
    </section>
  );
}
