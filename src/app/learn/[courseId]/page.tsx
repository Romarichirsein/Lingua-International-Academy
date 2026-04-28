import { MOCK_COURSES } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { CoursePlayer } from "@/components/CoursePlayer";

// Simulation de leçons pour le mock
const MOCK_LESSONS = [
  { id: "l1", title: "Introduction et présentation", duration: "05:20", youtubeId: "vBvPzE2x-4o" },
  { id: "l2", title: "Les concepts fondamentaux", duration: "12:45", youtubeId: "9o4v0GjE49o" },
  { id: "l3", title: "Installation des outils de travail", duration: "08:15", youtubeId: "4bZJ_a6w23M" },
  { id: "l4", title: "Votre premier projet pas à pas", duration: "25:30", youtubeId: "TPrnSACiTJ4" },
  { id: "l5", title: "Optimisation et bonnes pratiques", duration: "15:10", youtubeId: "vBvPzE2x-4o" },
  { id: "l6", title: "Conclusion et prochaines étapes", duration: "04:50", youtubeId: "9o4v0GjE49o" },
];

export default async function LearnPage({ params }: { params: { courseId: string } }) {
  // Await params for Next.js 15
  const resolvedParams = await params;
  const course = MOCK_COURSES.find(c => c.id === resolvedParams.courseId);

  if (!course) {
    notFound();
  }

  // En production, on récupérerait les vraies leçons depuis la BDD
  return <CoursePlayer courseId={course.id} courseTitle={course.title} lessons={MOCK_LESSONS} />;
}
