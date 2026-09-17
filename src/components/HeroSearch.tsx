"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/empleos?q=${encodeURIComponent(query)}` : "/empleos");
  }

  return (
    <form className="hero-search" onSubmit={onSubmit}>
      <label className="sr-only" htmlFor="hero-q">
        Search remote jobs
      </label>
      <input
        id="hero-q"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="React, design, product manager…"
        autoComplete="off"
      />
      <button type="submit">Search</button>
    </form>
  );
}
