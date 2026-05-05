import { createClient } from "@/lib/supabase/server";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Mail, 
  Globe,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default async function AdminInstructorsPage() {
  const supabase = await createClient();

  const { data: instructors } = await supabase
    .from("instructors")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lingua-blue to-lingua-red mb-2">Gestion des Formateurs</h1>
          <p className="text-gray-500">Gérez les profils des enseignants de votre académie.</p>
        </div>
        <Link href="/admin/instructors/new">
          <Button size="lg" variant="lingua-blue" className="h-12 px-6 rounded-2xl gap-2 shadow-lg shadow-lingua-blue/20">
            <Plus className="w-5 h-5" /> Nouveau Formateur
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Formateur</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Spécialité</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Réseaux</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {instructors?.map((instructor) => (
                <tr key={instructor.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-100 relative">
                        <Image src={instructor.photo_url} alt="" fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{instructor.full_name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">Inscrit le {new Date(instructor.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-gray-600 font-medium">{instructor.specialty}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex gap-2">
                      {instructor.social_links?.linkedin && <ExternalLink className="w-4 h-4 text-lingua-blue" />}
                      {instructor.social_links?.twitter && <Mail className="w-4 h-4 text-lingua-red" />}
                      {instructor.social_links?.globe && <Globe className="w-4 h-4 text-lingua-green" />}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
