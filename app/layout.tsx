import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/store/AppProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
  preload: false,
  fallback: ["Georgia", "Cambria", "Times New Roman", "Times", "serif"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
  preload: false,
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export const metadata: Metadata = {
  title: "AURELIA — Atelier & Dining Room Management",
  description:
    "Haute gastronomy operational suite for menu, cart, cellar and live order management.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${playfair.variable} ${jakarta.variable} bg-background font-body-md text-on-surface antialiased selection:bg-primary selection:text-on-primary`}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
