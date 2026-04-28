import { MOCK_COURSES } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { CoursePlayer } from "@/components/CoursePlayer";

const MOCK_LESSONS = [
  { id: "l1", title: "Introduction et présentation", duration: "05:20", youtubeId: "vBvPzE2x-4o" },
  { id: "l2", title: "Les concepts fondamentaux", duration: "12:45", youtubeId: "9o4v0GjE49o" },
  { id: "l3", title: "Installation des outils de travail", duration: "08:15", youtubeId: "4bZJ_a6w23M" },
  { id: "l4", title: "Votre premier projet pas à pas", duration: "25:30", youtubeId: "TPrnSACiTJ4" },
  { id: "l5", title: "Optimisation et bonnes pratiques", duration: "15:10", youtubeId: "vBvPzE2x-4o" },
  { id: "l6", title: "Conclusion et prochaines étapes", duration: "04:50", youtubeId: "9o4v0GjE49o" },
];

async function getCourseAndLessons(courseId: string) {
  try {
    const supabase = await createClient();
    
    // Get course
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("*")
      .eq("id", courseId)
      .single();

    if (courseError || !course) {
      // Fallback to mock
      const mockCourse = MOCK_COURSES.find(c => c.id === courseId);
      if (!mockCourse) return null;
      return { course: mockCourse, lessons: MOCK_LESSONS };
    }

    // Get lessons
    const { data: lessons, error: lessonsError } = await supabase
      .from("lessons")
      .select("*")
      .eq("course_id", courseId)
      .order("sort_order", { ascending: true });

    if (lessonsError || !lessons || lessons.length === 0) {
      return { course, lessons: MOCK_LESSONS };
    }

    return { course, lessons };
  } catch {
    const mockCourse = MOCK_COURSES.find(c => c.id === courseId);
    if (!mockCourse) return null;
    return { course: mockCourse, lessons: MOCK_LESSONS };
  }
}

export default async function LearnPage({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = await params;
  const result = await getCourseAndLessons(resolvedParams.courseId);

  if (!result) {
    notFound();
  }

  return <CoursePlayer courseId={result.course.id} courseTitle={result.course.title} lessons={result.lessons} />;
}
