import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";
import { GeistSans } from 'geist/font/sans';

export const metadata: Metadata = {
    title: "GoFashion | Fashion Designer App | Home",
    description: "GoFashion | Fashion Designer App | Home",
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body className={GeistSans.className}>
{children}
</body>
</html>

  );
}
