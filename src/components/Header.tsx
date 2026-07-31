"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { CATEGORIES } from "@/lib/categories";
import SearchBox from "./SearchBox";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Masthead */}
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-5 text-center sm:px-6">
        <Link href="/" className="group inline-flex flex-col items-center" aria-label="Kansas Frontier home">
          <span className="text-5xl font-extrabold leading-none tracking-tight sm:text-6xl">
            <span className="text-foreground">Kansas</span>{" "}
            <span className="text-accent">Frontier</span>
          </span>
          {/* Slim amber strip under the logo */}
          <span className="mt-2 h-[3px] w-full rounded-full bg-gradient-to-r from-transparent via-accent-hover to-transparent" />
          <span className="mt-2 text-[11px] font-medium uppercase tracking-[0.22em] text-muted sm:text-xs">
            News from the Sunflower State
          </span>
        </Link>

        <div className="flex w-full max-w-md justify-center">
          <Suspense fallback={null}>
            <SearchBox variant="header" />
          </Suspense>
        </div>
      </div>

      {/* Category nav bar */}
      <nav className="border-t border-border bg-panel">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-2 sm:px-6">
          <NavLink href="/" label="Home" active={pathname === "/"} />
          {CATEGORIES.map((c) => (
            <NavLink
              key={c.slug}
              href={`/category/${c.slug}`}
              label={c.name}
              active={pathname === `/category/${c.slug}`}
            />
          ))}
        </div>
      </nav>
    </header>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`relative whitespace-nowrap px-3 py-2.5 text-sm font-semibold transition-colors ${
        active ? "text-accent" : "text-muted-strong hover:text-foreground"
      }`}
    >
      {label}
      <span
        className={`pointer-events-none absolute inset-x-2 bottom-0 h-[2.5px] rounded-full bg-accent transition-opacity ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
    </Link>
  );
}
