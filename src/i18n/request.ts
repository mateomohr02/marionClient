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
  };

  return {
    locale,
    messages,
  };
});
