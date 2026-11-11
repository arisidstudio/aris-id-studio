import { Link } from 'react-router-dom';

const RATIOS = { '4/5': '4 / 5', '4/3': '4 / 3', '16/10': '16 / 10' };

export function ProjectCard({ slug, name, discipline, image, alt, width, height, ratio = '4/5', imageStyle }) {
  return (
    <Link to={`/projets/${slug}`} className="project-card">
      <span className="project-card__media reveal">
        <img
          src={image}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          style={{ aspectRatio: RATIOS[ratio] ?? ratio, ...imageStyle }}
        />
        <span className="glass project-card__tag" aria-hidden="true">Voir le projet ↗</span>
      </span>
      <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px 16px', flexWrap: 'wrap' }}>
        <span className="display" style={{ fontSize: '28px', lineHeight: 1.1, letterSpacing: '-0.01em' }}>{name}</span>
        <span style={{ fontSize: '14px', color: 'var(--text-3)' }}>{discipline}</span>
      </span>
    </Link>
  );
}
