import { createClient } from "@/lib/supabase/server";
import { 
  Plus, 
  ArrowLeft, 
  GripVertical, 
  PlayCircle, 
  Clock, 
  Trash2,
  Edit
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/courses" className="p-2 rounded-xl hover:bg-white border border-transparent hover:border-gray-200 transition-all text-gray-400 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 line-clamp-1">{course.title}</h1>
          <p className="text-gray-500">Gestion du curriculum et des leçons.</p>
        </div>
        <Button className="h-12 px-6 rounded-2xl gap-2">
          <Plus className="w-5 h-5" /> Ajouter une leçon
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Curriculum</h2>
        
        {(!lessons || lessons.length === 0) ? (
          <div className="py-20 text-center">
            <PlayCircle className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500">Aucune leçon pour le moment. Commencez par en ajouter une !</p>
          </div>
        ) : (
          <div className="space-y-3">
            {lessons.map((lesson, index) => (
              <div key={lesson.id} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-50 hover:border-gray-200 hover:bg-gray-50/50 transition-all group">
                <div className="cursor-grab text-gray-300 group-hover:text-gray-400">
                  <GripVertical className="w-5 h-5" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm truncate">{lesson.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center text-xs text-gray-500"><Clock className="w-3 h-3 mr-1" /> {lesson.duration}</span>
                    <span className="flex items-center text-xs text-gray-400 font-mono">ID: {lesson.youtube_id}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-white text-gray-400 hover:text-gray-900 transition-all">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white text-gray-400 hover:text-red-600 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
