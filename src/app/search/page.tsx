import { Suspense } from "react";
import SearchResults from "@/components/SearchResults";
import { getAllArticlesMeta } from "@/lib/articles";

export const metadata = {
  title: "Search — Kansas Frontier",
};

export default function SearchPage() {
  const allArticles = getAllArticlesMeta();

  return (
    <Suspense fallback={null}>
      <SearchResults allArticles={allArticles} />
    </Suspense>
  );
}
