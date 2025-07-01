import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "../components/Providers";
import Link from "next/link";
import Script from "next/script";
import type { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GreenSpace - Strain Tracker",
  description: "Track your favorite marijuana strains with GreenSpace.",
  icons: {
    icon: '/favicon.ico',
    apple: '/greenspacelogo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Load saved theme preference early to avoid FOUC */}
        <Script id="theme-loader" strategy="beforeInteractive">
          {`(function(){try{if(localStorage.getItem('darkMode')==='true'){document.documentElement.classList.add('dark');}}catch(e){}})();`}
        </Script>
        <Providers>
          <nav className="flex gap-6 p-4 border-b border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-950 dark:border-green-700 items-center justify-between px-6">
            <div className="flex items-center gap-2">
              <img src="/greenspacelogo.png" alt="GreenSpace Logo" className="w-6 h-6" />
              <span className="text-lg font-bold text-green-800">GreenSpace</span>
            </div>
            <div className="flex gap-6">
              <Link href="/" className="text-green-700 hover:text-green-900 transition-colors font-medium">Home</Link>
              <Link href="/greenspace" className="text-green-700 hover:text-green-900 transition-colors font-medium">My Greenspace</Link>
              <Link href="/settings" className="text-green-700 hover:text-green-900 transition-colors font-medium">Account Settings</Link>
            </div>
          </nav>
          {children}
        </Providers>
      </body>
    </html>
  );
}
