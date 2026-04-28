"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    const redirectUrl = (formData.get("redirect") as string) || "/dashboard";
    redirect(`/auth/login?error=${encodeURIComponent(error.message)}&redirect=${encodeURIComponent(redirectUrl)}`);
  }

  const redirectUrl = (formData.get("redirect") as string) || "/dashboard";
  revalidatePath("/", "layout");
  redirect(redirectUrl);
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        full_name: formData.get("full_name") as string,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect(`/auth/register?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect("/dashboard?welcome=true");
}

export async function signout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
