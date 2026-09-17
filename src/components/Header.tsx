import Link from "next/link";

const links = [
  { href: "/empleos", label: "Jobs" },
  { href: "/perfil", label: "My profile" },
  { href: "/postulaciones", label: "Applications" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand" aria-label="Home">
          <span className="brand__mark" aria-hidden />
        </Link>
        <nav className="site-nav" aria-label="Main">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="site-nav__link">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/perfil" className="header-cta">
          Set up profile
        </Link>
      </div>
    </header>
  );
}
