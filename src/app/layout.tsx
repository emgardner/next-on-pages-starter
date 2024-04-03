import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import SessionProvider from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Test App",
  description: "Next Test App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <main className="flex min-h-screen flex-col items-center justify-between">
          <div className="flex max-w-screen-2xl w-full flex-col px-24">
            <SessionProvider>
              <Header />
              {children}
            </SessionProvider>
          </div>
        </main>
      </body>
    </html>
  );
}
