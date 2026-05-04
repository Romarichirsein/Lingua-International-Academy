import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { MOCK_COURSES, CATEGORIES } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/server";
import { FadeIn } from "@/components/animations/FadeIn";
import { Search, Clock, BookOpen, User } from "lucide-react";
import Link from "next/link";

async function getCourses() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return MOCK_COURSES;
    }
    return data;
  } catch {
    return MOCK_COURSES;
  }
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-gray-50/50">
        
        {/* HEADER SECTION */}
        <section className="bg-white border-b border-gray-100 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Explorez nos programmes</h1>
              <p className="text-lg text-gray-500 max-w-2xl mb-8">
                Découvrez notre sélection de cours dispensés par des experts de l'industrie. Filtrez par catégorie pour trouver la formation qui correspond à vos objectifs.
              </p>
            </FadeIn>
            
            {/* SEARCH AND FILTER */}
            <FadeIn delay={0.1}>
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors sm:text-sm"
                    placeholder="Rechercher un cours, une compétence..."
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat, index) => (
                  <Button 
                    key={cat} 
                    variant={index === 0 ? "default" : "outline"} 
                    className={index === 0 ? "bg-gray-900 text-white" : "text-gray-600 bg-white"}
                    size="sm"
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* COURSE GRID */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {courses.map((course: { id: string; title: string; image: string; category: string; duration: string; level: string; instructor: string; price: number }, idx: number) => (
                <FadeIn key={course.id} delay={0.1 * (idx + 1)}>
                  <Link href={`/courses/${course.id}`} className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                    
                    {/* IMAGE CONTAINER */}
                    <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-800 shadow-sm">
                          {course.category}
                        </span>
                      </div>
                    </div>

                    {/* CONTENT CONTAINER */}
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
                          <User className="w-4 h-4 mr-2" />
                          {course.instructor}
                        </div>
                        <div className="font-bold text-gray-900 text-lg">
                          {course.price.toLocaleString()} FCFA
                        </div>
                      </div>
                    </div>
                  </Link>
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
