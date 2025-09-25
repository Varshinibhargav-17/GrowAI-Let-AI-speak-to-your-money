import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Head from "next/head";
import Background from "@/components/background";
import Providers from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FinCoach — Smarter Money Management",
  description: "Your AI-powered financial assistant",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="mx-auto max-w-6xl px-4">
            <Header/>
            <Background/ >
          </div>
          <main className="mx-auto max-w-6xl px-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

