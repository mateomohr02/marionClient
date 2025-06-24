import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = {
    Home: (await import(`../messages/${locale}/home.json`)).default,
    About: (await import(`../messages/${locale}/about.json`)).default,
    Profile: (await import(`../messages/${locale}/profile.json`)).default,
    Navbar: (await import(`../messages/${locale}/navbar.json`)).default,
    Cursos: (await import(`../messages/${locale}/cursos.json`)).default,
    Blog: (await import(`../messages/${locale}/blog.json`)).default,
    Lessons: (await import(`../messages/${locale}/lessons.json`)).default,
  };

  return {
    locale,
    messages,
  };
});
