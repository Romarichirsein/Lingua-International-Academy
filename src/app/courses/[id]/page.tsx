import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { MOCK_COURSES } from "@/lib/mock-data";
import { Clock, BookOpen, CheckCircle2, Award, PlayCircle, Shield } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";

// Simulation de fetch de données
async function getCourse(id: string) {
  const course = MOCK_COURSES.find(c => c.id === id);
  if (!course) return null;
  return course;
}

export default async function CourseDetailPage({ params }: { params: { id: string } }) {
  // Await the params before accessing its properties (Next.js 15 requirement for dynamic routes)
  const resolvedParams = await params;
  const course = await getCourse(resolvedParams.id);
  
  if (!course) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/30">
      <Navbar />
      
      {/* HERO COURSE */}
      <section className="bg-gray-900 text-white pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-gray-200">
                {course.category}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                Mise à jour récemment
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {course.title}
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl leading-relaxed">
              {course.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-gray-300" />
                {course.duration}
              </div>
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-gray-300" />
                {course.level}
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 mr-2 text-gray-300" />
                Certificat inclus
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 pb-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* LEFT COLUMN: VIDEO & CONTENT */}
          <div className="w-full lg:w-2/3">
            {/* VIDEO PLAYER */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-12">
              <div className="aspect-video relative bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${course.youtubeId}?rel=0&modestbranding=1`}
                  title={`Vidéo de présentation: ${course.title}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
              <div className="p-6 border-t border-gray-100 bg-white flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Leçon d&apos;introduction gratuite</h3>
                  <p className="text-sm text-gray-500">Regardez cette vidéo pour découvrir le style d&apos;enseignement.</p>
                </div>
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  <PlayCircle className="w-4 h-4 mr-2" /> Continuer la lecture
                </Button>
              </div>
            </div>

            {/* WHAT YOU WILL LEARN */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ce que vous allez apprendre</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-gray-900 mr-3 shrink-0 mt-0.5" />
                    <span className="text-gray-600 leading-relaxed text-sm">
                      Maitriser les concepts avancés et les appliquer dans des cas concrets de l&apos;industrie.
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: PRICING CARD */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xl sticky top-24">
              <div className="text-4xl font-bold text-gray-900 mb-2">{course.price} €</div>
              <p className="text-gray-500 mb-6 text-sm">Paiement unique, accès à vie.</p>
              
              <Link href={`/learn/${course.id}`} className="block w-full mb-4">
                <Button className="w-full text-base h-12" size="lg">Accéder au cours</Button>
              </Link>
              <p className="text-xs text-center text-gray-400 flex items-center justify-center mb-8">
                <Shield className="w-4 h-4 mr-1" /> Garantie satisfait ou remboursé 30 jours
              </p>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">Inclus dans le cours</h4>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm text-gray-600">
                    <PlayCircle className="w-4 h-4 text-gray-400 mr-3" /> 24 heures de vidéo à la demande
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <BookOpen className="w-4 h-4 text-gray-400 mr-3" /> 12 ressources téléchargeables
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <Award className="w-4 h-4 text-gray-400 mr-3" /> Certificat de fin de formation
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-2">Instructeur</h4>
                <div className="flex items-center mt-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-4 border border-gray-300">
                    <img src={`https://ui-avatars.com/api/?name=${course.instructor.replace(' ', '+')}&background=random`} alt={course.instructor} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{course.instructor}</div>
                    <div className="text-xs text-gray-500">Expert en {course.category}</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}
