import { Head } from 'vite-react-ssg';

export const SITE_URL = 'https://www.arisidstudio.com';
const DEFAULT_IMAGE = '/og/default.jpg';

export function Seo({ title, description, path = '/', image = DEFAULT_IMAGE, type = 'website', noindex = false, jsonLd }) {
  const url = path === null ? null : SITE_URL + path;
  const imageUrl = SITE_URL + image;
  return (
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {noindex && <meta name="robots" content="noindex" />}
      {url && <link rel="canonical" href={url} />}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="ARIS ID Studio" />
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Head>
  );
}

export function excerpt(text, max = 155) {
  const clean = (text ?? '').replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max + 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:.–—-]+$/, '') + '…';
}
