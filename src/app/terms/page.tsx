import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="bg-white py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">Conditions d&apos;utilisation</h1>
            <p className="text-sm text-gray-400 mb-12">Dernière mise à jour : 15 avril 2026</p>

            <div className="prose prose-gray max-w-none space-y-8">
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">1. Acceptation des conditions</h2>
                <p className="text-gray-600 leading-relaxed">
                  En accédant à Lingua International Academy, vous acceptez d&apos;être lié par les présentes conditions d&apos;utilisation. Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser nos services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">2. Inscription et compte</h2>
                <p className="text-gray-600 leading-relaxed">
                  Vous devez fournir des informations exactes lors de votre inscription. Vous êtes responsable de la confidentialité de vos identifiants de connexion. Toute activité effectuée depuis votre compte est sous votre responsabilité.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">3. Propriété intellectuelle</h2>
                <p className="text-gray-600 leading-relaxed">
                  L&apos;ensemble des contenus (vidéos, textes, images, exercices) est la propriété exclusive de Lingua International Academy ou de ses instructeurs partenaires. Toute reproduction, distribution ou modification non autorisée est strictement interdite.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">4. Accès aux cours</h2>
                <p className="text-gray-600 leading-relaxed">
                  L&apos;achat d&apos;un cours vous donne un accès personnel et non transférable au contenu. L&apos;accès est valable à vie pour les cours achetés individuellement. Les abonnements donnent accès aux contenus pendant la durée de l&apos;abonnement actif.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">5. Remboursement</h2>
                <p className="text-gray-600 leading-relaxed">
                  Nous offrons une garantie satisfait ou remboursé de 30 jours à compter de la date d&apos;achat. Passé ce délai, aucun remboursement ne sera accordé. Pour les abonnements, la résiliation prend effet à la fin de la période en cours.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">6. Limitation de responsabilité</h2>
                <p className="text-gray-600 leading-relaxed">
                  Lingua International Academy ne garantit pas de résultat spécifique. Les contenus sont fournis à titre éducatif. Nous ne sommes pas responsables des décisions professionnelles ou personnelles prises sur la base de nos formations.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">7. Droit applicable</h2>
                <p className="text-gray-600 leading-relaxed">
                  Les présentes conditions sont régies par le droit français. Tout litige sera soumis aux tribunaux compétents de Paris, France.
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
