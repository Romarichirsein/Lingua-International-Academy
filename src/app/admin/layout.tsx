import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SidebarNav } from "@/components/admin/SidebarNav";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?redirect=/admin");
  }

  // Double check role in layout for extra security
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex flex-col md:flex-row bg-gray-50/50">
        <SidebarNav />
        <main className="flex-1 p-6 md:p-10">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
