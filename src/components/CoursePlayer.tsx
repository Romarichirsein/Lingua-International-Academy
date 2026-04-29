"use client";

import { useState, useEffect, useCallback } from "react";
import { PlayCircle, CheckCircle2, ChevronLeft, Menu, Award } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  youtube_id?: string;
  youtubeId?: string;
}

interface CoursePlayerProps {
  courseId: string;
  courseTitle: string;
  lessons: Lesson[];
}

export function CoursePlayer({ courseId, courseTitle, lessons }: CoursePlayerProps) {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const currentLesson = lessons[currentLessonIndex];
  const progress = Math.round((Object.keys(completedLessons).length / lessons.length) * 100);

  // Load progress from Supabase
  useEffect(() => {
    const loadProgress = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("lesson_progress")
        .select("lesson_id, completed")
        .eq("user_id", user.id)
        .eq("course_id", courseId)
        .eq("completed", true);

      if (data) {
        const loaded: Record<string, boolean> = {};
        data.forEach((p: { lesson_id: string }) => {
          loaded[p.lesson_id] = true;
        });
        setCompletedLessons(loaded);
      }
    };
    loadProgress();
  }, [courseId]);

  const saveProgress = useCallback(async (lessonId: string, completed: boolean) => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (completed) {
      await supabase.from("lesson_progress").upsert({
        user_id: user.id,
        lesson_id: lessonId,
        course_id: courseId,
        completed: true,
        completed_at: new Date().toISOString(),
      }, { onConflict: "user_id,lesson_id" });
    } else {
      await supabase
        .from("lesson_progress")
        .update({ completed: false, completed_at: null })
        .eq("user_id", user.id)
        .eq("lesson_id", lessonId);
    }
  }, [courseId]);

  const toggleCompletion = (lessonId: string) => {
    const newState = !completedLessons[lessonId];
    setCompletedLessons(prev => ({
      ...prev,
      [lessonId]: newState
    }));
    saveProgress(lessonId, newState);
  };

  const handleNext = () => {
    if (!completedLessons[currentLesson.id]) {
      toggleCompletion(currentLesson.id);
    }
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(prev => prev + 1);
    }
  };

  // Support both youtube_id (supabase) and youtubeId (mock)
  const getYoutubeId = (lesson: Lesson) => lesson.youtube_id || lesson.youtubeId || "vBvPzE2x-4o";

  return (
    <div className="flex h-screen bg-gray-50 flex-col md:flex-row overflow-hidden font-sans">
      
      {/* MOBILE HEADER */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <Link href={`/courses/${courseId}`} className="text-gray-500 hover:text-gray-900">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <span className="font-semibold text-gray-900 truncate px-4">{courseTitle}</span>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* SIDEBAR (CURRICULUM) */}
      <div className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
        fixed md:static inset-y-0 left-0 z-40 w-80 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out
      `}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-100 hidden md:block">
          <Link href={`/courses/${courseId}`} className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-4 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" /> Retour au cours
          </Link>
          <h2 className="font-bold text-lg text-gray-900 line-clamp-2">{courseTitle}</h2>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Progression</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-green-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        {/* Lesson List */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">Curriculum</h3>
            <div className="space-y-1">
              {lessons.map((lesson, index) => {
                const isActive = index === currentLessonIndex;
                const isCompleted = completedLessons[lesson.id];
                
                return (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      setCurrentLessonIndex(index);
                      if (window.innerWidth < 768) setSidebarOpen(false);
                    }}
                    className={`
                      w-full flex items-start text-left p-3 rounded-lg transition-colors
                      ${isActive ? 'bg-gray-900 text-white shadow-sm' : 'hover:bg-gray-50 text-gray-600'}
                    `}
                  >
                    <div className="mr-3 mt-0.5">
                      {isCompleted ? (
                        <CheckCircle2 className={`w-5 h-5 ${isActive ? 'text-green-400' : 'text-green-500'}`} />
                      ) : (
                        <PlayCircle className={`w-5 h-5 ${isActive ? 'text-gray-300' : 'text-gray-400'}`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-900'}`}>
                        {index + 1}. {lesson.title}
                      </div>
                      <div className={`text-xs mt-1 ${isActive ? 'text-gray-400' : 'text-gray-500'}`}>
                        {lesson.duration}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* OVERLAY FOR MOBILE */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full bg-gray-50">
        
        {/* Video Player Area */}
        <div className="w-full bg-black aspect-video md:aspect-auto md:flex-1 relative border-b border-gray-200 shadow-sm">
           <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${getYoutubeId(currentLesson)}?rel=0&modestbranding=1&autoplay=1`}
            title={currentLesson.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          ></iframe>
        </div>

        {/* Lesson Info Footer */}
        <div className="bg-white p-6 md:p-8 flex-shrink-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 z-10 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{currentLesson.title}</h1>
            <p className="text-gray-500 text-sm">Leçon {currentLessonIndex + 1} sur {lessons.length}</p>
          </div>
          
          <div className="flex w-full sm:w-auto items-center gap-3">
            {progress === 100 && (
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2 animate-bounce hover:animate-none"
                onClick={async () => {
                  try {
                    const { generateCertificate } = await import("@/app/learn/actions");
                    const { code } = await generateCertificate(courseId);
                    window.location.href = `/verify?code=${code}`;
                  } catch (err) {
                    alert("Erreur lors de la génération du certificat.");
                  }
                }}
              >
                <Award className="w-5 h-5" /> Obtenir mon Certificat
              </Button>
            )}
            
            <Button 
              variant="outline" 
              className={`flex-1 sm:flex-none ${completedLessons[currentLesson.id] ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800' : ''}`}
              onClick={() => toggleCompletion(currentLesson.id)}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              {completedLessons[currentLesson.id] ? 'Terminé' : 'Marquer comme terminé'}
            </Button>
            
            <Button 
              className="flex-1 sm:flex-none"
              onClick={handleNext}
              disabled={currentLessonIndex === lessons.length - 1}
            >
              Leçon suivante
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
