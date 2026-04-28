import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase } from "lucide-react";
import Link from "next/link";

const jobs = [
  { title: "Développeur Full-Stack Senior", department: "Ingénierie", location: "Paris / Remote", type: "CDI" },
  { title: "Designer UX/UI", department: "Produit", location: "Paris", type: "CDI" },
  { title: "Content Manager - Langues", department: "Contenu", location: "Remote", type: "CDI" },
  { title: "Customer Success Manager", department: "Support", location: "Paris / Remote", type: "CDI" },
  { title: "Data Analyst", department: "Data", location: "Remote", type: "CDI" },
];

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="bg-white py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Rejoignez l&apos;aventure Lingua
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Nous construisons la plateforme d&apos;apprentissage de demain. Rejoignez une équipe passionnée qui transforme l&apos;éducation.
            </p>
          </div>
        </section>

        <section className="pb-20 md:pb-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Postes ouverts</h2>
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.title} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center"><Briefcase className="w-3.5 h-3.5 mr-1" />{job.department}</span>
                      <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" />{job.location}</span>
                      <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium">{job.type}</span>
                    </div>
                  </div>
                  <Link href="/contact">
                    <Button variant="outline" size="sm">Postuler</Button>
                  </Link>
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
