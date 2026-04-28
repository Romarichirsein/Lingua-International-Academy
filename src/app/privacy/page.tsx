import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="bg-white py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">Politique de confidentialité</h1>
            <p className="text-sm text-gray-400 mb-12">Dernière mise à jour : 15 avril 2026</p>

            <div className="prose prose-gray max-w-none space-y-8">
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">1. Collecte des données</h2>
                <p className="text-gray-600 leading-relaxed">
                  Nous collectons uniquement les données nécessaires au bon fonctionnement de nos services : nom, prénom, adresse email, progression dans les cours, et données de paiement (traitées par nos prestataires certifiés PCI-DSS). Aucune donnée n&apos;est collectée sans votre consentement explicite.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">2. Utilisation des données</h2>
                <p className="text-gray-600 leading-relaxed">
                  Vos données sont utilisées exclusivement pour : la gestion de votre compte, la personnalisation de votre expérience d&apos;apprentissage, l&apos;envoi de communications relatives à vos cours (avec votre accord), et l&apos;amélioration continue de nos services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">3. Protection des données</h2>
                <p className="text-gray-600 leading-relaxed">
                  Nous utilisons des mesures de sécurité conformes aux standards de l&apos;industrie : chiffrement TLS 1.3, stockage sécurisé des mots de passe (bcrypt), et audits de sécurité réguliers. Nos serveurs sont hébergés dans l&apos;Union Européenne conformément au RGPD.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">4. Cookies</h2>
                <p className="text-gray-600 leading-relaxed">
                  Nous utilisons des cookies strictement nécessaires au fonctionnement du site (authentification, préférences de thème). Les cookies analytiques ne sont activés qu&apos;avec votre consentement. Vous pouvez gérer vos préférences à tout moment.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">5. Vos droits</h2>
                <p className="text-gray-600 leading-relaxed">
                  Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits, contactez-nous à privacy@linguaacademy.com.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">6. Contact</h2>
                <p className="text-gray-600 leading-relaxed">
                  Pour toute question concernant notre politique de confidentialité, écrivez à : privacy@linguaacademy.com ou par courrier : Lingua International Academy, 12 Rue de la Paix, 75002 Paris, France.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
