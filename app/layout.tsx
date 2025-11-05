// layout.tsx - Enhanced
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Background from "@/components/background";
import Providers from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GrowAI — Smarter Money Management",
  description: "Your AI-powered financial assistant for self-employed professionals",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header/>
          <Background/>
          <main className="w-full">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
