"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { 
  ShieldCheck, 
  Search, 
  XCircle, 
  Calendar, 
  User, 
  BookOpen,
  Download,
  Share2
} from "lucide-react";

export default function VerificationPage() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "valid" | "invalid">("idle");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<Record<string, any> | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;

    setStatus("loading");
    const supabase = createClient();

    const { data: certificate, error } = await supabase
      .from("certificates")
      .select(`
        *,
        profiles:user_id(full_name),
        courses:course_id(title, image)
      `)
      .eq("certificate_code", code.trim())
      .single();

    if (error || !certificate) {
      setStatus("invalid");
      setData(null);
    } else {
      setStatus("valid");
      setData(certificate);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-20 flex flex-col items-center">
        <div className="max-w-2xl w-full text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 mb-8 shadow-inner">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Vérification de Certificat</h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Saisissez le code unique présent sur votre certificat pour vérifier son authenticité et la validité de la formation suivie.
          </p>
        </div>

        {/* SEARCH BOX */}
        <div className="max-w-xl w-full bg-white p-2 rounded-2xl border border-gray-100 shadow-xl mb-12">
          <form onSubmit={handleVerify} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Ex: CERT-XXXX-XXXX"
                className="w-full pl-12 pr-4 py-4 rounded-xl text-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              />
            </div>
            <Button type="submit" disabled={status === "loading"} className="px-8 h-14 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-lg">
              {status === "loading" ? "Vérification..." : "Vérifier"}
            </Button>
          </form>
        </div>

        {/* RESULTS */}
        {status === "valid" && data && (
          <div className="max-w-2xl w-full bg-white rounded-3xl border-2 border-green-500 shadow-2xl shadow-green-500/10 p-10 animate-in fade-in zoom-in duration-300">
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <p className="text-green-600 font-bold text-sm uppercase tracking-wider">Certificat Authentique</p>
                  <p className="text-gray-500 text-sm">Vérifié officiellement par Lingua Academy</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-xl"><Download className="w-4 h-4" /></Button>
                <Button variant="outline" size="icon" className="rounded-xl"><Share2 className="w-4 h-4" /></Button>
              </div>
            </div>

            <div className="space-y-6 text-left pt-6 border-t border-gray-100">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Titulaire du Certificat</p>
                  <p className="text-xl font-bold text-gray-900">{data.profiles.full_name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50">
                <BookOpen className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Formation Complétée</p>
                  <p className="text-lg font-bold text-gray-900">{data.courses.title}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Date d&apos;émission</p>
                    <p className="font-bold text-gray-900">{new Date(data.issued_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50">
                  <ShieldCheck className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Code Unique</p>
                    <p className="font-mono font-bold text-gray-900">{data.certificate_code}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {status === "invalid" && (
          <div className="max-w-xl w-full bg-white rounded-3xl border-2 border-red-100 p-10 text-center animate-in fade-in slide-in-from-top-4 duration-300">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Code Invalide</h3>
            <p className="text-gray-500">
              Ce code de certificat ne correspond à aucun enregistrement dans notre base de données. Veuillez vérifier le code et réessayer.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
