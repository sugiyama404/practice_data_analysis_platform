//@ts-ignore
import type { Metadata } from "next";
//@ts-ignore
import "./globals.css";
//@ts-ignore
import "./bootstrap.min.css"
//@ts-ignore
import Script from 'next/script'

import { Header } from './components/header';

export const metadata: Metadata = {
  title: "ペン屋本舗",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Script src="/assert/bootstrap.bundle.min.js"></Script>
        <Script src="/assert/jquery-3.7.1.min.js"></Script>
      </body>
    </html>
  );
}
