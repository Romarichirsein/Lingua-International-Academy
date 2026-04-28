import { createCourse } from "../actions";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Image as ImageIcon, Video } from "lucide-react";
import Link from "next/link";

export default function NewCoursePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/admin/courses" className="p-2 rounded-xl hover:bg-white border border-transparent hover:border-gray-200 transition-all text-gray-400 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nouveau Cours</h1>
          <p className="text-gray-500">Créez une nouvelle formation pour vos étudiants.</p>
        </div>
      </div>

      <form action={createCourse} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* MAIN INFO */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Titre du cours</label>
              <input
                id="title"
                name="title"
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                placeholder="Ex: Maîtrisez le Design 3D avec Blender"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                id="description"
                name="description"
                rows={5}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none"
                placeholder="Décrivez les objectifs et le contenu du cours..."
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="instructor" className="block text-sm font-medium text-gray-700 mb-2">Instructeur</label>
                <input
                  id="instructor"
                  name="instructor"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                  placeholder="Nom du professeur"
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Prix (€)</label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                  placeholder="0 pour gratuit"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Video className="w-5 h-5 text-gray-400" /> Contenu Média
            </h3>
            <div>
              <label htmlFor="youtube_id" className="block text-sm font-medium text-gray-700 mb-2">ID Vidéo YouTube (Présentation)</label>
              <input
                id="youtube_id"
                name="youtube_id"
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                placeholder="Ex: vBvPzE2x-4o"
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">URL de l&apos;image de couverture</label>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    id="image"
                    name="image"
                    type="url"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-300">
                  <ImageIcon className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR INFO */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-bold text-gray-900">Paramètres</h3>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
              <select
                id="category"
                name="category"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              >
                <option value="Business">Business</option>
                <option value="Finance">Finance</option>
                <option value="Vente">Vente</option>
                <option value="Design 3D">Design 3D</option>
                <option value="Langues">Langues</option>
                <option value="Développement">Développement</option>
              </select>
            </div>

            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">Niveau</label>
              <select
                id="level"
                name="level"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              >
                <option value="Débutant">Débutant</option>
                <option value="Intermédiaire">Intermédiaire</option>
                <option value="Avancé">Avancé</option>
              </select>
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">Durée estimée</label>
              <input
                id="duration"
                name="duration"
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                placeholder="Ex: 4 semaines"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-sm font-medium text-gray-700">Publier immédiatement</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="is_published" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
              </label>
            </div>
          </div>

          <Button type="submit" className="w-full h-14 rounded-2xl text-lg gap-2 shadow-xl shadow-gray-900/10">
            <Save className="w-5 h-5" /> Enregistrer le cours
          </Button>
        </div>
      </form>
    </div>
  );
}
