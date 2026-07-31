import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import { formatDate } from "@/lib/formatDate";
import { getCategoryName } from "@/lib/categories";
import { getAllArticleSlugs, getArticleBySlug, getRelatedArticles } from "@/lib/articles";

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return { title: `${article.title} — Kansas Frontier`, description: article.excerpt };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article, 3);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <article>
        <Link
          href={`/category/${article.category}`}
          className="text-xs font-bold uppercase tracking-[0.14em] text-accent"
        >
          {getCategoryName(article.category)}
        </Link>

        <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
          {article.title}
        </h1>

        <p className="mt-3 text-lg leading-relaxed text-muted-strong">{article.excerpt}</p>

        {/* Publish date shown ONLY here, on the article page */}
        <div className="mt-4 flex items-center gap-2 text-sm text-muted">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden>·</span>
          <span>{article.readingTime}</span>
        </div>

        <figure className="mt-6">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-panel">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-2 text-xs text-muted">{article.imageCredit}</figcaption>
        </figure>

        <div
          className="prose prose-invert mt-8 max-w-none prose-headings:font-bold prose-headings:text-foreground prose-a:text-accent prose-strong:text-foreground prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />
      </article>

      {related.length > 0 && (
        <section className="mt-12 border-t border-border pt-6">
          <h2 className="mb-4 inline-flex items-center gap-2 text-lg font-extrabold uppercase tracking-wide">
            <span className="h-5 w-1.5 rounded-full bg-accent" />
            Related Stories
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
