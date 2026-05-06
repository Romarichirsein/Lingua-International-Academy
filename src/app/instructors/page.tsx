import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { FadeIn } from "@/components/animations/FadeIn";
import { 
  Globe, 
  Mail, 
  BookOpen, 
  Users, 
  Star,
  ExternalLink,
  User
} from "lucide-react";

async function getInstructors() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("instructors")
    .select("*")
    .order("full_name");
  
  if (!data || data.length === 0) {
    return [
      {
        id: "1",
        full_name: "Sarah Jenkins",
        photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        specialty: "Expert en Management Agile",
        bio: "Sarah possède plus de 15 ans d'expérience dans la gestion de projets complexes pour des entreprises du Fortune 500.",
        social_links: { twitter: "#", linkedin: "#", globe: "#" }
      },
      {
        id: "2",
        full_name: "Michael Chen",
        photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
        specialty: "Analyste Financier Senior",
        bio: "Ancien trader à Wall Street, Michael se consacre désormais à l'enseignement des mathématiques financières.",
        social_links: { twitter: "#", linkedin: "#" }
      },
      {
        id: "3",
        full_name: "Elena Rostova",
        photo_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
        specialty: "Artiste 3D & Animatrice",
        bio: "Passionnée par Blender, Elena a travaillé sur plusieurs longs métrages d'animation avant de rejoindre Lingua Academy.",
        social_links: { linkedin: "#", globe: "#" }
      },
      {
        id: "4",
        full_name: "David Rodriguez",
        photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        specialty: "Coach en Vente B2B",
        bio: "David aide les entrepreneurs à doubler leur chiffre d'affaires grâce à des techniques de psychologie de vente avancées.",
        social_links: { twitter: "#", linkedin: "#" }
      }
    ];
  }
  return data;
}

export default async function InstructorsPage() {
  const instructors = await getInstructors();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <Navbar />
      
      <main className="flex-1 overflow-hidden">
        {/* HERO HEADER */}
        <section className="bg-gray-900 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 mb-6">Nos Formateurs Experts</h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Apprenez auprès des meilleurs. Nos instructeurs sont des professionnels reconnus dans leur domaine, passionnés par la transmission de leur savoir.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* INSTRUCTORS GRID */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {instructors.map((instructor: any, idx: number) => (
                <FadeIn key={instructor.id} delay={0.1 * idx}>
                  <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                    {/* Photo */}
                    <div className="aspect-square relative overflow-hidden bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-gray-200 transition-colors">
                      <div className="w-24 h-24 rounded-full bg-lingua-blue/10 flex items-center justify-center text-lingua-blue">
                        <User className="w-12 h-12" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                        <div className="flex gap-4">
                          {instructor.social_links?.twitter && (
                            <a href={instructor.social_links.twitter} className="text-white hover:text-blue-400 transition-colors">
                              <Mail className="w-5 h-5" />
                            </a>
                          )}
                          {instructor.social_links?.linkedin && (
                            <a href={instructor.social_links.linkedin} className="text-white hover:text-blue-600 transition-colors">
                              <ExternalLink className="w-5 h-5" />
                            </a>
                          )}
                          {instructor.social_links?.globe && (
                            <a href={instructor.social_links.globe} className="text-white hover:text-green-400 transition-colors">
                              <Globe className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold mb-1">{instructor.full_name}</h3>
                      <p className="text-blue-600 text-sm font-semibold mb-4">{instructor.specialty}</p>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6">
                        {instructor.bio}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                        <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                          <Users className="w-4 h-4 text-blue-500" /> 1.2k étudiants
                        </div>
                        <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                          <Star className="w-4 h-4 fill-current" /> 4.9
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* JOIN AS INSTRUCTOR */}
        <section className="py-20 bg-white border-y border-gray-100">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <FadeIn>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-lingua-blue/10 text-lingua-blue mb-8">
                <BookOpen className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold mb-6">Devenez instructeur sur Lingua Academy</h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                Partagez votre expertise avec une communauté mondiale d&apos;étudiants. Nous fournissons les outils et le support nécessaires pour créer des cours exceptionnels.
              </p>
              <Button variant="lingua-blue" size="lg" className="h-14 px-10 rounded-2xl shadow-xl shadow-lingua-blue/20">
                Postuler pour enseigner
              </Button>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
