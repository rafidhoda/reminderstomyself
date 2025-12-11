import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Reminders to myself",
    template: "%s | Reminders to myself",
  },
  description: "A collection of reminders I've written over the years By Rafid Hoda.",
  keywords: ["reminders", "wisdom", "life lessons", "personal growth", "mindfulness", "Rafid Hoda"],
  authors: [{ name: "Rafid Hoda" }],
  creator: "Rafid Hoda",
  alternates: {
    canonical: "https://reminderstomyself.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://reminderstomyself.com",
    siteName: "Reminders to myself",
    title: "Reminders to myself",
    description: "A collection of reminders I've written over the years By Rafid Hoda.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reminders to myself",
    description: "A collection of reminders I've written over the years By Rafid Hoda.",
    creator: "@rafidhoda",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          strategy="afterInteractive"
          src="https://plausible.io/js/pa-1gja0ON-w2GflPJNA_ygU.js"
        />
        <Script
          strategy="afterInteractive"
          id="plausible-init"
          dangerouslySetInnerHTML={{
            __html: `
              window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
              plausible.init()
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
