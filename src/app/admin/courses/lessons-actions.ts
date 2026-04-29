"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addLesson(formData: FormData) {
  const supabase = await createClient();

  const course_id = formData.get("course_id") as string;
  const title = formData.get("title") as string;
  const youtube_id = formData.get("youtube_id") as string;
  const duration = formData.get("duration") as string;
  const section_name = formData.get("section_name") as string || "Introduction";
  const sort_order = parseInt(formData.get("sort_order") as string) || 0;

  // Simple ID generation
  const id = `${course_id}-${title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "")}`;

  const { error } = await supabase.from("lessons").insert({
    id,
    course_id,
    title,
    youtube_id,
    duration,
    section_name,
    sort_order,
  });

  if (error) {
    console.error("Error adding lesson:", error);
    throw new Error(error.message);
  }

  revalidatePath(`/admin/courses/${course_id}/lessons`);
  revalidatePath(`/courses/${course_id}`);
}
