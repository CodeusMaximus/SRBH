
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { LanguageProvider } from "./components/LanguageContext";

import "./globals.css";

import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import BookingProvider from "./components/BookingProvider";

const SITE_URL = "https://srnpp.com";
const SITE_NAME = "Solid Rock Behavioral Health";

const siteTitle =
  "Solid Rock Behavioral Health | Psychiatric Care & Mental Health";

const siteDescription =
  "Find compassionate, personalized psychiatric and behavioral health care at Solid Rock Behavioral Health. Explore mental health services and take the next step toward getting support.";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  applicationName: SITE_NAME,

  title: {
    default: siteTitle,
    template: `%s | ${SITE_NAME}`,
  },

  description: siteDescription,

  category: "healthcare",

  authors: [{ name: SITE_NAME }],

  creator: SITE_NAME,
  publisher: SITE_NAME,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: siteTitle,
    description: siteDescription,
  },

  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-screen">
          <LanguageProvider>
            <BookingProvider>
              <Navbar />

              <main id="main-content">
                {children}
              </main>

              <Footer />
            </BookingProvider>
          </LanguageProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
