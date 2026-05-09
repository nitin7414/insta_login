import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Social Access Portal",
  description: "A secure social-style access request page built with Next.js, Prisma, and Neon.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
