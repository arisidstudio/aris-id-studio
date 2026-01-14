import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Menu, X, ArrowRight, Instagram, Linkedin, Facebook, 
  ChevronDown, Check, ArrowLeft, Diamond, Zap, Eye, 
  Star, Briefcase, GraduationCap, ChevronLeft, ChevronRight, Maximize2 
} from 'lucide-react';

/* --- 1. HOOKS & UTILS --- */

const useOnScreen = (ref, rootMargin = "0px") => {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin, threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, rootMargin]);
  return isIntersecting;
};

const RevealOnScroll = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isVisible = useOnScreen(ref);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-500 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {children}
    </div>
  );
};

const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isVisible = useOnScreen(ref);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      let start = 0;
      const endValue = parseInt(end.toString().replace(/\D/g, ''), 10);
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        setCount(Math.floor(ease * endValue));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
            setCount(endValue);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isVisible, end, duration]);

  const displayValue = end.toString().includes('+') ? `+${count}${suffix}` : `${count}${suffix}`;

  return <span ref={ref}>{displayValue}</span>;
};

/* --- 2. DONNÉES (DATA) --- */

const SERVICES = [
  {
    title: "Branding & Identité",
    desc: "Création de logotypes, chartes graphiques et univers de marque cohérents qui marquent les esprits.",
    tags: ["Logo", "Charte", "Stratégie"]
  },
  {
    title: "UI/UX Design",
    desc: "Conception d'interfaces intuitives et esthétiques pour applications web et mobiles, axées sur l'expérience utilisateur.",
    tags: ["Maquettes", "Prototypage", "Audit"]
  },
  {
    title: "Site Web No-Code",
    desc: "Développement rapide et performant de sites vitrines et portfolios via Webflow ou Framer.",
    tags: ["Gemini Ai", "Wix", "Webflow"]
  },
  {
    title: "Design Sportif",
    desc: "Création visuelle dynamique pour clubs, athlètes et événements sportifs. Match day, affiches, maillots.",
    tags: ["Social Media", "Merch", "Event"]
  },
  {
    title: "Cover Design",
    desc: "Direction artistique pour albums et singles. Traduire la musique en image.",
    tags: ["Musique", "Artwork", "Promo"]
  },
  {
    title: "Shooting Produit (IA)",
    desc: "Génération de visuels produits ultra-réalistes et créatifs grâce à l'intelligence artificielle.",
    tags: ["IA", "Packshot", "Artistique"]
  }
];

const OFFERS_DATA = {
  social: [
    {
      title: "PETIT DÉPART",
      price: "90€",
      features: ["Call découverte 30 min", "3 affiches Réseaux Sociaux", "1 déclinaison par affiche"],
      color: "border-white/10"
    },
    {
      title: "COUP DE PROJECTEUR",
      price: "160€",
      features: ["Call découverte 30 min", "6 affiches Réseaux Sociaux", "2 déclinaisons par affiche", "Mini coaching pour RS"],
      isPopular: true,
      color: "border-purple-500/50"
    },
    {
      title: "TOUT EN LUMIÈRE",
      price: "250€",
      features: ["Call découverte 30 min", "10 affiches Réseaux Sociaux", "2 déclinaisons par affiche", "1h de coaching pour RS"],
      color: "border-white/10"
    }
  ],
  branding: [
    {
      title: "VITE FAIT & BIEN FAIT",
      price: "250€",
      features: ["Rendez-vous découverte (1h)", "Création de votre logo (unique)", "2 versions du logo", "Mini guide pratique"],
      color: "border-white/10"
    },
    {
      title: "BIEN DANS SES BOTTES",
      price: "450€",
      features: ["Tout le contenu de l'Offre 1", "3 templates personnalisés", "1h30 de coaching personnalisé", "Conseils pratiques impactants"],
      isPopular: true,
      color: "border-purple-500/50"
    },
    {
      title: "LES CLÉS EN MAIN",
      price: "900€",
      features: ["Tout le contenu des Offres 1 & 2", "2h de coaching stratégique", "Charte graphique complète", "10 templates personnalisés", "Support conseil 1 mois"],
      color: "border-white/10"
    }
  ]
};

const CREATIVE_ARSENAL = [
  "Photoshop", "Illustrator", "CapCut", "Canva", "Figma", 
  "Whiskai", "Veo3", "NanoBanana", "Gemini Ai", "Replicate"
];

const RESUME_DATA = {
  experience: [
    {
      role: "Service Civique",
      company: "Association G-ADDICTION",
      period: "Nov 2025 - Aujourd'hui",
      location: "Nice, France",
      desc: "Communication interne, mobilisation des membres, conception de supports visuels (flyers) pour la prévention et animation d'escape games pédagogiques."
    },
    {
      role: "Graphiste",
      company: "MIX & LIGHT ML KIDS",
      period: "Mars 2025 - Août 2025",
      location: "Nice, France",
      desc: "Création de contenus éditoriaux et visuels, participation à la direction artistique social media et contribution à la stratégie digitale de l'agence."
    },
    {
      role: "Graphiste",
      company: "KAWERU GROUP",
      period: "Août 2022 - Août 2023",
      location: "Cotonou, Bénin",
      desc: "Conception de supports print/digitaux, développement d'identités visuelles et gestion de l'image de marque."
    },
    {
      role: "Graphiste",
      company: "WEBDIXIT",
      period: "Mars 2022 - Avril 2022",
      location: "Cotonou, Bénin",
      desc: "Production de visuels social media engageants et création de contenus multimédias promotionnels."
    }
  ],
  education: [
    {
      degree: "Ms 2 Communication Digitale & E-Influence",
      school: "Digital College",
      period: "2024 - 2026",
      location: "Nice, France"
    },
    {
      degree: "Licence Information & Communication",
      school: "Carlone",
      period: "2023 - 2024",
      location: "Nice, France"
    },
    {
      degree: "Licence Communication Digitale & Webmarketing",
      school: "PIGIER",
      period: "2019 - 2022",
      location: "Cotonou, Bénin"
    }
  ],
  skills: ["Illustrator", "Photoshop", "InDesign", "Figma", "Premiere Pro", "CapCut", "Outils IA (Flux, Replicate)"],
  softSkills: ["Adaptabilité", "Créativité forte", "Rigueur", "Autonomie", "Curiosité"]
};

const TESTIMONIALS = [
  {
    id: 1,
    name: "Thomas R.",
    role: "CEO, TechStart",
    text: "Une vision incroyable. Lutécia a su capter l'essence de notre technologie pour en faire une marque forte.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Sophie M.",
    role: "Fondatrice, EcoLife",
    text: "Plus qu'un design, c'est une véritable stratégie. Le site web a doublé mes conversions en un mois.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Marc D.",
    role: "Directeur, SportEvent",
    text: "Réactivité et créativité au top. L'identité visuelle de notre marathon a fait l'unanimité.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Elise B.",
    role: "Artiste, MusicLabel",
    text: "Les covers sont magnifiques. Elles racontent exactement l'histoire de chaque morceau. Merci !",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
  }
];

const CLIENTS = ["CoinCoquin", "Mixandlight", "Tic&Tac", "Mlkids", "Thalaïna Com", "Spicy 20's", "Midal's Juice", "Cherry Cherie"];

const PROJECTS = [
  {
    id: 1,
    title: "Spicy 20's",
    category: "Branding / Direction Artistique",
    image: "/ICONE_SPICY.jpg",
    year: "2025",
    role: "Direction Artistique & Brand design",
    description: "Spicy 20’s est le concept d’un podcast imaginé comme un miroir brut et authentique de la vingtaine. Entre journal intime, manifeste générationnel et safe space sans filtre, ce projet questionne l’identité, la liberté, les émotions intenses et les paradoxes d’une décennie qui façonne. L'objectif du projet est de créer une identité visuelle forte et distinctive pour un podcast qui parle vrai, qui bouscule et qui résonne avec les jeunes adultes. Le défi ici est de concevoir un univers visuel à la fois intime, audacieux et affirmé, capable de vivre sur tous les supports de communication d’un podcast (cover, réseaux, motion, print). Il m’a permis d’oser plus, de sortir des codes commerciaux, et de parler avec mes tripes. Chaque affiche est une émotion, un cri ou une réflexion habillée de formes et de mots",
    content: [
      { type: 'image', url: 'SPICY-LOGO.jpg' },
      { type: 'image', url: 'ICONE_SPICY.jpg' },
      { type: 'image', url: 'BG-SPICY 1.jpg' },
      { type: 'image', url: 'BG-SPICY 2.jpg' },
      { type: 'image', url: 'BG-SPICY 3.jpg' },
      { type: 'image', url: 'Spicy Sticker Mockup 2.jpg' },
      { type: 'image', url: 'Spicy Sticker Mockup.jpg' },
      { type: 'image', url: 'Spicy-Bottle.jpg' },
      { type: 'image', url: 'Spicy-Bottle_2.jpg' },
      { type: 'image', url: 'Spicy-Cup.jpg' },
      { type: 'image', url: 'Spicy-Cup_2.jpg' },
      { type: 'image', url: 'Spicy-Notebook.jpg' },
      { type: 'image', url: 'Spicy-Notebook-2.jpg' },
      { type: 'image', url: 'Spicy-Tee-shirt.jpg' },
      { type: 'image', url: 'Spicy-Tee-shirt_2.jpg' },
      { type: 'image', url: 'Spicy-Tot Bag.jpg' },
      { type: 'image', url: 'Spicy-Tot Bag-2.jpg' }
    ]
  },
  {
    id: 2,
    title: "Football cover",
    category: "Design Sportif",
    image: "/Foot-design-1.jpg",
    year: "2025",
    role: "Design d’affiches sportives",
    description: "Ce projet explore le football comme un terrain d’expression visuelle et émotionnelle, au-delà du simple résultat sportif. Chaque visuel est pensé comme une affiche iconique, mettant en scène des joueurs majeurs du football contemporain à travers une direction artistique forte, immersive et assumée. L’objectif est de transformer le joueur en symbole : une figure de puissance, de jeunesse, de tension et d’explosivité. Les compositions jouent avec la couleur, la typographie, la superposition d’images et les textures graphiques pour créer des visuels percutants, immédiatement identifiables et conçus pour capter l’attention sur tous les supports digitaux et print. Le défi de ce projet réside dans l’équilibre entre performance sportive et narration visuelle. Chaque affiche raconte un moment, une attitude ou une énergie propre au joueur représenté, tout en respectant l’identité du club et l’univers du football moderne. Ce travail m’a permis d’affirmer un langage graphique orienté sport, d’expérimenter des compositions audacieuses et de concevoir des visuels pensés comme des objets de communication à forte valeur émotionnelle.",
    content: [
      { type: 'image', url: 'Foot-design-1.jpg' },
      { type: 'image', url: 'Foot-design-2.jpg' },
      { type: 'image', url: 'Foot-design-3.jpg' },
      { type: 'image', url: 'Foot-design-4.jpg' },
      { type: 'image', url: 'Foot-design-5.jpg' },
      { type: 'image', url: 'Foot-design-6.jpg' }
    ]
  },
  {
    id: 3,
    title: "Tic&Tac",
    category: "Branding",
    image: "/Tic-tac-logo-1.jpg",
    year: "2025",
    role: "Direction artistique & Brand designer",
    description: "Tic&Tac est un duo créatif formé pour rendre le design plus accessible, plus fun et plus impactant. Ce projet de branding vise à capturer l’essence de cette complicité créative à travers une identité visuelle pétillante, jeune et mémorable. L'objectif du projet est de concevoir une identité visuelle complète pour une micro-agence créative, incarnant l’esprit de collaboration, d’énergie positive et de vision partagée. Créer un univers graphique cohérent, adaptable sur tous supports : digital, print, social media, goodies. Ce projet m’a permis de développer ma capacité à créer une marque à deux voix, en traduisant visuellement une énergie partagée et une synergie créative.",
    content: [
      { type: 'image', url: 'Tic-tac-logo-1.jpg' },
      { type: 'image', url: 'Tic-tac-logo-papier.jpg' },
      { type: 'image', url: 'Tic-tac-logo-2.jpg' },
      { type: 'image', url: 'Tic-tac-BG.jpg' },
      { type: 'image', url: 'Tic-tac-BG-2.jpg' },
      { type: 'image', url: 'Tic-tac-couleur.jpg' },
      { type: 'image', url: 'Tic-tac-couverture-linkedin.jpg' },
      { type: 'image', url: 'Tic-tac-cv-1.jpg' },
      { type: 'image', url: 'Tic-tac-cv-2.jpg' },
      { type: 'image', url: 'Tic-tac-façade.jpg' },
      { type: 'image', url: 'Tic-tac-motifs.jpg' },
      { type: 'image', url: 'Tic-tac-papier.jpg' },
      { type: 'image', url: 'Tic-tac-post-1.jpg' },
      { type: 'image', url: 'Tic-tac-post-2.jpg' },
      { type: 'image', url: 'Tic-tac-slogan.jpg' },
      { type: 'image', url: 'Tic-tac-story-design.png' },
      { type: 'image', url: 'Tic-tac-temoignage.jpg' },
      { type: 'image', url: 'Tic-tac-typo.jpg' }
    ]
  },
  {
    id: 4,
    title: "The Morning Party",
    category: "Direction Artistique expressive avec un style plus punchy",
    image: "/TMP-logo-mockup.jpg",
    year: "2025",
    role: "Brand designer & DA",
    description: "Une identité visuelle vibrante imaginée pour une soirée alliant ambiance matinale, musique électro et culture urbaine. L’objectif est de capter l’énergie de l’aube et la traduire graphiquement en un univers frais, festif et visuellement marquant. Mon objectif pour ce projet, est de créer une direction artistique forte et cohérente pour un événement alternatif, avec une charte visuelle capable de se décliner sur affiches, réseaux sociaux, merchandising et habillages numériques. Ce projet m’a permis d’expérimenter une DA expressive et d’assumer un style plus punchy. Il reflète ma capacité à créer un univers fort autour d’un concept simple.",
    content: [
      { type: 'image', url: 'TMP-logo-1.jpg' },
      { type: 'image', url: 'TMP-logo-mockup.jpg' },
      { type: 'image', url: 'TMP-logo-2.jpg' },
      { type: 'image', url: 'TMP-logo-3.jpg' },
      { type: 'image', url: 'TMP-post-1.jpg' },
      { type: 'image', url: 'TMP-post-2.jpg' },
      { type: 'image', url: 'TMP-goodies-1.jpg' },
      { type: 'image', url: 'TMP-goodies-2.jpg' },
      { type: 'image', url: 'TMP-goodies-3.jpg' },
      { type: 'image', url: 'TMP-goodies-4.jpg' },
      { type: 'image', url: 'TMP-goodies-5.jpg' },
      { type: 'image', url: 'TMP-goodies-6.jpg' },
      { type: 'image', url: 'TMP-goodies-7.jpg' },
      { type: 'image', url: 'TMP-goodies-8.jpg' }

    ]
  },
  {
    id: 5,
    title: "Cherry Cherie",
    category: "Identité visuel & App",
    image: "/CC-logo.jpg",
    year: "2025",
    role: "Brand Designer",
    description: "Cherry Chérie est une application pensée pour accompagner les femmes dans leur cycle menstruel avec douceur, fun et sororité. Ce projet mêle gamification, self-care et design émotionnel, au service d’une expérience bien-être libératrice, éducative et stylée. L'objectif du projet, c'est de créer une identité visuelle complète pour une appli bien-être dédiée au suivi du cycle menstruel, à la santé intime et à l’écoute de soi. L’enjeu , construire un univers rassurant mais moderne, frais sans être enfantin, et suffisamment modulable pour une appli mobile + une marque lifestyle forte. Il m’a permis d’explorer un branding au croisement de la tech féminine et du bien-être intime, avec une vraie attention portée à l’expérience émotionnelle des utilisatrices.",
    content: [
      { type: 'image', url: 'CC-logo.jpg' },
      { type: 'image', url: 'CC-pres-logo.jpg' },
      { type: 'image', url: 'CC-pres-logo-2.jpg' },
      { type: 'image', url: 'CC-couleurs.jpg' },
      { type: 'image', url: 'CC-typos.jpg' },
      { type: 'image', url: 'CC-icone.jpg' },
      { type: 'image', url: 'CC-favicon.jpg' },
      { type: 'image', url: 'CC-post-1.jpg' },
      { type: 'image', url: 'CC-post-2.jpg' },
    ]
  },
  {
    id: 6,
    title: "Shooting Produit",
    category: "Shooting IA",
    image: "/Montre-1.jpg",
    year: "2025",
    role: "Direction Artistique & product design",
    description: "Ce projet est un shooting produit imaginé autour d’une montre connectée, pensé comme un objet de design et non comme un simple produit technologique. L’objectif est de sublimer l’objet à travers des mises en scène élégantes et immersives, en jouant avec la lumière, les textures et les matières. Le travail repose sur une approche visuelle premium, mêlant minimalisme, inspirations naturelles et ambiance luxueuse. Chaque image met en valeur les lignes, les finitions et l’identité du produit, tout en créant une atmosphère forte et émotionnelle. Ce projet illustre ma capacité à concevoir des shootings produits cohérents, à construire une narration visuelle autour d’un objet et à produire des visuels adaptés aux supports digitaux et publicitaires.",
    content: [
      { type: 'image', url: 'Montre-1.jpg' },
      { type: 'image', url: 'Montre-2.jpg' },
      { type: 'image', url: 'Montre-3.jpg' },
      { type: 'image', url: 'Montre-pres-1.jpg' },
      { type: 'image', url: 'Montre-pres-2.jpg' },
      { type: 'image', url: 'Montre-pres-3.jpg' },
      { type: 'image', url: 'Montre-pres-4.jpg' },
    ]
  }
];

const PROCESS_STEPS = [
  { 
    num: "A", 
    title: "Ancrer", 
    desc: "Ancrer le projet dans un cadre clair et légitime. Je définis les fondations pour une identité durable." 
  },
  { 
    num: "R", 
    title: "Régler", 
    desc: "Régler finement la forme. Grilles, typographie, rythme : j'ajuste chaque détail pour une harmonie parfaite." 
  },
  { 
    num: "I", 
    title: "Identifier", 
    desc: "Identifier ce qui rend la marque reconnaissable. J'isole votre singularité pour la rendre inoubliable." 
  },
  { 
    num: "S", 
    title: "Simplifier", 
    desc: "Simplifier pour éliminer le bruit. Je stabilise l'identité en ne gardant que l'essentiel et l'impactant." 
  }
];

/* --- 3. COMPOSANTS DE STRUCTURE UI --- */

const Button = ({ children, variant = "primary", onClick, className = "" }) => {
  const baseStyle = "px-8 py-4 rounded-full font-medium tracking-wide transition-all duration-300 transform hover:scale-105 flex items-center gap-2 backdrop-blur-md";
  const variants = {
    primary: "bg-white/10 border border-white/20 text-white hover:bg-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
    outline: "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/30 hover:text-purple-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]",
    accent: "bg-purple-600/30 border border-purple-500/50 text-white hover:bg-purple-600/50 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)]"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const CreativeBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none select-none bg-black z-0">
    <style dangerouslySetInnerHTML={{__html: `
      @keyframes blob-bounce {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
      }
      @keyframes blob-pulse {
        0%, 100% { transform: scale(1); opacity: 0.4; }
        50% { transform: scale(1.2); opacity: 0.7; }
      }
      @keyframes gradient-rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee {
        animation: marquee 30s linear infinite;
      }
      .animate-marquee:hover {
        animation-play-state: paused;
      }
    `}} />
    
    {/* GRILLE */}
    <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]"></div>

    {/* TEXTURE GRAIN */}
    <div className="absolute inset-0 opacity-[0.15] z-20 mix-blend-overlay" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
    }}></div>

    {/* FORMES FLOTTANTES */}
    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/40 blur-[100px] animate-[blob-bounce_20s_infinite_ease-in-out] mix-blend-screen"></div>
    <div className="absolute top-[40%] right-[-10%] w-[40%] h-[60%] rounded-full bg-indigo-500/30 blur-[80px] animate-[blob-bounce_25s_infinite_reverse_ease-in-out] mix-blend-screen"></div>
    <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-blue-600/30 blur-[100px] animate-[blob-pulse_15s_infinite_ease-in-out] mix-blend-screen"></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%) z-0 pointer-events-none"></div>
  </div>
);

const Navigation = ({ currentPage, setCurrentPage, onLogoClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: "Accueil", page: "home" },
    { name: "Projets", page: "portfolio" },
    { name: "Services", page: "services" },
    { name: "Offres", page: "offers" },
    { name: "Parcours", page: "resume" },
    { name: "À Propos", page: "about" },
    { name: "Contact", page: "contact" }
  ];

  const handleNav = (page) => {
    setCurrentPage(page);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/50 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* LOGO ANIMÉ - CINEMATIC REVEAL */}
        <div 
          onClick={onLogoClick} 
          className="cursor-pointer group flex items-center"
        >
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes cinematic-reveal {
                0% { opacity: 0; filter: blur(10px); transform: translateY(10px); }
                100% { opacity: 1; filter: blur(0); transform: translateY(0); }
            }
          `}} />
          <div className="animate-[cinematic-reveal_1.5s_ease-out_forwards]">
            <img src="/LOGO ARISID STUDIO Blanc.png" alt="Logo Agence" className="h-16 md:h-24 w-auto object-contain" />
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNav(link.page)}
              className={`text-sm tracking-widest uppercase transition-colors hover:text-purple-400 ${
                currentPage === link.page ? 'text-purple-500 font-semibold' : 'text-neutral-400'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full h-screen bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 pb-32 animate-in slide-in-from-top-10 duration-300 z-50">
          <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-white p-2">
            <X size={24} />
          </button>
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNav(link.page)}
              className="text-2xl font-light text-white hover:text-purple-500 transition-colors"
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

const Footer = ({ setCurrentPage }) => (
  <footer className="bg-black/30 backdrop-blur-md pt-20 pb-10 border-t border-white/10 relative z-10">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
      <div className="col-span-1 md:col-span-2">
        <div 
          onClick={() => {
            setCurrentPage('home');
            window.scrollTo(0,0);
          }}
          className="cursor-pointer group inline-block mb-6"
        >
          <img src="/LOGO ARISID STUDIO Blanc.png" alt="Logo Agence" className="h-24 w-auto object-contain" />
        </div>

        <p className="text-neutral-400 max-w-sm mb-6 leading-relaxed text-sm">
          Je façonne des identités visuelles avec intention et précision. Pas de superflu, juste l'essentiel pour révéler votre histoire unique et pérenne.
        </p>
        <div className="flex space-x-4">
          <a 
            href="https://www.instagram.com/arisid_studio?igsh=ZTN6Mmllc3VkYXNq&utm_source=qr" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-purple-600 transition-colors"
          >
            <Instagram size={18} />
          </a>
          <a 
            href="https://www.linkedin.com/in/lut%C3%A9cia-rustico-011064213/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-purple-600 transition-colors"
          >
            <Linkedin size={18} />
          </a>
          <a 
            href="https://www.facebook.com/share/1AoGoDNwTp/?mibextid=wwXIfr" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-purple-600 transition-colors"
          >
            <Facebook size={18} />
          </a>
          </div>
      </div>
      
      <div>
        <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Navigation</h3>
        <ul className="space-y-4">
          {['Accueil', 'Projets', 'Services', 'Offres', 'Parcours', 'À Propos', 'Contact'].map((item, idx) => {
             const pages = ['home', 'portfolio', 'services', 'offers', 'resume', 'about', 'contact'];
             return (
              <li key={item}>
                <button 
                  onClick={() => {
                    setCurrentPage(pages[idx]);
                    window.scrollTo(0,0);
                  }} 
                  className="text-neutral-400 hover:text-white transition-colors text-sm"
                >
                  {item}
                </button>
              </li>
             );
          })}
        </ul>
      </div>

      <div>
        <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact</h3>
        <ul className="space-y-4 text-neutral-400 text-sm">
          <li><a href="mailto:helloarisidstudio@gmail.com" className="hover:text-purple-400 transition-colors">helloarisidstudio@gmail.com</a></li>
          <li><a href="tel:+33614132971" className="hover:text-purple-400 transition-colors">+33 6 14 13 29 71</a></li>
          <li>France</li>
        </ul>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-neutral-500 text-xs">
      <p>&copy; {new Date().getFullYear()} ARIS ID STUDIO. Tous droits réservés.</p>
      <div className="flex space-x-6 mt-4 md:mt-0">
        <button onClick={() => { setCurrentPage('legal'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">Mentions Légales & CGV</button>
      </div>
    </div>
  </footer>
);

/* --- 4. SECTIONS (HOMEPAGE COMPONENTS) --- */

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    };

    const getVisibleIndices = () => {
        const len = TESTIMONIALS.length;
        const left = (currentIndex - 1 + len) % len;
        const center = currentIndex;
        const right = (currentIndex + 1) % len;
        return [left, center, right];
    };

    const visibleIndices = getVisibleIndices();

    return (
        <section className="py-24 border-t border-white/10 overflow-hidden">
            <RevealOnScroll>
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-16 text-center uppercase">CE QU'ILS DISENT</h2>
            </RevealOnScroll>

            <div className="relative max-w-7xl mx-auto px-6 h-[500px] flex items-center justify-center">
                
                <button onClick={prev} className="absolute left-4 md:left-10 z-30 w-12 h-12 rounded-full border border-white/20 bg-black/50 flex items-center justify-center text-white hover:bg-purple-600 hover:border-purple-600 transition-all backdrop-blur-sm">
                    <ChevronLeft size={24} />
                </button>
                
                <button onClick={next} className="absolute right-4 md:right-10 z-30 w-12 h-12 rounded-full border border-white/20 bg-black/50 flex items-center justify-center text-white hover:bg-purple-600 hover:border-purple-600 transition-all backdrop-blur-sm">
                    <ChevronRight size={24} />
                </button>

                <div className="flex items-center justify-center w-full relative">
                    {visibleIndices.map((idx, position) => {
                        const item = TESTIMONIALS[idx];
                        const isCenter = position === 1; 
                        return (
                            <div 
                                key={`${item.id}-${idx}`} 
                                className={`absolute transition-all duration-700 ease-in-out px-4 ${isCenter ? 'z-20 opacity-100 scale-100 translate-x-0' : 'z-10 opacity-40 scale-75 cursor-pointer'} ${position === 0 ? '-translate-x-[60%] md:-translate-x-[350px]' : ''} ${position === 2 ? 'translate-x-[60%] md:translate-x-[350px]' : ''}`}
                                onClick={() => { if (position === 0) prev(); if (position === 2) next(); }}
                            >
                                <div className={`w-[300px] md:w-[400px] p-8 md:p-10 rounded-2xl backdrop-blur-md border transition-all duration-500 flex flex-col items-center text-center ${isCenter ? 'bg-white/10 border-purple-500/50 shadow-[0_0_50px_rgba(147,51,234,0.2)]' : 'bg-white/5 border-white/5 grayscale'}`}>
                                    <div className={`w-24 h-24 mb-6 relative rounded-full p-1 ${isCenter ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-white/10'}`}>
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-full border-4 border-black" />
                                    </div>
                                    <p className={`italic mb-6 leading-relaxed ${isCenter ? 'text-white text-lg' : 'text-neutral-500 text-sm'}`}>"{item.text}"</p>
                                    <div className="mt-auto">
                                        <h4 className={`font-bold uppercase tracking-wider ${isCenter ? 'text-white text-lg' : 'text-neutral-400 text-sm'}`}>{item.name}</h4>
                                        <span className={`text-xs ${isCenter ? 'text-purple-400' : 'text-neutral-600'}`}>{item.role}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

const ClientLogosSection = () => (
    <section className="py-24 border-t border-white/10 bg-black/30 backdrop-blur-md overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-neutral-500 tracking-[0.3em] uppercase">Ils m'ont fait confiance</h2>
        </div>
        <div className="relative w-full overflow-hidden">
            <div className="absolute top-0 left-0 w-20 md:w-32 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-20 md:w-32 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
            <div className="flex w-max animate-marquee">
                {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, index) => (
                    <div key={index} className="mx-12 md:mx-20 flex items-center justify-center group cursor-default">
                        <span className="text-4xl md:text-6xl font-bold text-neutral-500 group-hover:text-white transition-colors duration-500 font-sans tracking-tight select-none opacity-80 group-hover:opacity-100">{client}</span>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

/* --- 5. COMPOSANTS DE PAGES (DÉFINIS AVANT LEUR UTILISATION) --- */

const ProjectDetailPage = ({ project, onBack, onContactClick }) => {
    if (!project) return null;
    useEffect(() => { window.scrollTo(0, 0); }, [project]);

    const [selectedMedia, setSelectedMedia] = useState(null);

    // NOUVEAU : Bloquer le défilement de la page quand l'image est ouverte
    useEffect(() => {
        if (selectedMedia) {
            document.body.style.overflow = 'hidden'; // Bloque le scroll
        } else {
            document.body.style.overflow = 'unset'; // Réactive le scroll
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [selectedMedia]);

    // La fenêtre Lightbox "Téléportée" à la racine du site grâce au Portail
    const lightbox = selectedMedia && createPortal(
        <div 
            className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300"
            onClick={() => setSelectedMedia(null)}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }} // Force la position fixe
        >
            {/* Bouton Fermer */}
            <button 
                className="absolute top-6 right-6 text-white hover:text-purple-500 transition-colors p-2 bg-black/50 rounded-full border border-white/20 z-50 cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMedia(null);
                }}
            >
                <X size={32} />
            </button>
            
            <div className="max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
                {selectedMedia.type === 'video' ? (
                    <video 
                        src={selectedMedia.url} 
                        controls 
                        autoPlay 
                        className="max-w-full max-h-full object-contain rounded-sm shadow-2xl"
                    />
                ) : (
                    <img 
                        src={selectedMedia.url} 
                        alt="Aperçu grand format" 
                        className="max-w-full max-h-full object-contain rounded-sm shadow-2xl" 
                    />
                )}
            </div>
        </div>,
        document.body // C'est ici qu'on dit "Mets ça directement dans le corps du site", pas dans la section
    );

    return (
        <section className="pt-32 pb-20 min-h-screen relative z-10 bg-black/30 backdrop-blur-md">
            {/* On affiche le portail ici */}
            {lightbox}

            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-8">
                    <button onClick={onBack} className="flex items-center text-neutral-400 hover:text-white transition-colors group">
                        <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
                        Retour aux projets
                    </button>
                </div>
                <RevealOnScroll>
                    <div className="mb-12 border-b border-white/10 pb-12">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-6">
                            <div>
                                <span className="text-purple-400 text-sm font-bold tracking-[0.2em] uppercase mb-2 block">{project.category}</span>
                                <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter">{project.title}</h1>
                            </div>
                            <div className="text-neutral-400 font-mono text-xl border border-white/10 px-4 py-2 rounded-sm bg-black/30">{project.year}</div>
                        </div>
                        <div className="relative w-full aspect-video rounded-sm overflow-hidden shadow-2xl mt-8">
                             <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        </div>
                    </div>
                </RevealOnScroll>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
                    <RevealOnScroll delay={100}>
                        <div className="lg:col-span-2">
                            <h3 className="text-2xl font-bold text-white mb-6">De quoi s'agit-il ?</h3>
                            <p className="text-neutral-300 text-lg leading-relaxed font-light whitespace-pre-line text-justify">{project.description}</p>
                        </div>
                    </RevealOnScroll>
                    <RevealOnScroll delay={200}>
                        <div className="bg-white/5 p-8 rounded-sm border border-white/10 backdrop-blur-sm">
                            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-4 border-b border-white/10 pb-2">Mon Rôle</h4>
                            <p className="text-neutral-300 mb-8">{project.role}</p>
                            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-4 border-b border-white/10 pb-2">Client</h4>
                            <p className="text-neutral-300 mb-8">{project.title} Company</p>
                        </div>
                    </RevealOnScroll>
                </div>
                <RevealOnScroll>
                    <div className="bg-white/5 p-8 rounded-sm border border-white/10 backdrop-blur-sm">
                        <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Aperçu du projet</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {project.content && project.content.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="relative w-full aspect-square rounded-sm overflow-hidden shadow-xl group bg-neutral-900 border border-white/5 cursor-pointer"
                                    onClick={() => setSelectedMedia(item)}
                                >
                                    {/* Icône de zoom au survol */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                                        <Maximize2 className="text-white drop-shadow-lg" size={32} />
                                    </div>

                                    {item.type === 'video' ? (
                                        <video 
                                            src={item.url} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                            poster={item.thumbnail || ''}
                                            muted
                                            loop
                                            playsInline
                                            onMouseEnter={(e) => e.target.play()}
                                            onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                                        />
                                    ) : (
                                        <img 
                                            src={item.url} 
                                            alt={`${project.title} detail ${index + 1}`} 
                                            loading="lazy" 
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </RevealOnScroll>
                <div className="mt-24 text-center border-t border-white/10 pt-16">
                     <h3 className="text-2xl text-white mb-6">Ce projet vous inspire ?</h3>
                     <Button variant="accent" onClick={onContactClick}>Discutons de votre idée <ArrowRight size={20} /></Button>
                </div>
            </div>
        </section>
    );
};

const PortfolioPage = ({ onOpenProject }) => (
  <section className="pt-32 pb-20 min-h-screen relative z-10 bg-black/30 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-6">
      <RevealOnScroll>
        <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-8">PORTFOLIO</h1>
        <p className="text-neutral-400 max-w-xl text-lg mb-16">Une sélection de nos projets les plus marquants. Chaque création est une réponse unique à un défi précis.</p>
      </RevealOnScroll>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
        {PROJECTS.map((project, index) => (
          <RevealOnScroll key={project.id} delay={index * 100}>
            <div className="group cursor-pointer" onClick={() => onOpenProject(project)}>
              <div className="relative overflow-hidden rounded-sm mb-6 aspect-video md:aspect-[4/3] shadow-2xl">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500 z-10"></div>
                <img src={project.image} alt={project.title} loading="lazy" className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 text-xs text-white uppercase tracking-wider z-20 rounded-sm border border-white/10">{project.year}</div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">{project.title}</h3>
                  <p className="text-neutral-500 mt-1">{project.category}</p>
                </div>
                <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0 bg-white/5 hover:bg-purple-600 hover:border-purple-600"><ArrowRight size={16} /></span>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

const ServicesPage = () => (
  <section className="pt-32 pb-20 min-h-screen relative z-10 bg-black/30 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-6">
      <RevealOnScroll>
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8">NOS SERVICES</h1>
        <p className="text-neutral-400 max-w-2xl text-lg mb-20">De la conception de marque à l'expérience digitale, je vous accompagne sur l'ensemble de votre identité visuelle avec une approche premium.</p>
      </RevealOnScroll>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service, index) => (
          <RevealOnScroll key={index} delay={index * 50}>
             <div className="p-10 bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 backdrop-blur-md transition-all duration-500 group min-h-[300px] flex flex-col rounded-sm">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">{service.title}</h3>
                    <div className="w-12 h-1 bg-white/20 group-hover:bg-purple-500 transition-all duration-500"></div>
                </div>
                <p className="text-neutral-400 leading-relaxed mb-auto">{service.desc}</p>
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-2">
                    {service.tags.map(tag => (<span key={tag} className="text-xs text-neutral-400 border border-white/10 bg-black/30 px-3 py-1 rounded-full">{tag}</span>))}
                </div>
             </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

const ResumePage = () => (
  <section className="pt-32 pb-20 min-h-screen relative z-10 bg-black/30 backdrop-blur-md">
    <div className="max-w-6xl mx-auto px-6">
      <RevealOnScroll>
        <div className="text-center mb-16">
            <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-4">MON PARCOURS</h1>
            <p className="text-neutral-400 text-lg md:text-xl font-light max-w-2xl mx-auto">De la création graphique à la direction artistique, chaque étape a forgé ma vision.</p>
        </div>
      </RevealOnScroll>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        <div>
            <RevealOnScroll delay={100}>
                <div className="flex items-center gap-3 mb-8"><Briefcase className="text-purple-500" size={24} /><h2 className="text-2xl font-bold text-white uppercase tracking-wider">Expériences</h2></div>
                <div className="space-y-8 border-l border-white/10 pl-8 relative">
                    {RESUME_DATA.experience.map((exp, index) => (
                        <div key={index} className="relative group">
                            <div className="absolute -left-[37px] top-2 w-4 h-4 rounded-full bg-black border border-purple-500 group-hover:bg-purple-500 transition-colors"></div>
                            <div className="bg-white/5 p-6 rounded-sm border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300">
                                <div className="flex flex-col md:flex-row justify-between md:items-start mb-2">
                                    <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                                    <span className="text-purple-400 text-xs font-mono bg-purple-500/10 px-2 py-1 rounded-sm border border-purple-500/20">{exp.period}</span>
                                </div>
                                <div className="text-sm text-neutral-400 mb-4 font-medium uppercase tracking-wide">{exp.company} - {exp.location}</div>
                                <p className="text-neutral-300 text-sm leading-relaxed">{exp.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </RevealOnScroll>
        </div>
        <div>
            <RevealOnScroll delay={200}>
                <div className="flex items-center gap-3 mb-8"><GraduationCap className="text-purple-500" size={24} /><h2 className="text-2xl font-bold text-white uppercase tracking-wider">Formations</h2></div>
                <div className="space-y-8 border-l border-white/10 pl-8 relative">
                    {RESUME_DATA.education.map((edu, index) => (
                        <div key={index} className="relative group">
                            <div className="absolute -left-[37px] top-2 w-4 h-4 rounded-full bg-black border border-purple-500 group-hover:bg-purple-500 transition-colors"></div>
                            <div className="bg-white/5 p-6 rounded-sm border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300">
                                <div className="flex flex-col md:flex-row justify-between md:items-start mb-2">
                                    <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                                    <span className="text-purple-400 text-xs font-mono bg-purple-500/10 px-2 py-1 rounded-sm border border-purple-500/20">{edu.period}</span>
                                </div>
                                <div className="text-sm text-neutral-400 uppercase tracking-wide">{edu.school} - {edu.location}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </RevealOnScroll>
            <RevealOnScroll delay={300}>
                <div className="mt-16">
                    <div className="flex items-center gap-3 mb-8"><Star className="text-purple-500" size={24} /><h2 className="text-2xl font-bold text-white uppercase tracking-wider">Compétences</h2></div>
                    <div className="mb-8">
                        <h4 className="text-sm text-neutral-500 uppercase tracking-widest mb-4">Savoir-faire</h4>
                        <div className="flex flex-wrap gap-2">{RESUME_DATA.skills.map((skill, i) => (<span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-neutral-300 text-xs rounded-full hover:border-purple-500 transition-colors cursor-default">{skill}</span>))}</div>
                    </div>
                    <div>
                        <h4 className="text-sm text-neutral-500 uppercase tracking-widest mb-4">Savoir-être</h4>
                        <div className="flex flex-wrap gap-2">{RESUME_DATA.softSkills.map((skill, i) => (<span key={i} className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs rounded-full hover:bg-purple-500/20 transition-colors cursor-default">{skill}</span>))}</div>
                    </div>
                </div>
            </RevealOnScroll>
        </div>
      </div>
    </div>
  </section>
);

const OfferModal = ({ offer, onClose }) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Commande Offre : ${offer}`;
    const body = `Nom & Prénom: ${name}\nOffre choisie: ${offer}\n\nDescription du projet:\n${desc}`;
    // Envoi direct vers la nouvelle adresse demandée
    window.location.href = `mailto:helloarisidstudio@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#111] border border-white/10 p-8 rounded-sm max-w-lg w-full relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors">
          <X size={24} />
        </button>
        <h3 className="text-2xl font-bold text-white mb-2">Finaliser votre commande</h3>
        <p className="text-neutral-400 text-sm mb-8">Dites-moi en plus pour démarrer.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-neutral-500 font-bold">Offre choisie</label>
            <input type="text" value={offer} disabled className="w-full bg-white/5 border border-white/10 py-3 px-4 text-purple-400 font-bold cursor-not-allowed rounded-sm" />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-neutral-500 font-bold">Nom & Prénom <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              required 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors placeholder-neutral-600" 
              placeholder="Votre identité"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-neutral-500 font-bold">Description du projet <span className="text-red-500">*</span></label>
            <textarea 
              required 
              rows="4" 
              value={desc} 
              onChange={(e) => setDesc(e.target.value)} 
              className="w-full bg-black/20 border border-white/20 p-4 text-white focus:outline-none focus:border-purple-500 rounded-sm transition-colors placeholder-neutral-600 resize-none" 
              placeholder="Décrivez votre besoin..."
            ></textarea>
          </div>
          
          <Button variant="accent" className="w-full justify-center mt-6">Envoyer la demande <ArrowRight size={18} /></Button>
        </form>
      </div>
    </div>
  );
};
const OffersPage = () => {
  const [selectedOffer, setSelectedOffer] = useState(null);

  return (
  <section className="pt-32 pb-20 min-h-screen relative z-10 bg-black/30 backdrop-blur-md">
    {selectedOffer && <OfferModal offer={selectedOffer} onClose={() => setSelectedOffer(null)} />}

    <div className="max-w-7xl mx-auto px-6">
      <RevealOnScroll>
        <div className="text-center mb-16">
            <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-4">NOS OFFRES</h1>
            <p className="text-neutral-400 text-lg md:text-xl font-light max-w-2xl mx-auto">Des solutions sur-mesure conçues pour accompagner le lancement et la croissance des PME ambitieuses.</p>
        </div>
      </RevealOnScroll>
      <RevealOnScroll delay={100}>
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-white mb-10 border-l-4 border-purple-500 pl-4">Visuels Réseaux Sociaux</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {OFFERS_DATA.social.map((offer, index) => (
              <div key={index} className={`bg-white/5 p-8 rounded-sm border ${offer.color} backdrop-blur-sm flex flex-col justify-between hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02] shadow-2xl relative`}>
                {offer.isPopular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">Recommandé</div>}
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">{offer.title}</h3>
                  <div className="text-4xl font-bold text-white mb-8">{offer.price}</div>
                  <ul className="space-y-4 mb-8">{offer.features.map((feat, idx) => (<li key={idx} className="flex items-start text-neutral-300 text-sm"><Check className="text-purple-500 mr-3 shrink-0" size={18} />{feat}</li>))}</ul>
                </div>
                <button 
                    onClick={() => setSelectedOffer(offer.title)}
                    className="w-full block text-center bg-white/10 border border-white/20 text-white py-3 rounded-full hover:bg-purple-600 hover:border-purple-600 transition-all text-sm font-bold uppercase tracking-wider"
                >
                    Choisir cette offre
                </button>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>
      <RevealOnScroll delay={200}>
        <div>
          <h2 className="text-3xl font-bold text-white mb-10 border-l-4 border-purple-500 pl-4">Identité Visuelle & Branding</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {OFFERS_DATA.branding.map((offer, index) => (
              <div key={index} className={`bg-white/5 p-8 rounded-sm border ${offer.color} backdrop-blur-sm flex flex-col justify-between hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02] shadow-2xl relative`}>
                {offer.isPopular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">Recommandé</div>}
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">{offer.title}</h3>
                  <div className="text-4xl font-bold text-white mb-8">{offer.price}</div>
                  <ul className="space-y-4 mb-8">{offer.features.map((feat, idx) => (<li key={idx} className="flex items-start text-neutral-300 text-sm"><Check className="text-purple-500 mr-3 shrink-0" size={18} />{feat}</li>))}</ul>
                </div>
                <button 
                    onClick={() => setSelectedOffer(offer.title)}
                    className="w-full block text-center bg-white/10 border border-white/20 text-white py-3 rounded-full hover:bg-purple-600 hover:border-purple-600 transition-all text-sm font-bold uppercase tracking-wider"
                >
                    Choisir cette offre
                </button>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </div>
  </section>
  );
};

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', type: '', customType: '', budget: '', deadline: '', message: '' });
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        const finalProjectType = formData.type === 'Autre' ? formData.customType : formData.type;
        const subject = `Nouvelle demande de projet : ${finalProjectType}`;
        const body = `Nom: ${formData.name}\nEntreprise: ${formData.company}\nEmail: ${formData.email}\nTéléphone: ${formData.phone}\nBudget: ${formData.budget}\nDélai: ${formData.deadline}\n\nMessage:\n${formData.message}`;
        window.location.href = `mailto:helloarisidstudio@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
    <section className="pt-32 pb-20 min-h-screen relative z-10 bg-black/30 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6">
            <RevealOnScroll><h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4 text-center">DÉMARRER UN PROJET</h1><p className="text-neutral-400 text-center mb-16">Parlez-nous de vos ambitions.</p></RevealOnScroll>
            <RevealOnScroll delay={100}>
                <form onSubmit={handleSubmit} className="space-y-8 bg-white/5 p-8 md:p-12 border border-white/10 rounded-sm backdrop-blur-md shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-neutral-500 font-bold">Nom Complet <span className="text-red-500">*</span></label>
                            <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-purple-500" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-neutral-500 font-bold">Entreprise <span className="text-red-500">*</span></label>
                            <input type="text" name="company" required value={formData.company} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-purple-500" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-neutral-500 font-bold">Email <span className="text-red-500">*</span></label>
                            <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-purple-500" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-neutral-500 font-bold">Téléphone <span className="text-red-500">*</span></label>
                            <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-purple-500" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-neutral-500 font-bold">Projet <span className="text-red-500">*</span></label>
                        <select name="type" required value={formData.type} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-purple-500 [&>option]:bg-neutral-900">
                            <option value="" disabled>Sélectionnez un type</option>
                            <option value="Branding">Branding</option>
                            <option value="UI/UX">UI/UX</option>
                            <option value="Web">Web</option>
                            <option value="Autre">Autre</option>
                        </select>
                    </div>
                    {formData.type === 'Autre' && (
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-neutral-500 font-bold text-purple-400">Précisez <span className="text-red-500">*</span></label>
                            <input type="text" name="customType" required value={formData.customType} onChange={handleChange} className="w-full bg-transparent border-b border-purple-500 py-3 text-white focus:outline-none" />
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-neutral-500 font-bold">Budget <span className="text-red-500">*</span></label>
                            <input type="text" name="budget" required value={formData.budget} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-purple-500" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-neutral-500 font-bold">Délai <span className="text-red-500">*</span></label>
                            <input type="text" name="deadline" required value={formData.deadline} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-purple-500" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-neutral-500 font-bold">Description <span className="text-red-500">*</span></label>
                        <textarea name="message" required rows="5" value={formData.message} onChange={handleChange} className="w-full bg-black/40 border border-white/10 p-4 text-white focus:outline-none focus:border-purple-500 resize-none rounded-sm"></textarea>
                    </div>
                    <div className="pt-4 text-center md:text-left"><Button variant="accent" className="w-full md:w-auto justify-center">Envoyer la demande</Button></div>
                </form>
            </RevealOnScroll>
            <div className="mt-12 text-center border-t border-white/10 pt-8"><p className="text-neutral-500 text-sm">Ou contactez-moi : <a href="mailto:helloarisidstudio@gmail.com" className="text-white hover:text-purple-400">helloarisidstudio@gmail.com</a></p></div>
        </div>
    </section>
    );
};

const AboutPage = () => (
  <section className="pt-32 pb-20 min-h-screen relative z-10 bg-black/30 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-6">
      <RevealOnScroll><h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-20 text-center">LE STUDIO</h1></RevealOnScroll>
      <div className="relative mb-32">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/50 to-transparent hidden lg:block transform -translate-x-1/2"></div>
        <div className="max-w-4xl mx-auto relative z-10 bg-black/40 border border-white/5 backdrop-blur-md p-10 md:p-16 rounded-sm shadow-2xl">
            <RevealOnScroll delay={100}>
                <div className="text-lg md:text-xl text-neutral-300 leading-loose font-light space-y-8 text-justify">
                    <p><span className="text-white font-medium">ARIS ID</span> est né d’une conviction simple : une identité juste ne se crée pas dans l’urgence.</p>
                    <p>J'incarne une manière de travailler fondée sur la structure invisible du design.</p>
                    <div className="border-l-2 border-purple-500 pl-6 py-2 my-8 italic text-neutral-400">"Ici, la création n’est jamais décorative. Elle est ancrée, réglée, pensée."</div>
                </div>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
                    <div className="bg-white/5 p-6 rounded-sm border border-white/5 text-center group hover:bg-white/10 transition-colors">
                        <div className="flex justify-center mb-4 text-purple-500 group-hover:scale-110 transition-transform"><Diamond size={28} strokeWidth={1.5} /></div>
                        <h3 className="text-white font-bold uppercase tracking-wider mb-2">Excellence</h3>
                        <p className="text-xs text-neutral-400 leading-relaxed">Chaque détail compte.</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-sm border border-white/5 text-center group hover:bg-white/10 transition-colors">
                        <div className="flex justify-center mb-4 text-purple-500 group-hover:scale-110 transition-transform"><Zap size={28} strokeWidth={1.5} /></div>
                        <h3 className="text-white font-bold uppercase tracking-wider mb-2">Audace</h3>
                        <p className="text-xs text-neutral-400 leading-relaxed">Oser sortir des codes.</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-sm border border-white/5 text-center group hover:bg-white/10 transition-colors">
                        <div className="flex justify-center mb-4 text-purple-500 group-hover:scale-110 transition-transform"><Eye size={28} strokeWidth={1.5} /></div>
                        <h3 className="text-white font-bold uppercase tracking-wider mb-2">Transparence</h3>
                        <p className="text-xs text-neutral-400 leading-relaxed">Communication claire.</p>
                    </div>
                </div>
            </RevealOnScroll>
            <RevealOnScroll delay={300}>
                <div className="mt-16 pt-10 border-t border-white/10 text-center">
                    <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight leading-tight">Je ne crée pas de logos. <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white">Je crée une histoire autour de votre marque !</span></h3>
                </div>
            </RevealOnScroll>
        </div>
      </div>
      <RevealOnScroll><h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-12 text-center uppercase">NOTRE PROCESSUS</h2></RevealOnScroll>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
        {PROCESS_STEPS.map((step, index) => (
            <RevealOnScroll key={index} delay={index * 100}>
                <div className="relative pt-8 p-6 hover:bg-white/5 transition-colors rounded-sm group overflow-hidden">
                    <span className="text-6xl font-bold text-white/10 absolute -top-2 left-4 z-0 opacity-50 select-none group-hover:text-purple-500/20 transition-colors">{step.num}</span>
                    <div className="relative z-10">
                        <h4 className="text-xl font-bold text-white mb-3 mt-6">{step.title}</h4>
                        <p className="text-neutral-400 text-sm">{step.desc}</p>
                    </div>
                </div>
            </RevealOnScroll>
        ))}
      </div>
      <TestimonialsSection /><ClientLogosSection />
    </div>
  </section>
);

const LegalPage = () => (
    <section className="pt-32 pb-20 min-h-screen relative z-10 bg-black/30 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 text-neutral-300">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">Mentions Légales & CGV</h1>
            
            <div className="space-y-16">
                {/* --- MENTIONS LÉGALES --- */}
                <div className="bg-white/5 p-8 rounded-sm border border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-8 uppercase tracking-wider border-b border-purple-500/50 pb-4 inline-block">1. Mentions Légales</h2>
                    
                    <div className="space-y-8 text-sm leading-relaxed">
                        <div>
                            <h3 className="text-white font-bold mb-2 text-lg">1.1 Éditeur du site</h3>
                            <p>Le site <strong>ARIS ID STUDIO</strong> est édité par <strong>Lutécia Rustico</strong>, Freelancer</p>
                            <ul className="mt-2 space-y-1 text-neutral-400">
                                <li><strong>Siège social :</strong> Nice, France</li>
                                <li><strong>Email :</strong> helloarisidstudio@gmail.com</li>
                                <li><strong>Téléphone :</strong> +33 6 14 13 29 71</li>
                                <li><strong>Directrice de la publication :</strong> Lutécia Rustico</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-bold mb-2 text-lg">1.2 Hébergement</h3>
                            <p>Ce site est hébergé par la société <strong>Vercel Inc.</strong></p>
                            <p className="text-neutral-400">Adresse : 340 S Lemon Ave #4133 Walnut, CA 91789, USA.</p>
                        </div>

                        <div>
                            <h3 className="text-white font-bold mb-2 text-lg">1.3 Propriété Intellectuelle</h3>
                            <p>
                                L'ensemble des éléments figurant sur ce site (images, textes, logos, charte graphique) est protégé par le droit d'auteur. 
                                Toute reproduction, modification ou diffusion, totale ou partielle, sans l'accord écrit préalable de l'éditeur est strictement interdite et constitue une contrefaçon sanctionnée par le Code de la propriété intellectuelle.
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- CGV --- */}
                <div className="bg-white/5 p-8 rounded-sm border border-white/10" id="cgv">
                    <h2 className="text-2xl font-bold text-white mb-8 uppercase tracking-wider border-b border-purple-500/50 pb-4 inline-block">2. Conditions Générales de Vente (CGV)</h2>
                    
                    <div className="space-y-8 text-sm leading-relaxed text-justify">
                        <div>
                            <h3 className="text-white font-bold mb-2 text-base text-purple-400">Article 1 : Objet et Champ d'application</h3>
                            <p>
                                Les présentes Conditions Générales de Vente régissent la relation contractuelle entre <strong>ARIS ID STUDIO</strong> (le Prestataire) et son Client. Elles s'appliquent à toutes les prestations de services proposées (création graphique, branding, web design, etc.). Toute commande implique l'adhésion sans réserve du Client aux présentes CGV.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-white font-bold mb-2 text-base text-purple-400">Article 2 : Devis et Commandes</h3>
                            <p>
                                Chaque projet fait l'objet d'un devis gratuit détaillant la nature de la prestation et le prix. La commande est considérée comme ferme et définitive dès réception du devis signé avec la mention "Bon pour accord", accompagné de l'acompte prévu (généralement 50%).
                            </p>
                        </div>

                        <div>
                            <h3 className="text-white font-bold mb-2 text-base text-purple-400">Article 3 : Tarifs et Paiement</h3>
                            <p>
                                Les prix sont indiqués en euros. Le paiement s'effectue par virement bancaire.
                                <br/>- Un acompte est exigé au démarrage du projet.
                                <br/>- Le solde est payable à la livraison des fichiers finaux ou à la mise en ligne du site.
                                <br/>En cas de retard de paiement, des pénalités seront appliquées conformément à la législation en vigueur.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-white font-bold mb-2 text-base text-purple-400">Article 4 : Modifications et Corrections</h3>
                            <p>
                                Le devis inclut un nombre défini d'allers-retours (modifications) spécifié pour chaque prestation. Toute demande de modification supplémentaire ou changement radical de direction artistique en cours de projet fera l'objet d'une facturation complémentaire.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-white font-bold mb-2 text-base text-purple-400">Article 5 : Livraison et Délais</h3>
                            <p>
                                Les délais de livraison sont donnés à titre indicatif lors du devis. Ils dépendent de la réactivité du Client à fournir les contenus (textes, images) nécessaires. ARIS ID STUDIO ne saurait être tenu responsable d'un retard dû à un manque de collaboration du Client.
                            </p>
                        </div>
                        
                        <div>
                            <h3 className="text-white font-bold mb-2 text-base text-purple-400">Article 6 : Cession des Droits</h3>
                            <p>
                                Le transfert des droits d'utilisation des créations ne devient effectif qu'après le paiement intégral de la facture. Les fichiers sources (fichiers de travail .ai, .psd, etc.) restent la propriété d'ARIS ID STUDIO sauf mention contraire explicite dans le devis.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-white font-bold mb-2 text-base text-purple-400">Article 7 : Droit de Rétractation</h3>
                            <p>
                                Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les contrats de fourniture de contenu numérique non fourni sur un support matériel dont l'exécution a commencé après accord préalable exprès du consommateur.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const HomePage = ({ setCurrentPage, onOpenProject }) => (
  <>
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="max-w-7xl mx-auto px-6 text-center z-10 relative">
        <RevealOnScroll delay={100}>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-white tracking-tighter mb-8 leading-[0.9]">
            CRÉÉ AVEC <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-600">INTENTION</span>.
          </h1>
        </RevealOnScroll>
        {/* Phrase en double supprimée ici */}
        <RevealOnScroll delay={300}>
          <div className="flex flex-col md:flex-row gap-6 justify-center mt-12">
            <Button variant="accent" onClick={() => setCurrentPage('offers')}>DÉCOUVRIR LES OFFRES <ArrowRight size={20} /></Button>
            <Button variant="outline" onClick={() => setCurrentPage('contact')}>Démarrer un projet</Button>
          </div>
        </RevealOnScroll>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-neutral-500 z-10"><ChevronDown size={24} /></div>
    </section>

    <section className="py-24 relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <RevealOnScroll>
            <div className="relative group">
              <div className="absolute inset-0 bg-purple-600/20 blur-[60px] rounded-full group-hover:bg-purple-600/30 transition-all duration-500"></div>
              <img src="/photo-profil-lutecia.png" alt="Lutécia Rustico" className="relative w-full max-w-md mx-auto object-cover rounded-2xl border border-white/10 shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500 grayscale hover:grayscale-0" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <div>
              <span className="text-purple-400 text-sm font-bold tracking-[0.2em] uppercase mb-4 block">La Créatrice</span>
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-6">LUTÉCIA <br />RUSTICO.</h2>
              <div className="space-y-6 text-neutral-300 text-lg leading-relaxed font-light">
                <p>Bienvenue chez <span className="text-white font-medium">ARIS ID STUDIO</span>.</p>
                <p>Je suis Lutécia, la force créative derrière chaque projet. Ma vision dépasse la simple esthétique : je cherche l'âme de votre marque pour la révéler au monde.</p>
                <p>Aujoud'hui, seules les histoires authentiques captent l'attention. Mon rôle est de sculpter la vôtre avec une précision stratégique et une élégance intemporelle. Ensemble, transformons votre vision en une empreinte visuelle inoubliable.</p>
              </div>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                 <Button variant="outline" onClick={() => setCurrentPage('about')}>Découvrir ma vision <ArrowRight size={20} /></Button>
                 <Button variant="accent" onClick={() => setCurrentPage('resume')}>Découvrir mon parcours <ArrowRight size={20} /></Button>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>

    <section className="py-20 relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <RevealOnScroll><div className="p-6"><span className="block text-5xl md:text-7xl font-bold text-white mb-2 tracking-tighter"><AnimatedCounter end="+4" duration={1500} /></span><span className="text-purple-400 text-sm font-bold tracking-[0.2em] uppercase">Années d'expertise</span></div></RevealOnScroll>
            <RevealOnScroll delay={100}><div className="p-6"><span className="block text-5xl md:text-7xl font-bold text-white mb-2 tracking-tighter"><AnimatedCounter end="+50" duration={2000} /></span><span className="text-purple-400 text-sm font-bold tracking-[0.2em] uppercase">Projets complétés</span></div></RevealOnScroll>
            <RevealOnScroll delay={200}><div className="p-6"><span className="block text-5xl md:text-7xl font-bold text-white mb-2 tracking-tighter"><AnimatedCounter end={80} suffix="%" duration={2000} /></span><span className="text-purple-400 text-sm font-bold tracking-[0.2em] uppercase">Clients satisfaits</span></div></RevealOnScroll>
        </div>
      </div>
    </section>

    <section className="py-24 relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
            <div className="bg-white/5 p-8 rounded-sm border border-white/10 backdrop-blur-sm">
                <div className="flex justify-between items-end mb-10 border-b border-white/10 pb-6">
                  <div><h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight uppercase">PROJETS RÉCENTS</h2></div>
                  <button onClick={() => setCurrentPage('portfolio')} className="text-purple-400 hover:text-white transition-colors flex items-center gap-2 text-sm uppercase tracking-widest mb-1">Tout voir <ArrowRight size={16} /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {PROJECTS.slice(0, 3).map((project, index) => (
                    <RevealOnScroll key={project.id} delay={index * 100}>
                      <div className="group cursor-pointer" onClick={() => onOpenProject(project)}>
                        <div className="relative overflow-hidden rounded-sm aspect-[4/5] mb-6 shadow-2xl bg-neutral-900 border border-white/5">
                          <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/20 transition-all duration-500 z-10"></div>
                          <img src={project.image} alt={project.title} className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                        </div>
                        <div><h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors flex items-center gap-2">{project.title} <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0" /></h3><p className="text-sm text-neutral-500 mt-1">{project.category}</p></div>
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>
            </div>
        </RevealOnScroll>
      </div>
    </section>

    <section className="py-24 relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll><h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-16 text-center uppercase">EXPERTISES</h2></RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.slice(0, 3).map((service, index) => (
            <RevealOnScroll key={index} delay={index * 100}>
              <div className="p-8 bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 h-full flex flex-col justify-between group rounded-sm">
                <div>
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors"><span className="text-purple-500 font-bold">{index + 1}</span></div>
                  <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-6">{service.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2">{service.tags.map(tag => (<span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-black/50 border border-white/5 text-neutral-400 rounded-sm">{tag}</span>))}</div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
        <div className="mt-16 text-center"><Button variant="outline" onClick={() => setCurrentPage('services')}>Découvrir tous les services</Button></div>
      </div>
    </section>

    <section className="py-20 relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-md overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center"><RevealOnScroll><h2 className="text-2xl md:text-3xl font-bold text-white tracking-widest uppercase"><span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-white">Notre Arsenal Créatif</span></h2></RevealOnScroll></div>
        <div className="relative w-full overflow-hidden">
            <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-black/50 to-transparent z-10"></div>
            <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-black/50 to-transparent z-10"></div>
            <div className="flex w-max animate-marquee">
                {[...CREATIVE_ARSENAL, ...CREATIVE_ARSENAL, ...CREATIVE_ARSENAL].map((tool, index) => (
                    <div key={index} className="mx-4"><div className="px-8 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-neutral-300 font-medium tracking-wide hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-white transition-all duration-300 cursor-default whitespace-nowrap shadow-lg">{tool}</div></div>
                ))}
            </div>
        </div>
    </section>
  </>
);

/* --- 5. COMPOSANT PRINCIPAL --- */

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenProject = (project) => { setSelectedProject(project); setCurrentPage('project-detail'); };
  const handleBackToProjects = () => { setSelectedProject(null); setCurrentPage('portfolio'); };

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage setCurrentPage={setCurrentPage} onOpenProject={handleOpenProject} />;
      case 'portfolio': return <PortfolioPage onOpenProject={handleOpenProject} />;
      case 'services': return <ServicesPage />;
      case 'about': return <AboutPage />;
      case 'offers': return <OffersPage />;
      case 'resume': return <ResumePage />;
      case 'contact': return <ContactPage />;
      case 'legal': return <LegalPage />;
      case 'project-detail': return <ProjectDetailPage project={selectedProject} onBack={handleBackToProjects} onContactClick={() => setCurrentPage('contact')} />;
      default: return <HomePage setCurrentPage={setCurrentPage} onOpenProject={handleOpenProject} />;
    }
  };

  useEffect(() => { window.scrollTo(0, 0); }, [currentPage]);

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      {/* Background Global */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none select-none bg-black z-0">
        <style dangerouslySetInnerHTML={{__html: `@keyframes blob-bounce {0%, 100% {transform:translate(0,0) scale(1);} 33%{transform:translate(30px,-50px) scale(1.1);} 66%{transform:translate(-20px,20px) scale(0.9);}} @keyframes marquee {0% {transform:translateX(0);} 100% {transform:translateX(-50%);}} .animate-marquee {animation: marquee 30s linear infinite;} .animate-marquee:hover {animation-play-state: paused;}`}} />
        <div className="absolute inset-0 opacity-[0.15] z-20 mix-blend-overlay" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>
        <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/40 blur-[100px] animate-[blob-bounce_20s_infinite_ease-in-out] mix-blend-screen"></div>
        <div className="absolute top-[40%] right-[-10%] w-[40%] h-[60%] rounded-full bg-indigo-500/30 blur-[80px] animate-[blob-bounce_25s_infinite_reverse_ease-in-out] mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-blue-600/30 blur-[100px] animate-[blob-pulse_15s_infinite_ease-in-out] mix-blend-screen"></div>
      </div>

      <Navigation currentPage={currentPage} setCurrentPage={(p) => { setSelectedProject(null); setCurrentPage(p); }} onLogoClick={() => setCurrentPage('about')} />
      <main className="relative z-10 min-h-screen">{renderPage()}</main>
      <Footer setCurrentPage={(p) => { setSelectedProject(null); setCurrentPage(p); }} />
    </div>
  );
};

export default App;