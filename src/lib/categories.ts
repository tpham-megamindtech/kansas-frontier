import type { CategorySlug } from "@/types/article";

export interface Category {
  slug: CategorySlug;
  name: string;
  /** Short tagline shown in the dashboard panel header. */
  tagline: string;
}

/**
 * Categories in the exact order they should appear across the site
 * (homepage dashboard panels, nav, footer):
 * Local News, Business, Agriculture & Industry, Beauty,
 * Aviation & Manufacturing, Sports.
 */
export const CATEGORIES: Category[] = [
  { slug: "local-news", name: "Local News", tagline: "Statehouse, weather & community" },
  { slug: "business", name: "Business", tagline: "Markets, jobs & Main Street" },
  { slug: "agriculture-industry", name: "Agriculture & Industry", tagline: "Wheat, cattle & processing" },
  { slug: "beauty", name: "Beauty", tagline: "Salons, spas & wellness" },
  { slug: "aviation-manufacturing", name: "Aviation & Manufacturing", tagline: "Air Capital & the factory floor" },
  { slug: "sports", name: "Sports", tagline: "Jayhawks, Wildcats & Chiefs country" },
];

export function getCategoryName(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}

export function isCategorySlug(slug: string): slug is CategorySlug {
  return CATEGORIES.some((c) => c.slug === slug);
}
