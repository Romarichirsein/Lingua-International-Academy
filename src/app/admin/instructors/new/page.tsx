import { createInstructor } from "../actions";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, User, Camera, Globe, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function NewInstructorPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/admin/instructors" className="p-2 rounded-xl hover:bg-white border border-transparent hover:border-gray-200 transition-all text-gray-400 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nouveau Formateur</h1>
          <p className="text-gray-500">Ajoutez un expert à votre académie.</p>
        </div>
      </div>

      <form action={createInstructor} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* MAIN INFO */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5 text-gray-400" /> Informations Personnelles
            </h3>
            
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">Nom Complet</label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                placeholder="Ex: Dr. Jean Dupont"
              />
            </div>

            <div>
              <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-2">Spécialité / Titre</label>
              <input
                id="specialty"
                name="specialty"
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                placeholder="Ex: Expert en Intelligence Artificielle"
              />
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">Biographie</label>
              <textarea
                id="bio"
                name="bio"
                rows={6}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all resize-none"
                placeholder="Parlez-nous de son parcours et de son expertise..."
              ></textarea>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Camera className="w-5 h-5 text-gray-400" /> Photo de Profil
            </h3>
            <div>
              <label htmlFor="photo_url" className="block text-sm font-medium text-gray-700 mb-2">URL de la Photo</label>
              <input
                id="photo_url"
                name="photo_url"
                type="url"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                placeholder="https://images.unsplash.com/..."
              />
            </div>
          </div>
        </div>

        {/* SIDEBAR: SOCIAL LINKS */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-bold text-gray-900">Réseaux Sociaux</h3>
            
            <div className="space-y-4">
              <div className="relative">
                <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="linkedin"
                  type="url"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  placeholder="LinkedIn URL"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="twitter"
                  type="url"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  placeholder="Twitter URL"
                />
              </div>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="globe"
                  type="url"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  placeholder="Website URL"
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full h-14 rounded-2xl text-lg gap-2 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20">
            <Save className="w-5 h-5" /> Enregistrer le Profil
          </Button>
        </div>
      </form>
    </div>
  );
}
