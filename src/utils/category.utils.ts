import { Href } from "expo-router";

import { Category } from "@/models/Category";

export const FEATURED_CATEGORY_SLUGS = [
  "smartphones",
  "laptops",
  "beauty",
  "fragrances",
  "mens-shirts",
  "womens-dresses",
] as const;

export function getCategoryProductsRoute(category: Category): Href {
  return {
    pathname: "/category/[slug]",
    params: {
      slug: category.slug,
      name: category.name,
    },
  } as Href;
}

export function findCategoryBySlug(
  categories: Category[],
  slug: string,
): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function filterCategories(
  categories: Category[],
  query: string,
): Category[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return categories;
  }

  return categories.filter(
    (category) =>
      category.name.toLowerCase().includes(normalizedQuery) ||
      category.slug.toLowerCase().includes(normalizedQuery),
  );
}

export function getFeaturedCategories(categories: Category[]): Category[] {
  const featured = FEATURED_CATEGORY_SLUGS.map((slug) =>
    categories.find((category) => category.slug === slug),
  ).filter((category): category is Category => Boolean(category));

  if (featured.length > 0) {
    return featured;
  }

  return categories.slice(0, 6);
}
