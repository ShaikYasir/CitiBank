/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google"
import "./globals.css";
import { ThemeProvider } from '@/components/ThemeContext'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ['400', '700'],
  variable: '--font-ibm-plex-serif'
});

export const metadata: Metadata = {
  title: "Citi",
  description: "Citibank, N.A. is the primary U.S. banking subsidiary of Citigroup, a financial services multinational corporation ",
  icons: '/icons/logo.svg'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body>{children}</body>
      </ThemeProvider>
    </html>
  );
}
