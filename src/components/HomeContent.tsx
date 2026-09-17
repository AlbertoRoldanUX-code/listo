"use client";

import Link from "next/link";
import { HeroSearch } from "@/components/HeroSearch";
import { useI18n } from "@/lib/i18n/LanguageProvider";

export function HomeContent() {
  const { t } = useI18n();

  return (
    <>
      <section className="hero">
        <div className="hero__bg" aria-hidden />
        <div className="hero__content">
          <p className="hero__brand">Listo</p>
          <h1 className="hero__headline">{t.heroHeadline}</h1>
          <p className="hero__sub">{t.heroSub}</p>
          <HeroSearch />
        </div>
      </section>

      <section className="section">
        <h2>{t.howTitle}</h2>
        <p>{t.howSub}</p>
        <div className="how-grid">
          <article className="how-step">
            <span>01</span>
            <h3>{t.how1Title}</h3>
            <p>{t.how1Body}</p>
          </article>
          <article className="how-step">
            <span>02</span>
            <h3>{t.how2Title}</h3>
            <p>{t.how2Body}</p>
          </article>
          <article className="how-step">
            <span>03</span>
            <h3>{t.how3Title}</h3>
            <p>{t.how3Body}</p>
          </article>
        </div>
        <p style={{ marginTop: "2rem" }}>
          <Link href="/profile" className="btn btn--primary">
            {t.howCta}
          </Link>
        </p>
      </section>
    </>
  );
}
