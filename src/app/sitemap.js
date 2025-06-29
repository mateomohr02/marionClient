export default async function sitemap() {
  const baseUrl = process.env.NEXT_CLIENT_PUBLIC_BASE_URL;
  const now = new Date().toISOString(); // Fecha actual

  // Obtener cursos
  const resCourses = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/courses/get-all-courses`, {
    cache: 'no-store',
  });

  if (!resCourses.ok) throw new Error('Error al obtener los cursos');

  const courses = await resCourses.json();

  // Obtener posts
  const resPosts = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/blog/get-all-posts?limit=1000&offset=0`, {
    cache: 'no-store',
  });

  if (!resPosts.ok) throw new Error('Error al obtener los posts');

  const postsResponse = await resPosts.json();
  const posts = postsResponse.data || [];

  // Construir entradas del sitemap
  const courseUrls = courses.flatMap((course) => {
    const courseBase = `${baseUrl}/courses/${course.slug}`;

    return [
      { url: courseBase, lastModified: now },
      { url: `${courseBase}/checkout`, lastModified: now },
    ];
  });

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/community/${post.slug}`,
    lastModified: now,
  }));

  return [
    { url: `${baseUrl}/courses`, lastModified: now },
    { url: `${baseUrl}/community`, lastModified: now },
    { url: `${baseUrl}/failure`, lastModified: now },
    { url: `${baseUrl}/success`, lastModified: now },
    { url: `${baseUrl}/pending`, lastModified: now },
    { url: `${baseUrl}/login`, lastModified: now },
    { url: `${baseUrl}/register`, lastModified: now },
    ...courseUrls,
    ...postUrls,
  ];
}
