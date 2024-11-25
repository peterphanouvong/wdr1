// TODO: Wrap the entire app in the AuthProvider
// https://docs.kinde.com/developer-tools/sdks/backend/nextjs-sdk/#set-up-the-kinde-auth-provider
import { AuthProvider } from "./auth-provider";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kinde Web Directions 2024",
  description: "A fun challenge for Kinde Web Directions 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
