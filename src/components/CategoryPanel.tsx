import Image from "next/image";
import Link from "next/link";
import type { ArticleMeta } from "@/types/article";
import type { Category } from "@/lib/categories";

/**
 * A single dashboard panel for one category on the homepage.
 * Shows the category title, a compact lead image, and a dense list of
 * 4 headlines. No dates, no article counts — by design.
 */
export default function CategoryPanel({
  category,
  articles,
}: {
  category: Category;
  articles: ArticleMeta[];
}) {
  if (articles.length === 0) return null;

  const [lead, ...rest] = articles;
  const listItems = rest.slice(0, 3);

  return (
    <section className="flex flex-col overflow-hidden rounded-xl border border-border bg-panel">
      {/* Panel header */}
      <div className="flex items-center justify-between gap-2 border-b border-border bg-surface/60 px-4 py-3">
        <div className="min-w-0">
          <Link
            href={`/category/${category.slug}`}
            className="block text-sm font-extrabold uppercase tracking-[0.12em] text-accent"
          >
            {category.name}
          </Link>
          <p className="truncate text-[11px] text-muted">{category.tagline}</p>
        </div>
        <Link
          href={`/category/${category.slug}`}
          className="shrink-0 rounded-full border border-border-strong px-2.5 py-1 text-[11px] font-semibold text-muted-strong transition-colors hover:border-accent hover:text-accent"
        >
          More ›
        </Link>
      </div>

      {/* Lead story */}
      <Link href={`/article/${lead.slug}`} className="group block">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
          <Image
            src={lead.coverImage}
            alt={lead.title}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/20 to-transparent" />
        </div>
        <div className="px-4 pb-3 pt-3">
          <h3 className="headline-link line-clamp-3 text-[15px] font-bold leading-snug">
            {lead.title}
          </h3>
        </div>
      </Link>

      {/* Headline list */}
      <ul className="mt-auto divide-y divide-border border-t border-border">
        {listItems.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/article/${a.slug}`}
              className="flex items-start gap-2.5 px-4 py-2.5 transition-colors hover:bg-surface-hover"
            >
              <span
                aria-hidden
                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              />
              <span className="headline-link line-clamp-2 text-[13px] font-medium leading-snug text-muted-strong">
                {a.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
