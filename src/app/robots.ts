import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/auth/", "/learn/"],
    },
    sitemap: "https://lingua-international-academy.vercel.app/sitemap.xml",
  };
}
