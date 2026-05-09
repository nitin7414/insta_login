import type { Metadata } from "next";
import "./globals.css";
import { Grand_Hotel } from 'next/font/google';

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

const grandHotel = Grand_Hotel({ 
  weight: '400',
  subsets: ['latin'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* This injects the font styles globally behind the scenes */}
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Grand+Hotel&display=swap');
        `}} />
      </head>
      <body>{children}</body>
    </html>
  );
}
