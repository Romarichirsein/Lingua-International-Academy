import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { MOCK_COURSES } from "@/lib/mock-data";
import { FadeIn } from "@/components/animations/FadeIn";
import { 
  Clock, 
  CheckCircle2, 
  Award, 
  PlayCircle, 
  Shield, 
  Globe,
  Star, 
  Share2, 
  FileText,
  Info,
  ChevronDown,
  HelpCircle
} from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { EnrollButton } from "@/components/EnrollButton";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const course = await getCourse(resolvedParams.id);
  if (!course) return { title: "Cours introuvable" };

  return {
    title: `${course.title} | Lingua Academy`,
    description: course.description,
  };
}

async function getCourse(id: string) {
  try {
    const supabase = await createClient();
    const { data: course, error } = await supabase
      .from("courses")
      .select("*, instructors(*)")
      .eq("id", id)
      .single();
    
    if (course && !error) {
      const { data: lessons } = await supabase
        .from("lessons")
        .select("*")
        .eq("course_id", id)
        .order("sort_order", { ascending: true });
      return { ...course, lessons: lessons || [], isMock: false };
    }
  } catch (error) {
    console.error("Supabase course fetch error:", error);
  }

  // Fallback to MOCK_COURSES
  const mockCourse = MOCK_COURSES.find((c) => c.id === id);
  if (mockCourse) {
    return { ...mockCourse, isMock: true };
  }

  return null;
}

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const course = await getCourse(resolvedParams.id);

  if (!course) notFound();

  // Unified curriculum building
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let curriculum: any[] = [];
  if (course.isMock && course.curriculum) {
    curriculum = course.curriculum;
  } else if (course.lessons && course.lessons.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sectionsObj = course.lessons.reduce((acc: any, lesson: any) => {
      const sectionName = lesson.section_name || "Introduction";
      if (!acc[sectionName]) acc[sectionName] = [];
      acc[sectionName].push({
        title: lesson.title,
        duration: lesson.duration || "10 min",
        type: lesson.video_url ? "video" : "text"
      });
      return acc;
    }, {});
    
    curriculum = Object.entries(sectionsObj).map(([module_title, lessons]) => ({
      module_title,
      lessons
    }));
  } else {
    // Default fallback
    curriculum = [
      {
        module_title: "Module 1: Introduction",
        lessons: [{ title: "Bienvenue dans ce cours", duration: "5 min", type: "text" }]
      }
    ];
  }

  const getLessonIcon = (type: string) => {
    switch(type) {
      case 'video': return <PlayCircle className="w-4 h-4 text-gray-400" />;
      case 'exam': return <HelpCircle className="w-4 h-4 text-purple-400" />;
      default: return <FileText className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* DARK HERO HEADER */}
      <section className="bg-[#1c1d1f] text-white py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <FadeIn className="max-w-4xl">
            <div className="flex gap-2 text-sm font-bold text-[#cec0fc] mb-4">
              <Link href="/courses">Cours</Link> {">"} 
              <Link href={`/courses?category=${course.category}`}>{course.category}</Link>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              {course.title}
            </h1>
            
            <p className="text-lg text-gray-300 mb-6 max-w-3xl whitespace-pre-wrap">
              {course.description?.split('\n')[0]}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
              <div className="flex items-center gap-1 text-[#f3ca8c]">
                <span className="font-bold">4.8</span>
                <div className="flex"><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /></div>
                <span className="text-gray-400 underline">(1,240 notes)</span>
              </div>
              <div className="text-gray-300">
                Créé par <Link href={`/instructors`} className="text-[#cec0fc] underline underline-offset-4">{course.instructors?.full_name || course.instructor || course.instructor_name}</Link>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-300">
              <span className="flex items-center gap-1"><Info className="w-4 h-4" /> Dernière mise à jour le 04/2024</span>
              <span className="flex items-center gap-1"><Globe className="w-4 h-4" /> Français</span>
            </div>
          </FadeIn>
        </div>
      </section>

      <main className="container mx-auto px-4 md:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-12 relative">
          
          {/* LEFT COLUMN: CONTENT */}
          <div className="flex-1 max-w-4xl">
            
            {/* INTRO VIDEO FOR MOBILE */}
            <div className="lg:hidden mb-8 rounded-xl overflow-hidden shadow-xl border border-gray-100">
               <div className="aspect-video bg-black relative">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${course.youtube_id || course.youtubeId}`}
                  title="Course Introduction"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* OBJECTIVES BOX */}
            <FadeIn delay={0.1}>
              <div className="border border-gray-200 rounded-lg p-6 mb-10 bg-white shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Ce que vous allez apprendre</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                  {(course.objectives || ["Maîtriser les bases de la langue", "S'exprimer avec assurance", "Comprendre les nuances culturelles", "Acquérir un vocabulaire riche"]).map((obj: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-gray-400 shrink-0" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* CURRICULUM */}
            <FadeIn delay={0.2}>
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Contenu du cours</h2>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{curriculum.length} sections • {curriculum.reduce((acc, curr) => acc + curr.lessons.length, 0)} sessions • {course.duration} de vidéo</span>
                  <button className="text-blue-600 font-bold hover:text-blue-700 transition-colors">Tout déplier</button>
                </div>

                <div className="border border-gray-200 rounded-lg divide-y divide-gray-200 overflow-hidden shadow-sm">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {curriculum.map((section: any, idx: number) => (
                    <div key={idx} className="bg-white group">
                      {/* Using group and focus-within to mimic accordion without client state for simplicity, or just show all */}
                      <details className="group" open={idx === 0}>
                        <summary className="p-4 bg-gray-50 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors list-none">
                          <div className="flex items-center gap-3">
                            <ChevronDown className="w-4 h-4 text-gray-600 group-open:-rotate-180 transition-transform" />
                            <span className="font-bold text-gray-800">{section.module_title}</span>
                          </div>
                          <span className="text-sm text-gray-500">{section.lessons.length} sessions</span>
                        </summary>
                        <div className="divide-y divide-gray-100 bg-white">
                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                          {section.lessons.map((lesson: any, i: number) => (
                            <div key={i} className="p-4 pl-12 flex items-center justify-between text-sm hover:bg-gray-50/50 transition-colors">
                              <div className="flex items-center gap-3 text-gray-700">
                                {getLessonIcon(lesson.type)}
                                <span className={lesson.type === 'video' ? "underline-offset-4 hover:underline cursor-pointer text-blue-600 font-medium" : ""}>
                                  {lesson.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-gray-400">
                                {lesson.type === 'video' && <span className="hidden sm:inline">Aperçu</span>}
                                <span>{lesson.duration}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </details>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* PREREQUISITES */}
            <FadeIn delay={0.3}>
              <div className="mb-10">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Pré-requis</h2>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                  {(course.prerequisites || ["Aucun pré-requis particulier", "Un ordinateur et une connexion internet", "De la motivation !"]).map((pre: string, i: number) => (
                    <li key={i}>{pre}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* DESCRIPTION */}
            <FadeIn delay={0.4}>
              <div className="mb-10">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Description</h2>
                <div className="text-sm text-gray-700 leading-relaxed space-y-4 whitespace-pre-wrap">
                  {course.description}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* RIGHT COLUMN: STICKY SIDEBAR */}
          <div className="lg:w-[350px] lg:absolute lg:top-[-250px] lg:right-8 z-20">
            <FadeIn delay={0.2} direction="left">
              <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden sticky top-24">
                
                {/* VIDEO PREVIEW ON DESKTOP */}
                <div className="hidden lg:block aspect-video bg-gray-900 relative group cursor-pointer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={course.image} alt="Preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl">
                      <PlayCircle className="w-10 h-10 text-gray-900 ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 text-center font-bold text-white text-sm">
                    Regarder l&apos;aperçu
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl font-bold text-gray-900">{course.price.toLocaleString()} FCFA</span>
                    {course.price > 0 && <span className="text-gray-400 line-through text-lg">{(course.price * 1.5).toLocaleString()} FCFA</span>}
                  </div>

                  <EnrollButton courseId={course.id} />

                  <p className="text-center text-xs text-gray-500 mt-4">Garantie satisfait ou remboursé de 30 jours</p>
                  
                  <div className="mt-8 space-y-4">
                    <h4 className="font-bold text-sm text-gray-900">Ce cours comprend :</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Clock className="w-4 h-4" /> <span>{course.duration} de vidéo à la demande</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <FileText className="w-4 h-4" /> <span>Articles et ressources</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Award className="w-4 h-4" /> <span>Certificat de fin de formation</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Shield className="w-4 h-4" /> <span>Accès illimité</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between gap-4">
                    <Button variant="outline" className="flex-1 gap-2 hover:bg-gray-50"><Share2 className="w-4 h-4" /> Partager</Button>
                    <Button variant="outline" className="flex-1 hover:bg-gray-50">Offrir</Button>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
