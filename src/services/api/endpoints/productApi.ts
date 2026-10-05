import { api } from "../api";
import { API_ENDPOINTS } from "../constants";

import { Product } from "@/models/Product";

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, void>({
      query: () => API_ENDPOINTS.PRODUCTS,
      providesTags: ["Product"],
    }),
    getProductsByCategory: builder.query<ProductsResponse, string>({
      query: (slug) => `${API_ENDPOINTS.PRODUCTS_BY_CATEGORY}/${slug}`,

      providesTags: ["Product"],
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `${API_ENDPOINTS.PRODUCTS}/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
