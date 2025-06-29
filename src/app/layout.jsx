import { StoreProvider } from "@/redux/store/StoreProvider";
import { getTranslations } from 'next-intl/server';
import { getMessages, getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

import Alert from "@/components/Alert";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import "@/app/globals.css";

import { Dancing_Script, Poppins } from "next/font/google";

export async function generateMetadata({ params }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'Metadata' });

  return {
    title: { default: t("Title"), template:`%s - ${t("Title")}` },
    description: t('Description'),
  };
}

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dancing-script", // Se define la variable CSS
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <StoreProvider>
      <html lang={locale}>
        <body
          className={`${dancingScript.variable} ${poppins.variable} antialiased`}
        >
          <NextIntlClientProvider messages={messages}>
            <Alert />
            <NavBar />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
