import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JobToProof - Turn detailing jobs into proof",
  description:
    "A validation MVP for mobile detailers to turn completed jobs into social posts, review request messages, and proof pages.",
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
