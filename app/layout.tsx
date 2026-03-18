import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://abapergola.ro"),
  title: "ABA Pergola Systems",
  description: "Premium pergola and glass solutions for your home and business.",
  icons: {
    icon: "/logo.ico",
  },
  openGraph: {
    type: "website",
    siteName: "ABA Pergola Systems",
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "ABA Pergola Systems — Premium Pergola Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-image.webp"],
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
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
