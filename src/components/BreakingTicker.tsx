import Link from "next/link";
import type { ArticleMeta } from "@/types/article";

/**
 * Horizontal breaking-news ticker across the top of the homepage.
 * The headline set is duplicated so the CSS marquee can loop seamlessly.
 */
export default function BreakingTicker({ articles }: { articles: ArticleMeta[] }) {
  if (articles.length === 0) return null;
  const loop = [...articles, ...articles];

  return (
    <div className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-7xl items-stretch">
        <div className="flex shrink-0 items-center gap-2 bg-breaking px-3 py-2 sm:px-4">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-white">
            Breaking
          </span>
        </div>
        <div className="ticker-viewport relative min-w-0 flex-1 overflow-hidden">
          <div className="ticker-track py-2">
            {loop.map((a, i) => (
              <Link
                key={`${a.slug}-${i}`}
                href={`/article/${a.slug}`}
                className="mx-5 inline-flex items-center gap-2 text-sm text-muted-strong transition-colors hover:text-accent"
              >
                <span aria-hidden className="text-accent">
                  ●
                </span>
                <span className="font-medium">{a.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
