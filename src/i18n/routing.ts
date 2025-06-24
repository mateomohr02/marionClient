import { NextRequest } from 'next/server';

export const routing = {
  locales: ['es', 'de'],
  defaultLocale: 'es',
  getLocale: (request: NextRequest): string => {
    const acceptLanguage = request.headers.get('accept-language');
    const userLang = acceptLanguage?.split(',')[0] || 'es';

    if (userLang.startsWith('de')) {
      return 'de';
    }
    return 'es';
  },
};
