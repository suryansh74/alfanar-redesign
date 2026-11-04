import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans", display: "swap" });
export const metadata: Metadata = {
  title: "alfanar | Powering the future – Redesign concept",
  description: "Concept redesign of the alfanar home page: energy, grid, process, water, data centers, buildings & infrastructure and renewable energy.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={openSans.variable}><body className="font-sans">{children}</body></html>;
}
