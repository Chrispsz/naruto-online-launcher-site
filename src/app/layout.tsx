import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { JsonLd } from "@/components/json-ld";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  style: "italic",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://naruto-online-launcher-site.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Naruto Online Launcher — Native Flash on Linux & Windows",
  titleTemplate: "%s | Naruto Online Launcher",
  description:
    "The only Flash game launcher with native Linux support for Naruto Online. Zero tracking, zero dependencies, FUSE-free.",
  keywords: [
    "Naruto Online",
    "launcher",
    "Flash PPAPI",
    "Linux",
    "Windows",
    "Electron",
    "Naruto",
    "open source",
    "Flash game",
    "browser game",
    "jogo",
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/icon-128.png",
  },
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
      "en": "/",
    },
  },
  openGraph: {
    title: "Naruto Online Launcher — Native Flash on Linux & Windows",
    description:
      "The only Flash game launcher with native Linux support. Zero tracking, FUSE-free, plug & play.",
    url: SITE_URL,
    siteName: "Naruto Online Launcher",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/thumbnail.png",
        width: 512,
        height: 512,
        alt: "Naruto Online Launcher",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Naruto Online Launcher — Native Flash on Linux & Windows",
    description:
      "The only Flash game launcher with native Linux support. Zero tracking, FUSE-free.",
    images: ["/thumbnail.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="sitemap" href="/sitemap.xml" />
      </head>
      <body className={`${inter.variable} ${newsreader.variable} antialiased`}>
        <JsonLd />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
