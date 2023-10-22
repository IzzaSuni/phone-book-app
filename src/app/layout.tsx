import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phone Book App",
  description: "Phone Book App by akbarizza09@gmail.com",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="application-name" content="Anime Planet" />
        <meta name="theme-color" content="#0f1014" />
        <link
          rel="icon"
          type="image/svg"
          sizes="192x192"
          href="/logo/phone-book-brand.svg"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/logo/phone-book-brand.svg"
        />
        <link rel="manifest" href="/manifest.json" />
        <title>Phone Book App</title>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
