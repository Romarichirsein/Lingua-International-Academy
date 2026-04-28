import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Lightbulb, Target, Repeat, MessageCircle } from "lucide-react";

export default function MethodologyPage() {
  const steps = [
    {
      number: "01",
      icon: Lightbulb,
      title: "Immersion contextuelle",
      description: "Chaque cours commence par une immersion dans un contexte réel. Vous apprenez en situation, pas en théorie abstraite. Nos vidéos vous placent directement dans des scénarios professionnels authentiques.",
    },
    {
      number: "02",
      icon: Target,
      title: "Pratique ciblée",
      description: "Des exercices interactifs calibrés sur vos points faibles. Notre système adaptatif identifie vos lacunes et génère des activités sur mesure pour y remédier efficacement.",
    },
    {
      number: "03",
      icon: Repeat,
      title: "Répétition espacée",
      description: "La science cognitive au service de votre mémoire. Notre algorithme de révision espacée garantit que chaque concept appris reste ancré dans votre mémoire à long terme.",
    },
    {
      number: "04",
      icon: MessageCircle,
      title: "Feedback en continu",
      description: "Des retours détaillés de nos experts sur chaque exercice. Vous ne restez jamais bloqué : notre communauté et nos instructeurs sont toujours disponibles pour vous guider.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        
        {/* HERO */}
        <section className="bg-white py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Une méthode pensée pour des résultats concrets.
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
              Notre approche pédagogique combine les dernières avancées en sciences cognitives avec une expérience d&apos;apprentissage immersive et engageante.
            </p>
          </div>
        </section>

        {/* METHODOLOGY STEPS */}
        <section className="py-20 bg-gray-50/50 border-y border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="space-y-16 md:space-y-24">
              {steps.map((step, index) => (
                <div key={step.number} className={`flex flex-col md:flex-row items-start gap-8 md:gap-16 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-gray-800" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-gray-300 mb-2 tracking-wider">ÉTAPE {step.number}</div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-500 text-lg leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
