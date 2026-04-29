"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCourse(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const instructor_id = formData.get("instructor_id") as string;
  const price = parseInt(formData.get("price") as string);
  const category = formData.get("category") as string;
  const duration = formData.get("duration") as string;
  const level = formData.get("level") as string;
  const youtube_id = formData.get("youtube_id") as string;
  const image = formData.get("image") as string;
  const is_published = formData.get("is_published") === "on";

  // Generate a simple ID from the title
  const id = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "");

  const { error } = await supabase.from("courses").insert({
    id,
    title,
    description,
    instructor_id,
    price,
    category,
    duration,
    level,
    youtube_id,
    image,
    is_published,
  });

  if (error) {
    console.error("Error creating course:", error);
    throw new Error(error.message);
  }

  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  redirect("/admin/courses");
}
