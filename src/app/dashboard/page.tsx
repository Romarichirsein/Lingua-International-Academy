import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BookOpen, Clock, PlayCircle, Trophy, ArrowRight } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?redirect=/dashboard");
  }

  // Get user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Get user enrollments with course data
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("*, courses(*)")
    .eq("user_id", user.id);

  // Get lesson progress
  const { data: progress } = await supabase
    .from("lesson_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("completed", true);

  // Get all courses for browsing
  const { data: allCourses } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true);

  const enrolledCourseIds = new Set((enrollments || []).map((e: { course_id: string }) => e.course_id));
  const unenrolledCourses = (allCourses || []).filter((c: { id: string }) => !enrolledCourseIds.has(c.id));
  const completedCount = (progress || []).length;

  const displayName = profile?.full_name || user.email?.split("@")[0] || "Étudiant";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-gray-50/50">

        {/* HEADER */}
        <section className="bg-white border-b border-gray-100 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Bonjour, {displayName} 👋
            </h1>
            <p className="text-gray-500">Voici un résumé de votre progression.</p>
          </div>
        </section>

        {/* STATS */}
        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{enrollments?.length || 0}</div>
                    <div className="text-sm text-gray-500">Cours inscrits</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{completedCount}</div>
                    <div className="text-sm text-gray-500">Leçons terminées</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{completedCount * 12} min</div>
                    <div className="text-sm text-gray-500">Temps d&apos;apprentissage</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MY COURSES */}
        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Mes cours</h2>

            {(!enrollments || enrollments.length === 0) ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Aucun cours pour le moment</h3>
                <p className="text-gray-500 mb-6">Explorez notre catalogue et inscrivez-vous à votre premier cours !</p>
                <Link href="/courses">
                  <Button>Explorer les cours <ArrowRight className="ml-2 w-4 h-4" /></Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrollments.map((enrollment: { course_id: string; courses: { id: string; title: string; image: string; instructor: string; category: string; duration: string } }) => {
                  const course = enrollment.courses;
                  if (!course) return null;

                  // Count completed lessons for this course
                  const courseProgress = (progress || []).filter((p: { course_id: string }) => p.course_id === course.id).length;

                  return (
                    <Link href={`/learn/${course.id}`} key={course.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="aspect-video relative overflow-hidden bg-gray-100">
                        <img src={course.image} alt={course.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <PlayCircle className="w-12 h-12 text-white" />
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{course.title}</h3>
                        <p className="text-sm text-gray-500 mb-3">{course.instructor}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">{courseProgress} leçons terminées</span>
                          <span className="text-xs font-medium text-gray-900">Continuer →</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* DISCOVER MORE */}
        {unenrolledCourses.length > 0 && (
          <section className="py-8 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Découvrir plus de cours</h2>
                <Link href="/courses" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                  Voir tout <ArrowRight className="inline w-4 h-4 ml-1" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {unenrolledCourses.slice(0, 4).map((course: { id: string; title: string; image: string; price: number; category: string }) => (
                  <Link href={`/courses/${course.id}`} key={course.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
                    <div className="aspect-video relative overflow-hidden bg-gray-100">
                      <img src={course.image} alt={course.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 text-sm line-clamp-2">{course.title}</h3>
                      <div className="mt-2 font-bold text-gray-900">{course.price} €</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </div>
  );
}
