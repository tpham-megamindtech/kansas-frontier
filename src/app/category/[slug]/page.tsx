import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import { CATEGORIES, getCategoryName, isCategorySlug } from "@/lib/categories";
import { getArticlesByCategory } from "@/lib/articles";

const PER_PAGE = 9;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isCategorySlug(slug)) return {};
  return { title: `${getCategoryName(slug)} — Kansas Frontier` };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  if (!isCategorySlug(slug)) notFound();

  const category = CATEGORIES.find((c) => c.slug === slug)!;
  const { page } = await searchParams;
  const current = Math.max(1, parseInt(page ?? "1", 10) || 1);

  const all = getArticlesByCategory(slug);
  const totalPages = Math.max(1, Math.ceil(all.length / PER_PAGE));
  const clamped = Math.min(current, totalPages);
  const start = (clamped - 1) * PER_PAGE;
  const pageItems = all.slice(start, start + PER_PAGE);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <header className="mb-6 border-b border-border pb-4">
        <div className="inline-flex items-center gap-2">
          <span className="h-6 w-1.5 rounded-full bg-accent" />
          <h1 className="text-2xl font-extrabold uppercase tracking-wide sm:text-3xl">
            {category.name}
          </h1>
        </div>
        <p className="mt-2 text-sm text-muted">{category.tagline}</p>
      </header>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {pageItems.map((article) => (
          <ArticleCard key={article.slug} article={article} showCategory={false} />
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="mt-10 flex items-center justify-center gap-1 text-sm font-semibold">
          {clamped > 1 && (
            <Link
              href={`/category/${slug}?page=${clamped - 1}`}
              className="rounded-md border border-border-strong px-3 py-1.5 text-muted-strong hover:border-accent hover:text-accent"
            >
              ← Prev
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <Link
              key={n}
              href={`/category/${slug}?page=${n}`}
              className={
                n === clamped
                  ? "rounded-md bg-accent px-3 py-1.5 font-bold text-background"
                  : "rounded-md border border-border-strong px-3 py-1.5 text-muted-strong hover:border-accent hover:text-accent"
              }
            >
              {n}
            </Link>
          ))}
          {clamped < totalPages && (
            <Link
              href={`/category/${slug}?page=${clamped + 1}`}
              className="rounded-md border border-border-strong px-3 py-1.5 text-muted-strong hover:border-accent hover:text-accent"
            >
              Next →
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}
