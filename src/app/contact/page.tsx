import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/FadeIn";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 overflow-hidden">
        <section className="bg-white py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <FadeIn>
                <div className="text-center mb-16">
                  <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">Contactez-nous</h1>
                  <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                    Une question, un partenariat ou besoin d'aide ? Notre équipe vous répond sous 24 heures.
                  </p>
                </div>
              </FadeIn>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                {/* CONTACT FORM */}
                <div className="lg:col-span-3">
                  <FadeIn delay={0.2} direction="right">
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                          <input id="firstName" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors" placeholder="Votre prénom" />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                          <input id="lastName" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors" placeholder="Votre nom" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input id="email" type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors" placeholder="vous@exemple.com" />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
                        <input id="subject" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors" placeholder="Comment pouvons-nous vous aider ?" />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                        <textarea id="message" rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors resize-none" placeholder="Décrivez votre demande en détail..." />
                      </div>
                      <Button size="lg" className="w-full sm:w-auto">Envoyer le message</Button>
                    </form>
                  </FadeIn>
                </div>

                {/* CONTACT INFO */}
                <div className="lg:col-span-2 space-y-8">
                  <FadeIn delay={0.3} direction="left">
                    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                      <h3 className="font-bold text-gray-900 mb-6">Informations</h3>
                      <div className="space-y-6">
                        <div className="flex items-start">
                          <Mail className="w-5 h-5 text-gray-400 mr-4 mt-0.5 shrink-0" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">Email</div>
                            <div className="text-sm text-gray-500">linguainternationalacademy@gmail.com</div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Phone className="w-5 h-5 text-gray-400 mr-4 mt-0.5 shrink-0" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">Téléphones</div>
                            <div className="text-sm text-gray-500">
                              Yaoundé: +237 677 46 77 66<br />
                              Italie: +39 329 659 8964<br />
                              Bulgarie: +359 88 509 2445
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <MapPin className="w-5 h-5 text-gray-400 mr-4 mt-0.5 shrink-0" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">Adresses</div>
                            <div className="text-sm text-gray-500">
                              Adresse 1: Quartier Fouda Yaoundé<br />
                              Adresse 2: Budapestha 80, 1202, Sofia
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.4} direction="left">
                    <div className="bg-gray-900 text-white rounded-2xl p-8">
                      <h3 className="font-bold mb-3">Partenariat entreprise ?</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        Vous souhaitez former vos équipes ? Contactez notre service dédié aux entreprises pour une offre sur mesure.
                      </p>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
