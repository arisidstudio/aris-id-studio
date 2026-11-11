# ARIS ID Studio — Cahier d'intégration de la refonte

Destinataire : Claude Code, dans le repo `aris-id-studio` (Vite 7 + React 19 + Tailwind 3).
Source de vérité visuelle : les maquettes HTML du dossier `maquettes/` (zip `refonte-arisid.zip`). Les ouvrir dans un navigateur et reproduire fidèlement : mise en page, tailles, espacements, couleurs, textes.
Contexte produit : `PRODUCT.md`, `critique-arisid.md`, `audit-arisid.md` dans le projet Claude « PROJETS_SITEWEB ».

---

## 0. Règles générales

- **Langue** : tout le site en français, `lang="fr"`. Voix à la 1re personne (« je »), jamais « nous / notre ».
- **Réutiliser les données existantes** de `src/App.jsx` (`PROJECTS`, `TESTIMONIALS`, `CLIENTS`, `PROCESS_STEPS`) au lieu de les retaper. Corriger les libellés selon ce document.
- **Ne rien inventer** : un texte manquant reste entre crochets `[à compléter]` et est listé en fin de tâche.
- **Ne pas supprimer** `OffersPage`, `ResumePage`, `LegalPage` : les retirer seulement de la navigation (sauf Mentions légales, au footer).
- **Bannis** : halos et lueurs violettes, grille en fond, texte en dégradé, compteurs animés, chevron de scroll, cartes numérotées 1-2-3, bandeau défilant d'outils, police système, tout en capitales centrées, « 80 % clients satisfaits ».

## 1. Architecture

- Découper `App.jsx` : `src/components/` (Header, Footer, ProjectCard, GlassChip, Marquee, Testimonials, ContactForm…) et `src/pages/` (Home, Projects, ProjectDetail, Services, About, Contact, Legal, NotFound). Données dans `src/data/`.
- **Routing réel** avec `react-router-dom` (plus de navigation par state/ancres) :
  - `/` accueil · `/projets` · `/projets/:slug` · `/services` · `/a-propos` · `/contact` · `/mentions-legales` · `*` → 404.
  - Slugs : `morwen-automobile`, `tic-tac`, `spicy-20s`, `cherry-cherie`, `the-morning-party`, `football-cover`, `shooting-produit`.
- **Pré-rendu statique** (le HTML servi doit contenir le contenu) : `vite-react-ssg` ou équivalent. Vérifier avec « Afficher la source » que les textes sont dans le HTML.
- `vercel.json` : réécritures pour le routing SPA si besoin. Le site est hébergé sur Vercel.

## 2. Design tokens

### Couleurs
| Token | Valeur | Usage |
|---|---|---|
| `--bg` | `#0F0D0C` | fond global (noir chaud) |
| `--surface` | `#171412` | cartes pleines |
| `--text` | `#F3EEE7` | texte principal (ivoire) |
| `--text-2` | `#C9C1B7` | paragraphes |
| `--text-3` | `#A39B91` | labels, métadonnées |
| `--line` | `rgba(243,238,231,0.12)` | filets |
| `--accent` | `#5B2EFF` | violet de marque : boutons (texte blanc dessus) |
| `--accent-soft` | `#AD96FF` | violet clair : points, flèches, mots en accent, focus |
| `--accent-tint` | `rgba(91,46,255,0.16)` | fond d'option sélectionnée |
Un seul accent (le violet), toujours en aplat net. Teinte définitive à confirmer avec la charte : centraliser dans les variables.

### Typographie
- **Clash Display** (500, 600) : h1, h2, h3, chiffres, citations, noms de projets.
- **Excon** (400, 500) : texte, nav, labels, boutons, formulaires.
- Auto-hébergées en WOFF2 dans `public/fonts/` (fichiers fournis dans `assets/fonts/`), `font-display: swap`, préchargement de Clash Display 500.
- Échelle (desktop → mobile, via `clamp`) : h1 hero 104 → 44 px ; h1 pages 144 → 52 px ; h2 64 → 36 px ; h3 32 px ; texte 17–18 px ; labels 13 px majuscules, interlettrage 0.12em ; minimum 12 px partout.
- Titres : `letter-spacing` négatif (-0.02 à -0.03em), `line-height` 0.92–1.05, `text-wrap: balance`.

### Espacements et formes
- Conteneur max 1440 px, gouttière `clamp(20px, 4.5vw, 64px)`.
- Sections : 128–160 px entre blocs (96/80 px en mobile).
- Rayons : boutons 4 px, cartes 6 px, verre et pilules 999 px / 14–16 px.
- Boutons : hauteur 56 px (52 en mobile), padding 0 28 px, icône flèche à droite.

## 3. Composants

### Header (toutes les pages)
- Logo à gauche (`public/LOGO ARISID STUDIO Blanc.png`, à remplacer par un SVG si fourni ; largeur 104 px).
- Nav en **pilule de verre** à droite : Projets · Services · À propos · Contact. Page active surlignée dans la pilule (`aria-current="page"`).
- Pages intérieures : header `position: sticky; top: 0`, le logo dans sa propre pastille de verre.
- Accueil : header posé sur le hero (absolu), non sticky.
- **Mobile (< 720 px)** : nav remplacée par un bouton « Menu » en verre qui ouvre un panneau en verre (liens 17 px, zones ≥ 44 px). Header 64 px.

### Verre (glass)
```css
background: rgba(22,19,28,0.52);
backdrop-filter: blur(18px) saturate(150%);
border: 1px solid rgba(243,238,231,0.14);
box-shadow: inset 0 1px 0 rgba(255,255,255,0.07);
```
Uniquement là où il y a une image derrière : nav, menu mobile, carte « Dernier projet » du hero, étiquette « Voir le projet ↗ » au survol des images de projets (« Bientôt » pour les projets non développés), étiquette de discipline sur la grande image des pages projet, formulaire de la page Contact. Jamais sur fond uni.

### Footer
Logo · nav (Projets, Services, À propos, Contact) · Instagram, LinkedIn, Facebook (liens texte) · « © 2026 ARIS ID Studio » · Mentions légales & CGV.

### Carte projet
Image 4:3 (accueil : 4:5 pour la première), nom en Clash 28 px, discipline 14 px à droite. Survol : zoom image 1.03 + étiquette verre. Lien vers `/projets/:slug`.

## 4. Pages

### Accueil (`maquettes/accueil.html`)
1. **Hero** 880 px (780 en mobile) : fond `assets/images/hero-glass.webp` (ruban de verre violet 3D, plein cadre) + voile sombre à gauche (en bas en mobile) pour la lisibilité. Label « Studio de design » (point violet). H1 « Votre marque, à la hauteur de votre projet. » en bas à gauche. Paragraphe « Je suis Lutécia Rustico. Je conçois l'identité visuelle, les maquettes d'interface et les images des startups, PME et marques lifestyle. » Boutons « Démarrer un projet » (violet) + « Voir les projets » (lien). Carte verre « Dernier projet — Morwen Automobile » en bas à droite (masquée en mobile).
2. **Projets récents** : Morwen (grand) + Tic Tac et Spicy 20's empilés ; lien « Tous les projets ».
3. **Services** : titre « De l'identité à l'image. », 4 lignes séparées par des filets (nom · description · livrables), voir §Services.
4. **À propos** : phrase en Clash « Je cherche ce qui rend votre marque unique, puis je le rends visible partout : logo, maquettes, photos, réseaux. » + lien « Mon parcours » → `/a-propos` + chiffres statiques « 4 ans » et « 50+ projets livrés ».
5. **Formulaire de projet** : voir §Contact (version courte : nom, email, type, budget, délai, message).
6. Footer.

### Projets (`maquettes/projets.html`)
H1 « Projets » + intro, filtres (Tous, Branding & Identity, UI/UX Design, Shooting Photo, Shooting produit IA) **fonctionnels** (filtrer `PROJECTS` par service), grille 2 colonnes, CTA « Votre marque pourrait être la prochaine. »

### Page projet (`maquettes/projet-morwen.html`, `projet-tictac.html`, `projet-spicy.html`)
Lien retour « Tous les projets » · H1 nom du projet · métadonnées (Discipline, Secteur, Livrables, Année) · grande image plein largeur + étiquette verre · « Le contexte » / « L'approche » (reprendre `description` de `PROJECTS`) · Logo · Couleurs (nuanciers avec hex) · sections de visuels · « Projet suivant » + CTA.
Couleurs relevées sur les fichiers : Morwen tomate `#F95959`, prune `#920E4D`, noir, blanc ; Tic Tac violet `#77016F`, corail `#ED7668`, crème `#FCE7B4` ; Spicy rouge `#D00500`, framboise `#DF0C42`, moutarde `#FEBB43`, crème `#F3E2B0`.
Même gabarit pour Cherry Chérie, The Morning Party, Football cover, Shooting produit à partir de leurs données.

### Services (`maquettes/services.html`)
4 services, en alternance image / texte avec liste « inclus » :
- **Branding & Identity** — logo et déclinaisons, charte graphique, stratégie de marque, papeterie / réseaux / goodies.
- **UI/UX Design** — maquettes web et mobile, prototypage, audit UX (« prêtes à être développées par votre équipe » : Lutécia ne développe pas de sites).
- **Shooting Photo** — portrait, équipe et coulisses, lieux. Visuel : `[photo de shooting à fournir]`.
- **Shooting produit avec l'IA** — packshots, mises en scène artistiques, visuels réseaux. Visuel : montre (`Montre-pres-1.jpg`).
Puis **méthode A.R.I.S.** : 4 colonnes avec la lettre géante en violet clair (Ancrer, Régler, Identifier, Simplifier, textes de `PROCESS_STEPS`). Supprimer « Site Web No-Code », « Design Sportif », « Cover Design » des services.

### À propos (`maquettes/a-propos.html`)
Portrait + « Lutécia Rustico » + conviction + texte + chiffres · manifeste « Ici, la création n'est jamais décorative. Elle est *ancrée, réglée, pensée.* » · valeurs (Excellence, Audace, Transparence) · **témoignages interactifs** (citation forte en Clash avec passage en violet, avis complet, auteur ; liste cliquable des 3 personnes à droite, compteur 01/03 ; pastilles en mobile) · **bandeau défilant des clients** (noms en Clash, séparateur ✦ violet, fondu aux bords, pause au survol, statique si mouvement réduit). Pas de parcours sur cette page.

### Contact (`maquettes/contact.html`)
H1 « Parlons de votre projet. » + coordonnées (email, téléphone, « Nice, France », réseaux). Formulaire en verre sur fond `hero-glass.webp` : Nom complet*, Entreprise*, Email*, Téléphone, Type de projet* (cases : Branding & Identity, UI/UX Design, Shooting photo, Shooting produit IA, Autre), Budget*, Délai*, Description*, « Envoyer la demande ». Garder l'envoi actuel (mailto) ou proposer un service d'envoi : à valider avec Lutécia.

## 5. Mouvement
- Courbes : `--ease-out: cubic-bezier(0.23,1,0.32,1)` ; `--ease-io: cubic-bezier(0.77,0,0.175,1)`.
- **Entrée du hero** (une fois) : image fondu + dézoom 1.04 → 1 (1 100 ms) ; H1 fondu + montée 28 px à 150 ms (700 ms) ; paragraphe 14 px à 280 ms ; boutons 10 px à 360 ms ; label fondu à 200 ms ; carte « Dernier projet » 12 px à 600 ms.
- **Pages intérieures** : H1 fondu + montée 24 px ; grande image des pages projet en dézoom.
- **Au scroll** : titres h2, images, nuanciers apparaissent (fondu + 24 px) via `animation-timeline: view()` en CSS (rien si non supporté) ; pas de bibliothèque nécessaire.
- **Interactions** : boutons `scale(0.97)` à l'appui (160 ms) et éclaircissement au survol ; zoom image 1.03 au survol ; survols uniquement sous `@media (hover: hover) and (pointer: fine)`.
- **`prefers-reduced-motion: reduce`** : tout devient de simples fondus, bandeau clients statique.
- Supprimer `AnimatedCounter`, `CreativeBackground`, le marquee d'outils.

## 6. Mobile et accessibilité
- `-webkit-tap-highlight-color: transparent`, `touch-action: manipulation` sur liens et boutons, `user-select: none` sur les contrôles.
- Champs de formulaire ≥ 16 px (pas de zoom iOS). Zones tactiles ≥ 44 px.
- Viewport : `width=device-width, initial-scale=1, viewport-fit=cover` ; `theme-color` `#0F0D0C`.
- Contraste AA, focus visible (`outline: 2px solid #AD96FF`), `aria-label` sur les boutons-icônes, vrais `<a href>` pour la navigation, alt descriptifs.
- Tester à 320, 390, 768, 1440 px : aucun débordement horizontal.

## 7. Performance et SEO
- Images en WebP/AVIF, dimensionnées (fichiers optimisés fournis dans `assets/images/`), `width`/`height` déclarés, `loading="lazy"` sous la ligne de flottaison, logo en SVG si fourni.
- Par page : `<title>` unique (« Morwen Automobile — Identité de marque · ARIS ID Studio »), meta description, Open Graph (image + titre + description).
- `robots.txt`, `sitemap.xml`, page 404 aux couleurs du studio.

## 8. Encore à fournir par Lutécia
- Teinte exacte du violet (charte) · délai de réponse affiché · fourchettes de budget · visuel UI/UX · photo de shooting · confirmation que la montre est un visuel IA · logos clients en blanc (optionnel, pour le bandeau) · logo ARIS ID en SVG.
