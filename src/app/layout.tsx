import type { Metadata } from "next";
import { Figtree, Syne } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Remote jobs, easier apply",
  description:
    "Aggregate remote jobs from Remotive, Jobicy, and Himalayas. Save your profile once and apply faster.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${syne.variable} ${figtree.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="page-shell">{children}</main>
        <footer className="site-footer">
          Data from Remotive, Jobicy, and Himalayas. This site does not publish
          its own listings: it takes you to apply on the original source.
        </footer>
      </body>
    </html>
  );
}
