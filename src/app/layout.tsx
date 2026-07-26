import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shadow — Boutique homme",
  description:
    "Shadow, la boutique de vêtements pour homme. Découvrez la collection et sa disponibilité en temps réel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Work+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={
          {
            "--font-display": "'Bebas Neue', sans-serif",
            "--font-body": "'Work Sans', sans-serif",
            fontFamily: "var(--font-body)",
          } as React.CSSProperties
        }
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
