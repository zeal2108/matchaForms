import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { GlobalProviders } from "~/providers/global";
import { TopNavBar } from "~/components/top-navbar";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
// });

const cormorantGaramond = Cormorant_Garamond({
  display: "swap",
  variable: "--font-cormorant-garamond",
});

export const metadata: Metadata = {
  title: "matchaForms",
  description: "Media Forwarding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${cormorantGaramond.variable}`}>
        <GlobalProviders>
          <TopNavBar />
          {children}
        </GlobalProviders>
      </body>
    </html>
  );
}
