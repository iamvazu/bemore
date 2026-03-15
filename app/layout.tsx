import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Be More Design Studio | Architecture & Interiors, Bengaluru",
    template: "%s | Be More Design Studio",
  },
  description:
    "beMore Design Studio | India's #1 Interior Budget Estimator & Design Firm. Get a precise BOQ for your property in Bangalore, Mumbai, or Pune with surgical accuracy.",
  keywords: [
    "interior design Bangalore",
    "architecture Bengaluru",
    "interior design ROI Bangalore",
    "home interior Whitefield",
    "luxury interiors Indiranagar",
    "smart home design Sarjapur",
    "Be More Design Studio",
  ],
  authors: [{ name: "Be More Design Studio" }],
  creator: "Be More Design Studio",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://bemoredesignstudio.in",
    siteName: "Be More Design Studio",
    title: "Be More Design Studio | Architecture & Interiors, Bengaluru",
    description:
      "Design as an investment. Bengaluru's architecture & interiors studio with a data-driven ROI calculator for your home.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "beMore Design Studio",
    description: "Surgical precision in architecture and interior budget estimation.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
