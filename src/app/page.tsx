import BreakingTicker from "@/components/BreakingTicker";
import CategoryPanel from "@/components/CategoryPanel";
import { CATEGORIES } from "@/lib/categories";
import { getLatestArticles, getLatestByCategory } from "@/lib/articles";

export default function HomePage() {
  // Build the 6 dashboard panels — 4 fresh headlines per category.
  const panels = CATEGORIES.map((category) => ({
    category,
    articles: getLatestByCategory(category.slug, 4),
  }));

  // Ticker pulls the freshest headlines across the whole site.
  const ticker = getLatestArticles(8);

  return (
    <div className="horizon-glow">
      <BreakingTicker articles={ticker} />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Dashboard heading */}
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border pb-3">
          <h1 className="text-lg font-extrabold uppercase tracking-[0.14em] text-foreground">
            Today across <span className="text-accent">Kansas</span>
          </h1>
          <p className="text-xs text-muted">
            A live dashboard of the Sunflower State — updated around the clock
          </p>
        </div>

        {/* Multi-panel dashboard grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {panels.map(({ category, articles }) => (
            <CategoryPanel key={category.slug} category={category} articles={articles} />
          ))}
        </div>
      </div>
    </div>
  );
}
