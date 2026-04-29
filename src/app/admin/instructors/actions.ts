"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createInstructor(formData: FormData) {
  const supabase = await createClient();

  const full_name = formData.get("full_name") as string;
  const specialty = formData.get("specialty") as string;
  const bio = formData.get("bio") as string;
  const photo_url = formData.get("photo_url") as string;
  
  const social_links = {
    twitter: formData.get("twitter") as string,
    linkedin: formData.get("linkedin") as string,
    globe: formData.get("globe") as string,
  };

  const { error } = await supabase.from("instructors").insert({
    full_name,
    specialty,
    bio,
    photo_url,
    social_links,
  });

  if (error) {
    console.error("Error creating instructor:", error);
    throw new Error(error.message);
  }

  revalidatePath("/admin/instructors");
  revalidatePath("/instructors");
  redirect("/admin/instructors");
}
