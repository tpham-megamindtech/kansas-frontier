"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { ArticleMeta } from "@/types/article";
import { getCategoryName } from "@/lib/categories";
import ArticleCard from "./ArticleCard";
import SearchBox from "./SearchBox";

export default function SearchResults({ allArticles }: { allArticles: ArticleMeta[] }) {
  const params = useSearchParams();
  const query = (params.get("q") ?? "").trim();

  const results = useMemo(() => {
    if (query.length === 0) return [];
    const q = query.toLowerCase();
    return allArticles.filter((a) => {
      const haystack = `${a.title} ${a.excerpt} ${getCategoryName(a.category)}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query, allArticles]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-extrabold">Search</h1>
      <div className="mt-4 max-w-xl">
        <SearchBox variant="page" />
      </div>

      {query.length === 0 ? (
        <p className="mt-8 text-muted">Type a keyword above to search Kansas Frontier.</p>
      ) : (
        <>
          <p className="mt-6 text-sm text-muted">
            {results.length === 0
              ? "No results found for "
              : `${results.length} result${results.length === 1 ? "" : "s"} for `}
            <span className="font-semibold text-foreground">“{query}”</span>
          </p>
          {results.length > 0 && (
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
