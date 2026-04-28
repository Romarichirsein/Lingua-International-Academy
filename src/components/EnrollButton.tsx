"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";

export function EnrollButton({ courseId }: { courseId: string }) {
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const check = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      setIsLoggedIn(true);

      const { data } = await supabase
        .from("enrollments")
        .select("id")
        .eq("user_id", user.id)
        .eq("course_id", courseId)
        .single();

      setEnrolled(!!data);
      setLoading(false);
    };

    check();
  }, [courseId]);

  const handleEnroll = async () => {
    setEnrolling(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      window.location.href = `/auth/login?redirect=/courses/${courseId}`;
      return;
    }

    await supabase.from("enrollments").insert({
      user_id: user.id,
      course_id: courseId,
    });

    setEnrolled(true);
    setEnrolling(false);
  };

  if (loading) {
    return (
      <Button className="w-full h-12" size="lg" disabled>
        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Chargement...
      </Button>
    );
  }

  if (enrolled) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-center gap-2 text-green-600 text-sm font-medium py-2">
          <CheckCircle2 className="w-5 h-5" /> Vous êtes inscrit
        </div>
        <Link href={`/learn/${courseId}`} className="block">
          <Button className="w-full h-12 text-base" size="lg">
            Accéder au cours
          </Button>
        </Link>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <Link href={`/auth/login?redirect=/courses/${courseId}`} className="block">
        <Button className="w-full h-12 text-base" size="lg">
          Se connecter pour s&apos;inscrire
        </Button>
      </Link>
    );
  }

  return (
    <Button
      className="w-full h-12 text-base"
      size="lg"
      onClick={handleEnroll}
      disabled={enrolling}
    >
      {enrolling ? (
        <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Inscription...</>
      ) : (
        "S'inscrire au cours"
      )}
    </Button>
  );
}
