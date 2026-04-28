import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Award, Star } from "lucide-react";

const instructors = [
  { name: "Sarah Jenkins", specialty: "Business & Management", bio: "15 ans d&apos;expérience en gestion de projets chez Google et Amazon.", rating: 4.9, students: 3200 },
  { name: "Michael Chen", specialty: "Finance & Comptabilité", bio: "Ancien analyste chez Goldman Sachs, MBA de Harvard Business School.", rating: 4.8, students: 2800 },
  { name: "Elena Rostova", specialty: "Design 3D & Animation", bio: "Artiste 3D primée, a travaillé sur des productions pour Disney et Pixar.", rating: 4.9, students: 1900 },
  { name: "David Rodriguez", specialty: "Vente & Marketing", bio: "Fondateur de 3 startups, expert en stratégies de croissance B2B/B2C.", rating: 4.7, students: 4100 },
  { name: "Aïsha Mbeki", specialty: "Langues & Linguistique", bio: "Polyglotte (7 langues), docteure en sciences du langage, Sorbonne.", rating: 5.0, students: 5600 },
  { name: "James O&apos;Brien", specialty: "Développement Web", bio: "Senior Engineer chez Vercel, contributeur open-source reconnu.", rating: 4.8, students: 3400 },
];

export default function InstructorsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="bg-white py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Nos professeurs d&apos;exception
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Chaque instructeur est un expert reconnu dans son domaine, sélectionné pour sa pédagogie et son expérience terrain.
            </p>
          </div>
        </section>

        <section className="pb-20 md:pb-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {instructors.map((instructor) => (
                <div key={instructor.name} className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mr-4 border-2 border-gray-100">
                      <img src={`https://ui-avatars.com/api/?name=${instructor.name.replace(/'/g, '').replace(' ', '+')}&background=random&color=fff&size=128`} alt={instructor.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{instructor.name}</h3>
                      <p className="text-sm text-gray-500">{instructor.specialty}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">{instructor.bio}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      {instructor.rating}
                    </div>
                    <div className="flex items-center">
                      <Award className="w-4 h-4 text-gray-400 mr-1" />
                      {instructor.students.toLocaleString()} étudiants
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
