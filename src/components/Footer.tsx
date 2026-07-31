import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export default function Footer() {
  return (
    <footer className="mt-12 border-t-2 border-accent bg-panel">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <span className="text-xl font-extrabold tracking-tight">
              <span className="text-foreground">Kansas</span>{" "}
              <span className="text-accent">Frontier</span>
            </span>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Independent coverage of the Sunflower State — from the Statehouse in Topeka to
              the factory floors of Wichita, the wheat country in between, and Chiefs country
              on Sundays.
            </p>
          </div>

          <nav aria-label="Footer categories">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
              Sections
            </h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="text-muted-strong transition-colors hover:text-accent"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-xs text-muted">
          © {new Date().getFullYear()} Kansas Frontier. All rights reserved. A fictional news
          portal created for demonstration purposes.
        </div>
      </div>
    </footer>
  );
}
