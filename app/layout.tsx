import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://abapergola.ro"),
  title: {
    default: "ABA Pergola Systems — Soluții Premium de Pergole",
    template: "%s | ABA Pergola Systems",
  },
  description: "Pergole bioclimatice, grădini de iarnă și sisteme de sticlă premium. ABA Pergola Systems — calitate și inovație în România și Bulgaria.",
  keywords: ["pergole bioclimatice", "pergole retractabile", "gradina de iarna", "sistem glisant", "sistem ghilotina", "pergola Romania", "pergola Bulgaria"],
  authors: [{ name: "ABA Pergola Systems" }],
  creator: "ABA Pergola Systems",
  publisher: "ABA Pergola Systems",
  icons: {
    icon: [
      { url: "/logo.ico", sizes: "any" },
      { url: "/aba-logo-square.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/aba-logo-square.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/aba-logo-square.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "ABA Pergola Systems",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ABA Pergola Systems — Soluții Premium de Pergole",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/logo.png"],
    creator: "@abapergola",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "ABA Pergola Systems",
  description: "Pergole bioclimatice, grădini de iarnă și sisteme de sticlă premium în România și Bulgaria.",
  url: "https://abapergola.ro",
  logo: "https://abapergola.ro/aba-logo-square.png",
  image: "https://abapergola.ro/logo.png",
  telephone: "+40 757 032 748",
  address: {
    "@type": "PostalAddress",
    addressCountry: "RO",
  },
  areaServed: ["Romania", "Bulgaria"],
  sameAs: [],
  priceRange: "$$",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Sisteme Pergole",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pergole Bioclimatice" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pergole Retractabile" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Grădini de Iarnă" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sisteme Glisante" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sisteme Ghilotină" } },
    ],
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale || "ro"} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
