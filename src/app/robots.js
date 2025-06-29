export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/profile",
          "/courses/*/lessons",
          "/courses/*/lessons/forum",
          "/courses/*/lessons/forum/*",
        ],
      },
    ],
    sitemap: `${process.env.NEXT_CLIENT_PUBLIC_BASE_URL}/sitemap.xml`,
  };
}
