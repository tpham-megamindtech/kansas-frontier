import Image from "next/image";
import Link from "next/link";
import type { ArticleMeta } from "@/types/article";
import { getCategoryName } from "@/lib/categories";

/**
 * Dark card used in the category and search grids.
 * Deliberately shows NO publish date (dates live only on the article page).
 */
export default function ArticleCard({
  article,
  showCategory = true,
}: {
  article: ArticleMeta;
  showCategory?: boolean;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-border-strong">
      <Link href={`/article/${article.slug}`} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-panel">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        {showCategory && (
          <Link
            href={`/category/${article.category}`}
            className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent"
          >
            {getCategoryName(article.category)}
          </Link>
        )}
        <h3 className="text-base font-bold leading-snug">
          <Link href={`/article/${article.slug}`} className="headline-link line-clamp-3">
            {article.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-muted">{article.excerpt}</p>
      </div>
    </article>
  );
}
