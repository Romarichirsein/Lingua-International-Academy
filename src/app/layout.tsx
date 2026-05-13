import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeProvider";
import { JobOffersPopup } from "@/components/home/JobOffersPopup";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lingua International Academy",
  description: "Apprenez de nouvelles langues avec les meilleurs experts mondiaux. Cours en ligne, certifications reconnues et communauté internationale.",
  keywords: ["langues", "apprentissage", "formation en ligne", "certification", "e-learning"],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${outfit.variable} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider>
          {children}
          <JobOffersPopup />
        </ThemeProvider>
      </body>
    </html>
  );
}
