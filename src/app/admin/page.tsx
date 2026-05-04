import { createClient } from "@/lib/supabase/server";
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  DollarSign,
  ArrowUpRight,
  Clock
} from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch some basic stats
  const { count: usersCount } = await supabase.from("profiles").select("*", { count: "exact", head: true });
  const { count: coursesCount } = await supabase.from("courses").select("*", { count: "exact", head: true });
  const { count: enrollmentsCount } = await supabase.from("enrollments").select("*", { count: "exact", head: true });

  const stats = [
    {
      title: "Total Étudiants",
      value: usersCount || 0,
      icon: Users,
      change: "+12%",
      trend: "up",
      color: "blue",
    },
    {
      title: "Cours Actifs",
      value: coursesCount || 0,
      icon: BookOpen,
      change: "+2",
      trend: "up",
      color: "purple",
    },
    {
      title: "Inscriptions",
      value: enrollmentsCount || 0,
      icon: TrendingUp,
      change: "+25%",
      trend: "up",
      color: "green",
    },
    {
      title: "Revenus (Est.)",
      value: "1 250 000 FCFA",
      icon: DollarSign,
      change: "+8%",
      trend: "up",
      color: "amber",
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Vue d&apos;ensemble</h1>
        <p className="text-gray-500 text-lg">Bienvenue dans votre espace d&apos;administration.</p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-${stat.color}-50`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.title}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* RECENT ACTIVITY */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400" /> Activité Récente
          </h2>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-4 pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center font-bold text-xs">
                  JD
                </div>
                <div>
                  <p className="text-sm text-gray-900 font-medium">
                    Nouvel étudiant inscrit : <span className="font-bold">Jean Dupont</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Il y a 2 heures • Cours : Project Management</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Actions Rapides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="p-4 rounded-2xl border border-dashed border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-all text-left group">
              <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <p className="font-bold text-gray-900 text-sm">Nouveau Cours</p>
              <p className="text-xs text-gray-500 mt-1">Ajouter un programme</p>
            </button>
            <button className="p-4 rounded-2xl border border-dashed border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-all text-left group">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <p className="font-bold text-gray-900 text-sm">Gérer Étudiants</p>
              <p className="text-xs text-gray-500 mt-1">Liste et permissions</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
