"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  { q: "Comment fonctionnent les cours en ligne ?", a: "Nos cours sont composés de vidéos à la demande hébergées sur YouTube, d'exercices interactifs et de ressources téléchargeables. Vous progressez à votre rythme, 24h/24 et 7j/7." },
  { q: "Les certificats sont-ils reconnus ?", a: "Oui, nos certificats sont reconnus par les entreprises partenaires et peuvent être ajoutés à votre profil LinkedIn. Ils attestent de votre maîtrise des compétences enseignées." },
  { q: "Puis-je accéder aux cours hors-ligne ?", a: "Vous pouvez télécharger les ressources PDF et les supports de cours. Les vidéos nécessitent une connexion internet, mais nous travaillons sur un mode hors-ligne." },
  { q: "Comment contacter un professeur ?", a: "Chaque cours dispose d'un espace de discussion où vous pouvez poser vos questions. Les professeurs répondent généralement sous 24 à 48 heures." },
  { q: "Quelle est la politique de remboursement ?", a: "Nous offrons une garantie satisfait ou remboursé de 30 jours. Si le cours ne vous convient pas, contactez-nous pour un remboursement intégral." },
  { q: "Les cours sont-ils disponibles en français ?", a: "La majorité de nos cours sont disponibles en français et en anglais. Les sous-titres sont disponibles dans les deux langues pour chaque vidéo." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-6 text-left group">
        <span className="text-base font-medium text-gray-900 pr-8 group-hover:text-gray-600 transition-colors">{q}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="pb-6 text-gray-500 leading-relaxed text-sm -mt-2">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 overflow-hidden">
        <section className="bg-white py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <FadeIn>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                Questions fréquentes
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                Tout ce que vous devez savoir sur Lingua Academy. Vous ne trouvez pas la réponse ? Contactez-nous.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="pb-20 md:pb-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            {faqs.map((faq, idx) => (
              <FadeIn key={faq.q} delay={0.1 * idx}>
                <FaqItem q={faq.q} a={faq.a} />
              </FadeIn>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
