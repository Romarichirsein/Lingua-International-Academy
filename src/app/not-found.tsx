import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-md">
          <div className="text-8xl font-bold text-gray-200 mb-4">404</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page introuvable</h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Désolé, la page que vous cherchez n&apos;existe pas ou a été déplacée.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button size="lg">
                <Home className="w-4 h-4 mr-2" /> Retour à l&apos;accueil
              </Button>
            </Link>
            <Link href="/courses">
              <Button size="lg" variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" /> Voir les cours
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
