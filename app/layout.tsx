import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Nav from "@/components/ui/layout/nav";
import { ThemeProvider } from "@/components/ui/theme/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OfferOrb — AI Career Decision Engine",
  description:
    "High-contrast career analysis. Compare job offers, calculate market valuation, and make data-driven decisions with OfferOrb v1.0.",
  keywords: [
    "Career Analysis",
    "Job Comparison",
    "Salary Negotiation",
    "AI Career Coach",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          <main className="mx-auto flex w-full max-w-7xl ">{children}</main>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
