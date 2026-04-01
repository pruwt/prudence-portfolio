import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const generalSans = localFont({
  src: [
    {
      path: "../../public/fonts/GeneralSans-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeneralSans-VariableItalic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

export const metadata = {
  title: "Prudence Theuri — Product Designer",
  description: "Portfolio of Prudence Theuri, product designer focused on thoughtful digital experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={generalSans.variable}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
