import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NovabookLM",
  description: "An online notebook powered by LLMs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
