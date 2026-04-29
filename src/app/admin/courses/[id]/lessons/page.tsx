import { createClient } from "@/lib/supabase/server";
import { 
  Plus, 
  ArrowLeft, 
  GripVertical, 
  PlayCircle, 
  Clock, 
  Trash2,
  Edit,
  Save,
  Book
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { addLesson } from "../../lessons-actions";

export default async function AdminLessonsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const supabase = await createClient();

  // Fetch course details
  const { data: course } = await supabase
    .from("courses")
    .select("title")
    .eq("id", resolvedParams.id)
    .single();

  if (!course) notFound();

  // Fetch lessons
  const { data: lessons } = await supabase
    .from("lessons")
    .select("*")
    .eq("course_id", resolvedParams.id)
    .order("sort_order", { ascending: true });

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/admin/courses" className="p-2 rounded-xl hover:bg-white border border-transparent hover:border-gray-200 transition-all text-gray-400 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 line-clamp-1">{course.title}</h1>
          <p className="text-gray-500">Gestion du curriculum et des leçons par chapitres.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LIST OF LESSONS */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Book className="w-5 h-5 text-blue-600" /> Curriculum Actuel
            </h2>
            
            {(!lessons || lessons.length === 0) ? (
              <div className="py-20 text-center">
                <PlayCircle className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500">Aucune leçon pour le moment. Utilisez le formulaire à droite pour commencer.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Group by section */}
                {Array.from(new Set(lessons.map(l => l.section_name || "Introduction"))).map(section => (
                  <div key={section} className="space-y-3">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider px-2">{section}</h3>
                    <div className="space-y-2">
                      {lessons.filter(l => (l.section_name || "Introduction") === section).map((lesson, idx) => (
                        <div key={lesson.id} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-50 hover:border-gray-200 hover:bg-gray-50/50 transition-all group bg-white">
                          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                            {idx + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 text-sm truncate">{lesson.title}</h3>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="flex items-center text-xs text-gray-500"><Clock className="w-3 h-3 mr-1" /> {lesson.duration}</span>
                              <span className="flex items-center text-xs text-gray-400 font-mono">ID: {lesson.youtube_id}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 rounded-lg hover:bg-white text-gray-400 hover:text-red-600 transition-all">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ADD LESSON FORM */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-green-600" /> Ajouter une leçon
            </h2>
            
            <form action={addLesson} className="space-y-4">
              <input type="hidden" name="course_id" value={resolvedParams.id} />
              
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Nom du Chapitre (Section)</label>
                <input
                  name="section_name"
                  type="text"
                  required
                  placeholder="Ex: Les Fondamentaux"
                  className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Titre de la leçon</label>
                <input
                  name="title"
                  type="text"
                  required
                  placeholder="Ex: Introduction au cours"
                  className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">ID Vidéo YouTube</label>
                  <input
                    name="youtube_id"
                    type="text"
                    required
                    placeholder="Ex: vBvPzE2x-4o"
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Durée (min:sec)</label>
                  <input
                    name="duration"
                    type="text"
                    required
                    placeholder="Ex: 12:45"
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Ordre d&apos;affichage</label>
                <input
                  name="sort_order"
                  type="number"
                  defaultValue={lessons?.length || 0}
                  className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                />
              </div>

              <Button type="submit" className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 gap-2 mt-4">
                <Save className="w-4 h-4" /> Enregistrer la leçon
              </Button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
