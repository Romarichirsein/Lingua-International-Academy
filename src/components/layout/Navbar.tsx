"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X, Sun, Moon, User, LogOut, Settings } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const navLinks = [
  { href: "/courses", label: "Nos Cours" },
  { href: "/methodology", label: "Méthodologie" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();
        setIsAdmin(profile?.role === "admin");
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();
        setIsAdmin(profile?.role === "admin");
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setDropdownOpen(false);
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <Globe className="h-6 w-6 text-gray-900" />
          <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
            Lingua Academy
          </Link>
        </div>
        
        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-gray-900 transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

          {/* AUTH BUTTONS */}
          <div className="hidden md:flex gap-3 items-center">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold">
                    {(user.user_metadata?.full_name || user.email || "U").charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[120px] truncate">
                    {user.user_metadata?.full_name || user.email?.split("@")[0]}
                  </span>
                </button>

                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-gray-100 shadow-xl z-50 py-2">
                      {isAdmin && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <Settings className="w-4 h-4" /> Dashboard Admin
                        </Link>
                      )}
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <User className="w-4 h-4" /> Mon Dashboard
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" /> Déconnexion
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">Connexion</Button>
                </Link>
                <Link href="/auth/register">
                  <Button>Commencer</Button>
                </Link>
              </>
            )}
          </div>
          
          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 py-2 text-sm font-medium transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-gray-100 my-2" />
            {user ? (
              <>
                {isAdmin && (
                  <Link href="/admin" onClick={() => setMobileOpen(false)}>
                    <Button variant="ghost" className="justify-start w-full font-bold">Dashboard Admin</Button>
                  </Link>
                )}
                <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="justify-start w-full">Mon Dashboard</Button>
                </Link>
                <Button variant="ghost" className="justify-start text-red-600 w-full" onClick={handleSignOut}>
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="justify-start w-full">Connexion</Button>
                </Link>
                <Link href="/auth/register" onClick={() => setMobileOpen(false)}>
                  <Button className="justify-center w-full">Commencer</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
