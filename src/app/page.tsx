import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { MOCK_COURSES } from "@/lib/mock-data";
import { FadeIn } from "@/components/animations/FadeIn";
import { ArrowRight, PlayCircle, CheckCircle2, Star, Clock, BookOpen, User } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lingua International Academy | Maîtrisez une nouvelle langue",
  description: "Rejoignez 12 000+ étudiants. Cours en ligne avec experts mondiaux, certifications reconnues, et communauté internationale. Commencez gratuitement.",
  openGraph: {
    title: "Lingua International Academy",
    description: "Maîtrisez une nouvelle langue avec l'excellence. Cours en ligne certifiants.",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-hidden">
        
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-white pt-20 pb-24 md:pt-32 md:pb-40">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] rounded-full bg-blue-50/50 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] rounded-full bg-gray-50/80 blur-3xl" />
          
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn delay={0.1}>
                <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-600 mb-8 shadow-sm">
                  <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                  Nouveau : Cours intensifs d'été disponibles
                </div>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-8 leading-tight">
                  Maîtrisez une nouvelle langue avec <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">l'excellence.</span>
                </h1>
              </FadeIn>
              
              <FadeIn delay={0.3}>
                <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Rejoignez des milliers d'étudiants qui ont transformé leur carrière et leur vie personnelle grâce à nos programmes immersifs et nos experts mondiaux.
                </p>
              </FadeIn>
              
              <FadeIn delay={0.4}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/courses">
                    <Button size="lg" className="w-full sm:w-auto group">
                      Explorer les cours
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/methodology">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      <PlayCircle className="mr-2 h-5 w-5 text-gray-500" />
                      Voir la méthode
                    </Button>
                  </Link>
                </div>
              </FadeIn>

              <FadeIn delay={0.5}>
                <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-gray-300" />
                    Professeurs certifiés
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-gray-300" />
                    Accès à vie
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-gray-300" />
                    Certificats reconnus
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* LOGOS SECTION */}
        <section className="py-12 border-y border-gray-100 bg-gray-50/50">
          <FadeIn>
            <div className="container mx-auto px-4 text-center">
              <p className="text-sm font-medium text-gray-400 mb-8 uppercase tracking-widest">Ils nous font confiance</p>
              <div className="flex flex-wrap justify-center gap-x-16 gap-y-6 opacity-40">
                {["Google", "Microsoft", "Amazon", "Meta"].map((name) => (
                  <div key={name} className="text-xl font-bold text-gray-500 tracking-wide">{name}</div>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* POPULAR COURSES */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Nos cours populaires</h2>
                  <p className="text-gray-500 max-w-lg">Les formations les plus demandées par notre communauté d'apprenants.</p>
                </div>
                <Link href="/courses" className="hidden md:inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  Voir tout <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {MOCK_COURSES.map((course, idx) => (
                <FadeIn key={course.id} delay={0.1 * (idx + 1)}>
                  <Link href={`/courses/${course.id}`} className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                      <img src={course.image} alt={course.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-800 shadow-sm">
                          {course.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 p-5">
                      <div className="flex items-center text-xs text-gray-500 mb-3 gap-4">
                        <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {course.duration}</span>
                        <span className="flex items-center"><BookOpen className="w-3 h-3 mr-1" /> {course.level}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-600 transition-colors">
                        {course.title}
                      </h3>
                      <div className="mt-auto pt-4 flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-600">
                          <User className="w-4 h-4 mr-2" />{course.instructor}
                        </div>
                        <div className="font-bold text-gray-900 text-lg">{course.price.toLocaleString()} FCFA</div>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.4}>
              <div className="mt-8 text-center md:hidden">
                <Link href="/courses">
                  <Button variant="outline">Voir tous les cours <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-20 md:py-32 bg-gray-50/50 border-y border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">Ce que disent nos étudiants</h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Amina Diallo",
                  role: "Chef de projet, Paris",
                  quote: "Lingua Academy a complètement changé ma façon d'apprendre. Les cours sont structurés, les professeurs sont passionnés, et j'ai obtenu ma certification en un temps record.",
                  rating: 5,
                },
                {
                  name: "Thomas Müller",
                  role: "Ingénieur logiciel, Berlin",
                  quote: "La qualité des vidéos et des exercices est exceptionnelle. Le suivi de progression m'a aidé à rester motivé tout au long de ma formation.",
                  rating: 5,
                },
                {
                  name: "Sofia Rossi",
                  role: "Consultante, Milan",
                  quote: "J'ai essayé plusieurs plateformes et Lingua est de loin la meilleure. L'interface est intuitive et les contenus sont toujours à jour.",
                  rating: 5,
                },
              ].map((testimonial, idx) => (
                <FadeIn key={testimonial.name} delay={0.1 * (idx + 1)}>
                  <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-8">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                        <img src={`https://ui-avatars.com/api/?name=${testimonial.name.replace(' ', '+')}&background=random&color=fff`} alt={testimonial.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                        <div className="text-xs text-gray-500">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 md:py-32 bg-gray-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                Prêt à transformer votre avenir ?
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                Rejoignez plus de 12 000 étudiants qui ont déjà fait le choix de l'excellence. Commencez votre première leçon gratuitement.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/courses">
                  <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 w-full sm:w-auto">
                    Commencer gratuitement
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white w-full sm:w-auto">
                    En savoir plus
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
