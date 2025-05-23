import Error from "./components/Error";
import "./globals.css";

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
  title: "Error: 404",
  description: "Partera Marion: Not found",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body className={`${dancingScript.variable} ${poppins.variable} antialiased`}>
          {children}
        </body>
      </html>

  );
}
