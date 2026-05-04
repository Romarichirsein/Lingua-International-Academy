import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { CheckCircle2, Users, BookOpen, Globe, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 overflow-hidden">
        
        {/* HERO */}
        <section className="bg-white py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
            <FadeIn>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                Notre mission est de rendre l'apprentissage accessible à tous.
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
                Lingua International Academy a été fondée avec une conviction : chaque personne mérite un accès à une éducation de qualité, peu importe où elle se trouve dans le monde.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* STATS */}
        <section className="py-16 border-y border-gray-100 bg-gray-50/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "12K+", label: "Étudiants actifs" },
                { value: "150+", label: "Cours disponibles" },
                { value: "45", label: "Pays représentés" },
                { value: "98%", label: "Taux de satisfaction" },
              ].map((stat, idx) => (
                <FadeIn key={stat.label} delay={0.1 * idx}>
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Nos valeurs fondamentales</h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Users, title: "Communauté", description: "Un réseau mondial d'apprenants passionnés qui se soutiennent mutuellement." },
                { icon: BookOpen, title: "Excellence", description: "Des contenus pédagogiques de la plus haute qualité, constamment mis à jour." },
                { icon: Globe, title: "Accessibilité", description: "Des formations accessibles à tous, partout dans le monde, à tout moment." },
                { icon: Award, title: "Innovation", description: "Les dernières technologies au service de votre apprentissage." },
              ].map((value, idx) => (
                <FadeIn key={value.title} delay={0.1 * idx}>
                  <div className="text-center p-8 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 h-full">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gray-100 mb-6">
                      <value.icon className="w-7 h-7 text-gray-700" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{value.description}</p>
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
