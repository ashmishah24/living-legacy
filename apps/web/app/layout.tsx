import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Fraunces, Nunito_Sans } from "next/font/google";
import "./styles.css";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display" });
const body = Nunito_Sans({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: { default: "Living Legacy", template: "%s | Living Legacy" },
  description: "A private, source-preserving family archive.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#eff6fa" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <ClerkProvider><html lang="en" className={`${display.variable} ${body.variable}`}><body>{children}</body></html></ClerkProvider>;
}
