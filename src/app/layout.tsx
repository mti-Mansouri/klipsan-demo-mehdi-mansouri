import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import NavBar from "@/components/navBar";
import Footer from "@/components/footer";
import localfont from "next/font/local";
import { CartProvider } from "@/context/cart-context";
import CartLoadingModal from "@/components/cart-loading-modal";
import { BackendStatusProvider } from "@/context/backend-status-context";
import { AuthProvider } from "@/context/auth-context";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const bebas = localfont({
  src: [
    {
      path: "../../public/fonts/BebasNeue-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-bebas",
});
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
    <html lang="en" className={bebas.variable}>
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <BackendStatusProvider>
            <CartProvider>
              <NavBar />
              {children}
              <Footer />
              <CartLoadingModal />
            </CartProvider>
          </BackendStatusProvider>
        </AuthProvider>

        <Analytics />
      </body>
    </html>
  );
}
