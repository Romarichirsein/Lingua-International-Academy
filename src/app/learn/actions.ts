"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function generateCertificate(courseId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Non autorisé");

  // Check if certificate already exists
  const { data: existing } = await supabase
    .from("certificates")
    .select("certificate_code")
    .eq("user_id", user.id)
    .eq("course_id", courseId)
    .single();

  if (existing) return { code: existing.certificate_code };

  // Generate a unique code: CERT-YEAR-RANDOM
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 10).toUpperCase();
  const certificate_code = `CERT-${year}-${random}`;

  const { error } = await supabase.from("certificates").insert({
    user_id: user.id,
    course_id: courseId,
    certificate_code,
  });

  if (error) {
    console.error("Error generating certificate:", error);
    throw new Error(error.message);
  }

  revalidatePath(`/learn/${courseId}`);
  revalidatePath("/dashboard");
  
  return { code: certificate_code };
}
