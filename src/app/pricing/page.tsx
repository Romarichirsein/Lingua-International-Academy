import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/FadeIn";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Découverte",
    price: "Gratuit",
    description: "Pour essayer la plateforme sans engagement.",
    features: [
      "Accès à 3 cours gratuits",
      "Vidéos de présentation",
      "Communauté en ligne",
    ],
    cta: "Commencer gratuitement",
    popular: false,
  },
  {
    name: "Pro",
    price: "29 000 FCFA",
    period: "/mois",
    description: "Pour les apprenants sérieux qui veulent progresser rapidement.",
    features: [
      "Accès illimité à tous les cours",
      "Certificats de complétion",
      "Support prioritaire",
      "Exercices interactifs",
      "Suivi de progression avancé",
    ],
    cta: "Essai gratuit 14 jours",
    popular: true,
  },
  {
    name: "Entreprise",
    price: "Sur mesure",
    description: "Pour les équipes et organisations qui veulent former en masse.",
    features: [
      "Tout du plan Pro",
      "Dashboard administrateur",
      "Rapports de progression",
      "Intégration SSO",
      "Account manager dédié",
      "Facturation centralisée",
    ],
    cta: "Nous contacter",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 overflow-hidden">
        <section className="bg-white py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <FadeIn>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                Des tarifs simples et transparents
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                Choisissez le plan qui correspond à vos ambitions. Changez ou annulez à tout moment.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="pb-20 md:pb-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan, idx) => (
                <FadeIn key={plan.name} delay={0.1 * idx}>
                  <div className={`rounded-2xl p-8 border ${plan.popular ? 'border-gray-900 shadow-xl relative' : 'border-gray-200 shadow-sm'} bg-white h-full flex flex-col`}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          Le plus populaire
                        </span>
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      {plan.period && <span className="text-gray-500 text-sm">{plan.period}</span>}
                    </div>
                    <p className="text-sm text-gray-500 mb-6">{plan.description}</p>
                    <Link href="/courses" className="mt-auto">
                      <Button className={`w-full mb-8 ${plan.popular ? '' : ''}`} variant={plan.popular ? "default" : "outline"}>
                        {plan.cta}
                      </Button>
                    </Link>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start text-sm text-gray-600">
                          <CheckCircle2 className="w-4 h-4 text-gray-900 mr-2 mt-0.5 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
