import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/FadeIn";
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
      <main className="flex-1 overflow-hidden">
        <section className="bg-white py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <FadeIn>
              <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lingua-blue to-lingua-red mb-6 tracking-tight">
                Rejoignez l&apos;aventure Lingua
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                Nous construisons la plateforme d&apos;apprentissage de demain. Rejoignez une équipe passionnée qui transforme l&apos;éducation.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="pb-20 md:pb-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <FadeIn>
              <h2 className="text-2xl font-bold mb-8">Postes ouverts</h2>
            </FadeIn>
            <div className="space-y-4">
              {jobs.map((job, idx) => (
                <FadeIn key={job.title} delay={0.1 * idx}>
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold mb-1">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center"><Briefcase className="w-3.5 h-3.5 mr-1 text-lingua-blue" />{job.department}</span>
                        <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-lingua-red" />{job.location}</span>
                        <span className="bg-lingua-green/10 text-lingua-green px-2 py-0.5 rounded-full text-xs font-medium">{job.type}</span>
                      </div>
                    </div>
                    <Link href="/contact">
                      <Button variant="lingua-outline" size="sm" className="hover:bg-lingua-blue hover:text-white">Postuler</Button>
                    </Link>
                  </div>
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
