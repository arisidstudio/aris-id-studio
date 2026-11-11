import { Seo } from '../components/Seo';
export default function Legal() {
  return (
    <section className="pt-32 pb-20 min-h-screen relative z-10 bg-black/30 backdrop-blur-md">
      <Seo title="Mentions légales · ARIS ID Studio" path="/mentions-legales" />
      <div className="max-w-4xl mx-auto px-6 text-neutral-300">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">Mentions Légales & CGV</h1>

        <div className="space-y-16">
          <div className="bg-white/5 p-8 rounded-sm border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-8 uppercase tracking-wider border-b border-purple-500/50 pb-4 inline-block">1. Mentions Légales</h2>

            <div className="space-y-8 text-sm leading-relaxed">
              <div>
                <h3 className="text-white font-bold mb-2 text-lg">1.1 Éditeur du site</h3>
                <p>Le site <strong>ARIS ID STUDIO</strong> est édité par <strong>Lutécia Rustico</strong>, Freelancer</p>
                <ul className="mt-2 space-y-1 text-neutral-400">
                  <li><strong>Siège social :</strong> Nice, France</li>
                  <li><strong>Email :</strong> helloarisidstudio@gmail.com</li>
                  <li><strong>Téléphone :</strong> +33 6 14 13 29 71</li>
                  <li><strong>Directrice de la publication :</strong> Lutécia Rustico</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2 text-lg">1.2 Hébergement</h3>
                <p>Ce site est hébergé par la société <strong>Vercel Inc.</strong></p>
                <p className="text-neutral-400">Adresse : 340 S Lemon Ave #4133 Walnut, CA 91789, USA.</p>
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

          <div className="bg-white/5 p-8 rounded-sm border border-white/10" id="cgv">
            <h2 className="text-2xl font-bold text-white mb-8 uppercase tracking-wider border-b border-purple-500/50 pb-4 inline-block">2. Conditions Générales de Vente (CGV)</h2>

            <div className="space-y-8 text-sm leading-relaxed text-justify">
              <div>
                <h3 className="text-white font-bold mb-2 text-base text-purple-400">Article 1 : Objet et Champ d'application</h3>
                <p>Les présentes Conditions Générales de Vente régissent la relation contractuelle entre <strong>ARIS ID STUDIO</strong> (le Prestataire) et son Client. Elles s'appliquent à toutes les prestations de services proposées (création graphique, branding, web design, etc.). Toute commande implique l'adhésion sans réserve du Client aux présentes CGV.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2 text-base text-purple-400">Article 2 : Devis et Commandes</h3>
                <p>Chaque projet fait l'objet d'un devis gratuit détaillant la nature de la prestation et le prix. La commande est considérée comme ferme et définitive dès réception du devis signé avec la mention "Bon pour accord", accompagné de l'acompte prévu (généralement 50%).</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2 text-base text-purple-400">Article 3 : Tarifs et Paiement</h3>
                <p>
                  Les prix sont indiqués en euros. Le paiement s'effectue par virement bancaire.
                  <br/>- Un acompte est exigé au démarrage du projet.
                  <br/>- Le solde est payable à la livraison des fichiers finaux ou à la mise en ligne du site.
                  <br/>En cas de retard de paiement, des pénalités seront appliquées conformément à la législation en vigueur.
                </p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2 text-base text-purple-400">Article 4 : Modifications et Corrections</h3>
                <p>Le devis inclut un nombre défini d'allers-retours (modifications) spécifié pour chaque prestation. Toute demande de modification supplémentaire ou changement radical de direction artistique en cours de projet fera l'objet d'une facturation complémentaire.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2 text-base text-purple-400">Article 5 : Livraison et Délais</h3>
                <p>Les délais de livraison sont donnés à titre indicatif lors du devis. Ils dépendent de la réactivité du Client à fournir les contenus (textes, images) nécessaires. ARIS ID STUDIO ne saurait être tenu responsable d'un retard dû à un manque de collaboration du Client.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2 text-base text-purple-400">Article 6 : Cession des Droits</h3>
                <p>Le transfert des droits d'utilisation des créations ne devient effectif qu'après le paiement intégral de la facture. Les fichiers sources (fichiers de travail .ai, .psd, etc.) restent la propriété d'ARIS ID STUDIO sauf mention contraire explicite dans le devis.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2 text-base text-purple-400">Article 7 : Droit de Rétractation</h3>
                <p>Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les contrats de fourniture de contenu numérique non fourni sur un support matériel dont l'exécution a commencé après accord préalable exprès du consommateur.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
