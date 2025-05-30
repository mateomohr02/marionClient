import { StoreProvider } from "../../../redux/store/StoreProvider";
import Alert from "../components/Alert";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import "../globals.css";

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
  title: "Partera Marion",
  description: "Formaciones diseñadas especialmente para acompañarte en cada etapa del embarazo: desde la gestación, hasta el posparto.",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={`${dancingScript.variable} ${poppins.variable} antialiased`}
        > 
          <Alert/>
          <NavBar />
          {children}
          <Footer />
        </body>
      </html>
    </StoreProvider>
  );
}
