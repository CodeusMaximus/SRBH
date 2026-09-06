import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import BookingProvider from "./components/BookingProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solid Rock Behavioral Health",
  description:
    "Compassionate, personalized psychiatric care.",
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
        <body>
          <BookingProvider>
            <Navbar />

            {children}

            <Footer />
          </BookingProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}