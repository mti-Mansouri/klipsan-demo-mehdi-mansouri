import type { Metadata } from "next";
import NavBar from "@/components/navBar";
import Footer from "@/components/footer";
import localfont from "next/font/local";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const bebas = localfont({
  src: [
    {
      path: "../../public/fonts/BebasNeue-Regular.ttf",
      weight: "400",
      style: "normal",
    }
  ],
  variable: "--font-bebas",
})
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "mehdi-mansouri-klipsan",
  description: "resume of mehdi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
    className={bebas.variable}
    >
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
