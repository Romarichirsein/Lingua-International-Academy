import { createClient } from "@/lib/supabase/server";
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Eye,
  CheckCircle2,
  XCircle,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default async function AdminCoursesPage() {
  const supabase = await createClient();

  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lingua-blue to-lingua-red mb-2">Gestion des Cours</h1>
          <p className="text-gray-500">Gérez votre catalogue de formations.</p>
        </div>
        <Link href="/admin/courses/new">
          <Button size="lg" variant="lingua-blue" className="h-12 px-6 rounded-2xl gap-2 shadow-lg shadow-lingua-blue/20">
            <Plus className="w-5 h-5" /> Nouveau Cours
          </Button>
        </Link>
      </div>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Rechercher un cours..." 
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-100 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-lingua-blue transition-all"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select className="bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lingua-blue flex-1 md:flex-none">
            <option>Toutes les catégories</option>
            <option>Business</option>
            <option>Design</option>
          </select>
          <select className="bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lingua-blue flex-1 md:flex-none">
            <option>Tous les statuts</option>
            <option>Publié</option>
            <option>Brouillon</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Cours</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Catégorie</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Prix</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {courses?.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 relative">
                        <Image src={course.image} alt="" fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm line-clamp-1">{course.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{course.instructor}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {course.category}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-lingua-blue">
                    {course.price.toLocaleString()} FCFA
                  </td>
                  <td className="px-6 py-5">
                    {course.is_published ? (
                      <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-lingua-green/10 text-lingua-green">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Publié
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-lingua-red/10 text-lingua-red">
                        <XCircle className="w-3.5 h-3.5" /> Brouillon
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/admin/courses/${course.id}/lessons`} className="p-2 rounded-lg hover:bg-white border border-transparent hover:border-gray-200 transition-all text-gray-400 hover:text-gray-900" title="Gérer les leçons">
                        <BookOpen className="w-4 h-4" />
                      </Link>
                      <Link href={`/courses/${course.id}`} target="_blank" className="p-2 rounded-lg hover:bg-white border border-transparent hover:border-gray-200 transition-all text-gray-400 hover:text-gray-900" title="Voir le cours">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button className="p-2 rounded-lg hover:bg-white border border-transparent hover:border-gray-200 transition-all text-gray-400 hover:text-gray-900">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-white border border-transparent hover:border-red-100 transition-all text-gray-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
