'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ChevronDown, Globe } from 'lucide-react';
import { useState } from 'react';

const locales = [
  { code: 'es', label: 'Español', flag: 'https://flagcdn.com/w20/es.png' },
  { code: 'de', label: 'Deutsch', flag: 'https://flagcdn.com/w20/de.png' }
];

const LocaleSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [open, setOpen] = useState(false);

  const switchTo = locales.find((l) => l.code !== currentLocale);
  const current = locales.find((l) => l.code === currentLocale);

  const handleSelect = () => {
  document.cookie = `preferredLocale=${switchTo.code}; path=/; max-age=31536000`;
  const newPath = pathname.replace(`/${currentLocale}`, `/${switchTo.code}`);
  router.push(newPath);
  setOpen(false);
};

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 text-base font-medium text-gradient bg-clip-text bg-gradient-to-r from-gradientLeft to-gradientRight text-transparent"
      >
        <Globe className="text-gradientLeft" />
        <span className="font-dancing text-3xl text-gradient relative before:absolute before:left-1/2 before:bottom-0 before:h-[2px] before:w-0 before:bg-gradient-to-r before:from-gradientLeft before:to-gradientRight before:transition-all before:duration-300 before:ease-out hover:before:w-full hover:before:left-0">
          {currentLocale === 'es' ? 'Idioma' : 'Sprache'}
        </span>
        <ChevronDown
          className={`text-gradientLeft transform translate-y-1 transition-all ease-in-out duration-300 ${
            open ? 'rotate-90' : 'rotate-0'
          }`}
        />
      </button>

      {open && (
        <ul className="w-full absolute z-50 text-center overflow-hidden text-xl">
          <li
            onClick={handleSelect}
            className="py-2 flex justify-center items-center gap-2 font-poppins text-xl text-gradient relative before:absolute before:left-1/2 before:bottom-0 before:h-[2px] before:w-0 before:bg-gradient-to-r before:from-gradientLeft before:to-gradientRight before:transition-all before:duration-300 before:ease-out hover:before:w-full hover:before:left-0 cursor-pointer"
          >
            <img
              src={switchTo.flag}
              alt={`Bandera ${switchTo.code}`}
              className="w-5 h-4 object-cover"
            />
            {switchTo.label}
          </li>
        </ul>
      )}
    </div>
  );
};

export default LocaleSwitcher;
