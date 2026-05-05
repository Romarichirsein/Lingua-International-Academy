import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const posts = [
  {
    slug: "methodes-apprentissage-2026",
    title: "Les 5 méthodes d'apprentissage les plus efficaces en 2026",
    excerpt: "Découvrez les techniques scientifiquement prouvées pour apprendre plus vite et retenir plus longtemps.",
    date: "15 avril 2026",
    category: "Pédagogie",
    readTime: "5 min",
  },
  {
    slug: "ia-education",
    title: "Comment l'IA transforme l'éducation en ligne",
    excerpt: "L'intelligence artificielle révolutionne la manière dont nous apprenons. Tour d'horizon des innovations clés.",
    date: "8 avril 2026",
    category: "Technologie",
    readTime: "7 min",
  },
  {
    slug: "certification-valeur-marche",
    title: "Les certifications en ligne ont-elles de la valeur sur le marché ?",
    excerpt: "Analyse complète de la perception des certificats numériques par les recruteurs et entreprises.",
    date: "1 avril 2026",
    category: "Carrière",
    readTime: "6 min",
  },
];

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 overflow-hidden">
        <section className="bg-white py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <FadeIn>
              <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lingua-blue to-lingua-red mb-6 tracking-tight">Blog</h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                Actualités, conseils et réflexions sur l&apos;apprentissage, la technologie et le développement de compétences.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="pb-20 md:pb-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="space-y-8">
              {posts.map((post, idx) => (
                <FadeIn key={post.slug} delay={0.1 * idx}>
                  <article className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-lg transition-shadow duration-300 group">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                      <span className="bg-lingua-blue/5 text-lingua-blue px-2.5 py-0.5 rounded-full text-xs font-medium">{post.category}</span>
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime} de lecture</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-lingua-blue transition-colors">{post.title}</h2>
                    <p className="text-gray-500 leading-relaxed mb-4">{post.excerpt}</p>
                    <Link href="#" className="inline-flex items-center text-sm font-medium text-lingua-blue hover:underline transition-colors">
                      Lire la suite <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </article>
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
