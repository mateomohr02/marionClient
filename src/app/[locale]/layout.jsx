import { StoreProvider } from "@/redux/store/StoreProvider";

import { getMessages, getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

import Alert from "@/components/Alert";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import "@/app/globals.css";

import { Dancing_Script, Poppins } from "next/font/google";

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

export const metadata = {
  title:{default: "Partera Marion", template:"%s - Partera Marion"},
  description:"Cursos sobre embarazo, parto y posparto diseñados para brindarte contención, información confiable y preparación emocional.",
  twitter: {
    card:"summary_large_image"
  }
};

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
