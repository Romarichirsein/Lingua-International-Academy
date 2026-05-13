"use client";

import { useState, useEffect } from "react";
import {
  X,
  Briefcase,
  MapPin,
  Clock,
  Calendar,
  Send,
  GraduationCap,
  Users,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Mail,
} from "lucide-react";

const jobOffers = [
  {
    id: 1,
    title: "Enseignant(e) de langue Italienne",
    icon: GraduationCap,
    color: "lingua-green",
    colorHex: "#006837",
    description:
      "Enseigner la langue italienne à des apprenants variés (débutants à avancés) dans le cadre des cours réguliers et éventuellement en ateliers thématiques. Préparer les supports pédagogiques, évaluer les progrès des élèves et adapter les méthodes d'enseignement selon les besoins.",
    location: "Yaoundé - Cameroun",
    contract: "CDD ou Freelance, à temps partiel 10h à 15h / semaine",
    profile: [
      "Excellence pédagogique et connaissance approfondie de la culture italienne.",
      "Diplôme pertinent en langues ou pédagogie, expérience appréciée.",
      "Bonne maîtrise du français et/ou anglais; capacité à travailler en équipe.",
    ],
    salary: "Selon expérience et grille interne",
    deadline: "30 Mai 2026",
  },
  {
    id: 2,
    title: "Deux Agents Commerciaux",
    icon: Users,
    color: "lingua-blue",
    colorHex: "#004A99",
    description:
      "Prospecter, développer et fidéliser un portefeuille clients, présenter les produits et services, atteindre les objectifs de vente mensuels et trimestriels, assurer le suivi commercial et le reporting.",
    location: "Yaoundé - Cameroun",
    contract: "CDD / Temps partiel, selon le profil",
    profile: [
      "Expérience commerciale avérée, idéalement dans le secteur éducatif ou services B2B.",
      "Excellentes aptitudes relationnelles, esprit entrepreneurial et capacité à travailler de manière autonome.",
      "Maîtrise des techniques de vente et négociation; bonne communication en français et anglais; une langue locale peut être un plus.",
    ],
    salary: "Fixe + commissions basée sur les objectifs; avantages éventuels",
    deadline: "30 Mai 2026",
  },
];

export function JobOffersPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if the popup was already dismissed in this session
    const dismissed = sessionStorage.getItem("jobPopupDismissed");
    if (!dismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setTimeout(() => setIsAnimating(true), 10);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsOpen(false);
      sessionStorage.setItem("jobPopupDismissed", "true");
    }, 300);
  };

  const toggleJob = (id: number) => {
    setExpandedJob(expandedJob === id ? null : id);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-300 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 ${
          isAnimating
            ? "scale-100 translate-y-0"
            : "scale-95 translate-y-8"
        }`}
      >
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-br from-[#004A99] via-[#003775] to-[#002855] px-6 py-8 sm:px-8 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#E31E24]/10 rounded-full -ml-16 -mb-16" />
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-white/20 rounded-full" />
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-white/15 rounded-full" />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:rotate-90 group z-10"
            aria-label="Fermer"
          >
            <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          {/* Header content */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-white/90 mb-4 border border-white/10">
              <Briefcase className="w-4 h-4" />
              Recrutement en cours
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              Offres d&apos;emploi chez{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E31E24] to-[#ff6b6b]">
                Le Modenais
              </span>
            </h2>
            <p className="text-white/70 mt-2 text-sm sm:text-base">
              Rejoignez notre équipe dynamique et passionnée !
            </p>
          </div>
        </div>

        {/* Job listings */}
        <div className="bg-white overflow-y-auto max-h-[calc(90vh-200px)] custom-scrollbar">
          <div className="p-6 sm:p-8 space-y-4">
            {jobOffers.map((job) => {
              const IconComponent = job.icon;
              const isExpanded = expandedJob === job.id;

              return (
                <div
                  key={job.id}
                  className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? "border-[var(--job-color)] shadow-lg"
                      : "border-gray-100 hover:border-gray-200 hover:shadow-md"
                  }`}
                  style={
                    {
                      "--job-color": job.colorHex,
                    } as React.CSSProperties
                  }
                >
                  {/* Job header - always visible */}
                  <button
                    onClick={() => toggleJob(job.id)}
                    className="w-full p-5 flex items-center gap-4 text-left hover:bg-gray-50/50 transition-colors"
                  >
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${job.colorHex}15` }}
                    >
                      <IconComponent
                        className="w-6 h-6"
                        style={{ color: job.colorHex }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-tight">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-3 mt-1.5">
                        <span className="inline-flex items-center text-xs text-gray-500">
                          <MapPin className="w-3 h-3 mr-1" />
                          {job.location}
                        </span>
                        <span className="inline-flex items-center text-xs text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          Avant le {job.deadline}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {/* Expanded content */}
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isExpanded
                        ? "max-h-[600px] opacity-100"
                        : "max-h-0 opacity-0"
                    } overflow-hidden`}
                  >
                    <div className="px-5 pb-5 space-y-4 border-t border-gray-100 pt-4">
                      {/* Description */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                          Description du poste
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {job.description}
                        </p>
                      </div>

                      {/* Contract */}
                      <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
                        <Clock
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          style={{ color: job.colorHex }}
                        />
                        <div>
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Contrat
                          </span>
                          <p className="text-sm text-gray-700 font-medium">
                            {job.contract}
                          </p>
                        </div>
                      </div>

                      {/* Profile */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                          Profil recherché
                        </h4>
                        <ul className="space-y-2">
                          {job.profile.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-gray-600"
                            >
                              <span
                                className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5"
                                style={{ backgroundColor: job.colorHex }}
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Salary */}
                      <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
                        <Briefcase
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          style={{ color: job.colorHex }}
                        />
                        <div>
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Rémunération
                          </span>
                          <p className="text-sm text-gray-700 font-medium">
                            {job.salary}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* How to apply section */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100/80 rounded-2xl p-5 sm:p-6 border border-gray-200/60">
              <div className="flex items-center gap-2 mb-4">
                <Send className="w-5 h-5 text-[#E31E24]" />
                <h3 className="font-bold text-gray-900 text-base">
                  Comment postuler ?
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Envoyez votre <strong>CV</strong> et{" "}
                <strong>lettre de motivation</strong> via l&apos;un des canaux
                suivants :
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/237677467766"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb855] text-white font-semibold py-3 px-5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                  <span className="font-normal text-white/80 text-xs hidden sm:inline">
                    00237 677467766
                  </span>
                </a>
                <a
                  href="mailto:lemodenaisgroupe@gmail.com"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#004A99] hover:bg-[#003775] text-white font-semibold py-3 px-5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Email
                  <span className="font-normal text-white/80 text-xs hidden sm:inline">
                    lemodenaisgroupe@gmail.com
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-100 px-6 py-4 sm:px-8 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Date limite : <strong className="text-gray-600">30 Mai 2026</strong>
          </p>
          <button
            onClick={handleClose}
            className="text-sm font-medium text-gray-500 hover:text-gray-700 px-4 py-2 rounded-full hover:bg-gray-100 transition-all"
          >
            Fermer
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
}
