import { useState } from 'react';
import { Check } from 'lucide-react';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { OfferModal } from '../components/OfferModal';
import { OFFERS_DATA } from '../data/offers';
import { Seo } from '../components/Seo';

export default function Offers() {
  const [selectedOffer, setSelectedOffer] = useState(null);

  return (
    <section className="pt-32 pb-20 min-h-screen relative z-10 bg-black/30 backdrop-blur-md">
      <Seo title="Offres · ARIS ID Studio" path="/offres" noindex />
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
}
