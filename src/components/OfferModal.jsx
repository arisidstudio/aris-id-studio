import { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { Button } from './Button';

export function OfferModal({ offer, onClose }) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Commande Offre : ${offer}`;
    const body = `Nom & Prénom: ${name}\nOffre choisie: ${offer}\n\nDescription du projet:\n${desc}`;
    window.location.href = `mailto:helloarisidstudio@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#111] border border-white/10 p-8 rounded-sm max-w-lg w-full relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-white mb-2">Commencer avec l'offre</h2>
        <p className="text-purple-400 font-bold mb-8 uppercase tracking-wider text-sm">{offer}</p>
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
}
