import Link from "next/link";
import { HeroSearch } from "@/components/HeroSearch";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero__bg" aria-hidden />
        <div className="hero__content">
          <h1 className="hero__headline">Remote jobs without the apply chaos.</h1>
          <p className="hero__sub">
            One profile. One letter. Hundreds of aggregated listings. Applying
            should be the easy step.
          </p>
          <HeroSearch />
        </div>
      </section>

      <section className="section">
        <h2>How it works</h2>
        <p>Three steps. No required accounts. Everything stays on your device.</p>
        <div className="how-grid">
          <article className="how-step">
            <span>01</span>
            <h3>Set up your profile</h3>
            <p>Name, resume, and a cover letter template with automatic variables.</p>
          </article>
          <article className="how-step">
            <span>02</span>
            <h3>Find the role</h3>
            <p>We search Remotive, Jobicy, and Himalayas and unify the results.</p>
          </article>
          <article className="how-step">
            <span>03</span>
            <h3>Apply in one move</h3>
            <p>We copy the letter, open the official posting, and save your tracking.</p>
          </article>
        </div>
        <p style={{ marginTop: "2rem" }}>
          <Link href="/perfil" className="btn btn--primary">
            Start with your profile
          </Link>
        </p>
      </section>
    </>
  );
}
