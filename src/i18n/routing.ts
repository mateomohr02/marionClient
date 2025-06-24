import { NextRequest } from 'next/server';

export const routing = {
  locales: ['es', 'de'],
  defaultLocale: 'es',
  getLocale: (request: NextRequest): string => {
    const cookieHeader = request.headers.get('cookie');
    const cookies = Object.fromEntries(
      (cookieHeader || '')
        .split(';')
        .map((c) => c.trim().split('='))
        .filter(([k, v]) => k && v)
    );

    const preferred = cookies['preferredLocale'];
    if (preferred === 'de' || preferred === 'es') {
      return preferred;
    }

    const acceptLanguage = request.headers.get('accept-language');
    const userLang = acceptLanguage?.split(',')[0] || 'es';

    if (userLang.startsWith('de')) {
      return 'de';
    }

    return 'es';
  }
};
