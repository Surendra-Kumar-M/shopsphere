import { api } from "../api";
import { API_ENDPOINTS } from "../constants";

import { Product, Review } from "@/models/Product";

export interface ProductsQueryParams {
  limit?: number;
  skip?: number;
}

export interface SearchProductsParams extends ProductsQueryParams {
  q: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

interface ProductApiResponse {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  sku?: string;
  thumbnail: string;
  images: string[];
  tags?: string[];
  weight?: number;
  dimensions?: Product["dimensions"];
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  returnPolicy?: string;
  reviews?: Review[];
}

interface ProductsApiResponse {
  products: ProductApiResponse[];
  total: number;
  skip: number;
  limit: number;
}

const mapProduct = (product: ProductApiResponse): Product => ({
  id: product.id,
  title: product.title,
  description: product.description,
  category: product.category,
  price: product.price,
  discountPercentage: product.discountPercentage,
  rating: product.rating,
  stock: product.stock,
  brand: product.brand,
  sku: product.sku,
  thumbnail: product.thumbnail,
  images: product.images,
  tags: product.tags,
  weight: product.weight,
  dimensions: product.dimensions,
  warrantyInformation: product.warrantyInformation,
  shippingInformation: product.shippingInformation,
  availabilityStatus: product.availabilityStatus,
  returnPolicy: product.returnPolicy,
  reviews: product.reviews,
});

const mapProductsResponse = (
  response: ProductsApiResponse,
): ProductsResponse => ({
  products: response.products.map(mapProduct),
  total: response.total,
  skip: response.skip,
  limit: response.limit,
});

export const PRODUCTS_PAGE_SIZE = 10;

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, ProductsQueryParams | void>({
      query: (params) => {
        const limit = params?.limit ?? PRODUCTS_PAGE_SIZE;
        const skip = params?.skip ?? 0;

        return `${API_ENDPOINTS.PRODUCTS}?limit=${limit}&skip=${skip}`;
      },

      transformResponse: mapProductsResponse,

      serializeQueryArgs: ({ endpointName }) => endpointName,

      merge: (currentCache, newItems, { arg }) => {
        if (!arg?.skip) {
          return newItems;
        }

        return {
          ...newItems,
          products: [...currentCache.products, ...newItems.products],
        };
      },

      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.skip !== previousArg?.skip,

      providesTags: ["Product"],
    }),

    getProductsByCategory: builder.query<
      ProductsResponse,
      { slug: string; limit?: number; skip?: number }
    >({
      query: ({ slug, limit = PRODUCTS_PAGE_SIZE, skip = 0 }) =>
        `${API_ENDPOINTS.PRODUCTS_BY_CATEGORY}/${slug}?limit=${limit}&skip=${skip}`,

      transformResponse: mapProductsResponse,

      serializeQueryArgs: ({ queryArgs }) => queryArgs.slug,

      merge: (currentCache, newItems, { arg }) => {
        if (!arg.skip) {
          return newItems;
        }

        return {
          ...newItems,
          products: [...currentCache.products, ...newItems.products],
        };
      },

      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.skip !== previousArg?.skip,

      providesTags: ["Product"],
    }),

    getProductById: builder.query<Product, number>({
      query: (id) => `${API_ENDPOINTS.PRODUCTS}/${id}`,

      transformResponse: mapProduct,

      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),

    searchProducts: builder.query<ProductsResponse, SearchProductsParams>({
      query: ({ q, limit = PRODUCTS_PAGE_SIZE, skip = 0 }) =>
        `${API_ENDPOINTS.SEARCH_PRODUCTS}?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`,

      transformResponse: mapProductsResponse,

      serializeQueryArgs: ({ queryArgs }) => queryArgs.q,

      merge: (currentCache, newItems, { arg }) => {
        if (!arg.skip) {
          return newItems;
        }

        return {
          ...newItems,
          products: [...currentCache.products, ...newItems.products],
        };
      },

      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.skip !== previousArg?.skip,

      providesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useSearchProductsQuery,
} = productApi;
