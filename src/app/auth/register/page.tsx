import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { signup } from "@/app/auth/actions";
import Link from "next/link";
import { Globe, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { PhoneAuth } from "@/components/auth/PhoneAuth";

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  const error = params?.error;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-16 px-4 bg-gray-50/50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-8">
            {/* HEADER */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-900 text-white mb-4">
                <Globe className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Créer un compte</h1>
              <p className="text-sm text-gray-500">Rejoignez plus de 12 000 étudiants</p>
            </div>

            {/* ERROR */}
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* SOCIAL AUTH */}
            <SocialAuthButtons />

            <PhoneAuth />

            <div className="relative mt-6 mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Ou avec votre email</span>
              </div>
            </div>

            {/* FORM */}
            <form className="space-y-5">
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors"
                  placeholder="Jean Dupont"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors"
                  placeholder="vous@exemple.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors"
                  placeholder="Minimum 6 caractères"
                />
              </div>
              <Button formAction={signup} className="w-full h-12 text-base">
                Créer mon compte
              </Button>
            </form>

            {/* FOOTER */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Déjà un compte ?{" "}
              <Link href="/auth/login" className="font-medium text-gray-900 hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
