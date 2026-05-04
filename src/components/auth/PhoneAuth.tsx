"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { Phone, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function PhoneAuth({ redirectTo = "/dashboard" }: { redirectTo?: string }) {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      });
      if (error) throw error;
      setStep(2);
    } catch (err: any) {
      setError(err.message || "Impossible d'envoyer le code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
      const { error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: code,
        type: 'sms',
      });
      if (error) throw error;
      router.push(redirectTo);
    } catch (err: any) {
      setError(err.message || "Code invalide.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">Ou avec votre numéro</span>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {step === 1 ? (
        <form onSubmit={handleSendCode} className="space-y-4">
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors"
                placeholder="+237 600 000 000"
              />
            </div>
          </div>
          <Button type="submit" variant="outline" className="w-full h-12" disabled={isLoading}>
            {isLoading ? "Envoi en cours..." : "Recevoir un code SMS"}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-center">Code de validation (6 chiffres)</label>
            <input
              type="text"
              required
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-3 text-center tracking-widest text-xl font-bold rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors"
              placeholder="123456"
            />
          </div>
          <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
            {isLoading ? "Vérification..." : "Valider le code"}
          </Button>
          <button 
            type="button" 
            onClick={() => setStep(1)} 
            className="w-full text-center text-sm text-gray-500 hover:text-gray-900"
          >
            Changer de numéro
          </button>
        </form>
      )}
    </div>
  );
}
