import type { Metadata } from "next";
import { Figtree, Noto_Sans_Georgian, Syne } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
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

const notoGeorgian = Noto_Sans_Georgian({
  variable: "--font-noto-georgian",
  subsets: ["georgian"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Listo — Remote jobs, easier apply",
  description:
    "Aggregate remote jobs from Remotive, Jobicy, Himalayas, RemoteOK, and Arbeitnow. Save your profile once and apply faster.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${figtree.variable} ${notoGeorgian.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <LanguageProvider>
          <Header />
          <main className="page-shell">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
