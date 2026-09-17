"use client";

import Link from "next/link";
import { LOCALES } from "@/lib/i18n/dictionaries";
import { useI18n } from "@/lib/i18n/LanguageProvider";

export function Header() {
  const { t, locale, setLocale } = useI18n();

  const links = [
    { href: "/jobs", label: t.navJobs },
    { href: "/profile", label: t.navProfile },
    { href: "/applications", label: t.navApplications },
  ];

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand" aria-label={t.brandHome}>
          <span className="brand__mark" aria-hidden />
          Listo
        </Link>
        <nav className="site-nav" aria-label={t.navAria}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="site-nav__link">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-tools">
          <div className="lang-switch" role="group" aria-label={t.langLabel}>
            {LOCALES.map((item) => (
              <button
                key={item.code}
                type="button"
                className={locale === item.code ? "is-active" : undefined}
                onClick={() => setLocale(item.code)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <Link href="/profile" className="header-cta">
            {t.navCta}
          </Link>
        </div>
      </div>
    </header>
  );
}
