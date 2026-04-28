import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const posts = [
  {
    slug: "methodes-apprentissage-2026",
    title: "Les 5 méthodes d\u0027apprentissage les plus efficaces en 2026",
    excerpt: "Découvrez les techniques scientifiquement prouvées pour apprendre plus vite et retenir plus longtemps.",
    date: "15 avril 2026",
    category: "Pédagogie",
    readTime: "5 min",
  },
  {
    slug: "ia-education",
    title: "Comment l\u0027IA transforme l\u0027éducation en ligne",
    excerpt: "L\u0027intelligence artificielle révolutionne la manière dont nous apprenons. Tour d\u0027horizon des innovations clés.",
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
      <main className="flex-1">
        <section className="bg-white py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">Blog</h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Actualités, conseils et réflexions sur l&apos;apprentissage, la technologie et le développement de compétences.
            </p>
          </div>
        </section>

        <section className="pb-20 md:pb-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="space-y-8">
              {posts.map((post) => (
                <article key={post.slug} className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-lg transition-shadow duration-300 group">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                    <span className="bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full text-xs font-medium">{post.category}</span>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime} de lecture</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-600 transition-colors">{post.title}</h2>
                  <p className="text-gray-500 leading-relaxed mb-4">{post.excerpt}</p>
                  <Link href="#" className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
                    Lire la suite <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
