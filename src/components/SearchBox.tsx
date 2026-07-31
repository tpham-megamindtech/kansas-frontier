"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchBox({ variant = "header" }: { variant?: "header" | "page" }) {
  const router = useRouter();
  const params = useSearchParams();
  const [query, setQuery] = useState("");

  // Keep the box in sync with the URL when landing on /search?q=...
  useEffect(() => {
    if (variant === "page") setQuery(params.get("q") ?? "");
  }, [params, variant]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q.length === 0) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      className={
        variant === "header"
          ? "flex w-full items-center overflow-hidden rounded-full border border-border-strong bg-surface focus-within:border-accent md:w-72"
          : "flex w-full items-center overflow-hidden rounded-lg border border-border-strong bg-surface focus-within:border-accent"
      }
    >
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Kansas Frontier…"
        aria-label="Search articles"
        className={
          variant === "header"
            ? "w-full bg-transparent px-4 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none"
            : "w-full bg-transparent px-4 py-3 text-base text-foreground placeholder:text-muted focus:outline-none"
        }
      />
      <button
        type="submit"
        aria-label="Search"
        className="flex shrink-0 items-center justify-center px-3 text-muted hover:text-accent"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 1 0 3.472 9.789l3.12 3.12a.75.75 0 1 0 1.06-1.06l-3.12-3.12A5.5 5.5 0 0 0 9 3.5ZM5 9a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
}
