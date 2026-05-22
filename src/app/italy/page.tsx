import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/FadeIn";
import { 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  Download, 
  FileText, 
  GraduationCap, 
  Languages, 
  Landmark, 
  Phone, 
  ShieldCheck,
  PlaneTakeoff,
  Clock,
  ExternalLink
} from "lucide-react";

export const metadata: Metadata = {
  title: "Étudier en Italie | Lingua International Academy",
  description: "Cours de langue et accompagnement complet pour votre procédure d'études en Italie. Dépôt de caution bancaire et démarches administratives simplifiés.",
};

export default function ItalyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 overflow-hidden">
        
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-br from-lingua-blue via-lingua-blue/90 to-lingua-red/20 py-20 md:py-32 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-60" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-lingua-green/10 rounded-full blur-3xl -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-lingua-red/10 rounded-full blur-3xl -ml-20 -mb-20" />
          
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn delay={0.1}>
                <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-1.5 text-sm text-white mb-8 shadow-sm">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-lingua-green mr-2 animate-pulse"></span>
                  Session Spéciale Italie 2026-2027
                </div>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
                  Étudiez et formez-vous en <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-lingua-red">Italie</span>
                </h1>
              </FadeIn>
              
              <FadeIn delay={0.3}>
                <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                  Bénéficiez de cours de langue italienne de qualité et d&apos;un accompagnement de A à Z dans votre procédure consulaire et universitaire. Nous facilitons le dépôt de la caution bancaire et toutes vos démarches.
                </p>
              </FadeIn>
              
              <FadeIn delay={0.4}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="https://wa.me/237677467766" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button size="lg" variant="lingua-red" className="w-full sm:w-auto group shadow-lg shadow-black/25">
                      <Phone className="mr-2 h-5 w-5" />
                      Contactez-nous sur WhatsApp
                    </Button>
                  </a>
                  <a href="/files/etudier-en-italie.pdf" download className="w-full sm:w-auto">
                    <Button size="lg" variant="lingua-outline" className="w-full sm:w-auto">
                      <Download className="mr-2 h-5 w-5 opacity-80" />
                      Télécharger la Brochure PDF
                    </Button>
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ITALIAN COLORS BAR */}
        <div className="flex h-2 w-full">
          <div className="flex-1 bg-lingua-green" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-lingua-red" />
        </div>

        {/* INTRODUCTION & PARTNERS */}
        <section className="py-12 bg-gray-50/50 border-b border-gray-100">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Votre réussite commence par un encadrement professionnel</h2>
              <p className="text-gray-600 leading-relaxed">
                Partir étudier en Italie requiert de la rigueur et une bonne préparation. À Lingua International Academy, nous ne nous contentons pas de vous enseigner l&apos;italien : nous vous guidons étape par étape, depuis le choix de votre programme universitaire jusqu&apos;à votre installation définitive.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* CORE SERVICES GRID */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-16 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Un Accompagnement à 360°</h2>
                <p className="text-gray-500">De l&apos;apprentissage de la langue italienne jusqu&apos;à votre premier jour sur le campus.</p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Languages,
                  title: "Cours de Langue Italienne",
                  desc: "Préparation intensive de niveau A1 à B2 pour réussir votre test de langue et suivre sereinement vos cours universitaires.",
                  color: "text-lingua-green bg-lingua-green/5",
                },
                {
                  icon: Landmark,
                  title: "Caution Bancaire Facilitée",
                  desc: "Assistance complète et sécurisée pour la constitution et le dépôt de la caution bancaire (compte bloqué) requis pour le visa.",
                  color: "text-lingua-blue bg-lingua-blue/5",
                },
                {
                  icon: FileText,
                  title: "Démarches Administratives",
                  desc: "Gestion de votre dossier sur la plateforme Universitaly, traduction légalisée, équivalences et demande de visa consulaire.",
                  color: "text-lingua-red bg-lingua-red/5",
                },
                {
                  icon: PlaneTakeoff,
                  title: "Intégration et Installation",
                  desc: "Aide à la recherche de logement, souscription à l&apos;assurance santé, et obtention du permis de séjour (Permesso di soggiorno).",
                  color: "text-yellow-600 bg-yellow-50",
                },
              ].map((service, idx) => (
                <FadeIn key={service.title} delay={0.1 * idx}>
                  <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col group">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${service.color} mb-6 transition-transform duration-300 group-hover:scale-110`}>
                      <service.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed flex-grow">{service.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* STEP BY STEP TIMELINE */}
        <section className="py-20 md:py-32 bg-gray-50/50 border-y border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Notre Processus de Candidature</h2>
                <p className="text-gray-500">Un parcours clair, transparent et balisé pour assurer votre départ.</p>
              </div>
            </FadeIn>

            <div className="relative border-l-2 border-lingua-blue/20 ml-4 md:ml-32 py-4">
              {[
                {
                  step: "01",
                  title: "Inscription & Début des Cours d&apos;Italien",
                  desc: "Apprenez les bases de la langue italienne et préparez les certifications officielles (CILS, CELI, PLIDA) requises par les universités.",
                },
                {
                  step: "02",
                  title: "Choix du Programme & Pré-inscription",
                  desc: "Sélection des universités et des cours appropriés, puis soumission de votre dossier de pré-inscription sur la plateforme Universitaly.",
                },
                {
                  step: "03",
                  title: "Caution Bancaire & Formalités Financières",
                  desc: "Accompagnement dans la mise en place de la caution bancaire (garantie financière) exigée pour la délivrance du visa étudiant.",
                },
                {
                  step: "04",
                  title: "Demande de Visa & Préparatifs de Départ",
                  desc: "Rassemblement des pièces justificatives, simulation d&apos;entretien consulaire et dépôt de la demande de visa d&apos;études.",
                },
              ].map((item, idx) => (
                <FadeIn key={item.step} delay={0.1 * idx}>
                  <div className="relative mb-12 ml-6 md:ml-12">
                    <div className="absolute -left-[35px] md:-left-[59px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-lingua-blue text-white text-xs font-bold ring-4 ring-white">
                      {item.step}
                    </div>
                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* WHY STUDY IN ITALY DETAILS */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <FadeIn>
              <h2 className="text-3xl font-bold text-center mb-12">Pourquoi choisir l&apos;Italie pour vos études ?</h2>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FadeIn delay={0.1}>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-lingua-green shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Universités Historiques de Prestige</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">L&apos;Italie abrite certaines des plus anciennes et prestigieuses universités du monde (Bologne, Sapienza de Rome, Polytechnique de Milan).</p>
                  </div>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-lingua-green shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Frais de Scolarité Accessibles</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">Les frais universitaires publics sont parmi les plus bas d&apos;Europe, calculés en fonction des revenus familiaux, avec de nombreuses bourses disponibles.</p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-lingua-green shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Opportunités de Bourses Régionales</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">Possibilité d&apos;obtenir des bourses d&apos;études régionales couvrant la totalité des frais d&apos;inscription et offrant une allocation annuelle ainsi que le logement gratuit.</p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-lingua-green shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Style de Vie &amp; Richesse Culturelle</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">Vivez au cœur de l&apos;art, de la mode, de la gastronomie et de l&apos;histoire tout en préparant un diplôme reconnu dans toute l&apos;Union Européenne.</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION BOARD */}
        <section className="py-20 bg-lingua-blue text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-lingua-red/10 rounded-full blur-3xl -ml-48 -mb-48" />
          
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center z-10">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Votre avenir en Italie commence ici.</h2>
              <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                Ne laissez pas les démarches complexes gâcher votre projet d&apos;études. Contactez notre équipe de conseillers dès maintenant pour démarrer votre procédure.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 max-w-2xl mx-auto mb-10">
                <h3 className="text-xl font-bold text-white mb-6">Nos Infolines / Contacts Directs</h3>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <a href="https://wa.me/237677467766" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-white text-lingua-blue hover:bg-gray-100 px-6 py-4 rounded-2xl transition-colors font-bold flex-1">
                    <Phone className="w-5 h-5 text-lingua-green" />
                    Cameroun: 00237 677 46 77 66
                  </a>
                  <a href="https://wa.me/393296598964" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-white text-lingua-blue hover:bg-gray-100 px-6 py-4 rounded-2xl transition-colors font-bold flex-1">
                    <Phone className="w-5 h-5 text-lingua-green" />
                    Italie: 0039 329 659 8964
                  </a>
                </div>
                <div className="mt-6 flex flex-col items-center justify-center gap-4">
                  <a 
                    href="https://www.linguainternationalacademytraining.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium text-sm transition-colors group"
                  >
                    <span>Visiter le portail officiel</span>
                    <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/files/etudier-en-italie.pdf" download className="inline-flex items-center gap-2 bg-lingua-red text-white hover:bg-lingua-red/90 px-6 py-3 rounded-full font-semibold transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Télécharger la fiche d&apos;information (PDF)</span>
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
